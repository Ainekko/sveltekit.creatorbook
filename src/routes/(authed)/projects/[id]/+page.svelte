<script lang="ts">
  import { onMount } from 'svelte';
  import ContentCalendarCard from '$lib/components/ContentCalendarCard.svelte';
  import KeywordTrendsCard from '$lib/components/KeywordTrendsCard.svelte';
  import SelectedKeywordsCard from '$lib/components/SelectedKeywordsCard.svelte';
  import BlogPostOutlinesCard from '$lib/components/BlogPostOutlinesCard.svelte';
  import Redditposts from '$lib/components/redditposts.svelte';
  import { updateProjectWithNewAnalysis } from '$lib/db'; // Import our new function
  
  export let data;

  let redditPosts = data.project.latest_run.result.analysis_data.create_content_plan.content_plan.socials.reddit_posts;
  let isGenerating = false;
  let generationProgress = '';
  let generationTimeElapsed = 0;
  
  // Project Data from backend
  const projectData = {
    id: data?.project?.id || "",
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

  async function generateNewContent() {
    try {
      isGenerating = true;
      generationProgress = 'Initializing analysis...';
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      // Define progress callback
      const onProgress = (status: string, elapsed: number) => {
        generationProgress = status;
        generationTimeElapsed = Math.round(elapsed / 1000); // Convert to seconds
      };
      
      // Call our update function with progress tracking
      const updatedProject = await updateProjectWithNewAnalysis(
        token,
        projectData.id,
        projectData.url,
        'content-refresh', // run_type
        onProgress
      );
      
      // Update the UI with the new data
      // This is a simple approach - in a real app you might want to use stores or refresh the page
      if (updatedProject) {
        // Reload the page to show updated data
        window.location.reload();
      }
    } catch (error) {
      console.error('Error generating new content:', error);
      alert('Failed to generate new content. Please try again.');
    } finally {
      isGenerating = false;
    }
  }

  // Function to handle blog post generation
  function handleBlogPostGeneration(event: any) {
    alert(`Queuing full blog post generation for: ${event.detail.title}`);
    // Here you would call your API endpoint when implemented
  }

  onMount(() => {
    // Any initialization logic
  });
</script>

<div class="h-screen flex flex-col overflow-hidden bg-zinc-950 text-white">
  <!-- Project Header - fixed height -->
  <header class="py-4 px-6 z-10 bg-zinc-950">
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

  <!-- Tab Navigation - fixed height -->
  <div class="z-10 border-b border-zinc-800 bg-zinc-950">
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

  <!-- Main Content - Scrollable and takes remaining height -->
  <main class="flex-1 overflow-hidden">
    <div class="h-full max-w-7xl mx-auto p-6 overflow-y-auto pr-1" style="scrollbar-width: thin;">
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
            class="bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 px-4 py-2 rounded-md text-sm flex items-center gap-2 transition {isGenerating ? 'opacity-75 cursor-not-allowed' : ''}"
            disabled={isGenerating}
          >
            {#if isGenerating}
              <span class="animate-spin mr-2">⟳</span>
              {generationProgress} ({generationTimeElapsed}s)
            {:else}
              <span class="text-sm">+</span>
              Generate New Content
            {/if}
          </button>
        </div>

        {#if isGenerating}
          <div class="bg-purple-900/20 border border-purple-900 text-purple-200 p-4 rounded-lg mb-6">
            <h3 class="text-lg font-medium mb-2">Generating Fresh Content Analysis</h3>
            <p>Current status: {generationProgress}</p>
            <div class="w-full bg-zinc-800 rounded-full h-2 mt-2">
              <div class="bg-purple-500 h-2 rounded-full animate-pulse"></div>
            </div>
            <p class="text-xs mt-2">This may take several minutes. Please don't close this page.</p>
          </div>
        {/if}

        <section class="p-5">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Keywords Column -->
            <div class="border md:col-span-2 border-zinc-900 rounded-xl shadow-lg overflow-hidden">
              <SelectedKeywordsCard keywords={data.project.latest_run.result.analysis_data.create_content_plan.content_plan.seo.selected_keywords} />
            </div>
      
            <div class="border md:col-span-2 border-zinc-900 rounded-xl shadow-lg overflow-hidden mb-6">
              <KeywordTrendsCard trends={data.project.latest_run.result.analysis_data.create_content_plan.content_plan.seo.industry_keyword_trends} />
            </div>
          </div>
      
          <!-- Blog Post Outlines Column - Spans 2 columns -->
          <div class="lg:col-span-2 border border-zinc-900 rounded-xl shadow-lg overflow-hidden">
              <BlogPostOutlinesCard 
                outlines={data.project.latest_run.result.analysis_data.create_content_plan.content_plan.seo.blog_post_outlines} 
                on:generatePost={handleBlogPostGeneration}
              />
          </div>

          <div> 
            <Redditposts 
              redditPosts={redditPosts} 
            />
          </div>
        </section>

        <section class="mt-5">
          
        </section>
        
      {/if}

      {#if activeTab === 'competitors'}
        <!-- Competitor Analysis Tab -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold">Competitor Analysis</h2>
          <p class="text-zinc-400 text-sm mt-1">Analyze competitor strategies and find market gaps</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each data.project.latest_run.result.analysis_data.analyze_competitors.competitors_analysis as competitor}
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
    </div>
  </main>
</div>

<style>
  /* Custom scrollbar styling */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(39, 39, 42, 0.2); /* Zinc-800 with opacity */
    border-radius: 8px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(82, 82, 91, 0.6); /* Zinc-600 with opacity */
    border-radius: 8px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(113, 113, 122, 0.8); /* Zinc-500 with opacity */
  }
  
  /* For Firefox */
  .overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(82, 82, 91, 0.6) rgba(39, 39, 42, 0.2);
  }
</style>