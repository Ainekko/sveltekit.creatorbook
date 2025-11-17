<!-- src/lib/components/elio/ContentAndPostsView.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { FileText, Lightbulb, Check, Copy, ChevronDown, ChevronUp, Eye, X } from 'lucide-svelte';
  
    export let blogPosts;
    export let generatingPosts;
    export let pendingPosts;
    export let approvedPosts;
    export let copiedIndex;
    export let projectData;
  
    const dispatch = createEventDispatcher();
  
    let hoveredPost = null;
    let expandedContent = null;
    let previewPost = null;
  
    function toggleExpandContent(postId) {
      expandedContent = expandedContent === postId ? null : postId;
    }
  
    function openPreview(post) {
      previewPost = post;
    }
  
    function closePreview() {
      previewPost = null;
    }
  </script>
  
  <div class="space-y-8">
    <!-- Source Content Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-zinc-900">Source Content</h2>
        <span class="text-sm text-zinc-500">{blogPosts.length} post{blogPosts.length !== 1 ? 's' : ''}</span>
      </div>
  
      {#if blogPosts.length === 0}
        <div class="text-center py-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200 shadow-xl">
          <FileText class="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <p class="text-zinc-700 mb-2 font-medium text-lg">No blog posts available</p>
          <p class="text-sm text-zinc-500">Create blog posts to convert them into Reddit posts</p>
        </div>
      {:else}
        <div class="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
          {#each blogPosts as post}
            <div
              class="group relative bg-white rounded-xl border border-zinc-200 min-w-[320px] max-w-[320px] hover:shadow-xl hover:border-orange-300 transition-all duration-300 snap-center flex flex-col"
            >
              <div class="p-5 flex-1 flex flex-col">
                <div class="flex items-start justify-between mb-3">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800">
                    {post.status}
                  </span>
                  <button
                    on:click={() => openPreview(post)}
                    class="p-1.5 hover:bg-zinc-100 rounded-lg transition-colors"
                    title="Preview full content"
                  >
                    <Eye class="w-4 h-4 text-zinc-600" />
                  </button>
                </div>
  
                <h3 class="text-base font-bold text-zinc-900 mb-2 line-clamp-2 min-h-[48px]">
                  {post.title}
                </h3>
  
                <p class="text-sm text-zinc-600 line-clamp-3 mb-4 flex-1">
                  {post.content.substring(0, 120)}...
                </p>
  
                <button
                  on:click={() => dispatch('convertToRedditPost', post)}
                  disabled={generatingPosts.has(post.id)}
                  class="w-full px-4 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {generatingPosts.has(post.id) ? 'Generating...' : 'Generate Reddit Posts'}
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  
    <!-- Pending Approval Section -->
    {#if pendingPosts.length > 0}
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-zinc-900">Review & Approve</h2>
          <span class="text-sm text-amber-600 font-medium">{pendingPosts.length} pending</span>
        </div>
  
        <div class="space-y-4">
          {#each pendingPosts as entry}
            <div class="bg-white rounded-xl border border-zinc-200 shadow-md">
              <button
                on:click={() => toggleExpandContent(entry.id)}
                class="w-full p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
              >
                <div class="flex-1 text-left">
                  <h3 class="font-semibold text-zinc-900">From: {entry.contentTitle}</h3>
                  <p class="text-xs text-zinc-500 mt-1">
                    {entry.posts.length} variation{entry.posts.length !== 1 ? 's' : ''} • 
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {#if expandedContent === entry.id}
                  <ChevronUp class="w-5 h-5 text-zinc-600" />
                {:else}
                  <ChevronDown class="w-5 h-5 text-zinc-600" />
                {/if}
              </button>
  
              {#if expandedContent === entry.id}
                <div class="border-t border-zinc-200 p-4 bg-zinc-50">
                  <div class="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory scrollbar-hide">
                    {#each entry.posts as post, idx}
                      <div class="bg-white rounded-lg border border-zinc-300 p-4 min-w-[340px] max-w-[340px] snap-center hover:border-orange-300 transition-colors">
                        <div class="flex items-start justify-between mb-3">
                          <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {post.thread_type ?? 'Post'}
                          </span>
                          <button
                            on:click={() => dispatch('approvePost', { entry, postIndex: idx })}
                            class="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all hover:scale-110"
                            title="Approve this post"
                          >
                            <Check class="w-4 h-4" />
                          </button>
                        </div>
  
                        <h4 class="font-bold text-zinc-900 mb-2 text-sm line-clamp-2">{post.title}</h4>
                        
                        <div class="relative">
                          <p class="text-xs text-zinc-700 leading-relaxed mb-3 max-h-[120px] overflow-y-auto custom-scrollbar">
                            {post.content}
                          </p>
                        </div>
  
                        <div class="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-200">
                          {#each post.suggested_subreddits as sub}
                            <span class="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded font-medium">
                              r/{sub}
                            </span>
                          {/each}
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  
    <!-- Approved Posts Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-zinc-900">Ready to Post</h2>
        <span class="text-sm text-green-600 font-medium">{approvedPosts.length} approved</span>
      </div>
  
      {#if approvedPosts.length === 0}
        <div class="text-center py-16 bg-gradient-to-br from-zinc-50 to-zinc-50 rounded-2xl border-2 border-dashed border-zinc-300">
          <Lightbulb class="w-16 h-16 text-zinc-400 mx-auto mb-4" />
          <p class="text-zinc-600 font-medium text-lg">No approved posts yet</p>
          <p class="text-sm text-zinc-500 mt-2">Generate posts and approve them to see them here</p>
        </div>
      {:else}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {#each approvedPosts as entry}
            <div class="bg-white rounded-xl border border-zinc-200 overflow-hidden hover:shadow-lg transition-all">
              <!-- Header -->
              <div class="p-4 border-b border-zinc-200 bg-zinc-50">
                <div class="flex items-start justify-between">
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {projectData?.business_name?.charAt(0) || 'R'}
                    </div>
                    <div>
                      <div class="font-bold text-zinc-900 text-sm">{projectData?.business_name || 'Your Business'}</div>
                      <div class="text-xs text-zinc-500">From: {entry.contentTitle}</div>
                    </div>
                  </div>
  
                  <button
                    on:click={() => dispatch('copyPost', { post: entry.post })}
                    class="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded-lg text-xs font-medium transition-all"
                  >
                    {#if copiedIndex === entry.post}
                      <Check class="w-3.5 h-3.5" />
                      Copied
                    {:else}
                      <Copy class="w-3.5 h-3.5" />
                      Copy
                    {/if}
                  </button>
                </div>
              </div>
  
              <!-- Post Content -->
              <div class="p-4">
                <h4 class="font-bold text-zinc-900 mb-2 text-sm">{entry.post.title}</h4>
                
                <div class="relative">
                  <p class="text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed mb-3 max-h-[200px] overflow-y-auto custom-scrollbar">
                    {entry.post.content}
                  </p>
                </div>
  
                <!-- Subreddits -->
                <div class="flex flex-wrap gap-2 pt-3 border-t border-zinc-200">
                  {#each entry.post.suggested_subreddits as sub}
                    <span class="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                      r/{sub}
                    </span>
                  {/each}
                </div>
  
                <!-- Footer -->
                <div class="mt-3 flex items-center justify-between pt-3 border-t border-zinc-200">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {entry.post.thread_type ?? 'Post'}
                  </span>
  
                  <button
                    on:click={() => dispatch('deleteApprovedPost', { postId: entry.id })}
                    class="text-xs text-zinc-500 hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Full Content Preview Modal -->
  {#if previewPost}
    <div 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      on:click={closePreview}
    >
      <div 
        class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        on:click|stopPropagation
      >
        <div class="p-6 border-b border-zinc-200 flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-xl font-bold text-zinc-900 mb-1">{previewPost.title}</h3>
            <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800">
              {previewPost.status}
            </span>
          </div>
          <button
            on:click={closePreview}
            class="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X class="w-5 h-5 text-zinc-600" />
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
          <p class="text-zinc-700 leading-relaxed whitespace-pre-wrap">
            {previewPost.content}
          </p>
        </div>
  
        <div class="p-6 border-t border-zinc-200 bg-zinc-50">
          <button
            on:click={() => {
              dispatch('convertToRedditPost', previewPost);
              closePreview();
            }}
            disabled={generatingPosts.has(previewPost.id)}
            class="w-full px-4 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Lightbulb class="w-5 h-5" />
            {generatingPosts.has(previewPost.id) ? 'Generating...' : 'Generate Reddit Posts'}
          </button>
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
  
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 3px;
    }
  
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
  
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  </style>