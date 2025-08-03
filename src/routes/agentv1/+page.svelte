<script>
    // State variables to manage the component's data and UI
    let selectedFile = null; // Holds the selected image/video file
    let previewUrl = null;   // URL for the media preview
    let postResult = null;   // Stores the successful response from the API
    let errorMessage = null; // Stores any error messages
    let isLoading = false;   // Tracks the loading state for the API request
    let fileType = null;     // Tracks whether the file is image or video

    let additionalOptions = {
        topic: '',
        style: 'professional'
    };

    const styleOptions = [
        { value: 'professional', label: 'Professional' },
        { value: 'casual', label: 'Casual & Friendly' },
        { value: 'energetic', label: 'High Energy' },
        { value: 'artistic', label: 'Creative & Artistic' },
        { value: 'technical', label: 'Technical/Educational' }
    ];

    // File size limits for Vercel serverless functions (staying under 4.5MB body limit)
    const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB for images
    const MAX_VIDEO_SIZE = 4 * 1024 * 1024; // 4MB for videos (Vercel body limit)
    
    // Supported file types
    const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/mov', 'video/avi', 'video/quicktime'];
  
    // API endpoint URL - replace with your actual DRF endpoint
    const DEVAPI_URL = "http://127.0.0.1:8000/agentv1/create_post/";
    const API_URL = "https://xander-django.vercel.app/agentv1/create_post/";
    const PAPI_URL = "https://xander-pillow.vercel.app/app/upload/";
    // const PAPI_URL = "http://127.0.0.1:8000/app/upload/";

    /**
     * Formats file size for display
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted file size
     */
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Validates the selected file
     * @param {File} file - The selected file
     * @returns {string|null} Error message or null if valid
     */
    function validateFile(file) {
        const isImage = SUPPORTED_IMAGE_TYPES.includes(file.type);
        const isVideo = SUPPORTED_VIDEO_TYPES.includes(file.type);
        
        if (!isImage && !isVideo) {
            return "Please select a supported file type (JPEG, PNG, WebP, GIF, MP4, WebM, MOV, AVI).";
        }
        
        if (isImage && file.size > MAX_IMAGE_SIZE) {
            return `Image file size must be less than ${formatFileSize(MAX_IMAGE_SIZE)}. Current size: ${formatFileSize(file.size)}.`;
        }
        
        if (isVideo && file.size > MAX_VIDEO_SIZE) {
            return `Video file size must be less than ${formatFileSize(MAX_VIDEO_SIZE)}. Current size: ${formatFileSize(file.size)}.`;
        }
        
        return null;
    }
  
    /**
     * Handles the file input change event.
     * It updates the selected file and creates a URL for previewing the media.
     * @param {Event} e - The input change event
     */
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate the file first
            const validationError = validateFile(file);
            if (validationError) {
                errorMessage = validationError;
                selectedFile = null;
                previewUrl = null;
                fileType = null;
                // Clear the input
                e.target.value = '';
                return;
            }

            selectedFile = file;
            postResult = null; // Clear previous results
            errorMessage = null; // Clear previous errors
            
            // Determine file type
            fileType = SUPPORTED_IMAGE_TYPES.includes(file.type) ? 'image' : 'video';
      
            // Create a temporary URL for the selected media to show a preview
            previewUrl = URL.createObjectURL(file);
        }
    }
  
    /**
     * Handles the form submission.
     * For large files (>4MB), uploads directly to S3, then notifies backend.
     * For small files, uses traditional backend upload.
     */
    async function handleSubmit() {
        if (!selectedFile) {
            errorMessage = "Please select an image or video first.";
            return;
        }
  
        // Set loading state and clear previous messages
        isLoading = true;
        errorMessage = null;
        postResult = null;

        const FILE_SIZE_LIMIT = 4 * 1024 * 1024; // 4MB - stay under Vercel's 4.5MB limit
        const isLargeFile = selectedFile.size > FILE_SIZE_LIMIT;

        try {
            if (isLargeFile) {
                // Large file: Direct S3 upload
                await handleLargeFileUpload();
            } else {
                // Small file: Traditional backend upload
                await handleSmallFileUpload();
            }
        } catch (error) {
            console.error("Upload Error:", error);
            errorMessage = error.message || "An unexpected error occurred.";
        } finally {
            isLoading = false;
        }
    }

    /**
     * Handle small files through backend (traditional method)
     */
    async function handleSmallFileUpload() {
        const formData = new FormData();
        formData.append('media', selectedFile);
        formData.append('topic', additionalOptions.topic);
        formData.append('style', additionalOptions.style);
        formData.append('media_type', fileType);

        const response = await fetch(PAPI_URL, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Request failed with status ${response.status}`);
        }

        postResult = data;
    }

    /**
     * Handle large files with direct S3 upload
     */
    async function handleLargeFileUpload() {
        // Step 1: Get pre-signed URL from backend
        const presignResponse = await fetch(`${PAPI_URL.replace('/upload/', '/presigned-url/')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filename: selectedFile.name,
                filesize: selectedFile.size,
                content_type: selectedFile.type,
                media_type: fileType,
                topic: additionalOptions.topic,
                style: additionalOptions.style,
            }),
        });

        if (!presignResponse.ok) {
            const errorData = await presignResponse.json();
            throw new Error(errorData.error || 'Failed to get upload URL');
        }

        const { upload_url, post_id } = await presignResponse.json();

        // Step 2: Upload directly to S3
        const uploadResponse = await fetch(upload_url, {
            method: 'PUT',
            body: selectedFile,
            headers: {
                'Content-Type': selectedFile.type,
            },
        });

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload file to storage');
        }

        // Step 3: Notify backend that upload is complete
        const completeResponse = await fetch(`${PAPI_URL.replace('/upload/', '/upload-complete/')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post_id: post_id,
            }),
        });

        if (!completeResponse.ok) {
            const errorData = await completeResponse.json();
            throw new Error(errorData.error || 'Failed to complete upload');
        }

        postResult = await completeResponse.json();
    }
</script>
  
<div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        
        <!-- Header Section -->
        <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-800">AI Post Generator</h1>
            <p class="text-gray-500 mt-2">Upload an image or video to get a caption and hashtags.</p>
        </div>

        <!-- File Input Section -->
        <div class="flex flex-col items-center space-y-4">
            <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 border-2 border-dashed border-gray-300 w-full h-32 flex items-center justify-center text-center">
                {#if previewUrl}
                    <div class="h-full w-full flex items-center justify-center">
                        {#if fileType === 'image'}
                            <img src={previewUrl} alt="Selected preview" class="h-full w-full object-cover rounded-md">
                        {:else if fileType === 'video'}
                            <video src={previewUrl} class="h-full w-full object-cover rounded-md" controls muted>
                                <track kind="captions">
                                Your browser does not support the video tag.
                            </video>
                        {/if}
                    </div>
                {:else}
                    <div class="text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="mt-2">
                            <span class="block text-sm font-medium">Click to upload media</span>
                            <span class="block text-xs text-gray-500 mt-1">Images up to {formatFileSize(MAX_IMAGE_SIZE)}</span>
                            <span class="block text-xs text-gray-500">Videos up to {formatFileSize(MAX_VIDEO_SIZE)}</span>
                        </div>
                    </div>
                {/if}
                <input id="file-upload" name="file-upload" type="file" class="sr-only" on:change={handleFileSelect} accept="image/*,video/*">
            </label>
            {#if selectedFile}
                <div class="text-center">
                    <p class="text-sm text-gray-600">Selected: {selectedFile.name}</p>
                    <p class="text-xs text-gray-500">{formatFileSize(selectedFile.size)} • {fileType}</p>
                </div>
            {/if}
        </div>

        <!-- Options Section -->
        <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-700">Content Options</h3>
            
            <!-- Topic Input -->
            <div>
                <label for="topic-input" class="block text-sm font-medium text-gray-700 mb-2">
                    Content Topic (Optional)
                </label>
                <input 
                    id="topic-input"
                    type="text"
                    bind:value={additionalOptions.topic}
                    placeholder="e.g., New track release, Studio session, Equipment review..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm placeholder-gray-400"
                />
            </div>

            <!-- Style Selection -->
            <div>
                <label for="style-select" class="block text-sm font-medium text-gray-700 mb-2">
                    Writing Style
                </label>
                <select 
                    id="style-select"
                    bind:value={additionalOptions.style}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                    {#each styleOptions as style}
                        <option value={style.value}>{style.label}</option>
                    {/each}
                </select>
            </div>
        </div>

        <!-- Submit Button -->
        <button
            on:click={handleSubmit}
            disabled={!selectedFile || isLoading}
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
            {#if isLoading}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
            {:else}
                Generate Post
            {/if}
        </button>

        <!-- Results Section -->
        {#if postResult}
            <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg space-y-3 animate-fade-in">
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-green-800">Generation Complete!</h3>
                    {#if additionalOptions.topic || additionalOptions.style !== 'professional'}
                        <span class="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                            {#if additionalOptions.topic}{additionalOptions.topic}{/if}{#if additionalOptions.topic && additionalOptions.style !== 'professional'} • {/if}{#if additionalOptions.style !== 'professional'}{styleOptions.find(s => s.value === additionalOptions.style)?.label}{/if}
                        </span>
                    {/if}
                </div>
                <div>
                    <p class="font-medium text-gray-700">Caption:</p>
                    <p class="text-gray-600 italic">"{postResult.caption}"</p>
                </div>
                <div>
                    <p class="font-medium text-gray-700">Hashtags:</p>
                    <p class="text-gray-600">{postResult.hashtags}</p>
                </div>
            </div>
        {/if}

        <!-- Error Message Section -->
        {#if errorMessage}
            <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg animate-fade-in">
                <p class="text-red-700 font-medium">{errorMessage}</p>
            </div>
        {/if}

    </div>
</div>

<style>
    /* Simple fade-in animation for results and errors */
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.5s ease-out forwards;
    }
</style>