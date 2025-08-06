<script>
    import { onDestroy } from 'svelte';

    // State variables to manage the component's data and UI
    let selectedFile = null; // Holds the selected image/video file
    let previewUrl = null;   // URL for the media preview
    let postResult = null;   // Stores the successful response from the API
    let errorMessage = null; // Stores any error messages
    let isLoading = false;   // Tracks the loading state for the API request
    let fileType = null;     // Tracks whether the file is image or video
    let activeTab = 'upload'; // Tracks the current active tab
    let dashboardData = {
        totalPosts: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        recentPosts: [],
        topPerforming: []
    };
    let analyticsData = null;
    let isLoadingData = false;
    let dataError = null;

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
  
    // API endpoint URL
    const PAPI_URL = "https://xander-pillow.vercel.app/app/upload/";

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
     * Formats numbers for display (e.g., 1,234)
     */
    function formatNumber(num) {
        return num.toLocaleString();
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
            const validationError = validateFile(file);
            if (validationError) {
                errorMessage = validationError;
                selectedFile = null;
                previewUrl = null;
                fileType = null;
                e.target.value = '';
                return;
            }

            selectedFile = file;
            postResult = null;
            errorMessage = null;
            fileType = SUPPORTED_IMAGE_TYPES.includes(file.type) ? 'image' : 'video';
            previewUrl = URL.createObjectURL(file);
        }
    }
  
    /**
     * Handles the form submission.
     * It sends the selected media to the backend API.
     */
    async function handleSubmit() {
        if (!selectedFile) {
            errorMessage = "Please select an image or video first.";
            return;
        }
  
        isLoading = true;
        errorMessage = null;
        postResult = null;
  
        const formData = new FormData();
        formData.append('media', selectedFile);
        formData.append('topic', additionalOptions.topic);
        formData.append('style', additionalOptions.style);
        formData.append('media_type', fileType);
  
        try {
            const response = await fetch(PAPI_URL, {
                method: 'POST',
                body: formData,
            });
      
            const data = await response.json();
      
            if (!response.ok) {
                throw new Error(data.error || `Request failed with status ${response.status}`);
            }
      
            postResult = data;
      
        } catch (error) {
            console.error("API Error:", error);
            errorMessage = error.message || "An unexpected error occurred.";
        } finally {
            isLoading = false;
        }
    }

    /**
     * Fetch dashboard data from Instagram API
     */
    async function fetchDashboardData() {
        if (isLoadingData) return;
        
        isLoadingData = true;
        dataError = null;
        
        try {
            const response = await fetch('/api/instagram/dashboard');
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch dashboard data');
            }
            
            if (result.success && result.data) {
                const data = result.data;
                dashboardData = {
                    totalPosts: data.total_posts || 0,
                    totalViews: data.total_views || 0,
                    totalLikes: data.total_likes || 0,
                    totalComments: data.total_comments || 0,
                    recentPosts: data.recent_posts || [],
                    topPerforming: data.top_performing || []
                };
            }
        } catch (error) {
            console.error('Dashboard fetch error:', error);
            dataError = error.message;
        } finally {
            isLoadingData = false;
        }
    }

    /**
     * Fetch posts data for the posts tab
     */
    async function fetchPostsData() {
        if (isLoadingData) return;
        
        isLoadingData = true;
        dataError = null;
        
        try {
            const response = await fetch('/api/instagram/posts?limit=25');
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch posts data');
            }
            
            if (result.success && result.posts) {
                dashboardData.recentPosts = result.posts;
            }
        } catch (error) {
            console.error('Posts fetch error:', error);
            dataError = error.message;
        } finally {
            isLoadingData = false;
        }
    }

    /**
     * Fetch analytics data
     */
    async function fetchAnalyticsData() {
        if (isLoadingData) return;
        
        isLoadingData = true;
        dataError = null;
        
        try {
            const response = await fetch('/api/instagram/analytics');
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch analytics data');
            }
            
            if (result.success && result.analytics) {
                analyticsData = result.analytics;
            }
        } catch (error) {
            console.error('Analytics fetch error:', error);
            dataError = error.message;
        } finally {
            isLoadingData = false;
        }
    }

    /**
     * Updated switchTab function to fetch data when needed
     */
    function switchTab(tab) {
        activeTab = tab;
        
        if (tab !== 'upload') {
            selectedFile = null;
            previewUrl = null;
            postResult = null;
            errorMessage = null;
        }
        
        switch(tab) {
            case 'dashboard':
                fetchDashboardData();
                break;
            case 'posts':
                fetchPostsData();
                break;
            case 'analytics':
                fetchAnalyticsData();
                break;
        }
    }

    /**
     * Refresh all data
     */
    async function refreshAllData() {
        switch(activeTab) {
            case 'dashboard':
                await fetchDashboardData();
                break;
            case 'posts':
                await fetchPostsData();
                break;
            case 'analytics':
                await fetchAnalyticsData();
                break;
        }
    }

    /**
     * Auto-refresh data every 5 minutes when tab is active
     */
    let refreshInterval;

    $: if (typeof window !== 'undefined') {
        if (activeTab !== 'upload') {
            refreshInterval = setInterval(() => {
                if (!document.hidden) {
                    refreshAllData();
                }
            }, 5 * 60 * 1000);
        } else {
            clearInterval(refreshInterval);
        }
    }

    onDestroy(() => {
        if (refreshInterval) {
            clearInterval(refreshInterval);
        }
    });
</script>

<div class="min-h-screen bg-gray-50 font-sans">
    <!-- Navigation Tabs -->
    <div class="bg-white shadow-sm border-b">
        <div class="max-w-6xl mx-auto px-4">
            <nav class="flex space-x-8">
                <button 
                    on:click={() => switchTab('upload')}
                    class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 {activeTab === 'upload' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                >
                    Upload Content
                </button>
                <button 
                    on:click={() => switchTab('dashboard')}
                    class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 {activeTab === 'dashboard' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                >
                    Dashboard
                </button>
                <button 
                    on:click={() => switchTab('posts')}
                    class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 {activeTab === 'posts' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                >
                    Recent Posts
                </button>
                <button 
                    on:click={() => switchTab('analytics')}
                    class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 {activeTab === 'analytics' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                >
                    Analytics
                </button>
            </nav>
        </div>
    </div>

    <!-- Tab Content -->
    <div class="max-w-6xl mx-auto p-4">

        <!-- Upload Tab -->
        {#if activeTab === 'upload'}
            <div class="flex justify-center">
                <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <div class="text-center">
                        <h1 class="text-3xl font-bold text-gray-800">AI Post Generator</h1>
                        <p class="text-gray-500 mt-2">Upload an image or video to get a caption and hashtags.</p>
                    </div>

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

                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-700">Content Options</h3>
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

                    {#if errorMessage}
                        <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg animate-fade-in">
                            <p class="text-red-700 font-medium">{errorMessage}</p>
                        </div>
                    {/if}
                </div>
            </div>
        {/if}

        <!-- Dashboard Tab -->
        {#if activeTab === 'dashboard'}
            <div class="space-y-6">
                <div class="text-center">
                    <h1 class="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                    <p class="text-gray-500 mt-2">Your content performance at a glance</p>
                </div>

                {#if isLoadingData}
                    <div class="flex justify-center items-center py-12">
                        <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="ml-2 text-gray-600">Loading dashboard data...</span>
                    </div>
                {:else if dataError}
                    <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                        <p class="text-red-700">Error loading data: {dataError}</p>
                        <button on:click={fetchDashboardData} class="mt-2 text-red-600 underline">Try again</button>
                    </div>
                {:else}
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">Total Posts</h3>
                                    <p class="text-2xl font-semibold text-gray-900">{formatNumber(dashboardData.totalPosts)}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">Total Views</h3>
                                    <p class="text-2xl font-semibold text-gray-900">{formatNumber(dashboardData.totalViews)}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">Total Likes</h3>
                                    <p class="text-2xl font-semibold text-gray-900">{formatNumber(dashboardData.totalLikes)}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">Total Comments</h3>
                                    <p class="text-2xl font-semibold text-gray-900">{formatNumber(dashboardData.totalComments)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Top Performing Posts</h3>
                        </div>
                        <div class="px-6 py-4">
                            <div class="space-y-4">
                                {#each dashboardData.topPerforming as post}
                                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div class="flex-1">
                                            <p class="text-sm font-medium text-gray-900">{post.caption}</p>
                                            <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                                <span>{formatNumber(post.views)} views</span>
                                                <span>{formatNumber(post.likes)} likes</span>
                                                <span>{post.comments} comments</span>
                                            </div>
                                        </div>
                                        <div class="ml-4">
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {post.engagement_rate}% engagement
                                            </span>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        {/if}

        <!-- Recent Posts Tab -->
        {#if activeTab === 'posts'}
            <div class="space-y-6">
                <div class="text-center">
                    <h1 class="text-3xl font-bold text-gray-800">Recent Posts</h1>
                    <p class="text-gray-500 mt-2">Your latest content uploads and their performance</p>
                </div>

                {#if isLoadingData}
                    <div class="flex justify-center items-center py-12">
                        <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="ml-2 text-gray-600">Loading posts...</span>
                    </div>
                {:else if dataError}
                    <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                        <p class="text-red-700">Error loading posts: {dataError}</p>
                        <button on:click={fetchPostsData} class="mt-2 text-red-600 underline">Try again</button>
                    </div>
                {:else if dashboardData.recentPosts && dashboardData.recentPosts.length > 0}
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Latest Uploads</h3>
                            <button on:click={fetchPostsData} class="text-indigo-600 hover:text-indigo-800 text-sm">
                                Refresh
                            </button>
                        </div>
                        <div class="divide-y divide-gray-200">
                            {#each dashboardData.recentPosts as post}
                                <div class="px-6 py-4">
                                    <div class="flex items-start space-x-4">
                                        <div class="flex-shrink-0">
                                            <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                                {#if post.media_type === 'video'}
                                                    <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                                    </svg>
                                                {:else}
                                                    <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                    </svg>
                                                {/if}
                                            </div>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-center justify-between">
                                                <p class="text-sm font-medium text-gray-900 truncate">{post.caption}</p>
                                                <span class="text-xs text-gray-500">{post.created_at}</span>
                                            </div>
                                            <p class="text-sm text-gray-500 mt-1">{post.hashtags}</p>
                                            <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                                <span class="flex items-center">
                                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                    </svg>
                                                    {formatNumber(post.views)}
                                                </span>
                                                <span class="flex items-center">
                                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                                    </svg>
                                                    {formatNumber(post.likes)}
                                                </span>
                                                <span class="flex items-center">
                                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                                    </svg>
                                                    {post.comments}
                                                </span>
                                            </div>
                                            {#if post.permalink}
                                                <div class="mt-2">
                                                    <a href={post.permalink} target="_blank" rel="noopener noreferrer" 
                                                       class="text-xs text-indigo-600 hover:text-indigo-800">
                                                        View on Instagram →
                                                    </a>
                                                </div>
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {:else}
                    <div class="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
                        <p class="text-gray-600">No posts found</p>
                        <button on:click={fetchPostsData} class="mt-2 text-indigo-600 underline">
                            Load Posts
                        </button>
                    </div>
                {/if}
            </div>
        {/if}

        <!-- Analytics Tab -->
        {#if activeTab === 'analytics'}
            <div class="space-y-6">
                <div class="text-center">
                    <h1 class="text-3xl font-bold text-gray-800">Analytics</h1>
                    <p class="text-gray-500 mt-2">Detailed insights into your content performance</p>
                </div>

                {#if isLoadingData}
                    <div class="flex justify-center items-center py-12">
                        <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="ml-2 text-gray-600">Loading analytics data...</span>
                    </div>
                {:else if dataError}
                    <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                        <p class="text-red-700">Error loading analytics: {dataError}</p>
                        <button on:click={fetchAnalyticsData} class="mt-2 text-red-600 underline">Try again</button>
                    </div>
                {:else if analyticsData}
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Engagement Rate</h3>
                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">Average Engagement</span>
                                    <span class="text-lg font-semibold text-green-600">
                                        {analyticsData.engagement_rate?.average || 0}%
                                    </span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-500 h-2 rounded-full" 
                                         style="width: {Math.min((analyticsData.engagement_rate?.average || 0) * 10, 100)}%"></div>
                                </div>
                                <div class="text-xs text-gray-500">
                                    Industry average: {analyticsData.engagement_rate?.industry_average || 3.5}%
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Content Performance</h3>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-600">
                                        Images ({analyticsData.content_performance?.images?.count || 0})
                                    </span>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-20 bg-gray-200 rounded-full h-2">
                                            <div class="bg-blue-500 h-2 rounded-full" 
                                                 style="width: {Math.min((analyticsData.content_performance?.images?.rate || 0) * 10, 100)}%"></div>
                                        </div>
                                        <span class="text-sm font-medium">
                                            {analyticsData.content_performance?.images?.rate || 0}%
                                        </span>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-600">
                                        Videos ({analyticsData.content_performance?.videos?.count || 0})
                                    </span>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-20 bg-gray-200 rounded-full h-2">
                                            <div class="bg-purple-500 h-2 rounded-full" 
                                                 style="width: {Math.min((analyticsData.content_performance?.videos?.rate || 0) * 10, 100)}%"></div>
                                        </div>
                                        <span class="text-sm font-medium">
                                            {analyticsData.content_performance?.videos?.rate || 0}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-4">Best Performing Content Types</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {#each Object.entries(analyticsData.content_types || {}) as [key, data]}
                                <div class="text-center p-4 bg-blue-50 rounded-lg">
                                    <div class="text-2xl font-bold text-blue-600">{data.emoji}</div>
                                    <div class="mt-2 text-sm font-medium text-gray-900 capitalize">
                                        {key.replace('_', ' ')}
                                    </div>
                                    <div class="text-xs text-gray-500">
                                        Avg. {data.engagement}% engagement
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-4">Performance Trends</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                                <div>
                                    <div class="font-medium text-green-800">Views This Week</div>
                                    <div class="text-2xl font-bold text-green-900">
                                        {formatNumber(analyticsData.trends?.views_this_week || 0)}
                                    </div>
                                </div>
                                <div class="text-green-600">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                                    </svg>
                                </div>
                            </div>
                            
                            <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                <div>
                                    <div class="font-medium text-blue-800">Engagement This Week</div>
                                    <div class="text-2xl font-bold text-blue-900">
                                        {analyticsData.trends?.engagement_this_week || 0}%
                                    </div>
                                </div>
                                <div class="text-blue-600">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                                    </svg>
                                </div>
                            </div>

                            <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                                <div>
                                    <div class="font-medium text-yellow-800">New Followers</div>
                                    <div class="text-2xl font-bold text-yellow-900">
                                        +{formatNumber(Math.max(analyticsData.trends?.new_followers || 0, 0))}
                                    </div>
                                </div>
                                <div class="text-yellow-600">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {#if analyticsData.account_insights}
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Account Overview</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div class="text-center p-4 bg-gray-50 rounded-lg">
                                    <div class="text-2xl font-bold text-gray-900">
                                        {formatNumber(analyticsData.account_insights.total_impressions || 0)}
                                    </div>
                                    <div class="text-sm text-gray-600">Total Impressions</div>
                                </div>
                                <div class="text-center p-4 bg-gray-50 rounded-lg">
                                    <div class="text-2xl font-bold text-gray-900">
                                        {formatNumber(analyticsData.account_insights.total_reach || 0)}
                                    </div>
                                    <div class="text-sm text-gray-600">Total Reach</div>
                                </div>
                                <div class="text-center p-4 bg-gray-50 rounded-lg">
                                    <div class="text-2xl font-bold text-gray-900">
                                        {formatNumber(analyticsData.account_insights.profile_views || 0)}
                                    </div>
                                    <div class="text-sm text-gray-600">Profile Views</div>
                                </div>
                                <div class="text-center p-4 bg-gray-50 rounded-lg">
                                    <div class="text-2xl font-bold text-gray-900">
                                        {formatNumber(analyticsData.account_insights.follower_count || 0)}
                                    </div>
                                    <div class="text-sm text-gray-600">Followers</div>
                                </div>
                            </div>
                        </div>
                    {/if}
                {:else}
                    <div class="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                        <p class="text-gray-600">No analytics data available</p>
                        <button on:click={fetchAnalyticsData} class="mt-2 text-indigo-600 underline">
                            Load Analytics
                        </button>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</div>

<style>
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.5s ease-out forwards;
    }
</style>