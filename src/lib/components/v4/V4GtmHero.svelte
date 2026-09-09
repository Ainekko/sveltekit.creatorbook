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

        <!-- Stack Logos Row with Clay front and center -->
        <div
          in:fly={{ y: -10, duration: 500, delay: 0 }}
          class="flex items-center justify-start mb-8 pl-2"
        >
          <!-- Make / Automation (Small) -->
          <div class="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center justify-center p-2.5 hover:-translate-y-1 transition-transform cursor-pointer" title="Make">
            <img src="/flowjoy/make.svg" alt="Make" class="w-full h-full object-contain" />
          </div>

          <!-- Anthropic (Medium) -->
          <div class="relative z-20 -ml-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-zinc-100 shadow-[0_4px_15px_rgba(0,0,0,0.08)] flex items-center justify-center p-3 hover:-translate-y-1 transition-transform cursor-pointer" title="Anthropic Claude">
            <img src="https://cdn.simpleicons.org/anthropic/D97757" alt="Anthropic Claude" class="w-full h-full object-contain" />
          </div>

          <!-- Clay (Large Centerpiece) -->
          <div class="relative z-30 -ml-5 w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full bg-white border border-zinc-100 shadow-[0_8px_25px_rgba(0,0,0,0.14)] flex items-center justify-center p-4 hover:-translate-y-1 transition-transform cursor-pointer ring-4 ring-white" title="Clay">
            <img src="/flowjoy/logos/Full%20Mark/Dark/Clay_Logo_Primary_Blk.png" alt="Clay" class="w-full h-full object-contain" />
          </div>

          <!-- Retell AI (Medium) -->
          <div class="relative z-20 -ml-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-zinc-100 shadow-[0_4px_15px_rgba(0,0,0,0.08)] flex items-center justify-center p-3.5 hover:-translate-y-1 transition-transform cursor-pointer" title="Retell AI">
            <img src="/flowjoy/retell.svg" alt="Retell AI" class="w-full h-full object-contain" />
          </div>

          <!-- Apollo (Small) -->
          <div class="relative z-10 -ml-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center justify-center p-2.5 hover:-translate-y-1 transition-transform cursor-pointer" title="Apollo">
            <img src="/flowjoy/logos/apollo/apollo-icon.svg" alt="Apollo" class="w-full h-full object-contain" />
          </div>
        </div>

        <!-- Positioning Callout Pill -->
        <div
          in:fly={{ y: -8, duration: 500, delay: 50 }}
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-amber-900 mb-5 w-fit shadow-xs"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span><strong>Clay is the infrastructure.</strong> We’re the GTM engineering team.</span>
        </div>

        <!-- Headline: Short, direct, benefit-first -->
        <h1 class="text-[2.6rem] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-bold text-zinc-950 leading-[1.06] tracking-tight mb-6">
          <span in:blur={{ duration: 700, delay: 80, amount: 8 }}>Your GTM is under-engineered.</span><br />
          <span in:blur={{ duration: 700, delay: 220, amount: 8 }} class="font-['Instrument_Serif'] italic text-zinc-500 font-normal">
            Not under-staffed.
          </span>
        </h1>

        <!-- Subheading: Outcome-based, crisp Clay style -->
        <p
          in:blur={{ duration: 600, delay: 300, amount: 5 }}
          class="text-base sm:text-lg text-zinc-600 leading-relaxed font-light max-w-xl mb-9"
        >
          We build the automated revenue systems most Seed–Series A teams can’t hire for yet. Production pipelines around Clay, Apollo, and your CRM. You own 100% of the code. Shipped in 2–4 weeks.
        </p>

        <!-- CTA Row -->
        <div
          in:fly={{ y: 16, duration: 600, delay: 380 }}
          class="flex flex-col sm:flex-row items-center gap-4 mb-9"
        >
          <button
            on:click={() => scrollToSection('gtm-teardown')}
            id="v4-hero-cta-teardown"
            class="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-zinc-950 hover:bg-zinc-800 text-white px-8 py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Get a free GTM teardown
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            on:click={() => scrollToSection('what-we-built')}
            id="v4-hero-cta-work"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 text-zinc-800 px-8 py-4 rounded-2xl font-semibold text-[15px] transition-all duration-300 shadow-sm cursor-pointer"
          >
            See production systems
            <svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Trust strip -->
        <div
          in:fly={{ y: 10, duration: 500, delay: 520 }}
          class="flex flex-wrap items-center gap-5 text-xs text-zinc-500 font-medium"
        >
          {#each ['Shipped in 2–4 weeks', 'Engineered around your stack', '100% code ownership'] as item}
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {item}
            </span>
          {/each}
        </div>
      </div>

      <!-- ─── RIGHT: Video Introduction (Clean, no extra badges) ─── -->
      <div in:fly={{ y: 30, duration: 800, delay: 280 }} class="w-full">
        <div
          class="relative rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-200/90 bg-zinc-50 aspect-video group cursor-pointer"
          on:click={() => videoPlaying = !videoPlaying}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' && (videoPlaying = !videoPlaying)}
          aria-label="Play introduction video"
        >
          <!-- Background gradient thumbnail -->
          <div class="absolute inset-0 bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200/60"></div>

          <!-- Subtle mesh overlay -->
          <div class="absolute inset-0 opacity-40" style="background: radial-gradient(ellipse at 30% 40%, rgba(245,158,11,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(59,130,246,0.08) 0%, transparent 55%);"></div>

          <!-- Dot grid overlay -->
          <div class="absolute inset-0 opacity-[0.2]" style="background-image: radial-gradient(circle, #a1a1aa 0.5px, transparent 0.5px); background-size: 20px 20px;"></div>

          <!-- Central play button -->
          <div class="absolute inset-0 flex items-center justify-center z-10">
            <div class="relative">
              <div class="absolute inset-0 rounded-full bg-zinc-900/10 animate-ping scale-110"></div>
              <div class="relative w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-zinc-100">
                <svg class="w-8 h-8 text-zinc-950 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Bottom caption bar: Founder introduction -->
          <div class="absolute bottom-0 inset-x-0 z-10 p-6 bg-gradient-to-t from-black/75 via-black/35 to-transparent">
            <p class="text-white font-semibold text-base">Introducing Flowjoy</p>
            <p class="text-white/80 text-xs mt-0.5 font-light">Who we are, what we solve, and whether you need us.</p>
          </div>

          <!-- Hover shimmer -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .prism-wrap {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .prism-blob {
    position: absolute;
    border-radius: 9999px;
    filter: blur(120px);
    opacity: 0.16;
  }
  .prism-1 {
    top: -10%;
    left: 20%;
    width: 600px;
    height: 450px;
    background: radial-gradient(circle, #f59e0b, #d97706);
  }
  .prism-2 {
    top: 30%;
    right: 5%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, #3b82f6, #6366f1);
    opacity: 0.12;
  }
  .prism-3 {
    bottom: -10%;
    left: 10%;
    width: 550px;
    height: 450px;
    background: radial-gradient(circle, #10b981, #059669);
    opacity: 0.12;
  }
  .prism-4 {
    top: 15%;
    left: -5%;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, #fbbf24, #f59e0b);
    opacity: 0.14;
  }
</style>
