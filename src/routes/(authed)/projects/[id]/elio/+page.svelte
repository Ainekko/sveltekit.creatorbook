<!-- src/routes/(authed)/projects/[id]/elio/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { contentStore } from '$lib/components/nai/stores';
  import { WORKER_API_URL, API_BASE_URL } from '$lib/config';
  import { TrendingUp, Target, BarChart3, FileText, Settings, ArrowUpRight, User, Sparkles, Copy, Check, LogIn, LogOut } from 'lucide-svelte';

  import * as api from '$lib/components/elio/api';

  import SuccessModal from '$lib/components/elio/SuccessModal.svelte';
  import Header from '$lib/components/elio/Header.svelte';
  import RedditConnectionAlert from '$lib/components/elio/RedditConnectionAlert.svelte';
  import ViewTabs from '$lib/components/elio/ViewTabs.svelte';
  import ContentView from '$lib/components/elio/ContentView.svelte';
  import OpportunitiesView from '$lib/components/elio/OpportunitiesView.svelte';
  import PostsView from '$lib/components/elio/PostsView.svelte';
  import ProfileView from '$lib/components/elio/ProfileView.svelte';
  import ConfigView from '$lib/components/elio/ConfigView.svelte';

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

  // Load content from store
  async function loadBlogPosts() {
    await contentStore.loadBlogPosts(projectId);
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
      api.updateOpportunity(projectId, opportunityId, updates, authToken, MAIN_BACKEND_URL);
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
    const redditUsernameParam = urlParams.get('username');

    if (redditSuccess === 'true' && redditUsernameParam) {
      successMessage = `Successfully connected to Reddit as u/${redditUsernameParam}`;
      showSuccessModal = true;
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }

    await api.checkRedditConnection(authToken, MAIN_BACKEND_URL).then(({ connected, username }) => {
      redditConnected = connected;
      redditUsername = username;
      checkingRedditAuth = false;
    }).catch(() => {
      checkingRedditAuth = false;
    });

    await loadBlogPosts();
    await api.fetchProjectData(projectId, authToken, MAIN_BACKEND_URL).then(({ project, config: backendConfig }) => {
      projectData = project;
      if (backendConfig) {
        config = backendConfig;
        saveConfigToLocalStorage(config);
      } else {
        loadConfigFromLocalStorage();
      }
    }).catch(() => {
      loadConfigFromLocalStorage();
    });

    await api.fetchOpportunitiesFromBackend(projectId, authToken, MAIN_BACKEND_URL).then((data) => {
      if (data.opportunities && data.opportunities.length > 0) {
        opportunities = data.opportunities.map(opp => ({
          ...opp,
          id: opp.post_id || opp.id,
          scanned_at: opp.created_at || new Date().toISOString(),
        }));
        saveOpportunitiesToLocalStorage(opportunities);
      } else {
        loadOpportunitiesFromLocalStorage();
      }
    }).catch(() => {
      loadOpportunitiesFromLocalStorage();
    });

    await loadRedditPosts();

    loading = false;

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

  async function connectReddit() {
    redditConnecting = true;
    try {
      const data = await api.connectReddit(projectId, authToken, MAIN_BACKEND_URL);
      if (data.auth_url) {
        window.location.href = data.auth_url;
      }
    } catch (error) {
      alert(`Failed to connect to Reddit: ${error.message}`);
    } finally {
      redditConnecting = false;
    }
  }

  async function disconnectReddit() {
    if (!confirm('Are you sure you want to disconnect your Reddit account?')) return;
    try {
      await api.disconnectReddit(authToken, MAIN_BACKEND_URL);
      redditConnected = false;
      redditUsername = null;
      alert('Reddit account disconnected successfully');
    } catch (error) {
      alert('Failed to disconnect Reddit account');
    }
  }

  async function scanOpportunities() {
    if (!projectData || !config) return;

    if (!redditConnected) {
      alert('Please connect your Reddit account first to scan for opportunities');
      return;
    }

    scanning = true;

    try {
      const result = await api.scanOpportunities(projectData, config, WORKER_URL);
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
            await api.saveOpportunitiesToBackend(uniqueNew, projectId, authToken, MAIN_BACKEND_URL);
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
      alert('Failed to scan for opportunities: ' + error.message);
    } finally {
      scanning = false;
    }
  }

  async function saveConfig() {
    try {
      saveConfigToLocalStorage(config);

      try {
        await api.saveConfig(projectId, config, authToken, MAIN_BACKEND_URL);
        alert('Configuration saved to server and locally!');
      } catch (backendError) {
        console.error('Backend save failed, but localStorage succeeded:', backendError);
        alert('Configuration saved locally!');
      }
    } catch (error) {
      alert('Failed to save configuration');
    }
  }

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

<div class="max-w-screen-2xl mx-auto p-4 sm:p-6">
  {#if loading || checkingRedditAuth}
    <div class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto"></div>
      <p class="text-zinc-500 mt-4">Loading Elio...</p>
    </div>
  {:else}
    <Header
      {projectData}
      {redditConnected}
      {redditUsername}
      {redditConnecting}
      {scanning}
      {view}
      {opportunities}
      on:connectReddit={connectReddit}
      on:disconnectReddit={disconnectReddit}
      on:scanOpportunities={scanOpportunities}
      on:clearDismissed={clearDismissed}
    />

    {#if !redditConnected}
      <RedditConnectionAlert
        {redditConnecting}
        on:connectReddit={connectReddit}
      />
    {/if}

    <ViewTabs
      bind:view
      {blogPosts}
      {filteredOpportunities}
      {pendingPosts}
      {approvedPosts}
    />

    {#if view === 'content'}
      <ContentView
        {blogPosts}
        {generatingPosts}
        bind:hoveredPost
        on:convertToRedditPost={convertToRedditPost}
      />
    {:else if view === 'opportunities'}
      <OpportunitiesView
        {filteredOpportunities}
        bind:selectedOpportunity
        on:updateOpportunity={(e) => updateOpportunity(e.detail.id, e.detail.updates)}
        on:copyResponse={(e) => copyResponse(e.detail.text)}
      />
    {:else if view === 'posts'}
      <PostsView
        bind:pendingPosts
        bind:approvedPosts
        {copiedIndex}
        {projectData}
        on:approvePost={(e) => approvePost(e.detail.entry, e.detail.postIndex)}
        on:deleteApprovedPost={(e) => deleteApprovedPost(e.detail.postId)}
        on:copyPost={(e) => copyPost(e.detail.post)}
      />
      {:else if view === 'profile'}
      <ProfileView
        {projectId}
        {filteredOpportunities}
        {approvedPosts}
      />
    {:else if view === 'config'}
      <ConfigView
        bind:config
        on:saveConfig={saveConfig}
      />
    {/if}
  {/if}
</div>

<SuccessModal
  bind:showSuccessModal
  {successMessage}
  on:close={closeSuccessModal}
  on:goToPostsView={goToPostsView}
/>

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
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
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