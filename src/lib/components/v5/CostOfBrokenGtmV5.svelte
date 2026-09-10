<script lang="ts">
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section id="problem" class="py-24 sm:py-32 bg-white font-[Poppins] text-zinc-900 border-t border-zinc-100 relative">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- ─── SECTION HEADER (Clay style: crisp display type on white) ─── -->
    <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-xs font-semibold text-rose-800 mb-5">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
        The Revenue Bottlenecks
      </div>

      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-950 tracking-tight leading-[1.08] mb-6">
        More reps won’t fix<br />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">
          broken systems.
        </span>
      </h2>

      <p class="text-zinc-600 text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto">
        Companies don't need more GTM tools. You have revenue bottlenecks your existing people, data, and software aren't solving.
      </p>
    </div>

    <!-- ─── CLAY-INSPIRED BENTO GRID ─── -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16">

      <!-- ════════════════════════════════════════════════════════════════════ -->
      <!-- BENTO CARD 1 (Top Left, 7 cols): Account Intelligence (Wide)         -->
      <!-- ════════════════════════════════════════════════════════════════════ -->
      <div class="lg:col-span-7 rounded-[2.5rem] bg-[#FAF5EE] border border-[#EBDCCF] p-7 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
        <div>
          <!-- Tag & Logos Header -->
          <div class="flex items-center justify-between gap-4 mb-6">
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-[#963816] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-2xs">
              ACCOUNT INTELLIGENCE
            </span>
            <div class="flex items-center -space-x-1.5">
              <div class="w-7 h-7 rounded-lg bg-white border border-amber-200/80 p-1 shadow-2xs flex items-center justify-center" title="Apollo">
                <img loading="lazy" decoding="async" src="/flowjoy/logos/apollo/apollo-icon.svg" alt="Apollo" class="w-full h-full object-contain" />
              </div>
              <div class="w-7 h-7 rounded-lg bg-white border border-amber-200/80 p-1 shadow-2xs flex items-center justify-center" title="Clay">
                <img loading="lazy" decoding="async" src="/flowjoy/logos/Full%20Mark/Dark/Clay_Logo_Primary_Blk.png" alt="Clay" class="w-full h-full object-contain" />
              </div>
              <div class="w-7 h-7 rounded-lg bg-white border border-amber-200/80 p-1 shadow-2xs flex items-center justify-center" title="HubSpot">
                <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/hubspot/FF7A59" alt="HubSpot" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <h3 class="text-2xl sm:text-3xl font-bold text-[#23150D] tracking-tight leading-snug mb-3">
            SDRs waste 15+ hours a week on manual research.
          </h3>
          <p class="text-sm text-[#5C483D] font-light leading-relaxed mb-6">
            Reps open their CRM to direct work emails, mobile numbers, and live company triggers already populated. Reps spend 100% of their day having sales conversations.
          </p>
        </div>

        <!-- The Sarah Jenkins CRM Dossier Illustration from version 1 -->
        <div class="rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-amber-200/60 mt-2">
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                SJ
              </div>
              <div>
                <div class="font-bold text-sm text-zinc-900 flex items-center gap-2">
                  Sarah Jenkins
                  <span class="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    98% ICP Match
                  </span>
                </div>
                <div class="text-[11px] text-zinc-500">
                  VP Revenue Operations &bull; <strong class="text-zinc-700 font-medium">HyperScale AI</strong>
                </div>
              </div>
            </div>
            <div class="w-6 h-6 rounded-md bg-orange-50 border border-orange-200 p-1 flex items-center justify-center">
              <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/hubspot/FF7A59" alt="HubSpot" class="w-full h-full object-contain" />
            </div>
          </div>

          <div class="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-700 font-light mb-3">
            <strong class="font-semibold text-zinc-900">Enriched Triggers:</strong> Series A, hiring 4 SDRs, stack includes HubSpot + Apollo. Direct dials verified.
          </div>

          <div class="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-100">
            <span>Verified work phone & email</span>
            <span class="text-emerald-700 font-semibold flex items-center gap-1">
              Synced directly to HubSpot CRM
              <svg class="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
            </span>
          </div>
        </div>
      </div>

      <!-- ════════════════════════════════════════════════════════════════════ -->
      <!-- BENTO CARD 2 (Top Right, 5 cols): Intent Signals (Slack Alert)       -->
      <!-- ════════════════════════════════════════════════════════════════════ -->
      <div class="lg:col-span-5 rounded-[2.5rem] bg-[#FAF5FE] border border-[#E9DDF8] p-7 sm:p-9 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
        <div>
          <!-- Tag & Logos Header -->
          <div class="flex items-center justify-between gap-4 mb-5">
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-[#6D28D9] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-2xs">
              BUYER INTENT
            </span>
            <div class="flex items-center -space-x-1.5">
              <div class="w-7 h-7 rounded-lg bg-white border border-violet-200 p-1 shadow-2xs flex items-center justify-center" title="Reddit">
                <img loading="lazy" decoding="async" src="/flowjoy/reddit.svg" alt="Reddit" class="w-full h-full object-contain" />
              </div>
              <div class="w-7 h-7 rounded-lg bg-white border border-violet-200 p-1 shadow-2xs flex items-center justify-center" title="Slack">
                <img loading="lazy" decoding="async" src="/flowjoy/slack.svg" alt="Slack" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <h3 class="text-xl sm:text-2xl font-bold text-[#1E1035] tracking-tight leading-snug mb-2">
            Valuable buying signals on social go uncaptured.
          </h3>
          <p class="text-xs sm:text-sm text-[#503E6B] font-light leading-relaxed mb-5">
            When buyers ask for solutions on Reddit or forums, your team gets alerted in Slack within 60s with a pre-drafted reply.
          </p>
        </div>

        <!-- The David Chen Slack Alert Illustration from version 1 -->
        <div class="rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-violet-100 mt-2">
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

      <!-- ════════════════════════════════════════════════════════════════════ -->
      <!-- BENTO CARD 3 (Bottom Left, 5 cols): Inbound Voice (Twilio + Cal)     -->
      <!-- ════════════════════════════════════════════════════════════════════ -->
      <div class="lg:col-span-5 rounded-[2.5rem] bg-[#F3FAF6] border border-[#D5EFE3] p-7 sm:p-9 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
        <div>
          <!-- Tag & Logos Header -->
          <div class="flex items-center justify-between gap-4 mb-5">
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-[#18533C] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-2xs">
              SPEED-TO-LEAD
            </span>
            <div class="flex items-center -space-x-1.5">
              <div class="w-7 h-7 rounded-lg bg-white border border-emerald-200 p-1 shadow-2xs flex items-center justify-center" title="Twilio">
                <img loading="lazy" decoding="async" src="/flowjoy/twilio.svg" alt="Twilio" class="w-full h-full object-contain" />
              </div>
              <div class="w-7 h-7 rounded-lg bg-white border border-emerald-200 p-1 shadow-2xs flex items-center justify-center" title="Retell AI">
                <img loading="lazy" decoding="async" src="/flowjoy/retell.svg" alt="Retell AI" class="w-full h-full object-contain" />
              </div>
              <div class="w-7 h-7 rounded-lg bg-white border border-emerald-200 p-1 shadow-2xs flex items-center justify-center" title="Google Calendar">
                <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/googlecalendar/4285F4" alt="Google Calendar" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <h3 class="text-xl sm:text-2xl font-bold text-[#0E241B] tracking-tight leading-snug mb-2">
            Inbound leads wait hours instead of seconds.
          </h3>
          <p class="text-xs sm:text-sm text-[#3E5A4E] font-light leading-relaxed mb-5">
            An AI voice assistant answers every inbound call in sub-600ms, screens for ICP fit, and books qualified meetings directly on the calendar.
          </p>
        </div>

        <!-- The Marcus Vance Booked Meeting Illustration from version 1 -->
        <div class="rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-emerald-100 mt-2">
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
              <span>Synced to Calendar & CRM</span>
              <span class="text-emerald-700 font-semibold">Zero dropped calls</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ════════════════════════════════════════════════════════════════════ -->
      <!-- BENTO CARD 4 (Bottom Right, 7 cols): Dormant CRM Reactivation (Wide)  -->
      <!-- ════════════════════════════════════════════════════════════════════ -->
      <div class="lg:col-span-7 rounded-[2.5rem] bg-[#F1F6FB] border border-[#D9E6F2] p-7 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
        <div>
          <!-- Tag & Logos Header -->
          <div class="flex items-center justify-between gap-4 mb-6">
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-[#1A456F] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-2xs">
              CRM REACTIVATION
            </span>
            <div class="flex items-center -space-x-1.5">
              <div class="w-7 h-7 rounded-lg bg-white border border-blue-200 p-1 shadow-2xs flex items-center justify-center" title="Twilio">
                <img loading="lazy" decoding="async" src="/flowjoy/twilio.svg" alt="Twilio" class="w-full h-full object-contain" />
              </div>
              <div class="w-7 h-7 rounded-lg bg-white border border-blue-200 p-1 shadow-2xs flex items-center justify-center" title="Make">
                <img loading="lazy" decoding="async" src="/flowjoy/make.svg" alt="Make" class="w-full h-full object-contain" />
              </div>
              <div class="w-7 h-7 rounded-lg bg-white border border-blue-200 p-1 shadow-2xs flex items-center justify-center" title="HubSpot">
                <img loading="lazy" decoding="async" src="https://cdn.simpleicons.org/hubspot/FF7A59" alt="HubSpot" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <h3 class="text-2xl sm:text-3xl font-bold text-[#0C1E30] tracking-tight leading-snug mb-3">
            Thousands of qualified CRM leads sit cold and neglected.
          </h3>
          <p class="text-sm text-[#3B526B] font-light leading-relaxed mb-6">
            We build multi-number 10DLC engines that identify dormant opportunities, personalize 1-on-1 outreach, and reactivate closed-lost deals without burning carrier reputation.
          </p>
        </div>

        <!-- The SMS Reactivation Illustration -->
        <div class="rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-blue-100 mt-2">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center p-0.5">
                <img loading="lazy" decoding="async" src="/flowjoy/twilio.svg" alt="Twilio" class="w-4 h-4 object-contain" />
              </div>
              <span class="text-xs font-bold text-zinc-900">Carrier-Safe 10DLC Multi-DID Pool</span>
            </div>
            <span class="text-[10px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-bold">
              10 Rotating DIDs
            </span>
          </div>

          <div class="space-y-2 text-xs">
            <div class="text-zinc-800 font-medium">
              Target: <strong class="text-zinc-950 font-bold">Stalled Accounts (90+ Days Silent)</strong>
            </div>
            <div class="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-zinc-700 font-light text-[11px] leading-relaxed">
              "Hey David, saw your team just expanded headcount. We automated patient scheduling for similar multi-clinic groups—open to a quick 5-min look?"
            </div>
            <div class="flex items-center justify-between pt-2 text-[11px] text-zinc-500">
              <span>Automatic CRM status update on reply</span>
              <strong class="text-emerald-700 font-semibold">142 calls booked &bull; 0 spam flags</strong>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ─── BOTTOM POSITIONING BAR ─── -->
    <div class="rounded-3xl bg-zinc-950 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
      <div>
        <h4 class="text-xl sm:text-2xl font-bold tracking-tight mb-2">
          Flowjoy builds the revenue systems that turn GTM data and signals into pipeline.
        </h4>
        <p class="text-xs sm:text-sm text-zinc-400 font-light max-w-xl">
          We inspect your stack &bull; map required signals and logic &bull; engineer the production system directly into your workflow.
        </p>
      </div>

      <button
        type="button"
        on:click={() => scrollToSection('gtm-teardown')}
        class="bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-sm px-7 py-3.5 rounded-full transition shadow-sm whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] shrink-0"
      >
        Get a free GTM teardown &rarr;
      </button>
    </div>

  </div>
</section>
