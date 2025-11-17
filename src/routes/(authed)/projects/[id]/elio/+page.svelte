<!-- src/routes/(authed)/projects/[id]/elio/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { contentStore } from '$lib/components/nai/stores';
  import { WORKER_API_URL, API_BASE_URL } from '$lib/config';

  import * as api from '$lib/components/elio/api';

  import SuccessModal from '$lib/components/elio/SuccessModal.svelte';
  import Header from '$lib/components/elio/Header.svelte';
  import RedditConnectionAlert from '$lib/components/elio/RedditConnectionAlert.svelte';
  import ViewTabs from '$lib/components/elio/ViewTabs.svelte';
  import ContentAndPostsView from '$lib/components/elio/ContentAndPostsView.svelte';
  import OpportunitiesView from '$lib/components/elio/OpportunitiesView.svelte';
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
  let pendingPosts = [];
  let approvedPosts = [];
  let scanning = false;
  let view = 'content-posts';
  let selectedOpportunity = null;
  let generatingPosts = new Set();
  let showSuccessModal = false;
  let successMessage = '';
  let copiedIndex = null;
  let currentCopiedTimer;

  // Reddit Auth State
  let redditConnected = false;
  let redditUsername = null;
  let redditConnecting = false;
  let checkingRedditAuth = true;

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
    } catch (error) {
      console.error('Failed to load reddit posts:', error);
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
        suggested_subreddits: config?.subreddits?.length > 0 ? config.subreddits : ['entrepreneur'],
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
        config = {
          subreddits: [],
          keywords: [],
          exclude_keywords: [],
          min_relevance: 65.0,
          time_window_hours: 24,
          max_per_subreddit: 5
        };
      }
    } catch (error) {
      console.error('Failed to load config from localStorage:', error);
      config = {
        subreddits: [],
        keywords: [],
        exclude_keywords: [],
        min_relevance: 65.0,
        time_window_hours: 24,
        max_per_subreddit: 5
      };
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
    view = 'content-posts';
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

    {#if view === 'content-posts'}
      <ContentAndPostsView
        {blogPosts}
        {generatingPosts}
        bind:pendingPosts
        bind:approvedPosts
        {copiedIndex}
        {projectData}
        on:convertToRedditPost={(e) => convertToRedditPost(e.detail)}
        on:approvePost={(e) => approvePost(e.detail.entry, e.detail.postIndex)}
        on:deleteApprovedPost={(e) => deleteApprovedPost(e.detail.postId)}
        on:copyPost={(e) => copyPost(e.detail.post)}
      />
    {:else if view === 'opportunities'}
      <OpportunitiesView
        {filteredOpportunities}
        bind:selectedOpportunity
        on:updateOpportunity={(e) => updateOpportunity(e.detail.id, e.detail.updates)}
        on:copyResponse={(e) => copyResponse(e.detail.text)}
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