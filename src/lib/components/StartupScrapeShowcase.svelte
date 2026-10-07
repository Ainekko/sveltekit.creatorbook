<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import GrokBot from '$lib/components/GrokBot.svelte';

  export let activeTab: number = 0;
  export let interactive: boolean = true;
  export let autoPlay: boolean = true;

  let currentStep = 1;
  let timer: any;
  let isManual = false;

  // Auto-cycle through steps every 2.4s
  function cycle() {
    if (!autoPlay || isManual) return;
    timer = setTimeout(() => {
      currentStep = (currentStep % 3) + 1;
      cycle();
    }, 2400);
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
  Verve Showcase Visual
  Fills 100% of its container (w-full h-full).
  Mobile (<640px): 3 sleek horizontal rows (~42px each), perfectly fitted, zero clutter
  Desktop (>=640px): 3 column cards with large centered logos and glowing animated borders
-->
<div
  class="sf-root w-full h-full bg-[#fbf9f5] text-[#1c1917] rounded-[1.75rem] border border-[#e5ddd0] flex flex-col justify-between overflow-hidden relative select-none p-2.5 sm:p-4 md:p-5"
  style="font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;"
>
  <!-- Warm glow blobs (non-interactive) -->
  <div class="absolute -top-16 -left-16 w-48 h-48 bg-[#fed7aa]/25 rounded-full blur-3xl pointer-events-none"></div>
  <div class="absolute -bottom-16 -right-16 w-48 h-48 bg-[#e0e7ff]/20 rounded-full blur-3xl pointer-events-none"></div>

  <!-- ── HEADER: Window dots | Name | Cost pill ── -->
  <div class="shrink-0 relative z-10 flex items-center justify-between mb-2 sm:mb-3">
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#10b981]/80"></span>
      </div>
      <span class="w-px h-3.5 bg-[#d8d0c5] mx-1 hidden sm:block"></span>
      <span class="font-bold text-[#1c1917] flex items-center gap-1.5 text-xs sm:text-sm">
        <GrokBot size={22} theme="orange" />
        <span>Verve</span>
      </span>
    </div>
    <span class="font-mono font-bold text-[#c2410c] bg-orange-100/90 border border-orange-200 rounded-full text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 shadow-2xs shrink-0">
      $0.045 / Lead
    </span>
  </div>

  <!-- ── 3 CARDS: Responsive Stack (Mobile: 3 horizontal rows | Desktop: 3 vertical cards) ── -->
  <div class="flex-1 min-h-0 relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2.5 md:gap-3 items-stretch">

    <!-- CARD 1: SOURCING -->
    <div class="glow-wrapper w-full h-full" class:glow-orange={currentStep === 1}>
      <button
        type="button"
        on:click={() => selectStep(1)}
        class="step-card rounded-xl sm:rounded-2xl flex flex-row sm:flex-col items-center justify-between text-left sm:text-center border transition-all duration-300 w-full h-full px-2.5 py-1.5 sm:p-3"
        class:active-orange={currentStep === 1}
        class:inactive={currentStep !== 1}
      >
        <!-- Mobile Left / Desktop Top -->
        <div class="flex items-center gap-2 sm:w-full sm:justify-between shrink-0 min-w-0">
          <span class="font-mono font-bold text-[#a8a29e] bg-[#f4f0eb] rounded px-1.5 py-0.5 text-[9px] sm:text-[10px] shrink-0">01</span>
          
          <!-- Mobile Inline Logo & Title -->
          <div class="flex items-center gap-2 sm:hidden min-w-0">
            <div class="w-6 h-6 rounded-md bg-white border border-[#ff6600]/25 p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
              <img src="/flowjoy/yc.svg" alt="Y Combinator" class="w-full h-full object-contain" />
            </div>
            <div class="min-w-0">
              <div class="font-bold text-[#1c1917] text-xs leading-none truncate">Sourcing</div>
              <div class="font-semibold text-[#ea580c] uppercase text-[9px] tracking-wide mt-0.5 truncate">YC Cohorts</div>
            </div>
          </div>

          <!-- Desktop Top Right Cost -->
          <span class="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 text-[10px] hidden sm:inline-block shrink-0">$0.00</span>
        </div>

        <!-- Desktop Middle: Centered Logo + Text -->
        <div class="hidden sm:flex flex-1 min-h-0 flex-col items-center justify-center py-2">
          <div class="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white border border-[#ff6600]/25 p-1.5 flex items-center justify-center shadow-xs mb-2">
            <img src="/flowjoy/yc.svg" alt="Y Combinator" class="w-full h-full object-contain" />
          </div>
          <div class="font-bold text-[#1c1917] text-xs sm:text-sm leading-tight">Sourcing</div>
          <div class="font-bold text-[#ea580c] uppercase text-[10px] tracking-wide mt-0.5">YC Cohorts</div>
        </div>

        <!-- Mobile Right / Desktop Bottom -->
        <div class="flex items-center gap-1.5 shrink-0 sm:w-full sm:border-t sm:border-[#ede7de] sm:pt-2 sm:justify-center">
          <span class="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 text-[10px] sm:hidden">$0.00</span>
          <div class="hidden sm:flex items-center gap-1 text-[#78716c] text-[10px]">
            <img src="/flowjoy/algolia.svg" alt="Algolia" class="w-3 h-3 shrink-0" />
            <span class="truncate">Algolia REST</span>
          </div>
        </div>
      </button>
    </div>

    <!-- CARD 2: JEV SCORER -->
    <div class="glow-wrapper w-full h-full" class:glow-purple={currentStep === 2}>
      <button
        type="button"
        on:click={() => selectStep(2)}
        class="step-card rounded-xl sm:rounded-2xl flex flex-row sm:flex-col items-center justify-between text-left sm:text-center border transition-all duration-300 w-full h-full px-2.5 py-1.5 sm:p-3"
        class:active-purple={currentStep === 2}
        class:inactive={currentStep !== 2}
      >
        <!-- Mobile Left / Desktop Top -->
        <div class="flex items-center gap-2 sm:w-full sm:justify-between shrink-0 min-w-0">
          <span class="font-mono font-bold text-[#a8a29e] bg-[#f4f0eb] rounded px-1.5 py-0.5 text-[9px] sm:text-[10px] shrink-0">02</span>
          
          <!-- Mobile Inline Logo & Title -->
          <div class="flex items-center gap-2 sm:hidden min-w-0">
            <div class="w-6 h-6 rounded-md bg-white border border-purple-200 p-0.5 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
              <img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV" class="w-full h-full object-cover rounded-sm" />
            </div>
            <div class="min-w-0">
              <div class="font-bold text-[#1c1917] text-xs leading-none truncate">JEV Scorer</div>
              <div class="font-semibold text-purple-700 uppercase text-[9px] tracking-wide mt-0.5 truncate">Scoring ICP</div>
            </div>
          </div>

          <!-- Desktop Top Right Cost -->
          <span class="font-mono font-bold text-purple-800 bg-purple-100 border border-purple-200 rounded-full px-2 py-0.5 text-[10px] hidden sm:inline-block shrink-0">$0.04</span>
        </div>

        <!-- Desktop Middle: Centered Logo + Text -->
        <div class="hidden sm:flex flex-1 min-h-0 flex-col items-center justify-center py-2">
          <div class="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white border border-purple-200 p-0.5 flex items-center justify-center shadow-xs mb-2 overflow-hidden">
            <img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV" class="w-full h-full object-cover rounded-md" />
          </div>
          <div class="font-bold text-[#1c1917] text-xs sm:text-sm leading-tight">JEV Scorer</div>
          <div class="font-bold text-purple-700 uppercase text-[10px] tracking-wide mt-0.5">Scoring ICP</div>
        </div>

        <!-- Mobile Right / Desktop Bottom -->
        <div class="flex items-center gap-1.5 shrink-0 sm:w-full sm:border-t sm:border-[#ede7de] sm:pt-2 sm:justify-center">
          <span class="font-mono font-bold text-purple-800 bg-purple-100 border border-purple-200 rounded-full px-2 py-0.5 text-[10px] sm:hidden">$0.04</span>
          <span class="hidden sm:inline-block text-purple-700 font-semibold text-[10px] truncate">320ms · 94/100</span>
        </div>
      </button>
    </div>

    <!-- CARD 3: TREG.TO ENRICHMENT -->
    <div class="glow-wrapper w-full h-full" class:glow-green={currentStep === 3}>
      <button
        type="button"
        on:click={() => selectStep(3)}
        class="step-card rounded-xl sm:rounded-2xl flex flex-row sm:flex-col items-center justify-between text-left sm:text-center border transition-all duration-300 w-full h-full px-2.5 py-1.5 sm:p-3"
        class:active-green={currentStep === 3}
        class:inactive={currentStep !== 3}
      >
        <!-- Mobile Left / Desktop Top -->
        <div class="flex items-center gap-2 sm:w-full sm:justify-between shrink-0 min-w-0">
          <span class="font-mono font-bold text-[#a8a29e] bg-[#f4f0eb] rounded px-1.5 py-0.5 text-[9px] sm:text-[10px] shrink-0">03</span>
          
          <!-- Mobile Inline Logo & Title -->
          <div class="flex items-center gap-2 sm:hidden min-w-0">
            <div class="w-6 h-6 rounded-md bg-white border border-emerald-200 p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
              <img src="/flowjoy/logos/treg-logo.png" alt="Treg.to" class="w-full h-full object-contain" />
            </div>
            <div class="min-w-0">
              <div class="font-bold text-[#1c1917] text-xs leading-none truncate">Treg.to</div>
              <div class="font-semibold text-emerald-700 uppercase text-[9px] tracking-wide mt-0.5 truncate">Enrichment</div>
            </div>
          </div>

          <!-- Desktop Top Right Cost -->
          <span class="font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 text-[10px] hidden sm:inline-block shrink-0">$0.005</span>
        </div>

        <!-- Desktop Middle: Centered Logo + Text -->
        <div class="hidden sm:flex flex-1 min-h-0 flex-col items-center justify-center py-2">
          <div class="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white border border-emerald-200 p-1.5 flex items-center justify-center shadow-xs mb-2">
            <img src="/flowjoy/logos/treg-logo.png" alt="Treg.to" class="w-full h-full object-contain" />
          </div>
          <div class="font-bold text-[#1c1917] text-xs sm:text-sm leading-tight">Treg.to</div>
          <div class="font-bold text-emerald-700 uppercase text-[10px] tracking-wide mt-0.5">Enrichment</div>
        </div>

        <!-- Mobile Right / Desktop Bottom -->
        <div class="flex items-center gap-1.5 shrink-0 sm:w-full sm:border-t sm:border-[#ede7de] sm:pt-2 sm:justify-center">
          <span class="font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 text-[10px] sm:hidden">$0.005</span>
          <div class="hidden sm:flex items-center gap-1 text-[#78716c] text-[10px]">
            <img src="/flowjoy/gemini.svg" alt="Gemini" class="w-3 h-3 shrink-0" />
            <span class="truncate">Verified Hit</span>
          </div>
        </div>
      </button>
    </div>

  </div>

  <!-- ── BOTTOM BAR: Single clean responsive row ── -->
  <div class="shrink-0 relative z-10 flex items-center justify-between border-t border-[#e7dfd4] gap-2 pt-2 mt-1.5 sm:mt-2">
    <!-- Mobile: Compact Total Cost | Desktop: Full Pipeline summary -->
    <div class="flex items-center gap-1 min-w-0 overflow-hidden text-[9px] sm:text-[10px] font-mono text-[#78716c]">
      <span class="text-[#c2410c] font-bold shrink-0">PIPELINE:</span>
      
      <!-- Desktop full sequence -->
      <span class="hidden sm:inline font-semibold text-zinc-800 truncate">Algolia ($0)</span>
      <span class="hidden sm:inline text-zinc-400">→</span>
      <span class="hidden sm:inline font-semibold text-purple-700 truncate">JEV ($0.04)</span>
      <span class="hidden sm:inline text-zinc-400">→</span>
      <span class="hidden sm:inline font-semibold text-emerald-700 truncate">Treg ($0.005)</span>
      <span class="hidden sm:inline text-zinc-400">=</span>
      
      <span class="text-[#c2410c] font-bold bg-orange-100/90 border border-orange-200 rounded px-1.5 py-0.2 shrink-0">$0.045 / lead</span>
    </div>

    <!-- Apollo comparison pill -->
    <div class="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-bold shrink-0 text-[9px] sm:text-[10px] px-2 py-0.5">
      <img src="/flowjoy/logos/apollo/apollo-icon.svg" alt="Apollo" class="w-3 h-3 shrink-0" />
      <span class="hidden sm:inline">91% Cheaper than Apollo</span>
      <span class="sm:hidden">91% vs Apollo</span>
    </div>
  </div>

</div>

<style>
  .sf-root {
    box-sizing: border-box;
  }

  /* ── Glow wrapper: outer border animation on active card ── */
  .glow-wrapper {
    position: relative;
    border-radius: 0.875rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  @media (min-width: 640px) {
    .glow-wrapper {
      border-radius: 1rem;
    }
  }

  .glow-wrapper::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 0.875rem;
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
    z-index: 0;
    background: conic-gradient(from var(--glow-angle, 0deg), transparent 20%, currentColor 50%, transparent 80%);
    filter: blur(4px);
  }

  @media (min-width: 640px) {
    .glow-wrapper::before {
      border-radius: 1rem;
    }
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
    width: 100%;
    height: 100%;
  }

  .inactive {
    background: rgba(247, 244, 239, 0.75);
    border-color: #e5ddd0;
    opacity: 0.8;
  }

  .inactive:hover {
    opacity: 1;
    background: white;
  }

  .active-orange {
    background: rgba(255, 255, 255, 0.98);
    border-color: #fed7aa;
    box-shadow: inset 0 0 0 1px rgba(234, 88, 12, 0.2);
    opacity: 1;
  }

  .active-purple {
    background: rgba(255, 255, 255, 0.98);
    border-color: #e9d5ff;
    box-shadow: inset 0 0 0 1px rgba(147, 51, 234, 0.18);
    opacity: 1;
  }

  .active-green {
    background: rgba(255, 255, 255, 0.98);
    border-color: #a7f3d0;
    box-shadow: inset 0 0 0 1px rgba(5, 150, 105, 0.18);
    opacity: 1;
  }
</style>
