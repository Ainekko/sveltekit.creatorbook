<!-- src/lib/components/nai/Keywords.svelte -->

<script lang="ts">
  import { RefreshCw, TrendingUp, TrendingDown, Minus, Sparkles, ChevronDown, Globe } from 'lucide-svelte';
  import { contentStore } from '$lib/components/nai/stores';
  import type { Keyword, CompetitorRanking, CompetitionLevel, TrendType,} from '$lib/components/nai/types';
  import type { UUID } from 'crypto';


  export let projectId: string;

  // Subscribe to content store
  $: keywords = $contentStore.keywords as Keyword[];
  $: isLoading = $contentStore.keywordsLoading;
  $: competitorRankings = $contentStore.competitorRankings as Map<UUID, CompetitorRanking[]>;
  $: competitorsLoading = $contentStore.competitorsLoading;

  let selectedKeywordIds: UUID[] = [];
  let expandedKeywordId: UUID | null = null;
  let isGeneratingOutlines = false;

  const authToken = localStorage.getItem('token');
  const apiBaseUrl = 'http://127.0.0.1:8000';

  function getCompetitionColor(competition: CompetitionLevel): string {
    switch (competition) {
      case 'Low':
        return 'text-emerald-600 bg-emerald-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'High':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }

  function getTrendIcon(trend: TrendType) {
    switch (trend) {
      case 'Rising':
        return TrendingUp;
      case 'Declining':
        return TrendingDown;
      case 'Stable':
        return Minus;
      case 'New':
        return Sparkles;
      default:
        return Minus;
    }
  }

  function getTrendColor(trend: TrendType): string {
    switch (trend) {
      case 'Rising':
        return 'text-emerald-600';
      case 'Declining':
        return 'text-red-600';
      case 'Stable':
        return 'text-blue-600';
      case 'New':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  }

  function getRankingColor(position: number): string {
    if (position === 1) return 'bg-yellow-50 border-l-4 border-yellow-400';
    if (position <= 3) return 'bg-orange-50 border-l-4 border-orange-400';
    if (position <= 10) return 'bg-blue-50 border-l-4 border-blue-400';
    return 'bg-gray-50 border-l-4 border-gray-400';
  }

  function getPositionBadgeStyle(position: number): string {
    if (position === 1) return 'bg-yellow-500 text-white';
    if (position <= 3) return 'bg-orange-500 text-white';
    if (position <= 10) return 'bg-blue-500 text-white';
    return 'bg-gray-500 text-white';
  }

  function getDomainName(url: string): string {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  }

  function toggleKeywordSelection(keywordId: UUID): void {
    if (selectedKeywordIds.includes(keywordId)) {
      selectedKeywordIds = selectedKeywordIds.filter(id => id !== keywordId);
    } else {
      selectedKeywordIds = [...selectedKeywordIds, keywordId];
    }
  }

  function toggleSelectAll(): void {
    if (selectedKeywordIds.length === keywords.length) {
      selectedKeywordIds = [];
    } else {
      selectedKeywordIds = keywords.map(k => k.id);
    }
  }

  async function toggleExpanded(keywordId: UUID): Promise<void> {
    if (expandedKeywordId === keywordId) {
      expandedKeywordId = null;
    } else {
      expandedKeywordId = keywordId;
      if (!competitorRankings.has(keywordId)) {
        await contentStore.loadCompetitorRankings(keywordId);
      }
    }
  }

  async function refreshKeywords(): Promise<void> {
    await contentStore.loadKeywords(projectId);
  }

  async function generateOutlines(): Promise<void> {
    if (selectedKeywordIds.length === 0) return;
    
    isGeneratingOutlines = true;
    try {
      const response = await fetch(`${apiBaseUrl}/orion/api/generate_outlines/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: projectId,
          keyword_ids: selectedKeywordIds
        })
      });

      if (response.ok) {
        await contentStore.loadOutlines(projectId);
        selectedKeywordIds = [];
      } else {
        console.error('Failed to generate outlines');
      }
    } catch (error) {
      console.error('Error generating outlines:', error);
    } finally {
      isGeneratingOutlines = false;
    }
  }

  $: isAllSelected = keywords.length > 0 && selectedKeywordIds.length === keywords.length;
  $: isSomeSelected = selectedKeywordIds.length > 0 && selectedKeywordIds.length < keywords.length;
</script>

<div class="space-y-6 w-full">
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-2xl font-semibold text-zinc-900 tracking-tight">Keyword Research</h2>
      <p class="text-sm text-gray-500 mt-1">
        {keywords.length} keywords found
      </p>
    </div>
  </div>

  {#if keywords.length === 0 && !isLoading}
    <div class="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <RefreshCw class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No Keywords Yet</h3>
      <p class="text-gray-500 mb-4">
        Run the keyword research workflow to generate keywords for your project.
      </p>
    </div>
  {:else}
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-600">
            {selectedKeywordIds.length} of {keywords.length} keywords selected
          </div>
          <button 
            on:click={generateOutlines} 
            disabled={selectedKeywordIds.length === 0 || isGeneratingOutlines} 
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {#if isGeneratingOutlines}
              <RefreshCw class="w-4 h-4 animate-spin" />
              Generating...
            {:else}
              Generate Outlines ({selectedKeywordIds.length})
            {/if}
          </button>
        </div>
      </div>

      <div class="divide-y divide-gray-200">
        {#each keywords as keyword (keyword.id)}
          <div class="border-b border-gray-200 last:border-b-0">
            <!-- Keyword Row -->
            <button
              on:click={() => toggleExpanded(keyword.id)}
              class="w-full px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div class="flex items-center gap-4 flex-1 text-left">
                <input 
                  type="checkbox" 
                  checked={selectedKeywordIds.includes(keyword.id)}
                  on:change={() => toggleKeywordSelection(keyword.id)}
                  on:click={(e) => e.stopPropagation()}
                  class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" 
                />
                <div class="flex-1">
                  <div class="text-sm font-medium text-gray-900 mb-2">
                    {keyword.keyword}
                  </div>
                  <div class="flex flex-wrap gap-3 items-center">
                    <div class="text-xs text-gray-600">
                      <span class="font-semibold">{keyword.monthly_searches?.toLocaleString() || '—'}</span> searches/mo
                    </div>
                    <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCompetitionColor(keyword.competition)}`}>
                      {keyword.competition}
                    </span>
                    <div class="text-xs text-gray-600">
                      Difficulty: <span class="font-semibold">{keyword.keyword_difficulty ? keyword.keyword_difficulty.toFixed(1) : '—'}</span>
                    </div>
                    <div class="text-xs text-gray-600">
                      CPC: <span class="font-semibold">{keyword.cpc ? `$${keyword.cpc.toFixed(2)}` : '—'}</span>
                    </div>
                    <div class={`flex items-center gap-1 text-xs font-medium ${getTrendColor(keyword.trend)}`}>
                      <svelte:component this={getTrendIcon(keyword.trend)} class="w-3.5 h-3.5" />
                      {keyword.trend}
                    </div>
                  </div>
                </div>
              </div>
              <div class="transition-transform" class:rotate-180={expandedKeywordId === keyword.id}>
                <ChevronDown class="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </button>

            <!-- Competitor Rankings Expansion -->
            {#if expandedKeywordId === keyword.id}
              <div class="border-t border-gray-200 bg-gray-50">
                {#if competitorsLoading}
                  <div class="px-6 py-8 text-center">
                    <div class="animate-spin h-5 w-5 text-gray-400 mx-auto mb-2"></div>
                    <p class="text-sm text-gray-500">Loading competitor data...</p>
                  </div>
                {:else if competitorRankings.has(keyword.id) && (competitorRankings.get(keyword.id) || []).length > 0}
                  <div class="space-y-0">
                    {#each competitorRankings.get(keyword.id) || [] as competitor (competitor.id)}
                      <div class={`p-4 border-t border-gray-200 first:border-t-0 ${getRankingColor(competitor.position)}`}>
                        <div class="flex items-start gap-3">
                          <div class={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${getPositionBadgeStyle(competitor.position)}`}>
                            #{competitor.position}
                          </div>
                          <div class="flex-1 min-w-0">
                            <h4 class="text-sm font-semibold text-gray-900 mb-1">
                              {competitor.title || competitor.domain}
                            </h4>
                            <p class="text-xs text-gray-600 mb-2 line-clamp-2">
                              {competitor.snippet || 'No snippet available'}
                            </p>
                            {#if competitor.url}
                              <a
                                href={competitor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                              >
                                <Globe class="w-3 h-3" />
                                {getDomainName(competitor.url)}
                              </a>
                            {/if}
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                {:else}
                  <div class="px-6 py-8 text-center">
                    <p class="text-sm text-gray-500">No competitor data available</p>
                  </div>
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>

      {#if keywords.length > 10}
        <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p class="text-xs text-gray-500 text-center">
            Showing {keywords.length} keywords
          </p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  input[type="checkbox"]:indeterminate {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>