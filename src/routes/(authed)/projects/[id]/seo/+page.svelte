<script lang="ts">
    import BlogPostOutlinesCard from '$lib/components/BlogPostOutlinesCard.svelte';
    import KeywordTrendsCard from '$lib/components/KeywordTrendsCard.svelte';
    import SelectedKeywordsCard from '$lib/components/SelectedKeywordsCard.svelte';
  
    export let data;

    let seoData = data.project.latest_run.result.analysis_data.create_content_plan.content_plan.seo
  
    // Project Data from backend
    const projectData = {
      name: data?.project?.url || "N/A",
      url: data?.project?.url || "N/A",
      startDate: data?.project?.created_at?.split("T")[0] || "N/A"
    };
  
    // Function to handle blog post generation
    function handleBlogPostGeneration(event: any) {
      alert(`Queuing full blog post generation for: ${event.detail.title}`);
      // Here you would call your API endpoint when implemented
    }
  </script>
  
  <section class="p-5">
    
  
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Keywords Column -->
      <div class="border md:col-span-2 border-zinc-900 rounded-xl shadow-lg overflow-hidden">
        <SelectedKeywordsCard keywords={seoData.selected_keywords} />
      </div>

      <div class="border md:col-span-2 border-zinc-900 rounded-xl shadow-lg overflow-hidden mb-6">
        <KeywordTrendsCard trends={seoData.industry_keyword_trends} />
      </div>
      
      
    </div>

    <!-- Blog Post Outlines Column - Spans 2 columns -->
    <div class="lg:col-span-2 border border-zinc-900 rounded-xl shadow-lg overflow-hidden">
        <BlogPostOutlinesCard 
          outlines={seoData.blog_post_outlines} 
          on:generatePost={handleBlogPostGeneration}
        />
    </div>
  </section>