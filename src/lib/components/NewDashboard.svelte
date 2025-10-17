<!-- NewDashboard.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import ProjectHeader from '$lib/components/ProjectHeader.svelte';
  import GenerationProgress from '$lib/components/GenerationProgress.svelte';
  import { currentProjectAgents } from '$lib/projects/stores'; // Import the derived store

  export let data;

  let isGenerating = false;
  let generationProgress = '';
  let generationTimeElapsed = 0;
  let isGeneratingPost = false;
  let currentGeneratingPostIndex = -1;
  let selectedAgent = null;

  // Project Data from backend
  const projectData = {
    id: data?.project?.id || "",
    name: data?.project?.url || "N/A",
    url: data?.project?.url || "N/A",
    startDate: data?.project?.created_at?.split("T")[0] || "N/A"
  };

  // Get content plan data
  const contentPlan = data?.project?.latest_run?.result?.analysis_data?.content_plan || {};
  const businessData = data?.project?.latest_run?.result?.analysis_data?.website_analysis || {};

  // Get blog posts, keywords, outlines
  const blogPostOutlines = contentPlan?.seo?.blog_post_outlines || [];
  const selectedKeywords = contentPlan?.seo?.selected_keywords || [];
  const contentCalendarSuggestion = contentPlan?.seo?.content_calendar_suggestion || "";
  const blogPosts = data?.project?.latest_run?.blog_posts || [];

  // Get social content
  const redditPosts = contentPlan?.socials?.reddit_posts || [];
  const twitterPosts = contentPlan?.socials?.twitter_posts || [];
  const linkedinPosts = contentPlan?.socials?.linkedin_posts || [];

  // Utility function to format relative time
  function formatRelativeTime(timestamp: string): string {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000); // Convert to minutes

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }

  // Pre-calculate static CSS classes
  const agentStyles = {
    seo: {
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, transparent 70%)',
      statusColor: 'bg-yellow-400'
    },
    twitter: {
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
      statusColor: 'bg-emerald-400'
    },
    reddit: {
      gradient: 'from-orange-400 via-red-500 to-pink-600',
      bgGradient: 'linear-gradient(135deg, rgba(251, 146, 60, 0.03) 0%, transparent 70%)',
      statusColor: 'bg-zinc-400'
    }
  };

  // AI Agents Configuration
  console.log(currentProjectAgents)

  $: agents = [
    // SEO Agent (Dynamic from API)
    {
      id: 'seo',
      name: 'Nai',
      shortName: 'SEO',
      description: 'Master of search optimization: Handles keyword research, content outlines, search rankings, and organic traffic growth.',
      status: $currentProjectAgents[0]?.status || 'idle',
      lastScan: $currentProjectAgents[0]?.last_scan ? formatRelativeTime($currentProjectAgents[0].last_scan) : 'N/A',
      nextAction: $currentProjectAgents[0]?.next_action || 'Awaiting tasks...',
      metrics: {
        keywords: { value: selectedKeywords.length, label: 'Active Keywords', trend: '+12%' },
        outlines: { value: blogPostOutlines.length, label: 'Content Outlines', trend: '+3' },
        ranking: { value: 247, label: 'Avg. Position', trend: '↑ 23' }, // Hardcoded, update if API provides
        traffic: { value: '12.4K', label: 'Organic Visitors', trend: '+18%' } // Hardcoded, update if API provides
      },
      recentActivity: $currentProjectAgents[0]?.activities?.map(activity => ({
        type: activity.activity_type,
        action: activity.action,
        detail: activity.detail,
        time: formatRelativeTime(activity.created_at)
      })) || [],
      insights: $currentProjectAgents[0]?.insights || []
    },
    // Twitter Agent (Static, unchanged)
    {
      id: 'twitter',
      name: 'Rio',
      shortName: 'X',
      description: 'Expert in real-time engagement: Manages posts, trends, audience interaction, and growth on X (Twitter).',
      status: 'active',
      lastScan: '3 min ago',
      nextAction: 'Post scheduled in 45m',
      metrics: {
        posts: { value: twitterPosts.length, label: 'Ready Posts', trend: '+5' },
        engagement: { value: '8.4%', label: 'Avg. Engagement', trend: '+1.2%' },
        reach: { value: '45.2K', label: 'Weekly Reach', trend: '+22%' },
        followers: { value: '2.1K', label: 'New Followers', trend: '+127' }
      },
      recentActivity: [
        { type: 'trend', action: 'Trending topic detected', detail: '#AIRevolution gaining momentum', time: '5m ago' },
        { type: 'competitor', action: 'Competitor post analyzed', detail: '@techguru tweet got 10K likes', time: '18m ago' },
        { type: 'content', action: 'Thread generated', detail: '7-part series on AI trends', time: '45m ago' }
      ],
      insights: [
        { title: 'Viral Potential', description: 'Tweet about "AI productivity hacks" trending now', priority: 'high' },
        { title: 'Best Time', description: 'Your audience most active at 2:30 PM EST', priority: 'medium' }
      ]
    },
    // Reddit Agent (Static, unchanged)
    {
      id: 'reddit',
      name: 'Elio',
      shortName: 'Reddit',
      description: 'Specialist in community building: Oversees posts, discussions, karma management, and subreddit engagement.',
      status: 'monitoring',
      lastScan: '8 min ago',
      nextAction: 'Community check in 1h',
      metrics: {
        posts: { value: redditPosts.length, label: 'Ready Posts', trend: '+3' },
        karma: { value: '1.2K', label: 'Total Karma', trend: '+89' },
        communities: { value: 12, label: 'Active Subs', trend: '+2' },
        mentions: { value: 23, label: 'Brand Mentions', trend: '+15' }
      },
      recentActivity: [
        { type: 'discussion', action: 'Hot discussion found', detail: 'r/MachineLearning debating new AI model', time: '10m ago' },
        { type: 'opportunity', action: 'Comment opportunity', detail: 'Help request in r/entrepreneur', time: '25m ago' },
        { type: 'content', action: 'Post draft created', detail: 'Guide for r/SideProject community', time: '1h ago' }
      ],
      insights: [
        { title: 'Community Growth', description: 'r/ArtificialIntelligence showing 40% more activity', priority: 'high' },
        { title: 'Content Opportunity', description: 'Tutorial posts getting 3x more upvotes', priority: 'medium' }
      ]
    }
  ];

  async function generateNewContent() {
    try {
      isGenerating = true;
      generationProgress = 'Initializing analysis...';

      const token = localStorage.getItem('token');

      const onProgress = (status: string, elapsed: number) => {
        generationProgress = status;
        generationTimeElapsed = Math.round(elapsed / 1000);
      };

      const updatedProject = await updateProjectWithNewAnalysis(
        ['full'],
        token,
        projectData.id,
        projectData.url,
        'content-refresh',
        onProgress
      );

      if (updatedProject) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error generating new content:', error);
      alert('Failed to generate new content. Please try again.');
    } finally {
      isGenerating = false;
    }
  }

  async function handleBlogPostGeneration(event: any) {
    const outlineIndex = event.detail.index;
    const outline = event.detail.outline;

    isGeneratingPost = true;
    currentGeneratingPostIndex = outlineIndex;

    try {
      const { taskId } = await createBlogPostFromOutline(
        data.project.latest_run.id,
        outlineIndex,
        outline
      );

      const onProgress = (status: string) => {
        generationProgress = `Generating blog post ${outlineIndex + 1}: ${status}`;
      };

      const generatedContent = await pollBlogGenerationTask(taskId, onProgress);

      const token = localStorage.getItem('token');
      const savedPost = await saveBlogPostToDjango(
        {
          llm_run_id: data.project.latest_run.id,
          outline_index: outlineIndex,
          content: generatedContent,
        },
        token
      );

      if (savedPost) {
        window.location.reload();
      }

      alert(`Blog post "${outline.title}" has been generated successfully!`);
    } catch (error) {
      console.error('Error in blog post generation process:', error);
      alert(`Failed to generate blog post: ${error.message}`);
    } finally {
      isGeneratingPost = false;
      currentGeneratingPostIndex = -1;
    }
  }

  function selectAgent(agentId) {
    selectedAgent = selectedAgent === agentId ? null : agentId;
  }

  function generateAgentContent(agentId) {
    console.log(`Generating content for ${agentId} agent`);
  }

  import {
    updateProjectWithNewAnalysis,
    saveBlogPostToDjango,
    pollBlogGenerationTask,
    createBlogPostFromOutline
  } from '$lib/db';

  onMount(() => {
    // Any initialization logic
  });
</script>

<!-- The rest of the Svelte template remains unchanged -->
<div class="min-h-screen bg-white text-gray-900">
  <main class="px-8 py-8">
    {#if isGenerating}
      <GenerationProgress 
        progress={generationProgress} 
        type="content-analysis"
      />
    {/if}

    {#if isGeneratingPost}
      <GenerationProgress 
        progress={generationProgress} 
        type="blog-post" 
        postIndex={currentGeneratingPostIndex}
      />
    {/if}

    <!-- Main Grid Layout -->
    <div class="grid grid-cols-12 gap-8">
      <!-- Left Column - Agent Overview -->
      <div class="col-span-12 lg:col-span-4 space-y-6">
        {#each agents as agent}
          <div class="agent-card bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors duration-300 cursor-pointer" 
               on:click={() => selectAgent(agent.id)}
               on:keydown={(e) => e.key === 'Enter' && selectAgent(agent.id)}
               role="button"
               tabindex="0"
               style="background-image: {agentStyles[agent.id].bgGradient}">
            
            <!-- Agent Header -->
            <div class="agent-header p-6 bg-gradient-to-r {agentStyles[agent.id].gradient} text-white">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-xl font-bold">{agent.name}</h3>
                  <p class="text-white/90 text-sm mt-1">{agent.description}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <div class="status-dot w-2 h-2 rounded-full {agentStyles[agent.id].statusColor}"></div>
                    <span class="text-white/90 text-sm capitalize">{agent.status}</span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-white/80 text-xs">Last scan</div>
                  <div class="text-white text-sm font-medium">{agent.lastScan}</div>
                </div>
              </div>
              
              <div class="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div class="text-white/90 text-sm">
                  <span class="font-medium">Next:</span> {agent.nextAction}
                </div>
              </div>
            </div>

            <!-- Agent Metrics -->
            <div class="p-6">
              <div class="grid grid-cols-2 gap-4 mb-4">
                {#each Object.entries(agent.metrics) as [key, metric]}
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                    <div class="text-xs text-gray-500 mb-1">{metric.label}</div>
                    <div class="text-xs {metric.trend.includes('+') || metric.trend.includes('↑') ? 'text-emerald-500' : 'text-red-500'}">
                      {metric.trend}
                    </div>
                  </div>
                {/each}
              </div>

              <!-- Quick Actions -->
              <div class="pt-4 border-t border-gray-200">
                <button 
                  on:click|stopPropagation={() => generateAgentContent(agent.id)}
                  class="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mb-2"
                >
                  Generate Content
                </button>
                <div class="text-xs text-gray-500 text-center">
                  Click to view details
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Center Column - Selected Agent Details -->
      <div class="col-span-12 lg:col-span-5 space-y-6">
        {#if selectedAgent}
          {@const agent = agents.find(a => a.id === selectedAgent)}
          
          <!-- Agent Activity Feed -->
          <div class="bg-white rounded-xl p-8 border border-gray-200">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-sm font-medium text-gray-500 uppercase tracking-wider">Recent Activity</h2>
              <span class="text-xs text-gray-600 px-3 py-1 bg-gray-100 rounded-full">{agent.shortName}</span>
            </div>

            <div class="space-y-4">
              {#each agent.recentActivity as activity}
                <div class="flex items-start space-x-4 group">
                  <div class="activity-icon w-8 h-8 rounded-lg bg-gradient-to-r {agentStyles[agent.id].gradient} flex items-center justify-center text-white text-xs font-bold mt-1">
                    {activity.type === 'keyword' ? 'K' : activity.type === 'trend' ? 'T' : activity.type === 'competitor' ? 'C' : activity.type === 'content' ? 'P' : activity.type === 'discussion' ? 'D' : 'O'}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <p class="text-gray-900 font-medium text-sm">{activity.action}</p>
                      <span class="text-gray-500 text-xs">{activity.time}</span>
                    </div>
                    <p class="text-gray-600 text-sm mt-1 line-clamp-2">{activity.detail}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <!-- AI Insights -->
          <div class="bg-white rounded-xl p-8 border border-gray-200">
            <h2 class="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">AI Insights</h2>
            
            <div class="space-y-4">
              {#each agent.insights as insight}
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-gray-900 font-medium text-sm">{insight.title}</h3>
                    <span class="text-xs px-2 py-1 rounded-full {insight.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}">
                      {insight.priority}
                    </span>
                  </div>
                  <p class="text-gray-600 text-xs">{insight.description}</p>
                </div>
              {/each}
            </div>
          </div>

          <!-- Generated Content Preview -->
          <div class="bg-white rounded-xl p-8 border border-gray-200">
            <h2 class="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">Ready Content</h2>
            
            <div class="space-y-4">
              {#if selectedAgent === 'seo'}
                {#each blogPostOutlines.slice(0, 3) as outline}
                  <div class="content-card bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="text-gray-900 font-medium text-sm flex-1 pr-4">{outline.title}</h4>
                      <span class="text-xs text-emerald-600 px-2 py-1 bg-emerald-100 rounded">SEO</span>
                    </div>
                    <p class="text-gray-600 text-xs mb-3 line-clamp-2">{outline.meta_description}</p>
                    <div class="flex gap-2">
                      {#each outline.target_keywords?.slice(0, 2) || [] as keyword}
                        <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{keyword}</span>
                      {/each}
                    </div>
                  </div>
                {/each}
              {:else if selectedAgent === 'twitter'}
                {#each twitterPosts.slice(0, 3) as post}
                  <div class="content-card bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div class="flex justify-between items-start mb-2">
                      <span class="text-xs text-blue-600 px-2 py-1 bg-blue-100 rounded">Tweet</span>
                      <span class="text-xs text-gray-500">Ready to post</span>
                    </div>
                    <p class="text-gray-900 text-sm mb-3">{post.content}</p>
                    <div class="text-xs text-blue-600">
                      #{post.hashtags?.join(' #') || 'AI #productivity #automation'}
                    </div>
                  </div>
                {/each}
              {:else if selectedAgent === 'reddit'}
                {#each redditPosts.slice(0, 3) as post}
                  <div class="content-card bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="text-gray-900 font-medium text-sm flex-1">{post.title}</h4>
                      <span class="text-xs text-orange-600 px-2 py-1 bg-orange-100 rounded">r/{post.subreddit || 'programming'}</span>
                    </div>
                    <p class="text-gray-600 text-xs line-clamp-2">{post.content}</p>
                  </div>
                {/each}
              {/if}
            </div>
          </div>
        {:else}
          <!-- No Agent Selected -->
          <div class="bg-white rounded-xl p-16 border border-gray-200 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Select an AI Agent</h3>
            <p class="text-gray-600 mb-6">Choose an agent from the left to see detailed analytics and content</p>
            <div class="flex justify-center gap-3">
              {#each agents as agent}
                <button 
                  on:click={() => selectAgent(agent.id)}
                  class="px-4 py-2 bg-gradient-to-r {agentStyles[agent.id].gradient} text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform"
                >
                  {agent.shortName}
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <!-- Right Column - Global Stats & Performance -->
      <div class="col-span-12 lg:col-span-3 space-y-6">
        <!-- Overall Performance -->
        <div class="bg-white rounded-xl p-8 border border-gray-200">
          <h2 class="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">Performance</h2>
          
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div class="text-center">
                <div class="text-xl font-bold text-gray-900">15.2K</div>
                <div class="text-xs text-gray-500">Content Views</div>
                <div class="text-xs text-emerald-500">↗ 23%</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-gray-900">847</div>
                <div class="text-xs text-gray-500">Engagements</div>
                <div class="text-xs text-emerald-500">↗ 12%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="bg-white rounded-xl p-8 border border-gray-200">
          <h2 class="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">This Week</h2>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-700 text-sm">Content Generated</span>
              <div class="text-right">
                <span class="text-gray-900 font-semibold">{blogPostOutlines.length + twitterPosts.length + redditPosts.length}</span>
                <span class="text-emerald-500 text-xs ml-1">+15</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 text-sm">Keywords Tracked</span>
              <div class="text-right">
                <span class="text-gray-900 font-semibold">{selectedKeywords.length}</span>
                <span class="text-emerald-500 text-xs ml-1">+8</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 text-sm">Opportunities</span>
              <div class="text-right">
                <span class="text-gray-900 font-semibold">23</span>
                <span class="text-yellow-500 text-xs ml-1">+5</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 text-sm">Success Rate</span>
              <div class="text-right">
                <span class="text-gray-900 font-semibold">87%</span>
                <span class="text-emerald-500 text-xs ml-1">+3%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Center -->
        <div class="bg-white rounded-xl p-8 border border-gray-200">
          <h2 class="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">Quick Actions</h2>
          
          <div class="space-y-3">
            <button class="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 px-4 py-3 rounded-xl text-sm font-medium transition-colors border border-emerald-200 hover:border-emerald-300">
              Generate All Content
            </button>
            <button class="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 px-4 py-3 rounded-xl text-sm font-medium transition-colors border border-blue-200 hover:border-blue-300">
              Schedule Posts
            </button>
            <button class="w-full bg-orange-100 hover:bg-orange-200 text-orange-900 px-4 py-3 rounded-xl text-sm font-medium transition-colors border border-orange-200 hover:border-orange-300">
              Analyze Competitors
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  /* Unchanged styles */
  .agent-card:hover {
    transform: translate3d(0, 0, 0);
  }

  .status-dot {
    transition: none;
  }

  .agent-card {
    will-change: border-color;
  }

  .agent-card:hover {
    will-change: auto;
  }

  .agent-header {
    contain: layout style paint;
  }

  .activity-icon {
    contain: layout style paint;
  }

  .content-card {
    contain: layout style;
  }

  :global(.line-clamp-2) {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  :global(button), :global(.agent-card), :global(.content-card) {
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }

  :global(::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(::-webkit-scrollbar-track) {
    background: #f3f4f6;
  }

  :global(::-webkit-scrollbar-thumb) {
    background: #d1d5db;
    border-radius: 4px;
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background: #9ca3af;
  }

  :global(button:focus), :global([role="button"]:focus) {
    outline: 2px solid rgba(59, 130, 246, 0.5);
    outline-offset: 2px;
  }
</style>