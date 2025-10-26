<!-- src/routes/pricing.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let billingPeriod = 'monthly'; // or 'annual'
  let spotsRemaining = 10; // Could be fetched from API in real implementation

  const tiers = [
    {
      name: 'Free',
      planId: 'free',
      priceMonthly: '$0',
      priceAnnual: '$0',
      description: 'Perfect for getting started and testing the waters.',
      features: [
        '1 project included',
        'All AI agents (Nai, Elio, Rio)',
        'Simple workflow builder',
        'Automated execution',
        'Email support'
      ],
      buttonText: 'Continue for Free',
      gradient: 'from-gray-500 via-gray-600 to-gray-700',
      bgPattern: 'radial-gradient(circle at 50% 50%, rgba(107, 114, 128, 0.1) 0%, transparent 50%)',
      highlight: false,
      badge: '',
      isLifetime: false
    },
    {
      name: 'Starter',
      planId: 'starter',
      priceMonthly: '$29',
      priceAnnual: '$290',
      description: 'Perfect for solopreneurs testing a few ideas.',
      features: [
        '3 projects included',
        'All AI agents (Nai, Elio, Rio)',
        'Visual workflow builder',
        'Daily automated execution',
        'WordPress & webhook integrations',
        'Email support'
      ],
      buttonText: 'Start 14-day free trial',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      bgPattern: 'radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
      highlight: false,
      badge: '',
      isLifetime: false
    },
    {
      name: 'Lifetime',
      planId: 'lifetime',
      priceMonthly: '$299',
      priceAnnual: '$299',
      description: 'Pay once, market forever. Limited availability.',
      features: [
        '5 projects included',
        'All AI agents with priority execution',
        'Advanced analytics & A/B testing',
        'Custom content templates',
        'Lifetime updates & support',
        'API access',
        'Early access to new features'
      ],
      buttonText: 'Claim Your Spot',
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      bgPattern: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
      highlight: true,
      badge: `Only ${spotsRemaining} Left!`,
      isLifetime: true
    },
    {
      name: 'Pro',
      planId: 'pro',
      priceMonthly: '$79',
      priceAnnual: '$790',
      description: 'Built for builders launching multiple products.',
      features: [
        'Unlimited projects',
        'All AI agents with priority execution',
        'Advanced analytics & A/B testing',
        'Custom content templates',
        'Priority support',
        'API access',
        'Team collaboration'
      ],
      buttonText: 'Start 14-day free trial',
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
      bgPattern: 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
      highlight: false,
      badge: '',
      isLifetime: false
    },
    {
      name: 'Custom',
      planId: 'custom',
      priceMonthly: 'Custom',
      priceAnnual: 'Custom',
      description: 'Custom marketing assistants built for your needs.',
      features: [
        'Everything in Pro',
        'Custom AI agents for your niche',
        'White-label branding',
        'Dedicated support & SLA',
        'On-premise deployment',
        'Custom integrations',
        'Strategic consulting'
      ],
      buttonText: 'Contact Us',
      gradient: 'from-orange-400 via-red-500 to-pink-600',
      bgPattern: 'radial-gradient(circle at 60% 70%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)',
      highlight: false,
      badge: '',
      isLifetime: false
    }
  ];

  function handlePlanSelection(planId: string) {
    // Store plan selection and navigate to plans page with state
    if (planId === 'custom') {
      // For custom plan, maybe go to a contact form instead
      window.location.href = '/contact';
    } else {
      // Navigate to plans page with selected plan
      window.location.href = `/plans?selected=${planId}&billing=${billingPeriod}`;
    }
  }

  onMount(() => {
    // Any initialization logic
  });
</script>

<div class="dashboard-scale min-h-screen text-white bg-black font-[Poppins]">

  <main class="px-4 sm:px-8 py-16">
    <!-- Header -->
    <div class="text-center mb-16 w-full mx-auto">
      <h1 class="text-4xl md:text-5xl font-semibold text-white mb-4">
        Marketing that runs itself. <span class="font-['Pacifico'] text-orange-400">Daily</span>.
      </h1>
      <p class="text-zinc-400 text-lg md:text-xl mb-8 font-light">
        Set up once, let your AI agents find opportunities and create content every day. No complex workflows.
      </p>
      
      <!-- Billing Toggle -->
      <div class="inline-flex bg-zinc-950 rounded-full p-1 border border-zinc-800 mx-auto">
        <button 
          class="px-6 py-2 rounded-full text-sm font-medium transition-all {billingPeriod === 'monthly' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}"
          on:click={() => billingPeriod = 'monthly'}
        >
          Monthly
        </button>
        <button 
          class="px-6 py-2 rounded-full text-sm font-medium transition-all {billingPeriod === 'annual' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}"
          on:click={() => billingPeriod = 'annual'}
        >
          Annual <span class="text-emerald-400">(Save 20%)</span>
        </button>
      </div>
    </div>

    <!-- What You Get Section -->
    <div class="max-w-6xl mx-auto mb-16 bg-zinc-950 rounded-2xl border border-zinc-800 p-8 md:p-12">
      <h2 class="text-2xl md:text-3xl font-semibold text-white mb-8 text-center">
        All plans include your AI marketing team
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Nai - SEO Agent</h3>
          <p class="text-sm text-zinc-400">Keywords → Outlines → Posts → Auto-publish. Set it once, watch it run daily.</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 00.029.463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Elio - Reddit Agent</h3>
          <p class="text-sm text-zinc-400">Finds relevant threads where you can add value. Fresh opportunities delivered daily.</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Rio - X Agent</h3>
          <p class="text-sm text-zinc-400">Discovers conversations on X where your expertise matters. Never miss an opportunity.</p>
        </div>
      </div>
    </div>

    <!-- Lifetime Deal Banner -->
    <div class="max-w-6xl mx-auto mb-12">
      {#each tiers as tier}
        {#if tier.isLifetime}
        <div 
          class="bg-zinc-950 rounded-2xl border border-amber-500 shadow-lg shadow-amber-500/20 overflow-visible hover:border-amber-400 transition-all duration-300 relative"
          style="background-image: {tier.bgPattern}"
        >
          {#if tier.badge}
            <div class="absolute z-100 -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-red-600 text-white text-xs font-bold px-6 py-2 rounded-full animate-pulse-slow shadow-lg">
              🔥 {tier.badge}
            </div>
          {/if}
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            <!-- Tier Header -->
            <div class="md:col-span-1 bg-gradient-to-r rounded-2xl {tier.gradient} p-8 flex flex-col justify-center">
              <h3 class="text-3xl font-bold text-white mb-3">{tier.name}</h3>
              <div class="text-white/90 text-base mb-6">{tier.description}</div>
              <div class="text-5xl font-bold text-white mb-2">
                {tier.priceMonthly}
              </div>
              <span class="text-lg font-normal text-white/80">
                Pay once, use forever
              </span>
            </div>

            <!-- Features -->
            <div class="md:col-span-1 flex items-center">
              <ul class="space-y-3 w-full">
                {#each tier.features as feature}
                  <li class="flex items-start text-sm text-zinc-300">
                    <svg class="w-5 h-5 text-amber-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                {/each}
              </ul>
            </div>

            <!-- CTA -->
            <div class="md:col-span-1 flex flex-col justify-center items-center text-center">
              <div class="mb-6">
                <p class="text-zinc-400 text-sm mb-2">Regular Price: <span class="line-through">$999</span></p>
                <p class="text-amber-400 text-xl font-semibold">Limited Time: $299</p>
                <p class="text-zinc-500 text-xs mt-2">Save $700 — Never pay again</p>
              </div>
              <button 
                on:click={() => handlePlanSelection(tier.planId)}
                class="w-full bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white px-8 py-5 rounded-xl text-lg font-bold transition-all duration-200 shadow-lg shadow-amber-500/50 hover:shadow-amber-500/70 hover:scale-105"
              >
                {tier.buttonText} →
              </button>
              <p class="text-xs text-zinc-500 mt-4 flex items-center gap-2">
                <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                </svg>
                Offer expires when spots are gone
              </p>
            </div>
          </div>
        </div>
        {/if}
      {/each}
    </div>

    <!-- Pricing Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1500px] mx-auto w-full">
      {#each tiers as tier}
        {#if !tier.isLifetime}
        <div 
          class="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-visible hover:border-zinc-700 transition-all duration-300 relative"
          style="background-image: {tier.bgPattern}"
        >
          
          <!-- Tier Header -->
          <div class="p-8 bg-gradient-to-r rounded-2xl {tier.gradient}">
            <h3 class="text-2xl font-bold text-white mb-2">{tier.name}</h3>
            <div class="text-white/90 text-sm mb-6 min-h-[40px]">{tier.description}</div>
            <div class="text-4xl font-bold text-white">
              {billingPeriod === 'monthly' ? tier.priceMonthly : tier.priceAnnual}
              <span class="text-base font-normal text-white/80 ml-1">
                {tier.priceMonthly === 'Custom' ? '' : (billingPeriod === 'monthly' ? '/month' : '/year')}
              </span>
            </div>
          </div>

          <!-- Features -->
          <div class="p-8">
            <ul class="space-y-4 mb-8">
              {#each tier.features as feature}
                <li class="flex items-start text-sm text-zinc-300">
                  <svg class="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              {/each}
            </ul>

            <!-- CTA Button -->
            <button 
              on:click={() => handlePlanSelection(tier.planId)}
              class="w-full bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-4 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg"
            >
              {tier.buttonText}
            </button>
            
            {#if tier.buttonText.includes('trial')}
              <p class="text-xs text-zinc-500 text-center mt-3 flex items-center justify-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                No credit card required
              </p>
            {/if}
          </div>
        </div>
        {/if}
      {/each}
    </div>

    <!-- FAQ Section -->
    <div class="mt-24 text-center max-w-6xl mx-auto">
      <h2 class="text-3xl font-semibold text-white mb-12">Questions? We've got answers.</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-zinc-950 rounded-xl p-8 border border-zinc-800 text-left hover:border-zinc-700 transition-all">
          <h3 class="text-white font-medium mb-3 text-lg">What's a project?</h3>
          <p class="text-zinc-400 text-sm leading-relaxed">A project is a product you're marketing. Each project gets access to all three AI agents (Nai, Elio, Rio) working daily to grow your presence.</p>
        </div>
        <div class="bg-zinc-950 rounded-xl p-8 border border-zinc-800 text-left hover:border-zinc-700 transition-all">
          <h3 class="text-white font-medium mb-3 text-lg">How does the free trial work?</h3>
          <p class="text-zinc-400 text-sm leading-relaxed">14 days, full access to everything. No credit card needed. If you love it, keep going. If not, no hard feelings.</p>
        </div>
        <div class="bg-zinc-950 rounded-xl p-8 border border-zinc-800 text-left hover:border-zinc-700 transition-all">
          <h3 class="text-white font-medium mb-3 text-lg">Can I switch plans anytime?</h3>
          <p class="text-zinc-400 text-sm leading-relaxed">Absolutely. Upgrade when you're launching more projects, downgrade if you need to pause. Changes take effect immediately.</p>
        </div>
        <div class="bg-zinc-950 rounded-xl p-8 border border-zinc-800 text-left hover:border-zinc-700 transition-all">
          <h3 class="text-white font-medium mb-3 text-lg">What if I need custom agents?</h3>
          <p class="text-zinc-400 text-sm leading-relaxed">That's what Custom is for. We'll build specialized marketing assistants tailored to your niche and strategy.</p>
        </div>
      </div>
    </div>

    <!-- Final CTA -->
    <div class="mt-24 text-center max-w-3xl mx-auto bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-zinc-800 p-12">
      <h2 class="text-3xl md:text-4xl font-semibold text-white mb-4">
        Ready to automate your marketing?
      </h2>
      <p class="text-zinc-400 text-lg mb-8">
        Join builders who ship fast and let AI handle the growth.
      </p>
      <button 
        on:click={() => handlePlanSelection('pro')}
        class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg text-lg"
      >
        Start your 14-day free trial
      </button>
      <p class="text-sm text-zinc-500 mt-4">No credit card required · Cancel anytime</p>
    </div>
  </main>

</div>

<style>
  /* Crisp global scale for this component only (no Tailwind class changes) */
  .dashboard-scale {
    /* Chromium/Edge/Brave: crisp text & uniform layout */
    zoom: 0.8; /* 80% */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Fallback for browsers that don't support zoom (e.g., Firefox) */
  @supports not (zoom: 1) {
    .dashboard-scale {
      transform: scale(0.8);
      transform-origin: top left;
      /* compensate width shrink so the grid doesn't collapse */
      width: 125%;
    }
  }

  /* Global styles only - component-specific styles should be in their components */
  :global(*) {
    transition: background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
  }

  /* Custom scrollbar for the entire app */
  :global(::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(::-webkit-scrollbar-track) {
    background: rgba(24, 24, 27, 0.8);
  }

  :global(::-webkit-scrollbar-thumb) {
    background: rgba(113, 113, 122, 0.4);
    border-radius: 4px;
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background: rgba(113, 113, 122, 0.6);
  }

  /* Focus styles for accessibility */
  :global(button:focus), :global(a:focus), :global(input:focus), :global(select:focus), :global(textarea:focus) {
    outline: 2px solid rgba(236, 72, 153, 0.5);
    outline-offset: 2px;
  }

  /* Line clamp utility */
  :global(.line-clamp-2) {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  /* Custom animations */
  @keyframes pulse-slow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  :global(.animate-pulse-slow) {
    animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>