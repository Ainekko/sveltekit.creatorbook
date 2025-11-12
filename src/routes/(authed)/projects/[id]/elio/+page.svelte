<!-- (authed)/projects/[id]/elio/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { contentStore } from '$lib/components/nai/stores';
  import {WORKER_API_URL, API_BASE_URL} from '$lib/config';
  import { TrendingUp, Target, BarChart3, FileText, Settings, ArrowUpRight } from 'lucide-svelte';
  
  // Get project ID from URL
  $: projectId = $page.params.id;
  $: blogPosts = $contentStore.blogPosts || [];

  let authToken = localStorage.getItem('token');
  
  // Configuration from parent component or environment
  const MAIN_BACKEND_URL = API_BASE_URL;
  const WORKER_URL = WORKER_API_URL;
  
  // LocalStorage keys
  const getConfigKey = () => `elio_config_${projectId}`;
  const getOpportunitiesKey = () => `elio_opportunities_${projectId}`;
  const getRedditPostsKey = () => `elio_reddit_posts_${projectId}`;
  
  // State
  let loading = true;
  let projectData = null;
  let config = null;
  let opportunities = [];
  let redditPosts = [];
  let scanning = false;
  let view = 'content'; // 'content', 'opportunities', 'analytics', 'config'
  let selectedOpportunity = null;
  let selectedContent = null;
  let convertingContent = false;
  
  // Analytics mock data (you'll populate this from backend)
  let analytics = {
    totalKarma: 0,
    totalPosts: 0,
    avgKarma: 0,
    bestPerformers: [],
    topSubreddits: []
  };
  
  // Default config
  const defaultConfig = {
    subreddits: ['entrepreneur', 'startups'],
    keywords: [],
    exclude_keywords: [],
    min_relevance: 65.0,
    time_window_hours: 24,
    max_per_subreddit: 5
  };
  
  // Load content from store
  async function loadBlogPosts() {
    await contentStore.loadBlogPosts(projectId);
  }
  
  // Fetch project data from main backend
  async function fetchProjectData() {
    try {
      const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/`, {
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch project data');
      
      const data = await response.json();
      projectData = data.project;
      
      if (data.config) {
        config = data.config;
        saveConfigToLocalStorage(config);
      } else {
        loadConfigFromLocalStorage();
      }
      
      await fetchOpportunitiesFromBackend();
      await loadRedditPosts();
      
    } catch (error) {
      console.error('Error fetching project data:', error);
      loadConfigFromLocalStorage();
      loadOpportunitiesFromLocalStorage();
      loadRedditPostsFromLocalStorage();
    } finally {
      loading = false;
    }
  }

  // Fetch opportunities from backend
  async function fetchOpportunitiesFromBackend() {
    try {
      const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/opportunities/`, {
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch opportunities');
      
      const data = await response.json();
      
      if (data.opportunities && data.opportunities.length > 0) {
        opportunities = data.opportunities.map(opp => ({
          ...opp,
          id: opp.post_id || opp.id,
          scanned_at: opp.created_at || new Date().toISOString(),
        }));
        
        saveOpportunitiesToLocalStorage(opportunities);
        console.log(`Loaded ${opportunities.length} opportunities from backend`);
      } else {
        loadOpportunitiesFromLocalStorage();
      }
      
    } catch (error) {
      console.error('Error fetching opportunities from backend:', error);
      loadOpportunitiesFromLocalStorage();
    }
  }
  
  // Reddit Posts Management
  async function loadRedditPosts() {
    try {
      const stored = localStorage.getItem(getRedditPostsKey());
      if (stored) {
        redditPosts = JSON.parse(stored);
      }
      calculateAnalytics();
    } catch (error) {
      console.error('Failed to load reddit posts:', error);
      redditPosts = [];
    }
  }
  
  function loadRedditPostsFromLocalStorage() {
    try {
      const stored = localStorage.getItem(getRedditPostsKey());
      if (stored) {
        redditPosts = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load reddit posts from localStorage:', error);
      redditPosts = [];
    }
  }
  
  function saveRedditPostsToLocalStorage(posts) {
    try {
      localStorage.setItem(getRedditPostsKey(), JSON.stringify(posts));
    } catch (error) {
      console.error('Failed to save reddit posts to localStorage:', error);
    }
  }
  
  // Convert blog post to Reddit post
  async function convertToRedditPost(blogPost) {
    if (!blogPost) return;
    
    convertingContent = true;
    try {
      // TODO: Call your AI service to convert blog post to Reddit format
      // For now, create a placeholder
      const redditPost = {
        id: `reddit_${Date.now()}`,
        original_content_id: blogPost.id,
        title: blogPost.title,
        content: `Reddit version of: ${blogPost.content.substring(0, 200)}...\n\n[This would be AI-generated Reddit-optimized content]`,
        suggested_subreddits: config?.subreddits || ['entrepreneur'],
        created_at: new Date().toISOString(),
        posted: false,
        karma: 0,
        comments: 0,
        url: null
      };
      
      redditPosts = [redditPost, ...redditPosts];
      saveRedditPostsToLocalStorage(redditPosts);
      
      alert('Content converted to Reddit post format!');
      view = 'analytics'; // Switch to analytics view to see the new post
      
    } catch (error) {
      console.error('Error converting to Reddit post:', error);
      alert('Failed to convert content to Reddit post');
    } finally {
      convertingContent = false;
    }
  }
  
  // Calculate analytics
  function calculateAnalytics() {
    const postedPosts = redditPosts.filter(p => p.posted);
    const totalKarma = postedPosts.reduce((sum, p) => sum + (p.karma || 0), 0);
    
    analytics = {
      totalKarma,
      totalPosts: postedPosts.length,
      avgKarma: postedPosts.length > 0 ? Math.round(totalKarma / postedPosts.length) : 0,
      bestPerformers: [...postedPosts]
        .sort((a, b) => (b.karma || 0) - (a.karma || 0))
        .slice(0, 5),
      topSubreddits: getTopSubreddits(postedPosts)
    };
  }
  
  function getTopSubreddits(posts) {
    const subredditCounts = {};
    posts.forEach(post => {
      if (post.subreddit) {
        subredditCounts[post.subreddit] = (subredditCounts[post.subreddit] || 0) + (post.karma || 0);
      }
    });
    
    return Object.entries(subredditCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([subreddit, karma]) => ({ subreddit, karma }));
  }
  
  // LocalStorage helpers
  function saveConfigToLocalStorage(cfg) {
    try {
      localStorage.setItem(getConfigKey(), JSON.stringify(cfg));
    } catch (error) {
      console.error('Failed to save config to localStorage:', error);
    }
  }
  
  function loadConfigFromLocalStorage() {
    try {
      const stored = localStorage.getItem(getConfigKey());
      if (stored) {
        config = JSON.parse(stored);
      } else {
        config = { ...defaultConfig };
      }
    } catch (error) {
      console.error('Failed to load config from localStorage:', error);
      config = { ...defaultConfig };
    }
  }
  
  function saveOpportunitiesToLocalStorage(opps) {
    try {
      localStorage.setItem(getOpportunitiesKey(), JSON.stringify(opps));
    } catch (error) {
      console.error('Failed to save opportunities to localStorage:', error);
    }
  }
  
  function loadOpportunitiesFromLocalStorage() {
    try {
      const stored = localStorage.getItem(getOpportunitiesKey());
      if (stored) {
        opportunities = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load opportunities from localStorage:', error);
      opportunities = [];
    }
  }
  
  // Save opportunities to backend
  async function saveOpportunitiesToBackend(opps) {
    const backendOpportunities = opps.map(opp => ({
      post_id: opp.post_id,
      subreddit: opp.subreddit,
      title: opp.title,
      content: opp.content || '',
      author: opp.author,
      url: opp.url,
      score: opp.score,
      num_comments: opp.num_comments,
      created_utc: opp.created_utc,
      relevance_score: opp.relevance_score,
      opportunity_type: opp.opportunity_type,
      sentiment: opp.sentiment,
      key_points: opp.key_points || [],
      suggested_response: opp.suggested_response,
    }));
    
    const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/opportunities/save/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ opportunities: backendOpportunities })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend save failed: ${response.status} - ${errorText}`);
    }
    
    return await response.json();
  }
  
  // Scan for new opportunities via worker
  async function scanOpportunities() {
    if (!projectData || !config) return;
    
    scanning = true;
    
    try {
      const response = await fetch(`${WORKER_URL}/elio/reddit/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: projectData.business_name,
          business_description: projectData.description,
          subreddits: config.subreddits,
          keywords: config.keywords,
          exclude_keywords: config.exclude_keywords,
          min_relevance: config.min_relevance,
          time_window_hours: config.time_window_hours,
          max_per_subreddit: config.max_per_subreddit,
        })
      });
      
      if (!response.ok) throw new Error('Worker scan failed');
      
      const result = await response.json();
      
      if (result.opportunities && result.opportunities.length > 0) {
        const newOpportunities = result.opportunities.map(opp => ({
          ...opp,
          id: opp.post_id,
          scanned_at: new Date().toISOString(),
          is_responded: false,
          is_dismissed: false
        }));
        
        const existingIds = new Set(opportunities.map(o => o.id));
        const uniqueNew = newOpportunities.filter(o => !existingIds.has(o.id));
        
        if (uniqueNew.length > 0) {
          try {
            await saveOpportunitiesToBackend(uniqueNew);
            console.log('Opportunities saved to backend successfully');
            opportunities = [...uniqueNew, ...opportunities];
            alert(`Found ${uniqueNew.length} new opportunities and saved to backend!`);
          } catch (backendError) {
            console.error('Failed to save to backend, using localStorage fallback:', backendError);
            opportunities = [...uniqueNew, ...opportunities];
            saveOpportunitiesToLocalStorage(opportunities);
            alert(`Found ${uniqueNew.length} new opportunities! (Saved locally - backend unavailable)`);
          }
        } else {
          alert('No new opportunities found (all duplicates)');
        }
      } else {
        alert('No new opportunities found');
      }
      
    } catch (error) {
      console.error('Error scanning:', error);
      alert('Failed to scan for opportunities: ' + error.message);
    } finally {
      scanning = false;
    }
  }
  
  // Save configuration
  async function saveConfig() {
    try {
      saveConfigToLocalStorage(config);
      
      try {
        const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/config/`, {
          method: 'POST',
          headers: { 
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json' 
          },
          credentials: 'include',
          body: JSON.stringify(config)
        });
        
        if (response.ok) {
          alert('Configuration saved to server and locally!');
        } else {
          alert('Configuration saved locally!');
        }
      } catch (backendError) {
        console.error('Backend save failed, but localStorage succeeded:', backendError);
        alert('Configuration saved locally!');
      }
      
    } catch (error) {
      console.error('Error saving config:', error);
      alert('Failed to save configuration');
    }
  }
  
  // Copy response to clipboard
  async function copyResponse(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert('Response copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }
  
  // Mark opportunity as responded/dismissed
  function updateOpportunity(opportunityId, updates) {
    opportunities = opportunities.map(opp => 
      opp.id === opportunityId ? { ...opp, ...updates } : opp
    );
    saveOpportunitiesToLocalStorage(opportunities);
    
    try {
      fetch(
        `${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/opportunities/${opportunityId}/`,
        {
          method: 'PATCH',
          headers: { 
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json' 
          },
          credentials: 'include',
          body: JSON.stringify(updates)
        }
      ).catch(err => console.log('Backend update failed (non-critical):', err));
    } catch (error) {
      console.log('Backend update skipped:', error);
    }
  }
  
  // Clear dismissed opportunities
  function clearDismissed() {
    if (confirm('Remove all dismissed opportunities?')) {
      opportunities = opportunities.filter(o => !o.is_dismissed);
      saveOpportunitiesToLocalStorage(opportunities);
    }
  }
  
  // Filter opportunities
  $: filteredOpportunities = opportunities.filter(o => !o.is_dismissed);
  
  onMount(async () => {
    await loadBlogPosts();
    await fetchProjectData();
  });
</script>

<div class="max-w-7xl mx-auto p-4 sm:p-6">
  {#if loading}
    <div class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto"></div>
      <p class="text-zinc-500 mt-4">Loading Elio...</p>
    </div>
  {:else}
    <!-- Header -->
    <div class="mb-6 sm:mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-zinc-900">Elio Reddit Assistant</h1>
          <p class="text-sm sm:text-base text-zinc-600 mt-1">
            {#if projectData}
              Managing Reddit presence for {projectData.business_name || 'your project'}
            {/if}
          </p>
        </div>
        
        <div class="flex gap-2 sm:gap-3">
          {#if view === 'opportunities' && opportunities.some(o => o.is_dismissed)}
            <button 
              on:click={clearDismissed}
              class="px-3 sm:px-4 py-2 bg-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-300 transition-colors font-medium text-xs sm:text-sm"
            >
              Clear Dismissed
            </button>
          {/if}
          <button 
            on:click={scanOpportunities}
            disabled={scanning}
            class="px-3 sm:px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium text-xs sm:text-sm disabled:opacity-50"
          >
            {#if scanning}
              Scanning...
            {:else}
              Scan Opportunities
            {/if}
          </button>
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
      <!-- Content View - Convert blog posts to Reddit -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Blog Posts List -->
        <div class="lg:col-span-5 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {#if blogPosts.length === 0}
            <div class="text-center py-12 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
              <FileText class="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <p class="text-zinc-700 mb-2 font-medium">No blog posts available</p>
              <p class="text-sm text-zinc-500">Create blog posts first to convert them to Reddit content</p>
            </div>
          {:else}
            {#each blogPosts as post}
              <button
                on:click={() => selectedContent = post}
                class="w-full text-left bg-white rounded-xl border border-zinc-200 p-5 hover:border-orange-300 hover:shadow-md transition-all {selectedContent?.id === post.id ? 'ring-2 ring-orange-500 border-orange-500' : ''}"
              >
                <div class="flex items-start justify-between mb-3">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800">
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
        
        <!-- Selected Content Preview -->
        <div class="lg:col-span-7 h-[calc(100vh-250px)]">
          {#if selectedContent}
            <div class="bg-white rounded-xl border border-zinc-200 overflow-hidden h-full flex flex-col">
              <div class="p-6 border-b border-zinc-200 bg-gradient-to-r from-orange-50 to-amber-50 flex-shrink-0">
                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium mb-3 bg-white border border-orange-200 text-orange-800">
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
                  on:click={() => convertToRedditPost(selectedContent)}
                  disabled={convertingContent}
                  class="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {convertingContent ? 'Converting to Reddit Post...' : '→ Convert to Reddit Post'}
                </button>
              </div>
            </div>
          {:else}
            <div class="bg-gradient-to-br from-zinc-50 to-orange-50 rounded-xl border-2 border-dashed border-zinc-300 h-full flex items-center justify-center">
              <div class="text-center py-12">
                <FileText class="w-12 h-12 text-orange-400 mx-auto mb-3" />
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
        <!-- Opportunities List -->
        <div class="lg:col-span-5 space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {#if filteredOpportunities.length === 0}
            <div class="text-center py-12 bg-zinc-50 rounded-xl">
              <p class="text-zinc-500 mb-2">No opportunities yet</p>
              <p class="text-sm text-zinc-400">Click "Scan Opportunities" to find discussions</p>
            </div>
          {:else}
            {#each filteredOpportunities as opp}
              <button
                on:click={() => selectedOpportunity = opp}
                class="w-full bg-white rounded-xl p-4 sm:p-5 border border-zinc-200 hover:border-zinc-300 transition-all text-left {selectedOpportunity?.id === opp.id ? 'ring-2 ring-zinc-900 border-zinc-900' : ''} {opp.is_responded ? 'opacity-60' : ''}"
              >
                <div class="flex items-start justify-between mb-3 gap-2">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs px-2 py-1 bg-zinc-200 text-zinc-800 rounded font-medium">
                      r/{opp.subreddit}
                    </span>
                    <span class="text-xs px-2 py-1 rounded bg-zinc-100 text-zinc-700">
                      {opp.sentiment}
                    </span>
                    {#if opp.is_responded}
                      <span class="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-100">
                        ✓ Responded
                      </span>
                    {/if}
                  </div>
                  <div class="font-semibold text-zinc-900 text-sm flex-shrink-0">
                    {Math.round(opp.relevance_score)}%
                  </div>
                </div>
                
                <h3 class="text-zinc-900 font-semibold text-sm mb-2 line-clamp-2">
                  {opp.title}
                </h3>
                
                {#if opp.content}
                  <p class="text-zinc-600 text-xs mb-3 line-clamp-2">{opp.content}</p>
                {/if}
                
                <div class="flex items-center justify-between text-xs text-zinc-500">
                  <div class="flex items-center gap-3">
                    <span>↑ {opp.score}</span>
                    <span>💬 {opp.num_comments}</span>
                  </div>
                  <span class="text-zinc-900 font-medium">{opp.opportunity_type}</span>
                </div>
              </button>
            {/each}
          {/if}
        </div>
        
        <!-- Selected Opportunity Detail -->
        <div class="lg:col-span-7 h-[calc(100vh-250px)]">
          {#if selectedOpportunity}
            <div class="bg-white rounded-xl border border-zinc-200 overflow-hidden h-full flex flex-col">
              <div class="p-4 sm:p-6 border-b border-zinc-200 flex-shrink-0">
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div class="flex-1">
                    <h2 class="text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                      {selectedOpportunity.title}
                    </h2>
                    <a 
                      href={selectedOpportunity.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-sm text-zinc-700 hover:text-zinc-900 inline-flex items-center gap-1"
                    >
                      View on Reddit <ArrowUpRight class="w-3 h-3" />
                    </a>
                  </div>
                  
                  <div class="flex gap-2">
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
                
                {#if selectedOpportunity.match_reasoning}
                  <div class="mt-4 p-3 bg-zinc-50 rounded-lg">
                    <p class="text-sm text-zinc-700">
                      <span class="font-semibold text-zinc-900">Why this matches:</span>
                      {selectedOpportunity.match_reasoning}
                    </p>
                  </div>
                {/if}
                
                {#if selectedOpportunity.key_points && selectedOpportunity.key_points.length > 0}
                  <div class="mt-4">
                    <h3 class="text-sm font-semibold text-zinc-700 mb-2">Key Points:</h3>
                    <ul class="space-y-1">
                      {#each selectedOpportunity.key_points as point}
                        <li class="text-sm text-zinc-600 flex items-start">
                          <span class="text-zinc-900 mr-2 flex-shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
              </div>
              
              <div class="p-4 sm:p-6 flex-1 overflow-y-auto">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h3 class="text-sm font-semibold text-zinc-700">Suggested Response</h3>
                  <button
                    on:click={() => copyResponse(selectedOpportunity.suggested_response)}
                    class="text-xs px-3 py-1 bg-zinc-900 hover:bg-zinc-700 text-white rounded transition-colors self-start sm:self-auto"
                  >
                    Copy Response
                  </button>
                </div>
                
                <div class="bg-zinc-50 rounded-lg p-3 sm:p-4">
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
          <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <TrendingUp class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm text-orange-800 font-medium">Total Karma</p>
                <p class="text-2xl font-bold text-orange-900">{analytics.totalKarma}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <FileText class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm text-blue-800 font-medium">Total Posts</p>
                <p class="text-2xl font-bold text-blue-900">{analytics.totalPosts}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <BarChart3 class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm text-purple-800 font-medium">Avg Karma</p>
                <p class="text-2xl font-bold text-purple-900">{analytics.avgKarma}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Reddit Posts List -->
        <div class="bg-white rounded-xl border border-zinc-200 p-6">
          <h3 class="text-lg font-semibold text-zinc-900 mb-4">Reddit Posts</h3>
          
          {#if redditPosts.length === 0}
            <div class="text-center py-8">
              <FileText class="w-12 h-12 text-orange-400 mx-auto mb-3" />
              <p class="text-zinc-600 font-medium">No Reddit posts yet</p>
              <p class="text-sm text-zinc-500 mt-1">Convert blog posts to Reddit format in the Content tab</p>
            </div>
          {:else}
            <div class="space-y-3">
              {#each redditPosts as post}
                <div class="border border-zinc-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-sm transition-all bg-gradient-to-r from-white to-orange-50/30">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex-1">
                      <h4 class="font-semibold text-zinc-900 mb-1">{post.title}</h4>
                      <p class="text-sm text-zinc-600 line-clamp-2">{post.content}</p>
                    </div>
                    <div class="text-right ml-4">
                      {#if post.posted}
                        <div class="text-lg font-bold text-orange-600">↑ {post.karma}</div>
                        <div class="text-xs text-zinc-500">💬 {post.comments}</div>
                      {:else}
                        <span class="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded font-medium">Draft</span>
                      {/if}
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2 flex-wrap">
                    {#each post.suggested_subreddits as subreddit}
                      <span class="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-medium">
                        r/{subreddit}
                      </span>
                    {/each}
                  </div>
                  
                  {#if post.url}
                    <a 
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium mt-3"
                    >
                      View on Reddit <ArrowUpRight class="w-3 h-3" />
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
              <TrendingUp class="w-5 h-5 text-orange-600" />
              <h3 class="text-lg font-semibold text-zinc-900">Best Performing Posts</h3>
            </div>
            <div class="space-y-3">
              {#each analytics.bestPerformers as post, idx}
                <div class="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100">
                  <div class="flex items-center gap-3 flex-1">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-sm font-bold">
                      {idx + 1}
                    </div>
                    <div class="flex-1">
                      <h4 class="font-medium text-zinc-900 text-sm mb-1">{post.title}</h4>
                      <span class="text-xs text-orange-700 font-medium">r/{post.subreddit}</span>
                    </div>
                  </div>
                  <div class="text-right ml-4">
                    <div class="font-bold text-orange-600">↑ {post.karma}</div>
                    <div class="text-xs text-zinc-500">💬 {post.comments}</div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
        
        <!-- Top Subreddits -->
        {#if analytics.topSubreddits.length > 0}
          <div class="bg-white rounded-xl border border-zinc-200 p-6">
            <div class="flex items-center gap-2 mb-4">
              <Target class="w-5 h-5 text-blue-600" />
              <h3 class="text-lg font-semibold text-zinc-900">Top Performing Subreddits</h3>
            </div>
            <div class="space-y-3">
              {#each analytics.topSubreddits as item, idx}
                <div class="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                      {idx + 1}
                    </div>
                    <span class="font-medium text-zinc-900">r/{item.subreddit}</span>
                  </div>
                  <span class="font-bold text-blue-600">↑ {item.karma}</span>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
      
    {:else if view === 'config'}
      <!-- Configuration View -->
      {#if config}
        <div class="max-w-4xl space-y-4 sm:space-y-6">
          <!-- Subreddits -->
          <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200">
            <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Target Subreddits</h2>
            <div class="space-y-3">
              <div class="flex flex-wrap gap-2">
                {#each config.subreddits as sub, idx}
                  <span class="inline-flex items-center gap-2 px-3 py-1 bg-zinc-200 text-zinc-800 rounded-lg text-sm">
                    r/{sub}
                    <button 
                      on:click={() => {
                        config.subreddits = config.subreddits.filter((_, i) => i !== idx);
                      }}
                      class="text-zinc-600 hover:text-zinc-900"
                    >
                      ×
                    </button>
                  </span>
                {/each}
              </div>
              
              <div class="flex gap-2">
                <input
                  type="text"
                  placeholder="Add subreddit (e.g., entrepreneur)"
                  class="flex-1 px-3 sm:px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
                  on:keypress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      config.subreddits = [...config.subreddits, e.target.value.replace('r/', '')];
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <!-- Keywords -->
          <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200">
            <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Target Keywords</h2>
            <p class="text-sm text-zinc-500 mb-3">Optional - Leave empty to let AI find relevant posts automatically</p>
            <div class="space-y-3">
              <div class="flex flex-wrap gap-2">
                {#each config.keywords as kw, idx}
                  <span class="inline-flex items-center gap-2 px-3 py-1 bg-zinc-200 text-zinc-800 rounded-lg text-sm">
                    {kw}
                    <button 
                      on:click={() => {
                        config.keywords = config.keywords.filter((_, i) => i !== idx);
                      }}
                      class="text-zinc-600 hover:text-zinc-900"
                    >
                      ×
                    </button>
                  </span>
                {/each}
              </div>
              
              <div class="flex gap-2">
                <input
                  type="text"
                  placeholder="Add keyword"
                  class="flex-1 px-3 sm:px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
                  on:keypress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      config.keywords = [...config.keywords, e.target.value];
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <!-- Exclude Keywords -->
          <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200">
            <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Exclude Keywords</h2>
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
              
              <div class="flex gap-2">
                <input
                  type="text"
                  placeholder="Add exclude keyword"
                  class="flex-1 px-3 sm:px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
                  on:keypress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      config.exclude_keywords = [...config.exclude_keywords, e.target.value];
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <!-- Relevance Threshold -->
          <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200">
            <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Minimum Relevance</h2>
            <div class="flex items-center gap-4">
              <input
                type="range"
                bind:value={config.min_relevance}
                min="50"
                max="90"
                step="5"
                class="flex-1"
              />
              <span class="text-xl sm:text-2xl font-bold text-zinc-900 min-w-[50px] sm:min-w-[60px]">
                {config.min_relevance}%
              </span>
            </div>
          </div>
          
          <!-- Save Button -->
          <div class="flex justify-end">
            <button
              on:click={saveConfig}
              class="w-full sm:w-auto px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium"
            >
              Save Configuration
            </button>
          </div>
        </div>
      {/if}
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
  
  /* Custom scrollbar styling for lists */
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