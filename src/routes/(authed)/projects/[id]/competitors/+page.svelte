<script>
    export let data
  </script>
  
  <div class="mb-6">
    <h2 class="text-xl font-medium text-zinc-300">Competitor Analysis</h2>
    <p class="text-zinc-400 text-sm mt-1">Analyze competitor strategies and find market gaps</p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-96">
    {#each data.project.result.analysis_data.analyze_competitors.competitors_analysis as competitor}
      <div class="border border-zinc-800 rounded-xl overflow-hidden">
        <div class="p-4">
          <div class="flex items-start justify-between">
            <h3 class="font-medium text-zinc-200 text-lg">{competitor.name}</h3>
            <span class="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded-full">
              {competitor.relevance}
            </span>
          </div>
          
          {#if competitor.domain}
            <p class="text-sm text-zinc-400 mt-1">
              <a href={`https://${competitor.domain}`} target="_blank" class="hover:text-zinc-200 flex items-center gap-1">
                <span class="text-xs">🔗</span> {competitor.domain}
              </a>
            </p>
          {:else}
            <p class="text-sm text-zinc-500 mt-1">No domain available</p>
          {/if}
        </div>
        
        {#if competitor.marketing_strategy}
          <div class="border-t border-zinc-800 p-4">
            <p class="text-sm text-zinc-400 mb-1">Marketing Strategy:</p>
            <p class="text-sm text-zinc-300">{competitor.marketing_strategy}</p>
          </div>
        {:else}
          <div class="border-t border-zinc-800 p-4">
            <p class="text-sm text-zinc-500 italic">Marketing strategy analysis not available</p>
          </div>
        {/if}
      </div>
    {/each}
  </div>