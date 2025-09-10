<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { analyzeWebsite } from '$lib/projects/core_analysis';
    import { projectStore, isLoading, error as projectError } from '$lib/projects/stores';

    let formData = {
        url: '',
        business_name: '',
        target_audience: '',
        description: '',
        tone: '',
        industry: ''
    };
    let isFillingWithAI = false;
    let formError = '';
    let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // Reactive statements for store values
    $: isSubmitting = $isLoading;
    $: storeError = $projectError;

    // Reset form on mount
    onMount(() => {
        formData = {
            url: '',
            business_name: '',
            target_audience: '',
            description: '',
            tone: '',
            industry: ''
        };
        // Clear any previous errors
        projectStore.clearError();
    });

    // Handle form submission to create project
    async function handleSubmit() {
        if (isSubmitting) return;
        if (!formData.url || !formData.url.includes('://')) {
            formError = 'Please enter a valid URL (e.g., https://example.com)';
            return;
        }

        formError = '';
        
        try {
            const savedProject = await projectStore.createProject(token, formData);
            console.log('Project created and stored:', savedProject);
            goto(`/projects/${savedProject.id}/integrations`);
        } catch (err) {
            formError = err.message || 'Something went wrong. Please try again.';
        }
    }

    // Handle "Fill with AI" button
    async function handleFillWithAI() {
        if (isFillingWithAI || !formData.url || !formData.url.includes('://')) {
            formError = 'Please enter a valid URL before using AI fill.';
            return;
        }

        if (!token) {
            formError = 'Authentication required. Please log in again.';
            return;
        }

        isFillingWithAI = true;
        formError = '';

        try {
            console.log('Calling analyzeWebsite with:', formData.url);
            const analysisResult = await analyzeWebsite(formData.url, token);
            console.log('Analysis result received:', analysisResult);
            
            // Update formData with explicit reactivity trigger
            formData = {
                ...formData, // Keep existing values
                business_name: formData.business_name || analysisResult.business_name || '',
                target_audience: formData.target_audience || analysisResult.target_audience || '',
                description: formData.description || analysisResult.description || '',
                tone: formData.tone || analysisResult.tone || '',
                industry: formData.industry || analysisResult.industry || ''
            };
            
            console.log('Form data updated:', formData);
        } catch (err) {
            console.error('AI fill error:', err);
            formError = err.message || 'Failed to fetch AI data. Please try again or fill manually.';
        } finally {
            isFillingWithAI = false;
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter' && !isSubmitting && !isFillingWithAI) {
            handleSubmit();
        }
    }

    // Clear error when user starts typing
    function clearError() {
        if (formError) formError = '';
        if (storeError) projectStore.clearError();
    }

    // Compute the display error (prioritize form errors over store errors)
    $: displayError = formError || storeError;
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

    .gentle-float {
        animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }

    .success-border {
        border-color: #10b981 !important;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
</style>

<section class="flex items-center justify-center min-h-screen bg-white font-[Poppins] text-gray-900 py-8 px-4" transition:fade>
    <div class="max-w-lg mx-auto">
        <div class="text-center mb-6">
            <h1 class="text-3xl font-semibold text-zinc-700 leading-tight">
                Start a New <span class="font-['Pacifico']">Project</span>
            </h1>
            <p class="text-base text-gray-500 mt-2">
                Set up your project. Fill details manually or use AI.
            </p>
        </div>

        <div class="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div>
                    <label for="url" class="block text-sm font-medium text-gray-700">
                        Website URL <span class="text-red-500">*</span>
                    </label>
                    <input
                        bind:value={formData.url}
                        on:keypress={handleKeyPress}
                        on:input={clearError}
                        id="url"
                        type="url"
                        placeholder="https://yourwebsite.com"
                        class="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
                        required
                    />
                </div>
                
                <div>
                    <button
                        type="button"
                        on:click={handleFillWithAI}
                        disabled={isFillingWithAI || isSubmitting || !formData.url}
                        class="w-full bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200"
                    >
                        {#if isFillingWithAI}
                            <span class="flex items-center justify-center">
                                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing...
                            </span>
                        {:else}
                            Fill with AI
                        {/if}
                    </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="business_name" class="block text-sm font-medium text-gray-700">Business Name</label>
                        <input
                            bind:value={formData.business_name}
                            on:keypress={handleKeyPress}
                            on:input={clearError}
                            id="business_name"
                            type="text"
                            placeholder="Your Business"
                            class="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
                        />
                    </div>
                    <div>
                        <label for="industry" class="block text-sm font-medium text-gray-700">Industry</label>
                        <input
                            bind:value={formData.industry}
                            on:input={clearError}
                            id="industry"
                            type="text"
                            placeholder="e.g., SaaS, E-commerce"
                            class="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
                        />
                    </div>
                </div>
                
                <div>
                    <label for="target_audience" class="block text-sm font-medium text-gray-700">Target Audience</label>
                    <textarea
                        bind:value={formData.target_audience}
                        on:input={clearError}
                        id="target_audience"
                        placeholder="e.g., Small business owners"
                        class="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
                        rows="3"
                    ></textarea>
                </div>
                
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        bind:value={formData.description}
                        on:input={clearError}
                        id="description"
                        placeholder="Describe your project"
                        class="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
                        rows="3"
                    ></textarea>
                </div>
                
                <div>
                    <label for="tone" class="block text-sm font-medium text-gray-700">Tone</label>
                    <input
                        bind:value={formData.tone}
                        on:input={clearError}
                        id="tone"
                        type="text"
                        placeholder="e.g., Professional, Casual"
                        class="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
                    />
                </div>
                
                {#if displayError}
                    <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p class="text-red-600 text-sm">{displayError}</p>
                    </div>
                {/if}
                
                <div class="text-center">
                    <button
                        type="submit"
                        disabled={isSubmitting || isFillingWithAI}
                        class="bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-all relative"
                    >
                        {#if isSubmitting}
                            <span class="flex items-center justify-center">
                                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </span>
                        {:else}
                            Start Project
                        {/if}
                        <div class="absolute top-0 right-0 w-3 h-3 bg-orange-400 rounded-full gentle-float" style="animation-delay: -3s;"></div>
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>