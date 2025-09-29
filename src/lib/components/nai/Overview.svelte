```svelte
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Search, FileText, TrendingUp, Target, RefreshCw, Calendar } from 'lucide-svelte';
  import type { Keyword, Outline } from './types';

  export let keywords: Keyword[];
  export let outlines: Outline[];
  export let generatingContent: string | null;
  export let generateKeywords: () => void;
  export let generateOutlines: () => void;

  const dispatch = createEventDispatcher();
</script>

<div class="grid grid-cols-12 gap-8">
  <div class="col-span-12 lg:col-span-8">
    <div class="grid grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Search class="w-5 h-5 text-emerald-600" />
          </div>
          <span class="text-emerald-500 text-sm font-medium">+12%</span>
        </div>
        <div class="text-2xl font-bold text-gray-900 mb-1">{keywords.filter(k => k.selected).length}</div>
        <div class="text-gray-500 text-sm">Active Keywords</div>
      </div>

      <div class="bg-white rounded-xl p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <FileText class="w-5 h-5 text-purple-600" />
          </div>
          <span class="text-emerald-500 text-sm font-medium">+3</span>
        </div>
        <div class="text-2xl font-bold text-gray-900 mb-1">{outlines.length}</div>
        <div class="text-gray-500 text-sm">Ready Outlines</div>
      </div>

      <div class="bg-white rounded-xl p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <TrendingUp class="w-5 h-5 text-blue-600" />
          </div>
          <span class="text-emerald-500 text-sm font-medium">↑ 23</span>
        </div>
        <div class="text-2xl font-bold text-gray-900 mb-1">247</div>
        <div class="text-gray-500 text-sm">Avg. Position</div>
      </div>

      <div class="bg-white rounded-xl p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Target class="w-5 h-5 text-yellow-600" />
          </div>
          <span class="text-emerald-500 text-sm font-medium">+18%</span>
        </div>
        <div class="text-2xl font-bold text-gray-900 mb-1">12.4K</div>
        <div class="text-gray-500 text-sm">Monthly Traffic</div>
      </div>
    </div>

    <div class="bg-white rounded-xl p-8 border border-gray-200">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      <div class="grid grid-cols-3 gap-4">
        <button on:click={generateKeywords} disabled={generatingContent === 'keywords'} class="flex flex-col items-center justify-center p-6 border-2 border-dashed border-emerald-300 rounded-xl hover:border-emerald-400 transition-colors group disabled:opacity-50">
          {#if generatingContent === 'keywords'}
            <RefreshCw class="w-8 h-8 text-emerald-600 animate-spin mb-3" />
          {:else}
            <Search class="w-8 h-8 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
          {/if}
          <span class="text-emerald-900 font-medium">Generate Keywords</span>
          <span class="text-emerald-700 text-sm mt-1">Research new opportunities</span>
        </button>

        <button on:click={generateOutlines} disabled={generatingContent === 'outlines' || keywords.filter(k => k.selected).length === 0} class="flex flex-col items-center justify-center p-6 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-400 transition-colors group disabled:opacity-50">
          {#if generatingContent === 'outlines'}
            <RefreshCw class="w-8 h-8 text-purple-600 animate-spin mb-3" />
          {:else}
            <FileText class="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
          {/if}
          <span class="text-purple-900 font-medium">Create Outlines</span>
          <span class="text-purple-700 text-sm mt-1">From selected keywords</span>
        </button>

        <button on:click={() => dispatch('openScheduleModal')} class="flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-400 transition-colors group">
          <Calendar class="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
          <span class="text-blue-900 font-medium">Schedule Tasks</span>
          <span class="text-blue-700 text-sm mt-1">Set up automation</span>
        </button>
      </div>
    </div>
  </div>

  <div class="col-span-12 lg:col-span-4">
    <div class="bg-white rounded-xl p-8 border border-gray-200">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
      <div class="space-y-4">
        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Search class="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p class="text-gray-900 font-medium text-sm">Found high-opportunity keyword</p>
            <p class="text-gray-600 text-sm">"AI automation tools" - 2.1K searches</p>
            <p class="text-gray-400 text-xs">15m ago</p>
          </div>
        </div>

        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <FileText class="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <p class="text-gray-900 font-medium text-sm">Blog outline generated</p>
            <p class="text-gray-600 text-sm">"10 Best Practices for SEO in 2024"</p>
            <p class="text-gray-400 text-xs">2h ago</p>
          </div>
        </div>

        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <TrendingUp class="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p class="text-gray-900 font-medium text-sm">Ranking improvement detected</p>
            <p class="text-gray-600 text-sm">Moved up 5 positions for target keyword</p>
            <p class="text-gray-400 text-xs">4h ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
