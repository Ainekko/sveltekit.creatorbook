<!-- $lib/components/OrionCompetitorRankings.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
  
    export let competitorDomains = [];
    export let competitorInput = '';
    export let competitorRankings = [];
    export let isFetchingRankings = false;
  
    const dispatch = createEventDispatcher();
  </script>
  
  <div class="space-y-6">
    <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
      <h2 class="text-xl font-bold text-white mb-4">Competitor SERP Position Tracking</h2>
      <!-- Input for competitor domains -->
      <div class="mb-6">
        <div class="flex items-center gap-2 mb-4">
          <input 
            type="text" 
            bind:value={competitorInput} 
            placeholder="Enter competitor domain (e.g., example.com)" 
            class="bg-zinc-800 text-white px-4 py-2 rounded w-full"
          />
          <button on:click={() => dispatch('addCompetitor')} class="bg-emerald-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          {#each competitorDomains as domain}
            <div class="flex items-center bg-zinc-800 px-3 py-1 rounded">
              <span class="text-zinc-300">{domain}</span>
              <button on:click={() => dispatch('removeCompetitor', { domain })} class="ml-2 text-red-400">×</button>
            </div>
          {/each}
        </div>
      </div>
      <!-- Fetch button -->
      <div class="flex justify-end mb-4">
        <button 
          on:click={() => dispatch('fetchRankings')} 
          disabled={isFetchingRankings || competitorDomains.length === 0}
          class="bg-white text-black px-4 py-2 rounded"
        >
          {isFetchingRankings ? 'Fetching...' : 'Fetch Rankings'}
        </button>
      </div>
      <!-- Rankings Table -->
      {#if competitorRankings.length > 0}
        <div class="overflow-x-auto">
          <table class="w-full text-left text-zinc-300">
            <thead>
              <tr class="border-b border-zinc-800">
                <th class="py-2">Keyword</th>
                {#each competitorDomains as domain}
                  <th class="py-2">{domain}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each competitorRankings as ranking}
                <tr class="border-b border-zinc-900">
                  <td class="py-2">{ranking.keyword}</td>
                  {#each competitorDomains as domain}
                    <td class="py-2">{ranking.positions[domain] || 'N/A'}</td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <p class="text-zinc-500 text-center py-4">Add competitors and fetch rankings to see data.</p>
      {/if}
    </div>
  </div>