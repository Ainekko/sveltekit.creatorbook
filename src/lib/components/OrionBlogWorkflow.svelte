<!-- $lib/components/OrionBlogWorkflow.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { slide } from 'svelte/transition';
  
    export let outlines = [];
    export let readyToPost = [];
    export let posted = [];
    export let blogPostOutlines = [];
    export let expandedBlogIndex = -1;
  
    const dispatch = createEventDispatcher();
  </script>
  
  <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-white">Blog Workflow</h2>
      <button on:click={() => dispatch('generateOutlines')} class="bg-white text-black px-4 py-2 rounded text-sm">
        Generate More Outlines
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Outlines Column -->
      <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
        <h3 class="text-lg font-bold text-white mb-4">Outlines</h3>
        <div class="space-y-4">
          {#each outlines as outline}
            {@const index = blogPostOutlines.indexOf(outline)}
            <div transition:slide={{ duration: 300 }} class="bg-zinc-900 rounded-xl p-4 border border-zinc-800 hover:bg-zinc-800/50 transition-colors overflow-hidden">
              <div class="flex justify-between items-start mb-2">
                <h4 class="text-white font-medium text-lg flex-1 pr-4 truncate">{outline.title}</h4>
                <span class="text-xs text-emerald-400 px-2 py-1 bg-emerald-500/20 rounded">SEO</span>
              </div>
              <p class="text-zinc-400 text-sm mb-3 line-clamp-2">{outline.meta_description}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                {#each outline.target_keywords?.slice(0, 2) || [] as keyword}
                  <span class="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">{keyword}</span>
                {/each}
              </div>
              <button 
                on:click={() => dispatch('generateBlog', { index })} 
                class="bg-white text-black px-4 py-2 rounded text-sm"
              >
                Generate Full Blog
              </button>
            </div>
          {/each}
          {#if outlines.length === 0}
            <p class="text-zinc-500 text-center py-4">No outlines available. Generate more to start.</p>
          {/if}
        </div>
      </div>
  
      <!-- Ready to Post Column -->
      <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
        <h3 class="text-lg font-bold text-white mb-4">Ready to Post</h3>
        <div class="space-y-4">
          {#each readyToPost as outline}
            {@const index = blogPostOutlines.indexOf(outline)}
            <div transition:slide={{ duration: 300 }} class="bg-zinc-900 rounded-xl p-4 border border-zinc-800 hover:bg-zinc-800/50 transition-colors overflow-hidden">
              <div class="flex justify-between items-start mb-2">
                <h4 class="text-white font-medium text-lg flex-1 pr-4 truncate">{outline.title}</h4>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-emerald-400 px-2 py-1 bg-emerald-500/20 rounded">SEO</span>
                  <button 
                    on:click={() => dispatch('toggleExpansion', { index })} 
                    class="bg-white text-black px-3 py-1 rounded text-xs"
                  >
                    {expandedBlogIndex === index ? 'Collapse' : 'Expand'}
                  </button>
                </div>
              </div>
              <p class="text-zinc-400 text-sm mb-3 line-clamp-2">{outline.meta_description}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                {#each outline.target_keywords?.slice(0, 2) || [] as keyword}
                  <span class="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">{keyword}</span>
                {/each}
              </div>
              <div class="flex items-center gap-2">
                <input 
                  type="date" 
                  on:change={(e) => dispatch('schedule', { index, date: e.target.value })} 
                  class="bg-zinc-800 text-white px-3 py-1 rounded text-sm" 
                />
                <button 
                  class="bg-white text-black px-4 py-2 rounded text-sm"
                >
                  Schedule
                </button>
              </div>
              {#if expandedBlogIndex === index}
                <div class="mt-4">
                  <h5 class="text-white font-medium text-sm mb-2">Edit Blog Content (Markdown)</h5>
                  <textarea
                    class="w-full h-64 bg-zinc-800 text-white p-4 rounded border border-zinc-700"
                    value={outline.markdownContent}
                    on:input={(e) => dispatch('updateMarkdown', { index, value: e.target.value })}
                    placeholder="Enter Markdown content here..."
                  ></textarea>
                </div>
              {/if}
            </div>
          {/each}
          {#if readyToPost.length === 0}
            <p class="text-zinc-500 text-center py-4">No blogs ready to post yet.</p>
          {/if}
        </div>
      </div>
  
      <!-- Posted Column -->
      <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
        <h3 class="text-lg font-bold text-white mb-4">Posted</h3>
        <div class="space-y-4">
          {#each posted as outline}
            {@const index = blogPostOutlines.indexOf(outline)}
            <div transition:slide={{ duration: 300 }} class="bg-zinc-900 rounded-xl p-4 border border-zinc-800 hover:bg-zinc-800/50 transition-colors overflow-hidden">
              <div class="flex justify-between items-start mb-2">
                <h4 class="text-white font-medium text-lg flex-1 pr-4 truncate">{outline.title}</h4>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-emerald-400 px-2 py-1 bg-emerald-500/20 rounded">SEO</span>
                  <button 
                    on:click={() => dispatch('toggleExpansion', { index })} 
                    class="bg-white text-black px-3 py-1 rounded text-xs"
                  >
                    {expandedBlogIndex === index ? 'Collapse' : 'Expand'}
                  </button>
                </div>
              </div>
              <p class="text-zinc-400 text-sm mb-3 line-clamp-2">{outline.meta_description}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                {#each outline.target_keywords?.slice(0, 2) || [] as keyword}
                  <span class="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">{keyword}</span>
                {/each}
              </div>
              <p class="text-sm text-zinc-400">Scheduled for {outline.scheduled}</p>
              {#if expandedBlogIndex === index}
                <div class="mt-4">
                  <h5 class="text-white font-medium text-sm mb-2">Edit Blog Content (Markdown)</h5>
                  <textarea
                    class="w-full h-64 bg-zinc-800 text-white p-4 rounded border border-zinc-700"
                    value={outline.markdownContent}
                    on:input={(e) => dispatch('updateMarkdown', { index, value: e.target.value })}
                    placeholder="Enter Markdown content here..."
                  ></textarea>
                </div>
              {/if}
            </div>
          {/each}
          {#if posted.length === 0}
            <p class="text-zinc-500 text-center py-4">No posted blogs yet.</p>
          {/if}
        </div>
      </div>
    </div>
  </div>