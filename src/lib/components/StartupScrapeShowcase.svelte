<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let activeTab: number = 0;
  export let interactive: boolean = true;
  export let autoPlay: boolean = true;

  let currentStep = 1;
  let timer: any;
  let isManual = false;

  // Auto-cycle through steps every 2.2s
  function cycle() {
    if (!autoPlay || isManual) return;
    timer = setTimeout(() => {
      currentStep = (currentStep % 3) + 1;
      cycle();
    }, 2200);
  }

  function selectStep(step: number) {
    if (!interactive) return;
    if (timer) clearTimeout(timer);
    isManual = true;
    currentStep = step;
  }

  $: if (activeTab > 0 && activeTab !== currentStep) {
    if (timer) clearTimeout(timer);
    isManual = true;
    currentStep = activeTab;
  }

  onMount(() => {
    if (activeTab > 0) {
      currentStep = activeTab;
      isManual = true;
    } else if (autoPlay) {
      cycle();
    }
  });

  onDestroy(() => {
    if (timer) clearTimeout(timer);
  });
</script>

<!--
  Layout: Mobile-friendly stack vertically on mobile (grid-cols-1), 3-col on desktop (sm:grid-cols-3)
  Header = shrink-0
  Cards = flex-1 min-h-0
  Bottom bar = shrink-0
-->
<div class="sf-root w-full h-full bg-[#fbf9f5] text-[#1c1917] rounded-[1.75rem] border border-[#e5ddd0] flex flex-col justify-between overflow-y-auto sm:overflow-hidden relative select-none" style="font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; padding: clamp(0.75rem, 2.5%, 1.25rem);">

  <!-- Warm glow blobs (non-interactive) -->
  <div class="absolute -top-16 -left-16 w-48 h-48 bg-[#fed7aa]/25 rounded-full blur-3xl pointer-events-none"></div>
  <div class="absolute -bottom-16 -right-16 w-48 h-48 bg-[#e0e7ff]/20 rounded-full blur-3xl pointer-events-none"></div>

  <!-- ── HEADER: Window dots | Name | Cost pill ── -->
  <div class="shrink-0 relative z-10 flex items-center justify-between mb-2.5 sm:mb-3">
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#10b981]/80"></span>
      </div>
      <span class="w-px h-3.5 bg-[#d8d0c5] mx-1 hidden sm:block"></span>
      <span class="font-bold text-[#1c1917] flex items-center gap-1.5" style="font-size: clamp(0.75rem, 2vw, 0.9rem);">
        <span class="text-[#c2410c] font-black" style="font-size: clamp(0.85rem, 2.2vw, 1rem);">⚡</span>
        StartupScrape
      </span>
    </div>
    <span class="font-mono font-bold text-[#c2410c] bg-orange-100/90 border border-orange-200 rounded-full" style="font-size: clamp(0.6rem, 1.6vw, 0.7rem); padding: 0.25em 0.75em;">
      $0.045 / Lead
    </span>
  </div>

  <!-- ── 3 CARDS: Stack vertically on mobile, 3-col on desktop ── -->
  <div class="flex-1 min-h-0 relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 items-stretch">

    <!-- CARD 1: SOURCING -->
    <div class="glow-wrapper w-full" class:glow-orange={currentStep === 1}>
      <button
        type="button"
        on:click={() => selectStep(1)}
        class="step-card rounded-xl sm:rounded-2xl flex flex-row sm:flex-col items-center justify-between text-left sm:text-center border transition-all duration-300 w-full"
        class:active-orange={currentStep === 1}
        class:inactive={currentStep !== 1}
        style="padding: clamp(0.45rem, 1.8%, 0.75rem);"
      >
        <!-- Mobile Left / Desktop Top: Step & Cost badge -->
        <div class="flex items-center gap-2.5 sm:w-full sm:justify-between shrink-0">
          <span class="font-mono font-bold text-[#a8a29e] bg-[#f4f0eb] rounded-md shrink-0" style="font-size: clamp(0.55rem, 1.4vw, 0.65rem); padding: 0.2em 0.5em;">01</span>
          
          <!-- Logo shown inline on mobile -->
          <div class="sm:hidden" style="width: 2.25rem; height: 2.25rem; border-radius: 0.65rem; padding: 0.25rem; display:flex; align-items:center; justify-content:center; background:white; border: 1px solid rgba(255,102,0,0.25); box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow:hidden;">
            <img src="/flowjoy/yc.svg" alt="Y Combinator" style="width:100%;height:100%;object-fit:contain;" />
          </div>

          <div class="sm:hidden">
            <div class="font-bold text-[#1c1917] text-xs leading-tight">Sourcing</div>
            <div class="font-bold text-[#ea580c] uppercase text-[10px] tracking-wide">YC Cohorts</div>
          </div>

          <!-- Cost badge shown on desktop top right -->
          <span class="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full shrink-0 hidden sm:inline-block" style="font-size: clamp(0.5rem, 1.4vw, 0.6rem); padding: 0.15em 0.45em;">$0.00</span>
        </div>

        <!-- Desktop Middle: Big centered logo + Title -->
        <div class="hidden sm:flex flex-1 min-h-0 flex-col items-center justify-center" style="padding: 0.3rem 0;">
          <div style="width: clamp(2rem, 7vw, 3rem); height: clamp(2rem, 7vw, 3rem); border-radius: 0.75rem; padding: 0.3rem; display:flex; align-items:center; justify-content:center; background:white; border: 1px solid rgba(255,102,0,0.25); box-shadow: 0 1px 4px rgba(0,0,0,0.06); margin-bottom: 0.4rem; overflow:hidden;">
            <img src="/flowjoy/yc.svg" alt="Y Combinator" style="width:100%;height:100%;object-fit:contain;" />
          </div>
          <div class="font-bold text-[#1c1917]" style="font-size: clamp(0.6rem, 1.8vw, 0.75rem); line-height: 1.2;">Sourcing</div>
          <div class="font-bold text-[#ea580c] uppercase tracking-wide" style="font-size: clamp(0.5rem, 1.3vw, 0.6rem); margin-top: 0.15rem;">YC Cohorts</div>
        </div>

        <!-- Mobile Right / Desktop Bottom -->
        <div class="flex flex-col sm:flex-row items-end sm:items-center justify-center gap-1 shrink-0 sm:w-full sm:border-t sm:border-[#ede7de] sm:pt-1.5">
          <span class="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full sm:hidden text-[10px] px-2 py-0.5">$0.00</span>
          <div class="flex items-center gap-1">
            <img src="/flowjoy/algolia.svg" alt="Algolia" class="hidden sm:inline-block" style="width: clamp(0.6rem, 1.8vw, 0.75rem); height: clamp(0.6rem, 1.8vw, 0.75rem); flex-shrink:0;" />
            <span class="text-[#78716c] truncate text-[10px] sm:text-[clamp(0.45rem,1.3vw,0.55rem)]">Algolia REST</span>
          </div>
        </div>
      </button>
    </div>

    <!-- CARD 2: JEV SCORER -->
    <div class="glow-wrapper w-full" class:glow-purple={currentStep === 2}>
      <button
        type="button"
        on:click={() => selectStep(2)}
        class="step-card rounded-xl sm:rounded-2xl flex flex-row sm:flex-col items-center justify-between text-left sm:text-center border transition-all duration-300 w-full"
        class:active-purple={currentStep === 2}
        class:inactive={currentStep !== 2}
        style="padding: clamp(0.45rem, 1.8%, 0.75rem);"
      >
        <!-- Mobile Left / Desktop Top: Step & Cost badge -->
        <div class="flex items-center gap-2.5 sm:w-full sm:justify-between shrink-0">
          <span class="font-mono font-bold text-[#a8a29e] bg-[#f4f0eb] rounded-md shrink-0" style="font-size: clamp(0.55rem, 1.4vw, 0.65rem); padding: 0.2em 0.5em;">02</span>

          <!-- Logo shown inline on mobile -->
          <div class="sm:hidden" style="width: 2.25rem; height: 2.25rem; border-radius: 0.65rem; padding: 0.15rem; display:flex; align-items:center; justify-content:center; background:white; border: 1px solid #e9d5ff; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow:hidden;">
            <img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV" style="width:100%;height:100%;object-fit:cover;border-radius:0.5rem;" />
          </div>

          <div class="sm:hidden">
            <div class="font-bold text-[#1c1917] text-xs leading-tight">JEV Scorer</div>
            <div class="font-extrabold text-[#7e22ce] uppercase text-[10px] tracking-wide">Scoring ICP</div>
          </div>

          <!-- Cost badge shown on desktop top right -->
          <span class="font-mono font-bold text-purple-800 bg-purple-100 border border-purple-200 rounded-full shrink-0 hidden sm:inline-block" style="font-size: clamp(0.5rem, 1.4vw, 0.6rem); padding: 0.15em 0.45em;">$0.04</span>
        </div>

        <!-- Desktop Middle: Big centered logo + Title -->
        <div class="hidden sm:flex flex-1 min-h-0 flex-col items-center justify-center" style="padding: 0.3rem 0;">
          <div style="width: clamp(2rem, 7vw, 3rem); height: clamp(2rem, 7vw, 3rem); border-radius: 0.75rem; padding: 0.1rem; display:flex; align-items:center; justify-content:center; background:white; border: 1px solid #e9d5ff; box-shadow: 0 1px 4px rgba(0,0,0,0.06); margin-bottom: 0.4rem; overflow:hidden;">
            <img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV" style="width:100%;height:100%;object-fit:cover;border-radius:0.625rem;" />
          </div>
          <div class="font-bold text-[#1c1917]" style="font-size: clamp(0.6rem, 1.8vw, 0.75rem); line-height: 1.2;">JEV Scorer</div>
          <div class="font-extrabold text-[#7e22ce] uppercase tracking-wide" style="font-size: clamp(0.5rem, 1.3vw, 0.6rem); margin-top: 0.15rem;">Scoring ICP</div>
        </div>

        <!-- Mobile Right / Desktop Bottom -->
        <div class="flex flex-col sm:flex-row items-end sm:items-center justify-center gap-1 shrink-0 sm:w-full sm:border-t sm:border-[#ede7de] sm:pt-1.5">
          <span class="font-mono font-bold text-purple-800 bg-purple-100 border border-purple-200 rounded-full sm:hidden text-[10px] px-2 py-0.5">$0.04</span>
          <span class="text-purple-700 font-semibold truncate text-[10px] sm:text-[clamp(0.45rem,1.3vw,0.55rem)]">320ms · 94/100</span>
        </div>
      </button>
    </div>

    <!-- CARD 3: TREG.TO ENRICHMENT -->
    <div class="glow-wrapper w-full" class:glow-green={currentStep === 3}>
      <button
        type="button"
        on:click={() => selectStep(3)}
        class="step-card rounded-xl sm:rounded-2xl flex flex-row sm:flex-col items-center justify-between text-left sm:text-center border transition-all duration-300 w-full"
        class:active-green={currentStep === 3}
        class:inactive={currentStep !== 3}
        style="padding: clamp(0.45rem, 1.8%, 0.75rem);"
      >
        <!-- Mobile Left / Desktop Top: Step & Cost badge -->
        <div class="flex items-center gap-2.5 sm:w-full sm:justify-between shrink-0">
          <span class="font-mono font-bold text-[#a8a29e] bg-[#f4f0eb] rounded-md shrink-0" style="font-size: clamp(0.55rem, 1.4vw, 0.65rem); padding: 0.2em 0.5em;">03</span>

          <!-- Logo shown inline on mobile -->
          <div class="sm:hidden" style="width: 2.25rem; height: 2.25rem; border-radius: 0.65rem; padding: 0.2rem; display:flex; align-items:center; justify-content:center; background:white; border: 1px solid #a7f3d0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow:hidden;">
            <img src="/flowjoy/treg.svg" alt="Treg.to" style="width:100%;height:100%;object-fit:contain;" />
          </div>

          <div class="sm:hidden">
            <div class="font-bold text-[#1c1917] text-xs leading-tight">Treg.to</div>
            <div class="font-extrabold text-[#059669] uppercase text-[10px] tracking-wide">Enrichment</div>
          </div>

          <!-- Cost badge shown on desktop top right -->
          <span class="font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full shrink-0 hidden sm:inline-block" style="font-size: clamp(0.5rem, 1.4vw, 0.6rem); padding: 0.15em 0.45em;">$0.005</span>
        </div>

        <!-- Desktop Middle: Big centered logo + Title -->
        <div class="hidden sm:flex flex-1 min-h-0 flex-col items-center justify-center" style="padding: 0.3rem 0;">
          <div style="width: clamp(2rem, 7vw, 3rem); height: clamp(2rem, 7vw, 3rem); border-radius: 0.75rem; padding: 0.2rem; display:flex; align-items:center; justify-content:center; background:white; border: 1px solid #a7f3d0; box-shadow: 0 1px 4px rgba(0,0,0,0.06); margin-bottom: 0.4rem; overflow:hidden;">
            <img src="/flowjoy/treg.svg" alt="Treg.to" style="width:100%;height:100%;object-fit:contain;" />
          </div>
          <div class="font-bold text-[#1c1917]" style="font-size: clamp(0.6rem, 1.8vw, 0.75rem); line-height: 1.2;">Treg.to</div>
          <div class="font-extrabold text-[#059669] uppercase tracking-wide" style="font-size: clamp(0.5rem, 1.3vw, 0.6rem); margin-top: 0.15rem;">Enrichment</div>
        </div>

        <!-- Mobile Right / Desktop Bottom -->
        <div class="flex flex-col sm:flex-row items-end sm:items-center justify-center gap-1 shrink-0 sm:w-full sm:border-t sm:border-[#ede7de] sm:pt-1.5">
          <span class="font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full sm:hidden text-[10px] px-2 py-0.5">$0.005</span>
          <div class="flex items-center gap-1">
            <img src="/flowjoy/gemini.svg" alt="Gemini" class="hidden sm:inline-block" style="width: clamp(0.6rem, 1.8vw, 0.75rem); height: clamp(0.6rem, 1.8vw, 0.75rem); flex-shrink:0;" />
            <span class="text-[#78716c] truncate text-[10px] sm:text-[clamp(0.45rem,1.3vw,0.55rem)]">Verified Hit</span>
          </div>
        </div>
      </button>
    </div>

  </div>

  <!-- ── BOTTOM BAR: Responsive wrap on mobile ── -->
  <div class="shrink-0 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[#e7dfd4] gap-2 pt-2" style="margin-top: 0.5rem;">
    <!-- Pipeline summary -->
    <div class="flex items-center gap-1 min-w-0 overflow-x-auto w-full sm:w-auto scrollbar-none py-0.5">
      <span class="text-[#c2410c] font-bold shrink-0 text-[10px] sm:text-[clamp(0.45rem,1.3vw,0.55rem)]">PIPELINE:</span>
      <img src="/flowjoy/algolia.svg" alt="Algolia" class="w-3.5 h-3.5 shrink-0" />
      <span class="text-[#78716c] shrink-0 text-[10px] sm:text-[clamp(0.45rem,1.3vw,0.55rem)]">$0</span>
      <span class="text-[#a8a29e] shrink-0 text-[10px]">→</span>
      <img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV" class="w-3.5 h-3.5 rounded-xs object-cover shrink-0" />
      <span class="text-[#78716c] shrink-0 text-[10px] sm:text-[clamp(0.45rem,1.3vw,0.55rem)]">$0.04</span>
      <span class="text-[#a8a29e] shrink-0 text-[10px]">→</span>
      <img src="/flowjoy/treg.svg" alt="Treg.to" class="w-3.5 h-3.5 shrink-0" />
      <span class="text-[#78716c] shrink-0 text-[10px] sm:text-[clamp(0.45rem,1.3vw,0.55rem)]">$0.005</span>
      <span class="text-[#a8a29e] shrink-0 text-[10px]">=</span>
      <span class="text-[#c2410c] font-bold bg-orange-100/90 border border-orange-200 rounded shrink-0 text-[10px] sm:text-[clamp(0.45rem,1.3vw,0.55rem)] px-1.5 py-0.5">$0.045</span>
    </div>

    <!-- Apollo comparison pill -->
    <div class="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-bold shrink-0 self-end sm:self-auto text-[10px] sm:text-[clamp(0.45rem,1.3vw,0.55rem)] px-2 py-0.5">
      <img src="/flowjoy/logos/apollo/apollo-icon.svg" alt="Apollo" class="w-3.5 h-3.5 shrink-0" />
      <span>91% Cheaper than Apollo</span>
    </div>
  </div>

</div>

<style>
  .sf-root {
    box-sizing: border-box;
  }

  /* ── Glow wrapper: sits outside the button, animates border glow ── */
  .glow-wrapper {
    position: relative;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
  }

  .glow-wrapper::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 1rem;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 0;
    background: conic-gradient(from var(--glow-angle, 0deg), transparent 20%, currentColor 50%, transparent 80%);
    filter: blur(4px);
  }

  .glow-orange::before {
    opacity: 1;
    color: rgba(234, 88, 12, 0.7);
    animation: rotate-glow 2s linear infinite;
  }

  .glow-purple::before {
    opacity: 1;
    color: rgba(147, 51, 234, 0.65);
    animation: rotate-glow 2s linear infinite;
  }

  .glow-green::before {
    opacity: 1;
    color: rgba(5, 150, 105, 0.65);
    animation: rotate-glow 2s linear infinite;
  }

  @property --glow-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  @keyframes rotate-glow {
    from { --glow-angle: 0deg; }
    to   { --glow-angle: 360deg; }
  }

  /* Fallback pulse for browsers that don't support @property */
  @supports not (background: conic-gradient(from 0deg, red, blue)) {
    .glow-orange::before { background: radial-gradient(ellipse at center, rgba(234,88,12,0.4), transparent 70%); animation: pulse-glow 1.8s ease-in-out infinite; }
    .glow-purple::before { background: radial-gradient(ellipse at center, rgba(147,51,234,0.4), transparent 70%); animation: pulse-glow 1.8s ease-in-out infinite; }
    .glow-green::before  { background: radial-gradient(ellipse at center, rgba(5,150,105,0.4), transparent 70%); animation: pulse-glow 1.8s ease-in-out infinite; }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.5; }
      50%       { opacity: 1; }
    }
  }

  .step-card {
    position: relative;
    z-index: 1;
    cursor: pointer;
    background: transparent;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .inactive {
    background: rgba(247, 244, 239, 0.8);
    border-color: #e5ddd0;
    opacity: 0.76;
  }

  .inactive:hover {
    opacity: 1;
    background: white;
  }

  .active-orange {
    background: rgba(255, 255, 255, 0.97);
    border-color: #fed7aa;
    box-shadow: inset 0 0 0 1px rgba(234, 88, 12, 0.15);
    opacity: 1;
  }

  .active-purple {
    background: rgba(255, 255, 255, 0.97);
    border-color: #e9d5ff;
    box-shadow: inset 0 0 0 1px rgba(147, 51, 234, 0.12);
    opacity: 1;
  }

  .active-green {
    background: rgba(255, 255, 255, 0.97);
    border-color: #a7f3d0;
    box-shadow: inset 0 0 0 1px rgba(5, 150, 105, 0.12);
    opacity: 1;
  }

  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
