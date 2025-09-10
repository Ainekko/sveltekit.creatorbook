<script>
  import { onMount } from 'svelte';
 
  let email = '';
  let isSubmitting = false;
  let activeAgent = 'orion';
 
  const agents = {
    orion: {
      id: 'orion',
      name: 'Orion',
      subtitle: 'SEO Master',
      description: 'Drives organic growth while streamlining workflows with smart keyword strategies, content optimization, and elevated search rankings.',
      gradient: 'from-emerald-500 to-teal-600',
      icon: 'search',
      tags: ['Keyword Research', 'Content Outlines', 'Traffic Analysis'],
      metrics: {
        main: '247',
        mainLabel: 'Keywords Tracked',
        stats: [
          { value: '12.4K', label: 'Organic Visitors' },
          { value: '↑ 23', label: 'Avg. Position' },
          { value: '+18%', label: 'Growth Rate' }
        ]
      },
      demoLink: 'https://example.com/try-orion' // Replace with actual demo link
    },
    sirius: {
      id: 'sirius',
      name: 'Sirius',
      subtitle: 'Twitter Engagement',
      description: 'Amplifies brand presence and accelerates audience expansion on Twitter through captivating posts and dynamic interactions.',
      gradient: 'from-blue-500 to-indigo-600',
      icon: 'twitter',
      tags: ['Content Creation', 'Engagement', 'Analytics'],
      metrics: {
        main: '45.2K',
        mainLabel: 'Weekly Reach',
        stats: [
          { value: '8.4%', label: 'Engagement Rate' },
          { value: '2.1K', label: 'Daily Interactions' },
          { value: '+34%', label: 'Follower Growth' }
        ]
      },
      demoLink: 'https://example.com/try-sirius' // Replace with actual demo link
    },
    vega: {
      id: 'vega',
      name: 'Vega',
      subtitle: 'Reddit Growth',
      description: 'Cultivates vibrant communities and fuels user acquisition on Reddit via strategic posts and genuine conversations.',
      gradient: 'from-orange-500 to-pink-600',
      icon: 'reddit',
      tags: ['Community Building', 'Content Strategy', 'Engagement'],
      metrics: {
        main: '1.2K',
        mainLabel: 'Total Karma',
        stats: [
          { value: '12', label: 'Active Subs' },
          { value: '89%', label: 'Upvote Rate' },
          { value: '156', label: 'Monthly Posts' }
        ]
      },
      demoLink: 'https://example.com/try-vega' // Replace with actual demo link
    }
  };

  async function handleContact() {
    if (isSubmitting || !email) return;
   
    if (!email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
   
    isSubmitting = true;
   
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`🚀 Thanks for reaching out! We'll contact you at ${email} to discuss your custom AI agent needs.`);
      email = '';
    } catch (error) {
      alert('Something went wrong. Please try again or contact support.');
    } finally {
      isSubmitting = false;
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleContact();
    }
  }

  function setActiveAgent(agentId) {
    activeAgent = agentId;
  }

  onMount(() => {
    // Animate counters and other mount effects can go here
  });
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap');
 
  :global(body) {
    font-family: 'Inter', sans-serif;
  }
 
  .gradient-text {
    background: linear-gradient(135deg, #10b981 0%, #14b8a6 25%, #06b6d4 50%, #3b82f6 75%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .silver-gradient {
    background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 50%, #6b7280 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
 
  .glass-card {
    backdrop-filter: blur(16px);
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
 
  .pulse-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }
 
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
    50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
  }
 
  .floating-element {
    animation: float 6s ease-in-out infinite;
  }
 
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
 
  .tab-button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
 
  .tab-button:hover {
    transform: translateY(-2px);
  }
 
  .agent-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 400px;
  }
 
  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
 
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .speech-bubble {
    position: absolute;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 8px 12px;
    max-width: 160px;
    text-align: center;
    font-size: 13px;
    color: #d1d5db;
    animation: float 8s ease-in-out infinite;
    opacity: 0.8;
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
    border-top: 6px solid rgba(255, 255, 255, 0.05);
  }
  .mono-headline {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #9ca3af;
  }
  .zinc-gradient {
    background: linear-gradient(135deg, #a1a1aa 0%, #71717a 50%, #3f3f46 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>

<section class="relative min-h-screen bg-black text-white overflow-x-hidden">
  <!-- Background Elements -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div class="absolute bottom-20 left-1/3 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl floating-element" style="animation-delay: -4s;"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(16,185,129,0.1)_0%,_transparent_50%),_radial-gradient(circle_at_70%_80%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]"></div>
  </div>

  <!-- Floating Speech Bubbles -->
  <div class="absolute top-10 left-10 md:left-20 speech-bubble" style="animation-delay: -1s;">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-sm">👤</div>
      "Need custom AI for SEO?"
    </div>
  </div>
  <div class="absolute top-20 right-10 md:right-20 speech-bubble" style="animation-delay: -3s;">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-sm">👤</div>
      "Build AI for Twitter growth?"
    </div>
  </div>
  <div class="absolute bottom-40 left-1/4 speech-bubble" style="animation-delay: -5s;">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-sm">👤</div>
      "Automate Reddit engagement?"
    </div>
  </div>
  <div class="absolute top-1/3 right-1/4 speech-bubble" style="animation-delay: -2s;">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-sm">👤</div>
      "Tailored AI for SaaS?"
    </div>
  </div>
  <div class="absolute bottom-20 right-10 md:right-40 speech-bubble" style="animation-delay: -4s;">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-sm">👤</div>
      "Custom marketing agents?"
    </div>
  </div>

  <div class="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-16">
    <div class="max-w-6xl mx-auto w-full">
     
      <!-- Header and Video Side by Side -->
      <div class="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
        <!-- Header Section -->
        <div class="lg:w-1/2 text-center lg:text-left">
          <!-- Main Headline -->
          <div class="space-y-4">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold silver-gradient leading-tight">
              We Build AI Marketing Agents
              <span class="gradient-text">for SaaS Growth</span>
              <svg class="inline-block w-8 h-8 ml-2 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm0 17a7.5 7.5 0 110-15 7.5 7.5 0 010 15zm4.707-8.707a1 1 0 01-1.414 0L12 7.5l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"/>
              </svg>
            </h1>
            <p class="text-md md:text-lg lg:text-xl text-zinc-300 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Custom AI agents designed to supercharge your SaaS organic growth on SEO, Twitter
              <svg class="inline-block w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              , and Reddit
              <svg class="inline-block w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/>
              </svg>
              .
            </p>
          </div>
          
          <!-- CTA Section -->
          <div class="space-y-4 max-w-lg mx-auto lg:mx-0 mt-6">
            <div class="flex flex-col sm:flex-row gap-3">
              <input
                bind:value={email}
                on:keypress={handleKeyPress}
                type="email"
                placeholder="Enter your business email"
                class="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all text-center sm:text-left"
              />
              <button
                on:click={handleContact}
                disabled={isSubmitting}
                class="bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 pulse-glow whitespace-nowrap"
              >
                {isSubmitting ? 'Submitting...' : 'Book Free Consultation'}
              </button>
            </div>
            <p class="text-sm text-zinc-400 flex items-center justify-center lg:justify-start gap-2">
              <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Free strategy call • Custom proposal • No obligation
            </p>
          </div>
        </div>
        <!-- Video Section -->
        <div class="lg:w-1/2 flex flex-col items-center lg:items-end gap-6">
          <div class="max-w-md w-full">
            <video
              src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/AI+Marketing+Agents+for+SaaS+-+Google+Chrome+2025-06-11+11-34-43.mp4"
              controls
              autoplay
              muted
              loop
              class="w-full rounded-2xl shadow-2xl border border-zinc-800"
            >
              Your browser does not support the video tag.
            </video>
            <p class="text-sm text-zinc-400 mt-3 text-center lg:text-right">Watch our AI agents drive real growth.</p>
          </div>
        </div>
      </div>
      <!-- Social Proof Stats -->
      <div class="grid grid-cols-3 gap-8 max-w-md mx-auto mb-16">
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-white">50+</div>
          <div class="text-sm text-zinc-400">Custom Agents Built</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-white">94%</div>
          <div class="text-sm text-zinc-400">Client Retention</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-white">24/7</div>
          <div class="text-sm text-zinc-400">Agent Uptime</div>
        </div>
      </div>
     
      <!-- Agent Tabs Section -->
      <div class="space-y-8">
        <!-- Shared Heading -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-white mb-4">Here Are Our Agents</h2>
          <p class="text-lg text-zinc-300 max-w-2xl mx-auto">
            Test these plug-and-play versions for free. For tailored results, we build custom setups.
          </p>
        </div>

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
       
        <!-- Active Agent Card -->
        {#key activeAgent}
          <div class="fade-in">
            <div class="agent-card glass-card rounded-2xl overflow-hidden max-w-4xl mx-auto">
              <div class="bg-gradient-to-r {agents[activeAgent].gradient} p-8">
                <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
                  <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      {#if agents[activeAgent].icon === 'search'}
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      {:else if agents[activeAgent].icon === 'twitter'}
                        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      {:else if agents[activeAgent].icon === 'reddit'}
                        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/>
                        </svg>
                      {/if}
                    </div>
                    <div>
                      <h3 class="text-3xl font-bold text-white">{agents[activeAgent].name}</h3>
                      <p class="text-white/80 text-lg">{agents[activeAgent].subtitle}</p>
                    </div>
                  </div>
                  <div class="text-center lg:text-right">
                    <div class="text-white text-3xl font-bold">{agents[activeAgent].metrics.main}</div>
                    <div class="text-white/80">{agents[activeAgent].metrics.mainLabel}</div>
                  </div>
                </div>
               
                <p class="text-white/90 text-lg mb-6 leading-relaxed">{agents[activeAgent].description}</p>
               
                <div class="flex flex-wrap gap-3 mb-6">
                  {#each agents[activeAgent].tags as tag}
                    <span class="px-4 py-2 bg-white/20 text-white text-sm rounded-full font-medium">{tag}</span>
                  {/each}
                </div>
               
                <!-- Screenshot Placeholder Area -->
                <div class="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div class="text-white/60 text-center py-8">
                    <div class="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-lg flex items-center justify-center">
                      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <p class="text-lg font-medium">Agent Dashboard Demo</p>
                    <p class="text-sm">Real-time analytics from our plug-and-play agent</p>
                  </div>
                </div>
                <!-- Demo Button -->
                <div class="mt-6 text-center">
                  <a
                    href={agents[activeAgent].demoLink}
                    class="inline-block bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Test {agents[activeAgent].name} Free
                  </a>
                </div>
              </div>
             
              <div class="p-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {#each agents[activeAgent].metrics.stats as stat}
                    <div class="text-center p-4 glass-card rounded-xl">
                      <div class="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div class="text-zinc-400 text-sm">{stat.label}</div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {/key}
      </div>

      <div class="w-full h-[500px] flex justify-center items-center">
        <!-- Philosophy Section -->
        <div class="max-w-[300px] mx-auto lg:mx-0 text-center mt-6">
          <h4 class="mono-headline mb-2">Core Philosophy</h4>
          <p class="text-sm zinc-gradient leading-relaxed">
            Our AI agents empower <strong class="text-zinc-200">product creators, engineers, and visionaries</strong> lacking marketing expertise to ignite organic campaigns, nurture engaged communities, and catalyze lasting revenue growth.
          </p>
        </div>
      </div>
     
      <!-- Trust Indicators -->
      <div class="mt-20 pt-8 border-t border-zinc-800">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
          <div class="text-center">
            <div class="text-2xl font-bold text-white mb-1">50+</div>
            <div class="text-sm text-zinc-400">SaaS Clients</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-white mb-1">2M+</div>
            <div class="text-sm text-zinc-400">Impressions Generated</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-white mb-1">40%</div>
            <div class="text-sm text-zinc-400">Avg. Growth Boost</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-white mb-1">Expert</div>
            <div class="text-sm text-zinc-400">AI Builders</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>