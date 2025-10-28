<!-- AgentsSection.svelte -->

<script lang='ts'>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
  
    /**
     * @type {string | number}
     */
    export let activeAgent;
    export let agents;
  
    let orderedAgents = Object.values(agents).sort((a, b) => {
      const order = { 'search': 0, 'reddit': 1, 'twitter': 2 };
      return order[a.icon] - order[b.icon];
    });
  
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
    let isVisibleHeader = false;
    let headerRef: HTMLDivElement | null = null;
  
    let isVisibleTabs = false;
    let tabsRef: HTMLDivElement | null = null;
  
    let isVisibleContent = false;
    let contentRef: HTMLDivElement | null = null;
  
    onMount(() => {
      const obsHeader = setupObserver(headerRef, () => isVisibleHeader = true);
      const obsTabs = setupObserver(tabsRef, () => isVisibleTabs = true);
      const obsContent = setupObserver(contentRef, () => isVisibleContent = true);
  
      return () => {
        obsHeader.disconnect();
        obsTabs.disconnect();
        obsContent.disconnect();
      };
    });
  </script>
  
  <!-- AI Agents Section -->
  <div class="space-y-12 relative">
    <!-- Subtle gradient background -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50/5 pointer-events-none"></div>
  
    <div bind:this={headerRef} class="text-center">
      {#if isVisibleHeader}
        <h2 in:fly={{ y: 20, duration: 600, delay: 0 }} class="text-3xl font-semibold text-zinc-900 mb-4 relative">
          Three specialists. Zero complexity.
          <div class="absolute top-0 right-0 w-4 h-4 bg-blue-400 rounded-square gentle-float" style="animation-delay: -2s;"></div>
        </h2>
        <p in:fly={{ y: 20, duration: 600, delay: 200 }} class="text-lg text-zinc-500 max-w-2xl mx-auto">Simply tell Flowjoy what you need. Our AI agents handle the rest.</p>
      {/if}
    </div>
  
    <div class="space-y-8">
      <!-- Tab Navigation -->
      <div bind:this={tabsRef} class="flex justify-center">
        {#if isVisibleTabs}
          <div class="inline-flex bg-zinc-900 rounded-2xl p-2 gap-2">
            {#each orderedAgents as agent, i}
              <button
                on:click={() => { if (agent.icon !== 'twitter') activeAgent = agent.id }}
                disabled={agent.icon === 'twitter'}
                class="tab-button relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 {activeAgent === agent.id ? `bg-gradient-to-r ${agent.gradient} text-white shadow-lg` : 'text-zinc-400 hover:text-white hover:bg-zinc-800'} {agent.icon === 'twitter' ? 'opacity-50 cursor-not-allowed' : ''}"
                in:fly={{ y: 20, duration: 600, delay: 200 * i }}
              >
                {#if agent.icon === 'search'}
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                {:else if agent.icon === 'twitter'}
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                {:else if agent.icon === 'reddit'}
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/>
                  </svg>
                {/if}
                <span class="hidden sm:block">{agent.name}</span>
                {#if agent.icon === 'twitter'}
                  <span class="absolute top-0 right-0 -mt-2 -mr-2 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">Coming Soon</span>
                {/if}
              </button>
            {/each}
          </div>
        {/if}
      </div>
     
      <!-- Active Agent Content -->
      {#key activeAgent}
        <div bind:this={contentRef} class="fade-in">
          {#if isVisibleContent}
            <div class="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <!-- Agent Video -->
              <div in:fly={{ y: 20, duration: 600, delay: 0 }} class="video-container relative order-2 lg:order-1">
                <video
                  src={agents[activeAgent].videoUrl}
                  controls
                  autoplay
                  muted
                  loop
                  class="w-full"
                  style="aspect-ratio: 16/9;"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
      
              <!-- Agent Details -->
              <div class="space-y-6 order-1 lg:order-2">
                <div in:fly={{ y: 20, duration: 600, delay: 200 }} class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-r {agents[activeAgent].gradient} rounded-xl flex items-center justify-center flex-shrink-0">
                    {#if agents[activeAgent].icon === 'search'}
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    {:else if agents[activeAgent].icon === 'twitter'}
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    {:else if agents[activeAgent].icon === 'reddit'}
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/>
                      </svg>
                    {/if}
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-zinc-900">{agents[activeAgent].name}</h3>
                    <p class="text-zinc-700">{agents[activeAgent].subtitle}</p>
                  </div>
                </div>
                
                <p in:fly={{ y: 20, duration: 600, delay: 400 }} class="text-lg text-zinc-900 leading-relaxed">{agents[activeAgent].description}</p>
                
                <div in:fly={{ y: 20, duration: 600, delay: 600 }} class="flex flex-wrap gap-2">
                  {#each agents[activeAgent].tags as tag}
                    <span class="px-3 py-1.5 bg-zinc-800 text-zinc-300 text-sm rounded-lg font-medium">{tag}</span>
                  {/each}
                </div>
      
                <div in:fly={{ y: 20, duration: 600, delay: 800 }} class="grid grid-cols-3 gap-4 pt-4">
                  {#each agents[activeAgent].metrics.stats as stat, i}
                    <div in:fly={{ y: 20, duration: 600, delay: 800 + (i * 200) }} class="glass-card p-4 rounded-xl text-center">
                      <div class="text-xl font-bold text-zinc-800 mb-1">{stat.value}</div>
                      <div class="text-zinc-400 text-xs">{stat.label}</div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/key}
    </div>
  </div>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  
    :global(body) {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', system-ui, sans-serif;
    }
  
    .gradient-text {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  
    .notion-card {
      background: white;
      border: 1px solid #e5e7eb;
      transition: all 0.2s ease;
    }
  
    .notion-card:hover {
      border-color: #d1d5db;
      box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
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
  
    .tab-button {
      transition: all 0.15s ease;
    }
  
    .tab-button:hover {
      transform: translateY(-1px);
    }
  
    .fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }
  
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
  
    .speech-bubble {
      position: absolute;
      background: black;
      border: 1px solid #f3f4f6;
      border-radius: 12px;
      padding: 12px 16px;
      max-width: 200px;
      font-size: 14px;
      color: black;
      animation: gentle-float 10s ease-in-out infinite;
      box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(8px);
    }
  
    .speech-bubble:after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid white;
    }
  
    .video-container {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.12);
      border: 2px solid transparent;
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%) padding-box;
    }
  
    .hero-section {
      background: 
        radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
    }
  
    .agent-card {
      transition: all 0.3s ease;
      border-radius: 12px;
    }
  
    .stat-card {
      background: #fafbfc;
      border: 1px solid #f1f3f4;
      transition: all 0.15s ease;
      position: relative;
    }
  
    .stat-card:hover {
      background: white;
      border-color: #e5e7eb;
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
  </style>