<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    export let redditPosts: Array<{
      title: string;
      target_subreddit: string;
      content: string;
    }> = [];
    
    let expandedPosts: Record<number, boolean> = {};
    const dispatch = createEventDispatcher();
    
    function toggleExpand(index: number): void {
      expandedPosts[index] = !expandedPosts[index];
    }
    
    
  </script>
  
  <div class="p-4">
    <h3 class="text-zinc-300 font-medium mb-4">Reddit posts</h3>
    <div class="space-y-4">
      {#each redditPosts as post, index}
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
            target subreddit: <span class="text-zinc-300">{post.target_subreddit}</span>
          </div>
                
          {#if expandedPosts[index]}
            <div class="border-t border-zinc-800 px-4 py-3 text-xs space-y-3">
              
                    
              <div>
                <span class="text-zinc-400">Meta Description:</span>
                <p class="text-zinc-300">{post.content}</p>
              </div>
                    
              
                    
              
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>