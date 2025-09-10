<!-- $lib/components/OrionKeywordResearch.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
  
    
    export let keywords = [];
    export let selectedKeywords = [];
    export let isGenerating = false;
  
    const dispatch = createEventDispatcher();
  </script>
  
  <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-white">Keyword Research</h2>
      <button on:click={() => dispatch('generate')} disabled={isGenerating} class="bg-white text-black px-4 py-2 rounded">
        {isGenerating ? 'Generating...' : 'Generate Keywords'}
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-zinc-300">
        <thead>
          <tr class="border-b border-zinc-800">
            <th class="py-2">Select</th>
            <th class="py-2">Keyword</th>
            <th class="py-2">Monthly Searches</th>
            <th class="py-2">Competition</th>
            <th class="py-2">Cpc (Low)</th>
            <th class="py-2">Keyword difficulty</th>
            <th class="py-2">Trend</th>
          </tr>
        </thead>
        <tbody>
          {#each keywords as kw}
            <tr class="border-b border-zinc-900">
              <td class="py-2"><input type="checkbox" bind:group={selectedKeywords} value={kw} /></td>
              <td class="py-2">{kw.keyword}</td>
              <td class="py-2">{kw.monthly_searches}</td>
              <td class="py-2">{kw.competition}</td>
              <td class="py-2">${kw.cpc}</td>
              <td class="py-2">${kw.keyword_difficulty}</td>
              <td class="py-2">{kw.trend}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {#if keywords.length === 0}
      <p class="text-zinc-500 text-center py-4">No keywords available. Generate to fetch from API.</p>
    {/if}
    <div class="mt-4 flex justify-end">
      <button 
        on:click={() => dispatch('createOutlines')} 
        disabled={selectedKeywords.length === 0 || isGenerating}
        class="bg-emerald-500 text-white px-4 py-2 rounded"
      >
        Create Outlines from Selected ({selectedKeywords.length})
      </button>
    </div>
  </div>