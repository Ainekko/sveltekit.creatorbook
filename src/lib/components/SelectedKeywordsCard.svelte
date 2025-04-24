<script lang="ts">
  export let keywords: Array<{
    keyword: string;
    search_volume: number;
    keyword_difficulty: number;
    cpc: number;
    competition: number;
  }> = [];
  
  let expandedView = false;
  
  function toggleView(): void {
    expandedView = !expandedView;
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-4">
    <h3 class="text-zinc-300 font-medium">Selected Keywords</h3>
    <button
      on:click={toggleView}
      class="text-zinc-400 hover:text-zinc-200 text-xs"
    >
      {expandedView ? 'Simple' : 'Detailed'}
    </button>
  </div>

  <div class="w-full h-[1px] bg-zinc-800 mb-2">

  </div>
  
  <div class="space-y-2">
    {#each keywords as kw}
      {#if !expandedView}
        <div class="flex justify-between py-1 items-center text-sm text-zinc-400">
          <span>{kw.keyword}</span>
          <span class="text-zinc-500">{kw.search_volume.toLocaleString()} searches/mo</span>
        </div>
      {:else}
        <div class="border border-zinc-800 rounded-lg p-3 mb-2">
          <div class="flex justify-between items-center text-sm">
            <span class="text-zinc-200 font-medium">{kw.keyword}</span>
            <span class="text-zinc-400">{kw.search_volume.toLocaleString()} searches/mo</span>
          </div>
          
          <div class="mt-2 grid grid-cols-3 gap-2 text-xs">
            <div>
              <p class="text-zinc-400">Difficulty</p>
              <div class="flex items-center gap-1 mt-1">
                <div class="bg-zinc-800 h-1.5 w-full rounded-full overflow-hidden">
                  <div
                    class="h-full bg-zinc-600"
                    style="width: {kw.keyword_difficulty}%;"
                  ></div>
                </div>
                <span class="text-zinc-300">{kw.keyword_difficulty}</span>
              </div>
            </div>
            
            <div>
              <p class="text-zinc-400">CPC</p>
              <p class="text-zinc-300">${kw.cpc.toFixed(2)}</p>
            </div>
            
            <div>
              <p class="text-zinc-400">Competition</p>
              <div class="flex items-center gap-1 mt-1">
                <div class="bg-zinc-800 h-1.5 w-full rounded-full overflow-hidden">
                  <div
                    class="h-full bg-zinc-600"
                    style="width: {kw.competition * 100}%;"
                  ></div>
                </div>
                <span class="text-zinc-300">{(kw.competition * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>