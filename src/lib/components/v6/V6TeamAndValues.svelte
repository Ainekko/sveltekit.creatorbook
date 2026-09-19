<script lang="ts">
  import { onMount } from 'svelte';

  let s1: HTMLElement;
  let s2: HTMLElement;
  let v1 = false;
  let v2 = false;

  let carouselRef: HTMLElement;

  function scrollPrev() {
    if (carouselRef) {
      const scrollAmount = carouselRef.clientWidth * 0.78;
      carouselRef.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  function scrollNext() {
    if (carouselRef) {
      const scrollAmount = carouselRef.clientWidth * 0.78;
      carouselRef.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  const team = [
    {
      category: 'ENGINEERING & ARCHITECTURE',
      name: 'Hafid',
      role: 'Head of GTM Engineering @ Flowjoy',
      tagline: 'Engineer with a love for marketing',
      description:
        'Builds scrapers, webhooks, sub-second API pipelines, and LLM scoring systems that eliminate manual data entry.',
      stack: 'Python · APIs · LLMs',
      focus: 'Pipelines & Webhooks',
      avatarGradient: 'from-emerald-500 via-teal-600 to-cyan-700',
      initial: 'H'
    },
    {
      category: 'REVENUE & OUTBOUND STRATEGY',
      name: 'Xander',
      role: 'Outbound & Revenue Strategist @ Flowjoy',
      tagline: 'Former quota carrier & outbound strategist',
      description:
        'Carried quota and dialed thousands of prospects. Ensures every automated touchpoint reads like a high-conviction conversation.',
      stack: 'Psychology · ICP · Angles',
      focus: 'Conversions & Reply Rates',
      avatarGradient: 'from-blue-600 via-indigo-600 to-violet-800',
      initial: 'X'
    },
    {
      category: 'PRODUCTION RELIABILITY',
      name: 'Flowjoy Core Stack',
      role: 'Zero-Maintenance Infrastructure @ Flowjoy',
      tagline: 'Direct APIs & automated workflows',
      description:
        'Multi-number 10DLC pools, instant Retell voice assistants, and Reddit intent crawlers running 24/7 with full IP ownership.',
      stack: '10DLC · Retell AI · Twilio · CRM',
      focus: 'Zero Dropped Signals',
      avatarGradient: 'from-zinc-800 via-zinc-900 to-zinc-950',
      initial: 'FJ'
    }
  ];

  const values = [
    {
      code: 'PRINCIPLE 01',
      title: 'Fast turnarounds. Zero sacrifice on quality.',
      pills: [
        { text: '14–28 days', bg: 'bg-[#FFEB00] text-zinc-950' },
        { text: 'AI speed', bg: 'bg-[#8B5CF6] text-white' },
        { text: 'Zero tech debt', bg: 'bg-[#FF3815] text-white' }
      ],
      takeaway: 'Traditional: 3–6 months → Flowjoy: 2–4 weeks'
    },
    {
      code: 'PRINCIPLE 02',
      title: 'Right tools. Done as cheaply as possible.',
      pills: [
        { text: '~$60/mo direct APIs', bg: 'bg-[#FFEB00] text-zinc-950' },
        { text: 'Zero SaaS bloat', bg: 'bg-[#10B981] text-white' },
        { text: 'No $3k/mo lock-in', bg: 'bg-[#FFD2E8] text-zinc-950' }
      ],
      takeaway: 'Direct webhooks & serverless workers instead of enterprise bloat'
    },
    {
      code: 'PRINCIPLE 03',
      title: 'Brand reputation is sacred. 100% compliance.',
      pills: [
        { text: 'Zero spam flags', bg: 'bg-[#FF3815] text-white' },
        { text: 'Primary inbox delivery', bg: 'bg-[#8B5CF6] text-white' },
        { text: 'Domain protected', bg: 'bg-[#FFEB00] text-zinc-950' }
      ],
      takeaway: 'Multi-number 10DLC & strict SPF/DKIM/DMARC protocols'
    },
    {
      code: 'PRINCIPLE 04',
      title: 'AI handles grunt work. Humans close deals.',
      pills: [
        { text: '<400ms DNC sync', bg: 'bg-[#FF3815] text-white' },
        { text: 'Automated ICP scoring', bg: 'bg-[#8B5CF6] text-white' },
        { text: 'Zero manual sorting', bg: 'bg-[#FFEB00] text-zinc-950' }
      ],
      takeaway: 'Opt-outs classified and suppressed instantly in <400ms'
    },
    {
      code: 'PRINCIPLE 05',
      title: 'Real conversations stay 100% human.',
      pills: [
        { text: '100% human closers', bg: 'bg-[#FFEB00] text-zinc-950' },
        { text: 'Direct to closer', bg: 'bg-[#FFD2E8] text-zinc-950' },
        { text: 'No fake AI bots', bg: 'bg-[#FF3815] text-white' }
      ],
      takeaway: 'AI provides context; real humans build high-conviction relationships'
    }
  ];

  onMount(() => {
    const obs = (el: HTMLElement, setter: () => void) => {
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(); o.disconnect(); } }, { threshold: 0.05 });
      o.observe(el);
      return o;
    };
    const o1 = obs(s1, () => v1 = true);
    const o2 = obs(s2, () => v2 = true);
    return () => { o1.disconnect(); o2.disconnect(); };
  });

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<!-- WHO WE ARE AS A TEAM (Apollo-style Peek Carousel on Clean White) -->
<section id="who-we-are" bind:this={s1} class="py-16 sm:py-24 bg-white font-[Poppins] text-zinc-900 border-t border-zinc-100 overflow-hidden w-full">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Apollo Header Style -->
    <div
      class="mb-10 sm:mb-12"
      style="opacity:{v1?1:0};transform:translateY({v1?0:24}px);transition:opacity .6s ease,transform .6s ease"
    >
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-4">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        Who We Are
      </div>

      <h2 class="text-3xl sm:text-5xl lg:text-6xl font-bold text-zinc-950 tracking-tight leading-[1.08] mb-4">
        The senior builders behind your GTM systems
      </h2>
      <p class="text-zinc-600 text-sm sm:text-base lg:text-lg font-light max-w-2xl leading-relaxed mb-6">
        No account managers or junior coordinators. You work directly with the engineer building your infrastructure and the strategist crafting your angles.
      </p>

      <!-- Big Stat Display -->
      <div class="text-5xl sm:text-7xl font-bold text-zinc-900 tracking-tight font-serif">
        100%
      </div>
      <p class="text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-1">
        Senior builder execution · zero agency fluff
      </p>
    </div>

    <!-- CAROUSEL TRACK WRAPPER -->
    <div class="relative w-full overflow-hidden">
      <div
        bind:this={carouselRef}
        class="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-2"
      >
        {#each team as member}
          <div
            class="w-[78vw] sm:w-[350px] md:w-[380px] shrink-0 snap-start rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
          >
            <div>
              <span class="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase text-zinc-400 block mb-5">
                {member.category}
              </span>

              <div class="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr {member.avatarGradient} p-1 shadow-md flex items-center justify-center text-white text-4xl font-extrabold mb-6">
                <span>{member.initial}</span>
              </div>

              <h3 class="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight mb-1">
                {member.name}
              </h3>
              <p class="text-xs sm:text-sm text-zinc-500 font-medium mb-4">
                {member.role}
              </p>
              <p class="text-xs text-zinc-600 font-light leading-relaxed mb-6">
                {member.description}
              </p>
            </div>

            <div class="pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <img src="/flowjoy/flowjoy-brand/LOGO/New logo 500 500 SVG.svg" alt="Flowjoy" class="w-5 h-5 object-contain" />
                <span class="text-xs font-black tracking-tight text-zinc-900 uppercase">Flowjoy</span>
              </div>
              <span class="text-[10px] font-mono text-zinc-400 font-semibold">{member.focus}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Apollo Bottom Navigation Arrows -->
    <div class="flex items-center justify-end gap-3 mt-6">
      <button
        type="button"
        on:click={scrollPrev}
        aria-label="Previous card"
        class="w-12 h-12 rounded-full border border-zinc-300 hover:border-zinc-900 bg-white flex items-center justify-center text-zinc-700 hover:text-zinc-950 transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        on:click={scrollNext}
        aria-label="Next card"
        class="w-12 h-12 rounded-full border border-zinc-300 hover:border-zinc-900 bg-white flex items-center justify-center text-zinc-700 hover:text-zinc-950 transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

  </div>
</section>

<!-- OUR CORE VALUES (ALL WHITE, ZERO QR, VISUAL PUFFY PILLS WITH ZERO TEXT BLOAT) -->
<section id="our-values" bind:this={s2} class="py-16 sm:py-24 bg-white font-[Poppins] text-zinc-900 border-t border-zinc-100 overflow-hidden w-full">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Top: Header with the pure sticker block (ZERO QR CODE) -->
    <div
      class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-16"
      style="opacity:{v2?1:0};transform:translateY({v2?0:24}px);transition:opacity .6s ease,transform .6s ease"
    >
      <!-- Left: Headline -->
      <div class="lg:col-span-7">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Our Core Values
        </div>

        <h2 class="text-3xl sm:text-5xl lg:text-6xl font-bold text-zinc-950 tracking-tight leading-[1.08] mb-4">
          How we engineer systems.<br />
          <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">
            What we believe in.
          </span>
        </h2>

        <p class="text-zinc-600 text-sm sm:text-base font-light max-w-xl leading-relaxed">
          Pragmatic software principles applied to revenue generation. One look, you see, you understand.
        </p>
      </div>

      <!-- Right: Pure Puffy Pill Blocks (NO QR CODE - clean, bold, instant comprehension) -->
      <div class="lg:col-span-5 flex flex-col items-center lg:items-end justify-center select-none">
        <div class="inline-flex flex-col items-center lg:items-end gap-2.5">
          <!-- Row 1 -->
          <div class="flex items-center gap-2 sm:gap-3">
            <span class="px-6 py-2.5 sm:px-7 sm:py-3.5 rounded-2xl sm:rounded-3xl bg-[#8B5CF6] text-white text-xl sm:text-3xl font-black shadow-md -rotate-2">
              Zero
            </span>
            <span class="px-6 py-2.5 sm:px-7 sm:py-3.5 rounded-2xl sm:rounded-3xl bg-[#FF3815] text-white text-xl sm:text-3xl font-black shadow-md rotate-2">
              agency fluff
            </span>
          </div>

          <!-- Row 2 -->
          <div class="flex items-center gap-2 sm:gap-3">
            <span class="px-7 py-3 sm:px-9 sm:py-4 rounded-2xl sm:rounded-3xl bg-[#FFEB00] text-zinc-950 text-2xl sm:text-4xl font-black shadow-lg rotate-1">
              you own the code
            </span>
          </div>

          <!-- Row 3 -->
          <div class="flex items-center gap-2 sm:gap-3">
            <span class="px-7 py-2.5 sm:px-8 sm:py-3.5 rounded-2xl sm:rounded-3xl bg-[#FFD2E8] text-zinc-950 text-xl sm:text-3xl font-black shadow-md -rotate-1">
              14–28 day sprints
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Core Values Cards: Built with visual large blocks so user understands in one look -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each values as val}
        <div
          class="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase text-zinc-400">
                {val.code}
              </span>
            </div>

            <!-- Punchy headline -->
            <h3 class="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight leading-snug mb-5">
              {val.title}
            </h3>

            <!-- LARGE COLORFUL PUFFY PILLS: Instant visual understanding without text bloat -->
            <div class="flex flex-wrap gap-2 mb-6">
              {#each val.pills as pill}
                <span class="px-3.5 py-1.5 rounded-xl {pill.bg} text-xs sm:text-sm font-extrabold shadow-2xs tracking-tight">
                  {pill.text}
                </span>
              {/each}
            </div>
          </div>

          <!-- Bottom Takeaway Bar -->
          <div class="pt-4 border-t border-zinc-100 text-xs text-zinc-500 font-mono">
            {val.takeaway}
          </div>
        </div>
      {/each}
    </div>

    <!-- Section CTA -->
    <div class="mt-12 text-center">
      <button
        type="button"
        on:click={() => scrollToSection('gtm-teardown')}
        class="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-8 py-4 rounded-full text-sm inline-flex items-center gap-2 shadow-sm transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      >
        <span>Discuss Architecture With Us</span>
        <span>&rarr;</span>
      </button>
    </div>

  </div>
</section>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
