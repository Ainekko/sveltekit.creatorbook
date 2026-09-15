<script lang="ts">
  import { onMount } from 'svelte';

  let s: HTMLElement;
  let v = false;

  onMount(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { v = true; o.disconnect(); } }, { threshold: 0.05 });
    o.observe(s);
    return () => o.disconnect();
  });

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section id="problem" bind:this={s} class="py-16 sm:py-24 lg:py-32 bg-white font-[Poppins] text-zinc-900 border-t border-zinc-100 relative w-full overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- SECTION HEADER WITH CREATIVE PUFFY PILL BLOCKS -->
    <div
      class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16 lg:mb-20"
      style="opacity:{v?1:0};transform:translateY({v?0:28}px);transition:opacity .7s ease,transform .7s ease"
    >
      <!-- Left: Title & Sub -->
      <div class="lg:col-span-7">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-xs font-semibold text-rose-800 mb-4 sm:mb-5">
          <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          The Revenue Bottlenecks
        </div>

        <h2 class="text-3xl sm:text-5xl lg:text-6xl font-bold text-zinc-950 tracking-tight leading-[1.08] mb-4 sm:mb-6">
          More reps won't fix<br />
          <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">
            broken systems.
          </span>
        </h2>

        <p class="text-zinc-600 text-sm sm:text-base lg:text-lg leading-relaxed font-light max-w-xl">
          Companies don't need more GTM tools. You have revenue bottlenecks your existing people, data, and software aren't solving.
        </p>
      </div>

      <!-- Right: 4 Bottleneck Category Pills -->
      <div class="lg:col-span-5 flex flex-col items-center lg:items-end justify-center select-none gap-2.5">
        <div class="flex items-center gap-2 sm:gap-3">
          <span class="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl sm:rounded-3xl bg-[#963816] text-white text-sm sm:text-base font-black shadow-md -rotate-1">
            Account Intelligence
          </span>
          <span class="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl sm:rounded-3xl bg-[#6D28D9] text-white text-sm sm:text-base font-black shadow-md rotate-1">
            Buyer Intent
          </span>
        </div>
        <div class="flex items-center gap-2 sm:gap-3">
          <span class="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl sm:rounded-3xl bg-[#18533C] text-white text-sm sm:text-base font-black shadow-md rotate-1">
            Speed-to-Lead
          </span>
          <span class="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl sm:rounded-3xl bg-[#1A456F] text-white text-sm sm:text-base font-black shadow-md -rotate-1">
            CRM Reactivation
          </span>
        </div>
        <p class="text-[11px] sm:text-xs text-zinc-400 font-light mt-1 text-center lg:text-right">4 systems broken. All fixable.</p>
      </div>
    </div>

    <!-- CLAY-INSPIRED BENTO GRID WITH LARGE COLORFUL PILLS -->
    <div class="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">

      <!-- BENTO CARD 1 (col-span-2 on mobile, 7 cols on desktop) -->
      <div
        class="col-span-2 lg:col-span-7 rounded-3xl sm:rounded-[2.5rem] bg-[#FAF5EE] border border-[#EBDCCF] p-5 sm:p-8 lg:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
        style="opacity:{v?1:0};transform:translateY({v?0:36}px);transition:opacity .65s ease .1s,transform .65s ease .1s"
      >
        <div>
          <div class="flex items-center justify-between gap-3 mb-4 sm:mb-6">
            <span class="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#963816] text-white text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase shadow-2xs">
              ACCOUNT INTELLIGENCE
            </span>
            <div class="flex items-center -space-x-1.5">
              <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-amber-200/80 p-1 shadow-2xs flex items-center justify-center" title="Apollo">
                <img loading="lazy" decoding="async" src="/flowjoy/logos/apollo/apollo-icon.svg" alt="Apollo" class="w-full h-full object-contain" />
              </div>
              <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-amber-200/80 p-1 shadow-2xs flex items-center justify-center" title="Clay">
                <img loading="lazy" decoding="async" src="/flowjoy/logos/Full%20Mark/Dark/Clay_Logo_Primary_Blk.png" alt="Clay" class="w-full h-full object-contain" />
              </div>
              <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-amber-200/80 p-1 shadow-2xs flex items-center justify-center" title="HubSpot">
                <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/hubspot/FF7A59" alt="HubSpot" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-[#23150D] tracking-tight leading-snug mb-3">
            SDRs waste 15+ hours a week on manual research.
          </h3>

          <!-- COLORFUL PUFFY PILLS (Problem → Outcome) -->
          <div class="flex flex-wrap gap-2 mb-5">
            <span class="px-3.5 py-1.5 rounded-xl bg-[#FF3815] text-white text-xs sm:text-sm font-extrabold shadow-xs">
              15+ hrs manual research
            </span>
            <span class="px-3.5 py-1.5 rounded-xl bg-[#FFEB00] text-zinc-950 text-xs sm:text-sm font-extrabold shadow-xs">
              Instant ICP triggers
            </span>
            <span class="px-3.5 py-1.5 rounded-xl bg-[#8B5CF6] text-white text-xs sm:text-sm font-extrabold shadow-xs">
              Direct into HubSpot
            </span>
          </div>

          <p class="text-xs sm:text-sm text-[#5C483D] font-light leading-relaxed mb-4 sm:mb-6">
            Reps open their CRM to direct work emails, mobile numbers, and live company triggers already populated. Reps spend 100% of their day having sales conversations.
          </p>
        </div>

        <div class="rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-sm border border-amber-200/60 mt-1 sm:mt-2">
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-2.5 sm:gap-3">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-xs shrink-0">
                SJ
              </div>
              <div>
                <div class="font-bold text-xs sm:text-sm text-zinc-900 flex items-center gap-1.5 sm:gap-2">
                  Sarah Jenkins
                  <span class="text-[9px] sm:text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 sm:px-2 py-0.5 rounded-full">
                    98% Match
                  </span>
                </div>
                <div class="text-[10px] sm:text-[11px] text-zinc-500">
                  VP RevOps &bull; <strong class="text-zinc-700 font-medium">HyperScale AI</strong>
                </div>
              </div>
            </div>
            <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-orange-50 border border-orange-200 p-0.5 sm:p-1 flex items-center justify-center shrink-0">
              <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/hubspot/FF7A59" alt="HubSpot" class="w-full h-full object-contain" />
            </div>
          </div>

          <div class="p-2.5 sm:p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 text-[11px] sm:text-xs text-zinc-700 font-light mb-2.5 sm:mb-3">
            <strong class="font-semibold text-zinc-900">Enriched Triggers:</strong> Series A, hiring 4 SDRs, stack includes HubSpot + Apollo. Direct dials verified.
          </div>

          <div class="flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-500 pt-2 border-t border-zinc-100">
            <span>Verified work phone &amp; email</span>
            <span class="text-emerald-700 font-semibold flex items-center gap-1">
              Synced to HubSpot
              <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
            </span>
          </div>
        </div>
      </div>

      <!-- BENTO CARD 2 (col-span-1 on mobile, 5 cols on desktop) -->
      <div
        class="col-span-1 lg:col-span-5 rounded-3xl sm:rounded-[2.5rem] bg-[#FAF5FE] border border-[#E9DDF8] p-4 sm:p-7 lg:p-9 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
        style="opacity:{v?1:0};transform:translateY({v?0:36}px);transition:opacity .65s ease .2s,transform .65s ease .2s"
      >
        <div>
          <div class="flex items-center justify-between gap-2 mb-3 sm:mb-5">
            <span class="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#6D28D9] text-white text-[9px] sm:text-[11px] font-mono font-bold tracking-wider uppercase shadow-2xs">
              BUYER INTENT
            </span>
            <div class="flex items-center -space-x-1.5">
              <div class="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-white border border-violet-200 p-0.5 sm:p-1 shadow-2xs flex items-center justify-center" title="Reddit">
                <img loading="lazy" decoding="async" src="/flowjoy/reddit.svg" alt="Reddit" class="w-full h-full object-contain" />
              </div>
              <div class="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-white border border-violet-200 p-0.5 sm:p-1 shadow-2xs flex items-center justify-center" title="Slack">
                <img loading="lazy" decoding="async" src="/flowjoy/slack.svg" alt="Slack" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <h3 class="text-sm sm:text-xl lg:text-2xl font-bold text-[#1E1035] tracking-tight leading-snug mb-2 sm:mb-3">
            Social buying signals go uncaptured.
          </h3>

          <!-- PUFFY PILLS -->
          <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-5">
            <span class="px-2.5 sm:px-3 py-1 rounded-xl bg-[#FF3815] text-white text-[10px] sm:text-xs font-extrabold shadow-xs">
              Signals lost
            </span>
            <span class="px-2.5 sm:px-3 py-1 rounded-xl bg-[#FFEB00] text-zinc-950 text-[10px] sm:text-xs font-extrabold shadow-xs">
              &lt;60s Slack alert
            </span>
          </div>

          <p class="text-xs sm:text-sm text-[#503E6B] font-light leading-relaxed mb-3 sm:mb-5 hidden sm:block">
            When buyers ask for solutions on Reddit or forums, your team gets alerted in Slack within 60s with a pre-drafted reply.
          </p>
        </div>

        <!-- Mobile mini mockup -->
        <div class="sm:hidden rounded-xl bg-white p-2.5 shadow-sm border border-violet-100 mt-2 space-y-1.5">
          <div class="flex items-center justify-between text-[10px] font-bold text-zinc-900 border-b border-zinc-100 pb-1">
            <span class="flex items-center gap-1">
              <img src="/flowjoy/slack.svg" alt="Slack" class="w-3 h-3" />
              #signals
            </span>
            <span class="text-[8px] text-violet-700 bg-violet-50 px-1 py-0.2 rounded">42s ago</span>
          </div>
          <p class="text-[10px] text-zinc-600 italic line-clamp-2 leading-tight">
            "Looking for automated GTM pipelines..."
          </p>
          <div class="text-[9px] text-emerald-600 font-semibold flex items-center gap-1 pt-0.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Ready in Slack
          </div>
        </div>

        <!-- Desktop/Tablet full mockup -->
        <div class="hidden sm:block rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-violet-100 mt-2">
          <div class="flex items-center justify-between pb-2.5 mb-2.5 border-b border-zinc-100">
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 rounded bg-violet-50 flex items-center justify-center p-0.5">
                <img loading="lazy" decoding="async" src="/flowjoy/slack.svg" alt="Slack" class="w-full h-full object-contain" />
              </div>
              <span class="text-xs font-bold text-zinc-900">#revenue-signals</span>
              <span class="text-[10px] text-zinc-400 font-mono">42s ago</span>
            </div>
            <span class="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded">
              Active Intent
            </span>
          </div>

          <div class="space-y-2 text-xs">
            <div class="text-zinc-800 font-medium text-[11px]">
              Prospect: <strong class="text-zinc-950 font-bold">David Chen</strong> &bull; Founder @ CloudNative
            </div>
            <div class="p-2.5 rounded-xl bg-violet-50/60 border border-violet-100 text-zinc-700 italic font-light text-[11px]">
              "Saw your thread in r/sales asking for automated GTM pipelines that don't rely on brittle Zapier zaps..."
            </div>
            <div class="flex items-center justify-between pt-1 text-[11px]">
              <span class="text-zinc-400 font-light">Verified email attached</span>
              <span class="text-emerald-600 font-semibold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Ready to send
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- BENTO CARD 3 (col-span-1 on mobile, 5 cols on desktop) -->
      <div
        class="col-span-1 lg:col-span-5 rounded-3xl sm:rounded-[2.5rem] bg-[#F3FAF6] border border-[#D5EFE3] p-4 sm:p-7 lg:p-9 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
        style="opacity:{v?1:0};transform:translateY({v?0:36}px);transition:opacity .65s ease .3s,transform .65s ease .3s"
      >
        <div>
          <div class="flex items-center justify-between gap-2 mb-3 sm:mb-5">
            <span class="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#18533C] text-white text-[9px] sm:text-[11px] font-mono font-bold tracking-wider uppercase shadow-2xs">
              SPEED-TO-LEAD
            </span>
            <div class="flex items-center -space-x-1.5">
              <div class="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-white border border-emerald-200 p-0.5 sm:p-1 shadow-2xs flex items-center justify-center" title="Twilio">
                <img loading="lazy" decoding="async" src="/flowjoy/twilio.svg" alt="Twilio" class="w-full h-full object-contain" />
              </div>
              <div class="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-white border border-emerald-200 p-0.5 sm:p-1 shadow-2xs flex items-center justify-center" title="Retell AI">
                <img loading="lazy" decoding="async" src="/flowjoy/retell.svg" alt="Retell AI" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <h3 class="text-sm sm:text-xl lg:text-2xl font-bold text-[#0E241B] tracking-tight leading-snug mb-2 sm:mb-3">
            Inbound leads wait hours instead of seconds.
          </h3>

          <!-- PUFFY PILLS -->
          <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-5">
            <span class="px-2.5 sm:px-3 py-1 rounded-xl bg-[#FF3815] text-white text-[10px] sm:text-xs font-extrabold shadow-xs">
              Hours to respond
            </span>
            <span class="px-2.5 sm:px-3 py-1 rounded-xl bg-[#FFEB00] text-zinc-950 text-[10px] sm:text-xs font-extrabold shadow-xs">
              Sub-600ms voice
            </span>
          </div>

          <p class="text-xs sm:text-sm text-[#3E5A4E] font-light leading-relaxed mb-3 sm:mb-5 hidden sm:block">
            An AI voice assistant answers every inbound call in sub-600ms, screens for ICP fit, and books qualified meetings directly on the calendar.
          </p>
        </div>

        <!-- Mobile mini mockup -->
        <div class="sm:hidden rounded-xl bg-white p-2.5 shadow-sm border border-emerald-100 mt-2 space-y-1.5">
          <div class="flex items-center justify-between text-[10px] font-bold text-zinc-900 border-b border-zinc-100 pb-1">
            <span class="flex items-center gap-1">
              <img src="https://cdn.simpleicons.org/googlecalendar/4285F4" alt="Cal" class="w-3 h-3" />
              Tomorrow 2PM
            </span>
            <span class="text-[8px] text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded font-semibold">Confirmed</span>
          </div>
          <p class="text-[10px] text-zinc-700 font-medium line-clamp-1">
            Marcus Vance &bull; CRO
          </p>
          <div class="text-[9px] text-emerald-700 font-semibold pt-0.5">
            &lt;600ms &bull; Zero dropped calls
          </div>
        </div>

        <!-- Desktop/Tablet full mockup -->
        <div class="hidden sm:block rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-emerald-100 mt-2">
          <div class="flex items-center justify-between pb-2.5 mb-2.5 border-b border-zinc-100">
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center p-0.5">
                <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/googlecalendar/4285F4" alt="Calendar" class="w-3.5 h-3.5 object-contain" />
              </div>
              <span class="text-xs font-bold text-zinc-900">Demo Scheduled: Tomorrow 2:00 PM</span>
            </div>
            <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              Confirmed
            </span>
          </div>

          <div class="space-y-2 text-xs">
            <div class="text-zinc-800 font-medium text-[11px]">
              Lead: <strong class="text-zinc-950 font-bold">Marcus Vance</strong> &bull; CRO @ FinOps Corp
            </div>
            <div class="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-zinc-700 font-light text-[11px]">
              <strong>AI Qualification:</strong> $2M ARR, 25-person team, looking for automated GTM pipelines to replace manual research.
            </div>
            <div class="flex items-center justify-between pt-1 text-[11px] text-zinc-500">
              <span>Synced to Calendar &amp; CRM</span>
              <span class="text-emerald-700 font-semibold">Zero dropped calls</span>
            </div>
          </div>
        </div>
      </div>

      <!-- BENTO CARD 4 (col-span-2 on mobile, 7 cols on desktop) -->
      <div
        class="col-span-2 lg:col-span-7 rounded-3xl sm:rounded-[2.5rem] bg-[#F1F6FB] border border-[#D9E6F2] p-5 sm:p-8 lg:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
        style="opacity:{v?1:0};transform:translateY({v?0:36}px);transition:opacity .65s ease .4s,transform .65s ease .4s"
      >
        <div>
          <div class="flex items-center justify-between gap-3 mb-4 sm:mb-6">
            <span class="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#1A456F] text-white text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase shadow-2xs">
              CRM REACTIVATION
            </span>
            <div class="flex items-center -space-x-1.5">
              <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-blue-200 p-1 shadow-2xs flex items-center justify-center" title="Twilio">
                <img loading="lazy" decoding="async" src="/flowjoy/twilio.svg" alt="Twilio" class="w-full h-full object-contain" />
              </div>
              <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-blue-200 p-1 shadow-2xs flex items-center justify-center" title="Make">
                <img loading="lazy" decoding="async" src="/flowjoy/make.svg" alt="Make" class="w-full h-full object-contain" />
              </div>
              <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-blue-200 p-1 shadow-2xs flex items-center justify-center" title="HubSpot">
                <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/hubspot/FF7A59" alt="HubSpot" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0C1E30] tracking-tight leading-snug mb-3">
            Thousands of qualified CRM leads sit cold and neglected.
          </h3>

          <!-- PUFFY PILLS -->
          <div class="flex flex-wrap gap-2 mb-5">
            <span class="px-3.5 py-1.5 rounded-xl bg-[#FF3815] text-white text-xs sm:text-sm font-extrabold shadow-xs">
              Thousands cold in CRM
            </span>
            <span class="px-3.5 py-1.5 rounded-xl bg-[#FFEB00] text-zinc-950 text-xs sm:text-sm font-extrabold shadow-xs">
              10-DID 10DLC pool
            </span>
            <span class="px-3.5 py-1.5 rounded-xl bg-[#10B981] text-white text-xs sm:text-sm font-extrabold shadow-xs">
              142 calls booked
            </span>
          </div>

          <p class="text-xs sm:text-sm text-[#3B526B] font-light leading-relaxed mb-4 sm:mb-6">
            We build multi-number 10DLC engines that identify dormant opportunities, personalize 1-on-1 outreach, and reactivate closed-lost deals without burning carrier reputation.
          </p>
        </div>

        <div class="rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-sm border border-blue-100 mt-1 sm:mt-2">
          <div class="flex items-center justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-zinc-100">
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center p-0.5">
                <img loading="lazy" decoding="async" src="/flowjoy/twilio.svg" alt="Twilio" class="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />
              </div>
              <span class="text-xs font-bold text-zinc-900">Carrier-Safe 10DLC Pool</span>
            </div>
            <span class="text-[9px] sm:text-[10px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-1.5 sm:px-2 py-0.5 rounded-full font-bold">
              10 Rotating DIDs
            </span>
          </div>

          <div class="space-y-2 text-xs">
            <div class="text-zinc-800 font-medium text-[11px] sm:text-xs">
              Target: <strong class="text-zinc-950 font-bold">Stalled Accounts (90+ Days Silent)</strong>
            </div>
            <div class="p-2.5 sm:p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-zinc-700 font-light text-[11px] leading-relaxed">
              "Hey David, saw your team just expanded headcount. We automated patient scheduling for similar multi-clinic groups—open to a quick 5-min look?"
            </div>
            <div class="flex items-center justify-between pt-1.5 sm:pt-2 text-[10px] sm:text-[11px] text-zinc-500">
              <span>Automatic CRM update on reply</span>
              <strong class="text-emerald-700 font-semibold">142 calls booked &bull; 0 spam flags</strong>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- BOTTOM POSITIONING BAR -->
    <div
      class="relative overflow-hidden rounded-3xl bg-zinc-950 text-white p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 shadow-xl border border-zinc-800/80"
      style="opacity:{v?1:0};transform:translateY({v?0:24}px);transition:opacity .7s ease .5s,transform .7s ease .5s"
    >
      <div class="absolute -left-10 -top-10 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-zinc-900/90 border border-zinc-800 p-2 sm:p-3 flex items-center justify-center shrink-0 shadow-lg shadow-black/50">
          <img src="/logo-green.png" alt="Flowjoy" class="w-full h-full object-contain" />
        </div>

        <div>
          <h4 class="text-lg sm:text-2xl font-bold tracking-tight mb-1.5 sm:mb-2 text-white">
            Flowjoy builds the revenue systems that turn GTM data and signals into pipeline.
          </h4>
          <p class="text-xs sm:text-sm text-zinc-400 font-light max-w-xl leading-relaxed">
            We inspect your stack &bull; map required signals and logic &bull; engineer the production system directly into your workflow.
          </p>
        </div>
      </div>

      <button
        type="button"
        on:click={() => scrollToSection('gtm-teardown')}
        class="relative z-10 bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition shadow-sm whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] shrink-0 self-start lg:self-center"
      >
        Get a free GTM teardown &rarr;
      </button>
    </div>

  </div>
</section>
