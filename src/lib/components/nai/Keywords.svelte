```svelte
<script lang="ts">
  import { RefreshCw } from 'lucide-svelte';
  import type { Keyword } from './types';

  export let keywords: Keyword[];
  export let selectedKeywords: number[];
  export let generatingContent: string | null;
  export let toggleKeywordSelection: (id: number) => void;
  export let generateKeywords: () => void;
  export let generateOutlines: () => void;

  function getDifficultyColor(difficulty: number) {
    if (difficulty < 30) return 'text-emerald-600 bg-emerald-100';
    if (difficulty < 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-bold text-gray-900">Keyword Research</h2>
    <button on:click={generateKeywords} disabled={generatingContent === 'keywords'} class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
      {#if generatingContent === 'keywords'}
        <RefreshCw class="w-4 h-4 animate-spin inline mr-2" />
        Generating...
      {:else}
        Generate New Keywords
      {/if}
    </button>
  </div>

  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-600">
          {keywords.filter(k => k.selected).length} of {keywords.length} keywords selected
        </div>
        <button on:click={generateOutlines} disabled={keywords.filter(k => k.selected).length === 0} class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Generate Outlines ({keywords.filter(k => k.selected).length})
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input type="checkbox" class="rounded border-gray-300" on:change={(e) => {
                const checked = e.target.checked;
                keywords = keywords.map(k => ({ ...k, selected: checked }));
                selectedKeywords = keywords.filter(k => k.selected).map(k => k.id);
              }} />
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each keywords as keyword (keyword.id)}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" bind:checked={keyword.selected} on:change={() => toggleKeywordSelection(keyword.id)} class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{keyword.keyword}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{keyword.volume.toLocaleString()}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(keyword.difficulty)}`}>
                  {keyword.difficulty}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 font-medium">
                {keyword.trend}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
```