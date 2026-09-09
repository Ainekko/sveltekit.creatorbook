<script lang="ts">
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section id="problem" class="py-24 lg:py-32 bg-white font-[Poppins] text-zinc-900 border-t border-zinc-100 relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Section Header (Clay-inspired: short, direct, benefit-first) -->
    <div class="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-xs font-semibold text-rose-800 mb-5">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
        The Real Problem
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-950 tracking-tight leading-[1.08] mb-6">
        More reps won’t fix<br />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">
          broken systems.
        </span>
      </h2>
      <p class="text-zinc-600 text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto mb-6">
        Your team wastes 15+ hours a week on research, manual enrichment, and lead qualification. Clay made GTM Engineering possible. Most early-stage teams still can’t hire (or keep) a great GTME. That’s the gap we close.
      </p>
    </div>

    <div class="space-y-24 lg:space-y-36">

      <!-- ─── PART 1: ACCOUNT INTELLIGENCE (Illustration Left, Copy Right) ─── -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <!-- Illustration Left -->
        <div class="lg:col-span-7">
          <div class="relative rounded-[2.5rem] p-7 sm:p-10 shadow-lg border border-amber-200/80 overflow-hidden"
               style="background: linear-gradient(180deg, #FFFDF5 0%, #FFF5D6 100%);">

            <!-- Top Raw Inputs: Apollo + Clay Waterfall -->
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-amber-200/60">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono uppercase tracking-wider text-amber-900/70 font-semibold">
                  Data Sources:
                </span>
                <div class="flex items-center -space-x-1.5">
                  <div class="w-7 h-7 rounded-lg bg-white border border-amber-200 p-1 shadow-xs" title="Apollo">
                    <img src="/flowjoy/logos/apollo/apollo-icon.svg" alt="Apollo" class="w-full h-full object-contain" />
                  </div>
                  <div class="w-7 h-7 rounded-lg bg-white border border-amber-200 p-1 shadow-xs" title="Clay">
                    <img src="/flowjoy/logos/Full%20Mark/Dark/Clay_Logo_Primary_Blk.png" alt="Clay" class="w-full h-full object-contain" />
                  </div>
                </div>
                <span class="text-xs font-bold text-zinc-900 ml-1">Apollo + Clay + Custom Data</span>
              </div>
              <span class="text-[11px] font-mono text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full font-medium">
                Clean & Verified
              </span>
            </div>

            <!-- Flow Connector -->
            <div class="relative w-full h-10 flex items-center justify-center">
              <svg class="w-full h-full" viewBox="0 0 400 40" fill="none">
                <path d="M 20,20 L 380,20" stroke="#d97706" stroke-dasharray="6 6" stroke-width="2" />
                <circle cx="200" cy="20" r="4.5" fill="#d97706" class="animate-pulse" />
              </svg>
            </div>

            <!-- Real CRM Dossier Card -->
            <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-amber-100 mt-2">
              <div class="flex items-start justify-between gap-4 mb-3">
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
                    <div class="text-xs text-zinc-500 font-light">
                      VP Revenue Operations &bull; <strong class="text-zinc-700 font-medium">HyperScale AI</strong>
                    </div>
                  </div>
                </div>
                <div class="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200 p-1 flex items-center justify-center" title="HubSpot">
                  <img src="https://cdn.simpleicons.org/hubspot/FF7A59" alt="HubSpot" class="w-full h-full object-contain" />
                </div>
              </div>

              <!-- Enriched Hook -->
              <div class="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 font-light mb-3">
                <strong class="font-semibold text-zinc-900">Enriched Dossier:</strong> Hired 4 SDRs, tech stack includes HubSpot + Apollo. Validated direct work email & phone.
              </div>

              <div class="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-100">
                <span>Output destination:</span>
                <span class="text-zinc-900 font-semibold flex items-center gap-1">
                  Synced directly into HubSpot CRM
                  <svg class="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                </span>
              </div>
            </div>

          </div>
        </div>

        <!-- Copy Right -->
        <div class="lg:col-span-5">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-amber-900 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Account Intelligence
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight leading-snug mb-4">
            Every account verified and enriched before your reps sit down.
          </h3>
          <p class="text-zinc-600 text-sm sm:text-base leading-relaxed font-light mb-6">
            Your sales team opens their CRM to direct work emails, mobile numbers, and live company triggers already populated. Reps spend 100% of their day having sales conversations—never hunting for contact details.
          </p>
          <div class="space-y-3 text-xs sm:text-sm text-zinc-700">
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>95%+ verified direct dials &amp; work emails</span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Zero duplicate leads or messy CRM records</span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Reps save 15+ hours of manual data entry every week</span>
            </div>
          </div>
        </div>

      </div>

      <!-- ─── PART 2: INTENT (Copy Left, Illustration Right) ─── -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <!-- Copy Left -->
        <div class="lg:col-span-5 order-2 lg:order-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200/80 text-xs font-semibold text-violet-900 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
            Real-Time Buyer Intent
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight leading-snug mb-4">
            Catch buyers the moment they’re looking for solutions.
          </h3>
          <p class="text-zinc-600 text-sm sm:text-base leading-relaxed font-light mb-6">
            When your ideal customers ask for recommendations on Reddit, X, or job boards, your team receives an alert in Slack within 60 seconds—complete with a tailored reply ready to review and send.
          </p>
          <div class="space-y-3 text-xs sm:text-sm text-zinc-700">
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-violet-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Alerts in Slack under 60 seconds from buyer activity</span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-violet-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Personalized responses citing the buyer’s exact problem</span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-violet-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Never miss high-intent conversations across 40+ communities</span>
            </div>
          </div>
        </div>

        <!-- Illustration Right -->
        <div class="lg:col-span-7 order-1 lg:order-2">
          <div class="relative rounded-[2.5rem] p-7 sm:p-10 shadow-lg border border-violet-200/80 overflow-hidden"
               style="background: linear-gradient(180deg, #FAF7FE 0%, #EDE5FA 100%);">

            <!-- Top Raw Input: Social Intent Trigger -->
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-violet-200/60">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono uppercase tracking-wider text-violet-900/70 font-semibold">
                  Signal Source:
                </span>
                <div class="w-7 h-7 rounded-lg bg-white border border-violet-200 p-1 shadow-xs" title="Reddit">
                  <img src="/flowjoy/reddit.svg" alt="Reddit" class="w-full h-full object-contain" />
                </div>
                <span class="text-xs font-bold text-zinc-900">Reddit r/sales Active Buying Thread</span>
              </div>
              <span class="text-[11px] font-mono text-violet-800 bg-violet-100 px-2.5 py-0.5 rounded-full font-medium">
                Live Trigger
              </span>
            </div>

            <!-- Animated Flow Line -->
            <div class="relative w-full h-10 flex items-center justify-center">
              <svg class="w-full h-full" viewBox="0 0 400 40" fill="none">
                <path d="M 20,20 L 380,20" stroke="#7c3aed" stroke-dasharray="6 6" stroke-width="2" />
                <circle cx="200" cy="20" r="4.5" fill="#7c3aed" class="animate-pulse" />
              </svg>
            </div>

            <!-- Slack Alert Card -->
            <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-violet-100 mt-2">
              <div class="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-md bg-white border border-zinc-200 flex items-center justify-center p-0.5">
                    <svg class="w-full h-full" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M27.2 80.6c0 7.3-5.9 13.2-13.2 13.2C6.7 93.8.8 87.9.8 80.6c0-7.3 5.9-13.2 13.2-13.2h13.2v13.2zm6.7 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33.2c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80.6z" fill="#E01E5A"/>
                      <path d="M47.1 27.2c-7.3 0-13.2-5.9-13.2-13.2C33.9 6.7 39.8.8 47.1.8c7.3 0 13.2 5.9 13.2 13.2v13.2H47.1zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.3.7 54.4.7 47.1c0-7.3 5.9-13.2 13.2-13.2h33.2z" fill="#36C5F0"/>
                      <path d="M100.8 47.1c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2h-13.2V47.1zm-6.7 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.9C80.9 6.6 86.8.7 94.1.7c7.3 0 13.2 5.9 13.2 13.2v33.2z" fill="#2EB67D"/>
                      <path d="M80.9 100.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2v-13.2h13.2zm0-6.7c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.2c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.9z" fill="#ECB22E"/>
                    </svg>
                  </div>
                  <span class="text-xs font-bold text-zinc-900">#gtm-buying-signals</span>
                  <span class="text-[10px] text-zinc-400 font-mono">42s ago</span>
                </div>
                <span class="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded">
                  Autonomous Signal Bot
                </span>
              </div>

              <div class="space-y-2 text-xs">
                <div class="text-zinc-800 font-medium">
                  Prospect: <strong class="text-zinc-950 font-bold">David Chen</strong> (Founder &bull; CloudNative Labs)
                </div>
                <div class="p-2.5 rounded-xl bg-violet-50/60 border border-violet-100 text-zinc-700 italic font-light">
                  "Hey David, saw your thread in r/sales asking for automated enrichment pipelines that don't rely on brittle Zapier zaps..."
                </div>
                <div class="flex items-center justify-between pt-2 text-[11px]">
                  <span class="text-zinc-400 font-light">Direct LinkedIn + verified email attached</span>
                  <span class="text-emerald-600 font-semibold flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Ready for 1-click send
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- ─── PART 3: INBOUND SPEED-TO-LEAD (Illustration Left, Copy Right) ─── -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <!-- Illustration Left -->
        <div class="lg:col-span-7">
          <div class="relative rounded-[2.5rem] p-7 sm:p-10 shadow-lg border border-emerald-200/80 overflow-hidden"
               style="background: linear-gradient(180deg, #F6FEFA 0%, #D1FAE5 100%);">

            <!-- Top Raw Input: Inbound Call -->
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-emerald-200/60">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono uppercase tracking-wider text-emerald-900/70 font-semibold">
                  Inbound Pipeline:
                </span>
                <div class="w-7 h-7 rounded-lg bg-white border border-emerald-200 p-1 shadow-xs" title="Twilio Voice">
                  <img src="/flowjoy/logos/Twilio/Twilio_idseuPD28S_0.svg" alt="Twilio" class="w-full h-full object-contain" />
                </div>
                <span class="text-xs font-bold text-zinc-900">Inbound Phone Call Trigger</span>
              </div>
              <span class="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Sub-600ms Response
              </span>
            </div>

            <!-- Flow Line -->
            <div class="relative w-full h-10 flex items-center justify-center">
              <svg class="w-full h-full" viewBox="0 0 400 40" fill="none">
                <path d="M 20,20 L 380,20" stroke="#059669" stroke-dasharray="6 6" stroke-width="2" />
                <circle cx="200" cy="20" r="4.5" fill="#059669" class="animate-pulse" />
              </svg>
            </div>

            <!-- Booked Meeting Card -->
            <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-emerald-100 mt-2">
              <div class="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center p-0.5">
                    <img src="https://cdn.simpleicons.org/googlecalendar/4285F4" alt="Calendar" class="w-4 h-4 object-contain" />
                  </div>
                  <span class="text-xs font-bold text-zinc-900">Demo Scheduled: Tomorrow 2:00 PM</span>
                </div>
                <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Confirmed
                </span>
              </div>

              <div class="space-y-2 text-xs">
                <div class="text-zinc-800 font-medium">
                  Lead: <strong class="text-zinc-950 font-bold">Marcus Vance</strong> &bull; CRO @ FinOps Corp
                </div>
                <div class="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-zinc-700 font-light">
                  <strong>AI Qualification:</strong> $2M ARR, 25-person team, looking for automated GTM pipelines to replace manual SDR research.
                </div>
                <div class="flex items-center justify-between pt-2 text-[11px] text-zinc-500">
                  <span>Synced to Google Cal & CRM</span>
                  <span class="text-emerald-700 font-semibold">Zero human intervention</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Copy Right -->
        <div class="lg:col-span-5">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-900 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Instant Inbound Qualification
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight leading-snug mb-4">
            Inbound calls qualified and booked 24/7 with zero dropped leads.
          </h3>
          <p class="text-zinc-600 text-sm sm:text-base leading-relaxed font-light mb-6">
            An AI voice assistant answers every inbound call instantly, qualifies their budget and requirements, and books them straight onto your team’s calendar. No phone tag, no delays.
          </p>
          <div class="space-y-3 text-xs sm:text-sm text-zinc-700">
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Instant, natural human conversation day or night</span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Meetings booked directly onto your reps’ calendars</span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Complete call notes and qualification logged to your CRM</span>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Bottom summary banner -->
    <div class="mt-24 p-8 rounded-3xl bg-zinc-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h4 class="text-xl font-bold mb-1">We engineer around your existing stack. Then we hand you the code.</h4>
        <p class="text-sm text-zinc-400 font-light">Apollo &bull; Clay &bull; HubSpot &bull; Salesforce &bull; Slack &bull; Twilio &bull; Retell</p>
      </div>
      <button
        on:click={() => scrollToSection('gtm-teardown')}
        class="bg-white text-zinc-950 font-bold px-7 py-3.5 rounded-xl hover:bg-zinc-100 transition whitespace-nowrap cursor-pointer text-sm shadow-md"
      >
        Get a free GTM teardown
      </button>
    </div>

  </div>
</section>
