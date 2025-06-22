<!-- lib/components/KeywordsOverview.svelte -->
<script lang="ts">
    export let keywords = [];
    export let projectId = "";
    
    function navigateToSection(section) {
      // Navigate to the keywords section
      window.location.href = `${projectId}/${section}`;
    }
  </script>
  
  <div class="mb-8">
    <div class="flex items-center mb-4">
      <h2 class="text-xl font-medium text-zinc-100">Target Keywords</h2>
      <button 
        on:click={() => navigateToSection('keywords')}
        class="text-sm text-zinc-300 ml-auto hover:underline flex items-center"
      >
        View All Keywords <span class="text-lg ml-1">→</span>
      </button>
    </div>
    
    <div class="bg-zinc-950 rounded-xl border border-zinc-900 p-5">
      <div class="flex flex-wrap gap-2">
        {#each keywords.slice(0, 8) as keyword, i}
          <div class="bg-zinc-800 rounded-full px-3 py-1 flex items-center">
            <span class="text-sm text-zinc-300">{keyword.keyword}</span>
            {#if keyword.volume}
              <span class="ml-2 text-xs text-zinc-500 bg-zinc-700 px-2 py-0.5 rounded-full">{keyword.volume}</span>
            {/if}
          </div>
        {/each}
        {#if keywords.length > 8}
          <div class="bg-zinc-800/50 rounded-full px-3 py-1 flex items-center">
            <span class="text-sm text-zinc-500">+{keywords.length - 8} more</span>
          </div>
        {/if}
      </div>
    </div>
  </div>