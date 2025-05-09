<!-- src/lib/components/BlogPostCard.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    export let item = {
      outline: {
        title: "",
        meta_description: "",
        secondary_keywords: []
      },
      post: null,
      index: -1
    };
    export let isGenerating = false;
    export let projectId = "";
  
    const dispatch = createEventDispatcher();
  
    function handleGeneratePost() {
      dispatch('generatePost');
    }
  </script>
  
  <div class="relative bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden group hover:border-pink-500/50 transition-all duration-200">
    <!-- Status Indicator -->
    <div class="absolute top-3 right-3 z-10">
      {#if item.post}
        <span class="px-2 py-1 rounded-full text-xs font-medium {item.post.is_published ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}">
          {item.post.is_published ? 'Published' : 'Draft'}
        </span>
      {:else}
        <span class="px-2 py-1 rounded-full text-xs font-medium bg-violet-900/30 text-violet-400">
          Outline
        </span>
      {/if}
    </div>
    
    <!-- Content -->
    <div class="p-4">
      <h3 class="font-bold text-white text-lg line-clamp-2 mb-2 group-hover:text-pink-400 transition-colors">
        {item.outline.title}
      </h3>
      
      <p class="text-sm text-zinc-400 mb-3 line-clamp-2">
        {item.outline.meta_description || "No description available"}
      </p>
      
      <!-- Keywords -->
      <div class="text-xs flex gap-2 flex-wrap mb-4">
        {#if item.outline.secondary_keywords && Array.isArray(item.outline.secondary_keywords)}
          {#each item.outline.secondary_keywords.slice(0, 3) as keyword}
            <span class="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{keyword}</span>
          {/each}
          {#if item.outline.secondary_keywords.length > 3}
            <span class="text-zinc-500">+{item.outline.secondary_keywords.length - 3} more</span>
          {/if}
        {/if}
      </div>
      
      <!-- Progress Indicator when applicable -->
      {#if item.post && !item.post.is_published}
        <div class="mb-3">
          <div class="flex justify-between text-xs mb-1">
            <span class="text-zinc-500">Draft Progress</span>
            <span class="text-zinc-400">70%</span>
          </div>
          <div class="w-full bg-zinc-800 rounded-full h-1.5">
            <div class="bg-yellow-500 h-1.5 rounded-full" style="width: 70%"></div>
          </div>
        </div>
      {/if}
      
      <!-- Action Button -->
      <div class="mt-auto pt-3 border-t border-zinc-800">
        {#if !item.post}
          <button 
            on:click={handleGeneratePost}
            class="w-full py-2 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 rounded text-xs font-medium transition-all {isGenerating ? 'opacity-75 cursor-not-allowed' : ''}"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Full Post'}
          </button>
        {:else}
          <div class="flex gap-2">
            <button 
              on:click={() => window.location.href = `${projectId}/seo/blogpost/${item.post.slug}`}
              class="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-medium"
            >
              Edit
            </button>
            
            {#if !item.post.is_published}
              <button 
                class="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-medium text-green-400"
              >
                Publish
              </button>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>