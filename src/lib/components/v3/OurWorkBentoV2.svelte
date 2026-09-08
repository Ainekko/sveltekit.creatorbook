<script lang="ts">
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section id="what-we-built" class="py-24 bg-[#070708] font-[Poppins] text-white border-t border-white/[0.06] relative overflow-hidden">
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
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-400">Real production systems.</span>
      </h2>
      <p class="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
        These aren't concept decks. These are live systems we engineered, deployed, and run for revenue teams.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

      <!-- ═══════════════════════════════════════ -->
      <!-- ELIO — Top Left (7 cols)               -->
      <!-- ═══════════════════════════════════════ -->
      <div class="lg:col-span-7 relative rounded-[2rem] overflow-hidden bg-[#0D0E11] border border-white/[0.08] shadow-2xl hover:border-amber-500/30 transition-all duration-300 group flex flex-col min-h-[500px]">

        <div class="absolute inset-0 z-0 pointer-events-none">
          <img src="/flowjoy/elio_cover.jpg" alt="" class="w-full h-full object-cover object-top opacity-10 filter blur-[4px] scale-105 group-hover:opacity-15 transition-all duration-700" />
          <div class="absolute inset-0 bg-gradient-to-b from-[#0D0E11]/60 via-[#0D0E11]/80 to-[#0D0E11]"></div>
        </div>

        <div class="relative z-10 flex flex-col flex-1 p-6 sm:p-8">
          <div class="mb-5">
            <span class="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Reddit Lead Intelligence Agent
            </span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">Elio</h3>
          <p class="text-zinc-400 text-sm font-light mb-8 max-w-md">
            Monitors 45+ subreddits for buying signals. Claude 3.5 scores threads and fires pre-drafted outreach straight into Slack in under 60 seconds.
          </p>

          <!-- Logo visual — streamlined flow -->
          <div class="flex-1 flex items-center justify-center my-4">
            <div class="flex items-center gap-6 sm:gap-10">
              <div class="flex flex-col items-center gap-2">
                <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-3 shadow-lg hover:border-orange-500/40 transition">
                  <img src="/flowjoy/reddit.svg" alt="Reddit" class="w-full h-full object-contain" />
                </div>
                <span class="text-[10px] font-mono text-zinc-500">Reddit</span>
              </div>

              <div class="flex items-center gap-1 pb-5">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500/40"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500/70"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500/40"></span>
              </div>

              <div class="flex flex-col items-center gap-2">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.25rem] bg-white/[0.08] border border-amber-500/25 flex items-center justify-center p-3.5 shadow-xl shadow-amber-950/30 hover:border-amber-500/50 transition">
                  <img src="https://cdn.simpleicons.org/anthropic/D97757" alt="Claude" class="w-full h-full object-contain" />
                </div>
                <span class="text-[10px] font-mono text-zinc-500">Claude 3.5</span>
              </div>

              <div class="flex items-center gap-1 pb-5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500/40"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500/70"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500/40"></span>
              </div>

              <div class="flex flex-col items-center gap-2">
                <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-3 shadow-lg hover:border-emerald-500/40 transition">
                  <svg class="w-full h-full" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.2 80.6c0 7.3-5.9 13.2-13.2 13.2C6.7 93.8.8 87.9.8 80.6c0-7.3 5.9-13.2 13.2-13.2h13.2v13.2zm6.7 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33.2c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80.6z" fill="#E01E5A"/>
                    <path d="M47.1 27.2c-7.3 0-13.2-5.9-13.2-13.2C33.9 6.7 39.8.8 47.1.8c7.3 0 13.2 5.9 13.2 13.2v13.2H47.1zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.3.7 54.4.7 47.1c0-7.3 5.9-13.2 13.2-13.2h33.2z" fill="#36C5F0"/>
                    <path d="M100.8 47.1c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2h-13.2V47.1zm-6.7 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.9C80.9 6.6 86.8.7 94.1.7c7.3 0 13.2 5.9 13.2 13.2v33.2z" fill="#2EB67D"/>
                    <path d="M80.9 100.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2v-13.2h13.2zm0-6.7c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.2c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.9z" fill="#ECB22E"/>
                  </svg>
                </div>
                <span class="text-[10px] font-mono text-zinc-500">Slack</span>
              </div>
            </div>
          </div>

          <!-- Professional capability tags (no made-up vanity stats) -->
          <div class="flex flex-wrap gap-2.5 mt-8">
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-amber-300 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              &lt;60s signal to Slack
            </span>
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-300">Automated reply drafts</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-300">Full context enrichment</span>
          </div>

          <div class="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-500">
            <span>Continuous Reddit monitoring</span>
            <button on:click={() => scrollToSection('gtm-teardown')} class="text-white hover:text-amber-400 font-medium transition inline-flex items-center gap-1">See pipeline &rarr;</button>
          </div>
        </div>
      </div>


      <!-- ═══════════════════════════════════════ -->
      <!-- BROADR — Top Right (5 cols)            -->
      <!-- ═══════════════════════════════════════ -->
      <div class="lg:col-span-5 relative rounded-[2rem] overflow-hidden bg-[#0D0E11] border border-white/[0.08] shadow-2xl hover:border-blue-500/30 transition-all duration-300 group flex flex-col min-h-[500px]">

        <div class="absolute inset-0 z-0 pointer-events-none">
          <img src="/flowjoy/sms_app.jpg" alt="" class="w-full h-full object-cover object-top opacity-10 filter blur-[4px] scale-105 group-hover:opacity-15 transition-all duration-700" />
          <div class="absolute inset-0 bg-gradient-to-b from-[#0D0E11]/60 via-[#0D0E11]/80 to-[#0D0E11]"></div>
        </div>

        <div class="relative z-10 flex flex-col flex-1 p-6 sm:p-8">
          <div class="mb-5">
            <span class="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              High-throughput SMS infrastructure
            </span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">Broadr</h3>
          <p class="text-zinc-400 text-sm font-light mb-8 max-w-sm">
            Pumps dormant CRM lists through a multi-number rotation pool. Qualified replies alert SDRs in Slack; opt-outs sync to DNC automatically.
          </p>

          <!-- Logo visual -->
          <div class="flex-1 flex items-center justify-center my-4">
            <div class="flex items-center gap-5 sm:gap-7">
              <div class="flex flex-col items-center gap-2">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-2.5 shadow-lg hover:border-red-500/40 transition">
                  <img src="/flowjoy/logos/Twilio/Twilio_idseuPD28S_0.svg" alt="Twilio" class="w-full h-full object-contain" />
                </div>
                <span class="text-[10px] font-mono text-zinc-500">Twilio</span>
              </div>

              <!-- Center 10DLC Pool node -->
              <div class="flex flex-col items-center gap-2">
                <div class="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                  <div class="absolute inset-0 rounded-2xl bg-blue-500/20 filter blur-lg animate-pulse pointer-events-none"></div>
                  <div class="w-full h-full rounded-2xl bg-[#0A0E17] border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.25)] flex items-center justify-center">
                    <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <span class="text-[10px] font-mono text-zinc-500">10DLC Pool</span>
              </div>

              <div class="flex flex-col items-center gap-2">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-2.5 shadow-lg hover:border-blue-500/40 transition">
                  <img src="/flowjoy/make.svg" alt="Make" class="w-full h-full object-contain" />
                </div>
                <span class="text-[10px] font-mono text-zinc-500">Make</span>
              </div>
            </div>
          </div>

          <!-- Professional capability tags (no made-up vanity stats) -->
          <div class="flex flex-wrap gap-2.5 mt-8">
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-blue-300 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Multi-DID rotation
            </span>
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-300">Instant DNC sync</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-300">Carrier safe</span>
          </div>

          <div class="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-500">
            <span>Carrier reputation safe</span>
            <button on:click={() => scrollToSection('gtm-teardown')} class="text-white hover:text-blue-400 font-medium transition inline-flex items-center gap-1">Scope sprint &rarr;</button>
          </div>
        </div>
      </div>


      <!-- ═══════════════════════════════════════ -->
      <!-- LAURIE — Bottom Left (7 cols)          -->
      <!-- ═══════════════════════════════════════ -->
      <div class="lg:col-span-7 relative rounded-[2rem] overflow-hidden bg-[#0D0E11] border border-white/[0.08] shadow-2xl hover:border-emerald-500/30 transition-all duration-300 group flex flex-col min-h-[460px]">

        <div class="absolute inset-0 z-0 pointer-events-none">
          <img src="/flowjoy/front_desk_assistant.jpg" alt="" class="w-full h-full object-cover object-top opacity-10 filter blur-[4px] scale-105 group-hover:opacity-15 transition-all duration-700" />
          <div class="absolute inset-0 bg-gradient-to-b from-[#0D0E11]/60 via-[#0D0E11]/80 to-[#0D0E11]"></div>
        </div>

        <div class="relative z-10 flex flex-col flex-1 p-6 sm:p-8">
          <div class="mb-5">
            <span class="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Inbound conversational voice AI
            </span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">Laurie</h3>
          <p class="text-zinc-400 text-sm font-light mb-8 max-w-md">
            Answers inbound calls 24/7 in sub-600ms. Qualifies budget and ICP fit, then books the meeting directly on your calendar with full CRM sync.
          </p>

          <!-- Logo visual — stepped heights for rhythm -->
          <div class="flex-1 flex items-center justify-center my-4">
            <div class="flex items-end gap-5 sm:gap-8">
              <div class="flex flex-col items-center gap-2 mb-3">
                <div class="w-13 h-13 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-2.5 shadow-lg hover:border-emerald-500/40 transition" style="width:3.25rem;height:3.25rem;">
                  <img src="/flowjoy/retell.svg" alt="Retell AI" class="w-full h-full object-contain" />
                </div>
                <span class="text-[10px] font-mono text-zinc-500">Retell AI</span>
              </div>

              <div class="flex flex-col items-center gap-2">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.25rem] bg-white/[0.08] border border-emerald-500/25 flex items-center justify-center p-3 shadow-xl shadow-emerald-950/30 hover:border-emerald-500/50 transition">
                  <img src="/flowjoy/logos/Twilio/Twilio_idseuPD28S_0.svg" alt="Twilio" class="w-full h-full object-contain" />
                </div>
                <span class="text-[10px] font-mono text-zinc-500">Twilio</span>
              </div>

              <div class="flex flex-col items-center gap-2 mb-3">
                <div class="rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-2.5 shadow-lg hover:border-blue-500/40 transition" style="width:3.25rem;height:3.25rem;">
                  <img src="https://cdn.simpleicons.org/googlecalendar/4285F4" alt="Google Calendar" class="w-full h-full object-contain" />
                </div>
                <span class="text-[10px] font-mono text-zinc-500">Google Calendar</span>
              </div>
            </div>
          </div>

          <!-- Professional capability tags (no made-up vanity stats) -->
          <div class="flex flex-wrap gap-2.5 mt-8">
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-emerald-300 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Sub-600ms latency
            </span>
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-300">Auto calendar booking</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-300">CRM transcript sync</span>
          </div>

          <div class="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-500">
            <span>Active 24/7/365 &bull; Real-time qualification</span>
            <button on:click={() => scrollToSection('gtm-teardown')} class="text-white hover:text-emerald-400 font-medium transition inline-flex items-center gap-1">See voice architecture &rarr;</button>
          </div>
        </div>
      </div>


      <!-- ═══════════════════════════════════════ -->
      <!-- TEARDOWN CTA — Bottom Right (5 cols)   -->
      <!-- ═══════════════════════════════════════ -->
      <div
        class="lg:col-span-5 rounded-[2rem] p-7 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden min-h-[460px]"
        style="background: linear-gradient(135deg, #F9B233 0%, #EAA224 45%, #F5C564 100%);"
      >
        <div>
          <span class="text-xs font-mono uppercase tracking-wider text-zinc-900/80 font-bold block mb-2">Free Architecture Teardown</span>
          <h3 class="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight leading-snug mb-3">Have a broken GTM workflow?</h3>
          <p class="text-zinc-900/80 text-xs sm:text-sm font-normal leading-relaxed mb-6">
            Tell us where your revenue process stalls. We'll inspect your stack and deliver a proposed architecture and prototype.
          </p>
          <div class="space-y-2.5 mb-6 text-xs text-zinc-900/90 font-medium">
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>Shipped in 2–4 weeks to production</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>You own 100% of the code &amp; pipelines</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>Zero distraction for your core eng team</div>
          </div>
        </div>
        <div>
          <button
            on:click={() => scrollToSection('gtm-teardown')}
            class="w-full bg-zinc-950 text-white font-semibold py-3.5 px-6 rounded-xl shadow-xl hover:bg-black transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            Get a free GTM teardown
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
          <p class="text-[11px] text-zinc-900/60 text-center mt-2.5 font-medium">100% technical teardown crafted by an engineer</p>
        </div>
      </div>

    </div>
  </div>
</section>
