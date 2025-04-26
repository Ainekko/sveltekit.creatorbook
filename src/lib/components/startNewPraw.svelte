<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { userStore } from '$lib/stores';
    import { get_user } from '$lib/check';
    // @ts-ignore
    import { fly } from 'svelte/transition';
    // @ts-ignore
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { saveProject, analyzeWebsiteAndWait } from '$lib/db';
  
    // Stores
    let isLoading = writable(false);
    let error = writable(null);
    let analysisResult = writable(null);
    
    // Form data
    let clientUrl = '';
    let businessType = '';
    let marketingGoals = '';
    
    onMount(async () => {
      try {
        // Get user data
        const userData = await get_user();
        if (userData) {
          userStore.set({
            username: userData.username,
            user_id: userData.user_id,
            user_email: userData.email,
            subscription_status: userData.subscription_status
          });
        } else {
          // @ts-ignore
          error.set('User data could not be fetched.');
        }
      } catch (e) {
        // @ts-ignore
        error.set('An error occurred while fetching user data: ' + e.message);
      }
    });
  
  const token = localStorage.getItem('token');
  
    
  async function handleAnalyzeWebsite() {
  isLoading.set(true);
  error.set(null);
  analysisResult.set(null);

  try {
    const analysisResultData = await analyzeWebsiteAndWait(clientUrl);
    // @ts-ignore
    analysisResult.set(analysisResultData);

    const savedProject = await saveProject(
      token,
      clientUrl,
      businessType,
      marketingGoals,
      analysisResultData
    );

    isLoading.set(false); // ✅ stop loader
    goto(`/projects/${savedProject.id}`);

  } catch (err) {
    // @ts-ignore
    error.set(err.message || 'Something went wrong.');
    isLoading.set(false); // ✅ always stop loader
  }
}


    
    // Reactive declarations
   // @ts-ignore
     $: $userStore;
   // @ts-ignore
     $: $isLoading;
   // @ts-ignore
     $: $error;
   // @ts-ignore
     $: $analysisResult;
  </script>
  
  
  
  <div class="min-h-56 w-full bg-zinc- p-6">
    <!-- New Analysis Form -->
    <div class="max-w-2xl mx-auto bg-zinc- rounded-xl p-6 shadow-sm border border-zinc-900">
      <h2 class="text-xl font-bold mb-6 text-zinc-100">Create New Content</h2>
      
      <form on:submit|preventDefault={handleAnalyzeWebsite} class="space-y-6">
        <div>
          <label for="website-url" class="block text-sm font-medium text-zinc-300 mb-1">Website URL</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
            </div>
            <input 
              type="url" 
              bind:value={clientUrl} 
              id="website-url" 
              class="pl-10 block w-full rounded-lg  bg-zinc-900 py-3 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent" 
              placeholder="https://yourbusiness.com"
              required
            >
          </div>
        </div>
        
        
        
        
        
        <div class="pt-2">
          <button 
            type="submit" 
            class="w-full px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-black border-zinc-900 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            disabled={$isLoading}
          >
            {$isLoading ? 'Analyzing...' : 'Generate'}
          </button>
        </div>
      </form>
  
      {#if $error}
        <div class="mt-4 p-3 bg-red-900/50 text-red-300 rounded-lg text-sm">
          {$error}
        </div>
      {/if}
  
      {#if $isLoading}
        <div class="mt-6 flex flex-col items-center justify-center">
          <div class="w-8 h-8 border-4 border-t-zinc-300 rounded-full animate-spin"></div>
          <p class="mt-4 text-sm text-zinc-300">Analyzing your website and competitors...</p>
          <p class="text-xs text-zinc-400">This may take 3-5 minutes</p>
        </div>
      {/if}
    </div>
  </div>