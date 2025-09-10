//Old StartNewProject

<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { userStore, wipIdeasStore } from '$lib/stores';
    import { get_user } from '$lib/check';
    import { fly } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import { runAnalysisOnly, saveProject, type AnalysisResult } from '$lib/db';
    import UpgradeModal from './UpgradeModule.svelte';

    // Stores & State
    let isLoading = writable(false);
    let error = writable<string | null>(null);
    let analysisResult = writable<AnalysisResult | null>(null);
    let showTooltip = writable('');
    let showUpgradeModal = false;

    // Form data
    let clientUrl = '';

    onMount(async () => {
        try {
            const userData = await get_user();
            if (userData) {
                userStore.set({
                    username: userData.username,
                    user_id: userData.user_id,
                    user_email: userData.email,
                    subscription_status: "premium"
                });
            } else {
                error.set('User data could not be fetched.');
            }
        } catch (e: any) {
            error.set('An error occurred while fetching user data: ' + e.message);
        }
    });

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;



    function closeUpgradeModal() {
        showUpgradeModal = false;
    }

    async function handleStartProject() {
        if ($userStore?.subscription_status !== 'premium' && $wipIdeasStore.length >= 1) {
            showUpgradeModal = true;
            return;
        }

        isLoading.set(true);
        error.set(null);
        analysisResult.set(null);

        try {
            const analysisResultData = await runAnalysisOnly(clientUrl);
            analysisResult.set(analysisResultData);

            const savedProject = await saveProject(
                token,
                clientUrl,
                '',
                '',
                analysisResultData
            );

            isLoading.set(false);
            goto(`/projects/${savedProject.id}`);

        } catch (err: any) {
            error.set(err.message || 'Something went wrong while starting the project.');
            isLoading.set(false);
        }
    }

    $: $userStore;
    $: $isLoading;
    $: $error;
    $: $analysisResult;
</script>

{#if showUpgradeModal}
    <UpgradeModal on:close={closeUpgradeModal} />
{/if}

<div class="max-h-screen overflow-hidden overflow-y-scroll bg-black text-white">
   

    <main class="px-8 py-12">
        <div class="max-w-4xl mx-auto">
            {#if $isLoading}
                <!-- Loading State -->
                <div class="bg-zinc-950 rounded-xl border border-zinc-800 p-12 text-center">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 rounded-xl mb-6">
                        <svg class="w-8 h-8 text-zinc-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                    </div>
                    <h2 class="text-xl font-semibold text-white mb-2">Analyzing Website</h2>
                    <p class="text-zinc-400 mb-6">This may take a few minutes...</p>
                    
                    <div class="flex items-center justify-center space-x-8 text-sm">
                        <div class="flex items-center space-x-2">
                            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span class="text-zinc-300">Scanning content</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-2 h-2 bg-zinc-600 rounded-full"></div>
                            <span class="text-zinc-500">Processing data</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-2 h-2 bg-zinc-600 rounded-full"></div>
                            <span class="text-zinc-500">Generating insights</span>
                        </div>
                    </div>
                </div>
            {:else}
                <!-- Main Form -->
                <div class="grid grid-cols-12 gap-8">
                    <!-- Left Column - URL Input -->
                    <div class="col-span-12 lg:col-span-7">
                        <div class="bg-zinc-950 rounded-xl border border-zinc-800 p-8">
                            <form on:submit|preventDefault={handleStartProject} class="space-y-8">
                                <!-- URL Input -->
                                <div class="space-y-3">
                                    <label for="website-url" class="block text-sm font-medium text-zinc-300">
                                        Website URL
                                    </label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg class="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                                            </svg>
                                        </div>
                                        <input
                                            type="url"
                                            bind:value={clientUrl}
                                            id="website-url"
                                            class="pl-12 block w-full rounded-lg bg-zinc-900 border border-zinc-700 py-3 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all duration-200"
                                            placeholder="https://yourbusiness.com"
                                            required
                                        >
                                    </div>
                                    <p class="text-xs text-zinc-400 mt-2">
                                        Enter your website URL to begin comprehensive business analysis
                                    </p>
                                </div>

                                <!-- Submit Button -->
                                <div class="pt-4">
                                    <button
                                        type="submit"
                                        class="w-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 border border-zinc-700 hover:border-zinc-600"
                                        disabled={$isLoading}
                                    >
                                        {#if $isLoading}
                                            <div class="flex items-center justify-center gap-2">
                                                <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                                </svg>
                                                <span>Analyzing...</span>
                                            </div>
                                        {:else}
                                            Start Analysis
                                        {/if}
                                    </button>
                                </div>
                            </form>

                            {#if $error}
                                <div class="mt-4 p-3 bg-red-900/20 border border-red-800 text-red-300 rounded-lg text-sm" transition:fly={{ y: -10, duration: 200 }}>
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span>{$error}</span>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>

                    <!-- Right Column - Info -->
                    <div class="col-span-12 lg:col-span-5 space-y-6">
                        <!-- What happens next -->
                        <div class="bg-zinc-950 rounded-xl border border-zinc-800 p-6">
                            <h3 class="text-sm font-medium text-zinc-300 uppercase tracking-wider mb-4">
                                What happens next
                            </h3>
                            <div class="space-y-4">
                                <div class="flex items-start gap-3">
                                    <div class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-1">
                                        1
                                    </div>
                                    <div>
                                        <h4 class="text-white font-medium text-sm mb-1">Initial Analysis</h4>
                                        <p class="text-zinc-400 text-xs">AI performs basic website and business analysis</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-3">
                                    <div class="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-bold mt-1">
                                        2
                                    </div>
                                    <div>
                                        <h4 class="text-white font-medium text-sm mb-1">Project Dashboard</h4>
                                        <p class="text-zinc-400 text-xs">Access your AI Command Center with available agents</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-3">
                                    <div class="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-bold mt-1">
                                        3
                                    </div>
                                    <div>
                                        <h4 class="text-white font-medium text-sm mb-1">Interact with AI Agents</h4>
                                        <p class="text-zinc-400 text-xs">Choose and use AI agents as needed from your dashboard</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Available AI Agents -->
                        <div class="bg-zinc-950 rounded-xl border border-zinc-800 p-6">
                            <h3 class="text-sm font-medium text-zinc-300 uppercase tracking-wider mb-4">
                                Available AI Agents
                            </h3>
                            <div class="space-y-3">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                        SEO
                                    </div>
                                    <div>
                                        <div class="text-white text-sm font-medium">SEO Intelligence</div>
                                        <div class="text-zinc-400 text-xs">Keyword research & content optimization</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                        X
                                    </div>
                                    <div>
                                        <div class="text-white text-sm font-medium">Twitter Strategy</div>
                                        <div class="text-zinc-400 text-xs">Tweet generation & engagement tracking</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                        R
                                    </div>
                                    <div>
                                        <div class="text-white text-sm font-medium">Reddit Intelligence</div>
                                        <div class="text-zinc-400 text-xs">Community engagement & content creation</div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                                <p class="text-zinc-400 text-xs">
                                    After analysis, interact with these AI agents from your dashboard to generate targeted content and strategies.
                                </p>
                            </div>
                        </div>

                        <!-- Estimated time -->
                        <div class="bg-zinc-950 rounded-xl border border-zinc-800 p-6">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-white font-medium text-sm">Initial Analysis</div>
                                    <div class="text-zinc-400 text-xs">1-2 minutes for basic business overview</div>
                                </div>
                            </div>
                            <div class="mt-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                                <p class="text-zinc-400 text-xs">
                                    Quick setup gets you started. Deep analysis happens when you interact with specific AI agents in your dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </main>
</div>

<style>
    /* Match the dashboard styling */
    :global(input:focus), :global(select:focus), :global(textarea:focus) {
        outline: none;
        ring: 2px solid rgba(113, 113, 122, 0.5);
    }

    :global(.line-clamp-2) {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
</style>