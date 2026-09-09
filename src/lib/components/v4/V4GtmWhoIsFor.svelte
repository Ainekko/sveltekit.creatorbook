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

  const checks = [
    'Your core engineers are busy building product and can\'t build sales tooling',
    'You can\'t justify a $180k GTME yet, but need high-end revenue systems',
    'You\'re already using Clay / Apollo but the systems still feel brittle',
    'You want production pipelines in weeks, not quarters',
    'You demand 100% code repository ownership with zero platform lock-in',
    'You need systems engineered directly around your stack (HubSpot, Salesforce, Slack, Postgres)'
  ];
</script>

<section bind:this={sectionRef} id="who-its-for" class="py-24 bg-white font-[Poppins] text-zinc-900 border-t border-b border-zinc-100 relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

      <!-- Left: Checklist (7 cols) -->
      <div
        class="lg:col-span-7"
        style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 28}px); transition: opacity 0.7s ease, transform 0.7s ease;"
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200/80 text-sm font-semibold text-violet-700 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
          For Whom
        </div>

        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-950 mb-5 tracking-tight leading-[1.05]">
          This is for you
          <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">if...</span>
        </h2>

        <p class="text-zinc-600 text-base sm:text-lg leading-relaxed mb-10 font-light max-w-xl">
          We partner with Seed–Series A B2B startups that have product traction and know where their growth is bottlenecked — they just need dedicated engineering to ship the fix.
        </p>

        <div class="space-y-3.5">
          {#each checks as check, idx}
            <div
              class="flex items-start gap-4 px-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 transition-all duration-300 hover:bg-zinc-100/80 hover:border-zinc-300"
              style="opacity: {visible ? 1 : 0}; transform: translateX({visible ? 0 : -20}px); transition: opacity 0.5s ease {idx * 60}ms, transform 0.5s ease {idx * 60}ms;"
            >
              <div class="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-[14px] text-zinc-800 font-medium leading-snug">{check}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Right: Outcome & Positioning Card (5 cols) -->
      <div
        class="lg:col-span-5 relative"
        style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 36}px); transition: opacity 0.7s ease 200ms, transform 0.7s ease 200ms;"
      >
        <div class="relative bg-[#1C1714] rounded-[2.5rem] p-8 lg:p-10 border border-[#28211C] shadow-2xl overflow-hidden">
          <div class="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/15 rounded-full blur-[80px] pointer-events-none"></div>
          <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-400/8 rounded-full blur-[70px] pointer-events-none"></div>

          <div class="relative z-10">
            <!-- Overlapping integration logos cluster -->
            <div class="flex items-center -space-x-2.5 mb-6">
              <div class="w-10 h-10 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center p-2">
                <img src="/flowjoy/logos/Full%20Mark/Dark/Clay_Logo_Primary_Blk.png" alt="Clay" class="w-full h-full object-contain" />
              </div>
              <div class="w-10 h-10 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center p-2">
                <img src="https://cdn.simpleicons.org/hubspot/FF7A59" alt="HubSpot" class="w-full h-full object-contain" />
              </div>
              <div class="w-10 h-10 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center p-2">
                <img src="/flowjoy/logos/apollo/apollo-icon.svg" alt="Apollo" class="w-full h-full object-contain" />
              </div>
              <div class="w-10 h-10 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center p-2">
                <svg class="w-full h-full" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M27.2 80.6c0 7.3-5.9 13.2-13.2 13.2C6.7 93.8.8 87.9.8 80.6c0-7.3 5.9-13.2 13.2-13.2h13.2v13.2zm6.7 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33.2c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80.6z" fill="#E01E5A"/>
                  <path d="M47.1 27.2c-7.3 0-13.2-5.9-13.2-13.2C33.9 6.7 39.8.8 47.1.8c7.3 0 13.2 5.9 13.2 13.2v13.2H47.1zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.3.7 54.4.7 47.1c0-7.3 5.9-13.2 13.2-13.2h33.2z" fill="#36C5F0"/>
                  <path d="M100.8 47.1c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2h-13.2V47.1zm-6.7 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.9C80.9 6.6 86.8.7 94.1.7c7.3 0 13.2 5.9 13.2 13.2v33.2z" fill="#2EB67D"/>
                  <path d="M80.9 100.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2v-13.2h13.2zm0-6.7c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.2c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.9z" fill="#ECB22E"/>
                </svg>
              </div>
            </div>

            <div class="mb-6">
              <span class="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-2">The Positioning</span>
              <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Clay is the infrastructure.<br />
                <span class="font-['Instrument_Serif'] italic font-normal text-amber-300">We’re the GTM engineering team.</span>
              </h3>
            </div>

            <p class="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              Most teams buy Clay and Apollo expecting magic, but get stuck when it comes to custom webhooks, data hygiene, and end-to-end CRM integration. We bridge the gap with production-grade engineering.
            </p>

            <div class="space-y-3 pt-4 border-t border-white/10 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-zinc-400">Full-Time GTME Cost</span>
                <span class="text-zinc-300 font-mono">$180,000+ / yr</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-zinc-400">Flowjoy Sprint</span>
                <span class="text-emerald-400 font-bold font-mono">Shipped in 2–4 weeks</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-zinc-400">Code Ownership</span>
                <span class="text-white font-semibold">100% in your GitHub</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
