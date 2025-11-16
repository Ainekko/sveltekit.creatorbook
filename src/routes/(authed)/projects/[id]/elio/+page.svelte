<!-- (authed)/projects/[id]/elio/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { contentStore } from '$lib/components/nai/stores';
  import {WORKER_API_URL, API_BASE_URL} from '$lib/config';
  import { TrendingUp, Target, BarChart3, FileText, Settings, ArrowUpRight, User, Sparkles, Copy, Check, LogIn, LogOut } from 'lucide-svelte';
  
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
  let pendingPosts = [];
  let approvedPosts = [];
  let scanning = false;
  let view = 'content'; // 'content', 'opportunities', 'posts', 'profile', 'config'
  let selectedOpportunity = null;
  let hoveredPost = null;
  let generatingPosts = new Set();
  let showSuccessModal = false;
  let successMessage = '';
  let copiedIndex = null;
  let currentCopiedTimer;
  let postsScroll;
  let bestScroll;
  let topScroll;
  let opportunitiesScroll;
  
  // Reddit Auth State
  let redditConnected = false;
  let redditUsername = null;
  let redditConnecting = false;
  let checkingRedditAuth = true;
  
  // Analytics mock data (you'll populate this from backend)
  let analytics = {
    totalKarma: 0,
    totalPosts: 0,
    avgKarma: 0,
    bestPerformers: [],
    topSubreddits: []
  };
  
  // Profile mock data
  let profile = {};

  // Default config
  const defaultConfig = {
    subreddits: ['entrepreneur', 'startups'],
    keywords: [],
    exclude_keywords: [],
    min_relevance: 65.0,
    time_window_hours: 24,
    max_per_subreddit: 5
  };
  
  // Check Reddit connection status
  async function checkRedditConnection() {
    try {
      const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/account/`, {
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        redditConnected = data.connected;
        redditUsername = data.username || null;
      }
    } catch (error) {
      console.error('Failed to check Reddit connection:', error);
    } finally {
      checkingRedditAuth = false;
    }
  }
  
 // Initiate Reddit OAuth flow
async function connectReddit() {
  redditConnecting = true;
  console.log('Starting Reddit connection...');
  console.log('Auth token:', authToken ? 'Present' : 'Missing');
  console.log('Project ID:', projectId);
  console.log('Backend URL:', MAIN_BACKEND_URL);
  
  try {
    const url = `${MAIN_BACKEND_URL}/elio/api/connect/?project_id=${projectId}`;
    console.log('Fetching:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Important for sessions
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Response data:', data);
    
    if (data.auth_url) {
      console.log('Redirecting to:', data.auth_url);
      // Open Reddit OAuth in same window instead of popup
      window.location.href = data.auth_url;
    } else {
      throw new Error('No auth_url in response');
    }
  } catch (error) {
    console.error('Error connecting to Reddit:', error);
    console.error('Error stack:', error.stack);
    alert(`Failed to connect to Reddit: ${error.message}`);
    redditConnecting = false;
  }
}
  
  // Disconnect Reddit account
  async function disconnectReddit() {
    if (!confirm('Are you sure you want to disconnect your Reddit account?')) return;
    
    try {
      const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/account/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        redditConnected = false;
        redditUsername = null;
        alert('Reddit account disconnected successfully');
      } else {
        throw new Error('Failed to disconnect Reddit account');
      }
    } catch (error) {
      console.error('Error disconnecting Reddit:', error);
      alert('Failed to disconnect Reddit account');
    }
  }
  
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
    if (!browser) return;
    try {
      const stored = localStorage.getItem(getRedditPostsKey());
      if (stored) {
        const parsed = JSON.parse(stored);
        pendingPosts = parsed.filter(p => !p.approved);
        approvedPosts = parsed.filter(p => p.approved);
      }
      calculateAnalytics();
    } catch (error) {
      console.error('Failed to load reddit posts:', error);
      pendingPosts = [];
      approvedPosts = [];
    }
  }
  
  function loadRedditPostsFromLocalStorage() {
    try {
      const stored = localStorage.getItem(getRedditPostsKey());
      if (stored) {
        const parsed = JSON.parse(stored);
        pendingPosts = parsed.filter(p => !p.approved);
        approvedPosts = parsed.filter(p => p.approved);
      }
    } catch (error) {
      console.error('Failed to load reddit posts from localStorage:', error);
      pendingPosts = [];
      approvedPosts = [];
    }
  }
  
  function saveRedditPostsToLocalStorage() {
    try {
      const allPosts = [...pendingPosts, ...approvedPosts];
      localStorage.setItem(getRedditPostsKey(), JSON.stringify(allPosts));
    } catch (error) {
      console.error('Failed to save reddit posts to localStorage:', error);
    }
  }
  
  // Convert blog post to Reddit post
  async function convertToRedditPost(blogPost) {
    generatingPosts.add(blogPost.id);
    generatingPosts = generatingPosts;

    try {
      // TODO: Call AI service to generate Reddit posts
      // Placeholder: generate 3 variations
      const variations = Array.from({length: 3}, (_, i) => ({
        id: `post_${Date.now()}_${i}`,
        original_content_id: blogPost.id,
        title: `${blogPost.title} - Var ${i+1}`,
        content: `Reddit version ${i+1} of: ${blogPost.content.substring(0, 200)}...\n\n[AI-generated content]`,
        suggested_subreddits: config?.subreddits || ['entrepreneur'],
        thread_type: ['Educational', 'Question', 'Story'][i],
        created_at: new Date().toISOString(),
        approved: false
      }));

      savePosts(blogPost.id, blogPost.title, variations);
      
      successMessage = `Generated 3 Reddit post variations for "${blogPost.title}"`;
      showSuccessModal = true;

    } catch (error) {
      console.error('Error converting to Reddit post:', error);
      alert('Failed to convert content to Reddit post');
    } finally {
      generatingPosts.delete(blogPost.id);
      generatingPosts = generatingPosts;
    }
  }

  function savePosts(contentId, contentTitle, posts) {
    try {
      const newEntry = {
        id: `entry_${Date.now()}`,
        contentId,
        contentTitle,
        posts: posts.map(p => ({ ...p, approved: false })),
        createdAt: new Date().toISOString()
      };

      pendingPosts = [newEntry, ...pendingPosts];
      saveRedditPostsToLocalStorage();

    } catch (error) {
      console.error('Failed to save posts:', error);
    }
  }

  function approvePost(entry, postIndex) {
    const entryIndex = pendingPosts.findIndex(e => e.id === entry.id);
    if (entryIndex === -1) return;
    const post = pendingPosts[entryIndex].posts.splice(postIndex, 1)[0];
    if (!post) return;
    post.approved = true;

    const approvedEntry = {
      id: `approved_${Date.now()}`,
      contentId: entry.contentId,
      contentTitle: entry.contentTitle,
      post,
      createdAt: new Date().toISOString()
    };

    approvedPosts = [approvedEntry, ...approvedPosts];
    pendingPosts = pendingPosts.filter(e => e.posts.length > 0);
    saveRedditPostsToLocalStorage();
  }

  function deleteApprovedPost(postId) {
    if (!confirm('Delete this post?')) return;
    approvedPosts = approvedPosts.filter(p => p.id !== postId);
    saveRedditPostsToLocalStorage();
  }

  async function copyPost(post) {
    const postText = `${post.title}\n\n${post.content}\n\nSubreddits: ${post.suggested_subreddits.join(', ')}`;

    try {
      await navigator.clipboard.writeText(postText);
      if (currentCopiedTimer) clearTimeout(currentCopiedTimer);
      copiedIndex = post;
      currentCopiedTimer = setTimeout(() => {
        copiedIndex = null;
        currentCopiedTimer = null;
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }
  
  // Calculate analytics
  function calculateAnalytics() {
    const postedPosts = approvedPosts.filter(p => p.post.posted).map(p => p.post);
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

    // Update profile karma
    profile.postKarma = totalKarma;
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
    
    if (!redditConnected) {
      alert('Please connect your Reddit account first to scan for opportunities');
      return;
    }
    
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
  $: filteredOpportunities = opportunities.filter(o => !o.is_dismissed).sort((a, b) => new Date(b.scanned_at) - new Date(a.scanned_at));

  onMount(async () => {
   // Check for Reddit OAuth success
  const urlParams = new URLSearchParams(window.location.search);
  const redditSuccess = urlParams.get('reddit_success');
  const redditUsername = urlParams.get('username');
  
  if (redditSuccess === 'true' && redditUsername) {
    successMessage = `Successfully connected to Reddit as u/${redditUsername}`;
    showSuccessModal = true;
    // Clean up URL
    window.history.replaceState({}, '', window.location.pathname);
  }
  
  await checkRedditConnection();
  await loadBlogPosts();
  await fetchProjectData();

    // Mock profile data
    profile = {
      username: redditUsername || 'u/' + (projectData?.business_name || 'yourbusiness').toLowerCase().replace(/\s+/g, ''),
      joined: 'Joined Jan 2023',
      description: 'Your Reddit bio here. Edit in settings.',
      avatar: 'https://www.redditstatic.com/avatars/defaults/avatar_default_7.png',
      postKarma: 0,
      commentKarma: 0
    };
  });

  function closeSuccessModal() {
    showSuccessModal = false;
  }

  function goToPostsView() {
    showSuccessModal = false;
    view = 'posts';
  }

  function scrollPostsLeft() {
    postsScroll?.scrollBy({ left: -400, behavior: 'smooth' });
  }
  function scrollPostsRight() {
    postsScroll?.scrollBy({ left: 400, behavior: 'smooth' });
  }
  function scrollBestLeft() {
    bestScroll?.scrollBy({ left: -300, behavior: 'smooth' });
  }
  function scrollBestRight() {
    bestScroll?.scrollBy({ left: 300, behavior: 'smooth' });
  }
  function scrollTopLeft() {
    topScroll?.scrollBy({ left: -300, behavior: 'smooth' });
  }
  function scrollTopRight() {
    topScroll?.scrollBy({ left: 300, behavior: 'smooth' });
  }
  function scrollOpportunitiesLeft() {
    opportunitiesScroll?.scrollBy({ left: -400, behavior: 'smooth' });
  }
  function scrollOpportunitiesRight() {
    opportunitiesScroll?.scrollBy({ left: 400, behavior: 'smooth' });
  }
</script>

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
          {successMessage.includes('connected') ? 'Connected! 🎉' : 'Posts Generated! 🎉'}
        </h2>
      
        <p class="text-base text-zinc-600">
          {successMessage}
        </p>
      
        <div class="flex flex-col gap-3">
          {#if !successMessage.includes('connected')}
            <button
              on:click={goToPostsView}
              class="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              View & Approve Posts
            </button>
          {/if}
        
          <button
            on:click={closeSuccessModal}
            class="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            {successMessage.includes('connected') ? 'Continue' : 'Generate More'}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<div class="max-w-screen-2xl mx-auto p-4 sm:p-6">
  {#if loading || checkingRedditAuth}
    <div class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto"></div>
      <p class="text-zinc-500 mt-4">Loading Elio...</p>
    </div>
  {:else}
    <!-- Header -->
    <div class="mb-6 sm:mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-zinc-900 flex items-center gap-2">
            <img src="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png" alt="Reddit" class="w-8 h-8" />
            Elio Reddit Assistant
          </h1>
          <p class="text-sm sm:text-base text-zinc-600 mt-1">
            {#if projectData}
              Managing Reddit presence for {projectData.business_name || 'your project'}
            {/if}
          </p>
        </div>
        
        <div class="flex gap-2 sm:gap-3 flex-wrap">
          <!-- Reddit Auth Button -->
          {#if redditConnected}
            <div class="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-green-700">u/{redditUsername}</span>
              <button
                on:click={disconnectReddit}
                class="ml-2 p-1 hover:bg-green-100 rounded transition-colors"
                title="Disconnect"
              >
                <LogOut class="w-4 h-4 text-green-600" />
              </button>
            </div>
          {:else}
            <button
              on:click={connectReddit}
              disabled={redditConnecting}
              class="px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-medium text-sm disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
              <LogIn class="w-4 h-4" />
              {redditConnecting ? 'Connecting...' : 'Connect Reddit'}
            </button>
          {/if}
          
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
            disabled={scanning || !redditConnected}
            class="px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg transition-colors font-medium text-xs sm:text-sm disabled:opacity-50 shadow-md hover:shadow-lg"
            title={!redditConnected ? 'Connect Reddit account first' : ''}
          >
            {#if scanning}
              Scanning...
            {:else}
              Scan Opportunities
            {/if}
          </button>
        </div>
      </div>
      
      <!-- Reddit Connection Alert -->
      {#if !redditConnected}
        <div class="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
          <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <LogIn class="w-5 h-5 text-orange-600" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-orange-900 mb-1">Connect Your Reddit Account</h3>
            <p class="text-sm text-orange-700">Connect your Reddit account to scan for opportunities and interact with communities directly.</p>
          </div>
          <button
            on:click={connectReddit}
            disabled={redditConnecting}
            class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50 flex-shrink-0"
          >
            {redditConnecting ? 'Connecting...' : 'Connect Now'}
          </button>
        </div>
      {/if}
      
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
            on:click={() => view = 'posts'}
            class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'posts' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
          >
            <Sparkles class="w-4 h-4" />
            Posts ({pendingPosts.length + approvedPosts.length})
          </button>
          <button
            on:click={() => { view = 'profile'; calculateAnalytics(); }}
            class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'profile' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
          >
            <User class="w-4 h-4" />
            Profile
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
      <!-- Content Studio View -->
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
                    on:click={() => convertToRedditPost(post)}
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
      
    {:else if view === 'opportunities'}
      <!-- Opportunities View -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <!-- Opportunities List -->
        <div class="lg:col-span-5 space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {#if filteredOpportunities.length === 0}
            <div class="text-center py-12 bg-zinc-50 rounded-xl shadow-md">
              <p class="text-zinc-500 mb-2">No opportunities yet</p>
              <p class="text-sm text-zinc-400">Click "Scan Opportunities" to find discussions</p>
            </div>
          {:else}
            {#each filteredOpportunities as opp}
              <button
                on:click={() => selectedOpportunity = opp}
                class="w-full bg-white rounded-xl p-4 sm:p-5 border border-zinc-200 hover:border-zinc-300 transition-all duration-300 text-left shadow-md hover:shadow-lg {selectedOpportunity?.id === opp.id ? 'ring-2 ring-zinc-900 border-zinc-900' : ''} {opp.is_responded ? 'opacity-60' : ''}"
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
            <div class="bg-white rounded-xl border border-zinc-200 overflow-hidden h-full flex flex-col shadow-xl">
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
            <div class="bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-300 h-full flex items-center justify-center shadow-md">
              <div class="text-center py-12">
                <p class="text-zinc-500">Select an opportunity to view details</p>
              </div>
            </div>
          {/if}
        </div>
      </div>

    {:else if view === 'posts'}
      <!-- Posts View - Approval & Display -->
      <div class="space-y-6">
        <!-- Pending Approval Section -->
        {#if pendingPosts.length > 0}
          <div class="bg-zinc-800 rounded-xl border border-zinc-700 p-6 shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-white flex items-center gap-2">
                <span class="w-2 h-2 bg-zinc-500 rounded-full animate-pulse"></span>
                Review & Approve
              </h2>
              <div class="flex gap-2">
                <button
                  on:click={scrollPostsLeft}
                  class="bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-md text-lg font-bold transition-colors"
                >
                  &lt;
                </button>
                <button
                  on:click={scrollPostsRight}
                  class="bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-md text-lg font-bold transition-colors"
                >
                  &gt;
                </button>
              </div>
            </div>
          
            <div class="overflow-x-auto flex flex-row gap-8 pb-4 snap-x snap-mandatory scrollbar-hide" bind:this={postsScroll}>
              {#each pendingPosts as entry}
                <div class="space-y-4 min-w-[80vw] sm:min-w-[50vw] lg:min-w-[30vw] snap-center">
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-zinc-100">From: {entry.contentTitle}</h3>
                    <span class="text-xs text-zinc-300">{new Date(entry.createdAt).toLocaleDateString()}</span>
                  </div>
                
                  <div class="flex flex-row overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
                    {#each entry.posts as post, idx}
                      <div class="bg-zinc-900 rounded-xl border-2 border-zinc-700 p-5 hover:border-zinc-400 transition-all min-w-[300px] snap-center shadow-md">
                        <div class="flex items-start justify-between mb-4">
                          <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-700 text-zinc-300">
                            {post.thread_type ?? 'Unknown'}
                          </span>
                          
                          <button
                            on:click={() => approvePost(entry, idx)}
                            class="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all hover:scale-110"
                            title="Approve this post"
                          >
                            <Check class="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div class="space-y-3 mb-4">
                          <h4 class="font-bold text-zinc-100">{post.title}</h4>
                          <p class="text-xs text-zinc-200 leading-relaxed">{post.content}</p>
                        </div>
                        
                        <div class="flex flex-wrap gap-1.5 mb-2">
                          {#each post.suggested_subreddits as sub}
                            <span class="text-xs px-2 py-0.5 bg-zinc-700 text-zinc-300 rounded">
                              r/{sub}
                            </span>
                          {/each}
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      
        <!-- Approved Posts -->
        <div>
          <h2 class="text-xl font-bold text-zinc-900 mb-4">Ready to Post</h2>
        
          {#if approvedPosts.length === 0}
            <div class="text-center py-16 bg-gradient-to-br from-zinc-50 to-zinc-50 rounded-2xl border-2 border-dashed border-zinc-300 shadow-md">
              <Sparkles class="w-16 h-16 text-zinc-400 mx-auto mb-4" />
              <p class="text-zinc-600 font-medium text-lg">No approved posts yet</p>
              <p class="text-sm text-zinc-500 mt-2">Generate posts from Content and approve them here</p>
            </div>
          {:else}
            <div class="flex flex-row overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide" bind:this={postsScroll}>
              {#each approvedPosts as entry}
                <div class="bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden hover:shadow-lg transition-all min-w-[400px] snap-center shadow-md">
                  <!-- Header -->
                  <div class="p-4 border-b border-zinc-700 bg-zinc-800">
                    <div class="flex items-start justify-between">
                      <div class="flex items-start gap-3">
                        <div class="w-12 h-12 rounded-full bg-zinc-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {projectData?.business_name?.charAt(0) || 'R'}
                        </div>
                        <div>
                          <div class="font-bold text-white">{projectData?.business_name || 'Your Business'}</div>
                          <div class="text-sm text-zinc-400">@{projectData?.business_name?.toLowerCase().replace(/\s+/g, '') || 'yourbusiness'}</div>
                          <div class="text-xs text-zinc-500 mt-1">From: {entry.contentTitle}</div>
                        </div>
                      </div>
                      
                      <button
                        on:click={() => copyPost(entry.post)}
                        class="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg text-sm font-medium transition-all"
                      >
                        {#if copiedIndex === entry.post}
                          <Check class="w-5 h-5" />
                          Copied!
                        {:else}
                          <Copy class="w-5 h-5" />
                          
                        {/if}
                      </button>
                    </div>
                  </div>
                  
                  <!-- Post Content -->
                  <div class="p-4">
                    <h4 class="font-bold text-white mb-2">{entry.post.title}</h4>
                    <p class="text-white whitespace-pre-wrap leading-relaxed mb-4" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6;">{entry.post.content}</p>
                    
                    <!-- Subreddits -->
                    <div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-600">
                      {#each entry.post.suggested_subreddits as sub}
                        <span class="px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full text-sm font-medium">
                          r/{sub}
                        </span>
                      {/each}
                    </div>
                    
                    <!-- Post Type Badge -->
                    <div class="mt-4 flex items-center justify-between">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-700 text-zinc-300">
                        {entry.post.thread_type ?? 'Unknown'}
                      </span>
                      
                      <button
                        on:click={() => deleteApprovedPost(entry.id)}
                        class="text-xs text-zinc-400 hover:text-red-500 transition-colors"
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
    
    {:else if view === 'profile'}
      <!-- Profile View -->
      <div class="space-y-6">
        <!-- Profile Card -->
        <div class="bg-white rounded-xl border border-zinc-200 p-6 shadow-xl">
          <h3 class="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
            <User class="w-5 h-5 text-orange-600" />
            Reddit Profile
          </h3>
          <div class="flex items-start gap-4 mb-6">
            <img src="{profile.avatar}" alt="Avatar" class="w-16 h-16 rounded-full shadow-md" />
            <div>
              <h4 class="font-bold text-xl text-zinc-900">{profile.username}</h4>
              <p class="text-sm text-zinc-600">{profile.joined}</p>
              <p class="text-sm text-zinc-600 mt-2">{profile.description}</p>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-medium text-zinc-700">Post Karma</p>
                <p class="text-sm text-zinc-600">{profile.postKarma} / 100</p>
              </div>
              <div class="bg-zinc-200 rounded-full h-2.5 overflow-hidden">
                <div class="bg-gradient-to-r from-orange-600 to-amber-600 h-2.5 rounded-full transition-all duration-500" style="width: {Math.min(profile.postKarma / 100 * 100, 100)}%"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-medium text-zinc-700">Comment Karma</p>
                <p class="text-sm text-zinc-600">{profile.commentKarma} / 100</p>
              </div>
              <div class="bg-zinc-200 rounded-full h-2.5 overflow-hidden">
                <div class="bg-gradient-to-r from-orange-600 to-amber-600 h-2.5 rounded-full transition-all duration-500" style="width: {Math.min(profile.commentKarma / 100 * 100, 100)}%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-6 shadow-md hover:shadow-lg transition-shadow">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-md">
                <TrendingUp class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm text-orange-800 font-medium">Total Karma</p>
                <p class="text-2xl font-bold text-orange-900">{analytics.totalKarma}</p>
              </div>
            </div>
            <div class="mt-2">
              <div class="bg-orange-200 rounded-full h-2.5 overflow-hidden">
                <div class="bg-gradient-to-r from-orange-600 to-amber-600 h-2.5 rounded-full transition-all duration-500" style="width: {Math.min(analytics.totalKarma / 100 * 100, 100)}%"></div>
              </div>
              <p class="text-xs text-orange-700 mt-1">Goal: 100 Karma</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6 shadow-md hover:shadow-lg transition-shadow">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                <FileText class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm text-blue-800 font-medium">Total Posts</p>
                <p class="text-2xl font-bold text-blue-900">{analytics.totalPosts}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6 shadow-md hover:shadow-lg transition-shadow">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                <BarChart3 class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm text-purple-800 font-medium">Avg Karma</p>
                <p class="text-2xl font-bold text-purple-900">{analytics.avgKarma}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Latest Opportunities -->
        <div class="bg-white rounded-xl border border-zinc-200 p-6 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-zinc-900 flex items-center gap-2">
              <Target class="w-5 h-5 text-orange-600" />
              Latest Opportunities
            </h3>
            <div class="flex gap-2">
              <button
                on:click={scrollOpportunitiesLeft}
                class="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 p-2 rounded-md text-lg font-bold transition-colors"
              >
                &lt;
              </button>
              <button
                on:click={scrollOpportunitiesRight}
                class="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 p-2 rounded-md text-lg font-bold transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>
          {#if filteredOpportunities.length === 0}
            <div class="text-center py-8">
              <Target class="w-12 h-12 text-orange-400 mx-auto mb-3" />
              <p class="text-zinc-600 font-medium">No opportunities yet</p>
              <p class="text-sm text-zinc-500 mt-1">Scan for new opportunities</p>
            </div>
          {:else}
            <div class="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide" bind:this={opportunitiesScroll}>
              {#each filteredOpportunities.slice(0, 10) as opp}
                <div class="bg-gradient-to-br from-zinc-50 to-orange-50/50 rounded-lg p-4 border border-zinc-200 min-w-[300px] snap-center shadow-md hover:shadow-lg transition-all">
                  <div class="flex items-start justify-between mb-2">
                    <span class="text-xs px-2 py-1 bg-zinc-200 text-zinc-800 rounded font-medium">
                      r/{opp.subreddit}
                    </span>
                    <span class="font-semibold text-zinc-900 text-sm">
                      {Math.round(opp.relevance_score)}%
                    </span>
                  </div>
                  <h4 class="font-semibold text-zinc-900 text-sm mb-2 line-clamp-2">{opp.title}</h4>
                  <p class="text-xs text-zinc-600 line-clamp-3 mb-2">{opp.content || opp.title}</p>
                  <div class="flex items-center justify-between text-xs text-zinc-500">
                    <span>{opp.opportunity_type}</span>
                    <span>{opp.sentiment}</span>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Reddit Posts List -->
        <div class="bg-white rounded-xl border border-zinc-200 p-6 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-zinc-900">Reddit Posts</h3>
            <div class="flex gap-2">
              <button
                on:click={scrollPostsLeft}
                class="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 p-2 rounded-md text-lg font-bold transition-colors"
              >
                &lt;
              </button>
              <button
                on:click={scrollPostsRight}
                class="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 p-2 rounded-md text-lg font-bold transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>
          
          {#if approvedPosts.length === 0}
            <div class="text-center py-8">
              <FileText class="w-12 h-12 text-orange-400 mx-auto mb-3" />
              <p class="text-zinc-600 font-medium">No Reddit posts yet</p>
              <p class="text-sm text-zinc-500 mt-1">Convert blog posts to Reddit format in the Content tab</p>
            </div>
          {:else}
            <div class="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide" bind:this={postsScroll}>
              {#each approvedPosts as entry}
                <div class="border border-zinc-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-orange-50/30 min-w-[350px] snap-center shadow-md">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex-1">
                      <h4 class="font-semibold text-zinc-900 mb-1">{entry.post.title}</h4>
                      <p class="text-sm text-zinc-600 line-clamp-2">{entry.post.content}</p>
                    </div>
                    <div class="text-right ml-4">
                      {#if entry.post.posted}
                        <div class="text-lg font-bold text-orange-600">↑ {entry.post.karma}</div>
                        <div class="text-xs text-zinc-500">💬 {entry.post.comments}</div>
                      {:else}
                        <span class="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded font-medium">Ready</span>
                      {/if}
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2 flex-wrap">
                    {#each entry.post.suggested_subreddits as subreddit}
                      <span class="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-medium">
                        r/{subreddit}
                      </span>
                    {/each}
                  </div>
                  
                  {#if entry.post.url}
                    <a 
                      href={entry.post.url}
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
          <div class="bg-white rounded-xl border border-zinc-200 p-6 shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <TrendingUp class="w-5 h-5 text-orange-600" />
                <h3 class="text-lg font-semibold text-zinc-900">Best Performing Posts</h3>
              </div>
              <div class="flex gap-2">
                <button
                  on:click={scrollBestLeft}
                  class="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 p-2 rounded-md text-lg font-bold transition-colors"
                >
                  &lt;
                </button>
                <button
                  on:click={scrollBestRight}
                  class="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 p-2 rounded-md text-lg font-bold transition-colors"
                >
                  &gt;
                </button>
              </div>
            </div>
            <div class="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide" bind:this={bestScroll}>
              {#each analytics.bestPerformers as post, idx}
                <div class="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100 min-w-[300px] snap-center shadow-md hover:shadow-lg transition-shadow">
                  <div class="flex items-center gap-3 flex-1">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                      {idx + 1}
                    </div>
                    <div class="flex-1">
                      <h4 class="font-medium text-zinc-900 text-sm mb-1 line-clamp-1">{post.title}</h4>
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
          <div class="bg-white rounded-xl border border-zinc-200 p-6 shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <Target class="w-5 h-5 text-blue-600" />
                <h3 class="text-lg font-semibold text-zinc-900">Top Performing Subreddits</h3>
              </div>
              <div class="flex gap-2">
                <button
                  on:click={scrollTopLeft}
                  class="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 p-2 rounded-md text-lg font-bold transition-colors"
                >
                  &lt;
                </button>
                <button
                  on:click={scrollTopRight}
                  class="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 p-2 rounded-md text-lg font-bold transition-colors"
                >
                  &gt;
                </button>
              </div>
            </div>
            <div class="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide" bind:this={topScroll}>
              {#each analytics.topSubreddits as item, idx}
                <div class="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100 min-w-[250px] snap-center shadow-md hover:shadow-lg transition-shadow">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
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
          <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
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
          <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
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
          <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
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
          <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
            <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Minimum Relevance</h2>
            <div class="flex items-center gap-4">
              <input
                type="range"
                bind:value={config.min_relevance}
                min="50"
                max="90"
                step="5"
                class="flex-1 accent-orange-500"
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
              class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
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
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
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
</style>