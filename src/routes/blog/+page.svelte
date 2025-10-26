<script lang="ts">
  // src/routes/blog/+page.svelte
  import { format } from 'date-fns';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { blogApi } from '$lib/api/blog';
  import SEO from '$lib/components/blog/SEO.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  $: posts = data.posts;
  $: pagination = data.pagination;
  
  let prefetchedPosts = new Set<string>();
  
  // Prefetch post on hover
  function handlePostHover(postId: string) {
    if (!prefetchedPosts.has(postId)) {
      prefetchedPosts.add(postId);
      blogApi.prefetchPost(postId);
    }
  }
  
  // Optimistic navigation with loading state
  let navigating = false;
  let targetPostId: string | null = null;
  
  async function navigateToPost(e: MouseEvent, postId: string) {
    e.preventDefault();
    navigating = true;
    targetPostId = postId;
    
    // Navigate after a tiny delay to show loading state
    setTimeout(() => {
      goto(`/blog/${postId}`);
    }, 50);
  }
  
  // Generate gradient for each post
  const getGradient = (index: number) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-emerald-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-purple-500 to-pink-600',
      'from-amber-500 to-orange-600',
      'from-green-500 to-emerald-600',
      'from-indigo-500 to-blue-600',
      'from-pink-500 to-rose-600',
      'from-cyan-500 to-blue-600'
    ];
    return gradients[index % gradients.length];
  };
  
  // Prefetch next page on mount if exists
  onMount(() => {
    if (pagination.has_next) {
      setTimeout(() => {
        blogApi.getPosts(pagination.page + 1, pagination.limit).catch(() => {});
      }, 1000);
    }
  });
</script>

<SEO
  title="Blog - Latest Articles"
  description="Read our latest blog posts and articles"
  type="website"
  url="/blog"
/>

<!-- Loading Overlay -->
{#if navigating}
  <div class="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity">
    <div class="flex flex-col items-center gap-4">
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-zinc-600 font-medium">Loading article...</p>
    </div>
  </div>
{/if}

<!-- Decorative Background -->
<div class="fixed inset-0 -z-10 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
  <div class="absolute top-20 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl gentle-float"></div>
  <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl gentle-float" style="animation-delay: -2s;"></div>
  <div class="absolute bottom-20 left-1/2 w-96 h-96 bg-orange-200/15 rounded-full blur-3xl gentle-float" style="animation-delay: -4s;"></div>
</div>

<div class="max-w-7xl mx-auto px-4 py-12 md:py-20">
  <!-- Hero Header -->
  <header class="mb-16 text-center relative">
    <div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-zinc-200 rounded-full px-5 py-2 mb-6 shadow-sm gentle-float">
      <div class="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
      <span class="text-sm font-medium text-zinc-700">Fresh insights & stories</span>
    </div>
    
    <h1 class="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 leading-tight">
      Latest <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Articles</span>
    </h1>
    
    <p class="text-xl md:text-2xl text-zinc-600 max-w-2xl mx-auto font-light">
      Discover insights, tutorials, and stories to help you grow
    </p>
    
    <div class="absolute -top-10 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 blur-2xl gentle-float"></div>
    <div class="absolute -bottom-10 right-1/4 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-10 blur-2xl gentle-float" style="animation-delay: -2s;"></div>
  </header>

  <!-- Featured/Latest Post -->
  {#if posts.length > 0}
    <div class="mb-16">
      <div class="relative group">
        <a 
          href="/blog/{posts[0].id}" 
          class="block"
          on:mouseenter={() => handlePostHover(posts[0].id)}
          on:click={(e) => navigateToPost(e, posts[0].id)}
        >
          <div class="relative overflow-hidden bg-gradient-to-br {getGradient(0)} rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 {targetPostId === posts[0].id ? 'scale-[0.98] opacity-80' : ''}">
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl gentle-float"></div>
            <div class="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl gentle-float" style="animation-delay: -2s;"></div>
            
            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-4">
                <span class="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs uppercase font-semibold tracking-wider border border-white/30">
                  Featured
                </span>
                <span class="bg-white text-zinc-900 px-4 py-1.5 rounded-full text-xs font-semibold">
                  {posts[0].content_type || 'Article'}
                </span>
              </div>
              
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:translate-x-2 transition-transform">
                {posts[0].title}
              </h2>
              
              <p class="text-lg text-white/90 mb-6 max-w-3xl line-clamp-2">
                {posts[0].meta_description}
              </p>
              
              <div class="flex flex-wrap items-center gap-3 text-white/80 text-sm">
                <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <time datetime={posts[0].created_at}>
                    {format(new Date(posts[0].created_at), 'MMM dd, yyyy')}
                  </time>
                </div>
                <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{Math.ceil(posts[0].word_count / 200)} min read</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  {/if}

  <!-- Blog Grid -->
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    {#each posts.slice(1) as post, index}
      <article class="group" style="animation-delay: -{index * 0.1}s;">
        <a 
          href="/blog/{post.id}" 
          class="block h-full"
          on:mouseenter={() => handlePostHover(post.id)}
          on:click={(e) => navigateToPost(e, post.id)}
        >
          <div class="h-full bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 {targetPostId === post.id ? 'scale-[0.98] opacity-80' : ''}">
            <div class="h-32 bg-gradient-to-br {getGradient(index + 1)} relative overflow-hidden">
              <div class="absolute inset-0 bg-black/10"></div>
              <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl gentle-float"></div>
              
              <div class="absolute top-4 left-4">
                <span class="bg-white/90 backdrop-blur-sm text-zinc-900 px-3 py-1 rounded-full text-xs font-semibold">
                  {post.content_type || 'Article'}
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <h2 class="text-xl font-bold text-zinc-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              
              <p class="text-zinc-600 mb-4 line-clamp-3 leading-relaxed">
                {post.meta_description}
              </p>
              
              <div class="flex items-center gap-2 text-sm text-zinc-500 mb-4">
                <time datetime={post.created_at}>
                  {format(new Date(post.created_at), 'MMM dd, yyyy')}
                </time>
                <span>•</span>
                <span>{Math.ceil(post.word_count / 200)} min</span>
              </div>
              
              {#if post.secondary_keywords.length > 0}
                <div class="flex flex-wrap gap-2">
                  {#each post.secondary_keywords.slice(0, 3) as keyword}
                    <span class="text-xs px-3 py-1 bg-gradient-to-r from-zinc-100 to-zinc-50 text-zinc-700 rounded-full border border-zinc-200 font-medium">
                      {keyword}
                    </span>
                  {/each}
                </div>
              {/if}
              
              <div class="mt-4 flex items-center gap-2 text-blue-600 font-medium group-hover:gap-4 transition-all">
                <span>Read article</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
            </div>
          </div>
        </a>
      </article>
    {/each}
  </div>

  <!-- Pagination -->
  {#if pagination.pages > 1}
    <nav class="flex flex-col sm:flex-row items-center justify-center gap-4">
      {#if pagination.has_prev}
        <a
          href="/blog?page={pagination.page - 1}"
          class="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-zinc-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all font-medium shadow-sm hover:shadow-md"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Previous
        </a>
      {/if}
      
      <div class="flex gap-2">
        {#each Array(pagination.pages) as _, i}
          <a
            href="/blog?page={i + 1}"
            class="w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all {
              pagination.page === i + 1 
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-110' 
                : 'bg-white border-2 border-zinc-200 text-zinc-700 hover:border-blue-500 hover:text-blue-600'
            }"
          >
            {i + 1}
          </a>
        {/each}
      </div>
      
      {#if pagination.has_next}
        <a
          href="/blog?page={pagination.page + 1}"
          class="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-zinc-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all font-medium shadow-sm hover:shadow-md"
        >
          Next
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      {/if}
    </nav>
  {/if}
</div>

<style>
  @keyframes gentle-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(3deg); }
  }
  
  .gentle-float {
    animation: gentle-float 6s ease-in-out infinite;
  }
  
  :global(.line-clamp-2) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  :global(.line-clamp-3) {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>