<!-- routes/(authed)/seo/projectId/+page.svelte -->
<script>
  import { onMount, afterUpdate } from 'svelte';
  import GenerationProgress from '$lib/components/GenerationProgress.svelte';
  import OrionKeywordResearch from '$lib/components/OrionKeywordResearch.svelte';
  import OrionBlogWorkflow from '$lib/components/OrionBlogWorkflow.svelte';
  import OrionAnalytics from '$lib/components/OrionAnalytics.svelte';
  import OrionCompetitorRankings from '$lib/components/OrionCompetitorRankings.svelte';
  import OrionSidebar from '$lib/components/OrionSidebar.svelte';

  // Mocked data
  let seoData = {
    project: { name: 'Sample SEO Project', id: '123' },
    metrics: {
      keywords: { value: 15, label: 'Active Keywords', trend: '+12%' },
      outlines: { value: 5, label: 'Content Outlines', trend: '+3' },
      ranking: { value: 247, label: 'Avg. Position', trend: '↑ 23' },
      traffic: { value: '12.4K', label: 'Organic Visitors', trend: '+18%' }
    }
  };
  
  let keywords = [
    //TODO remove top bid low and top bid high. add cpc and keyword difficulty
    { keyword: 'ai automation tools', monthly_searches: 2100, competition: 'Medium', cpc:"12.5", keyword_difficulty: "89", trend: 'Rising' },
    { keyword: 'seo ai agent', monthly_searches: 800, competition: 'Low', cpc:"12.5", keyword_difficulty: "89", trend: 'Stable' },
    { keyword: 'blog content generation', monthly_searches: 1200, competition: 'High', cpc:"12.5", keyword_difficulty: "89", trend: 'Declining' }
  ];
  
  let blogPostOutlines = [
    { 
      title: 'Top 10 AI Automation Tools for 2025', 
      meta_description: 'Discover the best AI tools to automate your workflow.', 
      target_keywords: ['ai automation tools', 'best ai tools 2025'], 
      generated: false, 
      scheduled: null, 
      markdownContent: '' 
    },
    { 
      title: 'How AI is Revolutionizing SEO', 
      meta_description: 'Explore the impact of AI on search engine optimization.', 
      target_keywords: ['ai seo', 'seo revolution'], 
      generated: true, 
      scheduled: '2025-09-01', 
      markdownContent: '# How AI is Revolutionizing SEO\n\nAI is transforming SEO by automating keyword research, content generation, and analytics.\n\n## Key Benefits\n- **Automation**: Streamline repetitive tasks.\n- **Insights**: Gain deeper analytics.\n- **Optimization**: Improve rankings faster.' 
    },
    { 
      title: 'Generating Blog Content with AI', 
      meta_description: 'Learn how to use AI for creating high-quality blog posts.', 
      target_keywords: ['ai blog generation', 'content ai'], 
      generated: false, 
      scheduled: null, 
      markdownContent: '' 
    }
  ];
  
  let selectedKeywords = [];
  
  let isGenerating = false;
  let generationProgress = '';
  let selectedAgent = 'seo';
  let isGeneratingPost = false;
  let currentGeneratingPostIndex = -1;
  let expandedBlogIndex = -1; // Track which blog is expanded for Markdown editing
  let activeTab = 'content-lab'; // Default to Content Lab
  
  // Mock trend data for charts (last 6 periods)
  let keywordsTrend = [10, 11, 12, 13, 14, 15]; // Increasing
  let outlinesTrend = [2, 3, 3, 4, 4, 5]; // Slight increase
  let rankingTrend = [270, 265, 260, 255, 250, 247]; // Decreasing (better position)
  let trafficTrend = [8000, 8500, 9000, 9500, 11000, 12400]; // Increasing
  
  // Derived Kanban columns
  $: outlines = blogPostOutlines.filter(o => !o.generated);
  $: readyToPost = blogPostOutlines.filter(o => o.generated && !o.scheduled);
  $: posted = blogPostOutlines.filter(o => o.generated && !!o.scheduled);
  
  // AI Agents Configuration (only SEO)
  const agents = [
    {
      id: 'seo',
      name: 'SEO Intelligence',
      shortName: 'SEO',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      bgPattern: 'radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
      status: 'analyzing',
      lastScan: '12 min ago',
      nextAction: 'Keyword research in 2h',
      metrics: {
        keywords: { value: selectedKeywords.length, label: 'Active Keywords', trend: '+12%' },
        outlines: { value: blogPostOutlines.filter(o => !o.generated).length, label: 'Content Outlines', trend: '+3' },
        ranking: { value: 247, label: 'Avg. Position', trend: '↑ 23' },
        traffic: { value: '12.4K', label: 'Organic Visitors', trend: '+18%' }
      },
      recentActivity: [
        { type: 'keyword', action: 'Found high-opportunity keyword', detail: '"AI automation tools" - 2.1K searches', time: '15m ago' },
        { type: 'competitor', action: 'Competitor analysis complete', detail: 'Updated competitive landscape', time: '1h ago' },
        { type: 'content', action: 'Blog outline generated', detail: '"10 Best Practices for SEO in 2025"', time: '2h ago' }
      ],
      insights: [
        { title: 'Traffic Opportunity', description: 'Target "AI marketing automation" for 15% traffic boost', priority: 'high' },
        { title: 'Content Gap', description: '3 competitors ranking for keywords you\'re missing', priority: 'medium' }
      ]
    }
  ];
  
  // Simulated generation for demo
  async function handleGenerateSEO() {
    isGenerating = true;
    generationProgress = 'Generating new keywords...';
    await new Promise(resolve => setTimeout(resolve, 2000));
    keywords = [...keywords, { keyword: 'new ai keyword', monthly_searches: 500, competition: 'Low', cpc:"12.5", keyword_difficulty: "89", trend: 'New' }];
    keywordsTrend = [...keywordsTrend.slice(1), keywordsTrend[keywordsTrend.length - 1] + 1];
    isGenerating = false;
  }
  
  async function generateNewContent() {
    isGenerating = true;
    generationProgress = 'Initializing analysis...';
    await new Promise(resolve => setTimeout(resolve, 2000));
    blogPostOutlines = [...blogPostOutlines, { 
      title: 'New AI Topic', 
      meta_description: 'New description.', 
      target_keywords: ['new keyword'], 
      generated: false, 
      scheduled: null, 
      markdownContent: '' 
    }];
    outlinesTrend = [...outlinesTrend.slice(1), outlinesTrend[outlinesTrend.length - 1] + 1];
    isGenerating = false;
  }
  
  async function handleBlogPostGeneration(index, outline) {
    isGeneratingPost = true;
    currentGeneratingPostIndex = index;
    generationProgress = `Generating blog post ${index + 1}...`;
    await new Promise(resolve => setTimeout(resolve, 3000));
    blogPostOutlines[index].generated = true;
    blogPostOutlines[index].markdownContent = `# ${outline.title}\n\nThis is a generated blog post for ${outline.title}.\n\n## Introduction\n\n${outline.meta_description}\n\n## Key Points\n- Point 1: Relevant to ${outline.target_keywords[0] || 'keyword'}.\n- Point 2: Add more details here.`;
    console.log(`Generated full blog for outline: ${outline.title}`);
    alert(`Blog post "${outline.title}" has been generated successfully!`);
    isGeneratingPost = false;
    currentGeneratingPostIndex = -1;
    blogPostOutlines = blogPostOutlines; // Trigger reactivity
  }
  
  function handleSchedule(index, date) {
    if (date) {
      blogPostOutlines[index].scheduled = date;
      console.log(`Scheduled blog post "${blogPostOutlines[index].title}" for ${date}`);
      alert(`Blog post scheduled for ${date}!`);
      blogPostOutlines = blogPostOutlines; // Trigger reactivity
    }
  }
  
  function handleMarkdownUpdate(index, value) {
    blogPostOutlines[index].markdownContent = value;
    console.log(`Updated Markdown for "${blogPostOutlines[index].title}"`);
  }
  
  function toggleBlogExpansion(index) {
    expandedBlogIndex = expandedBlogIndex === index ? -1 : index;
  }
  
  function selectAgent(agentId) {
    selectedAgent = selectedAgent === agentId ? null : agentId;
  }
  
  async function handleGenerateOutlinesFromSelected() {
    if (selectedKeywords.length === 0) return;
    isGenerating = true;
    generationProgress = 'Creating outlines from selected keywords...';
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate AI
    selectedKeywords.forEach(kw => {
      blogPostOutlines = [...blogPostOutlines, {
        title: `Outline for ${kw.keyword}`,
        meta_description: `SEO-optimized content around ${kw.keyword}.`,
        target_keywords: [kw.keyword],
        generated: false,
        scheduled: null,
        markdownContent: ''
      }];
    });
    selectedKeywords = []; // Clear selection
    isGenerating = false;
  }

  // Mock AI summary based on trends
  $: aiSummary = `Your SEO performance shows positive momentum. Organic traffic has grown by ${seoData.metrics.traffic.trend}, driven by a ${seoData.metrics.ranking.trend} improvement in average position. You've added ${seoData.metrics.keywords.trend} more active keywords and ${seoData.metrics.outlines.trend} new content outlines. Overall growth: ~15% month-over-month. Recommendation: Focus on high-competition keywords to accelerate rankings.`;

  // New feature: Competitor SERP Position Tracking
  let competitorDomains = ['competitor1.com', 'competitor2.com']; // Mock initial or user-input
  let competitorInput = '';
  let competitorRankings = []; // Will hold { keyword, positions: { domain1: pos, domain2: pos, ... } }
  let isFetchingRankings = false;

  function addCompetitor() {
    if (competitorInput.trim()) {
      competitorDomains = [...competitorDomains, competitorInput.trim()];
      competitorInput = '';
    }
  }

  function removeCompetitor(domain) {
    competitorDomains = competitorDomains.filter(d => d !== domain);
  }

  async function fetchCompetitorRankings() {
    if (competitorDomains.length === 0 || keywords.length === 0) return;
    isFetchingRankings = true;
    generationProgress = 'Fetching competitor rankings...';
    // Mock backend API call
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    // Mock data response from backend (simulating Google Custom Search JSON API parsed results)
    competitorRankings = keywords.map(kw => {
      const positions = {};
      competitorDomains.forEach(domain => {
        // Random mock positions between 1-100 or 'N/A'
        positions[domain] = Math.random() > 0.1 ? Math.floor(Math.random() * 99) + 1 : 'N/A';
      });
      return { keyword: kw.keyword, positions };
    });
    isFetchingRankings = false;
    generationProgress = '';
  }

  function setActiveTab(tab) {
    activeTab = tab;
  }
  
</script>

<!-- WRAPPER ADDED: scales everything by ~20% without touching your logic/markup -->
<div class="dashboard-scale">
  <div class="min-h-screen bg-black text-white p-8">
  
    {#if isGenerating || isGeneratingPost || isFetchingRankings}
      <GenerationProgress progress={generationProgress} type="seo-generation" />
    {/if}
  
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <!-- Main Content: Tabs for Analytics and Content Lab -->
      <div class="col-span-1 lg:col-span-4 space-y-4">
        <!-- Tabs -->
        <div class="flex space-x-4 mb-4">
          <button 
            on:click={() => setActiveTab('content-lab')} 
            class="px-4 py-2 text-sm font-medium rounded-lg {activeTab === 'content-lab' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300'}"
          >
            Content Lab
          </button>
          <button 
            on:click={() => setActiveTab('analytics')} 
            class="px-4 py-2 text-sm font-medium rounded-lg {activeTab === 'analytics' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300'}"
          >
            Analytics
          </button>
          <button 
            on:click={() => setActiveTab('competitor-rankings')} 
            class="px-4 py-2 text-sm font-medium rounded-lg {activeTab === 'competitor-rankings' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300'}"
          >
            Competitor Rankings
          </button>
        </div>
  
        {#if activeTab === 'analytics'}
          <OrionAnalytics {seoData} {keywordsTrend} {outlinesTrend} {rankingTrend} {trafficTrend} {aiSummary} />
        {:else if activeTab === 'content-lab'}
          <div class="space-y-6">
            <OrionKeywordResearch {keywords} bind:selectedKeywords {isGenerating} on:generate={handleGenerateSEO} on:createOutlines={handleGenerateOutlinesFromSelected} />
            <OrionBlogWorkflow {outlines} {readyToPost} {posted} {blogPostOutlines} bind:expandedBlogIndex on:generateOutlines={generateNewContent} on:generateBlog={(e) => handleBlogPostGeneration(e.detail.index, blogPostOutlines[e.detail.index])} on:schedule={(e) => handleSchedule(e.detail.index, e.detail.date)} on:updateMarkdown={(e) => handleMarkdownUpdate(e.detail.index, e.detail.value)} on:toggleExpansion={(e) => toggleBlogExpansion(e.detail.index)} />
          </div>
        {:else if activeTab === 'competitor-rankings'}
          <OrionCompetitorRankings bind:competitorDomains bind:competitorInput {competitorRankings} {isFetchingRankings} on:addCompetitor={addCompetitor} on:removeCompetitor={(e) => removeCompetitor(e.detail.domain)} on:fetchRankings={fetchCompetitorRankings} />
        {/if}
      </div>
  
      <OrionSidebar {selectedAgent} {agents} on:selectAgent={(e) => selectAgent(e.detail.agentId)} />
    </div>
  </div>
</div>

<style>
  /* Crisp global scale for this component only (no Tailwind class changes) */
  .dashboard-scale {
    /* Chromium/Edge/Brave: crisp text & uniform layout */
    zoom: 0.9; /* 80% */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Fallback for browsers that don't support zoom (e.g., Firefox) */
  @supports not (zoom: 1) {
    .dashboard-scale {
      transform: scale(0.8);
      transform-origin: top left;
      /* compensate width shrink so the grid doesn't collapse */
      width: 125%;
    }
  }
</style>