<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import ProjectHeader from '$lib/components/ProjectHeader.svelte';
  import StatsOverview from '$lib/components/StatsOverview.svelte';
  import AiStrategySuggestion from '$lib/components/AiStrategySuggestion.svelte';
  import ContentPipeline from '$lib/components/ContentPipeline.svelte';
  import KeywordsOverview from '$lib/components/KeywordsOverview.svelte';
  import SocialContentPreview from '$lib/components/SocialContentPreview.svelte';
  import WeeklyCalendar from '$lib/components/WeeklyCalendar.svelte';
  import GenerationProgress from '$lib/components/GenerationProgress.svelte';
  
  export let data;

  let isGenerating = false;
  let generationProgress = '';
  let generationTimeElapsed = 0;
  let isGeneratingPost = false;
  let currentGeneratingPostIndex = -1;
  
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
  
  // Get stats summary
  const stats = {
    draftPosts: blogPosts.filter(post => !post.is_published).length,
    publishedPosts: blogPosts.filter(post => post.is_published).length,
    scheduledSocial: 12, // Example value
    keywordTargets: selectedKeywords.length,
    totalContentItems: blogPostOutlines.length + redditPosts.length + twitterPosts.length + linkedinPosts.length
  };

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
  
  // Generate sample posts for preview
  // function generateTwitterPosts() {
  //   return [
  //     {
  //       content: "🚀 Just launched: 5 ways AI is transforming SaaS marketing in 2025. Our latest data shows 78% of teams using AI marketing tools report higher ROI within 90 days.",
  //       hashtags: ["AI", "SaaSMarketing", "GrowthHacking"],
  //       likes: 47,
  //       retweets: 23,
  //       comments: 12
  //     },
  //     {
  //       content: "The key to scaling your SaaS? It's not more developers. It's smarter marketing automation. Here's how our clients are saving 20+ hours/week with AI content generation.",
  //       hashtags: ["MarketingAutomation", "SaaS", "AIMarketing"],
  //       likes: 35,
  //       retweets: 18,
  //       comments: 8
  //     },
  //     {
  //       content: "Thread: 10 SaaS marketing metrics you should track daily (but probably don't). First up: Customer Acquisition Cost (CAC) by channel.",
  //       hashtags: ["SaaS", "MarketingMetrics", "CAC"],
  //       likes: 64,
  //       retweets: 31,
  //       comments: 15
  //     }
  //   ];
  // }

  // function generateLinkedInPosts() {
  //   return [
  //     {
  //       content: "We analyzed 150+ SaaS companies to identify what separates the top performers from the rest. The results might surprise you - it's not product features or pricing that makes the biggest difference, but consistent, data-driven content marketing.",
  //       type: "Research Report",
  //       likes: 124,
  //       comments: 32,
  //       shares: 46
  //     },
  //     {
  //       content: "Looking to scale your SaaS marketing without hiring an army of writers and designers? Join me this Thursday for a live workshop on \"Building an AI-Powered Content Engine for SaaS Growth\".",
  //       type: "Event Promotion",
  //       likes: 87,
  //       comments: 14,
  //       shares: 22
  //     }
  //   ];
  // }
  
  // Import necessary functions from db.js
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

<div class="h-screen overflow-y-scroll flex flex-col bg-zinc-950 text-white">
  <ProjectHeader 
    projectData={projectData} 
    isGenerating={isGenerating}
    on:generateContent={generateNewContent}
  />

  <main class="flex-grow">
    <div class="max-w-7xl mx-auto px-6 py-6">
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

      <StatsOverview stats={stats} />

      <AiStrategySuggestion suggestion={contentCalendarSuggestion} />

      <ContentPipeline 
        outlines={blogPostOutlines}
        blogPosts={blogPosts}
        projectId={projectData.id}
        isGeneratingPost={isGeneratingPost}
        currentGeneratingPostIndex={currentGeneratingPostIndex}
        on:generatePost={handleBlogPostGeneration}
      />

      <KeywordsOverview 
        keywords={selectedKeywords} 
        projectId={projectData.id}
      />
      
      <SocialContentPreview 
        twitterPosts={twitterPosts}
        linkedinPosts={linkedinPosts}
        redditPosts={redditPosts}
        projectId={projectData.id}
        {businessData}
      />

      <!-- <WeeklyCalendar projectId={projectData.id} /> -->
    </div>
  </main>
</div>

<style>
  /* Global styles only - component-specific styles should be in their components */
  :global(*) {
    transition: background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
  }

  /* Custom scrollbar for the entire app */
  :global(::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(::-webkit-scrollbar-track) {
    background: rgba(24, 24, 27, 0.8);
  }

  :global(::-webkit-scrollbar-thumb) {
    background: rgba(113, 113, 122, 0.4);
    border-radius: 4px;
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background: rgba(113, 113, 122, 0.6);
  }

  /* Focus styles for accessibility */
  :global(button:focus), :global(a:focus), :global(input:focus), :global(select:focus), :global(textarea:focus) {
    outline: 2px solid rgba(236, 72, 153, 0.5);
    outline-offset: 2px;
  }

  /* Form element styling */
  :global(input), :global(select), :global(textarea) {
    background-color: rgba(39, 39, 42, 0.8);
    border: 1px solid rgba(63, 63, 70, 0.8);
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    color: white;
    transition: border-color 0.2s ease;
  }

  :global(input:focus), :global(select:focus), :global(textarea:focus) {
    border-color: #a855f7;
  }
</style>