<script lang="ts">
  import { format } from 'date-fns';
  import { onMount } from 'svelte';
  import { blogApi } from '$lib/api/blog';
  import SEO from '$lib/components/blog/SEO.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  let prefetchedPosts = new Set<string>();
  
  // Prefetch post on hover
  function handlePostHover(postId: string) {
    if (!prefetchedPosts.has(postId)) {
      prefetchedPosts.add(postId);
      blogApi.prefetchPost(postId);
    }
  }
  
  // Generate gradient for each post (keep as-is)
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
</script>

<SEO
  title="Blog - Latest Articles"
  description="Read our latest blog posts and articles"
  type="website"
  url="/blog"
/>

<!-- Decorative Background (keep as-is) -->
<div class="fixed inset-0 -z-10 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
  <div class="absolute top-20 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl gentle-float"></div>
  <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl gentle-float" style="animation-delay: -2s;"></div>
  <div class="absolute bottom-20 left-1/2 w-96 h-96 bg-orange-200/15 rounded-full blur-3xl gentle-float" style="animation-delay: -4s;"></div>
</div>

<div class="max-w-7xl font-[Poppins] mx-auto px-4 py-12 md:py-20">
  <!-- Hero Header (keep as-is, since it's static) -->
  <header class="mb-16 text-center relative">
    <div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-zinc-200 rounded-full px-5 py-2 mb-6 shadow-sm gentle-float">
      <div class="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
      <span class="text-sm font-medium text-zinc-700">Fresh insights & stories</span>
    </div>
    
    <h1 class="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 leading-tight">
      Latest <span class="bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-900 bg-clip-text text-transparent">Articles</span>
    </h1>
    
    <p class="text-xl md:text-2xl text-zinc-600 max-w-2xl mx-auto font-light">
      Discover insights, tutorials, and stories to help you grow
    </p>
    
    <div class="absolute -top-10 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 blur-2xl gentle-float"></div>
    <div class="absolute -bottom-10 right-1/4 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-10 blur-2xl gentle-float" style="animation-delay: -2s;"></div>
  </header>

  {#await data.streamed.blogData}
    <!-- Skeleton for loading state -->
    <div class="mb-16">
      <!-- Featured post skeleton -->
      <div class="relative overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl p-8 md:p-12 shadow-xl animate-pulse">
        <div class="h-8 w-3/4 bg-gray-400 rounded mb-4"></div>
        <div class="h-4 w-1/2 bg-gray-400 rounded mb-6"></div>
        <div class="flex gap-3">
          <div class="h-6 w-24 bg-gray-400 rounded-full"></div>
          <div class="h-6 w-24 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {#each Array(11) as _, index} <!-- Match your per-page limit minus featured -->
        <div class="h-96 bg-white rounded-2xl border border-zinc-200 overflow-hidden animate-pulse">
          <div class="h-32 bg-gray-300"></div>
          <div class="p-6">
            <div class="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
            <div class="h-4 w-full bg-gray-300 rounded mb-1"></div>
            <div class="h-4 w-5/6 bg-gray-300 rounded mb-4"></div>
            <div class="h-4 w-1/2 bg-gray-300 rounded mb-4"></div>
            <div class="flex gap-2">
              <div class="h-5 w-16 bg-gray-300 rounded-full"></div>
              <div class="h-5 w-16 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      {/each}
    </div>
    <!-- Pagination skeleton -->
    <nav class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-pulse">
      <div class="w-32 h-12 bg-gray-200 rounded-xl"></div>
      <div class="flex gap-2">
        {#each Array(3) as _} <!-- Placeholder pages -->
          <div class="w-12 h-12 bg-gray-200 rounded-xl"></div>
        {/each}
      </div>
      <div class="w-32 h-12 bg-gray-200 rounded-xl"></div>
    </nav>
  {:then blogData}
    <!-- Resolved data -->
    {#if blogData.posts.length > 0}
      <div class="mb-16">
        <div class="relative group">
          <a 
            href="/blog/{blogData.posts[0].id}" 
            class="block"
            on:mouseenter={() => handlePostHover(blogData.posts[0].id)}
          >
            <div class="relative overflow-hidden bg-gradient-to-br {getGradient(0)} rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div class="absolute inset-0 bg-black/20"></div>
              <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl gentle-float"></div>
              <div class="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl gentle-float" style="animation-delay: -2s;"></div>
              
              <div class="relative z-10">
                <div class="flex items-center gap-3 mb-4">
                  <span class="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs uppercase font-semibold tracking-wider border border-white/30">
                    Featured
                  </span>
                  <span class="bg-white text-zinc-900 px-4 py-1.5 rounded-full text-xs font-semibold">
                    {blogData.posts[0].content_type || 'Article'}
                  </span>
                </div>
                
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:translate-x-2 transition-transform">
                  {blogData.posts[0].title}
                </h2>
                
                <p class="text-lg text-white/90 mb-6 max-w-3xl line-clamp-2">
                  {blogData.posts[0].meta_description}
                </p>
                
                <div class="flex flex-wrap items-center gap-3 text-white/80 text-sm">
                  <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <time datetime={blogData.posts[0].created_at}>
                      {format(new Date(blogData.posts[0].created_at), 'MMM dd, yyyy')}
                    </time>
                  </div>
                  <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{Math.ceil(blogData.posts[0].word_count / 200)} min read</span>
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
      {#each blogData.posts.slice(1) as post, index}
        <article class="group" style="animation-delay: -{index * 0.1}s;">
          <a 
            href="/blog/{post.id}" 
            class="block h-full"
            on:mouseenter={() => handlePostHover(post.id)}
          >
            <div class="h-full bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
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
    {#if blogData.pagination.pages > 1}
      <nav class="flex flex-col sm:flex-row items-center justify-center gap-4">
        {#if blogData.pagination.has_prev}
          <a
            href="/blog?page={blogData.pagination.page - 1}"
            class="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-zinc-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all font-medium shadow-sm hover:shadow-md"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Previous
          </a>
        {/if}
        
        <div class="flex gap-2">
          {#each Array(blogData.pagination.pages) as _, i}
            <a
              href="/blog?page={i + 1}"
              class="w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all {
                blogData.pagination.page === i + 1 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-110' 
                  : 'bg-white border-2 border-zinc-200 text-zinc-700 hover:border-blue-500 hover:text-blue-600'
              }"
            >
              {i + 1}
            </a>
          {/each}
        </div>
        
        {#if blogData.pagination.has_next}
          <a
            href="/blog?page={blogData.pagination.page + 1}"
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
  {:catch error}
    <!-- Error state -->
    <div class="text-center py-12">
      <p class="text-red-600 font-medium">Failed to load blog posts: {error.message || 'Unknown error'}</p>
    </div>
  {/await}
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