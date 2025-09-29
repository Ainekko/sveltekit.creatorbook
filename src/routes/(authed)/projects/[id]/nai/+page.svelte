<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Header from '$lib/components/nai/Header.svelte';
  import Tabs from '$lib/components/nai/Tabs.svelte';
  import Overview from '$lib/components/nai/Overview.svelte';
  import Keywords from '$lib/components/nai/Keywords.svelte';
  import Outlines from '$lib/components/nai/Outlines.svelte';
  import Content from '$lib/components/nai/Content.svelte';
  import Settings from '$lib/components/nai/Settings.svelte';
  import ScheduleModal from '$lib/components/nai/ScheduleModal.svelte';
  import type { AgentData, Keyword, Outline, BlogPost, Task } from '$lib/components/nai/types';

  export let data: any;

  let activeTab: string = 'overview';
  let isAutopilotEnabled: boolean = false;
  let selectedKeywords: number[] = [];
  let generatingContent: string | null = null;
  let showScheduleModal: boolean = false;

  const agentData: AgentData = {
    id: data?.agent?.id ?? 'seo-agent-001',
    name: 'Nai',
    status: 'analyzing',
    lastScan: '12 min ago',
    nextAction: 'Keyword research in 2h',
    autopilot: {
      enabled: false,
      frequency: 'daily',
      nextRun: '2024-01-15T14:00:00Z'
    }
  };

  let keywords: Keyword[] = [
    { id: 1, keyword: 'AI automation tools', volume: 2100, difficulty: 45, selected: true, trend: '+12%' },
    { id: 2, keyword: 'workflow automation software', volume: 1800, difficulty: 52, selected: false, trend: '+8%' },
    { id: 3, keyword: 'business process automation', volume: 3200, difficulty: 38, selected: true, trend: '+15%' },
    { id: 4, keyword: 'AI marketing automation', volume: 1500, difficulty: 41, selected: true, trend: '+22%' },
    { id: 5, keyword: 'automated content creation', volume: 980, difficulty: 35, selected: false, trend: '+18%' }
  ];

  let outlines: Outline[] = [
    {
      id: 1,
      title: '10 Best AI Automation Tools to Transform Your Business in 2024',
      metaDescription: 'Discover the top AI automation tools that can revolutionize your business processes and boost productivity by up to 300%.',
      targetKeywords: ['AI automation tools', 'business automation'],
      wordCount: 2500,
      status: 'ready',
      estimatedTime: '12 min read'
    },
    {
      id: 2,
      title: 'Complete Guide to Business Process Automation',
      metaDescription: 'Learn how to implement business process automation step-by-step and increase efficiency by 40%.',
      targetKeywords: ['business process automation', 'workflow automation'],
      wordCount: 3200,
      status: 'ready',
      estimatedTime: '15 min read'
    }
  ];

  let blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'How AI is Revolutionizing Content Marketing',
      status: 'published',
      publishedAt: '2024-01-10',
      views: 1247,
      engagement: '4.2%',
      keywords: ['AI marketing', 'content automation']
    },
    {
      id: 2,
      title: 'The Future of Automated Workflows',
      status: 'draft',
      createdAt: '2024-01-12',
      wordCount: 1800,
      keywords: ['workflow automation', 'business efficiency']
    }
  ];

  let currentTasks: Task[] = [
    { id: 1, type: 'keyword_generation', status: 'running', progress: 65, message: 'Analyzing competitor keywords...' },
    { id: 2, type: 'outline_generation', status: 'pending', progress: 0, message: 'Waiting for keyword selection...' }
  ];

  function toggleKeywordSelection(keywordId: number) {
    const idx = keywords.findIndex(k => k.id === keywordId);
    if (idx !== -1) {
      keywords[idx].selected = !keywords[idx].selected;
      keywords = [...keywords];
      selectedKeywords = keywords.filter(k => k.selected).map(k => k.id);
    }
  }

  function toggleAutopilot() {
    isAutopilotEnabled = !isAutopilotEnabled;
    console.log(`Autopilot ${isAutopilotEnabled ? 'enabled' : 'disabled'}`);
  }

  async function generateKeywords() {
    generatingContent = 'keywords';
    try {
      console.log('Generating keywords...');
      setTimeout(() => { generatingContent = null; }, 3000);
    } catch (error) {
      console.error('Failed to generate keywords:', error);
      generatingContent = null;
    }
  }

  async function generateOutlines() {
    const selected = keywords.filter(k => k.selected);
    if (selected.length === 0) {
      alert('Please select at least one keyword first');
      return;
    }
    generatingContent = 'outlines';
    try {
      console.log('Generating outlines for selected keywords...', selected.map(s => s.keyword));
      setTimeout(() => { generatingContent = null; }, 3000);
    } catch (error) {
      console.error('Failed to generate outlines:', error);
      generatingContent = null;
    }
  }

  async function generateBlogPost(outlineId: number) {
    generatingContent = `blog-${outlineId}`;
    try {
      console.log(`Generating blog post for outline ${outlineId}...`);
      setTimeout(() => { generatingContent = null; }, 5000);
    } catch (error) {
      console.error('Failed to generate blog post:', error);
      generatingContent = null;
    }
  }

  onMount(() => {
    selectedKeywords = keywords.filter(k => k.selected).map(k => k.id);
  });
</script>

<div class="min-h-screen bg-white text-gray-900">
  <Header {agentData} {isAutopilotEnabled} {currentTasks} {toggleAutopilot} />
  <Tabs {activeTab} on:tabChange={(e) => activeTab = e.detail} />
  <div class="px-8 py-8">
    {#if activeTab === 'overview'}
      <Overview {keywords} {outlines} {generateKeywords} {generateOutlines} {generatingContent} on:openScheduleModal={() => showScheduleModal = true} />
    {:else if activeTab === 'keywords'}
      <Keywords {keywords} {selectedKeywords} {generatingContent} {toggleKeywordSelection} {generateKeywords} {generateOutlines} />
    {:else if activeTab === 'outlines'}
      <Outlines {outlines} {generatingContent} {generateBlogPost} />
    {:else if activeTab === 'content'}
      <Content {blogPosts} />
    {:else if activeTab === 'settings'}
      <Settings {isAutopilotEnabled} {toggleAutopilot} />
    {/if}
  </div>
  {#if showScheduleModal}
    <ScheduleModal on:close={() => showScheduleModal = false} />
  {/if}
</div>
