<script lang="ts">
  import { blur, fly } from 'svelte/transition';

  let videoPlaying = false;


  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<section class="hero-bg font-[Poppins] relative overflow-hidden flex flex-col justify-center bg-white min-h-[100vh]">

  <!-- Prism gradient mesh -->
  <div class="prism-wrap">
    <div class="prism-blob prism-1"></div>
    <div class="prism-blob prism-2"></div>
    <div class="prism-blob prism-3"></div>
    <div class="prism-blob prism-4"></div>
  </div>

  <!-- Noise overlay -->
  <div class="noise-overlay"></div>

  <!-- Dot grid -->
  <div
    class="absolute inset-0 pointer-events-none opacity-[0.3] z-[2]"
    style="background-image: radial-gradient(circle, #d4d4d8 0.6px, transparent 0.6px); background-size: 28px 28px;"
  ></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 md:py-28">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        <!-- ─── LEFT: Copy ─────────────────────────────────────── -->
        <div class="flex flex-col">

          <!-- Exact Integration Logos Row from main landing page (no extra text) -->
          <div
            in:fly={{ y: -10, duration: 500, delay: 0 }}
            class="flex items-center justify-start mb-10 pl-2"
          >
            <!-- Make / Automation (Small) -->
            <div class="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center justify-center p-2.5 hover:-translate-y-1 transition-transform cursor-pointer">
              <img src="/flowjoy/make.svg" alt="Make" class="w-full h-full object-contain" />
            </div>

            <!-- Anthropic (Medium) -->
            <div class="relative z-20 -ml-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-zinc-100 shadow-[0_4px_15px_rgba(0,0,0,0.08)] flex items-center justify-center p-3 hover:-translate-y-1 transition-transform cursor-pointer">
              <img src="https://cdn.simpleicons.org/anthropic/D97757" alt="Anthropic Claude" class="w-full h-full object-contain" />
            </div>

            <!-- OpenAI (Large Center) -->
            <div class="relative z-30 -ml-5 w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full bg-white border border-zinc-50 shadow-[0_8px_25px_rgba(0,0,0,0.12)] flex items-center justify-center p-4 hover:-translate-y-1 transition-transform cursor-pointer ring-4 ring-white">
              <img src="/flowjoy/chatgpt.svg" alt="OpenAI" class="w-full h-full object-contain" />
            </div>

            <!-- Retell AI (Medium) -->
            <div class="relative z-20 -ml-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-zinc-100 shadow-[0_4px_15px_rgba(0,0,0,0.08)] flex items-center justify-center p-3.5 hover:-translate-y-1 transition-transform cursor-pointer">
              <img src="/flowjoy/retell.svg" alt="Retell AI" class="w-full h-full object-contain" />
            </div>

            <!-- ClickUp (Small) -->
            <div class="relative z-10 -ml-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center justify-center p-2.5 hover:-translate-y-1 transition-transform cursor-pointer">
              <img src="/flowjoy/clickup.svg" alt="ClickUp" class="w-full h-full object-contain" />
            </div>
          </div>

          <!-- Headline with exact beloved typography -->
          <h1 class="text-[2.6rem] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-bold text-zinc-900 leading-[1.08] tracking-tight mb-5">
            <span in:blur={{ duration: 700, delay: 80, amount: 8 }}>We build the GTM systems</span><br />
            <span in:blur={{ duration: 700, delay: 220, amount: 8 }} class="font-['Instrument_Serif'] italic text-zinc-500 font-normal">
              your engineering team doesn't have time to build.
            </span>
          </h1>

          <!-- Sub -->
          <p
            in:blur={{ duration: 600, delay: 300, amount: 5 }}
            class="text-base md:text-lg text-zinc-500 leading-relaxed font-light max-w-xl mb-10"
          >
            We don't replace your GTM stack — we engineer around it. We build the <strong class="font-medium text-zinc-700">custom intelligence, pipelines, and AI systems</strong> that make Apollo, Clay, HubSpot, and Slack work the way your sales team actually needs them to.
          </p>

          <!-- CTA Row -->
          <div
            in:fly={{ y: 16, duration: 600, delay: 380 }}
            class="flex flex-col sm:flex-row items-center gap-4 mb-10"
          >
            <button
              on:click={() => scrollToSection('gtm-teardown')}
              id="v2-hero-cta-teardown"
              class="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Get a GTM teardown
            </button>

            <button
              on:click={() => scrollToSection('what-we-built')}
              id="v2-hero-cta-work"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/70 hover:bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-700 px-8 py-4 rounded-2xl font-semibold text-[15px] transition-all duration-300 backdrop-blur-sm shadow-sm"
            >
              See what we've built
              <svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <!-- Trust strip -->
          <div
            in:fly={{ y: 10, duration: 500, delay: 520 }}
            class="flex flex-wrap items-center gap-5 text-xs text-zinc-400"
          >
            {#each ['MVP in 2–4 weeks', 'Engineered around your stack', '100% code ownership'] as item}
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {item}
              </span>
            {/each}
          </div>
        </div>

        <!-- ─── RIGHT: Video placeholder ───────────────────────── -->
        <div in:fly={{ y: 30, duration: 800, delay: 280 }} class="w-full">
          <div class="relative rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-200/80 bg-zinc-50 aspect-video group cursor-pointer"
            on:click={() => videoPlaying = !videoPlaying}
            role="button"
            tabindex="0"
            on:keydown={(e) => e.key === 'Enter' && (videoPlaying = !videoPlaying)}
            aria-label="Play demo video"
          >
            <!-- Background gradient thumbnail -->
            <div class="absolute inset-0 bg-gradient-to-br from-violet-100 via-indigo-50 to-cyan-100"></div>

            <!-- Animated mesh gradient overlay -->
            <div class="absolute inset-0 opacity-60" style="background: radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.2) 0%, transparent 55%), radial-gradient(ellipse at 60% 80%, rgba(16,185,129,0.15) 0%, transparent 50%);"></div>

            <!-- Subtle dot grid on top -->
            <div class="absolute inset-0 opacity-[0.25]" style="background-image: radial-gradient(circle, #a1a1aa 0.5px, transparent 0.5px); background-size: 20px 20px;"></div>

            <!-- Label top-left -->
            <div class="absolute top-5 left-5 z-10">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-zinc-200 shadow-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                <span class="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">Product Demo</span>
              </div>
            </div>

            <!-- Duration badge top-right -->
            <div class="absolute top-5 right-5 z-10">
              <div class="px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/20">
                <span class="text-[11px] font-semibold text-white">2:34</span>
              </div>
            </div>

            <!-- Central play button -->
            <div class="absolute inset-0 flex items-center justify-center z-10">
              <div class="relative">
                <!-- Outer pulse ring -->
                <div class="absolute inset-0 rounded-full bg-white/30 animate-ping scale-110"></div>
                <!-- Mid ring -->
                <div class="absolute -inset-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"></div>
                <!-- Play button -->
                <div class="relative w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-white/50 transition-all duration-300">
                  <div class="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <svg class="w-8 h-8 text-zinc-900 ml-1 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Bottom caption bar -->
            <div class="absolute bottom-0 inset-x-0 z-10 p-5 bg-gradient-to-t from-black/40 to-transparent">
              <p class="text-white font-semibold text-sm">See how Flowjoy builds custom GTM pipelines</p>
              <p class="text-white/60 text-xs mt-0.5">Watch the full architecture walkthrough</p>
            </div>

            <!-- Hover shimmer -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/8 to-transparent pointer-events-none"></div>
          </div>

          <!-- Below video: social proof micro bar -->
          <div class="flex items-center justify-between mt-4 px-1">
            <div class="flex items-center gap-1.5 text-xs text-zinc-400">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              Direct Stack Integration
            </div>
            <div class="flex items-center gap-1.5 text-xs text-zinc-400">
              <svg class="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              Production Code Shipped
            </div>
          </div>
        </div>

      </div>
  </div>
</section>

<style>
  .hero-bg {
    background: #fff;
  }

  .prism-wrap {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
    clip-path: inset(0);
    filter: blur(80px) saturate(1.8);
    opacity: 0.45;
  }

  .prism-blob {
    position: absolute;
    border-radius: 50%;
    will-change: transform;
  }

  .prism-1 {
    width: 45%; height: 55%;
    top: -15%; left: -8%;
    background: conic-gradient(from 0deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #ff6b6b);
    animation: drift1 18s ease-in-out infinite;
  }

  .prism-2 {
    width: 40%; height: 50%;
    bottom: -20%; right: -10%;
    background: conic-gradient(from 120deg, #0abde3, #a29bfe, #fd79a8, #fdcb6e, #0abde3);
    animation: drift2 22s ease-in-out infinite;
  }

  .prism-3 {
    width: 30%; height: 40%;
    top: 30%; right: 15%;
    background: conic-gradient(from 240deg, #6c5ce7, #00cec9, #e17055, #74b9ff, #6c5ce7);
    animation: drift3 25s ease-in-out infinite;
  }

  .prism-4 {
    width: 25%; height: 35%;
    bottom: 10%; left: 20%;
    background: conic-gradient(from 60deg, #fd79a8, #fdcb6e, #00b894, #e84393, #fd79a8);
    animation: drift4 20s ease-in-out infinite;
  }

  @keyframes drift1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
    33%       { transform: translate(8%, 12%) rotate(40deg) scale(1.08); }
    66%       { transform: translate(-5%, 6%) rotate(-20deg) scale(0.95); }
  }
  @keyframes drift2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
    33%       { transform: translate(-10%, -8%) rotate(-35deg) scale(1.1); }
    66%       { transform: translate(6%, -4%) rotate(25deg) scale(0.92); }
  }
  @keyframes drift3 {
    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
    50%       { transform: translate(-12%, 10%) rotate(50deg) scale(1.12); }
  }
  @keyframes drift4 {
    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
    40%       { transform: translate(10%, -6%) rotate(-30deg) scale(1.05); }
    70%       { transform: translate(-8%, 8%) rotate(20deg) scale(0.98); }
  }

  .noise-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    opacity: 0.1;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
</style>
