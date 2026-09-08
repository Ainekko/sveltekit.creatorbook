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
    'Your core engineers are slammed with product features and can\'t be pulled off the roadmap',
    'Your reps or founders waste 15+ hours/week manually researching accounts & copying data',
    'You already use Apollo, Clay, or CRM tools, but need custom engineering to connect them',
    'You want custom prospecting and intent pipelines without hiring a $180k/yr sales engineer',
    'You need systems engineered directly around your stack (HubSpot, Salesforce, Postgres, Slack)',
    'You want full code repository ownership and production deployment in 2–4 weeks'
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
          Is this your team?
        </div>

        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-950 mb-5 tracking-tight leading-[1.05]">
          This is for you
          <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">if...</span>
        </h2>

        <p class="text-zinc-600 text-base sm:text-lg leading-relaxed mb-10 font-light max-w-xl">
          We partner with Seed &rarr; Series A B2B startups that have product traction and know where their growth is bottlenecked — they just need dedicated engineering to ship the fix.
        </p>

        <div class="space-y-3.5">
          {#each checks as check, idx}
            <div
              class="flex items-start gap-4 px-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 transition-all duration-300 hover:bg-zinc-100/80 hover:border-zinc-300"
              style="opacity: {visible ? 1 : 0}; transform: translateX({visible ? 0 : -20}px); transition: opacity 0.5s ease {idx * 60}ms, transform 0.5s ease {idx * 60}ms;"
            >
              <div class="w-6 h-6 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-[14px] text-zinc-800 font-medium leading-snug">{check}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Right: Outcome & Thesis Card (5 cols) -->
      <div
        class="lg:col-span-5 relative"
        style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 36}px); transition: opacity 0.7s ease 200ms, transform 0.7s ease 200ms;"
      >
        <div class="relative bg-[#1C1714] rounded-[2.5rem] p-8 lg:p-10 border border-[#28211C] shadow-2xl overflow-hidden">
          <!-- Glow blobs -->
          <div class="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/15 rounded-full blur-[80px] pointer-events-none"></div>
          <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-400/8 rounded-full blur-[70px] pointer-events-none"></div>

          <!-- Noise -->
          <div class="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url=%23n)%22/%3E%3C/svg%3E');"></div>

          <div class="relative z-10">
            <!-- Overlapping integration logos cluster -->
            <div class="flex items-center -space-x-2.5 mb-6">
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
              <div class="w-10 h-10 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center p-2">
                <img src="https://cdn.simpleicons.org/anthropic/D97757" alt="Claude" class="w-full h-full object-contain" />
              </div>
              <div class="w-10 h-10 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center p-2">
                <img src="/flowjoy/logos/Twilio/Twilio_idseuPD28S_0.svg" alt="Twilio" class="w-full h-full object-contain" />
              </div>
            </div>

            <div class="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">The Flowjoy Promise</div>
            <h3 class="text-2xl font-bold text-white mb-4 leading-snug">
              Your engineers build product.<br />
              <span class="font-['Instrument_Serif'] italic font-normal text-zinc-400">We engineer around your GTM stack.</span>
            </h3>

            <p class="text-zinc-400 text-sm leading-relaxed mb-8 font-light">
              Apollo, Clay, and your CRM are building blocks. We build the custom intelligence, pipelines, and integrations between them so your sales team operates at 10x.
            </p>

            <div class="space-y-3 mb-8 pt-6 border-t border-white/[0.06] text-xs text-zinc-400 font-light">
              <div class="flex items-center justify-between">
                <span>Eng sprint distraction:</span>
                <span class="text-emerald-400 font-medium">0 hours</span>
              </div>
              <div class="flex items-center justify-between">
                <span>Turnaround to production:</span>
                <span class="text-white font-medium">2–4 weeks</span>
              </div>
              <div class="flex items-center justify-between">
                <span>Intellectual property:</span>
                <span class="text-white font-medium">100% yours</span>
              </div>
            </div>

            <button
              data-cal-link="hafid-ahlaqach-nigixz/15min"
              data-cal-namespace="15min"
              data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
              class="w-full py-4 rounded-2xl font-bold text-sm bg-white text-zinc-900 hover:bg-zinc-100 transition-all duration-200 shadow-lg hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              That sounds like us — let's talk
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <p class="text-center text-white/30 text-xs mt-3 font-light">15-min discovery call &bull; No pressure &bull; Scope a sprint together</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
