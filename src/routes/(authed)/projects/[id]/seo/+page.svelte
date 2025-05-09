<script lang="ts">
  import BlogPostOutlinesCard from '$lib/components/BlogPostOutlinesCard.svelte';
  import KeywordTrendsCard from '$lib/components/KeywordTrendsCard.svelte';
  import SelectedKeywordsCard from '$lib/components/SelectedKeywordsCard.svelte';
  import { fade } from 'svelte/transition';

  import { 
    saveBlogPostToDjango,
    pollBlogGenerationTask,
    createBlogPostFromOutline
  } from '$lib/db';

  export let data;

  let seoData = data.project.latest_run.result.analysis_data.create_content_plan.content_plan.seo;
  let blogPosts = data?.project?.latest_run?.blog_posts || [];
  let isGeneratingPost = false;
  let currentGeneratingPostIndex = -1;
  let generationProgress = '';
  let selectedPost = null;
  let showPreview = false;

  // Project Data from backend
  const projectData = {
    name: data?.project?.url || "N/A",
    url: data?.project?.url || "N/A",
    startDate: data?.project?.created_at?.split("T")[0] || "N/A"
  };

  // Filter blog posts by status
  $: draftPosts = blogPosts.filter(post => !post.is_published);
  $: publishedPosts = blogPosts.filter(post => post.is_published);

  // Connect outlines with their generated posts
  $: outlines = data.project.latest_run.result.analysis_data.create_content_plan.content_plan.seo.blog_post_outlines || [];
  $: outlinePostMap = createOutlinePostMap(outlines, blogPosts);

  function createOutlinePostMap(outlines, posts) {
    const map = new Map();
    
    outlines.forEach((outline, index) => {
      const matchingPost = posts.find(post => 
        post.title.toLowerCase().includes(outline.title.toLowerCase()) || 
        (post.outline_index !== undefined && post.outline_index === index)
      );
      
      map.set(index, {
        outline,
        post: matchingPost || null,
        index
      });
    });
    
    return map;
  }
  
  function togglePostPreview(post) {
    if (selectedPost && selectedPost.id === post.id) {
      showPreview = !showPreview;
    } else {
      selectedPost = post;
      showPreview = true;
    }
  }
  
  function closePreview() {
    showPreview = false;
  }
    
  async function handleBlogPostGeneration(event) {
    const outlineIndex = event.detail.index;
    const outline = event.detail.outline;
    const token = localStorage.getItem('token');

    isGeneratingPost = true;
    currentGeneratingPostIndex = outlineIndex;

    try {
      const { taskId } = await createBlogPostFromOutline(
        data.project.latest_run.id,
        outlineIndex,
        outline
      );

      const onProgress = (status) => {
        generationProgress = `Generating blog post ${outlineIndex + 1}: ${status}`;
      };
      const generatedContent = await pollBlogGenerationTask(taskId, onProgress);

      const savedPost = await saveBlogPostToDjango(
        {
          llm_run_id: data.project.latest_run.id,
          outline_index: outlineIndex,
          content: generatedContent,
        },
        token
      );

      // Update local blogPosts array
      if (savedPost) {
        blogPosts = [...blogPosts, savedPost];
        outlinePostMap = createOutlinePostMap(outlines, blogPosts);
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

  async function handlePublishPost(event) {
    const post = event.detail.post;
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`/api/blog-posts/${post.slug}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to publish post');
      }
      
      blogPosts = blogPosts.map(p => 
        p.id === post.id ? { ...p, is_published: true } : p
      );
      
    } catch (error) {
      console.error('Error publishing post:', error);
      alert(`Failed to publish post: ${error.message}`);
    }
  }

  async function handleUnpublishPost(event) {
    const post = event.detail.post;
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`/api/blog-posts/${post.slug}/unpublish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to unpublish post');
      }
      
      blogPosts = blogPosts.map(p => 
        p.id === post.id ? { ...p, is_published: false } : p
      );
      
    } catch (error) {
      console.error('Error unpublishing post:', error);
      alert(`Failed to unpublish post: ${error.message}`);
    }
  }

  async function handleEditPost(event) {
    const post = event.detail.post;
    window.location.href = `${projectData.id}/seo/blogpost/${post.slug}`;
  }
  
  // Function to extract plain text from HTML for previews
  function extractTextFromHtml(html) {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
</script>

<section class="flex flex-col w-full h-screen overflow-hidden">
 
  
  <!-- Main content area with fixed height and scrolling -->
  <div class="flex-1 overflow-y-auto">
    <div class="p-5">
      <!-- Content Calendar Suggestion -->
      <div class="mb-6 bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden p-5">
        <div class="flex items-center mb-4">
          <h3 class="text-lg font-bold text-white">Content Calendar Suggestion</h3>
          <div class="ml-auto text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full">
            AI Recommendation
          </div>
        </div>
        <p class="text-zinc-300">
          {data.project.latest_run.result.analysis_data.create_content_plan.content_plan.seo.content_calendar_suggestion}
        </p>
      </div>
      
      <!-- Keywords Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Selected Keywords Card -->
        <div class="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
          <SelectedKeywordsCard keywords={data.project.latest_run.result.analysis_data.create_content_plan.content_plan.seo.selected_keywords} />
        </div>
        
        <!-- Keyword Trends Card -->
        <div class="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
          <KeywordTrendsCard trends={data.project.latest_run.result.analysis_data.create_content_plan.content_plan.seo.industry_keyword_trends} />
        </div>
      </div>
      
      {#if isGeneratingPost}
        <div class="mb-4 bg-violet-900/20 border border-violet-500/30 rounded-lg p-4 text-violet-300">
          <div class="flex items-center">
            <div class="animate-spin mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                <path d="M12 2C6.5 2 2 6.5 2 12"></path>
              </svg>
            </div>
            <span>{generationProgress || 'Generating blog post...'}</span>
          </div>
        </div>
      {/if}
      
      <!-- Blog Post Outlines -->
      <div class="grid grid-cols-1 gap-4">
        {#each [...outlinePostMap.values()] as item}
          <div class="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden hover:border-pink-500/30 transition-all duration-200 p-5">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="font-bold text-white text-lg mb-1">{item.outline.title}</h3>
                <p class="text-sm text-zinc-400">{item.outline.meta_description || "No description available"}</p>
              </div>
              <div>
                {#if item.post}
                  <span class="px-3 py-1 rounded-full text-xs font-medium {item.post.is_published ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}">
                    {item.post.is_published ? 'Published' : 'Draft'}
                  </span>
                {:else}
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-violet-900/30 text-violet-400">
                    Outline
                  </span>
                {/if}
              </div>
            </div>
            
            <!-- Only show outline structure if no post is available -->
            {#if !item.post}
              <div class="mb-5">
                <h4 class="text-sm font-medium text-zinc-300 mb-2">Outline Structure:</h4>
                <ul class="pl-5 list-disc text-sm text-zinc-400 space-y-1">
                  {#if item.outline.outline_sections && Array.isArray(item.outline.outline_sections)}
                    {#each item.outline.outline_sections.slice(0, 5) as section}
                      <li>{section}</li>
                    {/each}
                    {#if item.outline.outline_sections.length > 5}
                      <li class="text-zinc-500 list-none">+ {item.outline.outline_sections.length - 5} more sections</li>
                    {/if}
                  {:else}
                    <li class="text-zinc-500">No outline sections available</li>
                  {/if}
                </ul>
              </div>
            {/if}

            <!-- Post Preview (if exists) - Enhanced focus area -->
            {#if item.post && item.post.content}
              <div class="mb-5">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-zinc-300">Content Preview:</h4>
                  <button 
                    class="text-xs text-violet-400 hover:text-violet-300 underline"
                    on:click={() => togglePostPreview(item.post)}
                  >
                    {selectedPost && selectedPost.id === item.post.id && showPreview ? 'Hide Preview' : 'View Full Preview'}
                  </button>
                </div>
                <div class="bg-zinc-800/50 rounded p-4 text-sm text-zinc-300">
                  <p class="line-clamp-5">{extractTextFromHtml(item.post.content).slice(0, 300)}...</p>
                </div>
              </div>
            {/if}
            
            <!-- Keywords -->
            <div class="mb-5">
              <h4 class="text-sm font-medium text-zinc-300 mb-2">Target Keywords:</h4>
              <div class="flex gap-2 flex-wrap">
                {#if item.outline.primary_keyword}
                  <span class="bg-pink-900/30 text-pink-400 px-2 py-0.5 rounded text-xs">
                    {item.outline.primary_keyword} <span class="text-zinc-400">(primary)</span>
                  </span>
                {/if}
                
                {#if item.outline.secondary_keywords && Array.isArray(item.outline.secondary_keywords)}
                  {#each item.outline.secondary_keywords.slice(0, 5) as keyword}
                    <span class="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded text-xs">{keyword}</span>
                  {/each}
                  {#if item.outline.secondary_keywords.length > 5}
                    <span class="text-zinc-500 text-xs">+{item.outline.secondary_keywords.length - 5} more</span>
                  {/if}
                {/if}
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex gap-3 mt-4">
              {#if !item.post}
                <button 
                  on:click={() => handleBlogPostGeneration({detail: {index: item.index, outline: item.outline}})}
                  class="py-2 px-4 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 rounded text-sm font-medium transition-all {isGeneratingPost && currentGeneratingPostIndex === item.index ? 'opacity-75 cursor-not-allowed' : ''}"
                  disabled={isGeneratingPost}
                >
                  {isGeneratingPost && currentGeneratingPostIndex === item.index ? 
                    'Generating...' : 
                    'Generate Full Post'}
                </button>
              {:else}
                <button 
                  on:click={() => handleEditPost({detail: {post: item.post}})}
                  class="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 rounded text-sm font-medium"
                >
                  Edit Post
                </button>
                
                {#if item.post.is_published}
                  <button 
                    on:click={() => handleUnpublishPost({detail: {post: item.post}})}
                    class="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 rounded text-sm font-medium text-red-400"
                  >
                    Unpublish
                  </button>
                {:else}
                  <button 
                    on:click={() => handlePublishPost({detail: {post: item.post}})}
                    class="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 rounded text-sm font-medium text-green-400"
                  >
                    Publish
                  </button>
                {/if}
              {/if}
              
              {#if item.post}
                <button 
                  class="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 rounded text-sm font-medium"
                  on:click={() => togglePostPreview(item.post)}
                >
                  {selectedPost && selectedPost.id === item.post.id && showPreview ? 'Hide Preview' : 'Preview'}
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Modal for full blog post preview -->
  {#if showPreview && selectedPost}
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" 
         transition:fade={{ duration: 200 }}
         on:click={closePreview}>
      <div class="bg-zinc-900 rounded-lg border border-zinc-700 w-full max-w-4xl max-h-[90vh] overflow-hidden"
           on:click|stopPropagation>
        <div class="flex items-center justify-between p-4 border-b border-zinc-800">
          <h3 class="font-bold text-white text-lg">{selectedPost.title}</h3>
          <button class="text-zinc-400 hover:text-white" on:click={closePreview}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-4 overflow-y-auto max-h-[calc(90vh-64px)]">
          <div class="bg-white rounded-lg p-6 text-black">
            {@html selectedPost.content}
          </div>
        </div>
        <div class="flex justify-end p-4 border-t border-zinc-800">
          <button 
            class="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 rounded text-sm font-medium mr-2"
            on:click={closePreview}
          >
            Close
          </button>
          <button 
            on:click={() => handleEditPost({detail: {post: selectedPost}})}
            class="py-2 px-4 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 rounded text-sm font-medium"
          >
            Edit Post
          </button>
        </div>
      </div>
    </div>
  {/if}
</section>