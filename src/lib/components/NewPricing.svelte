<!-- src/routes/pricing.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
  
    let billingPeriod = 'monthly'; // or 'annual'
  
    const tiers = [
      {
        name: 'Freemium',
        priceMonthly: 'Free',
        priceAnnual: 'Free',
        description: 'Get started with basic AI agents and limited generations.',
        features: [
          'Access to 1 AI agent',
          '5 content generations/month',
          'Basic metrics and insights',
          'Community support'
        ],
        buttonText: 'Sign Up Free',
        gradient: 'from-zinc-400 via-zinc-500 to-zinc-600',
        bgPattern: 'radial-gradient(circle at 50% 50%, rgba(113, 113, 122, 0.1) 0%, transparent 50%)'
      },
      {
        name: 'Starter',
        priceMonthly: '$29',
        priceAnnual: '$290',
        description: 'Essential tools for solopreneurs and small teams.',
        features: [
          'All AI agents unlocked',
          '50 content generations/month',
          'Advanced metrics and activity feed',
          'Email support',
          'Basic integrations'
        ],
        buttonText: 'Start Free Trial',
        gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
        bgPattern: 'radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)'
      },
      {
        name: 'Pro',
        priceMonthly: '$79',
        priceAnnual: '$790',
        description: 'Professional features for growing agencies and businesses.',
        features: [
          'Unlimited content generations',
          'All agents with premium insights',
          'A/B testing and advanced analytics',
          'Priority support',
          'CMS and API integrations',
          'Custom content templates'
        ],
        buttonText: 'Start Free Trial',
        gradient: 'from-blue-400 via-indigo-500 to-purple-600',
        bgPattern: 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
      },
      {
        name: 'Enterprise',
        priceMonthly: 'Custom',
        priceAnnual: 'Custom',
        description: 'Tailored solutions for large organizations.',
        features: [
          'Everything in Pro',
          'White-label branding',
          'Dedicated API access',
          'Custom agent development',
          'Enterprise support & SLA',
          'On-premise deployment options'
        ],
        buttonText: 'Contact Sales',
        gradient: 'from-orange-400 via-red-500 to-pink-600',
        bgPattern: 'radial-gradient(circle at 60% 70%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)'
      }
    ];
  
    onMount(() => {
      // Any initialization logic, e.g., check user subscription
    });
  </script>
  
  <div class="dashboard-scale min-h-screen text-white bg-black">
  
    <main class="px-8 py-16">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
        <p class="text-zinc-400 text-lg mb-8">Choose the plan that fits your needs. All plans include a 14-day free trial.</p>
        
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
            Annual (Save 20%)
          </button>
        </div>
      </div>
  
      <!-- Pricing Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each tiers as tier}
          <div class="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-300"
               style="background-image: {tier.bgPattern}">
            
            <!-- Tier Header -->
            <div class="p-6 bg-gradient-to-r {tier.gradient}">
              <h3 class="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <div class="text-white/80 text-sm mb-4">{tier.description}</div>
              <div class="text-3xl font-bold text-white">
                {billingPeriod === 'monthly' ? tier.priceMonthly : tier.priceAnnual}
                <span class="text-sm font-normal text-white/70">
                  {tier.priceMonthly === 'Free' || tier.priceMonthly === 'Custom' ? '' : billingPeriod === 'monthly' ? '/month' : '/year'}
                </span>
              </div>
            </div>
  
            <!-- Features -->
            <div class="p-6">
              <ul class="space-y-4 mb-6">
                {#each tier.features as feature}
                  <li class="flex items-start text-sm text-zinc-300">
                    <svg class="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                {/each}
              </ul>
  
              <!-- CTA Button -->
              <button class="w-full bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200">
                {tier.buttonText}
              </button>
            </div>
          </div>
        {/each}
      </div>
  
      <!-- FAQ or Additional Section -->
      <div class="mt-16 text-center">
        <h2 class="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800 text-left">
            <h3 class="text-white font-medium mb-2">What is the free trial?</h3>
            <p class="text-zinc-400 text-sm">All paid plans include a 14-day free trial with full access. No credit card required.</p>
          </div>
          <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800 text-left">
            <h3 class="text-white font-medium mb-2">Can I switch plans?</h3>
            <p class="text-zinc-400 text-sm">Yes, upgrade or downgrade anytime. Changes take effect at the end of your billing cycle.</p>
          </div>
          <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800 text-left">
            <h3 class="text-white font-medium mb-2">What payment methods do you accept?</h3>
            <p class="text-zinc-400 text-sm">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
          </div>
          <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800 text-left">
            <h3 class="text-white font-medium mb-2">Is there a money-back guarantee?</h3>
            <p class="text-zinc-400 text-sm">Yes, 30-day money-back guarantee on all plans if you're not satisfied.</p>
          </div>
        </div>
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