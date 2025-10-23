<script>
  import { onMount } from 'svelte';

  let email = '';
  let isSubmitting = false;
  let activeAgent = 'Nai';

  const agents = {
    Nai: {
      id: 'Nai',
      name: 'Nai',
      subtitle: 'SEO Assistant',
      description: 'Research keywords, optimize content, and boost your search visibility with intelligent SEO recommendations.',
      gradient: 'from-blue-500 to-blue-600',
      icon: 'search',
      tags: ['Keyword Research', 'Content Optimization', 'SERP Analysis'],
      metrics: {
        main: '85%',
        mainLabel: 'Time Saved',
        stats: [
          { value: '4x', label: 'Faster Research' },
          { value: '12h', label: 'Weekly Savings' },
          { value: '+45%', label: 'Productivity' }
        ]
      },
      videoUrl: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/Nai+Demo.mp4'
    },
    Rio: {
      id: 'Rio',
      name: 'Rio',
      subtitle: 'Twitter Growth',
      description: 'Create engaging tweets, schedule posts, and grow your Twitter audience with data-driven insights.',
      gradient: 'from-sky-500 to-blue-500',
      icon: 'twitter',
      tags: ['Tweet Generation', 'Audience Growth', 'Engagement Analytics'],
      metrics: {
        main: '65%',
        mainLabel: 'Time Saved',
        stats: [
          { value: '3x', label: 'More Engagement' },
          { value: '8h', label: 'Weekly Savings' },
          { value: '+52%', label: 'Reach Increase' }
        ]
      },
      videoUrl: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/Rio+Demo.mp4'
    },
    Elio: {
      id: 'Elio',
      name: 'Elio',
      subtitle: 'Reddit Marketing',
      description: 'Build communities, create valuable posts, and engage authentically on Reddit with strategic guidance.',
      gradient: 'from-orange-500 to-red-500',
      icon: 'reddit',
      tags: ['Community Building', 'Content Strategy', 'Authentic Engagement'],
      metrics: {
        main: '72%',
        mainLabel: 'Time Saved',
        stats: [
          { value: '5x', label: 'Better Posts' },
          { value: '10h', label: 'Weekly Savings' },
          { value: '+38%', label: 'Community Growth' }
        ]
      },
      videoUrl: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/Elio+Demo.mp4'
    }
  };

  async function handleSignUp() {
    if (isSubmitting || !email) return;

    if (!email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    isSubmitting = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`🚀 Welcome to Flowjoy! Check ${email} for your dashboard access and setup guide.`);
      email = '';
    } catch (error) {
      alert('Something went wrong. Please try again or contact support.');
    } finally {
      isSubmitting = false;
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSignUp();
    }
  }

  function setActiveAgent(agentId) {
    activeAgent = agentId;
  }

  onMount(() => {
    // Mount effects
  });
</script>

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

<section class="hero-section font-[Poppins] relative min-h-screen bg-white text-zinc-900 overflow-x-hidden">
  <!-- Floating Questions -->
  <div class="absolute top-16 left-8 md:left-16 speech-bubble " style="animation-delay: -1s;">
    "Research trending keywords for my SaaS"
    <div class="absolute top-0 right-0 w-4 h-4 bg-orange-400 rounded-full gentle-float" style="animation-delay: -2s;"></div>
  </div>
  <div class="absolute top-24 right-8 md:right-16 speech-bubble" style="animation-delay: -3s;">
    "Write SEO blog post about project management"
    <div class="absolute bottom-0 left-0 w-4 h-4 bg-purple-400 rounded-full gentle-float" style="animation-delay: -4s;"></div>
  </div>
  <div class="absolute bottom-32 left-1/4 speech-bubble" style="animation-delay: -5s;">
    "Create viral Twitter thread about growth"
    <div class="absolute top-0 right-0 w-4 h-4 bg-blue-400 rounded-square gentle-float" style="animation-delay: -3s;"></div>
  </div>
  <div class="absolute top-1/3 right-1/3 speech-bubble" style="animation-delay: -2s;">
    "Build Reddit strategy for community"
    <div class="absolute bottom-0 left-0 w-4 h-4 bg-cyan-400 rounded-square gentle-float" style="animation-delay: -5s;"></div>
  </div>

  <div class="relative z-10 pt-20 pb-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Main Hero Content -->
      <div class="text-center mb-16">
        <div class="space-y-6 mb-12 relative">
          <!-- Headline with accent -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-700 leading-tight tracking-tight">
            AI for <span class="font-['Pacifico']">joyful</span> marketing.
          </h1>

          <!-- Subhead with twisted underline -->
          <p class="text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto leading-relaxed font-light">
            Automate 
            <svg class="inline w-5 h-5 text-zinc-950 align-middle mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg> 
            SEO, 
            <svg class="inline w-5 h-5 text-zinc-950 align-middle mx-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg> 
            X, and 
            <svg class="inline w-5 h-5 text-zinc-950 align-middle mx-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 00.029.463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/>
            </svg> 
            Reddit growth — <span class="twisted-underline">no complex workflows
              <svg viewBox="0 0 100 10" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M0 5 C 20 0, 40 10, 60 5 C 80 0, 90 10, 100 5" />
              </svg>
            </span>.
          </p>
        </div>

        <!-- CTA Section -->
        <div class="max-w-md mx-auto space-y-4 mb-16 relative">
          <div class="flex flex-col sm:flex-row gap-3">
            <input
              bind:value={email}
              on:keypress={handleKeyPress}
              type="email"
              placeholder="Enter your email"
              class="flex-1 bg-white border border-zinc-200 rounded-lg px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              on:click={handleSignUp}
              disabled={isSubmitting}
              class="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 relative"
            >
              {isSubmitting ? 'Starting...' : 'Start free trial'}
              <div class="absolute top-0 right-0 w-4 h-4 -z-10 bg-orange-400 rounded-full gentle-float" style="animation-delay: -3s;"></div>
            </button>
          </div>
          <p class="text-sm text-zinc-400 flex items-center justify-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            14-day free trial · No credit card required
          </p>
        </div>

        <!-- Video Center Stage -->
        <div class="mb-16 relative">
          <div class="video-container max-w-4xl mx-auto">
            <video
              src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/AI+Marketing+Agents+for+SaaS+-+Google+Chrome+2025-06-11+11-34-43.mp4"
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
          <p class="text-sm text-zinc-400 mt-4 text-center">See Flowjoy eliminate marketing complexity</p>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 pt-8">
          {#each [{ value: '500+', label: 'Active users' }, { value: '2.1M', label: 'Tasks completed' }, { value: '94%', label: 'Success rate' }] as stat}
            <div class="text-center stat-card p-4 rounded-lg">
              <div class="accent-dot"></div>
              <div class="text-2xl font-semibold text-zinc-900">{stat.value}</div>
              <div class="text-sm text-zinc-500">{stat.label}</div>
            </div>
          {/each}
        </div>
      </div>

      <!-- AI Agents Section -->
      <div class="space-y-12 relative">
        <!-- Subtle gradient background -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50/5 pointer-events-none"></div>

        <div class="text-center">
          <h2 class="text-3xl font-semibold text-zinc-900 mb-4 relative">
            Three specialists. Zero complexity.
            <div class="absolute top-0 right-0 w-4 h-4 bg-blue-400 rounded-square gentle-float" style="animation-delay: -2s;"></div>
          </h2>
          <p class="text-lg text-zinc-500 max-w-2xl mx-auto">Simply tell Flowjoy what you need. Our AI agents handle the rest.</p>
        </div>

        <!-- Agent Tabs -->
        <!-- <div class="flex justify-center">
          <div class="inline-flex bg-zinc-100 rounded-xl p-1">
            {#each Object.values(agents) as agent}
              <button
                on:click={() => setActiveAgent(agent.id)}
                class="tab-button px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 {activeAgent === agent.id ? `bg-white text-zinc-900 shadow-sm` : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'}"
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
                {agent.name}
              </button>
            {/each}
          </div>
        </div> -->

        <div class="space-y-8">
          <!-- Header Section -->
          
        
          <!-- Tab Navigation -->
          <div class="flex justify-center">
            <div class="inline-flex bg-zinc-900 rounded-2xl p-2 gap-2">
              {#each Object.values(agents) as agent}
                <button
                  on:click={() => setActiveAgent(agent.id)}
                  class="tab-button px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 {activeAgent === agent.id ? `bg-gradient-to-r ${agent.gradient} text-white shadow-lg` : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}"
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
                </button>
              {/each}
            </div>
          </div>
         
          <!-- Active Agent Content -->
          {#key activeAgent}
            <div class="fade-in">
              <div class="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <!-- Agent Video -->
                <div class="video-container relative order-2 lg:order-1">
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
                  <div class="flex items-start gap-4">
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
                  
                  <p class="text-lg text-zinc-900 leading-relaxed">{agents[activeAgent].description}</p>
                  
                  <div class="flex flex-wrap gap-2">
                    {#each agents[activeAgent].tags as tag}
                      <span class="px-3 py-1.5 bg-zinc-800 text-zinc-300 text-sm rounded-lg font-medium">{tag}</span>
                    {/each}
                  </div>
        
                  <div class="grid grid-cols-3 gap-4 pt-4">
                    {#each agents[activeAgent].metrics.stats as stat}
                      <div class="glass-card p-4 rounded-xl text-center">
                        <div class="text-xl font-bold text-zinc-800 mb-1">{stat.value}</div>
                        <div class="text-zinc-400 text-xs">{stat.label}</div>
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          {/key}
        </div>

        <div class="flex flex-col lg:flex-row items-center justify-between gap-6 pt-6 mb-10">
          <div>
            <p class="text-lg text-zinc-700 max-w-2xl">
              Test these plug-and-play versions for free. For tailored results, we build custom setups.
            </p>
          </div>
          <button class="bg-zinc-900 text-zinc-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap">
            Get Started for Free
          </button>
        </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-20 pt-12 border-t border-zinc-100 relative">
        <p class="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Perfect for <strong>founders</strong>, <strong>growth teams</strong>, and <strong>solo creators</strong> who need marketing results without the complexity.
        </p>

        <div class="absolute top-0 right-0 w-4 h-4 bg-purple-400 rounded-full gentle-float" style="animation-delay: -2s;"></div>

        <!-- New Cards Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
          {#each [
            {
              heading: 'Validate Ideas Fast',
              description: 'Founders can start a project and connect agents to quickly test and validate ideas, seeing what works in real-time to market multiple projects efficiently.'
            },
            {
              heading: 'Scale Growth Effortlessly',
              description: 'Growth teams can automate SEO, X, and Reddit tasks, streamlining campaigns to focus on strategy and scaling without manual overhead.'
            },
            {
              heading: 'Create with Ease',
              description: 'Solo creators can leverage AI agents to produce engaging content and build communities, saving time and boosting impact across platforms.'
            }
          ] as card}
            <div class="stat-card p-6 rounded-lg text-center">
              <div class="text-xl font-semibold text-zinc-900 mb-2">{card.heading}</div>
              <div class="text-sm text-zinc-500">{card.description}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

