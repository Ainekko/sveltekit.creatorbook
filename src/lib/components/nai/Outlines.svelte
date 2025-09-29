```svelte
<script lang="ts">
  import { FileText, Clock, RefreshCw } from 'lucide-svelte';
  import type { Outline } from './types';

  export let outlines: Outline[];
  export let generatingContent: string | null;
  export let generateBlogPost: (id: number) => void;

  function getStatusColor(status: string) {
    switch (status) {
      case 'published': return 'text-emerald-600 bg-emerald-100';
      case 'draft': return 'text-blue-600 bg-blue-100';
      case 'ready': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-bold text-gray-900">Content Outlines</h2>
    <div class="text-sm text-gray-600">{outlines.length} outlines ready</div>
  </div>

  <div class="grid gap-6">
    {#each outlines as outline (outline.id)}
      <div class="bg-white rounded-xl p-8 border border-gray-200 hover:border-gray-300 transition-colors">
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{outline.title}</h3>
            <p class="text-gray-600 mb-4">{outline.metaDescription}</p>

            <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span class="flex items-center"><FileText class="w-4 h-4 mr-1" /> {outline.wordCount} words</span>
              <span class="flex items-center"><Clock class="w-4 h-4 mr-1" /> {outline.estimatedTime}</span>
              <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(outline.status)}`}>{outline.status}</span>
            </div>

            <div class="flex flex-wrap gap-2">
              {#each outline.targetKeywords as keyword}
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">{keyword}</span>
              {/each}
            </div>
          </div>

          <div class="ml-6">
            <button on:click={() => generateBlogPost(outline.id)} disabled={generatingContent === `blog-${outline.id}`} class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
              {#if generatingContent === `blog-${outline.id}`}
                <RefreshCw class="w-4 h-4 animate-spin inline mr-2" />
                Generating...
              {:else}
                Generate Blog Post
              {/if}
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
```