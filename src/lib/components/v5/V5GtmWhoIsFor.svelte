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
</script>

<section bind:this={sectionRef} id="who-its-for" class="py-20 sm:py-28 bg-white font-[Poppins] text-zinc-900 border-t border-b border-zinc-100 relative overflow-hidden w-full">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

      <!-- Left: Punchy visual blocks (Zero text bloat, instant comprehension) -->
      <div
        class="lg:col-span-7"
        style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 28}px); transition: opacity 0.7s ease, transform 0.7s ease;"
      >
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
          For Whom
        </div>

        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-950 mb-5 tracking-tight leading-[1.05]">
          This is for you
          <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">if...</span>
        </h2>

        <p class="text-zinc-600 text-base sm:text-lg leading-relaxed mb-8 font-light max-w-xl">
          We partner with Seed–Series A B2B teams that need production GTM engineering without hiring full-time headcount.
        </p>

        <!-- LARGE COLORFUL BLOCKS: One look, user sees, user understands -->
        <div class="flex flex-wrap gap-3 max-w-2xl select-none">
          <!-- Block 1 -->
          <div class="px-5 py-3 rounded-2xl sm:rounded-3xl bg-[#8B5CF6] text-white text-base sm:text-lg font-black shadow-sm -rotate-1 hover:rotate-0 transition-transform">
            Seed to Series A
          </div>

          <!-- Block 2 -->
          <div class="px-5 py-3 rounded-2xl sm:rounded-3xl bg-[#FF3815] text-white text-base sm:text-lg font-black shadow-sm rotate-1 hover:rotate-0 transition-transform">
            Core devs busy on product
          </div>

          <!-- Block 3 -->
          <div class="px-6 py-3.5 rounded-2xl sm:rounded-3xl bg-[#FFEB00] text-zinc-950 text-lg sm:text-2xl font-black shadow-md rotate-1 hover:rotate-0 transition-transform">
            Pipelines in 2–4 weeks, not quarters
          </div>

          <!-- Block 4 -->
          <div class="px-5 py-3 rounded-2xl sm:rounded-3xl bg-[#10B981] text-white text-base sm:text-lg font-black shadow-sm -rotate-1 hover:rotate-0 transition-transform">
            100% in your GitHub
          </div>

          <!-- Block 5 -->
          <div class="px-5 py-3 rounded-2xl sm:rounded-3xl bg-[#FFD2E8] text-zinc-950 text-base sm:text-lg font-black shadow-sm rotate-1 hover:rotate-0 transition-transform">
            Zero platform lock-in
          </div>

          <!-- Block 6 -->
          <div class="px-5 py-3 rounded-2xl sm:rounded-3xl bg-zinc-950 text-white text-base sm:text-lg font-black shadow-sm -rotate-1 hover:rotate-0 transition-transform">
            Direct into your stack (HubSpot, Slack, Postgres)
          </div>
        </div>
      </div>

      <!-- Right: Outcome & Positioning Card -->
      <div
        class="lg:col-span-5 relative"
        style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 36}px); transition: opacity 0.7s ease 200ms, transform 0.7s ease 200ms;"
      >
        <div class="relative bg-[#1C1714] rounded-[2.5rem] p-8 lg:p-10 border border-[#28211C] shadow-2xl overflow-hidden">
          <div class="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/15 rounded-full blur-[80px] pointer-events-none"></div>

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
            </div>

            <div class="mb-6">
              <span class="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-2">Engineered For Scale</span>
              <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Stop patching brittle tools.<br />
                <span class="font-['Instrument_Serif'] italic font-normal text-amber-300">Deploy production revenue systems.</span>
              </h3>
            </div>

            <p class="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              Most teams stitch together Apollo, Clay, and HubSpot with fragile zaps and manual spreadsheets. We engineer reliable data pipelines, custom AI agents, and deterministic CRM syncs that run autonomously.
            </p>

            <div class="space-y-3 pt-4 border-t border-white/10 text-xs font-mono">
              <div class="flex items-center justify-between">
                <span class="text-zinc-400">Full-Time GTME Cost</span>
                <span class="text-zinc-300">$180,000+ / yr</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-zinc-400">Flowjoy Sprint</span>
                <span class="text-emerald-400 font-bold">Shipped in 2–4 weeks</span>
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
