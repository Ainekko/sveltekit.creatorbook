<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { userStore, wipIdeasStore } from '$lib/stores';
    import { get_user } from '$lib/check';
    import { fly } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import { createProjectWorkflow, saveProject, type AnalysisResult } from '$lib/db'; // Import the new workflow function
    import UpgradeModal from './UpgradeModule.svelte';

    // Stores & State
    let isLoading = writable(false);
    let error = writable<string | null>(null);
    let analysisResult = writable<AnalysisResult | null>(null);
    let showTooltip = writable('');
    let showUpgradeModal = false;

    // Form data
    let clientUrl = '';
    let businessType = '';
    let marketingGoals = '';
    let selectedAddons: string[] = [];

    const agentAddons = [
        { id: 'find-leads', name: 'Find Leads', description: 'Discover potential customers and contact information', premium: true, icon: '👤' },
        { id: 'competitor-analysis', name: 'Competitor Deep Dive', description: 'Advanced competitor research and positioning analysis', premium: true, icon: '🎯' },
        { id: 'seo-audit', name: 'SEO Audit', description: 'Comprehensive SEO analysis and recommendations', premium: false, icon: '🔍' },
        { id: 'content-strategy', name: 'Content Strategy', description: 'AI-powered content calendar and topic suggestions', premium: true, icon: '📝' }
    ];

    onMount(async () => {
        try {
            const userData = await get_user();
            if (userData) {
                userStore.set({
                    username: userData.username,
                    user_id: userData.user_id,
                    user_email: userData.email,
                    subscription_status: "premium" // Hardcoded for example
                });
            } else {
                error.set('User data could not be fetched.');
            }
        } catch (e: any) {
            error.set('An error occurred while fetching user data: ' + e.message);
        }
    });

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    function toggleAddon(addonId: string) {
        if (selectedAddons.includes(addonId)) {
            selectedAddons = selectedAddons.filter(id => id !== addonId);
        } else {
            selectedAddons = [...selectedAddons, addonId];
        }
    }

    function showTooltipFor(addonId: string) {
        showTooltip.set(addonId);
        setTimeout(() => showTooltip.set(''), 3000);
    }

    function closeUpgradeModal() {
        showUpgradeModal = false;
    }

    /**
     * Handles the form submission to start a new project.
     * It now calls the corrected workflow function that respects selected addons.
     */
    async function handleStartProject() {
        if ($userStore?.subscription_status !== 'premium' && $wipIdeasStore.length >= 1) {
            showUpgradeModal = true;
            return;
        }

        isLoading.set(true);
        error.set(null);
        analysisResult.set(null);

        try {
            // ** CORE LOGIC FIX **
            // Call the new workflow function, passing in the selected addons.
            // This ensures the backend runs the correct task type.
            const analysisResultData = await createProjectWorkflow(clientUrl, ['analysis-only']);
            analysisResult.set(analysisResultData);

            const savedProject = await saveProject(
                token,
                clientUrl,
                businessType,
                marketingGoals,
                analysisResultData
            );

            isLoading.set(false);
            goto(`/projects/${savedProject.id}`);

        } catch (err: any) {
            error.set(err.message || 'Something went wrong while starting the project.');
            isLoading.set(false);
        }
    }

    // Reactive declarations
    $: $userStore;
    $: $isLoading;
    $: $error;
    $: $analysisResult;
    $: $showTooltip;
    $: $wipIdeasStore;
    $: isPremium = $userStore?.subscription_status === 'premium';

</script>
  
  {#if showUpgradeModal}
      <UpgradeModal on:close={closeUpgradeModal} />
  {/if}
  
  <div class="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 rounded-xl">
    <div class="max-w-3xl mx-auto">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-zinc-100 mb-2" in:fly={{ y: -20, duration: 300 }}>
                Start a New Project </h1>
            <p class="text-zinc-400 text-lg" in:fly={{ y: -20, duration: 300, delay: 100 }}>
                Enter your website URL to begin analyzing and set up your project. </p>
        </div>
  
        <div class="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-zinc-800/50 ring-1 ring-zinc-700/20" in:fly={{ y: 50, duration: 400, delay: 200 }}>
            <form on:submit|preventDefault={handleStartProject} class="space-y-8"> <div class="space-y-2">
                    <label for="website-url" class="block text-sm font-semibold text-zinc-200 mb-3">
                        Website URL
                    </label>
                    <div class="relative group">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                            </svg>
                        </div>
                        <input
                            type="url"
                            bind:value={clientUrl}
                            id="website-url"
                            class="pl-12 block w-full rounded-xl bg-zinc-800/50 border border-zinc-700/50 py-4 px-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all duration-200 hover:bg-zinc-800/70"
                            placeholder="https://yourbusiness.com"
                            required
                        >
                    </div>
                </div>
  
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-zinc-200">
                            AI Agents & Features
                        </h3>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span class="text-xs text-zinc-400">Free</span>
                            <div class="w-2 h-2 bg-amber-500 rounded-full ml-3"></div>
                            <span class="text-xs text-zinc-400">Premium</span>
                        </div>
                    </div>
  
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {#each agentAddons as addon}
                            <div class="relative">
                                <div
                                    class="group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer
                                        {addon.premium && !isPremium
                                            ? 'bg-zinc-800/30 border-zinc-700/30 opacity-60 cursor-not-allowed'
                                            : selectedAddons.includes(addon.id)
                                                ? 'bg-zinc-700/50 border-zinc-600 ring-2 ring-zinc-500/50'
                                                : 'bg-zinc-800/40 border-zinc-700/50 hover:bg-zinc-700/40 hover:border-zinc-600'
                                        }"
                                    on:click={() => {
                                        if (addon.premium && !isPremium) {
                                            showTooltipFor(addon.id);
                                        } else {
                                            toggleAddon(addon.id);
                                        }
                                    }}
                                    role="checkbox"
                                    aria-checked={selectedAddons.includes(addon.id)}
                                    tabindex="0"
                                    on:keydown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (addon.premium && !isPremium) showTooltipFor(addon.id); else toggleAddon(addon.id); }}}
                                >
                                    <div class="flex items-start gap-3">
                                        <div class="text-2xl flex-shrink-0">
                                            {addon.icon}
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-center gap-2 mb-1">
                                                <h4 class="font-medium text-zinc-200 text-sm">
                                                    {addon.name}
                                                </h4>
                                                {#if addon.premium}
                                                    <div class="flex items-center gap-1">
                                                        <div class="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                        {#if !isPremium}
                                                            <svg class="w-3 h-3 text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                                                            </svg>
                                                        {/if}
                                                    </div>
                                                {:else}
                                                    <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                {/if}
                                            </div>
                                            <p class="text-xs text-zinc-400 leading-relaxed">
                                                {addon.description}
                                            </p>
                                        </div>
                                        {#if selectedAddons.includes(addon.id)}
                                            <div class="flex-shrink-0">
                                                <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                        {/if}
                                    </div>
                                </div>
  
                                {#if $showTooltip === addon.id && addon.premium && !isPremium}
                                    <div
                                        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
                                        transition:fly={{ y: 10, duration: 200 }}
                                    >
                                        <div class="bg-zinc-800 text-zinc-200 text-xs rounded-lg py-2 px-3 shadow-lg border border-zinc-700 whitespace-nowrap">
                                            <div class="flex items-center gap-2">
                                                <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <span>Premium Feature - Upgrade Required!</span> </div>
                                            <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-800"></div>
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                </div>
  
                <div class="pt-6">
                    <button
                        type="submit"
                        class="w-full relative px-8 py-4 text-base font-semibold rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed
                            {$isLoading
                                ? 'bg-zinc-700 text-zinc-300 cursor-not-allowed'
                                : 'bg-gradient-to-r from-zinc-700 to-zinc-600 hover:from-zinc-600 hover:to-zinc-700 text-white focus:ring-amber-500 transform hover:scale-[1.02] active:scale-[0.98]'
                            }"
                        disabled={$isLoading}
                    >
                        {#if $isLoading}
                            <div class="flex items-center justify-center gap-3">
                                <div class="w-5 h-5 border-2 border-t-zinc-300 border-zinc-600 rounded-full animate-spin"></div>
                                <span>Analyzing...</span>
                            </div>
                        {:else}
                            <div class="flex items-center justify-center gap-2">
                                
                                <span>Analyze & Start Project</span> </div>
                        {/if}
                    </button>
                </div>
            </form>
  
            {#if $error}
                <div class="mt-6 p-4 bg-red-900/20 border border-red-800/50 text-red-300 rounded-xl text-sm backdrop-blur-sm" transition:fly={{ y: -10, duration: 200 }}>
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        <span>{$error}</span>
                    </div>
                </div>
            {/if}
  
            {#if $isLoading}
                <div class="mt-8 text-center" transition:fly={{ y: 10, duration: 300 }}>
                    <div class="inline-flex flex-col items-center justify-center space-y-4 p-6 bg-zinc-800/30 rounded-xl border border-zinc-700/50 backdrop-blur-sm">
                        <div class="relative">
                            <div class="w-12 h-12 border-4 border-zinc-700 rounded-full"></div>
                            <div class="absolute top-0 left-0 w-12 h-12 border-4 border-t-zinc-300 rounded-full animate-spin"></div>
                        </div>
                        <div class="space-y-2">
                            <p class="text-base font-medium text-zinc-200">
                                Analyzing your website... </p>
                            <p class="text-sm text-zinc-400">
                                This might take a minute or two. </p>
                        </div>
                        <div class="flex items-center space-x-2 mt-4">
                            <div class="flex items-center space-x-1">
                                <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span class="text-xs text-zinc-400">Website Analysis</span>
                            </div>
                            <div class="w-1 h-1 bg-zinc-600 rounded-full"></div>
                            <div class="flex items-center space-x-1">
                                <div class="w-2 h-2 bg-zinc-600 rounded-full"></div>
                                <span class="text-xs text-zinc-500">Project Setup</span> </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
  </div>