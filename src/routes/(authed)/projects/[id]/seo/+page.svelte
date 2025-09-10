<script lang="ts">
   
   // Old seo dashboard /routes/projects/[id]/seo


	import AiStrategySuggestion from '$lib/components/AiStrategySuggestion.svelte';

  export let data;

  let seoData = data.project.latest_run.result.analysis_data.content_plan?.seo || [];
  let blogPosts = data?.project?.latest_run?.blog_posts || [];
  let isGeneratingPost = false;
  let currentGeneratingPostIndex = -1;
  let generationProgress = ''; // This was missing!
  let selectedPost = null;
  let showPreview = false;
  let expandedOutlines = new Set();
  let copiedItem = null;

  import { 
    saveBlogPostToDjango,
    pollBlogGenerationTask,
    createBlogPostFromOutline
  } from '$lib/db';

  // Project Data from backend
  const projectData = {
    name: data?.project?.url || "N/A",
    url: data?.project?.url || "N/A",
    startDate: data?.project?.created_at?.split("T")[0] || "N/A"
  };

  // Connect outlines with their generated posts
  $: outlines = data.project.latest_run.result.analysis_data.content_plan?.seo.blog_post_outlines || [];
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
  
  // Copy functionality
  async function copyToClipboard(content, itemId) {
    try {
      await navigator.clipboard.writeText(content);
      copiedItem = itemId;
      setTimeout(() => {
        copiedItem = null;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  // Toggle expanded outline
  function toggleOutline(index) {
    if (expandedOutlines.has(index)) {
      expandedOutlines.delete(index);
    } else {
      expandedOutlines.add(index);
    }
    expandedOutlines = expandedOutlines;
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
    selectedPost = null;
  }
  
  // Extract plain text from HTML for previews
  function extractTextFromHtml(html) {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  // Get outline structure as text for copying
  function getOutlineText(outline) {
    let text = `${outline.title}\n\n`;
    if (outline.meta_description) {
      text += `Description: ${outline.meta_description}\n\n`;
    }
    if (outline.primary_keyword) {
      text += `Primary Keyword: ${outline.primary_keyword}\n`;
    }
    if (outline.secondary_keywords && outline.secondary_keywords.length > 0) {
      text += `Secondary Keywords: ${outline.secondary_keywords.join(', ')}\n\n`;
    }
    if (outline.outline_sections && outline.outline_sections.length > 0) {
      text += `Outline:\n`;
      outline.outline_sections.forEach((section, index) => {
        text += `${index + 1}. ${section}\n`;
      });
    }
    return text;
  }

  // FIXED: Restored the working generation function from the first file
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

  function handleEditPost(post) {
    alert(`Edit post functionality would be implemented here for: "${post.title}"`);
  }

  function handlePublishPost(post) {
    // Optimistic update
    blogPosts = blogPosts.map(p => 
      p.id === post.id ? { ...p, is_published: true } : p
    );
    alert(`"${post.title}" has been published!`);
  }

  function handleUnpublishPost(post) {
    // Optimistic update
    blogPosts = blogPosts.map(p => 
      p.id === post.id ? { ...p, is_published: false } : p
    );
    alert(`"${post.title}" has been unpublished!`);
  }
</script>

<div class="max-w-6xl mx-auto p-4">
  <!-- Header -->
  <div class="mb-6">
    <h1 class="text-3xl font-bold text-white mb-2">Blog Content Management</h1>
    <p class="text-zinc-400">Manage your SEO-optimized blog posts and outlines</p>
  </div>

  <!-- Generation Progress Indicator (RESTORED from first file) -->
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

  

  <AiStrategySuggestion suggestion={seoData?.content_calendar_suggestion} />


  <!-- Quick Stats -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-zinc-400 text-sm">Total Outlines</p>
          <p class="text-2xl font-bold text-white">{outlines.length}</p>
        </div>
        <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>
    </div>
    
    <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-zinc-400 text-sm">Generated Posts</p>
          <p class="text-2xl font-bold text-white">{blogPosts.length}</p>
        </div>
        <div class="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
      </div>
    </div>
    
    <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-zinc-400 text-sm">Published</p>
          <p class="text-2xl font-bold text-white">{blogPosts.filter(p => p.is_published).length}</p>
        </div>
        <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- Blog Post Cards -->
  <div class="space-y-4">
    {#each [...outlinePostMap.values()] as item}
      <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-xl font-bold text-white mb-2">{item.outline.title}</h3>
            {#if item.outline.meta_description}
              <p class="text-zinc-400 leading-relaxed">{item.outline.meta_description}</p>
            {/if}
          </div>
          
          <div class="flex items-center gap-3 ml-4">
            <!-- Copy Button -->
            <button 
              class="p-2 text-zinc-400 hover:text-white transition-colors"
              on:click={() => copyToClipboard(item.post ? extractTextFromHtml(item.post.content) : getOutlineText(item.outline), `item-${item.index}`)}
              title="Copy content"
            >
              {#if copiedItem === `item-${item.index}`}
                <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              {:else}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              {/if}
            </button>
            
            <!-- Status Badge -->
            {#if item.post}
              <span class="px-3 py-1 rounded-full text-sm font-medium {item.post.is_published ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}">
                {item.post.is_published ? '✓ Published' : '📝 Draft'}
              </span>
            {:else}
              <span class="px-3 py-1 rounded-full text-sm font-medium bg-blue-900/30 text-blue-400">
                📋 Outline Only
              </span>
            {/if}
          </div>
        </div>

        <!-- Keywords -->
        <div class="mb-4">
          <div class="flex flex-wrap gap-2">
            {#if item.outline.primary_keyword}
              <span class="bg-pink-900/30 text-pink-300 px-3 py-1 rounded-full text-sm font-medium">
                🎯 {item.outline.primary_keyword}
              </span>
            {/if}
            
            {#if item.outline.secondary_keywords && item.outline.secondary_keywords.length > 0}
              {#each item.outline.secondary_keywords.slice(0, 3) as keyword}
                <span class="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm">{keyword}</span>
              {/each}
              {#if item.outline.secondary_keywords.length > 3}
                <span class="text-zinc-500 text-sm py-1">+{item.outline.secondary_keywords.length - 3} more</span>
              {/if}
            {/if}
          </div>
        </div>

        <!-- Content Preview -->
        {#if item.post?.content}
          <div class="mb-4 bg-zinc-800/50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-medium text-zinc-300">📄 Generated Content</h4>
              <button 
                class="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                on:click={() => togglePostPreview(item.post)}
              >
                View Full Post →
              </button>
            </div>
            <p class="text-sm text-zinc-400 leading-relaxed line-clamp-3">
              {extractTextFromHtml(item.post.content).slice(0, 200)}...
            </p>
          </div>
        {:else if item.outline.outline_sections}
          <!-- Outline Sections -->
          <div class="mb-4">
            <button 
              class="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors mb-2"
              on:click={() => toggleOutline(item.index)}
            >
              <svg class="w-4 h-4 transition-transform {expandedOutlines.has(item.index) ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              📝 Outline Structure ({item.outline.outline_sections.length} sections)
            </button>
            
            {#if expandedOutlines.has(item.index)}
              <div class="bg-zinc-800/30 rounded-lg p-4">
                <ul class="space-y-2">
                  {#each item.outline.outline_sections as section, sectionIndex}
                    <li class="flex items-start gap-2 text-sm text-zinc-400">
                      <span class="text-zinc-500 font-mono text-xs mt-0.5">{sectionIndex + 1}.</span>
                      <span class="leading-relaxed">{section}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Action Buttons (FIXED: Restored proper event handling) -->
        <div class="flex flex-wrap gap-3">
          {#if !item.post}
            <button 
              on:click={() => handleBlogPostGeneration({detail: {index: item.index, outline: item.outline}})}
              class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-sm font-medium transition-all transform hover:scale-105 {isGeneratingPost && currentGeneratingPostIndex === item.index ? 'opacity-75 cursor-not-allowed' : ''}"
              disabled={isGeneratingPost}
            >
              {isGeneratingPost && currentGeneratingPostIndex === item.index ? 
                '⏳ Generating...' : 
                '✨ Generate Full Post'}
            </button>
          {:else}
            <button 
              on:click={() => handleEditPost(item.post)}
              class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
            >
              ✏️ Edit Post
            </button>
            
            {#if item.post.is_published}
              <button 
                on:click={() => handleUnpublishPost(item.post)}
                class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
              >
                📤 Unpublish
              </button>
            {:else}
              <button 
                on:click={() => handlePublishPost(item.post)}
                class="px-4 py-2 bg-green-900/30 hover:bg-green-900/50 rounded-lg text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
              >
                🚀 Publish
              </button>
            {/if}
            
            <button 
              class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
              on:click={() => togglePostPreview(item.post)}
            >
              👁️ Preview
            </button>
          {/if}
          
          <button 
            class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
            on:click={() => copyToClipboard(item.post ? extractTextFromHtml(item.post.content) : getOutlineText(item.outline), `item-${item.index}`)}
          >
            📋 Copy {item.post ? 'Post' : 'Outline'}
          </button>
        </div>
      </div>
    {/each}
  </div>

  <!-- Empty State -->
  {#if outlines.length === 0}
    <div class="text-center py-12">
      <div class="w-16 h-16 mx-auto mb-4 bg-zinc-800 rounded-full flex items-center justify-center">
        <svg class="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-white mb-1">No blog outlines yet</h3>
      <p class="text-zinc-400">Generate some SEO content analysis to get started.</p>
    </div>
  {/if}
</div>

<!-- Full Post Preview Modal -->
{#if showPreview && selectedPost}
  <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" 
       on:click={closePreview}>
    <div class="bg-zinc-900 rounded-lg border border-zinc-700 w-full max-w-4xl max-h-[90vh] overflow-hidden"
         on:click|stopPropagation>
      <div class="flex items-center justify-between p-4 border-b border-zinc-800">
        <h3 class="font-bold text-white text-lg">{selectedPost.title}</h3>
        <button class="text-zinc-400 hover:text-white transition-colors" on:click={closePreview}>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <div class="bg-white rounded-lg p-6 text-gray-900 prose prose-lg max-w-none">
          {@html selectedPost.content}
        </div>
      </div>
      <div class="flex justify-between items-center p-4 border-t border-zinc-800">
        <button 
          class="px-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          on:click={() => copyToClipboard(extractTextFromHtml(selectedPost.content), 'modal-copy')}
        >
          {copiedItem === 'modal-copy' ? '✓ Copied!' : '📋 Copy Content'}
        </button>
        <div class="flex gap-2">
          <button 
            class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
            on:click={closePreview}
          >
            Close
          </button>
          <button 
            on:click={() => handleEditPost(selectedPost)}
            class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-sm font-medium transition-all"
          >
            ✏️ Edit Post
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}