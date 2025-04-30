<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { BlogPost } from '$lib/types';
    
    export let blogPosts: BlogPost[] = [];
    
    let expandedPosts: Record<string, boolean> = {};
    let isPublishing: Record<string, boolean> = {};
    const dispatch = createEventDispatcher();
    
    function toggleExpand(id: string): void {
      expandedPosts[id] = !expandedPosts[id];
    }
    
    async function publishPost(post: BlogPost): Promise<void> {
      // Ensure post.id is valid before using as an index
      if (!post.id) return;
      
      isPublishing[post.id] = true;
      
      try {
        dispatch('publishPost', { post });
      } catch (err) {
        console.error('Error publishing post:', err);
      } finally {
        isPublishing[post.id] = false;
      }
    }
    
    async function unpublishPost(post: BlogPost): Promise<void> {
      // Ensure post.id is valid before using as an index
      if (!post.id) return;
      
      isPublishing[post.id] = true;
      
      try {
        dispatch('unpublishPost', { post });
      } catch (err) {
        console.error('Error unpublishing post:', err);
      } finally {
        isPublishing[post.id] = false;
      }
    }
  </script>
  
  <div class="p-4">
    <h3 class="text-zinc-300 font-medium mb-4">📄 Blog Posts</h3>
    
    {#if blogPosts.length === 0}
      <div class="text-zinc-400 text-sm p-4 border border-zinc-800 rounded-xl">
        No blog posts yet. Generate them from outlines first.
      </div>
    {:else}
      <div class="space-y-4">
        {#each blogPosts as post}
          {#if post && post.id}
            <div class="border border-zinc-800 rounded-xl overflow-hidden">
              <div class="flex justify-between items-center p-4 hover:bg-zinc-800 transition cursor-pointer" on:click={() => toggleExpand(post.id)}>
                <div class="flex items-center">
                  <p class="text-sm font-medium text-zinc-200">{post.title}</p>
                  {#if post.is_published}
                    <span class="ml-2 px-2 py-0.5 bg-green-800/30 text-green-400 text-xs rounded-full">Published</span>
                  {:else}
                    <span class="ml-2 px-2 py-0.5 bg-zinc-800/50 text-zinc-400 text-xs rounded-full">Draft</span>
                  {/if}
                </div>
                <button class="text-zinc-400 hover:text-zinc-200 text-xs">
                  {(expandedPosts[post.id] ?? false) ? 'Less' : 'More'}
                </button>
              </div>
              
              <div class="px-4 pb-2 text-sm text-zinc-400">
                Keyword: <span class="text-zinc-300">{post.target_keyword}</span>
              </div>
              
              {#if expandedPosts[post.id]}
                <div class="border-t border-zinc-800 px-4 py-3 text-xs space-y-3">
                  <div>
                    <span class="text-zinc-400">Secondary Keywords:</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                      {#each post.secondary_keywords || [] as keyword}
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
                  
                  <div>
                    <span class="text-zinc-400">Content Preview:</span>
                    <div class="mt-1 bg-zinc-900 p-3 rounded-md text-zinc-300 max-h-32 overflow-y-auto">
                      {post.content ? `${post.content.substring(0, 200)}...` : 'No content available'}
                    </div>
                  </div>
                  
                  <div class="flex gap-2 mt-3">
                    {#if post.is_published}
                      <button
                        on:click={() => unpublishPost(post)}
                        class="flex-1 bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2 transition"
                        disabled={isPublishing[post.id]}
                      >
                        {#if isPublishing[post.id]}
                          <span class="animate-pulse">Processing...</span>
                        {:else}
                          Unpublish
                        {/if}
                      </button>
                    {:else}
                      <button
                        on:click={() => publishPost(post)}
                        class="flex-1 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2 transition"
                        disabled={isPublishing[post.id]}
                      >
                        {#if isPublishing[post.id]}
                          <span class="animate-pulse">Publishing...</span>
                        {:else}
                          Publish
                        {/if}
                      </button>
                    {/if}
                    
                    <button
                      on:click={() => dispatch('editPost', { post })}
                      class="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-md text-sm transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>