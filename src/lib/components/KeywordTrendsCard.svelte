<script lang="ts">
  export let trends: string[] = [];
  
  let isExpanded = false;
  
  function toggleExpand(): void {
    isExpanded = !isExpanded;
  }
  
  // Extract key metrics from trend text for visualization
  function extractTrendMetrics(trend: string): { label: string, value: string | null } {
    // Look for patterns like numbers, percentages, or key phrases
    const volumeMatch = trend.match(/volume.+?(\d+[,\d]*)/i);
    const cpcMatch = trend.match(/CPC.+?(\$\d+(\.\d+)?)/i);
    const competitionMatch = trend.match(/competition.+?(\d+(\.\d+)?%)/i);
    
    if (volumeMatch) return { label: "Search Volume", value: volumeMatch[1] };
    if (cpcMatch) return { label: "CPC Value", value: cpcMatch[1] };
    if (competitionMatch) return { label: "Competition", value: competitionMatch[1] };
    
    return { label: "", value: null };
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-4">
    <h3 class="text-zinc-300 font-medium">📈 Keyword Trends</h3>
    <button
      on:click={toggleExpand}
      class="text-zinc-400 hover:text-zinc-200 text-xs"
    >
      {isExpanded ? 'Less' : 'More'}
    </button>
  </div>
  
  {#if !isExpanded}
    <ul class="list-disc pl-5 space-y-2 text-sm text-zinc-300">
      {#each trends as trend}
        <li>{trend}</li>
      {/each}
    </ul>
  {:else}
    <div class="space-y-3">
      {#each trends as trend}
        <div class="border-t border-zinc-800 pt-2">
          <p class="text-sm text-zinc-300">{trend}</p>
          
          {#if extractTrendMetrics(trend).value}
            <div class="mt-2 bg-zinc-800 p-2 rounded flex justify-between items-center">
              <span class="text-xs text-zinc-400">{extractTrendMetrics(trend).label}</span>
              <span class="text-xs text-zinc-300 font-medium">{extractTrendMetrics(trend).value}</span>
            </div>
          {/if}
        </div>
      {/each}
      
      <button class="w-full mt-2 py-2 bg-zinc-700 hover:bg-zinc-600 text-sm text-zinc-200 rounded-md transition">
        Generate Trend Report
      </button>
    </div>
  {/if}
</div>