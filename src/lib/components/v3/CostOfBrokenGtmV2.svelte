<script lang="ts">
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section class="py-24 lg:py-32 bg-white font-[Poppins] text-zinc-900 border-t border-zinc-100 relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Section Header (Clean, minimal, uncrowded) -->
    <div class="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-600 mb-5">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
        The real cost of broken GTM
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-950 tracking-tight leading-[1.08] mb-6">
        Your bottleneck.<br />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">
          Our engineered outcome.
        </span>
      </h2>
      <p class="text-zinc-600 text-base sm:text-lg leading-relaxed font-light max-w-xl mx-auto">
        Every hour sales reps spend copying data and researching prospects is an hour they aren't closing deals. Here is what we engineer instead.
      </p>
    </div>

    <div class="space-y-24 lg:space-y-36">

      <!-- ─── PART 1: ENRICHMENT (Illustration Left, Copy Right) ─── -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <!-- Illustration Left -->
        <div class="lg:col-span-7">
          <div class="relative rounded-[2.5rem] p-7 sm:p-10 shadow-lg border border-amber-200/80 overflow-hidden"
               style="background: linear-gradient(180deg, #FFFDF5 0%, #FFF5D6 100%);">

            <!-- Top Raw Inputs: Apollo + Clay -->
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-amber-200/60">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono uppercase tracking-wider text-amber-900/70 font-semibold">
                  Input Stream:
                </span>
                <div class="flex items-center -space-x-1.5">
                  <div class="w-7 h-7 rounded-lg bg-white border border-amber-200 p-1 shadow-xs" title="Apollo">
                    <img src="/flowjoy/logos/apollo/apollo-icon.svg" alt="Apollo" class="w-full h-full object-contain" />
                  </div>
                  <div class="w-7 h-7 rounded-lg bg-white border border-amber-200 p-1 shadow-xs" title="Clay">
                    <img src="/flowjoy/logos/Full%20Mark/Dark/Clay_Logo_Primary_Blk.png" alt="Clay" class="w-full h-full object-contain" />
                  </div>
                </div>
                <span class="text-xs font-bold text-zinc-900 ml-1">Apollo + Clay Waterfall</span>
              </div>
              <span class="text-[11px] font-mono text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full font-medium">
                Auto-Enriched
              </span>
            </div>

            <!-- Animated SVG Flow Connector -->
            <div class="relative w-full h-10 flex items-center justify-center">
              <svg class="w-full h-full" viewBox="0 0 400 40" fill="none">
                <path d="M 20,20 L 380,20" stroke="#d97706" stroke-dasharray="6 6" stroke-width="2" class="flow-line" />
                <circle cx="200" cy="20" r="4.5" fill="#d97706" class="animate-pulse" />
              </svg>
            </div>

            <!-- Floating White Outcome Card: Real CRM Dossier -->
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
                <strong class="font-semibold text-zinc-900">Enriched Dossier:</strong> Company raised Series A, hired 4 SDRs, and tech stack includes HubSpot + Apollo. Validated direct work email.
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
            Enrichment Bottleneck Solved
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight leading-snug mb-4">
            Clean, enriched ICP accounts delivered before reps sit down.
          </h3>
          <p class="text-zinc-600 text-sm sm:text-base leading-relaxed font-light mb-6">
            We engineer multi-source waterfalls uniting Apollo, Clay, and custom scrapers. Every account lands in your CRM verified, scored, and enriched with deep firmographic context.
          </p>
          <div class="space-y-3 text-xs sm:text-sm text-zinc-700">
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Automated waterfall across 3+ data vendors</span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Deterministic CRM write with zero duplicates</span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Reps spend 0 hours on manual account research</span>
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
            Intent Blindness Solved
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight leading-snug mb-4">
            Buying signals detected, qualified, and drafted in under 60 seconds.
          </h3>
          <p class="text-zinc-600 text-sm sm:text-base leading-relaxed font-light mb-6">
            High-intent questions on Reddit, X, and job listings go unnoticed every day. We build autonomous scanners that detect buying triggers, qualify the buyer, and draft tailored outreach straight into Slack.
          </p>
          <div class="space-y-3 text-xs sm:text-sm text-zinc-700">
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-violet-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Sub-60-second signal to Slack alert</span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-violet-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Pre-drafted response referencing specific pain points</span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-violet-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              <span>Continuous 24/7 scanning of 40+ high-intent channels</span>
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
                <span class="text-xs font-bold text-zinc-900">Reddit r/sales Buying Thread</span>
              </div>
              <span class="text-[11px] font-mono text-violet-800 bg-violet-100 px-2.5 py-0.5 rounded-full font-medium">
                Live Signal
              </span>
            </div>

            <!-- Animated SVG Flow Connector -->
            <div class="relative w-full h-10 flex items-center justify-center">
              <svg class="w-full h-full" viewBox="0 0 400 40" fill="none">
                <path d="M 20,20 L 380,20" stroke="#7c3aed" stroke-dasharray="6 6" stroke-width="2" class="flow-line" />
                <circle cx="200" cy="20" r="4.5" fill="#7c3aed" class="animate-pulse" />
              </svg>
            </div>

            <!-- Floating White Outcome Card: Slack Deal Room Alert -->
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
                  <span class="text-[10px] text-zinc-400 font-mono">1m ago</span>
                </div>
                <span class="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded">
                  Autonomous Lead Bot
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
                  <span class="text-zinc-400 font-light">Includes direct LinkedIn profile + verified email</span>
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


      <!-- ─── PART 3: VOICE INTAKE (Illustration Left, Copy Right) ─── -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <!-- Illustration Left -->
        <div class="lg:col-span-7">
          <div class="relative rounded-[2.5rem] p-7 sm:p-10 shadow-lg border border-emerald-200/80 overflow-hidden"
               style="background: linear-gradient(180deg, #F6FEFA 0%, #D1FAE5 100%);">

            <!-- Top Raw Input: Inbound Call -->
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-emerald-200/60">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono uppercase tracking-wider text-emerald-900/70 font-semibold">
                  Inbound Channel:
                </span>
                <div class="w-7 h-7 rounded-lg bg-white border border-emerald-200 p-1 shadow-xs" title="Twilio">
                  <img src="/flowjoy/logos/Twilio/Twilio_idseuPD28S_0.svg" alt="Twilio" class="w-full h-full object-contain" />
                </div>
                <span class="text-xs font-bold text-zinc-900">Live Phone &amp; Web Inbound</span>
              </div>
              <span class="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-medium">
                24/7/365
              </span>
            </div>

            <!-- Animated Waveform SVG Flow Connector -->
            <div class="relative w-full h-10 flex items-center justify-center">
              <svg class="w-full h-full" viewBox="0 0 400 40" fill="none">
                <path d="M 20,20 L 170,20 Q 185,5 200,20 T 230,20 L 380,20" stroke="#059669" stroke-dasharray="6 6" stroke-width="2" class="flow-line" />
                <circle cx="200" cy="20" r="4.5" fill="#059669" class="animate-pulse" />
              </svg>
            </div>

            <!-- Floating White Outcome Card: Cal.com Meeting Booked -->
            <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-emerald-100 mt-2">
              <div class="flex items-start justify-between gap-4 mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <div class="font-bold text-sm text-zinc-900 flex items-center gap-2">
                      Elena Rostova &bull; Managing Director
                    </div>
                    <div class="text-xs text-zinc-500 font-light">
                      Discovery Call Confirmed &bull; <strong class="text-emerald-600 font-medium">Qualified ($40k Budget)</strong>
                    </div>
                  </div>
                </div>
                <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Cal.com Sync
                </span>
              </div>

              <!-- Voice Notes -->
              <div class="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 font-light mb-3">
                <strong class="font-semibold text-zinc-900">Voice Screening Notes:</strong> Caller inquired about custom GTM sprints. Agent verified Series A stage and booked Thursday 2:00 PM on founder calendar.
              </div>

              <div class="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-100">
                <span>Latency to qualification:</span>
                <span class="text-emerald-700 font-mono font-semibold">Sub-600ms &bull; Zero human delay</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Copy Right -->
        <div class="lg:col-span-5 flex flex-col justify-center">
          <span class="text-xs font-mono uppercase tracking-wider text-emerald-600 font-semibold mb-3">
            03 &bull; Inbound Voice Infrastructure
          </span>
          <h3 class="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight leading-tight mb-4">
            Zero inbound leads dropped. Ever.
          </h3>
          <p class="text-zinc-600 text-base leading-relaxed font-light mb-6">
            Inbound leads that wait longer than 5 minutes are 10x less likely to convert. We deploy sub-second voice agents that answer immediately, handle business FAQs, and book qualified meetings on your calendar 24/7.
          </p>

          <div class="flex items-baseline gap-3 pt-4 border-t border-zinc-200">
            <span class="text-3xl font-bold text-zinc-950 tracking-tight">100%</span>
            <span class="text-xs text-zinc-500 font-light">of inbound callers qualified and engaged</span>
          </div>
        </div>

      </div>

    </div>

    <!-- Bottom CTA Bar -->
    <div class="mt-24 pt-12 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
      <div>
        <h4 class="text-xl font-bold text-zinc-900 tracking-tight">Have a specific GTM bottleneck costing your team time?</h4>
        <p class="text-sm text-zinc-500 font-light mt-1">Tell us your workflow. We'll inspect your stack and deliver a custom architecture prototype.</p>
      </div>
      <button
        on:click={() => scrollToSection('gtm-teardown')}
        class="shrink-0 px-8 py-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
      >
        Get a free GTM teardown
      </button>
    </div>

  </div>
</section>

<style>
  @keyframes flowDash {
    to {
      stroke-dashoffset: -24;
    }
  }
  .flow-line {
    animation: flowDash 1.4s linear infinite;
  }
</style>
