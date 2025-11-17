<!-- src/lib/components/elio/ContentView.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { Sparkles, FileText,  } from 'lucide-svelte';

  
    export let blogPosts;
    export let generatingPosts;
    export let hoveredPost;
  
    const dispatch = createEventDispatcher();
  </script>
  
  <div class="space-y-6">
    {#if blogPosts.length === 0}
      <div class="text-center py-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200 shadow-xl">
        <FileText class="w-16 h-16 text-orange-400 mx-auto mb-4" />
        <p class="text-zinc-700 mb-2 font-medium text-lg">No blog posts available</p>
        <p class="text-sm text-zinc-500">Create blog posts to convert them into Reddit posts</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each blogPosts as post}
          <div
            class="group relative bg-white rounded-2xl border border-zinc-200 overflow-visible hover:shadow-xl hover:border-orange-300 transition-all duration-300 h-72 shadow-md"
          >
            <div class="p-6">
              <div class="flex items-start justify-between mb-3">
                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800">
                  {post.status}
                </span>
              </div>
  
              <div
                class="relative"
                on:mouseenter={() => hoveredPost = post.id}
                on:mouseleave={() => hoveredPost = null}
              >
                <h3 class="text-lg font-bold text-zinc-900 mb-3 line-clamp-2 min-h-[56px] cursor-help">
                  {post.title}
                </h3>
  
                {#if hoveredPost === post.id}
                  <div class="absolute left-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] bg-zinc-900 text-white p-4 rounded-xl shadow-2xl z-50 animate-fadeIn pointer-events-none">
                    <div class="absolute -top-2 left-6 w-5 h-5 bg-zinc-900 transform rotate-45"></div>
                    <div class="relative">
                      <h4 class="font-bold text-sm mb-2 text-zinc-100">Content Preview</h4>
                      <div class="max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                        <p class="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                          {post.content.substring(0, 400)}...
                        </p>
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
  
              <p class="text-sm text-zinc-600 line-clamp-3 mb-4">
                {post.content.substring(0, 150)}...
              </p>
  
              <button
                on:click={() => dispatch('convertToRedditPost', post)}
                disabled={generatingPosts.has(post.id)}
                class="w-full px-4 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group-hover:shadow-lg"
              >
                <Sparkles class="w-5 h-5" />
                {generatingPosts.has(post.id) ? 'Generating...' : 'Turn into Reddit Posts'}
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>