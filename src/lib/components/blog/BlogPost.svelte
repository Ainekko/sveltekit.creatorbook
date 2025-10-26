<script lang="ts">
  // src/lib/components/blog/BlogPost.svelte
  import { format } from 'date-fns';
  import { renderMarkdown } from '$lib/components/blog/utils/markdown';
  import type { BlogPost as BlogPostType } from '$lib/api/blog';
  
  export let post: BlogPostType;
  export let showMetadata = true;
  
  $: htmlContent = renderMarkdown(post.content || '');
  $: formattedDate = format(new Date(post.created_at), 'MMMM dd, yyyy');
  $: readingTime = Math.ceil(post.word_count / 200);
  
  // Generate gradient based on post title hash for consistent colors
  const getGradient = (title: string) => {
    const gradients = [
      'from-blue-500 via-purple-500 to-pink-500',
      'from-emerald-500 via-teal-500 to-cyan-500',
      'from-orange-500 via-red-500 to-pink-500',
      'from-purple-500 via-indigo-500 to-blue-500',
      'from-amber-500 via-orange-500 to-red-500',
      'from-green-500 via-emerald-500 to-teal-500'
    ];
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };
  
  $: gradientClass = getGradient(post.title);
</script>

<article class="blog-post">
  {#if showMetadata}
    <!-- Hero Section with Gradient -->
    <div class="hero-section relative overflow-hidden bg-gradient-to-br {gradientClass} rounded-3xl mb-12">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl gentle-float"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl gentle-float" style="animation-delay: -2s;"></div>
      
      <header class="post-header relative z-10 px-8 py-16 md:px-12 md:py-20">
        <div class="post-meta-top flex items-center gap-3 mb-6">
          <span class="content-type bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs uppercase font-semibold tracking-wider border border-white/30">
            {post.content_type || 'Article'}
          </span>
          {#if post.primary_keyword}
            <span class="primary-keyword bg-white text-zinc-900 px-4 py-1.5 rounded-full text-xs font-semibold">
              #{post.primary_keyword}
            </span>
          {/if}
        </div>
        
        <h1 class="post-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          {post.title}
        </h1>
        
        {#if post.meta_description}
          <p class="post-description text-xl md:text-2xl text-white/90 mb-8 max-w-3xl leading-relaxed font-light">
            {post.meta_description}
          </p>
        {/if}
        
        <div class="post-meta-bottom flex items-center gap-3 text-white/80 text-sm font-medium">
          <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <time datetime={post.created_at}>{formattedDate}</time>
          </div>
          <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{readingTime} min read</span>
          </div>
          <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>{post.word_count.toLocaleString()} words</span>
          </div>
        </div>
      </header>
    </div>
  {/if}
  
  <!-- Content Area with Beautiful Typography -->
  <div class="content-wrapper max-w-3xl mx-auto px-4">
    <div class="post-content prose prose-lg">
      {@html htmlContent}
    </div>
    
    {#if post.secondary_keywords?.length > 0}
      <footer class="post-footer mt-16 pt-8 border-t border-zinc-200">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center gentle-float">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
          </div>
          <h3 class="topics-heading text-lg font-semibold text-zinc-900">Related Topics</h3>
        </div>
        <div class="topics-list flex flex-wrap gap-2">
          {#each post.secondary_keywords as keyword, index}
            <span 
              class="topic-tag bg-gradient-to-br from-zinc-50 to-zinc-100 hover:from-zinc-100 hover:to-zinc-200 text-zinc-700 px-4 py-2 rounded-full text-sm font-medium border border-zinc-200 transition-all cursor-pointer hover:shadow-sm hover:scale-105"
              style="animation-delay: -{index * 0.1}s;"
            >
              {keyword}
            </span>
          {/each}
        </div>
      </footer>
    {/if}
  </div>
</article>

<style>
  .blog-post {
    margin: 0 auto;
    padding-bottom: 4rem;
  }
  
  .hero-section {
    position: relative;
    min-height: 400px;
  }
  
  /* Gentle Float Animation */
  @keyframes gentle-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(3deg); }
  }
  
  .gentle-float {
    animation: gentle-float 6s ease-in-out infinite;
  }
  
  /* Enhanced Prose Styling */
  :global(.prose) {
    color: #3f3f46;
    line-height: 1.8;
    font-size: 1.125rem;
  }
  
  :global(.prose h2) {
    font-size: 2rem;
    font-weight: 700;
    color: #18181b;
    margin: 3rem 0 1.5rem 0;
    line-height: 1.3;
    position: relative;
    padding-left: 1.5rem;
  }
  
  :global(.prose h2::before) {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 4px;
    height: 2rem;
    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
    border-radius: 2px;
  }
  
  :global(.prose h3) {
    font-size: 1.5rem;
    font-weight: 600;
    color: #27272a;
    margin: 2.5rem 0 1rem 0;
    line-height: 1.4;
  }
  
  :global(.prose h4) {
    font-size: 1.25rem;
    font-weight: 600;
    color: #3f3f46;
    margin: 2rem 0 0.75rem 0;
  }
  
  :global(.prose p) {
    margin: 1.5rem 0;
    color: #52525b;
  }
  
  :global(.prose strong) {
    color: #18181b;
    font-weight: 600;
  }
  
  :global(.prose a) {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    border-bottom: 2px solid #3b82f620;
    transition: all 0.2s;
    padding-bottom: 1px;
  }
  
  :global(.prose a:hover) {
    color: #2563eb;
    border-bottom-color: #2563eb;
  }
  
  :global(.prose ul, .prose ol) {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }
  
  :global(.prose li) {
    margin: 0.75rem 0;
    padding-left: 0.5rem;
  }
  
  :global(.prose ul li) {
    position: relative;
  }
  
  :global(.prose ul li::marker) {
    color: #8b5cf6;
    font-weight: bold;
  }
  
  :global(.prose code) {
    background: linear-gradient(to right, #fef3c7, #fed7aa);
    color: #dc2626;
    padding: 0.2rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.9em;
    font-family: 'Monaco', 'Courier New', monospace;
    font-weight: 500;
    border: 1px solid #fbbf2420;
  }
  
  :global(.prose pre) {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    color: #f9fafb;
    padding: 1.5rem;
    border-radius: 1rem;
    overflow-x: auto;
    margin: 2rem 0;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    border: 1px solid #374151;
  }
  
  :global(.prose pre code) {
    background: transparent;
    color: inherit;
    padding: 0;
    border: none;
  }
  
  :global(.prose blockquote) {
    border-left: 4px solid #8b5cf6;
    padding-left: 1.5rem;
    padding: 1rem 1.5rem;
    font-style: italic;
    color: #52525b;
    margin: 2rem 0;
    background: linear-gradient(to right, #f9fafb, transparent);
    border-radius: 0 0.5rem 0.5rem 0;
    position: relative;
  }
  
  :global(.prose blockquote::before) {
    content: '"';
    position: absolute;
    top: -0.5rem;
    left: 1rem;
    font-size: 4rem;
    color: #8b5cf620;
    font-family: Georgia, serif;
  }
  
  :global(.prose img) {
    max-width: 100%;
    height: auto;
    border-radius: 1rem;
    margin: 2.5rem 0;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid #f4f4f5;
  }
  
  :global(.prose table) {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 2rem 0;
    overflow: hidden;
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  :global(.prose th) {
    background: linear-gradient(to bottom, #f9fafb, #f4f4f5);
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    border: 1px solid #e4e4e7;
    color: #18181b;
  }
  
  :global(.prose td) {
    padding: 1rem;
    border: 1px solid #e4e4e7;
    color: #52525b;
  }
  
  :global(.prose tr:hover td) {
    background-color: #fafafa;
  }
  
  .topic-tag {
    transition: all 0.2s ease;
    animation: gentle-float 6s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    .hero-section {
      min-height: 300px;
    }
    
    .post-header {
      padding: 2rem 1.5rem !important;
    }
    
    .post-title {
      font-size: 2rem !important;
    }
    
    .post-description {
      font-size: 1.125rem !important;
    }
    
    .post-meta-bottom {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 0.5rem !important;
    }
    
    :global(.prose h2) {
      font-size: 1.5rem;
    }
  }
</style>