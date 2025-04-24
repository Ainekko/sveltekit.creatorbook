<script lang="ts">
  import { onMount } from 'svelte';
  import ContentCalendarCard from '$lib/components/ContentCalendarCard.svelte';
  import KeywordTrendsCard from '$lib/components/KeywordTrendsCard.svelte';
  import SelectedKeywordsCard from '$lib/components/SelectedKeywordsCard.svelte';
  import BlogPostOutlinesCard from '$lib/components/BlogPostOutlinesCard.svelte';

  export let data;

  // Project Data from backend
  const projectData = {
    name: data?.project?.url || "N/A",
    url: data?.project?.url || "N/A",
    startDate: data?.project?.created_at?.split("T")[0] || "N/A"
  };

  // Weekly content from LangGraph result
  let weeklyContent = data?.project?.result?.weekly_content_plan || [];

  // Competitor analysis from LangGraph result
  let competitors = data?.project?.result?.analysis_data?.analyze_competitors?.competitors_analysis || [];
  let selectedWeek = "Current Week";
  let activeTab = "content"; // 'content', 'competitors', 'performance'

  function generateNewContent() {
    alert("Generating new content recommendations...");
  }

  // Function to handle blog post generation
  function handleBlogPostGeneration(event :any ) {
    alert(`Queuing full blog post generation for: ${event.detail.title}`);
    // Here you would call your API endpoint when implemented
  }

  onMount(() => {
    // Any initialization logic
  });
</script>

<div class="min-h-screen bg- text-white">
  <!-- Project Header -->
  <header class="bg- py-4 px-6 sticky top-0 z-10">
    <div class="flex items-center justify-between max-w-7xl mx-auto">
      <div>
        <h1 class="text-2xl font-bold">{projectData.name}</h1>
        <p class="text-sm opacity-80">{projectData.url}</p>
      </div>
      <div class="flex gap-3">
        <button class="bg-black/20 hover:bg-black/30 px-4 py-2 rounded-md text-sm flex items-center gap-2 transition">
          <span class="text-lg">📅</span>
          Started on {projectData.startDate}
        </button>
      </div>
    </div>
  </header>

  <!-- Tab Navigation -->
  <div class=" sticky top-16 z-10 border-b border-zinc-800">
    <div class="max-w-7xl mx-auto flex">
      <button 
        class="px-6 py-3 font-medium text-sm {activeTab === 'content' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-zinc-400 hover:text-zinc-200'}"
        on:click={() => activeTab = 'content'}
      >
        Content Strategy
      </button>
      <button 
        class="px-6 py-3 font-medium text-sm {activeTab === 'competitors' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-zinc-400 hover:text-zinc-200'}"
        on:click={() => activeTab = 'competitors'}
      >
        Competitor Analysis
      </button>
      <button 
        class="px-6 py-3 font-medium text-sm {activeTab === 'performance' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-zinc-400 hover:text-zinc-200'}"
        on:click={() => activeTab = 'performance'}
      >
        Performance
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto p-6">
    {#if activeTab === 'content'}
      <!-- Content Strategy View -->
      <div class="mb-6 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <h2 class="text-xl font-semibold">Content Strategy</h2>
          <div class="relative">
            <button class="bg-zinc-800 rounded-md px-3 py-1 text-sm flex items-center gap-1">
              {selectedWeek} <span class="text-xs">▼</span>
            </button>
          </div>
        </div>
        <button 
          on:click={generateNewContent}
          class="bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 px-4 py-2 rounded-md text-sm flex items-center gap-2 transition"
        >
          <span class="text-sm">+</span>
          Generate New Content
        </button>
      </div>

      <!-- Calendar & Trends Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl shadow-lg overflow-hidden">
          <ContentCalendarCard suggestion={data.project.result.analysis_data.create_content_plan.content_plan.content_calendar_suggestion} />
        </div>
        <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl shadow-lg overflow-hidden">
          <KeywordTrendsCard trends={data.project.result.analysis_data.create_content_plan.content_plan.industry_keyword_trends} />
        </div>
      </div>

      <!-- Main Content Strategy Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Keywords Column -->
        <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl shadow-lg overflow-hidden">
          <SelectedKeywordsCard keywords={data.project.result.analysis_data.create_content_plan.content_plan.selected_keywords} />
        </div>
        
        <!-- Blog Post Outlines Column - Spans 2 columns -->
        <div class="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl shadow-lg overflow-hidden">
          <BlogPostOutlinesCard 
            outlines={data.project.result.analysis_data.create_content_plan.content_plan.blog_post_outlines} 
            on:generatePost={handleBlogPostGeneration}
          />
        </div>
      </div>
    {/if}

    {#if activeTab === 'competitors'}
      <!-- Competitor Analysis Tab -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold">Competitor Analysis</h2>
        <p class="text-zinc-400 text-sm mt-1">Analyze competitor strategies and find market gaps</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.project.result.analysis_data.analyze_competitors.competitors_analysis as competitor}
          <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-5 shadow-lg">
            <div class="flex items-start justify-between">
              <h3 class="font-bold text-violet-400 text-lg">{competitor.name}</h3>
              <span class="bg-violet-500/20 text-violet-300 text-xs px-2 py-1 rounded-full">
                {competitor.relevance}
              </span>
            </div>
            
            {#if competitor.domain}
              <p class="text-sm text-gray-300 mt-1">
                <a href={`https://${competitor.domain}`} target="_blank" class="hover:text-pink-400 flex items-center gap-1">
                  <span class="text-xs">🔗</span> {competitor.domain}
                </a>
              </p>
            {:else}
              <p class="text-sm text-gray-400 mt-1">No domain available</p>
            {/if}
            
            {#if competitor.marketing_strategy}
              <div class="mt-4 bg-zinc-800/50 p-3 rounded-lg border-l-2 border-pink-500">
                <p class="text-sm text-zinc-400 mb-1">Marketing Strategy:</p>
                <p class="text-sm text-zinc-300">{competitor.marketing_strategy}</p>
              </div>
            {:else}
              <div class="mt-4 bg-zinc-800/50 p-3 rounded-lg border-l-2 border-zinc-700">
                <p class="text-sm text-zinc-400 italic">Marketing strategy analysis not available</p>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}

    {#if activeTab === 'performance'}
      <!-- Performance Tab -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold">AI Agent Performance</h2>
        <p class="text-zinc-400 text-sm mt-1">Track your marketing growth and ROI</p>
      </div>
      
      <!-- Growth Metrics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-5 shadow-lg">
          <h3 class="text-pink-400 font-medium mb-4 flex items-center gap-2">
            <span class="p-2 bg-pink-500/20 rounded-lg">📱</span>Social Growth
          </h3>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between items-center">
              <span>Weekly Engagement</span>
              <span class="text-violet-400 font-semibold">+35%</span>
            </div>
            <div class="h-1 w-full bg-zinc-700 rounded-full">
              <div class="h-full bg-violet-500 rounded-full" style="width: 35%"></div>
            </div>
            <div class="flex justify-between items-center">
              <span>Content Created</span>
              <span class="text-violet-400 font-semibold">24 pieces</span>
            </div>
            <div class="h-1 w-full bg-zinc-700 rounded-full">
              <div class="h-full bg-violet-500 rounded-full" style="width: 65%"></div>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-5 shadow-lg">
          <h3 class="text-pink-400 font-medium mb-4 flex items-center gap-2">
            <span class="p-2 bg-pink-500/20 rounded-lg">🔍</span>SEO Growth
          </h3>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between items-center">
              <span>Keyword Rankings</span>
              <span class="text-green-400 font-semibold">12 in top 3</span>
            </div>
            <div class="h-1 w-full bg-zinc-700 rounded-full">
              <div class="h-full bg-green-500 rounded-full" style="width: 40%"></div>
            </div>
            <div class="flex justify-between items-center">
              <span>Organic Traffic</span>
              <span class="text-green-400 font-semibold">+43%</span>
            </div>
            <div class="h-1 w-full bg-zinc-700 rounded-full">
              <div class="h-full bg-green-500 rounded-full" style="width: 43%"></div>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-5 shadow-lg">
          <h3 class="text-pink-400 font-medium mb-4 flex items-center gap-2">
            <span class="p-2 bg-pink-500/20 rounded-lg">💰</span>Lead Generation
          </h3>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between items-center">
              <span>New Leads</span>
              <span class="text-amber-400 font-semibold">3x increase</span>
            </div>
            <div class="h-1 w-full bg-zinc-700 rounded-full">
              <div class="h-full bg-amber-500 rounded-full" style="width: 75%"></div>
            </div>
            <div class="flex justify-between items-center">
              <span>CAC Reduction</span>
              <span class="text-amber-400 font-semibold">-40%</span>
            </div>
            <div class="h-1 w-full bg-zinc-700 rounded-full">
              <div class="h-full bg-amber-500 rounded-full" style="width: 40%"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Analytics Chart Placeholder -->
      <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-5 shadow-lg h-64 flex items-center justify-center">
        <div class="text-center">
          <p class="text-zinc-400">Performance analytics chart would go here</p>
          <button class="mt-4 px-4 py-2 bg-pink-500/20 text-pink-400 rounded-md text-sm hover:bg-pink-500/30 transition">
            Generate Analytics Report
          </button>
        </div>
      </div>
    {/if}
  </main>
</div>