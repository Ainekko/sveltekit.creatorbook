<!-- Outlines.svelte -->
<script lang="ts">
  import { RefreshCw, FileText, ArrowRight, Calendar } from 'lucide-svelte';
  import { contentStore } from '$lib/components/nai/stores';
  import {API_BASE_URL} from '$lib/config'

  export let projectId: string;

  $: outlines = $contentStore.outlines;
  $: isLoading = $contentStore.outlinesLoading;

  let selectedOutlineIds: string[] = [];
  let isGeneratingPosts = false;

  const authToken = localStorage.getItem('token');
  const apiBaseUrl = API_BASE_URL;

  function toggleOutlineSelection(outlineId: string) {
    if (selectedOutlineIds.includes(outlineId)) {
      selectedOutlineIds = selectedOutlineIds.filter(id => id !== outlineId);
    } else {
      selectedOutlineIds = [...selectedOutlineIds, outlineId];
    }
  }

  function toggleSelectAll() {
    if (selectedOutlineIds.length === outlines.length) {
      selectedOutlineIds = [];
    } else {
      selectedOutlineIds = outlines.map(o => o.id);
    }
  }

  async function refreshOutlines() {
    await contentStore.loadOutlines(projectId);
  }

  async function generatePosts() {
    if (selectedOutlineIds.length === 0) return;
    
    isGeneratingPosts = true;
    try {
      const response = await fetch(`${apiBaseUrl}/orion/api/generate_posts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: projectId,
          outline_ids: selectedOutlineIds
        })
      });

      if (response.ok) {
        await contentStore.loadBlogPosts(projectId);
        selectedOutlineIds = [];
      }
    } catch (error) {
      console.error('Error generating posts:', error);
    } finally {
      isGeneratingPosts = false;
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  $: isAllSelected = outlines.length > 0 && selectedOutlineIds.length === outlines.length;
  $: isSomeSelected = selectedOutlineIds.length > 0 && selectedOutlineIds.length < outlines.length;
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Content Outlines</h2>
      <p class="text-sm text-gray-500 mt-1">
        {outlines.length} outlines ready
      </p>
    </div>
    <button 
      on:click={refreshOutlines} 
      disabled={isLoading} 
      class="bg-zinc-900 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
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

  {#if outlines.length === 0 && !isLoading}
    <div class="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No Outlines Yet</h3>
      <p class="text-gray-500 mb-4">
        Generate outlines from your keywords to get started.
      </p>
    </div>
  {:else}
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <input 
              type="checkbox" 
              checked={isAllSelected}
              indeterminate={isSomeSelected}
              on:change={toggleSelectAll}
              class="rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
            />
            <span class="text-sm text-gray-600">
              {selectedOutlineIds.length} of {outlines.length} selected
            </span>
          </div>
          <button 
            on:click={generatePosts} 
            disabled={selectedOutlineIds.length === 0 || isGeneratingPosts} 
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {#if isGeneratingPosts}
              <RefreshCw class="w-4 h-4 animate-spin" />
              Generating...
            {:else}
              <ArrowRight class="w-4 h-4" />
              Generate Posts ({selectedOutlineIds.length})
            {/if}
          </button>
        </div>
      </div>

      <div class="divide-y divide-gray-200">
        {#each outlines as outline (outline.id)}
          <div class="p-6 hover:bg-gray-50 transition-colors">
            <div class="flex items-start gap-4">
              <input 
                type="checkbox" 
                checked={selectedOutlineIds.includes(outline.id)}
                on:change={() => toggleOutlineSelection(outline.id)} 
                class="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
              />
              
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  {outline.title}
                </h3>
                
                {#if outline.meta_description}
                  <p class="text-sm text-gray-600 mb-3">
                    {outline.meta_description}
                  </p>
                {/if}

                {#if outline.target_keywords && outline.target_keywords.length > 0}
                  <div class="flex flex-wrap gap-2 mb-3">
                    {#each outline.target_keywords.slice(0, 5) as keyword}
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {keyword}
                      </span>
                    {/each}
                    {#if outline.target_keywords.length > 5}
                      <span class="text-xs text-gray-500">
                        +{outline.target_keywords.length - 5} more
                      </span>
                    {/if}
                  </div>
                {/if}

                {#if outline.outline_content}
                  <div class="bg-gray-50 rounded-lg p-4 mb-3">
                    <div class="prose prose-sm max-w-none text-gray-700">
                      {outline.outline_content.slice(0, 500)}...
                    </div>
                  </div>
                {/if}

                <div class="flex items-center gap-4 text-xs text-gray-500">
                  <div class="flex items-center gap-1">
                    <Calendar class="w-3.5 h-3.5" />
                    {formatDate(outline.created_at)}
                  </div>
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Outline
                  </span>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
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
</style>
