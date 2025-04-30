<script lang="ts">
  // the component displaying the blog posts outlines.
  import { createEventDispatcher } from 'svelte';
  import { createBlogPostFromOutline } from '$lib/db';
  import type { BlogPostOutline, BlogPost } from '$lib/types';
  
  export let outlines: BlogPostOutline[] = [];
  export let llmRunId: string; // Add this prop to pass the LLM run ID
  
  let expandedPosts: Record<number, boolean> = {};
  let loading: Record<number, boolean> = {}; // Track loading state for each outline
  let error: Record<number, string> = {}; // Track errors
  const dispatch = createEventDispatcher();
  
  function toggleExpand(index: number): void {
    expandedPosts[index] = !expandedPosts[index];
  }
  
  async function generateFullPost(index: number): Promise<void> {
    loading[index] = true;
    error[index] = '';
    
    try {
     
      const result = await createBlogPostFromOutline(
        llmRunId, 
        index, 
        outlines[index] // Pass the outline data directly
      );
      
      // Create a blog post object with the returned content
      const blogPost: BlogPost = {
        ...outlines[index],
        content: result.result || ''
      };
      
      // Dispatch event to parent component with the created blog post
      dispatch('postCreated', {
        blogPost,
        index: index,
        outline: outlines[index]
      });
      
    } catch (err) {
      error[index] = err instanceof Error ? err.message : 'Failed to create blog post';
      console.error('Error creating blog post:', err);
    } finally {
      loading[index] = false;
    }
  }
</script>

<div class="p-4">
  <h3 class="text-zinc-300 font-medium mb-4">📝 Blog Post Outlines</h3>
  <div class="space-y-4">
    {#each outlines as post, index}
      <div class="border border-zinc-800 rounded-xl overflow-hidden">
        <div class="flex justify-between items-center p-4 hover:bg-zinc-800 transition cursor-pointer" on:click={() => toggleExpand(index)}>
          <p class="text-sm font-medium text-zinc-200">{post.title}</p>
          <button
            class="text-zinc-400 hover:text-zinc-200 text-xs"
          >
            {expandedPosts[index] ? 'Less' : 'More'}
          </button>
        </div>
        
        <div class="px-4 pb-2 text-sm text-zinc-400">
          Keyword: <span class="text-zinc-300">{post.target_keyword}</span>
        </div>
              
        {#if expandedPosts[index]}
          <div class="border-t border-zinc-800 px-4 py-3 text-xs space-y-3">
            <div>
              <span class="text-zinc-400">Secondary Keywords:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                {#each post.secondary_keywords as keyword}
                  <span class="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">{keyword}</span>
                {/each}
              </div>
            </div>
                  
            <div>
              <span class="text-zinc-400">Meta Description:</span>
              <p class="text-zinc-300">{post.meta_description}</p>
            </div>
                  
            <div>
              <span class="text-zinc-400">Ranking Potential:</span>
              <div class="flex items-center gap-2 mt-1">
                <div class="bg-zinc-800 h-2 w-full rounded-full overflow-hidden">
                  <div
                    class="h-full bg-zinc-700"
                    style="width: {post.estimated_ranking_potential * 10}%;"
                  ></div>
                </div>
                <span class="text-zinc-300">{post.estimated_ranking_potential}/10</span>
              </div>
            </div>
            
            {#if error[index]}
              <div class="text-red-400 mt-2">
                {error[index]}
              </div>
            {/if}
                  
            <button
              on:click={() => generateFullPost(index)}
              class="w-full mt-3 bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2 transition"
              disabled={loading[index]}
            >
              {#if loading[index]}
                <span class="animate-pulse">Creating...</span>
              {:else}
                Generate Full Blog Post
              {/if}
            </button>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>