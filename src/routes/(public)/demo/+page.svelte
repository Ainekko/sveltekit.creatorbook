<script lang='ts'>
    import { onMount } from 'svelte';
    import { blur } from 'svelte/transition';
    import { format } from 'date-fns';
    import { blogApi } from '$lib/api/blog';
    import SEO from '$lib/components/blog/SEO.svelte';
    import type { BlogPost } from '$lib/api/blog';
  
    // Observer setup function
    function setupObserver(ref: HTMLElement | null, callback: () => void) {
      if (!ref) return { disconnect: () => {} };
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(ref);
        }
      }, { threshold: 0.1 });
      observer.observe(ref);
      return observer;
    }
  
    // Visibility states
    let isVisibleHeadline = false;
    let headlineRef: HTMLDivElement | null = null;
  
    let isVisibleVideo = false;
    let videoRef: HTMLDivElement | null = null;
  
    let isVisibleCTA = false;
    let ctaRef: HTMLDivElement | null = null;
  
    let isVisibleBenefits = false;
    let benefitsRef: HTMLDivElement | null = null;
  
    let isVisibleBlog = false;
    let blogRef: HTMLDivElement | null = null;
  
    // Video player state
    let isPlaying = false;
    let videoElement: HTMLVideoElement | null = null;
  
    // Blog posts state
    let blogPosts: BlogPost[] = [];
    let loadingPosts = true;
  
    function playVideo() {
      if (videoElement) {
        videoElement.play();
        isPlaying = true;
      }
    }
  
    // Fetch blog posts
    async function fetchBlogPosts() {
      try {
        const response = await blogApi.getPosts(1, 3);
        blogPosts = response.posts;
        loadingPosts = false;
      } catch (error) {
        console.error('Failed to load blog posts:', error);
        loadingPosts = false;
      }
    }
  
    // Generate gradient for blog cards
    const getGradient = (index: number) => {
      const gradients = [
        'from-blue-500 to-purple-600',
        'from-emerald-500 to-teal-600',
        'from-orange-500 to-red-600',
      ];
      return gradients[index % gradients.length];
    };
  
    onMount(() => {
      const obsHeadline = setupObserver(headlineRef, () => isVisibleHeadline = true);
      const obsVideo = setupObserver(videoRef, () => isVisibleVideo = true);
      const obsCTA = setupObserver(ctaRef, () => isVisibleCTA = true);
      const obsBenefits = setupObserver(benefitsRef, () => isVisibleBenefits = true);
      const obsBlog = setupObserver(blogRef, () => isVisibleBlog = true);
  
      fetchBlogPosts();
  
      return () => {
        obsHeadline.disconnect();
        obsVideo.disconnect();
        obsCTA.disconnect();
        obsBenefits.disconnect();
        obsBlog.disconnect();
      };
    });
  
    // Listen for video events
    $: if (videoElement) {
      const handlePlay = () => isPlaying = true;
      const handlePause = () => isPlaying = false;
      const handleEnded = () => isPlaying = false;
      
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('ended', handleEnded);
    }
  </script>
  
  <SEO
    title="Flowjoy Demo - Automate Content Distribution in 2 Hours Instead of 15"
    description="See how Flowjoy AI agents cut content distribution time from 15 hours to 2 hours per week. Automate blog-to-X threads, Reddit posts, and SEO optimization. White-label available for agencies."
    keywords={[
      'content distribution automation',
      'AI marketing agents',
      'blog to social media',
      'SEO automation',
      'white label marketing automation',
      'agency marketing tools',
      'content marketing efficiency',
      'automated social media posting'
    ]}
    type="website"
    url="/demo"
  />
  
  <svelte:head>
    
  </svelte:head>
  
  <div class="hero-section min-h-screen py-20 px-4 font-[Poppins]">
    <!-- Hero Headline -->
    <div class="text-center mb-16">
      <div bind:this={headlineRef} class="space-y-6 mb-12 relative max-w-4xl mx-auto">
        {#if isVisibleHeadline}
          <h1 in:blur={{delay: 0, duration: 600, amount: 5}} class="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-700 leading-tight tracking-tight">
            From 15 hours to <span class="font-['Pacifico']">2 hours</span> per client
          </h1>
  
          <h2 in:blur={{delay: 200, duration: 600, amount: 5}} class="text-xl md:text-2xl text-zinc-500 leading-relaxed font-light">
            AI agents that automate your <span class="twisted-underline">entire content distribution
              <svg viewBox="0 0 100 10" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M0 5 C 20 0, 40 10, 60 5 C 80 0, 90 10, 100 5" />
              </svg>
            </span> — blog to X threads, Reddit, and SEO optimization.
        </h2>
        {/if}
      </div>
  
      <!-- Video Center Stage -->
      <div bind:this={videoRef} class="mb-16 relative">
        {#if isVisibleVideo}
          <div in:blur={{delay: 0, duration: 600, amount: 5}} class="video-container max-w-5xl mx-auto relative">
            <video
              bind:this={videoElement}
              src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/flowjoy/Flowjoy+comp.mp4"
              controls
              loop
              class="w-full h-full"
              style="aspect-ratio: 16/9;"
              poster="/naiSection.jpg"
              preload="metadata"
              aria-label="Flowjoy product demonstration - automated content distribution"
              title="How Flowjoy automates blog to social media distribution"
            >
              Your browser does not support the video tag.
            </video>
            
            {#if !isPlaying}
              <button 
                on:click={playVideo}
                class="play-button-overlay"
                aria-label="Play video demonstration"
              >
                <div class="play-button-circle">
                  <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </button>
            {/if}
          </div>
          <p in:blur={{delay: 200, duration: 600, amount: 5}} class="text-sm text-zinc-400 mt-4 text-center">
            See how we cut content distribution from 15 hours to 2 hours per week
          </p>
        {/if}
      </div>
  
      <!-- CTA Section -->
      <div bind:this={ctaRef} class="max-w-2xl mx-auto mb-20 relative">
        {#if isVisibleCTA}
          <div in:blur={{delay: 0, duration: 600, amount: 5}} class="bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm">
            <h2 class="text-2xl md:text-3xl font-semibold text-zinc-800 mb-4">
              Save 13 hours per week, per client
            </h2>
            <p class="text-zinc-500 mb-8 text-lg">
              Book a 15-minute call to see how Flowjoy can automate your content workflow. White-label it as your proprietary system.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                on:click={() => window.Calendly && window.Calendly.initPopupWidget({url: 'https://calendly.com/ahlaqachhafid/ai-agents-and-marketing'})}
                class="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 relative text-lg"
              >
                Book a call now
                <div class="absolute top-0 right-0 w-4 h-4 -z-10 bg-orange-400 rounded-full gentle-float" style="animation-delay: -3s;"></div>
              </button>
              <a 
                href="/signup" 
                class="bg-white border border-zinc-200 text-zinc-900 px-8 py-4 rounded-lg font-medium hover:bg-zinc-50 transition-all duration-200 text-lg"
              >
                Try free demo now
              </a>
            </div>
            
            <p class="text-sm text-zinc-400 mt-6 flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
              </svg>
              Most calls are scheduled within 24 hours
            </p>
          </div>
        {/if}
      </div>
  
      <!-- Benefits Grid -->
      <div bind:this={benefitsRef} class="max-w-5xl mx-auto mb-20">
        {#if isVisibleBenefits}
          <h3 in:blur={{delay: 0, duration: 600, amount: 5}} class="text-2xl font-semibold text-zinc-700 mb-8">
            What you get
          </h3>
          
          <div class="grid md:grid-cols-3 gap-6">
            <div in:blur={{delay: 0, duration: 600, amount: 5}} class="benefit-card p-6 rounded-xl">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h4 class="text-lg font-medium text-zinc-800 mb-2">3x More Content Output</h4>
              <p class="text-zinc-500 text-sm">Your clients get more content distributed across X, Reddit, and SEO-optimized channels automatically</p>
            </div>
  
            <div in:blur={{delay: 100, duration: 600, amount: 5}} class="benefit-card p-6 rounded-xl">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 class="text-lg font-medium text-zinc-800 mb-2">Save 13 Hours/Week per Client</h4>
              <p class="text-zinc-500 text-sm">Multiply that across your roster. Redeploy your team to strategy and higher-value work</p>
            </div>
  
            <div in:blur={{delay: 200, duration: 600, amount: 5}} class="benefit-card p-6 rounded-xl">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
              </div>
              <h4 class="text-lg font-medium text-zinc-800 mb-2">White-Label as Your System</h4>
              <p class="text-zinc-500 text-sm">$699 setup + $299/mo. You keep all client relationships and data. I handle the backend APIs, headaches, and priority support</p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <!-- Learn Section with Blog Posts -->
  <section bind:this={blogRef} class="py-20 px-4 bg-zinc-50">
    <div class="max-w-6xl mx-auto">
      {#if isVisibleBlog}
        <div in:blur={{delay: 0, duration: 600, amount: 5}} class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-zinc-800 mb-4">
            Learn how it works
          </h2>
          <p class="text-lg text-zinc-600 max-w-2xl mx-auto">
            Discover insights and tutorials on automating your content distribution workflow
          </p>
        </div>
  
        {#if loadingPosts}
          <!-- Loading skeleton -->
          <div class="grid md:grid-cols-3 gap-8">
            {#each Array(3) as _, index}
              <div in:blur={{delay: index * 100, duration: 600, amount: 5}} class="bg-white rounded-2xl border border-zinc-200 overflow-hidden animate-pulse">
                <div class="h-32 bg-gray-300"></div>
                <div class="p-6">
                  <div class="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
                  <div class="h-4 w-full bg-gray-300 rounded mb-1"></div>
                  <div class="h-4 w-5/6 bg-gray-300 rounded mb-4"></div>
                  <div class="h-4 w-1/2 bg-gray-300 rounded"></div>
                </div>
              </div>
            {/each}
          </div>
        {:else if blogPosts.length > 0}
          <div class="grid md:grid-cols-3 gap-8 mb-12">
            {#each blogPosts as post, index}
              <article in:blur={{delay: index * 100, duration: 600, amount: 5}} class="group">
                <a 
                  href="/blog/{post.slug}" 
                  class="block h-full"
                >
                  <div class="h-full bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div class="h-32 bg-gradient-to-br {getGradient(index)} relative overflow-hidden">
                      <div class="absolute inset-0 bg-black/10"></div>
                      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl gentle-float"></div>
                      
                      <div class="absolute top-4 left-4">
                        <span class="bg-white/90 backdrop-blur-sm text-zinc-900 px-3 py-1 rounded-full text-xs font-semibold">
                          {post.content_type || 'Article'}
                        </span>
                      </div>
                    </div>
                    
                    <div class="p-6">
                      <h3 class="text-xl font-bold text-zinc-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      
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
                      
                      <div class="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-4 transition-all">
                        <span>Read more</span>
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
  
          <div in:blur={{delay: 300, duration: 600, amount: 5}} class="text-center">
            <a 
              href="/blog" 
              class="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200"
            >
              View all articles
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </div>
        {/if}
      {/if}
    </div>
  </section>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  
    :global(body) {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', system-ui, sans-serif;
    }
  
    .hero-section {
      background: 
        radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
    }
  
    .video-container {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.12);
      border: 2px solid transparent;
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%) padding-box;
    }
  
    .play-button-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      cursor: pointer;
      background: none;
      border: none;
      transition: transform 0.3s ease;
    }
  
    .play-button-overlay:hover {
      transform: translate(-50%, -50%) scale(1.1);
    }
  
    .play-button-circle {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }
  
    .play-button-overlay:hover .play-button-circle {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
    }
  
    .play-icon {
      width: 32px;
      height: 32px;
      color: #18181b;
      margin-left: 4px;
    }
  
    .gentle-float {
      animation: gentle-float 8s ease-in-out infinite;
    }
  
    @keyframes gentle-float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-5px) rotate(1deg); }
      50% { transform: translateY(-8px) rotate(0deg); }
      75% { transform: translateY(-3px) rotate(-1deg); }
    }
  
    .twisted-underline {
      display: inline-block;
      position: relative;
    }
  
    .twisted-underline svg {
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 100%;
      height: 12px;
    }
  
    .benefit-card {
      background: white;
      border: 1px solid #e5e7eb;
      transition: all 0.2s ease;
    }
  
    .benefit-card:hover {
      border-color: #d1d5db;
      box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
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