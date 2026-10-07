<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import GrokBot from '$lib/components/GrokBot.svelte';

  export let activeTab: number = 0; // 0: Auto/Full Flow, 1: Intake, 2: Scorer, 3: Outreach
  export let interactive: boolean = true;
  export let autoPlay: boolean = true;

  // Real prospect data based on Verve backend
  const prospect = {
    name: 'Synthetix AI',
    batch: 'YC W24 / F26',
    oneLiner: 'Autonomous API reliability & AI incident remediation for engineering teams.',
    stage: 'Seed · $3.8M',
    location: 'San Francisco, CA',
    headcount: 14,
    salesHeadcount: 0,
    openRoles: ['Senior Distributed Systems', 'AI Agent Infra Lead'],
    score: 94,
    founder: {
      name: 'Alex Chen',
      role: 'Co-Founder & CEO',
      prevCompany: 'ex-Stripe Staff Engineer',
      email: 'alex@synthetix.ai',
      emailStatus: 'Verified via Treg.to',
      linkedin: 'linkedin.com/in/alexchen-tech'
    },
    signals: [
      { name: 'Founder-led sales bottleneck (14 eng / 0 sales)', weight: '+42 pts' },
      { name: 'Technical founders (CEO & CTO engineers)', weight: '+26 pts' },
      { name: 'Fresh Seed funding (<90 days)', weight: '+16 pts' }
    ],
    pitchHook: '14 engineers with zero sales hires post-$3.8M Seed. Pitch automated outbound pipeline to replace manual founder prospecting.'
  };

  // Pipeline stage timeline (0 to 12)
  // 0: Standby (all data hidden, skeletons pulsing)
  // 1: Query starts (connecting Algolia)
  // 2: Company card appears
  // 3: Signal 1 appears (14 Devs / 0 Sales)
  // 4: Signal 2 appears (Eng roles open) -> Step 1 Complete
  // 5: Beam 1 to Step 2 -> JEV starts
  // 6: Score counter animates 0 -> 94, progress bar sweeps
  // 7: JEV signals check off -> Step 2 Complete
  // 8: Beam 2 to Step 3 -> Treg.to starts
  // 9: Founder card appears
  // 10: Verified email resolves (Treg.to)
  // 11: Tailored pitch hook appears
  // 12: Pipeline fully resolved & completed (holds before looping)
  let stage = 0;
  let animatedScore = 0;
  let timer: any;
  let scoreInterval: any;
  let isManualOverride = false;

  function runScoreCounter() {
    animatedScore = 0;
    clearInterval(scoreInterval);
    const target = prospect.score;
    const duration = 550; // ms
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    scoreInterval = setInterval(() => {
      animatedScore += increment;
      if (animatedScore >= target) {
        animatedScore = target;
        clearInterval(scoreInterval);
      }
    }, stepTime);
  }

  const stageDelays = [
    500,  // 0 -> 1: initial standby to query
    700,  // 1 -> 2: query to company appears
    750,  // 2 -> 3: company to signal 1
    750,  // 3 -> 4: signal 1 to signal 2
    800,  // 4 -> 5: step 1 done, transition to JEV
    700,  // 5 -> 6: JEV score counter starts
    850,  // 6 -> 7: JEV signals check off
    800,  // 7 -> 8: step 2 done, transition to Treg.to
    750,  // 8 -> 9: founder card appears
    750,  // 9 -> 10: email verified pops
    850,  // 10 -> 11: pitch hook reveals
    3800, // 11 -> 12: hold fully completed state
    600   // 12 -> 0: reset and loop
  ];

  function stepTimeline() {
    if (!autoPlay || isManualOverride) return;

    if (stage === 12) {
      stage = 0;
      animatedScore = 0;
    } else {
      stage += 1;
      if (stage === 6) {
        runScoreCounter();
      }
    }

    const nextDelay = stageDelays[stage] || 1000;
    timer = setTimeout(stepTimeline, nextDelay);
  }

  onMount(() => {
    timer = setTimeout(stepTimeline, stageDelays[0]);
  });

  onDestroy(() => {
    if (timer) clearTimeout(timer);
    if (scoreInterval) clearInterval(scoreInterval);
  });

  function selectTab(index: number) {
    if (!interactive) return;
    activeTab = index;
    if (timer) clearTimeout(timer);

    if (index === 0) {
      isManualOverride = false;
      stage = 0;
      animatedScore = 0;
      timer = setTimeout(stepTimeline, 400);
    } else {
      isManualOverride = true;
      if (index === 1) {
        stage = 4; // Step 1 complete, others standby
      } else if (index === 2) {
        stage = 7; // Step 1 & 2 complete, Step 3 standby
        runScoreCounter();
      } else if (index === 3) {
        stage = 12; // All complete
        animatedScore = 94;
      }
    }
  }

  $: effectiveStage = isManualOverride
    ? (activeTab === 1 ? 4 : activeTab === 2 ? 7 : 12)
    : stage;

  $: activeCol = effectiveStage >= 8 ? 3 : effectiveStage >= 5 ? 2 : 1;
</script>

<div class="sf-root w-full max-w-full h-full bg-[#fbf9f5] text-[#1c1917] rounded-[1.75rem] border border-[#e5ddd0] p-3 sm:p-5 flex flex-col justify-between shadow-xl overflow-y-auto overflow-x-hidden md:overflow-hidden relative select-none font-sans">
  
  <!-- Subtle warm background glow -->
  <div class="absolute -top-20 -left-20 w-64 h-64 bg-[#fed7aa]/35 rounded-full blur-3xl pointer-events-none"></div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#fef3c7]/30 rounded-full blur-3xl pointer-events-none"></div>
  <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-[#e0e7ff]/35 rounded-full blur-3xl pointer-events-none"></div>

  <!-- ─── HEADER BAR ─── -->
  <div class="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#e7dfd4]">
    <div class="flex items-center gap-2.5">
      <!-- Window controls -->
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 inline-block border border-[#dc2626]/20"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 inline-block border border-[#d97706]/20"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#10b981]/80 inline-block border border-[#059669]/20"></span>
      </div>

      <div class="h-3.5 w-[1px] bg-[#d8d0c5] mx-1 hidden sm:block"></div>

      <!-- Title & Unit Economics -->
      <div class="flex items-center gap-2">
        <span class="font-bold text-xs tracking-tight text-[#1c1917] flex items-center gap-1.5">
          <GrokBot size={18} theme="orange" />
          Verve
        </span>
        <span class="text-[10px] font-mono font-bold text-[#c2410c] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
          $0.045 / Verified Lead
        </span>
      </div>
    </div>

    <!-- Tech Stack Logos from static -->
    <div class="flex items-center gap-1.5 overflow-x-auto max-w-full scrollbar-none py-0.5">
      <div class="logo-pill" title="Y Combinator Directory">
        <img src="/flowjoy/yc.svg" alt="Y Combinator" class="w-3.5 h-3.5 rounded-xs" />
        <span class="hidden sm:inline">YC Cohorts</span>
      </div>
      <div class="logo-pill" title="JEV ICP Scoring Engine">
        <img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV" class="w-3.5 h-3.5 rounded-xs object-cover" />
        <span class="hidden sm:inline">JEV $0.04</span>
      </div>
      <div class="logo-pill" title="Algolia Search API">
        <img src="/flowjoy/algolia.svg" alt="Algolia" class="w-3.5 h-3.5" />
        <span class="hidden sm:inline">Algolia $0</span>
      </div>
      <div class="logo-pill" title="Treg.to Verified Contact Lookup">
        <img src="/flowjoy/logos/treg-logo.png" alt="Treg.to" class="w-3.5 h-3.5" />
        <span class="hidden sm:inline text-emerald-700 font-semibold">Treg $0.005</span>
      </div>
      <div class="logo-pill" title="Google Gemini Pitch Personalization">
        <img src="/flowjoy/gemini.svg" alt="Gemini" class="w-3.5 h-3.5" />
        <span class="hidden sm:inline">AI Hook</span>
      </div>
    </div>
  </div>

  <!-- ─── SEQUENTIAL PIPELINE STEP CONTROLS ─── -->
  <div class="relative z-10 flex items-center justify-between gap-1 py-1.5 overflow-x-auto scrollbar-none">
    <div class="flex items-center gap-1 bg-[#ede8e1]/80 p-0.5 rounded-xl border border-[#ded6cc] text-[11px] shrink-0">
      <button
        type="button"
        on:click={() => selectTab(0)}
        class="px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap shrink-0 {!isManualOverride ? 'bg-white text-[#1c1917] shadow-xs font-semibold' : 'text-[#78716c] hover:text-[#1c1917]'}"
      >
        Live Pipeline Run
      </button>
      <button
        type="button"
        on:click={() => selectTab(1)}
        class="px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap shrink-0 flex items-center gap-1.5 {activeCol === 1 && isManualOverride ? 'bg-white text-[#c2410c] shadow-xs font-semibold' : 'text-[#78716c] hover:text-[#1c1917]'}"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-[#f97316]"></span>
        <span>01 Sourcing ($0.00)</span>
      </button>
      <button
        type="button"
        on:click={() => selectTab(2)}
        class="px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap shrink-0 flex items-center gap-1.5 {activeCol === 2 && isManualOverride ? 'bg-white text-[#7e22ce] shadow-xs font-semibold' : 'text-[#78716c] hover:text-[#1c1917]'}"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-[#a855f7]"></span>
        <span>02 JEV Scoring ($0.04)</span>
      </button>
      <button
        type="button"
        on:click={() => selectTab(3)}
        class="px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap shrink-0 flex items-center gap-1.5 {activeCol === 3 && isManualOverride ? 'bg-white text-[#1d4ed8] shadow-xs font-semibold' : 'text-[#78716c] hover:text-[#1c1917]'}"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>
        <span>03 Treg.to ($0.005)</span>
      </button>
    </div>

    <!-- Live execution progress ticker -->
    <div class="hidden lg:flex items-center gap-2 text-[10px] text-[#78716c] font-mono">
      <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
        91% CHEAPER THAN APOLLO
      </span>
      <span>•</span>
      <span class="text-zinc-600">50 Leads = $0.22 Total</span>
    </div>
  </div>

  <!-- ─── THREE PIPELINE STAGES ─── -->
  <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 flex-1 my-1 items-stretch min-h-0 overflow-y-auto md:overflow-visible">

    <!-- ─── STEP 1: SOURCING (Algolia YC & WAAS Direct Backend) ─── -->
    <div
      role="button"
      tabindex="0"
      on:click={() => selectTab(1)}
      on:keydown={(e) => e.key === 'Enter' && selectTab(1)}
      class="stage-card rounded-2xl p-3 flex-col justify-between border transition-all duration-300 relative group cursor-pointer flex
      {activeCol === 1 ? 'bg-white/95 border-[#fed7aa] shadow-md shadow-orange-950/10 ring-2 ring-[#ea580c]/20' : 'bg-[#f7f4ef]/80 border-[#e5ddd0] opacity-85 hover:opacity-100 hover:bg-white'}"
    >
      <div>
        <!-- Step 1 Header with Big YC Logo -->
        <div class="flex items-center justify-between gap-2 mb-2.5">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-white border border-[#ff6600]/30 p-1 flex items-center justify-center shadow-xs">
              <img src="/flowjoy/yc.svg" alt="Y Combinator" class="w-full h-full object-contain" />
            </div>
            <div>
              <div class="text-[12px] font-bold text-[#1c1917] tracking-tight leading-tight">01 · Sourcing</div>
              <div class="text-[10px] text-[#78716c] font-medium">YC & WAAS Direct Query</div>
            </div>
          </div>
          <!-- Cost Badge -->
          <div class="text-right">
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold block">
              $0.00 / Lead
            </span>
            <span class="text-[8px] text-[#78716c] font-mono">Zero Browser Fees</span>
          </div>
        </div>

        <!-- STAGE 1 CONTENT: No data visible until animated in sequence -->
        {#if effectiveStage === 0}
          <!-- Standby state: subtle placeholder skeleton -->
          <div class="h-28 rounded-xl border border-dashed border-[#e2d8cd] bg-[#fbf9f5]/50 flex flex-col items-center justify-center text-[10px] text-[#a8a29e] font-mono gap-1.5 p-3 text-center">
            <span class="w-2 h-2 rounded-full bg-[#f97316] animate-ping"></span>
            <span>Awaiting pipeline start...</span>
          </div>
        {:else if effectiveStage === 1}
          <!-- Querying status -->
          <div class="h-28 rounded-xl border border-orange-200 bg-orange-50/40 flex flex-col items-center justify-center text-[10px] text-[#c2410c] font-mono gap-1.5 p-3 text-center animate-pulse">
            <GrokBot size={24} theme="orange" />
            <span class="font-bold">Querying Algolia YC Backend...</span>
            <span class="text-[9px] text-[#9a3412]">Matching B2B · Seed · Hiring</span>
          </div>
        {:else}
          <!-- Company Record: Slides in smoothly at stage >= 2 -->
          <div class="fade-slide-in bg-[#faf8f5] rounded-xl p-2.5 border border-[#e8e1d6] mb-2 shadow-2xs">
            <div class="flex items-start justify-between gap-1 mb-1">
              <div>
                <div class="text-[12px] font-bold text-[#1c1917] tracking-tight flex items-center gap-1.5">
                  {prospect.name}
                  <span class="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#ff6600]/10 text-[#ea580c] border border-[#ff6600]/20">
                    {prospect.batch}
                  </span>
                </div>
                <p class="text-[10px] text-[#57534e] line-clamp-2 mt-0.5 leading-snug">
                  {prospect.oneLiner}
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-1 mt-1.5">
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-white text-[#44403c] font-mono border border-[#e7dfd4] shadow-2xs">
                {prospect.stage}
              </span>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-white text-[#78716c] border border-[#e7dfd4]">
                {prospect.location}
              </span>
            </div>
          </div>

          <!-- Sequential Filter Items -->
          <div class="space-y-1">
            {#if effectiveStage >= 3}
              <div class="fade-slide-in flex items-center justify-between text-[10px] px-2 py-1 rounded-lg bg-orange-50/90 border border-orange-200 text-[#9a3412] font-medium">
                <span class="flex items-center gap-1.5 font-semibold">
                  <span class="text-[#ea580c]">👥</span> 14 Devs · 0 Sales Reps
                </span>
                <span class="text-[8px] font-mono font-bold uppercase bg-orange-200/70 text-[#c2410c] px-1 py-0.2 rounded">
                  High Pain
                </span>
              </div>
            {/if}

            {#if effectiveStage >= 4}
              <div class="fade-slide-in flex items-center justify-between text-[10px] px-2 py-1 rounded-lg bg-[#faf8f5] border border-[#e8e1d6] text-[#57534e]">
                <span class="flex items-center gap-1.5">
                  <span>📢</span> 2 Eng Roles Open (WAAS)
                </span>
                <span class="text-[9px] font-mono text-emerald-700 font-semibold">Hiring</span>
              </div>
            {/if}
          </div>
        {/if}
      </div>

      <!-- Step 1 Footer -->
      <div class="pt-2 mt-2 border-t border-[#ede7de] flex items-center justify-between text-[10px]">
        <span class="text-[#78716c] flex items-center gap-1">
          <img src="/flowjoy/algolia.svg" alt="Algolia" class="w-3 h-3" />
          Algolia Backend
        </span>
        {#if effectiveStage >= 4}
          <span class="text-zinc-800 font-mono font-bold fade-slide-in">1,420 Cohorts Scanned</span>
        {:else}
          <span class="text-zinc-400 font-mono">Connecting...</span>
        {/if}
      </div>
    </div>

    <!-- ─── STEP 2: JEV ICP SCORING ENGINE ─── -->
    <div
      role="button"
      tabindex="0"
      on:click={() => selectTab(2)}
      on:keydown={(e) => e.key === 'Enter' && selectTab(2)}
      class="stage-card rounded-2xl p-3 flex-col justify-between border transition-all duration-300 relative group cursor-pointer flex
      {activeCol === 2 ? 'bg-white/95 border-[#e9d5ff] shadow-md shadow-purple-950/10 ring-2 ring-[#9333ea]/20' : 'bg-[#f7f4ef]/80 border-[#e5ddd0] opacity-85 hover:opacity-100 hover:bg-white'}"
    >
      <div>
        <!-- Step 2 Header with Big JEV Logo -->
        <div class="flex items-center justify-between gap-2 mb-2.5">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-white border border-purple-200 p-1 flex items-center justify-center shadow-xs overflow-hidden">
              <img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV by TypeSafe AI" class="w-full h-full object-cover rounded-md" />
            </div>
            <div>
              <div class="text-[12px] font-bold text-[#1c1917] tracking-tight leading-tight">02 · JEV Scorer</div>
              <div class="text-[10px] text-purple-700 font-mono font-semibold">320ms Evaluation</div>
            </div>
          </div>
          <!-- Cost Badge -->
          <div class="text-right">
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-bold block">
              $0.04 / Lead
            </span>
            <span class="text-[8px] text-purple-600 font-mono font-medium">85% Filtered Out</span>
          </div>
        </div>

        <!-- STAGE 2 CONTENT: No data visible until Step 1 completes -->
        {#if effectiveStage < 5}
          <!-- Standby state -->
          <div class="h-28 rounded-xl border border-dashed border-[#e2d8cd] bg-[#fbf9f5]/50 flex flex-col items-center justify-center text-[10px] text-[#a8a29e] font-mono gap-1.5 p-3 text-center">
            <span class="w-2 h-2 rounded-full bg-purple-300"></span>
            <span>Awaiting qualified leads from Step 1...</span>
          </div>
        {:else}
          <!-- Animated Score Card: Appears at stage >= 5 -->
          <div class="fade-slide-in bg-gradient-to-br from-[#faf5ff] to-[#fff7ed] rounded-xl p-2.5 border border-purple-200/80 mb-2 shadow-2xs">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-[9px] font-mono uppercase tracking-wider text-purple-700 font-semibold">ICP Intent Score</div>
                <div class="text-2xl font-black tracking-tight text-[#1c1917] flex items-baseline gap-1 mt-0.5">
                  {Math.round(animatedScore)}
                  <span class="text-xs font-mono font-medium text-purple-600">/100</span>
                </div>
              </div>
              <div class="text-right">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 inline-block mb-0.5 shadow-2xs">
                  Top 5% Priority
                </span>
                <div class="text-[9px] font-mono text-[#78716c]">Discards Unfit Leads</div>
              </div>
            </div>

            <!-- Animated Progress Bar -->
            <div class="w-full bg-purple-100 h-2 rounded-full overflow-hidden mt-2 relative">
              <div class="score-bar-fill h-full rounded-full transition-all duration-300" style="width: {animatedScore}%"></div>
            </div>
          </div>

          <!-- Signal Checklist: Reveals at stage >= 7 -->
          <div class="space-y-1">
            {#if effectiveStage >= 7}
              {#each prospect.signals as signal, i}
                <div class="fade-slide-in flex items-center justify-between text-[9px] px-2 py-0.5 rounded-lg bg-[#faf8f5] border border-[#ece4d9] text-[#44403c] font-mono">
                  <span class="truncate max-w-[155px] sm:max-w-[170px] text-[#44403c]">✓ {signal.name}</span>
                  <span class="text-purple-700 font-bold ml-1">{signal.weight}</span>
                </div>
              {/each}
            {:else}
              <div class="py-2 text-center text-[9px] font-mono text-purple-600 animate-pulse">
                Evaluating rubric & intent signals...
              </div>
            {/if}
          </div>
        {/if}
      </div>

      <!-- Step 2 Footer -->
      <div class="pt-2 mt-2 border-t border-[#ede7de] flex items-center justify-between text-[10px]">
        <span class="text-[#78716c]">Screening efficiency</span>
        {#if effectiveStage >= 7}
          <span class="text-purple-800 font-mono font-bold fade-slide-in">$0 Enrichment Waste</span>
        {:else}
          <span class="text-zinc-400 font-mono">Standby</span>
        {/if}
      </div>
    </div>

    <!-- ─── STEP 3: TREG.TO VERIFIED CONTACT ENRICHMENT ─── -->
    <div
      role="button"
      tabindex="0"
      on:click={() => selectTab(3)}
      on:keydown={(e) => e.key === 'Enter' && selectTab(3)}
      class="stage-card rounded-2xl p-3 flex-col justify-between border transition-all duration-300 relative group cursor-pointer flex
      {activeCol === 3 ? 'bg-white/95 border-[#bfdbfe] shadow-md shadow-blue-950/10 ring-2 ring-[#2563eb]/20' : 'bg-[#f7f4ef]/80 border-[#e5ddd0] opacity-85 hover:opacity-100 hover:bg-white'}"
    >
      <div>
        <!-- Step 3 Header with Big Gemini / Treg Logo -->
        <div class="flex items-center justify-between gap-2 mb-2.5">
          <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-white border border-blue-200 p-1 flex items-center justify-center shadow-xs overflow-hidden">
                <img src="/flowjoy/logos/treg-logo.png" alt="Treg.to" class="w-5 h-5 object-contain" />
              </div>
            <div>
              <div class="text-[12px] font-bold text-[#1c1917] tracking-tight leading-tight">03 · Treg.to Enrichment</div>
              <div class="text-[10px] text-blue-700 font-medium">Verified Founder Hit</div>
            </div>
          </div>
          <!-- Cost Badge -->
          <div class="text-right">
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold block">
              $0.005 / Hit
            </span>
            <span class="text-[8px] text-zinc-500 font-mono">Misses = $0.00</span>
          </div>
        </div>

        <!-- STAGE 3 CONTENT: No data visible until Step 2 scores high -->
        {#if effectiveStage < 8}
          <!-- Standby state -->
          <div class="h-28 rounded-xl border border-dashed border-[#e2d8cd] bg-[#fbf9f5]/50 flex flex-col items-center justify-center text-[10px] text-[#a8a29e] font-mono gap-1.5 p-3 text-center">
            <span class="w-2 h-2 rounded-full bg-blue-300"></span>
            <span>Awaiting high-score ICP leads...</span>
          </div>
        {:else}
          <!-- Founder Card: Reveals at stage >= 9 -->
          {#if effectiveStage >= 9}
            <div class="fade-slide-in bg-[#faf8f5] rounded-xl p-2.5 border border-[#e8e1d6] mb-2 shadow-2xs">
              <div class="flex items-center gap-2 mb-1.5">
                <div class="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center shadow-xs">
                  <img src="https://api.dicebear.com/6.x/identicon/svg?seed=alex-chen" alt="Alex Chen" class="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <div class="text-[11px] font-bold text-[#1c1917] tracking-tight flex items-center gap-1">
                    {prospect.founder.name}
                    {#if effectiveStage >= 10}
                      <span class="text-emerald-600 text-[10px] fade-slide-in" title="Founder Verified">✓</span>
                    {/if}
                  </div>
                  <div class="text-[9px] text-[#57534e]">
                    {prospect.founder.role} · <span class="text-[#78716c]">{prospect.founder.prevCompany}</span>
                  </div>
                </div>
              </div>

              <!-- Verified Email Pill: Pops in at stage >= 10 -->
              {#if effectiveStage >= 10}
                <div class="fade-slide-in flex items-center justify-between text-[9px] font-mono bg-white px-2 py-1 rounded-lg border border-[#e5ddd0] shadow-2xs">
                  <span class="text-blue-700 font-medium truncate max-w-[130px]">{prospect.founder.email}</span>
                  <span class="text-emerald-700 font-bold text-[8px] bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200 flex items-center gap-1">
                    ✓ TREG.TO VERIFIED
                  </span>
                </div>
              {:else}
                <div class="py-1 text-[9px] font-mono text-blue-600 text-center animate-pulse">
                  Querying Treg.to cheapest-first endpoint...
                </div>
              {/if}
            </div>
          {/if}

          <!-- AI Pitch Hook Box: Reveals at stage >= 11 -->
          {#if effectiveStage >= 11}
            <div class="fade-slide-in bg-blue-50/80 rounded-xl p-2 border border-blue-200/90 shadow-2xs">
              <div class="text-[8px] font-mono uppercase tracking-wider text-blue-800 font-semibold mb-0.5 flex items-center justify-between">
                <span class="flex items-center gap-1">
                  <span>🎯</span> Tailored Outreach Angle
                </span>
                <span class="text-[8px] text-blue-700 font-mono font-bold">Ready</span>
              </div>
              <p class="text-[9px] text-[#334155] leading-relaxed italic line-clamp-2">
                "{prospect.pitchHook}"
              </p>
            </div>
          {/if}
        {/if}
      </div>

      <!-- Step 3 Footer -->
      <div class="pt-2 mt-2 border-t border-[#ede7de] flex items-center justify-between text-[10px]">
        <span class="text-[#78716c]">Cost vs Apollo</span>
        {#if effectiveStage >= 11}
          <span class="text-emerald-700 font-mono font-bold fade-slide-in">Saved $0.35/contact</span>
        {:else}
          <span class="text-zinc-400 font-mono">Pending verification</span>
        {/if}
      </div>
    </div>

  </div>

  <!-- ─── BOTTOM PIPELINE ECONOMICS BAR ─── -->
  <div class="relative z-10 pt-2 mt-1 border-t border-[#e7dfd4] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#78716c] font-mono w-full max-w-full">
    <div class="flex flex-wrap items-center gap-1 sm:gap-2">
      <span class="text-[#c2410c] font-bold">PIPELINE:</span>
      <span class="text-[#1c1917] font-semibold">Algolia ($0)</span>
      <span class="text-[#a8a29e]">→</span>
      <span class="text-[#7e22ce] font-semibold">JEV ($0.04)</span>
      <span class="text-[#a8a29e]">→</span>
      <span class="text-[#059669] font-semibold">Treg ($0.005)</span>
      <span class="text-[#a8a29e]">=</span>
      <span class="text-[#c2410c] font-bold bg-orange-100/60 px-1.5 py-0.2 rounded border border-orange-200">
        $0.045 / Lead
      </span>
    </div>

    <div class="flex items-center gap-2">
      <span class="text-zinc-600 font-medium">Zero Waste Outbound Engine</span>
    </div>
  </div>

</div>

<style>
  .sf-root {
    box-sizing: border-box;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  .logo-pill {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    gap: 0.35rem;
    padding: 0.25rem 0.55rem;
    border-radius: 999px;
    background: #ffffff;
    border: 1px solid #e5ddd0;
    font-size: 0.65rem;
    font-weight: 600;
    color: #44403c;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  .stage-card {
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
  }

  .stage-card:hover {
    transform: translateY(-2px);
  }

  .fade-slide-in {
    animation: fadeSlideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes fadeSlideIn {
    0% {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .score-bar-fill {
    background: linear-gradient(90deg, #9333ea, #f59e0b);
    position: relative;
    overflow: hidden;
  }

  .score-bar-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
    animation: barShimmer 2s infinite;
  }

  @keyframes barShimmer {
    0% { transform: translateX(0%); }
    100% { transform: translateX(200%); }
  }

  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
