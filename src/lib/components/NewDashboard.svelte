<!-- NewDashboard.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import ProjectHeader from '$lib/components/ProjectHeader.svelte';
  import GenerationProgress from '$lib/components/GenerationProgress.svelte';
  import { currentProjectAgents } from '$lib/projects/stores';
  import { Search } from 'lucide-svelte';

  export let data;

  let isGenerating = false;
  let generationProgress = '';
  let isGeneratingPost = false;
  let currentGeneratingPostIndex = -1;
  let selectedAgentId = 'seo';

  // Project Data
  const projectData = {
    id: data?.project?.id || "",
    name: data?.project?.url || "N/A",
    url: data?.project?.url || "N/A",
    startDate: data?.project?.created_at?.split("T")[0] || "N/A"
  };

  // Content Data
  const contentPlan = data?.project?.latest_run?.result?.analysis_data?.content_plan || {};
  const blogPostOutlines = contentPlan?.seo?.blog_post_outlines || [];
  const selectedKeywords = contentPlan?.seo?.selected_keywords || [];
  const redditPosts = contentPlan?.socials?.reddit_posts || [];
  const twitterPosts = contentPlan?.socials?.twitter_posts || [];

  // Format Time
  function formatRelativeTime(timestamp: string): string {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
  }

  // Agent Styles
  const agentStyles = {
    seo: { color: 'emerald', gradient: 'from-emerald-500 to-zinc-600' },
    twitter: { color: 'blue', gradient: 'from-blue-500 to-zinc-600' },
    reddit: { color: 'orange', gradient: 'from-orange-500 to-zinc-600' }
  };

  // Agents Data
  $: agents = {
    seo: {
      name: 'Nai',
      short: 'SEO',
      desc: 'Keyword research & content outlines',
      status: $currentProjectAgents[0]?.status || 'idle',
      lastScan: formatRelativeTime($currentProjectAgents[0]?.last_scan || new Date().toISOString()),
      metrics: [
        { label: 'Keywords', value: selectedKeywords.length, trend: '+12%' },
        { label: 'Outlines', value: blogPostOutlines.length, trend: '+3' }
      ],
      activity: $currentProjectAgents[0]?.activities?.map(a => ({
        type: a.activity_type,
        action: a.action,
        detail: a.detail,
        time: formatRelativeTime(a.created_at)
      })) || [],
      insights: $currentProjectAgents[0]?.insights || [],
      content: blogPostOutlines
    },
    twitter: {
      name: 'Rio',
      short: 'X',
      desc: 'Posts & engagement on X',
      status: 'active',
      lastScan: '3m ago',
      metrics: [
        { label: 'Posts', value: twitterPosts.length, trend: '+5' },
        { label: 'Engagement', value: '8.4%', trend: '+1.2%' }
      ],
      activity: [
        { type: 'trend', action: 'Trend detected', detail: '#AIRevolution', time: '5m ago' },
        { type: 'content', action: 'Thread generated', detail: 'AI trends', time: '45m ago' }
      ],
      insights: [{ title: 'Viral Potential', desc: 'AI hacks trending', priority: 'high' }],
      content: twitterPosts
    },
    reddit: {
      name: 'Elio',
      short: 'Reddit',
      desc: 'Posts & community building',
      status: 'monitoring',
      lastScan: '8m ago',
      metrics: [
        { label: 'Posts', value: redditPosts.length, trend: '+3' },
        { label: 'Karma', value: '1.2K', trend: '+89' }
      ],
      activity: [
        { type: 'discussion', action: 'Discussion found', detail: 'r/ML debate', time: '10m ago' },
        { type: 'content', action: 'Draft created', detail: 'r/SideProject guide', time: '1h ago' }
      ],
      insights: [{ title: 'Growth', desc: 'r/AI activity up', priority: 'high' }],
      content: redditPosts
    }
  };

  $: selectedAgent = agents[selectedAgentId];

  async function generateNewContent() {
    // Implementation...
  }

  async function handleBlogPostGeneration(event) {
    // Implementation...
  }

  function generateAgentContent(id) {
    console.log(`Generate for ${id}`);
  }

  onMount(() => {});
</script>

<div class="min-h-screen bg-zinc-50 text-zinc-900 font-sans antialiased">
  <main class="container mx-auto px-4 py-8">
    

    <!-- Agent Tabs -->
    <div class="bg-white rounded-2xl shadow-md overflow-hidden border border-zinc-200">
      <div class="flex border-b border-zinc-200">
        {#each Object.entries(agents) as [id, agent]}
          <button 
            on:click={() => selectedAgentId = id}
            class="flex-1 px-6 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2
              {selectedAgentId === id ? 'bg-zinc-50 border-b-2 border-' + agentStyles[id].color + '-500 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-100'}"
          >
            {#if id === 'seo'}
              <Search class="w-4 h-4" />
            {:else if id === 'twitter'}
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            {:else if id === 'reddit'}
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/>
              </svg>
            {/if}
            {agent.short}
          </button>
        {/each}
      </div>

      <!-- Agent Content -->
      <div class="p-6">
        <div class="flex items-start justify-between mb-6">
          <div>
            <h2 class="text-xl font-semibold text-zinc-900">{selectedAgent.name}</h2>
            <p class="text-sm text-zinc-600">{selectedAgent.desc}</p>
          </div>
          <div class="text-right text-sm">
            <div class="text-zinc-500">Last scan: {selectedAgent.lastScan}</div>
            <span class="inline-block px-2 py-1 mt-1 bg-zinc-100 text-zinc-700 rounded-full capitalize">
              {selectedAgent.status}
            </span>
          </div>
        </div>

        <!-- Metrics Grid -->
        <div class="grid grid-cols-2 gap-4 mb-8">
          {#each selectedAgent.metrics as metric}
            <div class="bg-zinc-50 rounded-lg p-4 text-center border border-zinc-200">
              <div class="text-xl font-bold text-zinc-900">{metric.value}</div>
              <div class="text-xs text-zinc-500">{metric.label}</div>
              <div class="text-xs {metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}">{metric.trend}</div>
            </div>
          {/each}
        </div>

        <!-- Activity & Insights Split -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- Activity -->
          <div>
            <h3 class="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wide">Activity</h3>
            <div class="space-y-3">
              {#each selectedAgent.activity as act}
                <div class="bg-zinc-50 rounded-lg p-3 border border-zinc-200">
                  <div class="flex justify-between text-sm">
                    <span class="font-medium text-zinc-900">{act.action}</span>
                    <span class="text-zinc-500">{act.time}</span>
                  </div>
                  <p class="text-xs text-zinc-600">{act.detail}</p>
                </div>
              {/each}
            </div>
          </div>

          <!-- Insights -->
          <div>
            <h3 class="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wide">Insights</h3>
            <div class="space-y-3">
              {#each selectedAgent.insights as insight}
                <div class="bg-zinc-50 rounded-lg p-3 border border-zinc-200">
                  <div class="flex justify-between mb-1">
                    <h4 class="text-sm font-medium text-zinc-900">{insight.title}</h4>
                    <span class="text-xs px-2 py-1 rounded-full {insight.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}">
                      {insight.priority}
                    </span>
                  </div>
                  <p class="text-xs text-zinc-600">{insight.description || insight.desc}</p>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Content Preview -->
        <div>
          <h3 class="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wide">Ready Content</h3>
          <div class="space-y-3">
            {#each selectedAgent.content.slice(0, 3) as item}
              <div class="bg-zinc-50 rounded-lg p-4 border border-zinc-200">
                {#if selectedAgentId === 'seo'}
                  <h4 class="text-sm font-medium text-zinc-900 mb-1">{item.title}</h4>
                  <p class="text-xs text-zinc-600 line-clamp-2">{item.meta_description}</p>
                {:else if selectedAgentId === 'twitter'}
                  <p class="text-sm text-zinc-900 mb-1">{item.content}</p>
                  <div class="text-xs text-blue-600"># {item.hashtags?.join(' #') || 'AI'}</div>
                {:else}
                  <h4 class="text-sm font-medium text-zinc-900 mb-1">{item.title}</h4>
                  <p class="text-xs text-zinc-600 line-clamp-2">{item.content}</p>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Generate Button -->
        <button 
          on:click={() => generateAgentContent(selectedAgentId)}
          class="mt-6 w-full py-3 bg-gradient-to-r {agentStyles[selectedAgentId].gradient} text-white rounded-lg hover:opacity-90 transition border border-zinc-700"
        >
          Generate Content for {selectedAgent.short}
        </button>
      </div>
    </div>
  </main>
</div>

<style>
  :global(*) {
    transition: all 0.2s ease;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>