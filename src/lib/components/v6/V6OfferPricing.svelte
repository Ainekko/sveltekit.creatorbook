<script lang="ts">
  import { onMount } from 'svelte';

  let s: HTMLElement;
  let v = false;

  onMount(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { v = true; o.disconnect(); } }, { threshold: 0.05 });
    o.observe(s);
    return () => o.disconnect();
  });
</script>

<section id="pricing" bind:this={s} class="py-24 bg-white font-[Poppins] text-zinc-900 border-t border-b border-zinc-100 relative">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div
      class="text-center mb-16"
      style="opacity:{v?1:0};transform:translateY({v?0:28}px);transition:opacity .7s ease,transform .7s ease"
    >
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/80 text-sm font-semibold text-emerald-700 mb-6">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        Simple Pricing
      </div>
      <h2 class="text-4xl md:text-6xl font-bold text-zinc-950 mb-5 tracking-tight leading-[1.05]">
        GTM engineering<br class="hidden md:block" />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">without the hire.</span>
      </h2>
      <p class="text-zinc-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
        We build production revenue systems for Seed–Series A teams. You keep 100% of the code.
      </p>
    </div>

    <!-- Pricing Cards Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

      <!-- Offer 1 -->
      <div
        class="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/90 shadow-sm flex flex-col justify-between hover:border-zinc-700 transition"
        style="opacity:{v?1:0};transform:translateY({v?0:36}px);transition:opacity .65s ease .1s,transform .65s ease .1s"
      >
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Fixed Scope</span>
            <span class="text-xs font-medium bg-zinc-200 text-zinc-800 px-3 py-1 rounded-full">
              2–4 Weeks
            </span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-bold text-zinc-950 mb-2">
            GTM Engineering Sprint
          </h3>
          <p class="text-sm text-zinc-600 mb-6 font-light">
            You pick one critical GTM bottleneck. We engineer, test, and ship the production system that fixes it.
          </p>

          <div class="flex items-baseline gap-2 mb-8">
            <span class="text-4xl sm:text-5xl font-bold text-zinc-950 tracking-tight">$3,000 – $7,500</span>
            <span class="text-zinc-500 text-sm font-light">/ sprint</span>
          </div>

          <div class="space-y-3.5 mb-8 text-sm text-zinc-700 font-light border-t border-zinc-200 pt-6">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span><strong>One targeted bottleneck:</strong> e.g., Automated account intelligence or scraping pipeline.</span>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span><strong>Full architecture &amp; code:</strong> Data schemas, webhook listeners, and retry queues.</span>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span><strong>Direct stack integration:</strong> HubSpot, Salesforce, Postgres, Slack deal rooms.</span>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span><strong>IP handoff:</strong> Complete code repository, setup documentation, video walkthrough.</span>
            </div>
          </div>
        </div>

        <button
          data-cal-link="hafid-ahlaqach-nigixz/15min"
          data-cal-namespace="15min"
          data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
          class="w-full py-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm transition text-center shadow-sm cursor-pointer"
        >
          Scope a sprint
        </button>
      </div>

      <!-- Offer 2 -->
      <div
        class="p-8 sm:p-10 rounded-3xl bg-[#1C1714] border border-[#2C2420] shadow-2xl flex flex-col justify-between relative overflow-hidden"
        style="opacity:{v?1:0};transform:translateY({v?0:36}px);transition:opacity .65s ease .2s,transform .65s ease .2s"
      >
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">Embedded Partner</span>
            <span class="text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
              Monthly Retainer
            </span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-bold text-white mb-2">
            Embedded GTM Partner
          </h3>
          <p class="text-sm text-zinc-400 mb-6 font-light">
            We become your external engineering arm for GTM. One engineering team. One bottleneck at a time. Production shipped every sprint.
          </p>

          <div class="flex items-baseline gap-2 mb-8">
            <span class="text-4xl sm:text-5xl font-bold text-white tracking-tight">$5,000 – $12,000</span>
            <span class="text-zinc-500 text-sm font-light">/ month</span>
          </div>

          <div class="space-y-3.5 mb-8 text-sm text-zinc-300 font-light border-t border-[#2C2420] pt-6">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span><strong>Continuous sprint capacity:</strong> Solve pipeline bottlenecks as your go-to-market evolves.</span>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span><strong>Rapid experimentation:</strong> Test new outbound plays, signals, and agent workflows quickly.</span>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span><strong>Direct Slack channel:</strong> Dedicated communication with your lead GTM engineer.</span>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span><strong>100% code ownership:</strong> Every line written belongs to your company forever.</span>
            </div>
          </div>
        </div>

        <button
          data-cal-link="hafid-ahlaqach-nigixz/15min"
          data-cal-namespace="15min"
          data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
          class="w-full py-4 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm transition text-center shadow-lg cursor-pointer"
        >
          Discuss embedded partnership
        </button>
      </div>

    </div>

  </div>
</section>
