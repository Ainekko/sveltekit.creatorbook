<script lang="ts">
  import { onMount } from 'svelte';

  let sectionRef: HTMLElement;
  let visible = false;

  onMount(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { visible = true; obs.disconnect(); }
      },
      { threshold: 0.06 }
    );
    obs.observe(sectionRef);
    return () => obs.disconnect();
  });

  const outcomes = [
    {
      problem: 'Missing calls while on the job',
      outcome: 'Zero missed calls — AI picks up every time, 24/7',
      icon: '📞',
      metric: '0',
      metricLabel: 'missed calls',
      source: 'MHR client · first 30 days'
    },
    {
      problem: 'Spending hours on manual follow-ups',
      outcome: 'Automatic SMS + email follow-ups after every interaction',
      icon: '⏰',
      metric: '2h+',
      metricLabel: 'saved daily',
      source: 'MHR client · manual texting eliminated'
    },
    {
      problem: 'Leads going cold before you respond',
      outcome: 'Instant response — leads engaged in under 60 seconds',
      icon: '🔥',
      metric: '<60s',
      metricLabel: 'response time',
      source: 'Retell AI voice latency'
    },
    {
      problem: 'No visibility into what\'s happening',
      outcome: 'Custom dashboard with every call, lead, and metric — live',
      icon: '📊',
      metric: 'Real-time',
      metricLabel: 'visibility',
      source: ''
    },
    {
      problem: 'Paying $4k/mo for a receptionist who still misses calls',
      outcome: 'AI front desk starting at $999/mo — never sick, never late',
      icon: '💰',
      metric: 'From $999',
      metricLabel: '/month',
      source: 'vs $3.5k–$4.5k for a full-time hire'
    },
    {
      problem: 'Trying to DIY with Zapier/GHL but it breaks',
      outcome: 'One custom system, built for YOUR workflow, maintained by us',
      icon: '🔧',
      metric: '4 weeks',
      metricLabel: 'to working MVP',
      source: ''
    }
  ];
</script>

<section bind:this={sectionRef} class="py-24 bg-[#0D0D10] font-[Poppins] relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <!-- Header -->
    <div
      class="text-center mb-20"
      style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 32}px); transition: opacity 0.7s ease, transform 0.7s ease;"
    >
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-zinc-400 mb-6">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
        The real cost of slow ops
      </div>
      <h2 class="text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
        Your problem.<br class="hidden md:block" />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">Our solution.</span>
      </h2>
      <p class="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
        Every hour your team spends on repetitive ops is an hour they're not spending on clients. Here's what changes.
      </p>
    </div>

    <!-- Problem → Outcome Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each outcomes as item, idx}
        <div
          class="group relative bg-[#111215] rounded-[2rem] p-7 border border-white/[0.06] shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-white/10"
          style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 30}px); transition: opacity 0.6s ease {idx * 80}ms, transform 0.6s ease {idx * 80}ms;"
        >
          <!-- Noise -->
          <div class="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"></div>

          <div class="relative z-10">
            <!-- Icon + Metric -->
            <div class="flex items-center justify-between mb-5">
              <span class="text-2xl">{item.icon}</span>
              <div class="text-right">
                <div class="text-lg font-bold text-white leading-none">{item.metric}</div>
                <div class="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">{item.metricLabel}</div>
              </div>
            </div>

            <!-- Problem (crossed out feel) -->
            <p class="text-zinc-500 text-[13px] mb-3 flex items-start gap-2">
              <span class="text-rose-400 mt-0.5 flex-shrink-0">✕</span>
              <span class="line-through decoration-zinc-600">{item.problem}</span>
            </p>

            <!-- Outcome -->
            <p class="text-white text-[14px] font-medium leading-snug flex items-start gap-2">
              <span class="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
              <span>{item.outcome}</span>
            </p>

            <!-- Source attribution -->
            {#if item.source}
              <p class="text-[10px] text-zinc-600 mt-3 pl-5 italic">{item.source}</p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
