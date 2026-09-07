<script lang="ts">
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section id="what-we-built" class="py-24 bg-[#070708] font-[Poppins] text-white border-t border-white/[0.06] relative overflow-hidden">
  <!-- Ambient glow -->
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/[0.02] blur-[140px] pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

    <!-- Section Header -->
    <div class="text-center max-w-2xl mx-auto mb-14">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-zinc-400 mb-4">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        Proof of execution
      </div>
      <h2 class="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
        What we've built.<br />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-400">
          Real production systems.
        </span>
      </h2>
      <p class="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
        These aren't concept decks. These are live systems we engineered, deployed, and run for revenue teams.
      </p>
    </div>

    <!-- ─── BENTO GRID: COMPACT CARDS WITH BLURRED THUMBNAILS ON BACKGROUND ─── -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- CARD 1: ELIO (Top Left - 7 cols)                          -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div class="lg:col-span-7 relative rounded-[2rem] p-7 sm:p-8 bg-[#0D0E11] border border-white/[0.08] shadow-2xl overflow-hidden flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300 group min-h-[380px]">
        <!-- Blurred Thumbnail in Background -->
        <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/flowjoy/elio_cover.jpg"
            alt="Elio Dashboard"
            class="w-full h-full object-cover object-top opacity-20 filter blur-[3px] scale-105 group-hover:scale-110 group-hover:opacity-25 transition-all duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/85 to-[#0D0E11]/60"></div>
        </div>

        <!-- Content Layer On Top -->
        <div class="relative z-10">
          <!-- Top Row: Badge + Integration Logos -->
          <div class="flex items-center justify-between gap-3 mb-4">
            <span class="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Social Listening &bull; AEO Pipeline
            </span>

            <!-- Prominent Logos in Glass Pills -->
            <div class="flex items-center gap-1.5">
              <div class="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 p-1.5 flex items-center justify-center shadow-xs" title="Reddit">
                <img src="/flowjoy/reddit.svg" alt="Reddit" class="w-full h-full object-contain" />
              </div>
              <div class="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 p-1.5 flex items-center justify-center shadow-xs" title="Claude">
                <img src="https://cdn.simpleicons.org/anthropic/D97757" alt="Claude" class="w-full h-full object-contain" />
              </div>
              <div class="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 p-1.5 flex items-center justify-center shadow-xs" title="Slack">
                <img src="https://cdn.simpleicons.org/slack/4A154B" alt="Slack" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <!-- Title & Punchy Description -->
          <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Elio &bull; Reddit Intent to Pipeline
          </h3>
          <p class="text-zinc-300 text-sm font-light leading-relaxed max-w-xl mb-6">
            Monitors 45+ subreddits for buying signals and competitor pain. Claude 3.5 scores high-intent threads and delivers pre-drafted outreach straight into Slack in under 60 seconds.
          </p>

          <!-- Outcome Metric Badges -->
          <div class="flex flex-wrap gap-2.5 mb-6">
            <span class="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-amber-300 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              &lt;60s Signal to Slack
            </span>
            <span class="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
              18 Meetings / Month
            </span>
            <span class="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
              AEO Search Authority Boost
            </span>
          </div>
        </div>

        <!-- Footer -->
        <div class="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400">
          <span>Continuous Reddit monitoring</span>
          <button on:click={() => scrollToSection('gtm-teardown')} class="text-white hover:text-amber-400 font-medium transition inline-flex items-center gap-1">
            See pipeline architecture &rarr;
          </button>
        </div>
      </div>


      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- CARD 2: BROADR (Top Right - 5 cols)                       -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div class="lg:col-span-5 relative rounded-[2rem] p-7 sm:p-8 bg-[#0D0E11] border border-white/[0.08] shadow-2xl overflow-hidden flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300 group min-h-[380px]">
        <!-- Blurred Thumbnail in Background -->
        <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/flowjoy/sms_app.jpg"
            alt="Broadr SMS App"
            class="w-full h-full object-cover object-top opacity-20 filter blur-[3px] scale-105 group-hover:scale-110 group-hover:opacity-25 transition-all duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/85 to-[#0D0E11]/60"></div>
        </div>

        <!-- Content Layer On Top -->
        <div class="relative z-10">
          <!-- Top Row: Badge + Integration Logos -->
          <div class="flex items-center justify-between gap-3 mb-4">
            <span class="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Scale SMS &bull; Reactivation
            </span>

            <div class="flex items-center gap-1.5">
              <div class="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 p-1.5 flex items-center justify-center shadow-xs" title="Twilio">
                <img src="https://cdn.simpleicons.org/twilio/F22F46" alt="Twilio" class="w-full h-full object-contain" />
              </div>
              <div class="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 p-1.5 flex items-center justify-center shadow-xs" title="Slack">
                <img src="https://cdn.simpleicons.org/slack/4A154B" alt="Slack" class="w-full h-full object-contain" />
              </div>
              <div class="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 p-1.5 flex items-center justify-center shadow-xs" title="Make">
                <img src="/flowjoy/make.svg" alt="Make" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <!-- Title & Punchy Description -->
          <h3 class="text-2xl font-bold text-white tracking-tight mb-2">
            Broadr &bull; Cold Lead Reactivation
          </h3>
          <p class="text-zinc-300 text-sm font-light leading-relaxed mb-6">
            Pumps dormant CRM lists through a multi-number rotation pool. Qualified replies alert SDRs in Slack; opt-outs sync to DNC automatically.
          </p>

          <!-- Outcome Metric Badges -->
          <div class="flex flex-wrap gap-2.5 mb-6">
            <span class="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-blue-300 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              99.4% Deliverability
            </span>
            <span class="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
              Auto DNC Blacklist
            </span>
          </div>
        </div>

        <!-- Footer -->
        <div class="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400">
          <span>Carrier reputation safe</span>
          <button on:click={() => scrollToSection('gtm-teardown')} class="text-white hover:text-blue-400 font-medium transition inline-flex items-center gap-1">
            Scope sprint &rarr;
          </button>
        </div>
      </div>


      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- CARD 3: LAURIE (Bottom Left - 7 cols)                     -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div class="lg:col-span-7 relative rounded-[2rem] p-7 sm:p-8 bg-[#0D0E11] border border-white/[0.08] shadow-2xl overflow-hidden flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300 group min-h-[380px]">
        <!-- Blurred Thumbnail in Background -->
        <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/flowjoy/front_desk_assistant.jpg"
            alt="Laurie Voice AI"
            class="w-full h-full object-cover object-top opacity-20 filter blur-[3px] scale-105 group-hover:scale-110 group-hover:opacity-25 transition-all duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/85 to-[#0D0E11]/60"></div>
        </div>

        <!-- Content Layer On Top -->
        <div class="relative z-10">
          <!-- Top Row: Badge + Integration Logos -->
          <div class="flex items-center justify-between gap-3 mb-4">
            <span class="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Conversational Voice AI &bull; Inbound Triage
            </span>

            <div class="flex items-center gap-1.5">
              <div class="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 p-1.5 flex items-center justify-center shadow-xs" title="Retell AI">
                <img src="/flowjoy/retell.svg" alt="Retell" class="w-full h-full object-contain" />
              </div>
              <div class="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 p-1.5 flex items-center justify-center shadow-xs" title="Twilio">
                <img src="https://cdn.simpleicons.org/twilio/F22F46" alt="Twilio" class="w-full h-full object-contain" />
              </div>
              <div class="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 p-1.5 flex items-center justify-center shadow-xs" title="Calendar">
                <img src="https://cdn.simpleicons.org/googlecalendar/4285F4" alt="Cal.com / Google Calendar" class="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <!-- Title & Punchy Description -->
          <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Laurie &bull; Voice AI Agent
          </h3>
          <p class="text-zinc-300 text-sm font-light leading-relaxed max-w-xl mb-6">
            Answers inbound phone calls 24/7 in sub-600ms. Qualifies budget and ICP fit ($40k+ ARR), then books the meeting directly on your calendar with full CRM sync.
          </p>

          <!-- Outcome Metric Badges -->
          <div class="flex flex-wrap gap-2.5 mb-6">
            <span class="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-emerald-300 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Sub-600ms Latency
            </span>
            <span class="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
              100% Inbound Calls Captured
            </span>
            <span class="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
              Cal.com Auto-Booking
            </span>
          </div>
        </div>

        <!-- Footer -->
        <div class="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400">
          <span>Active 24/7/365 &bull; Zero dropped calls</span>
          <button on:click={() => scrollToSection('gtm-teardown')} class="text-white hover:text-emerald-400 font-medium transition inline-flex items-center gap-1">
            See voice architecture &rarr;
          </button>
        </div>
      </div>


      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- CARD 4: SUNSET TEARDOWN CTA (Bottom Right - 5 cols)       -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div
        class="lg:col-span-5 relative rounded-[2rem] p-7 sm:p-8 shadow-2xl overflow-hidden flex flex-col justify-between hover:shadow-3xl transition-all duration-300 border border-[#F97316]/30 min-h-[380px]"
        style="background: linear-gradient(150deg, #180D07 0%, #361608 40%, #7C2D12 75%, #C2410C 100%);"
      >
        <!-- Subtle warm ambient glow in top-right -->
        <div class="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>

        <div class="relative z-10">
          <span class="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold block mb-2">
            Free Architecture Teardown
          </span>
          <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-3">
            Have a broken GTM workflow?
          </h3>
          <p class="text-zinc-200 text-sm font-light leading-relaxed mb-6">
            Tell us where your revenue process stalls. We'll inspect your stack and deliver a proposed architecture and working prototype.
          </p>

          <div class="space-y-2.5 mb-6 text-xs text-zinc-100 font-medium">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Shipped in 2–4 weeks to production
            </div>
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              You own 100% of the code &amp; pipelines
            </div>
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Zero distraction for your core eng team
            </div>
          </div>
        </div>

        <div class="relative z-10">
          <button
            on:click={() => scrollToSection('gtm-teardown')}
            class="w-full bg-white text-zinc-950 font-bold py-3.5 px-6 rounded-xl shadow-xl hover:bg-amber-50 hover:scale-[1.01] active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            Get a free GTM teardown
            <svg class="w-4 h-4 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
          <p class="text-[11px] text-zinc-300/80 text-center mt-2.5 font-medium">
            100% technical teardown crafted by an engineer
          </p>
        </div>
      </div>

    </div>

  </div>
</section>
