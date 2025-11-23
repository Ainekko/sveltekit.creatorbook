<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import { API_BASE_URL } from '$lib/config';
    import { Check, ArrowRight, ArrowLeft } from 'lucide-svelte';

    export let visible = false;

    const dispatch = createEventDispatcher();
    
    // State
    let step = 1;
    let loading = false;
    
    // Data
    let selectedSource = '';
    let otherSourceText = '';
    let selectedIntent = '';
    let otherIntentText = '';

    const sourceOptions = [
        { id: 'reddit', label: 'Reddit' },
        { id: 'twitter', label: 'Twitter / X' },
        { id: 'google', label: 'Google Search' },
        { id: 'friend', label: 'Friend / Colleague' },
        { id: 'other', label: 'Other' }
    ];

    const intentOptions = [
        { id: 'personal', label: 'Personal Project' },
        { id: 'business', label: 'Business / Startup' },
        { id: 'agency', label: 'Marketing Agency' },
        { id: 'student', label: 'Student / Education' },
        { id: 'other', label: 'Other' }
    ];

    function nextStep() {
        if (step === 1 && (selectedSource || (selectedSource === 'other' && otherSourceText))) {
            step = 2;
        }
    }

    function prevStep() {
        if (step === 2) {
            step = 1;
        }
    }

    async function submit() {
        loading = true;
        const source = selectedSource === 'other' ? otherSourceText : selectedSource;
        const intent = selectedIntent === 'other' ? otherIntentText : selectedIntent;
        
        try {
            await fetch(`${API_BASE_URL}/users/onboarding/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ source, intent })
            });
        } catch (e) {
            console.error('Failed to submit onboarding data', e);
        } finally {
            loading = false;
            dispatch('complete');
        }
    }

    function skip() {
        dispatch('complete');
    }
</script>

{#if visible}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" transition:fade={{ duration: 200 }}>
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" on:click={skip}></div>

        <!-- Modal -->
        <div 
            class="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            transition:scale={{ start: 0.95, duration: 200 }}
        >
            <!-- Progress Bar -->
            <div class="h-1.5 w-full bg-zinc-100">
                <div 
                    class="h-full bg-zinc-900 transition-all duration-300 ease-out"
                    style="width: {step === 1 ? '50%' : '100%'}"
                ></div>
            </div>

            <!-- Header -->
            <div class="p-8 pb-0 text-center">
                {#if step === 1}
                    <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-6" in:fade>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-zinc-900 mb-2" in:fade>Quick Question!</h2>
                    <p class="text-zinc-500" in:fade>Where did you hear about us? This helps us improve.</p>
                {:else}
                    <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 text-purple-600 mb-6" in:fade>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-zinc-900 mb-2" in:fade>One last thing...</h2>
                    <p class="text-zinc-500" in:fade>How do you plan to use the app?</p>
                {/if}
            </div>

            <!-- Content -->
            <div class="p-8 space-y-3 overflow-y-auto">
                {#if step === 1}
                    <div class="grid grid-cols-1 gap-3" in:fade={{ duration: 200 }}>
                        {#each sourceOptions as option}
                            <button
                                class="relative flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200
                                {selectedSource === option.id 
                                    ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' 
                                    : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700'}"
                                on:click={() => selectedSource = option.id}
                            >
                                {#if selectedSource === option.id}
                                    <div class="absolute top-1/2 -translate-y-1/2 right-4 text-blue-600">
                                        <Check class="w-5 h-5" />
                                    </div>
                                {/if}
                                <span class="font-medium">{option.label}</span>
                            </button>
                        {/each}

                        {#if selectedSource === 'other'}
                            <div transition:fade>
                                <input
                                    type="text"
                                    placeholder="Please specify..."
                                    bind:value={otherSourceText}
                                    class="w-full p-3 rounded-xl border border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                />
                            </div>
                        {/if}
                    </div>
                {:else}
                    <div class="grid grid-cols-1 gap-3" in:fade={{ duration: 200 }}>
                        {#each intentOptions as option}
                            <button
                                class="relative flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200
                                {selectedIntent === option.id 
                                    ? 'border-purple-500 bg-purple-50 text-purple-700 ring-1 ring-purple-500' 
                                    : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700'}"
                                on:click={() => selectedIntent = option.id}
                            >
                                {#if selectedIntent === option.id}
                                    <div class="absolute top-1/2 -translate-y-1/2 right-4 text-purple-600">
                                        <Check class="w-5 h-5" />
                                    </div>
                                {/if}
                                <span class="font-medium">{option.label}</span>
                            </button>
                        {/each}

                        {#if selectedIntent === 'other'}
                            <div transition:fade>
                                <input
                                    type="text"
                                    placeholder="Please specify..."
                                    bind:value={otherIntentText}
                                    class="w-full p-3 rounded-xl border border-zinc-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                                />
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>

            <!-- Footer -->
            <div class="p-6 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between mt-auto">
                {#if step === 1}
                     <button 
                        on:click={skip}
                        class="text-sm font-medium text-zinc-500 hover:text-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
                    >
                        Skip
                    </button>
                    <button
                        on:click={nextStep}
                        disabled={!selectedSource || (selectedSource === 'other' && !otherSourceText)}
                        class="bg-zinc-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                        Next <ArrowRight class="w-4 h-4" />
                    </button>
                {:else}
                    <button 
                        on:click={prevStep}
                        class="text-sm font-medium text-zinc-500 hover:text-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft class="w-4 h-4" /> Back
                    </button>
                    <button
                        on:click={submit}
                        disabled={!selectedIntent || (selectedIntent === 'other' && !otherIntentText) || loading}
                        class="bg-zinc-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                        {#if loading}
                            <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Finishing up...
                        {:else}
                            Get Started <ArrowRight class="w-4 h-4" />
                        {/if}
                    </button>
                {/if}
            </div>
        </div>
    </div>
{/if}
