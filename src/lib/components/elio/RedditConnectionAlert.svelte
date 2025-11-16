<!-- src/lib/components/elio/RedditConnectionAlert.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { LogIn } from 'lucide-svelte';
  
    export let redditConnecting;
  
    const dispatch = createEventDispatcher();
  </script>
  
  <div class="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
    <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
      <LogIn class="w-5 h-5 text-orange-600" />
    </div>
    <div class="flex-1">
      <h3 class="font-semibold text-orange-900 mb-1">Connect Your Reddit Account</h3>
      <p class="text-sm text-orange-700">Connect your Reddit account to scan for opportunities and interact with communities directly.</p>
    </div>
    <button
      on:click={() => dispatch('connectReddit')}
      disabled={redditConnecting}
      class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50 flex-shrink-0"
    >
      {redditConnecting ? 'Connecting...' : 'Connect Now'}
    </button>
  </div>