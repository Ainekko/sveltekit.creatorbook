<script lang="ts">
  let activeTab = 'intelligence';

  const capabilities = [
    {
      id: 'intelligence',
      title: 'GTM Intelligence',
      badge: 'Intent & Signals',
      headingSans: 'Monitor buying signals',
      headingSerif: 'before competitors know the lead exists.',
      description: 'We build autonomous monitoring engines that crawl social platforms, tech registries, and job boards to deliver high-intent accounts directly to your sales reps.',
      outcomeMetric: 'Sub-60s intent to rep alert',
      outcomeHighlight: 'Detect high-intent buyers in Reddit, X, and job listings automatically.',
      logos: [
        { name: 'Reddit', src: '/flowjoy/reddit.svg' },
        { name: 'Claude', src: 'https://cdn.simpleicons.org/anthropic/D97757' },
        { name: 'OpenAI', src: '/flowjoy/chatgpt.svg' },
        { name: 'Slack', src: 'https://cdn.simpleicons.org/slack/4A154B' },
        { name: 'HubSpot', src: 'https://cdn.simpleicons.org/hubspot/FF7A59' }
      ],
      deliverables: [
        'Monitor Reddit & X for buying intents and competitor complaints',
        'Detect companies entering target market or hiring GTM roles',
        'Automated deep executive dossiers and account research',
        'Messy lead data sanitization, enrichment & classification'
      ]
    },
    {
      id: 'prospecting',
      title: 'Prospecting Infrastructure',
      badge: 'Waterfalls & Ingestion',
      headingSans: 'Multi-source data waterfalls',
      headingSerif: 'orchestrating Apollo, Clay, and custom pipelines.',
      description: 'You already have Apollo, Clay, and databases. We engineer the automated waterfalls, ICP scoring, and continuous ingestion pipelines that turn raw data into qualified closing opportunities.',
      outcomeMetric: '98.5% data accuracy waterfall',
      outcomeHighlight: 'Multi-source enrichment orchestrating your existing data subscriptions.',
      logos: [
        { name: 'HubSpot', src: 'https://cdn.simpleicons.org/hubspot/FF7A59' },
        { name: 'Salesforce', src: 'https://cdn.simpleicons.org/salesforce/00A1E0' },
        { name: 'Postgres', src: 'https://cdn.simpleicons.org/postgresql/4169E1' },
        { name: 'ClickUp', src: '/flowjoy/clickup.svg' }
      ],
      deliverables: [
        'Multi-source enrichment waterfalls tying Apollo, Clay, and custom scrapers together',
        'Algorithmic ICP fit scoring and deep firmographic qualification',
        'Bidirectional CRM synchronization (HubSpot, Salesforce) with conflict resolution',
        'Continuous signal pipelines delivering verified dossiers directly to reps'
      ]
    },
    {
      id: 'outbound',
      title: 'Outbound Systems',
      badge: 'Autonomous Outreach',
      headingSans: 'Personalized outbound engines',
      headingSerif: 'that send emails humans actually read.',
      description: 'Programmatic outbound infrastructure that combines deep contextual research with deliverability engineering so you stay out of spam.',
      outcomeMetric: '99.4% inbox placement',
      outcomeHighlight: 'Context-rich micro-hooks tied to real prospect activity and website visits.',
      logos: [
        { name: 'Make', src: '/flowjoy/make.svg' },
        { name: 'OpenAI', src: '/flowjoy/chatgpt.svg' },
        { name: 'Twilio', src: 'https://cdn.simpleicons.org/twilio/F22F46' },
        { name: 'Slack', src: 'https://cdn.simpleicons.org/slack/4A154B' }
      ],
      deliverables: [
        'Personalized cold outbound engines with contextual research hooks',
        'Multi-domain rotation and deliverability health monitoring',
        'Dynamic sequencing tied to prospect behavior & website visits',
        'AI reply classification (Interested, Objection, OOO, Wrong Person)'
      ]
    },
    {
      id: 'agents',
      title: 'AI Agents (GTM Jobs)',
      badge: 'Task Execution',
      headingSans: 'Not generic chatbots.',
      headingSerif: 'Agents built for specific revenue jobs.',
      description: 'Deploy deterministic agents that execute complex multi-step workflows: pre-call research briefs, inbound qualification calls, and automated RFP parsing.',
      outcomeMetric: '0 inbound leads dropped 24/7',
      outcomeHighlight: 'Sub-second latency voice and meeting preparation agents that convert.',
      logos: [
        { name: 'Retell AI', src: '/flowjoy/retell.svg' },
        { name: 'Claude', src: 'https://cdn.simpleicons.org/anthropic/D97757' },
        { name: 'Twilio', src: 'https://cdn.simpleicons.org/twilio/F22F46' },
        { name: 'Vercel', src: '/flowjoy/Vercel_Logo_0.svg' }
      ],
      deliverables: [
        'Meeting prep agents that build 1-page dossiers before calls',
        'Autonomous inbound qualification and calendar booking agents',
        'Sub-second conversational voice agents for inbound phone leads',
        'Automated RFP and vendor security questionnaire responders'
      ]
    },
    {
      id: 'tooling',
      title: 'Internal GTM Tooling',
      badge: 'Custom Dashboards',
      headingSans: 'Custom sales tooling',
      headingSerif: 'engineered around your existing GTM stack.',
      description: 'When off-the-shelf tools don\'t talk to each other, we build the connective tissue — lightweight command centers, Slack deal rooms, and custom telemetry that keep your reps closing.',
      outcomeMetric: 'Real-time pipeline telemetry',
      outcomeHighlight: 'Custom command centers and Slack deal rooms tailored to your motion.',
      logos: [
        { name: 'Postgres', src: 'https://cdn.simpleicons.org/postgresql/4169E1' },
        { name: 'Slack', src: 'https://cdn.simpleicons.org/slack/4A154B' },
        { name: 'HubSpot', src: 'https://cdn.simpleicons.org/hubspot/FF7A59' },
        { name: 'ClickUp', src: '/flowjoy/clickup.svg' }
      ],
      deliverables: [
        'Custom sales rep command centers & deal tracking dashboards',
        'Real-time Slack / Discord deal rooms with automated bot updates',
        'Conversion anomaly detection and pipeline velocity reporting',
        'Usage-based trigger alerts for expansion sales'
      ]
    }
  ];
</script>

<section id="capabilities" class="py-24 bg-[#09090B] font-[Poppins] text-white border-t border-zinc-800/80 relative">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Section Header -->
    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-zinc-400 mb-6">
        <span class="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
        What Flowjoy actually does
      </div>
      <h2 class="text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
        Engineering outcomes.<br class="hidden md:block" />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">Not AI automation hype.</span>
      </h2>
      <p class="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed font-light">
        We don't sell generic advice or templates. We ship production code across five core revenue infrastructure pillars.
      </p>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
      {#each capabilities as cap}
        <button
          on:click={() => activeTab = cap.id}
          class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 {activeTab === cap.id ? 'bg-white text-zinc-950 shadow-lg scale-105 font-semibold' : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/80'}"
        >
          <span>{cap.title}</span>
        </button>
      {/each}
    </div>

    <!-- Active Tab Display: OUTCOME CARD with Rich Logo Cluster (NO CODE SNIPPETS!) -->
    {#each capabilities as cap}
      {#if activeTab === cap.id}
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 sm:p-12 backdrop-blur-sm animate-in fade-in duration-300">

          <!-- Left Info (7 cols) -->
          <div class="lg:col-span-7 flex flex-col">
            <span class="text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">{cap.badge}</span>
            <h3 class="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
              {cap.headingSans}<br />
              <span class="font-['Instrument_Serif'] italic font-normal text-zinc-400">{cap.headingSerif}</span>
            </h3>
            <p class="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 font-light">
              {cap.description}
            </p>

            <h4 class="text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-4">
              What we build:
            </h4>
            <ul class="space-y-3">
              {#each cap.deliverables as del}
                <li class="flex items-start gap-3 text-sm text-zinc-300 font-light">
                  <div class="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{del}</span>
                </li>
              {/each}
            </ul>
          </div>

          <!-- Right: Visual Outcome Card with Circular Logo Stacks (NO CODE SNIPPETS!) -->
          <div class="lg:col-span-5 w-full">
            <div class="rounded-3xl bg-[#141417] border border-zinc-800 p-8 shadow-2xl flex flex-col justify-between gap-6">

              <div>
                <span class="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Measured Outcome</span>
                <div class="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  {cap.outcomeMetric}
                </div>
                <p class="text-xs text-zinc-400 font-light leading-relaxed">
                  {cap.outcomeHighlight}
                </p>
              </div>

              <!-- Integration Stack Logos (Like the Hero!) -->
              <div class="pt-6 border-t border-zinc-800/80">
                <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-3">Integrates Directly With:</span>
                <div class="flex items-center -space-x-3">
                  {#each cap.logos as logo}
                    <div class="w-12 h-12 rounded-full bg-white border border-zinc-100 shadow-md flex items-center justify-center p-2.5 hover:-translate-y-1 transition" title={logo.name}>
                      <img src={logo.src} alt={logo.name} class="w-full h-full object-contain" />
                    </div>
                  {/each}
                </div>
              </div>

              <div class="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
                <span>Production code</span>
                <span>Shipped in 2–4 weeks</span>
              </div>

            </div>
          </div>

        </div>
      {/if}
    {/each}

  </div>
</section>
