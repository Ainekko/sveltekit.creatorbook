<script lang="ts">
  import { onMount } from 'svelte';

  let s1: HTMLElement;
  let s2: HTMLElement;
  let v1 = false;
  let v2 = false;

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

<!-- WHO WE ARE AS A TEAM (White Background) -->
<section id="who-we-are" bind:this={s1} class="py-20 sm:py-28 bg-white font-[Poppins] text-zinc-900 border-t border-zinc-100 relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

    <div
      class="rounded-[2.5rem] bg-[#F4F7FB] border border-[#DCE5EF] p-8 sm:p-12 lg:p-14 shadow-lg text-[#0C1E30] transition-all duration-300"
      style="opacity:{v1?1:0};transform:translateY({v1?0:32}px);transition:opacity .7s ease,transform .7s ease"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

        <!-- LEFT -->
        <div class="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div class="mb-4">
              <span class="inline-flex items-center px-3.5 py-1 rounded-full bg-[#1A456F] text-white text-[11px] font-bold tracking-wider uppercase font-mono shadow-xs">
                WHO WE ARE
              </span>
            </div>

            <h2 class="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0C1E30] tracking-tight leading-[1.12] mb-4">
              Two builders.<br />
              <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">
                Zero agency fluff.
              </span>
            </h2>

            <p class="text-[#3B526B] text-sm sm:text-base font-light leading-relaxed mb-8">
              No account managers or junior coordinators. You work directly with the engineer building your infrastructure and the sales strategist crafting your angles.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              on:click={() => scrollToSection('gtm-teardown')}
              class="bg-[#1A456F] hover:bg-[#133557] text-white font-semibold px-6 py-3 rounded-full text-sm flex items-center gap-2 shadow-xs transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Talk With Us</span>
              <span>&rarr;</span>
            </button>
            <span class="text-xs text-[#3B526B] font-medium flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Direct Slack access
            </span>
          </div>
        </div>

        <!-- RIGHT: Hafid & Xander -->
        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">

          <!-- Hafid -->
          <div
            class="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE5EF] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            style="opacity:{v1?1:0};transform:translateY({v1?0:24}px);transition:opacity .6s ease .15s,transform .6s ease .15s"
          >
            <div>
              <div class="flex items-center gap-3.5 mb-4">
                <div class="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white font-bold text-xl flex items-center justify-center shadow-md shrink-0">
                  H
                </div>
                <div>
                  <h3 class="text-xl font-bold text-zinc-900 tracking-tight leading-none">Hafid</h3>
                  <span class="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                    The Engineer
                  </span>
                </div>
              </div>
              <p class="text-xs font-medium text-zinc-500 mb-2">Engineer with a love for marketing</p>
              <p class="text-xs text-zinc-600 font-light leading-relaxed">
                Builds the scrapers, webhooks, sub-second API pipelines, and LLM scoring systems that eliminate manual data entry.
              </p>
            </div>
            <div class="pt-4 mt-5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Stack: Python &bull; APIs &bull; LLMs</span>
              <span class="text-emerald-700 font-semibold">Pipelines</span>
            </div>
          </div>

          <!-- Xander -->
          <div
            class="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE5EF] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            style="opacity:{v1?1:0};transform:translateY({v1?0:24}px);transition:opacity .6s ease .3s,transform .6s ease .3s"
          >
            <div>
              <div class="flex items-center gap-3.5 mb-4">
                <div class="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-800 text-white font-bold text-xl flex items-center justify-center shadow-md shrink-0">
                  X
                </div>
                <div>
                  <h3 class="text-xl font-bold text-zinc-900 tracking-tight leading-none">Xander</h3>
                  <span class="text-xs font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                    Former Sales Guy
                  </span>
                </div>
              </div>
              <p class="text-xs font-medium text-zinc-500 mb-2">Quota carrier &amp; outbound strategist</p>
              <p class="text-xs text-zinc-600 font-light leading-relaxed">
                Carried quota and dialed thousands of prospects. Ensures every automated touchpoint reads like a high-conviction conversation.
              </p>
            </div>
            <div class="pt-4 mt-5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Focus: Psychology &bull; Offer &bull; Angles</span>
              <span class="text-blue-700 font-semibold">Conversions</span>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</section>

<!-- OUR CORE VALUES (Dark Background) -->
<section id="our-values" bind:this={s2} class="py-24 sm:py-32 bg-[#090A0E] font-[Poppins] text-white border-t border-b border-white/[0.06] relative overflow-hidden">
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-amber-500/5 via-blue-500/5 to-transparent blur-[130px] pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

    <!-- Outer card -->
    <div
      class="rounded-[2.5rem] overflow-hidden border border-white/[0.08] shadow-2xl"
      style="opacity:{v2?1:0};transform:translateY({v2?0:32}px);transition:opacity .7s ease,transform .7s ease"
    >

      <!-- Top: text header -->
      <div class="bg-[#F5F4F0] px-8 sm:px-12 pt-10 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
        <div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/[0.07] border border-zinc-900/10 text-xs font-medium text-zinc-500 mb-5">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Our Core Values
          </div>
          <h3 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
            How we engineer systems.<br />
            <span class="font-['Instrument_Serif'] italic font-normal text-zinc-400">
              What we believe in.
            </span>
          </h3>
        </div>
        <div class="lg:text-right">
          <p class="text-zinc-500 text-sm sm:text-base font-light leading-relaxed">
            Pragmatic software principles applied to pipeline generation.
          </p>
        </div>
      </div>

      <!-- Bottom: cards zone -->
      <div class="bg-[#E8E4DC] px-6 sm:px-10 pt-8 pb-8">

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">

          <!-- 1. Speed with AI (7 cols) -->
          <div
            class="lg:col-span-7 rounded-3xl bg-[#FAF1E8] border border-[#ECDCCF] p-7 sm:p-9 flex flex-col justify-between"
            style="opacity:{v2?1:0};transform:translateY({v2?0:28}px);transition:opacity .6s ease .15s,transform .6s ease .15s"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-white bg-[#963816] px-3 py-1 rounded-full">
                  Speed &amp; Precision
                </span>
                <span class="text-xs font-semibold text-[#963816]">2–4 Week Turnaround</span>
              </div>
              <h4 class="text-xl sm:text-2xl font-bold text-[#23150D] tracking-tight leading-snug mb-2">
                Fast turnarounds using AI. Zero sacrifice on what matters.
              </h4>
              <p class="text-sm text-[#5C483D] font-light leading-relaxed mb-6">
                We use modern AI to automate research, boilerplate, and schema modeling at breakneck speed. But we never cut corners on what makes software last: clean data contracts, resilient rate-limiting, error handling, and robust infrastructure.
              </p>
            </div>
            <div class="bg-white rounded-xl p-3.5 border border-amber-200/70 flex items-center justify-between text-xs text-zinc-700">
              <span class="text-zinc-500">Traditional Agency: 3–6 Months</span>
              <span class="font-semibold text-emerald-700">&rarr; Flowjoy: 14–28 Days to Live Production</span>
            </div>
          </div>

          <!-- 2. Right tools (5 cols) -->
          <div
            class="lg:col-span-5 rounded-3xl bg-[#EDF5F0] border border-[#D6E7DC] p-7 sm:p-9 flex flex-col justify-between"
            style="opacity:{v2?1:0};transform:translateY({v2?0:28}px);transition:opacity .6s ease .25s,transform .6s ease .25s"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-white bg-[#18533C] px-3 py-1 rounded-full">
                  Cost Efficiency
                </span>
                <span class="text-xs font-semibold text-[#18533C]">Zero SaaS Bloat</span>
              </div>
              <h4 class="text-xl sm:text-2xl font-bold text-[#0E241B] tracking-tight leading-snug mb-2">
                The right tools for the job. Done as cheaply as possible.
              </h4>
              <p class="text-sm text-[#3E5A4E] font-light leading-relaxed mb-6">
                We don't force you into bloated $5,000/mo enterprise software contracts when lean serverless workers and direct APIs do the exact same job for pennies. We architect for your bottom line.
              </p>
            </div>
            <div class="bg-white rounded-xl p-3.5 border border-emerald-200/70 flex items-center justify-between text-xs">
              <span class="text-zinc-400 line-through">$3,000/mo enterprise stack</span>
              <span class="font-semibold text-emerald-800">~$60/mo direct APIs</span>
            </div>
          </div>

          <!-- 3. Brand reputation (5 cols) -->
          <div
            class="lg:col-span-5 rounded-3xl bg-[#EDF3F9] border border-[#D7E3EE] p-7 sm:p-9 flex flex-col justify-between"
            style="opacity:{v2?1:0};transform:translateY({v2?0:28}px);transition:opacity .6s ease .35s,transform .6s ease .35s"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-white bg-[#1A456F] px-3 py-1 rounded-full">
                  Brand Safety
                </span>
                <span class="text-xs font-semibold text-[#1A456F]">100% Safe</span>
              </div>
              <h4 class="text-xl sm:text-2xl font-bold text-[#0C1E30] tracking-tight leading-snug mb-2">
                Brand reputation is sacred. Strict anti-spam &amp; compliance.
              </h4>
              <p class="text-sm text-[#3B526B] font-light leading-relaxed mb-6">
                Spamming thousands of unqualified inboxes burns your domain and ruins your company's name. We put bulletproof safeguards in place so your emails land in the primary inbox and your brand never gets burned.
              </p>
            </div>
            <div class="bg-white rounded-xl p-3.5 border border-blue-200/70 flex items-center justify-between text-xs text-zinc-700">
              <span>Inbox Health &amp; Compliance:</span>
              <span class="font-semibold text-emerald-700">&#10003; Zero spam flags &amp; safe domains</span>
            </div>
          </div>

          <!-- 4. AI grunt work (7 cols) -->
          <div
            class="lg:col-span-7 rounded-3xl bg-[#FAF5FE] border border-[#E9DDF8] p-7 sm:p-9 flex flex-col justify-between"
            style="opacity:{v2?1:0};transform:translateY({v2?0:28}px);transition:opacity .6s ease .45s,transform .6s ease .45s"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-white bg-[#6D28D9] px-3 py-1 rounded-full">
                  AI For Grunt Work
                </span>
                <span class="text-xs font-semibold text-[#6D28D9]">Automated DNC Guard</span>
              </div>
              <h4 class="text-xl sm:text-2xl font-bold text-[#23150D] tracking-tight leading-snug mb-2">
                Automated grunt work.<br />
                <span class="font-['Instrument_Serif'] italic font-normal text-[#6D28D9]">AI handles the filtering, scoring, and DNC protection.</span>
              </h4>
              <p class="text-sm text-[#5C483D] font-light leading-relaxed mb-6">
                We put AI where it belongs: sorting through messy data, scoring ICP match, evaluating reply sentiment, and protecting your pipeline. If a prospect replies with hesitation or asks to unsubscribe, AI instantly classifies the intent and syncs them to your Do-Not-Contact list in milliseconds.
              </p>
            </div>
            <div class="bg-white rounded-xl p-3.5 border border-purple-200/70 flex items-center justify-between text-xs">
              <span class="font-mono text-zinc-600 text-[11px]">&ldquo;Please remove our team&rdquo; &rarr;</span>
              <span class="font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">Instantly added to DNC in &lt;400ms</span>
            </div>
          </div>

        </div>

        <!-- Human-to-Human -->
        <div
          class="rounded-3xl bg-[#FFF9F2] border border-[#FDE6D2] p-7 sm:p-9"
          style="opacity:{v2?1:0};transform:translateY({v2?0:28}px);transition:opacity .6s ease .55s,transform .6s ease .55s"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div class="max-w-2xl">
              <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-white bg-[#B45309] px-3 py-1 rounded-full mb-3 inline-block shadow-xs">
                Human-to-Human
              </span>
              <h4 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3B220B] tracking-tight leading-tight mb-4">
                Automated grunt work.<br />
                <span class="font-['Instrument_Serif'] italic font-normal text-amber-800">
                  All conversations stay 100% human.
                </span>
              </h4>
              <p class="text-sm sm:text-base text-[#6B4B2E] font-light leading-relaxed max-w-xl">
                AI should never pretend to be a human or build fake relationships. We use engineering to solve research, trigger timing, and context gathering. When a prospective buyer replies, they talk directly with a real human who understands their business and closes the deal.
              </p>
            </div>
            <div class="shrink-0">
              <button
                type="button"
                on:click={() => scrollToSection('gtm-teardown')}
                class="bg-[#B45309] hover:bg-[#92400E] text-white font-semibold px-6 py-3 rounded-full text-xs sm:text-sm shadow-xs transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Discuss Architecture &rarr;
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>
