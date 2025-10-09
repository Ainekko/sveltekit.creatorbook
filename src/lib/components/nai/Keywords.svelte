<script lang="ts">
  import { RefreshCw, TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-svelte';
  import { contentStore } from '$lib/components/nai/stores';

  export let projectId: string;

  // Subscribe to content store
  $: keywords = $contentStore.keywords;
  $: isLoading = $contentStore.keywordsLoading;

  let selectedKeywordIds: string[] = [];
  let isGeneratingOutlines = false;

  const authToken = localStorage.getItem('token');
  const apiBaseUrl = 'http://127.0.0.1:8000';

  function getCompetitionColor(competition: string) {
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

  function getTrendIcon(trend: string) {
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

  function getTrendColor(trend: string) {
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

  function toggleKeywordSelection(keywordId: string) {
    if (selectedKeywordIds.includes(keywordId)) {
      selectedKeywordIds = selectedKeywordIds.filter(id => id !== keywordId);
    } else {
      selectedKeywordIds = [...selectedKeywordIds, keywordId];
    }
  }

  function toggleSelectAll() {
    if (selectedKeywordIds.length === keywords.length) {
      selectedKeywordIds = [];
    } else {
      selectedKeywordIds = keywords.map(k => k.id);
    }
  }

  async function refreshKeywords() {
    await contentStore.loadKeywords(projectId);
  }

  async function generateOutlines() {
    if (selectedKeywordIds.length === 0) return;
    
    isGeneratingOutlines = true;
    try {
      // TODO: Implement outline generation API call
      // This would typically create a task or directly generate outlines
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
        // Reload outlines after generation
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

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Keyword Research</h2>
      <p class="text-sm text-gray-500 mt-1">
        {keywords.length} keywords found
      </p>
    </div>
    <button 
      on:click={refreshKeywords} 
      disabled={isLoading} 
      class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
    >
      {#if isLoading}
        <RefreshCw class="w-4 h-4 animate-spin" />
        Loading...
      {:else}
        <RefreshCw class="w-4 h-4" />
        Refresh
      {/if}
    </button>
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

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                <input 
                  type="checkbox" 
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  on:change={toggleSelectAll}
                  class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" 
                />
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Keyword
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monthly Searches
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Competition
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPC
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trend
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each keywords as keyword (keyword.id)}
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    checked={selectedKeywordIds.includes(keyword.id)}
                    on:change={() => toggleKeywordSelection(keyword.id)} 
                    class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" 
                  />
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">
                    {keyword.keyword}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 font-semibold">
                    {keyword.monthly_searches?.toLocaleString() || '—'}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCompetitionColor(keyword.competition)}`}>
                    {keyword.competition}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {keyword.keyword_difficulty ? keyword.keyword_difficulty.toFixed(1) : '—'}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {keyword.cpc ? `$${keyword.cpc.toFixed(2)}` : '—'}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class={`flex items-center gap-1.5 text-sm font-medium ${getTrendColor(keyword.trend)}`}>
                    <svelte:component this={getTrendIcon(keyword.trend)} class="w-4 h-4" />
                    {keyword.trend}
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
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
  /* Support for indeterminate checkbox state */
  input[type="checkbox"]:indeterminate {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>