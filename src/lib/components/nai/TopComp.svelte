<script lang="ts">
  import { contentStore } from '$lib/components/nai/stores';
  import { ExternalLink, RefreshCw } from 'lucide-svelte';

  export let projectId: string;

  $: topCompetitors = $contentStore.topCompetitors;
  $: isLoading = $contentStore.topCompetitorsLoading;

  $: sortedCompetitors = [...topCompetitors].sort((a, b) => a.position - b.position);

  function extractDomain(url: string): string {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  }

  function getRankColor(position: number): string {
    if (position === 1) return 'text-orange-500';
    if (position === 2) return 'text-gray-400';
    if (position === 3) return 'text-amber-600';
    return 'text-gray-300';
  }

  async function refreshCompetitors() {
    await contentStore.loadTopCompetitors(projectId);
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-2xl font-semibold text-zinc-900 tracking-tight">Top Competitors</h2>
      <p class="text-sm text-gray-500 mt-1 font-light">
        {topCompetitors.length} ranking domains
      </p>
    </div>
    <button 
      on:click={refreshCompetitors} 
      disabled={isLoading} 
      class="text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 flex items-center gap-2"
    >
      {#if isLoading}
        <RefreshCw class="w-4 h-4 animate-spin" />
      {:else}
        <RefreshCw class="w-4 h-4" />
      {/if}
    </button>
  </div>

  {#if isLoading}
    <div class="space-y-3">
      {#each [1, 2, 3] as _}
        <div class="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
      {/each}
    </div>
  {:else if sortedCompetitors.length === 0}
    <div class="text-center py-8">
      <p class="text-gray-400 text-sm">No competitors found</p>
    </div>
  {:else}
    <div class="space-y-3">
      {#each sortedCompetitors as competitor (competitor.id)}
        <a
          href={competitor.url}
          target="_blank"
          rel="noopener noreferrer"
          class="group block border border-gray-200 hover:border-gray-300 rounded-lg p-4 transition-all duration-200 hover:shadow-sm hover:bg-gray-50"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-2">
                <span class={`text-lg font-mono font-bold ${getRankColor(competitor.position)}`}>
                  #{competitor.position}
                </span>
                <span class="font-medium text-gray-900 truncate font-['Poppins']">
                  {competitor.domain}
                </span>
              </div>
              
              {#if competitor.snippet}
                <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed font-light mb-2">
                  {competitor.snippet}
                </p>
              {/if}
              
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400 font-mono">
                  {extractDomain(competitor.url)}
                </span>
              </div>
            </div>
            
            <div class="opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink class="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  :global(.line-clamp-2) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>