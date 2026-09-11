<script lang="ts">
  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const team = [
    {
      name: 'Hafid',
      role: 'The Engineer With a Love for Marketing',
      badge: 'TECHNICAL GTME & PIPELINES',
      badgeBg: 'bg-[#18533C]',
      cardBg: 'bg-[#EDF5F0]',
      cardBorder: 'border-[#D6E7DC]',
      textColor: 'text-[#0E241B]',
      subTextColor: 'text-[#3E5A4E]',
      status: 'Building pipeline architecture',
      avatarInitial: 'H',
      avatarGradient: 'from-emerald-600 to-teal-700',
      bio: 'Deep systems engineer who fell in love with go-to-market mechanics. Specializes in custom scrapers, webhooks, sub-second API pipelines, and LLM evaluation scoring engines. Builds the technical infrastructure that makes revenue predictable.',
      focusPills: [
        'Reverse-Engineered Scrapers',
        'LLM Intent & Scoring Pipelines',
        'Webhook & CRM Sync Engines',
        'Direct API Cost Optimization'
      ],
      quote: 'I write the code and wire the pipelines so your reps stop doing 15 hours of manual data entry every single week.'
    },
    {
      name: 'Xander',
      role: 'Former Sales Guy & GTM Strategist',
      badge: 'CONVERSION & FRONT-LINE SALES',
      badgeBg: 'bg-[#1A456F]',
      cardBg: 'bg-[#EDF3F9]',
      cardBorder: 'border-[#D7E3EE]',
      textColor: 'text-[#0C1E30]',
      subTextColor: 'text-[#3B526B]',
      status: 'Reviewing conversation angles',
      avatarInitial: 'X',
      avatarGradient: 'from-blue-600 to-indigo-800',
      bio: 'Carried quota, dialed thousands of prospects, and lived in the outbound trenches. Knows exactly what makes buyers tune out and what makes them lean in. Ensures every automated touchpoint reads like a high-conviction conversation between two peers.',
      focusPills: [
        'High-Conviction Offer Angles',
        'Buyer Psychology & Friction Removal',
        'Domain Reputation Protection',
        'Human-to-Human Reply Loops'
      ],
      quote: 'If a message sounds like robotic AI spam that wouldn\'t convince me to reply, we never allow it into production.'
    }
  ];
</script>

<section id="who-we-are" class="py-24 sm:py-32 bg-[#090A0E] font-[Poppins] text-white relative overflow-hidden">
  <!-- Subtle dark background glow -->
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-emerald-500/5 via-blue-500/5 to-transparent blur-[130px] pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

    <!-- ─── SECTION HEADER ─── -->
    <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-zinc-400 mb-4">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        Who We Are & How We Think
      </div>
      <h2 class="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
        Two builders. Zero agency fluff.<br />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-400">
          Engineering discipline meets frontline sales.
        </span>
      </h2>
      <p class="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
        We are a tight, two-person team combining technical infrastructure with frontline sales execution. No account managers, no junior handoffs—just production systems that generate pipeline.
      </p>
    </div>

    <!-- ─── TEAM PROFILES (2-Column Bento) ─── -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-20">
      {#each team as member}
        <div class="rounded-[2.5rem] {member.cardBg} border {member.cardBorder} p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-2xl transition-all duration-300">
          <div>
            <!-- Top Header: Role badge & active status -->
            <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span class="inline-flex items-center px-3.5 py-1 rounded-full {member.badgeBg} text-white text-[11px] font-bold tracking-wider uppercase font-mono shadow-xs">
                {member.badge}
              </span>
              <div class="inline-flex items-center gap-1.5 text-xs font-medium {member.subTextColor} bg-white/80 border border-black/5 px-3 py-1 rounded-full">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{member.status}</span>
              </div>
            </div>

            <!-- Avatar + Name + Title -->
            <div class="flex items-center gap-5 mb-6">
              <!-- Stylized Avatar with status ring -->
              <div class="relative shrink-0">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br {member.avatarGradient} text-white font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-lg border-2 border-white">
                  {member.avatarInitial}
                </div>
                <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5">
                  {#if member.name === 'Hafid'}
                    <!-- Code/Terminal icon -->
                    <svg class="w-3.5 h-3.5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  {:else}
                    <!-- Handshake / Conversation icon -->
                    <svg class="w-3.5 h-3.5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  {/if}
                </div>
              </div>

              <div>
                <h3 class="text-2xl sm:text-3xl font-bold {member.textColor} tracking-tight leading-tight">
                  {member.name}
                </h3>
                <p class="text-xs sm:text-sm font-semibold {member.subTextColor} mt-0.5">
                  {member.role}
                </p>
              </div>
            </div>

            <!-- Bio -->
            <p class="{member.subTextColor} text-sm sm:text-base font-light leading-relaxed mb-6">
              {member.bio}
            </p>

            <!-- Focus Pills -->
            <div class="flex flex-wrap gap-2 mb-8">
              {#each member.focusPills as pill}
                <span class="inline-flex items-center px-3 py-1 rounded-lg bg-white/70 border border-black/5 text-xs font-medium {member.textColor}">
                  {pill}
                </span>
              {/each}
            </div>
          </div>

          <!-- Bottom Quote / Principle Banner -->
          <div class="pt-5 border-t border-black/5 bg-white/50 -mx-8 -mb-8 sm:-mx-10 sm:-mb-10 lg:-mx-12 lg:-mb-12 p-6 sm:p-8 rounded-b-[2.5rem]">
            <p class="text-xs sm:text-sm italic {member.subTextColor} leading-snug">
              &ldquo;{member.quote}&rdquo;
            </p>
          </div>
        </div>
      {/each}
    </div>

    <!-- ─── VALUES BENTO SECTION HEADER ─── -->
    <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-zinc-400 mb-3">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        Our Core Values
      </div>
      <h3 class="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
        How we engineer systems.<br />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-400">What we believe in.</span>
      </h3>
    </div>

    <!-- ─── BENTO GRID OF VALUES (Clay Pastel Style) ─── -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

      <!-- ════════════════════════════════════════════════════════════════════ -->
      <!-- VALUE 1 (7 cols): Speed with AI without sacrificing craft           -->
      <!-- ════════════════════════════════════════════════════════════════════ -->
      <div class="lg:col-span-7 rounded-[2.5rem] bg-[#FAF1E8] border border-[#ECDCCF] p-7 sm:p-10 flex flex-col justify-between shadow-xl">
        <div>
          <div class="flex items-center justify-between gap-4 mb-5">
            <span class="inline-flex items-center px-3.5 py-1 rounded-full bg-[#963816] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-xs">
              SPEED & PRECISION
            </span>
            <span class="text-xs font-semibold text-[#963816] bg-white/80 px-3 py-1 rounded-full border border-amber-200">
              2–4 Week Delivery
            </span>
          </div>

          <h4 class="text-2xl sm:text-3xl font-bold text-[#23150D] tracking-tight leading-snug mb-3">
            Fast turnarounds using AI. Zero compromise on what matters.
          </h4>
          <p class="text-sm sm:text-base text-[#5C483D] font-light leading-relaxed mb-6">
            We use modern AI to automate research, boilerplate, and schema modeling at breakneck speed. But we never cut corners on what makes software last: clean data contracts, resilient rate-limiting, error handling, and robust infrastructure.
          </p>
        </div>

        <!-- Visual Comparison Box -->
        <div class="rounded-2xl bg-white p-5 shadow-xs border border-amber-200/80">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="p-3.5 rounded-xl bg-[#FAF1E8]/50 border border-amber-200/60">
              <div class="font-bold text-zinc-900 mb-1 flex items-center gap-1.5 text-[#963816]">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Traditional Dev / Agency
              </div>
              <p class="text-zinc-500 font-light leading-relaxed">
                3–6 month timelines, $180k+ annual salary, bloated meetings, and brittle scripts that break silently.
              </p>
            </div>
            <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80">
              <div class="font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Flowjoy AI Sprint
              </div>
              <p class="text-emerald-900 font-light leading-relaxed">
                Live production workflows in 14–28 days. Built with tests, monitored webhooks, and full code handoff.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ════════════════════════════════════════════════════════════════════ -->
      <!-- VALUE 2 (5 cols): Right tools for the job / Cost optimization        -->
      <!-- ════════════════════════════════════════════════════════════════════ -->
      <div class="lg:col-span-5 rounded-[2.5rem] bg-[#EDF5F0] border border-[#D6E7DC] p-7 sm:p-10 flex flex-col justify-between shadow-xl">
        <div>
          <div class="flex items-center justify-between gap-4 mb-5">
            <span class="inline-flex items-center px-3.5 py-1 rounded-full bg-[#18533C] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-xs">
              COST OPTIMIZATION
            </span>
            <span class="text-xs font-semibold text-[#18533C] bg-white/80 px-3 py-1 rounded-full border border-emerald-200">
              Up to 90% Less SaaS Waste
            </span>
          </div>

          <h4 class="text-2xl sm:text-3xl font-bold text-[#0E241B] tracking-tight leading-snug mb-3">
            The right tools for the job. Done as cheaply as possible.
          </h4>
          <p class="text-sm text-[#3E5A4E] font-light leading-relaxed mb-6">
            We don't force you into bloated $5,000/mo enterprise SaaS contracts when lean serverless workers and direct APIs do the exact same job for pennies. We architect for your bottom line.
          </p>
        </div>

        <!-- Visual Cost Pill -->
        <div class="rounded-2xl bg-white p-5 shadow-xs border border-emerald-200/80">
          <div class="flex items-center justify-between text-xs mb-3 pb-2 border-b border-zinc-100">
            <span class="text-zinc-500">Typical GTM Tool Bloat</span>
            <span class="text-rose-600 font-semibold line-through">$2,800/mo</span>
          </div>
          <div class="flex items-center justify-between text-xs font-bold">
            <span class="text-emerald-900 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Flowjoy Lean Architecture
            </span>
            <span class="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              ~$65/mo in API usage
            </span>
          </div>
        </div>
      </div>

      <!-- ════════════════════════════════════════════════════════════════════ -->
      <!-- VALUE 3 (5 cols): Brand reputation, anti-spam & compliance           -->
      <!-- ════════════════════════════════════════════════════════════════════ -->
      <div class="lg:col-span-5 rounded-[2.5rem] bg-[#EDF3F9] border border-[#D7E3EE] p-7 sm:p-10 flex flex-col justify-between shadow-xl">
        <div>
          <div class="flex items-center justify-between gap-4 mb-5">
            <span class="inline-flex items-center px-3.5 py-1 rounded-full bg-[#1A456F] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-xs">
              BRAND SAFETY
            </span>
            <span class="text-xs font-semibold text-[#1A456F] bg-white/80 px-3 py-1 rounded-full border border-blue-200">
              100% Deliverability
            </span>
          </div>

          <h4 class="text-2xl sm:text-3xl font-bold text-[#0C1E30] tracking-tight leading-snug mb-3">
            Brand reputation is sacred. Strict anti-spam & compliance.
          </h4>
          <p class="text-sm text-[#3B526B] font-light leading-relaxed mb-6">
            Spamming thousands of unqualified inboxes burns your domain and ruins your company's name. We put bulletproof safeguards in place: multi-inbox rotations, warmups, and verified compliance filters.
          </p>
        </div>

        <!-- Compliance Checklist Pill -->
        <div class="rounded-2xl bg-white p-5 shadow-xs border border-blue-200/80 space-y-2.5">
          <div class="flex items-center justify-between text-xs text-zinc-700">
            <span class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              SPF, DKIM & DMARC strict alignment
            </span>
            <span class="text-emerald-700 font-bold">Passed</span>
          </div>
          <div class="flex items-center justify-between text-xs text-zinc-700">
            <span class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Domain health & inbox pool rotation
            </span>
            <span class="text-emerald-700 font-bold">Active</span>
          </div>
          <div class="flex items-center justify-between text-xs text-zinc-700">
            <span class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              CAN-SPAM & TCPA carrier compliance
            </span>
            <span class="text-emerald-700 font-bold">Zero Flags</span>
          </div>
        </div>
      </div>

      <!-- ════════════════════════════════════════════════════════════════════ -->
      <!-- VALUE 4 (7 cols): AI for grunt work: sentiment, scoring, DNC lists  -->
      <!-- ════════════════════════════════════════════════════════════════════ -->
      <div class="lg:col-span-7 rounded-[2.5rem] bg-[#FAF5FE] border border-[#E9DDF8] p-7 sm:p-10 flex flex-col justify-between shadow-xl">
        <div>
          <div class="flex items-center justify-between gap-4 mb-5">
            <span class="inline-flex items-center px-3.5 py-1 rounded-full bg-[#6D28D9] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-xs">
              AI FOR GRUNT WORK
            </span>
            <span class="text-xs font-semibold text-[#6D28D9] bg-white/80 px-3 py-1 rounded-full border border-violet-200">
              Sentiment & DNC Guard
            </span>
          </div>

          <h4 class="text-2xl sm:text-3xl font-bold text-[#23150D] tracking-tight leading-snug mb-3">
            AI handles the heavy lifting. Filtering, scoring, and instant DNC protection.
          </h4>
          <p class="text-sm sm:text-base text-[#5C483D] font-light leading-relaxed mb-6">
            We put AI where it belongs: sorting through messy data, scoring ICP match, evaluating reply sentiment, and protecting your pipeline. If a prospect replies with hesitation or asks to unsubscribe, AI instantly classifies the intent and syncs them to your Do-Not-Contact list in milliseconds.
          </p>
        </div>

        <!-- Visual Sentiment & DNC Simulation -->
        <div class="rounded-2xl bg-white p-5 shadow-xs border border-violet-200/80">
          <div class="flex items-center justify-between gap-2 text-xs mb-3 pb-2 border-b border-zinc-100">
            <span class="font-semibold text-zinc-800">Live Reply Sentiment Classifier</span>
            <span class="font-mono text-[11px] text-zinc-400">&lt;350ms latency</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs">
            <div class="sm:col-span-7 p-3 rounded-xl bg-zinc-50 border border-zinc-200 font-mono text-[11px] text-zinc-700">
              &ldquo;Please remove our team from your mailing list.&rdquo;
            </div>
            <div class="sm:col-span-5 flex flex-col gap-1.5">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-medium text-[11px]">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                Sentiment: Opt-Out (99.4%)
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium text-[11px]">
                <svg class="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                Added to Global DNC
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ════════════════════════════════════════════════════════════════════ -->
      <!-- VALUE 5 (12 cols Wide Banner): Human-to-Human Marketing              -->
      <!-- ════════════════════════════════════════════════════════════════════ -->
      <div class="lg:col-span-12 rounded-[2.5rem] bg-[#FFF9F2] border border-[#FDE6D2] p-8 sm:p-12 shadow-xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div class="lg:col-span-7">
            <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-[#B45309] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-xs mb-4">
              HUMAN-TO-HUMAN MARKETING
            </div>
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

          <div class="lg:col-span-5">
            <div class="rounded-2xl bg-white p-6 shadow-md border border-amber-200/80 space-y-4">
              <div class="flex items-start gap-3 text-xs">
                <div class="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold">
                  &times;
                </div>
                <div>
                  <div class="font-bold text-zinc-900">What we never do</div>
                  <p class="text-zinc-500 font-light mt-0.5">
                    No hallucinating chatbots faking human empathy or sending generic AI flattery.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3 text-xs pt-3 border-t border-zinc-100">
                <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                  &#10003;
                </div>
                <div>
                  <div class="font-bold text-zinc-900">What we always build</div>
                  <p class="text-zinc-500 font-light mt-0.5">
                    Precise signals + verified intelligence delivered to your team so humans can have high-value, authentic conversations.
                  </p>
                </div>
              </div>

              <div class="pt-3">
                <button
                  type="button"
                  on:click={() => scrollToSection('gtm-teardown')}
                  class="w-full bg-[#B45309] hover:bg-[#92400E] text-white font-semibold py-3 px-5 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <span>Discuss Your System Architecture With Us</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</section>
