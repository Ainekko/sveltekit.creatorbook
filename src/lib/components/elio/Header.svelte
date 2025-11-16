<!-- src/lib/components/elio/Header.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { LogIn, LogOut } from 'lucide-svelte';
  
    export let projectData;
    export let redditConnected;
    export let redditUsername;
    export let redditConnecting;
    export let scanning;
    export let view;
    export let opportunities;
  
    const dispatch = createEventDispatcher();
  </script>
  
  <div class="mb-6 sm:mb-8">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-zinc-900 flex items-center gap-2">
          <img src="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png" alt="Reddit" class="w-8 h-8" />
          Elio Reddit Assistant
        </h1>
        <p class="text-sm sm:text-base text-zinc-600 mt-1">
          {#if projectData}
            Managing Reddit presence for {projectData.business_name || 'your project'}
          {/if}
        </p>
      </div>
  
      <div class="flex gap-2 sm:gap-3 flex-wrap">
        <!-- Reddit Auth Button -->
        {#if redditConnected}
          <div class="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-green-700">u/{redditUsername}</span>
            <button
              on:click={() => dispatch('disconnectReddit')}
              class="ml-2 p-1 hover:bg-green-100 rounded transition-colors"
              title="Disconnect"
            >
              <LogOut class="w-4 h-4 text-green-600" />
            </button>
          </div>
        {:else}
          <button
            on:click={() => dispatch('connectReddit')}
            disabled={redditConnecting}
            class="px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-medium text-sm disabled:opacity-50 flex items-center gap-2 shadow-sm"
          >
            <LogIn class="w-4 h-4" />
            {redditConnecting ? 'Connecting...' : 'Connect Reddit'}
          </button>
        {/if}
  
        {#if view === 'opportunities' && opportunities.some(o => o.is_dismissed)}
          <button
            on:click={() => dispatch('clearDismissed')}
            class="px-3 sm:px-4 py-2 bg-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-300 transition-colors font-medium text-xs sm:text-sm"
          >
            Clear Dismissed
          </button>
        {/if}
        <button
          on:click={() => dispatch('scanOpportunities')}
          disabled={scanning || !redditConnected}
          class="px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg transition-colors font-medium text-xs sm:text-sm disabled:opacity-50 shadow-md hover:shadow-lg"
          title={!redditConnected ? 'Connect Reddit account first' : ''}
        >
          {#if scanning}
            Scanning...
          {:else}
            Scan Opportunities
          {/if}
        </button>
      </div>
    </div>
  </div>