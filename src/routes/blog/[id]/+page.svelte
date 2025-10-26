<script lang="ts">
  // src/routes/blog/[id]/+page.svelte
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import SEO from '$lib/components/blog/SEO.svelte';
  import BlogPost from '$lib/components/blog/BlogPost.svelte';
  import BlogCard from '$lib/components/blog/BlogCard.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  $: post = data.post;
  
  let isLoading = true;
  
  onMount(() => {
    // Small delay to ensure content is rendered
    setTimeout(() => {
      isLoading = false;
    }, 50);
  });
</script>

<SEO
  title={post.seo?.title || post.title}
  description={post.seo?.description || post.meta_description}
  keywords={post.seo?.keywords || [post.primary_keyword, ...post.secondary_keywords]}
  author={post.seo?.author || ''}
  publishedDate={post.seo?.published_date || post.created_at}
  modifiedDate={post.seo?.modified_date || post.updated_at}
  url={`/blog/${post.id}`}
  type="article"
/>

<!-- Decorative Background -->
<div class="fixed inset-0 -z-10 bg-white ">
  <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
  <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl"></div>
</div>

<div class="max-w-7xl mx-auto px-4 py-8 md:py-16">
  <!-- Back Button -->
  <div class="mb-8">
    <a
      href="/blog"
      class="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors group"
    >
      <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      <span class="font-medium">Back to articles</span>
    </a>
  </div>
  
  <!-- Main Content Grid -->
  <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 relative">
    <!-- Blog Post Content -->
    <div class="lg:col-span-8">
      {#if isLoading}
        <!-- Skeleton Loader -->
        <div class="animate-pulse" transition:fade>
          <div class="h-12 bg-zinc-200 rounded-lg mb-6 w-3/4"></div>
          <div class="flex gap-4 mb-8">
            <div class="h-6 bg-zinc-200 rounded w-32"></div>
            <div class="h-6 bg-zinc-200 rounded w-24"></div>
          </div>
          <div class="space-y-4">
            <div class="h-4 bg-zinc-200 rounded w-full"></div>
            <div class="h-4 bg-zinc-200 rounded w-full"></div>
            <div class="h-4 bg-zinc-200 rounded w-5/6"></div>
            <div class="h-4 bg-zinc-200 rounded w-full"></div>
            <div class="h-4 bg-zinc-200 rounded w-4/6"></div>
          </div>
        </div>
      {:else}
        <div transition:fade>
          <BlogPost {post} />
        </div>
      {/if}
    </div>
    
    <!-- Sidebar -->
    <aside class="lg:col-span-4 relative pt-96">
      <div class="lg:sticky top-8">
        <!-- Main CTA Card -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black p-8 shadow-xl">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl gentle-float"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl gentle-float" style="animation-delay: -2s;"></div>
          
          <div class="relative z-10">
            <div class="flex justify-center mb-4">
              <!-- <img 
                src="https://png.pngtree.com/png-clipart/20210309/original/pngtree-3d-render-futuristic-robot-pose-hands-up-png-image_5873238.jpg" 
                alt="Friendly AI Robot"
                class="w-20 h-20 rounded-full object-contain gentle-float"
                loading="lazy"
              /> -->
            </div>
            
            <h3 class="text-2xl font-bold text-white mb-2 text-center">
              Ready to automate your marketing?
            </h3>
            <p class="text-white/80 text-sm mb-6 leading-relaxed text-center">
              Join 500+ marketers using AI agents to handle SEO, Twitter, and Reddit growth.
            </p>
            
            <a
              href="/signup"
              class="block w-full bg-white hover:bg-zinc-100 text-zinc-900 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 text-center"
            >
              Start for Free
            </a>
            
            <div class="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/10">
              <div class="flex items-center gap-1.5 text-white/70 text-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Free forever tier</span>
              </div>
              <div class="flex items-center gap-1.5 text-white/70 text-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>No credit card</span>
              </div>
            </div>
            
            <div class="mt-6 pt-6 border-t border-white/10">
              <h4 class="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
                <svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                What You Get
              </h4>
              <ul class="space-y-2">
                {#each [
                  'AI agents for SEO, X & Reddit',
                  'Automated keyword research',
                  'Content optimization tools',
                  'Real-time analytics dashboard'
                ] as feature}
                  <li class="flex items-start gap-2 text-xs text-white/70">
                    <svg class="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                {/each}
              </ul>
            </div>
            
            <div class="mt-6 pt-6 border-t border-white/10">
              <div class="flex items-center gap-3 mb-2">
                <div class="flex -space-x-2">
                  {#each [1, 2, 3] as i}
                    <div class="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 border-2 border-zinc-900"></div>
                  {/each}
                </div>
                <div class="text-xs text-white/70">
                  <div class="font-semibold">500+ marketers</div>
                </div>
              </div>
              <p class="text-xs text-white/60 italic">
                "Flowjoy cut my research time by 85%."
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</div>

<!-- Related Posts -->
{#if data.relatedPosts?.length > 0}
  <aside class="bg-gradient-to-b from-transparent via-zinc-50 to-white py-16 mt-20">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 gentle-float">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
          </svg>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-zinc-900 mb-3">Continue Reading</h2>
        <p class="text-zinc-600 text-lg">Explore more insights and stories</p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        {#each data.relatedPosts as relatedPost, index}
          <div style="animation-delay: -{index * 0.1}s;" class="gentle-float">
            <BlogCard post={relatedPost} showExcerpt={true} showKeywords={false} />
          </div>
        {/each}
      </div>
    </div>
  </aside>
{/if}

<style>
  @keyframes gentle-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .gentle-float {
    animation: gentle-float 6s ease-in-out infinite;
  }
</style>