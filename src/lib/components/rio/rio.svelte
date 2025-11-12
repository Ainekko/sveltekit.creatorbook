<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { contentStore } from '$lib/components/nai/stores';
  import {API_BASE_URL, WORKER_API_URL} from '$lib/config';
  import { TrendingUp, Target, BarChart3, FileText, Settings, ArrowUpRight, Twitter } from 'lucide-svelte';
  
  $: projectId = $page.params.id;
  $: blogPosts = $contentStore.blogPosts || [];
  
  const BACKEND_URL = API_BASE_URL;
  const WORKER_URL = WORKER_API_URL;

  const authToken = localStorage.getItem('token');
  
  // State
  let loading = true;
  let projectData = null;
  let xAccount = null;
  let config = {
    keywords: [],
    exclude_keywords: [],
    monitor_mentions: true,
    monitor_keywords: true,
    min_followers: 100,
    min_relevance: 65.0
  };
  let opportunities = [];
  let xPosts = [];
  let monitoring = false;
  let view = 'content'; // 'content', 'opportunities', 'analytics', 'config'
  let selectedOpportunity = null;
  let selectedContent = null;
  let convertingContent = false;
  let showDemoModal = true;
  
  // Analytics
  let analytics = {
    totalEngagement: 0,
    totalPosts: 0,
    avgEngagement: 0,
    bestPerformers: [],
    topHashtags: []
  };
  
  // LocalStorage keys
  const getXPostsKey = () => `rio_x_posts_${projectId}`;
  
  function closeDemo() {
    showDemoModal = false;
  }
  
  // Load content from store
  async function loadBlogPosts() {
    await contentStore.loadBlogPosts(projectId);
  }
  
  onMount(async () => {
    await loadBlogPosts();
    await fetchInitialData();
  });
  
  async function fetchInitialData() {
    try {
      // Fetch project data
      const projectRes = await fetch(`${BACKEND_URL}/elio/api/projects/${projectId}/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      if (!projectRes.ok) throw new Error('Failed to fetch project');
      const projectJson = await projectRes.json();
      projectData = projectJson.project || projectJson;
      
      // Check X connection
      const accountRes = await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/account/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      if (accountRes.ok) {
        const accountData = await accountRes.json();
        if (accountData.connected) {
          xAccount = accountData;
        }
      }
      
      // Fetch config
      const configRes = await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/config/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      if (configRes.ok) {
        const configData = await configRes.json();
        config = configData;
      }
      
      // Fetch opportunities
      await fetchOpportunities();
      
      // Load X posts
      await loadXPosts();
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loading = false;
    }
  }
  
  async function fetchOpportunities() {
    try {
      const res = await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/opportunities/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        opportunities = data.opportunities || [];
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  }
  
  // X Posts Management
  async function loadXPosts() {
    try {
      const stored = localStorage.getItem(getXPostsKey());
      if (stored) {
        xPosts = JSON.parse(stored);
      }
      calculateAnalytics();
    } catch (error) {
      console.error('Failed to load X posts:', error);
      xPosts = [];
    }
  }
  
  function saveXPostsToLocalStorage(posts) {
    try {
      localStorage.setItem(getXPostsKey(), JSON.stringify(posts));
    } catch (error) {
      console.error('Failed to save X posts to localStorage:', error);
    }
  }
  
  // Convert blog post to X thread
  async function convertToXPost(blogPost) {
    if (!blogPost) return;
    
    convertingContent = true;
    try {
      // TODO: Call your AI service to convert blog post to X thread format
      const xPost = {
        id: `x_${Date.now()}`,
        original_content_id: blogPost.id,
        title: blogPost.title,
        thread: [
          `X version of: ${blogPost.title}\n\n${blogPost.content.substring(0, 250)}...\n\n[Thread 1/3]`,
          `[This would be AI-generated X-optimized thread content - Tweet 2/3]`,
          `[This would be AI-generated X-optimized thread content - Tweet 3/3]`
        ],
        suggested_hashtags: ['#startup', '#tech', '#business'],
        created_at: new Date().toISOString(),
        posted: false,
        likes: 0,
        retweets: 0,
        replies: 0,
        url: null
      };
      
      xPosts = [xPost, ...xPosts];
      saveXPostsToLocalStorage(xPosts);
      
      alert('Content converted to X thread format!');
      view = 'analytics';
      
    } catch (error) {
      console.error('Error converting to X post:', error);
      alert('Failed to convert content to X post');
    } finally {
      convertingContent = false;
    }
  }
  
  // Calculate analytics
  function calculateAnalytics() {
    const postedPosts = xPosts.filter(p => p.posted);
    const totalEngagement = postedPosts.reduce((sum, p) => 
      sum + (p.likes || 0) + (p.retweets || 0) + (p.replies || 0), 0
    );
    
    analytics = {
      totalEngagement,
      totalPosts: postedPosts.length,
      avgEngagement: postedPosts.length > 0 ? Math.round(totalEngagement / postedPosts.length) : 0,
      bestPerformers: [...postedPosts]
        .sort((a, b) => {
          const aEng = (a.likes || 0) + (a.retweets || 0) + (a.replies || 0);
          const bEng = (b.likes || 0) + (b.retweets || 0) + (b.replies || 0);
          return bEng - aEng;
        })
        .slice(0, 5),
      topHashtags: getTopHashtags(postedPosts)
    };
  }
  
  function getTopHashtags(posts) {
    const hashtagCounts = {};
    posts.forEach(post => {
      if (post.suggested_hashtags) {
        post.suggested_hashtags.forEach(tag => {
          const engagement = (post.likes || 0) + (post.retweets || 0) + (post.replies || 0);
          hashtagCounts[tag] = (hashtagCounts[tag] || 0) + engagement;
        });
      }
    });
    
    return Object.entries(hashtagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([hashtag, engagement]) => ({ hashtag, engagement }));
  }
  
  async function connectX() {
    try {
      console.log('[connectX] Initiating connect...', { projectId, authToken });

      const res = await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/connect/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      if (!res.ok) throw new Error('Failed to initiate OAuth');
      
      const data = await res.json();
      console.log('[connectX] Received auth_url from backend:', data.auth_url);
      
      const width = 600;
      const height = 700;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      
      const authWindow = window.open(
        data.auth_url,
        'X OAuth',
        `width=${width},height=${height},left=${left},top=${top}`
      );
      
      console.log('[connectX] Now listening for "message" event from popup...');
      window.addEventListener('message', handleOAuthCallback);
      
    } catch (error) {
      console.error('Error connecting X:', error);
      alert('Failed to connect X account');
    }
  }

  function handleOAuthCallback(event) {
    console.log('[handleOAuthCallback] Received event:', event);

    if (event.origin !== window.location.origin) {
      console.warn('[handleOAuthCallback] Ignored message from different origin:', event.origin);
      return;
    }

    if (event.data.type === 'x-oauth-success') {
      console.log('[handleOAuthCallback] SUCCESS! Account data:', event.data.account);
      xAccount = event.data.account;
      window.removeEventListener('message', handleOAuthCallback);
      alert('X account connected successfully!');
    }
    
    if (event.data.type === 'x-oauth-error') {
      console.error('[handleOAuthCallback] ERROR from popup:', event.data.error);
      alert(`Failed to connect X account: ${event.data.error}`);
      window.removeEventListener('message', handleOAuthCallback);
    }
  }
  
  async function disconnectX() {
    if (!confirm('Disconnect X account?')) return;
    
    try {
      await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/disconnect/`, {
        method: 'POST',
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      xAccount = null;
      alert('X account disconnected');
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  }
  
  async function saveConfig() {
    try {
      const res = await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/config/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });
      
      if (res.ok) {
        alert('Configuration saved!');
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      alert('Failed to save configuration');
    }
  }
  
  async function monitorNow() {
    if (!xAccount) {
      alert('Please connect your X account first');
      return;
    }
    
    monitoring = true;
    
    try {
      const accountRes = await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/account/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      if (!accountRes.ok) throw new Error('Failed to get account data');
      
      const accountData = await accountRes.json();
      
      const res = await fetch(`${WORKER_URL}/rio/monitor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: accountData.access_token,
          x_user_id: accountData.x_user_id,
          business_name: projectData.business_name || projectData.name,
          business_description: projectData.description,
          config: config
        })
      });
      
      if (!res.ok) throw new Error('Monitor failed');
      
      const data = await res.json();
      
      if (data.opportunities && data.opportunities.length > 0) {
        await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/opportunities/save/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ opportunities: data.opportunities })
        });
        
        await fetchOpportunities();
        alert(`Found ${data.opportunities.length} new opportunities!`);
      } else {
        alert('No new opportunities found');
      }
      
    } catch (error) {
      console.error('Error monitoring:', error);
      alert('Failed to monitor: ' + error.message);
    } finally {
      monitoring = false;
    }
  }
  
  async function copyResponse(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert('Response copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }
  
  async function updateOpportunity(oppId, updates) {
    try {
      await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/opportunities/${oppId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      
      opportunities = opportunities.map(o => 
        o.id === oppId ? { ...o, ...updates } : o
      );
      
    } catch (error) {
      console.error('Error updating opportunity:', error);
    }
  }
  
  function openTweet(url) {
    window.open(url, '_blank');
  }
  
  $: filteredOpportunities = opportunities.filter(o => !o.is_dismissed);
</script>

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
        class="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 text-2xl leading-none transition-colors"
      >
        ×
      </button>
      
      <div class="space-y-6">
        <h2 class="text-3xl md:text-4xl font-semibold text-zinc-700 leading-tight tracking-tight">
          This is just a little <span class="font-['Pacifico'] text-blue-600">demo</span>
        </h2>
        
        <p class="text-lg text-zinc-500 leading-relaxed font-light max-w-md mx-auto">
          Monitor X in real-time and never miss an opportunity to engage with your audience.
        </p>
        
        <div class="space-y-3 text-left max-w-sm mx-auto pt-2">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm text-zinc-600">Track mentions and keywords automatically</span>
          </div>
          
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm text-zinc-600">AI-powered response suggestions</span>
          </div>
          
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm text-zinc-600">Smart relevance scoring</span>
          </div>
        </div>
        
        <div class="pt-4 border-t border-zinc-100">
          <p class="text-xs text-zinc-400 mb-2 font-medium uppercase tracking-wide">Coming Next</p>
          <p class="text-sm text-zinc-500">
            Auto-replies, sentiment analysis, and multi-account support
          </p>
        </div>
        
        <button
          on:click={closeDemo}
          class="w-full bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          Let's go!
        </button>
      </div>
    </div>
  </div>
{/if}

<div class="max-w-7xl mx-auto p-4 sm:p-6">
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
          <h1 class="text-2xl sm:text-3xl font-bold text-zinc-900">RIO X Assistant</h1>
          <p class="text-sm sm:text-base text-zinc-600 mt-1">
            {#if projectData}
              Managing X presence for {projectData.business_name || projectData.name}
            {/if}
          </p>
        </div>
        
        <div class="flex gap-2 sm:gap-3 items-center flex-wrap">
          {#if xAccount}
            <div class="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
              <div class="text-sm">
                <div class="font-medium text-zinc-900">@{xAccount.username}</div>
                <div class="text-zinc-500 text-xs">{xAccount.display_name}</div>
              </div>
              <button
                on:click={disconnectX}
                class="text-xs text-zinc-600 hover:text-zinc-900"
              >
                Disconnect
              </button>
            </div>
            
            <button 
              on:click={monitorNow}
              disabled={monitoring}
              class="px-3 sm:px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium text-xs sm:text-sm disabled:opacity-50"
            >
              {monitoring ? 'Scanning...' : 'Scan Opportunities'}
            </button>
          {:else}
            <button
              on:click={connectX}
              class="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium flex items-center gap-2 text-sm"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Connect X Account
            </button>
          {/if}
        </div>
      </div>
      
      <!-- View Tabs -->
      <div class="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        <div class="flex gap-2 border-b border-zinc-200 min-w-max">
          <button
            on:click={() => view = 'content'}
            class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'content' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
          >
            <FileText class="w-4 h-4" />
            Content ({blogPosts.length})
          </button>
          <button
            on:click={() => view = 'opportunities'}
            class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'opportunities' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
          >
            <Target class="w-4 h-4" />
            Opportunities ({filteredOpportunities.length})
          </button>
          <button
            on:click={() => { view = 'analytics'; calculateAnalytics(); }}
            class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'analytics' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
          >
            <BarChart3 class="w-4 h-4" />
            Analytics
          </button>
          <button
            on:click={() => view = 'config'}
            class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'config' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
          >
            <Settings class="w-4 h-4" />
            Config
          </button>
        </div>
      </div>
    </div>
    
    {#if view === 'content'}
      <!-- Content View -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-5 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {#if blogPosts.length === 0}
            <div class="text-center py-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <FileText class="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <p class="text-zinc-700 mb-2 font-medium">No blog posts available</p>
              <p class="text-sm text-zinc-500">Create blog posts first to convert them to X threads</p>
            </div>
          {:else}
            {#each blogPosts as post}
              <button
                on:click={() => selectedContent = post}
                class="w-full text-left bg-white rounded-xl border border-zinc-200 p-5 hover:border-blue-300 hover:shadow-md transition-all {selectedContent?.id === post.id ? 'ring-2 ring-blue-500 border-blue-500' : ''}"
              >
                <div class="flex items-start justify-between mb-3">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800">
                    {post.status}
                  </span>
                </div>
                <h3 class="text-base font-semibold text-zinc-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p class="text-sm text-zinc-600 line-clamp-2">
                  {post.content.substring(0, 120)}...
                </p>
              </button>
            {/each}
          {/if}
        </div>
        
        <div class="lg:col-span-7 h-[calc(100vh-250px)]">
          {#if selectedContent}
            <div class="bg-white rounded-xl border border-zinc-200 overflow-hidden h-full flex flex-col">
              <div class="p-6 border-b border-zinc-200 bg-gradient-to-r from-blue-50 to-cyan-50 flex-shrink-0">
                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium mb-3 bg-white border border-blue-200 text-blue-800">
                  {selectedContent.status}
                </span>
                <h2 class="text-xl font-bold text-zinc-900 mb-2">
                  {selectedContent.title}
                </h2>
              </div>
              
              <div class="p-6 flex-1 overflow-y-auto">
                <div class="prose prose-sm max-w-none">
                  <p class="text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed">
                    {selectedContent.content}
                  </p>
                </div>
              </div>
              
              <div class="p-6 border-t border-zinc-200 bg-zinc-50 flex-shrink-0">
                <button
                  on:click={() => convertToXPost(selectedContent)}
                  disabled={convertingContent}
                  class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  {convertingContent ? 'Converting to X Thread...' : '→ Convert to X Thread'}
                </button>
              </div>
            </div>
          {:else}
            <div class="bg-gradient-to-br from-zinc-50 to-blue-50 rounded-xl border-2 border-dashed border-zinc-300 h-full flex items-center justify-center">
              <div class="text-center py-12">
                <FileText class="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <p class="text-zinc-600 font-medium">Select a blog post to preview</p>
                <p class="text-sm text-zinc-500 mt-1">Click a post to see full content before converting</p>
              </div>
            </div>
          {/if}
        </div>
      </div>
      
    {:else if view === 'opportunities'}
      <!-- Opportunities View -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div class="lg:col-span-5 space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {#if filteredOpportunities.length === 0}
            <div class="text-center py-12 bg-zinc-50 rounded-xl">
              <Target class="w-12 h-12 text-zinc-400 mx-auto mb-4" />
              <p class="text-zinc-500 mb-2">No opportunities yet</p>
              <p class="text-sm text-zinc-400">
                {#if !xAccount}
                  Connect your X account to start monitoring
                {:else}
                  Click "Scan Opportunities" to find relevant tweets
                {/if}
              </p>
            </div>
          {:else}
            {#each filteredOpportunities as opp}
              <button
                on:click={() => selectedOpportunity = opp}
                class="w-full bg-white rounded-xl p-4 sm:p-5 border border-zinc-200 hover:border-zinc-300 transition-all text-left {selectedOpportunity?.id === opp.id ? 'ring-2 ring-zinc-900 border-zinc-900' : ''} {opp.is_responded ? 'opacity-60' : ''}"
              >
                <div class="flex items-start justify-between mb-3 gap-2">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
                      @{opp.author_username}
                    </span>
                    <span class="text-xs px-2 py-1 rounded bg-zinc-100 text-zinc-600">
                      {opp.author_followers.toLocaleString()} followers
                    </span>
                    {#if opp.is_responded}
                      <span class="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-100">
                        ✓ Responded
                      </span>
                    {/if}
                  </div>
                  <div class="font-semibold text-blue-600 text-sm flex-shrink-0">
                    {Math.round(opp.relevance_score)}%
                  </div>
                </div>
                
                <p class="text-zinc-900 text-sm mb-3 line-clamp-3">
                  {opp.text}
                </p>
                
                <div class="flex items-center justify-between text-xs text-zinc-500">
                  <div class="flex items-center gap-3">
                    <span>❤️ {opp.likes}</span>
                    <span>🔄 {opp.retweets}</span>
                    <span>💬 {opp.replies}</span>
                  </div>
                  <span class="text-blue-600 font-medium capitalize">{opp.opportunity_type}</span>
                </div>
              </button>
            {/each}
          {/if}
        </div>
        
        <div class="lg:col-span-7 h-[calc(100vh-250px)]">
          {#if selectedOpportunity}
            <div class="bg-white rounded-xl border border-zinc-200 overflow-hidden h-full flex flex-col">
              <div class="p-4 sm:p-6 border-b border-zinc-200 flex-shrink-0">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                      {selectedOpportunity.author_name.charAt(0)}
                    </div>
                    <div>
                      <div class="font-bold text-zinc-900">{selectedOpportunity.author_name}</div>
                      <div class="text-sm text-zinc-500">@{selectedOpportunity.author_username}</div>
                      <div class="text-xs text-zinc-400">{selectedOpportunity.author_followers.toLocaleString()} followers</div>
                    </div>
                  </div>
                  
                  <div class="flex gap-2">
                    <button
                      on:click={() => openTweet(selectedOpportunity.url)}
                      class="text-xs px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded transition-colors whitespace-nowrap"
                    >
                      View Tweet →
                    </button>
                    <button
                      on:click={() => updateOpportunity(selectedOpportunity.id, { is_responded: true })}
                      class="text-xs px-3 py-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded transition-colors whitespace-nowrap"
                    >
                      ✓ Mark Responded
                    </button>
                    <button
                      on:click={() => updateOpportunity(selectedOpportunity.id, { is_dismissed: true })}
                      class="text-xs px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded transition-colors whitespace-nowrap"
                    >
                      × Dismiss
                    </button>
                  </div>
                </div>
                
                <div class="p-4 bg-zinc-50 rounded-lg mb-4">
                  <p class="text-zinc-900 whitespace-pre-wrap">{selectedOpportunity.text}</p>
                  <div class="flex items-center gap-4 mt-3 text-sm text-zinc-500">
                    <span>❤️ {selectedOpportunity.likes}</span>
                    <span>🔄 {selectedOpportunity.retweets}</span>
                    <span>💬 {selectedOpportunity.replies}</span>
                  </div>
                </div>
                
                {#if selectedOpportunity.match_reasoning}
                  <div class="p-3 bg-blue-50 rounded-lg mb-4">
                    <p class="text-sm text-zinc-700">
                      <span class="font-semibold text-blue-700">Why this matches:</span>
                      {selectedOpportunity.match_reasoning}
                    </p>
                  </div>
                {/if}
                
                {#if selectedOpportunity.key_points && selectedOpportunity.key_points.length > 0}
                  <div>
                    <h3 class="text-sm font-semibold text-zinc-700 mb-2">Key Points:</h3>
                    <ul class="space-y-1">
                      {#each selectedOpportunity.key_points as point}
                        <li class="text-sm text-zinc-600 flex items-start">
                          <span class="text-blue-500 mr-2 flex-shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
              </div>
              
              <div class="p-4 sm:p-6 flex-1 overflow-y-auto">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-semibold text-zinc-700">Suggested Response</h3>
                  <button
                    on:click={() => copyResponse(selectedOpportunity.suggested_response)}
                    class="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                  >
                    Copy Response
                  </button>
                </div>
                
                <div class="bg-zinc-50 rounded-lg p-4">
                  <p class="text-sm text-zinc-800 whitespace-pre-wrap leading-relaxed">
                    {selectedOpportunity.suggested_response}
                  </p>
                </div>
              </div>
            </div>
          {:else}
            <div class="bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-300 h-full flex items-center justify-center">
              <div class="text-center py-12">
                <p class="text-zinc-500">Select an opportunity to view details</p>
              </div>
            </div>
          {/if}
        </div>
      </div>
      
    {:else if view === 'analytics'}
      <!-- Analytics View -->
      <div class="space-y-6">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <TrendingUp class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm text-blue-800 font-medium">Total Engagement</p>
                <p class="text-2xl font-bold text-blue-900">{analytics.totalEngagement}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <FileText class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm text-purple-800 font-medium">Total Posts</p>
                <p class="text-2xl font-bold text-purple-900">{analytics.totalPosts}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <BarChart3 class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm text-orange-800 font-medium">Avg Engagement</p>
                <p class="text-2xl font-bold text-orange-900">{analytics.avgEngagement}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- X Posts List -->
        <div class="bg-white rounded-xl border border-zinc-200 p-6">
          <h3 class="text-lg font-semibold text-zinc-900 mb-4">X Threads</h3>
          
          {#if xPosts.length === 0}
            <div class="text-center py-8">
              <svg class="w-12 h-12 text-blue-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <p class="text-zinc-600 font-medium">No X threads yet</p>
              <p class="text-sm text-zinc-500 mt-1">Convert blog posts to X threads in the Content tab</p>
            </div>
          {:else}
            <div class="space-y-3">
              {#each xPosts as post}
                <div class="border border-zinc-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all bg-gradient-to-r from-white to-blue-50/30">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex-1">
                      <h4 class="font-semibold text-zinc-900 mb-2">{post.title}</h4>
                      <div class="space-y-2">
                        {#each post.thread.slice(0, 2) as tweet}
                          <p class="text-sm text-zinc-600 bg-zinc-50 p-2 rounded">{tweet}</p>
                        {/each}
                        {#if post.thread.length > 2}
                          <p class="text-xs text-zinc-500">+ {post.thread.length - 2} more tweets</p>
                        {/if}
                      </div>
                    </div>
                    <div class="text-right ml-4">
                      {#if post.posted}
                        <div class="text-lg font-bold text-blue-600">
                          {(post.likes + post.retweets + post.replies)}
                        </div>
                        <div class="text-xs text-zinc-500">total engagement</div>
                      {:else}
                        <span class="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded font-medium">Draft</span>
                      {/if}
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2 flex-wrap">
                    {#each post.suggested_hashtags as tag}
                      <span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
                        {tag}
                      </span>
                    {/each}
                  </div>
                  
                  {#if post.url}
                    <a 
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium mt-3"
                    >
                      View on X <ArrowUpRight class="w-3 h-3" />
                    </a>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
        
        <!-- Best Performers -->
        {#if analytics.bestPerformers.length > 0}
          <div class="bg-white rounded-xl border border-zinc-200 p-6">
            <div class="flex items-center gap-2 mb-4">
              <TrendingUp class="w-5 h-5 text-blue-600" />
              <h3 class="text-lg font-semibold text-zinc-900">Best Performing Threads</h3>
            </div>
            <div class="space-y-3">
              {#each analytics.bestPerformers as post, idx}
                <div class="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                  <div class="flex items-center gap-3 flex-1">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                      {idx + 1}
                    </div>
                    <div class="flex-1">
                      <h4 class="font-medium text-zinc-900 text-sm mb-1">{post.title}</h4>
                      <div class="flex items-center gap-2 text-xs text-zinc-500">
                        <span>❤️ {post.likes}</span>
                        <span>🔄 {post.retweets}</span>
                        <span>💬 {post.replies}</span>
                      </div>
                    </div>
                  </div>
                  <div class="font-bold text-blue-600 ml-4">
                    {post.likes + post.retweets + post.replies}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
        
        <!-- Top Hashtags -->
        {#if analytics.topHashtags.length > 0}
          <div class="bg-white rounded-xl border border-zinc-200 p-6">
            <div class="flex items-center gap-2 mb-4">
              <Target class="w-5 h-5 text-purple-600" />
              <h3 class="text-lg font-semibold text-zinc-900">Top Performing Hashtags</h3>
            </div>
            <div class="space-y-3">
              {#each analytics.topHashtags as item, idx}
                <div class="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                      {idx + 1}
                    </div>
                    <span class="font-medium text-zinc-900">{item.hashtag}</span>
                  </div>
                  <span class="font-bold text-purple-600">{item.engagement} engagement</span>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
      
    {:else if view === 'config'}
      <!-- Configuration View -->
      <div class="max-w-4xl space-y-4 sm:space-y-6">
        <!-- Monitor Options -->
        <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200">
          <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">What to Monitor</h2>
          <div class="space-y-3">
            <label class="flex items-center gap-3">
              <input
                type="checkbox"
                bind:checked={config.monitor_mentions}
                class="w-4 h-4 text-blue-600 rounded"
              />
              <span class="text-sm text-zinc-700">Monitor mentions of your X account</span>
            </label>
            
            <label class="flex items-center gap-3">
              <input
                type="checkbox"
                bind:checked={config.monitor_keywords}
                class="w-4 h-4 text-blue-600 rounded"
              />
              <span class="text-sm text-zinc-700">Monitor keywords</span>
            </label>
          </div>
        </div>
        
        <!-- Keywords -->
        <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200">
          <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Target Keywords</h2>
          <p class="text-sm text-zinc-500 mb-3">Track tweets containing these keywords</p>
          <div class="space-y-3">
            <div class="flex flex-wrap gap-2">
              {#each config.keywords as kw, idx}
                <span class="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                  {kw}
                  <button 
                    on:click={() => {
                      config.keywords = config.keywords.filter((_, i) => i !== idx);
                    }}
                    class="text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </span>
              {/each}
            </div>
            
            <input
              type="text"
              placeholder="Add keyword (press Enter)"
              class="w-full px-3 sm:px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              on:keypress={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  config.keywords = [...config.keywords, e.target.value];
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
        
        <!-- Exclude Keywords -->
        <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200">
          <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Exclude Keywords</h2>
          <p class="text-sm text-zinc-500 mb-3">Filter out tweets containing these words</p>
          <div class="space-y-3">
            <div class="flex flex-wrap gap-2">
              {#each config.exclude_keywords as kw, idx}
                <span class="inline-flex items-center gap-2 px-3 py-1 bg-zinc-700 text-white rounded-lg text-sm">
                  {kw}
                  <button 
                    on:click={() => {
                      config.exclude_keywords = config.exclude_keywords.filter((_, i) => i !== idx);
                    }}
                    class="text-zinc-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              {/each}
            </div>
            
            <input
              type="text"
              placeholder="Add exclude keyword (press Enter)"
              class="w-full px-3 sm:px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              on:keypress={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  config.exclude_keywords = [...config.exclude_keywords, e.target.value];
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
        
        <!-- Filters -->
        <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200">
          <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Filters</h2>
          
          <div class="space-y-4">
            <div>
              <label class="text-sm text-zinc-700 mb-2 block">Minimum Followers</label>
              <input
                type="number"
                bind:value={config.min_followers}
                min="0"
                step="100"
                class="w-full px-3 sm:px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="text-sm text-zinc-700 mb-2 block">Minimum Relevance</label>
              <div class="flex items-center gap-4">
                <input
                  type="range"
                  bind:value={config.min_relevance}
                  min="50"
                  max="90"
                  step="5"
                  class="flex-1"
                />
                <span class="text-xl sm:text-2xl font-bold text-blue-600 min-w-[50px] sm:min-w-[60px]">
                  {config.min_relevance}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Save Button -->
        <div class="flex justify-end">
          <button
            on:click={saveConfig}
            class="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Configuration
          </button>
        </div>
      </div>
    {/if}
  {/if}
</div>

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
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .scrollbar-hide {
    -webkit-overflow-scrolling: touch;
  }
  
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: #f4f4f5;
    border-radius: 3px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #d4d4d8;
    border-radius: 3px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #a1a1aa;
  }
</style>