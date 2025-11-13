<script>
  import { page } from '$app/stores';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { contentStore } from '$lib/components/nai/stores';
  import {API_BASE_URL, WORKER_API_URL} from '$lib/config';
  import { Sparkles, FileText, Lock, BarChart3, Settings, Copy, Check } from 'lucide-svelte';
  $: projectId = $page.params.id;
  $: blogPosts = $contentStore.blogPosts || [];
  const BACKEND_URL = API_BASE_URL;
  const WORKER_URL = WORKER_API_URL;
  let authToken = '';
  // State
  let loading = true;
  let projectData = null;
  let view = 'studio';
  let selectedContent = null;
  let generatingThreads = new Set(); // Track which posts are generating
  let generatedThreads = [];
  let showDemoModal = true;
  let copiedIndex = null;
  let hoveredPost = null;
  let pendingThreads = []; // Threads waiting for approval
  let approvedThreads = []; // Approved threads ready to post
  let showSuccessModal = false;
  let successMessage = '';
  let currentCopiedTimer;
  let pendingScroll;
  let approvedScroll;
  // LocalStorage for generated threads
  const getThreadsKey = () => `rio_threads_${projectId}`;
  function closeDemo() {
    showDemoModal = false;
  }
  function closeSuccessModal() {
    showSuccessModal = false;
  }
  function goToTweetsView() {
    showSuccessModal = false;
    view = 'tweets';
  }
  async function loadBlogPosts() {
    await contentStore.loadBlogPosts(projectId);
  }
  onMount(async () => {
    if (browser) {
      authToken = localStorage.getItem('token') || '';
    }
    await loadBlogPosts();
    await fetchProjectData();
    loadApprovedThreads();
  });
  onDestroy(() => {
    if (currentCopiedTimer) clearTimeout(currentCopiedTimer);
  });
  async function fetchProjectData() {
    try {
      const projectRes = await fetch(`${BACKEND_URL}/elio/api/projects/${projectId}/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
    
      if (!projectRes.ok) throw new Error('Failed to fetch project');
      const projectJson = await projectRes.json();
      projectData = projectJson.project || projectJson;
    
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loading = false;
    }
  }
  function saveThreads(contentId, contentTitle, threads) {
    try {
      // Add to pending threads for approval
      const newPendingEntry = {
        id: `thread_${Date.now()}`,
        contentId: contentId,
        contentTitle: contentTitle,
        threads: threads.filter(t => t != null).map(t => ({ ...t, approved: false })),
        createdAt: new Date().toISOString()
      };
    
      pendingThreads = [newPendingEntry, ...pendingThreads];
    
    } catch (error) {
      console.error('Failed to save threads:', error);
    }
  }
  function approveThread(threadEntry, threadIndex) {
    const entryIndex = pendingThreads.findIndex(e => e.id === threadEntry.id);
    if (entryIndex === -1) return;
    const thread = pendingThreads[entryIndex].threads.splice(threadIndex, 1)[0];
    if (!thread) return;
    thread.approved = true;
  
    // Move to approved threads
    const approvedEntry = {
      id: `approved_${Date.now()}`,
      contentId: threadEntry.contentId,
      contentTitle: threadEntry.contentTitle,
      thread: thread,
      createdAt: new Date().toISOString()
    };
  
    approvedThreads = [approvedEntry, ...approvedThreads];
    // Remove empty pending entries
    pendingThreads = pendingThreads.filter(e => e.threads.length > 0);
  
    // Save to localStorage
    if (browser) {
      try {
        localStorage.setItem(getThreadsKey(), JSON.stringify(approvedThreads));
      } catch (error) {
        console.error('Failed to save approved threads:', error);
      }
    }
  }
  function loadApprovedThreads() {
    if (!browser) return;
    try {
      const stored = localStorage.getItem(getThreadsKey());
      if (stored) {
        const parsed = JSON.parse(stored);
        approvedThreads = parsed.filter(t => t && t.thread && typeof t.thread === 'object');
      }
    } catch (error) {
      console.error('Failed to load threads:', error);
    }
  }
  async function generateTweetThreads(post) {
    // Add this post to generating set
    generatingThreads.add(post.id);
    generatingThreads = generatingThreads; // Trigger reactivity
  
    try {
      const response = await fetch(`${WORKER_URL}/rio/generate-tweets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          business_name: projectData.business_name || projectData.name,
          business_description: projectData.description,
          industry: projectData.industry || 'tech',
          project_url: projectData.website || '',
          content_type: 'educational'
        })
      });
    
      if (!response.ok) throw new Error('Failed to generate threads');
    
      const data = await response.json();
    
      if (data.success && data.threads) {
        saveThreads(post.id, post.title, data.threads);
      
        // Show success modal
        successMessage = `Generated ${data.threads.length} tweet threads for "${post.title}"`;
        showSuccessModal = true;
      } else {
        throw new Error('Invalid response format');
      }
    
    } catch (error) {
      console.error('Error generating threads:', error);
      alert('Failed to generate tweet threads. Please try again.');
    } finally {
      // Remove from generating set
      generatingThreads.delete(post.id);
      generatingThreads = generatingThreads; // Trigger reactivity
    }
  }
  async function copyThread(thread) {
    if (!thread || !Array.isArray(thread.tweets)) return;
    const threadText = thread.tweets.join('\n\n---\n\n') + '\n\n' + (thread.suggested_hashtags || []).join(' ');
  
    try {
      await navigator.clipboard.writeText(threadText);
      if (currentCopiedTimer) clearTimeout(currentCopiedTimer);
      copiedIndex = thread;
      currentCopiedTimer = setTimeout(() => {
        copiedIndex = null;
        currentCopiedTimer = null;
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }
  function deleteApprovedThread(threadId) {
    if (!confirm('Delete this thread?')) return;
  
    try {
      approvedThreads = approvedThreads.filter(t => t.id !== threadId);
      if (browser) {
        localStorage.setItem(getThreadsKey(), JSON.stringify(approvedThreads));
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  }
  function scrollPendingLeft() {
    pendingScroll?.scrollBy({ left: -(window.innerWidth * 0.5), behavior: 'smooth' });
  }
  function scrollPendingRight() {
    pendingScroll?.scrollBy({ left: (window.innerWidth * 0.5), behavior: 'smooth' });
  }
  function scrollApprovedLeft() {
    approvedScroll?.scrollBy({ left: -420, behavior: 'smooth' });
  }
  function scrollApprovedRight() {
    approvedScroll?.scrollBy({ left: 420, behavior: 'smooth' });
  }
</script>
<!-- Demo Modal -->
{#if showDemoModal}
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    on:click={closeDemo}
  >
    <div
      class="bg-white rounded-2xl p-8 border border-zinc-200 max-w-lg relative flex flex-col text-center shadow-xl"
      on:click|stopPropagation
    >
      <button
        on:click={closeDemo}
        class="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 text-2xl leading-none"
      >
        ×
      </button>
    
      <div class="space-y-6">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
          <Sparkles class="w-8 h-8 text-white" />
        </div>
      
        <h2 class="text-3xl md:text-4xl font-semibold text-zinc-700 leading-tight tracking-tight">
          Turn Content into <span class="font-['Pacifico'] text-blue-600">Viral</span> Tweets
        </h2>
      
        <p class="text-lg text-zinc-500 leading-relaxed font-light max-w-md mx-auto">
          AI-powered tweet thread generator that transforms your blog posts into engaging X content.
        </p>
      
        <div class="space-y-3 text-left max-w-sm mx-auto pt-2">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm text-zinc-600">3 unique thread variations per post</span>
          </div>
        
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm text-zinc-600">Optimized hooks and CTAs</span>
          </div>
        
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm text-zinc-600">Industry-specific tone & hashtags</span>
          </div>
        </div>
      
        <button
          on:click={closeDemo}
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          Start Creating Threads
        </button>
      </div>
    </div>
  </div>
{/if}
<!-- Success Modal -->
{#if showSuccessModal}
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    on:click={closeSuccessModal}
  >
    <div
      class="bg-white rounded-2xl p-8 border border-zinc-200 max-w-md relative flex flex-col text-center shadow-xl"
      on:click|stopPropagation
    >
      <button
        on:click={closeSuccessModal}
        class="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 text-2xl leading-none"
      >
        ×
      </button>
    
      <div class="space-y-6">
        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
          <Check class="w-8 h-8 text-white" />
        </div>
      
        <h2 class="text-2xl font-semibold text-zinc-900">
          Threads Generated! 🎉
        </h2>
      
        <p class="text-base text-zinc-600">
          {successMessage}
        </p>
      
        <div class="flex flex-col gap-3">
          <button
            on:click={goToTweetsView}
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            View & Approve Threads
          </button>
        
          <button
            on:click={closeSuccessModal}
            class="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Generate More
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
<div class="max-w-screen-2xl mx-auto p-4 sm:p-6">
  {#if loading}
    <div class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto"></div>
      <p class="text-zinc-500 mt-4">Loading RIO...</p>
    </div>
  {:else}
    <!-- Header -->
    <div class="mb-6 sm:mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-zinc-900 flex items-center gap-2">
            <Sparkles class="w-7 h-7 text-blue-600" />
            RIO X Content Assistant
          </h1>
          <p class="text-sm sm:text-base text-zinc-600 mt-1">
            {#if projectData}
              Transform content for {projectData.business_name || projectData.name}
            {/if}
          </p>
        </div>
      </div>
    
      <!-- View Tabs -->
      <div class="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        <div class="flex gap-2 border-b border-zinc-200 min-w-max">
          <button
            on:click={() => view = 'studio'}
            class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'studio' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
          >
            <FileText class="w-5 h-5" />
            Content ({blogPosts.length})
          </button>
          <button
            on:click={() => view = 'tweets'}
            class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'tweets' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
          >
            <Sparkles class="w-5 h-5" />
            Tweets ({pendingThreads.length + approvedThreads.length})
          </button>
          <button
            disabled
            class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap text-zinc-300 cursor-not-allowed"
          >
            <Lock class="w-5 h-5" />
            Analytics (Soon)
          </button>
          <button
            on:click={() => view = 'config'}
            class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'config' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
          >
            <Settings class="w-5 h-5" />
            Settings
          </button>
        </div>
      </div>
    </div>
  
    {#if view === 'studio'}
      <!-- Studio View - Blog Post Grid -->
      <div class="space-y-6">
        {#if blogPosts.length === 0}
          <div class="text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
            <FileText class="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p class="text-zinc-700 mb-2 font-medium text-lg">No blog posts available</p>
            <p class="text-sm text-zinc-500">Create blog posts to convert them into tweet threads</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each blogPosts as post}
              <div
                class="group relative bg-white rounded-2xl border border-zinc-200 overflow-visible hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-72"
              >
                <!-- Card Content -->
                <div class="p-6">
                  <div class="flex items-start justify-between mb-3">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
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
                  
                    <!-- Tooltip Preview -->
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
                    on:click={() => generateTweetThreads(post)}
                    disabled={generatingThreads.has(post.id)}
                    class="w-full px-4 py-2.5 bg-gradient-to-r from-zinc-700 to-indigo-950/80 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group-hover:shadow-lg"
                  >
                    <Sparkles class="w-5 h-5" />
                    {generatingThreads.has(post.id) ? 'Generating...' : 'Turn into Tweets'}
                  </button>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    
    {:else if view === 'tweets'}
      <!-- Tweets View - Approval & Display -->
      <div class="space-y-6">
      
        <!-- Pending Approval Section -->
        {#if pendingThreads.length > 0}
          <div class="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-white flex items-center gap-2">
                <span class="w-2 h-2 bg-zinc-500 rounded-full animate-pulse"></span>
                Review & Approve
              </h2>
              <div class="flex gap-2">
                <button
                  on:click={scrollPendingLeft}
                  class="bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-md text-lg font-bold transition-colors"
                >
                  &lt;
                </button>
                <button
                  on:click={scrollPendingRight}
                  class="bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-md text-lg font-bold transition-colors"
                >
                  &gt;
                </button>
              </div>
            </div>
          
            <div class="overflow-x-auto flex flex-row gap-8 pb-4 snap-x snap-mandatory scrollbar-hide" bind:this={pendingScroll}>
              {#each pendingThreads as threadEntry}
                <div class="space-y-4 min-w-[80vw] sm:min-w-[50vw] lg:min-w-[30vw] snap-center">
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-zinc-100">From: {threadEntry.contentTitle}</h3>
                    <span class="text-xs text-zinc-300">{new Date(threadEntry.createdAt).toLocaleDateString()}</span>
                  </div>
                
                  <div class="flex flex-row overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
                    {#each threadEntry.threads as thread, idx}
                      {#if thread}
                        <div class="bg-zinc-900 rounded-xl border-2 border-zinc-700 p-5 hover:border-zinc-400 transition-all {thread.approved ? 'opacity-50' : ''} min-w-[300px] snap-center">
                          <div class="flex items-start justify-between mb-4">
                            <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-700 text-zinc-300">
                              {thread?.thread_type ?? 'Unknown'}
                            </span>
                          
                            {#if !thread.approved}
                              <button
                                on:click={() => approveThread(threadEntry, idx)}
                                class="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all hover:scale-110"
                                title="Approve this thread"
                              >
                                <Check class="w-5 h-5" />
                              </button>
                            {:else}
                              <div class="p-2 bg-green-900 text-green-300 rounded-lg">
                                <Check class="w-5 h-5" />
                              </div>
                            {/if}
                          </div>
                        
                          <div class="space-y-3 mb-4 max-h-96 overflow-y-auto custom-scrollbar">
                            {#each thread?.tweets ?? [] as tweet, tweetIdx}
                              <div class="bg-zinc-800 rounded-lg p-3">
                                <div class="flex items-start gap-2">
                                  <span class="flex-shrink-0 w-6 h-6 bg-zinc-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    {tweetIdx + 1}
                                  </span>
                                  <p class="text-xs text-zinc-200 flex-1 leading-relaxed" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">{tweet}</p>
                                </div>
                              </div>
                            {/each}
                          </div>
                        
                          <div class="flex flex-wrap gap-1.5 mb-2">
                            {#each thread?.suggested_hashtags ?? [] as tag}
                              <span class="text-xs px-2 py-0.5 bg-zinc-700 text-zinc-300 rounded">
                                {tag}
                              </span>
                            {/each}
                          </div>
                        
                          <p class="text-xs text-zinc-400 italic">
                            {thread?.reasoning ?? ''}
                          </p>
                        </div>
                      {/if}
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      
        <!-- Approved Threads - Twitter Style -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-zinc-900">Ready to Post</h2>
            <div class="flex gap-2">
              <button
                on:click={scrollApprovedLeft}
                class="bg-zinc-200 hover:bg-zinc-100 text-zinc-700 p-2 rounded-full text-lg font-medium transition-colors"
              >
                &lt;
              </button>
              <button
                on:click={scrollApprovedRight}
                class="bg-zinc-200 hover:bg-zinc-100 text-zinc-700 p-2 rounded-full text-lg font-medium transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>
        
          {#if approvedThreads.length === 0}
            <div class="text-center py-16 bg-gradient-to-br from-zinc-50 to-zinc-50 rounded-2xl border-2 border-dashed border-zinc-300">
              <Sparkles class="w-16 h-16 text-zinc-400 mx-auto mb-4" />
              <p class="text-zinc-600 font-medium text-lg">No approved threads yet</p>
              <p class="text-sm text-zinc-500 mt-2">Generate threads from Studio and approve them here</p>
            </div>
          {:else}
            <div class="flex flex-row overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide" bind:this={approvedScroll}>
              {#each approvedThreads as threadEntry}
                {#if threadEntry.thread}
                  <div class="bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden hover:shadow-lg transition-all min-w-[400px] snap-center">
                    <!-- Twitter-style Header -->
                    <div class="p-4 border-b border-zinc-700 bg-zinc-800">
                      <div class="flex items-start justify-between">
                        <div class="flex items-start gap-3">
                          <div class="w-12 h-12 rounded-full bg-zinc-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {projectData?.business_name?.charAt(0) || 'R'}
                          </div>
                          <div>
                            <div class="font-bold text-white">{projectData?.business_name || 'Your Business'}</div>
                            <div class="text-sm text-zinc-400">@{projectData?.business_name?.toLowerCase().replace(/\s+/g, '') || 'yourbusiness'}</div>
                            <div class="text-xs text-zinc-500 mt-1">From: {threadEntry.contentTitle}</div>
                          </div>
                        </div>
                      
                        <button
                          on:click={() => copyThread(threadEntry.thread)}
                          class="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg text-sm font-medium transition-all"
                        >
                          {#if copiedIndex === threadEntry.thread}
                            <Check class="w-5 h-5" />
                            Copied!
                          {:else}
                            <Copy class="w-5 h-5" />
                            
                          {/if}
                        </button>
                      </div>
                    </div>
                  
                    <!-- Thread Content -->
                    <div class="p-4">
                      <div class="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                        {#each threadEntry.thread?.tweets ?? [] as tweet, idx}
                          <div class="relative pl-8">
                            {#if idx < (threadEntry.thread?.tweets?.length ?? 0) - 1}
                              <div class="absolute left-3 top-8 bottom-0 w-0.5 bg-zinc-500"></div>
                            {/if}
                          
                            <div class="flex items-start gap-4">
                              <div class="absolute left-0 w-6 h-6 bg-zinc-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {idx + 1}
                              </div>
                            
                              <div class="flex-1 bg-zinc-800 rounded-xl p-4 hover:bg-zinc-700 transition-colors">
                                <p class="text-white whitespace-pre-wrap leading-relaxed" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6;">{tweet}</p>
                                <div class="text-xs text-zinc-400 mt-2 text-right">
                                  {tweet.length}/280 characters
                                </div>
                              </div>
                            </div>
                          </div>
                        {/each}
                      </div>
                    
                      <!-- Hashtags -->
                      <div class="flex flex-wrap gap-2 mt-6 pt-4 border-t border-zinc-600">
                        {#each threadEntry.thread?.suggested_hashtags ?? [] as tag}
                          <span class="px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full text-sm font-medium">
                            {tag}
                          </span>
                        {/each}
                      </div>
                    
                      <!-- Thread Type Badge -->
                      <div class="mt-4 flex items-center justify-between">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-700 text-zinc-300">
                          {threadEntry.thread?.thread_type ?? 'Unknown'}
                        </span>
                      
                        <button
                          on:click={() => deleteApprovedThread(threadEntry.id)}
                          class="text-xs text-zinc-400 hover:text-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      </div>
    
    {:else if view === 'config'}
      <!-- Settings View -->
      <div class="max-w-2xl space-y-6">
        <div class="bg-white rounded-xl p-6 border border-zinc-200">
          <h2 class="text-lg font-semibold text-zinc-900 mb-4">Configuration Settings</h2>
          {#if projectData}
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-1">Business Name</label>
                <input
                  type="text"
                  bind:value={projectData.business_name}
                  class="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-blue-500"
                  disabled
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-1">Description</label>
                <textarea
                  bind:value={projectData.description}
                  class="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-blue-500 min-h-[100px]"
                  disabled
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-1">Industry</label>
                <input
                  type="text"
                  bind:value={projectData.industry}
                  class="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-blue-500"
                  disabled
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-1">Website</label>
                <input
                  type="url"
                  bind:value={projectData.website}
                  class="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-blue-500"
                  disabled
                />
              </div>
              <p class="text-sm text-zinc-500 italic">Settings are read-only. Contact support to update.</p>
            </div>
          {:else}
            <p class="text-zinc-600">No project data available.</p>
          {/if}
        </div>
      </div>
    {/if}
  {/if}
</div>
<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
</style>