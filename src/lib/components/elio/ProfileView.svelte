<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { TrendingUp, Target, BarChart3, FileText, User, RefreshCw } from 'lucide-svelte';
  import { ArrowUpRight } from 'lucide-svelte';
  import * as api from '$lib/components/elio/api';
  import { API_BASE_URL } from '$lib/config';
  
  export let projectId;
  export let filteredOpportunities;
  export let approvedPosts;

  const dispatch = createEventDispatcher();
  const authToken = localStorage.getItem('token');
  
  let loading = true;
  let profile = null;
  let analytics = null;
  let error = null;
  let refreshing = false;
  
  let opportunitiesScroll;
  let postsScroll;
  let bestScroll;
  let topScroll;

  async function loadProfile() {
    loading = true;
    error = null;
    
    try {
      const data = await api.fetchProfile(projectId, authToken, API_BASE_URL);
      profile = data.profile;
      analytics = data.analytics;
    } catch (err) {
      console.error('Failed to load profile:', err);
      error = err.message;
      
      // Fallback to mock data if API fails
      profile = {
        username: 'u/yourbusiness',
        reddit_username: 'yourbusiness',
        avatar: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_7.png',
        description: 'No bio set',
        joined: 'Joined recently',
        post_karma: 0,
        comment_karma: 0,
        total_karma: 0
      };
      
      analytics = {
        total_opportunities: 0,
        active_opportunities: 0,
        responded_opportunities: 0,
        avg_relevance: 0,
        top_subreddits: [],
        best_opportunities: [],
        response_rate: 0
      };
    } finally {
      loading = false;
    }
  }

  async function handleRefresh() {
    refreshing = true;
    await loadProfile();
    refreshing = false;
  }
  
  onMount(() => {
    loadProfile();
  });

  function scrollOpportunitiesLeft() {
    opportunitiesScroll?.scrollBy({ left: -400, behavior: 'smooth' });
  }
  function scrollOpportunitiesRight() {
    opportunitiesScroll?.scrollBy({ left: 400, behavior: 'smooth' });
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
</script>

{#if loading}
  <div class="text-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
    <p class="text-zinc-500 mt-4">Loading profile...</p>
  </div>
{:else if error}
  <div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
    <p class="text-red-800 font-medium mb-2">Failed to load profile</p>
    <p class="text-sm text-red-600 mb-4">{error}</p>
    <button
      on:click={handleRefresh}
      class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      Try Again
    </button>
  </div>
{:else}
  <div class="space-y-6">
    <!-- Header with Refresh Button -->
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-zinc-900">Reddit Profile & Analytics</h2>
      <button
        on:click={handleRefresh}
        disabled={refreshing}
        class="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw class="w-4 h-4 {refreshing ? 'animate-spin' : ''}" />
        Refresh
      </button>
    </div>

    <!-- Profile Card -->
    <div class="bg-white rounded-xl border border-zinc-200 p-6 shadow-xl">
      <h3 class="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
        <User class="w-5 h-5 text-orange-600" />
        Reddit Profile
      </h3>
      <div class="flex items-start gap-4 mb-6">
        <img src="{profile.avatar}" alt="Avatar" class="w-16 h-16 rounded-full shadow-md" />
        <div class="flex-1">
          <h4 class="font-bold text-xl text-zinc-900">{profile.username}</h4>
          <p class="text-sm text-zinc-600">{profile.joined}</p>
          <p class="text-sm text-zinc-600 mt-2">{profile.description}</p>
          {#if profile.verified}
            <span class="inline-block mt-2 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">
              ✓ Verified
            </span>
          {/if}
          {#if profile.is_gold}
            <span class="inline-block mt-2 text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded font-medium">
              🏆 Reddit Premium
            </span>
          {/if}
        </div>
      </div>
      
      <div class="space-y-4">
        <div>
          <div class="flex items-center justify-between mb-1">
            <p class="text-sm font-medium text-zinc-700">Post Karma</p>
            <p class="text-sm text-zinc-600">{profile.post_karma.toLocaleString()}</p>
          </div>
          <div class="bg-zinc-200 rounded-full h-2.5 overflow-hidden">
            <div class="bg-gradient-to-r from-orange-600 to-amber-600 h-2.5 rounded-full transition-all duration-500" style="width: {Math.min(profile.post_karma / 1000 * 100, 100)}%"></div>
          </div>
        </div>
        
        <div>
          <div class="flex items-center justify-between mb-1">
            <p class="text-sm font-medium text-zinc-700">Comment Karma</p>
            <p class="text-sm text-zinc-600">{profile.comment_karma.toLocaleString()}</p>
          </div>
          <div class="bg-zinc-200 rounded-full h-2.5 overflow-hidden">
            <div class="bg-gradient-to-r from-orange-600 to-amber-600 h-2.5 rounded-full transition-all duration-500" style="width: {Math.min(profile.comment_karma / 1000 * 100, 100)}%"></div>
          </div>
        </div>
        
        <div>
          <div class="flex items-center justify-between mb-1">
            <p class="text-sm font-medium text-zinc-700">Total Karma</p>
            <p class="text-lg font-bold text-orange-600">{profile.total_karma.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Analytics Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-6 shadow-md hover:shadow-lg transition-shadow">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-md">
            <Target class="w-5 h-5 text-white" />
          </div>
          <div>
            <p class="text-sm text-orange-800 font-medium">Total Opportunities</p>
            <p class="text-2xl font-bold text-orange-900">{analytics.total_opportunities}</p>
          </div>
        </div>
        <p class="text-xs text-orange-700 mt-2">
          {analytics.active_opportunities} active • {analytics.responded_opportunities} responded
        </p>
      </div>

      <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6 shadow-md hover:shadow-lg transition-shadow">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
            <BarChart3 class="w-5 h-5 text-white" />
          </div>
          <div>
            <p class="text-sm text-blue-800 font-medium">Avg Relevance</p>
            <p class="text-2xl font-bold text-blue-900">{analytics.avg_relevance}%</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6 shadow-md hover:shadow-lg transition-shadow">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
            <TrendingUp class="w-5 h-5 text-white" />
          </div>
          <div>
            <p class="text-sm text-purple-800 font-medium">Response Rate</p>
            <p class="text-2xl font-bold text-purple-900">{analytics.response_rate}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Best Opportunities from Analytics -->
    {#if analytics.best_opportunities.length > 0}
      <div class="bg-white rounded-xl border border-zinc-200 p-6 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-zinc-900 flex items-center gap-2">
            <Target class="w-5 h-5 text-orange-600" />
            Top Opportunities by Relevance
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
        <div class="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide" bind:this={opportunitiesScroll}>
          {#each analytics.best_opportunities as opp}
            <a
              href={opp.url}
              target="_blank"
              rel="noopener noreferrer"
              class="bg-gradient-to-br from-zinc-50 to-orange-50/50 rounded-lg p-4 border border-zinc-200 min-w-[300px] snap-center shadow-md hover:shadow-lg transition-all hover:border-orange-300"
            >
              <div class="flex items-start justify-between mb-2">
                <span class="text-xs px-2 py-1 bg-zinc-200 text-zinc-800 rounded font-medium">
                  r/{opp.subreddit}
                </span>
                <span class="font-semibold text-orange-600 text-sm">
                  {Math.round(opp.relevance_score)}%
                </span>
              </div>
              <h4 class="font-semibold text-zinc-900 text-sm mb-2 line-clamp-2">{opp.title}</h4>
              <div class="flex items-center gap-1 text-xs text-orange-600 font-medium mt-2">
                View on Reddit <ArrowUpRight class="w-3 h-3" />
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Top Subreddits -->
    {#if analytics.top_subreddits.length > 0}
      <div class="bg-white rounded-xl border border-zinc-200 p-6 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <Target class="w-5 h-5 text-blue-600" />
            <h3 class="text-lg font-semibold text-zinc-900">Top Subreddits by Activity</h3>
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
          {#each analytics.top_subreddits as item, idx}
            <div class="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100 min-w-[250px] snap-center shadow-md hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {idx + 1}
                </div>
                <span class="font-medium text-zinc-900">r/{item.subreddit}</span>
              </div>
              <span class="font-bold text-blue-600">{item.count} opps</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Approved Posts (from parent component) -->
    {#if approvedPosts.length > 0}
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
      </div>
    {/if}
  </div>
{/if}

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>