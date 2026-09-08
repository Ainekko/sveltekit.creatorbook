<script lang="ts">
  const projects = [
    {
      id: 'elio',
      name: 'Elio',
      category: 'Reddit lead-intelligence agent',
      badge: 'Live Production System',
      outcome: '<60s Buying Signal Detection',
      description: 'Continuously monitors 45+ high-intent subreddits for buying signals, filters conversational noise, enriches author company profiles, and delivers scored leads with drafted outreach into Slack.',
      image: '/flowjoy/elio_cover.jpg',
      logos: [
        { name: 'Reddit', src: '/flowjoy/reddit.svg' },
        { name: 'OpenAI', src: '/flowjoy/chatgpt.svg' },
        { name: 'Slack', src: '/flowjoy/slack.svg' },
        { name: 'Make', src: '/flowjoy/make.svg' }
      ],
      metrics: [
        { label: 'Signal response', val: '<60 seconds' },
        { label: 'False positive rate', val: '<3%' },
        { label: 'Outreach drafts', val: '100% automated' }
      ]
    },
    {
      id: 'nai',
      name: 'Nai',
      category: 'Automated SEO research → CMS pipeline',
      badge: 'Live Production System',
      outcome: '10x Faster Content Engine',
      description: 'Scans high-intent long-tail keywords, researches search intent, constructs verified long-form articles, and publishes directly to CMS with complete schema markup.',
      image: '/flowjoy/nai_cover.jpg',
      logos: [
        { name: 'Claude', src: 'https://cdn.simpleicons.org/anthropic/D97757' },
        { name: 'Vercel', src: '/flowjoy/Vercel_Logo_0.svg' },
        { name: 'Make', src: '/flowjoy/make.svg' }
      ],
      metrics: [
        { label: 'Production cycle', val: '15 min/post' },
        { label: 'Schema markup', val: 'Automated' },
        { label: 'Editorial workload', val: '-80%' }
      ]
    },
    {
      id: 'broadr',
      name: 'Broadr',
      category: 'High-throughput SMS campaign infrastructure',
      badge: 'Live Production System',
      outcome: '99.4% Deliverability & DNC Compliance',
      description: 'Multi-number SMS delivery with automated DNC (Do Not Call) compliance handling, 10DLC carrier reputation protection, and real-time AI reply classification.',
      image: '/flowjoy/sms_app.jpg',
      logos: [
        { name: 'Twilio', src: '/flowjoy/twilio.svg' },
        { name: 'ClickUp', src: '/flowjoy/clickup.svg' },
        { name: 'Make', src: '/flowjoy/make.svg' }
      ],
      metrics: [
        { label: 'Deliverability rate', val: '99.4%' },
        { label: 'DNC suppression', val: 'Instant real-time' },
        { label: 'Reply sentiment', val: 'Auto-routed' }
      ]
    },
    {
      id: 'laurie',
      name: 'Laurie',
      category: 'Inbound conversational voice infrastructure',
      badge: 'Productized Voice Agent',
      outcome: 'Zero Inbound Calls Dropped 24/7',
      description: 'Production AI voice infrastructure for inbound lead capture and triage. Sub-second latency, handles complex business FAQs, qualifies prospect budget, and schedules calendar meetings.',
      image: '/flowjoy/front_desk_assistant.jpg',
      logos: [
        { name: 'Retell AI', src: '/flowjoy/retell.svg' },
        { name: 'OpenAI', src: '/flowjoy/chatgpt.svg' },
        { name: 'Twilio', src: '/flowjoy/twilio.svg' }
      ],
      metrics: [
        { label: 'Voice latency', val: 'Sub-600ms' },
        { label: 'Availability', val: '24/7/365' },
        { label: 'Direct calendar booking', val: 'Cal.com / Google' }
      ]
    }
  ];
</script>

<section id="what-we-built" class="py-24 bg-[#09090B] font-[Poppins] text-white border-t border-zinc-800/80 relative">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Section Header -->
    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-zinc-400 mb-6">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Proof of execution
      </div>
      <h2 class="text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
        What we've built.<br class="hidden md:block" />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">Real production systems.</span>
      </h2>
      <p class="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed font-light">
        We don't show fake client logos or hypothetical slides. These are live systems we engineered, deployed, and run.
      </p>

      <!-- The Flowjoy Pipeline Narrative Bar -->
      <div class="mt-8 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-6 py-3 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs sm:text-sm text-zinc-400">
        <span class="text-white font-medium">Data</span>
        <span class="font-['Instrument_Serif'] italic text-zinc-500 text-base">&rarr;</span>
        <span class="text-white font-medium">Intelligence</span>
        <span class="font-['Instrument_Serif'] italic text-zinc-500 text-base">&rarr;</span>
        <span class="text-white font-medium">Automation</span>
        <span class="font-['Instrument_Serif'] italic text-zinc-500 text-base">&rarr;</span>
        <span class="text-white font-medium">Outreach</span>
        <span class="font-['Instrument_Serif'] italic text-zinc-500 text-base">&rarr;</span>
        <span class="text-emerald-400 font-medium">Conversion</span>
      </div>
    </div>

    <!-- Systems Grid with Real Screenshots & Logo Stacks -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each projects as project}
        <div class="group relative bg-[#111215] rounded-[2rem] overflow-hidden border border-white/[0.08] hover:border-zinc-700 shadow-xl transition-all duration-300 flex flex-col justify-between">

          <!-- Card Header & Image -->
          <div>
            <!-- Image cover -->
            <div class="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900 border-b border-zinc-800/80">
              <img
                src={project.image}
                alt={project.name}
                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#111215] via-transparent to-transparent opacity-80"></div>

              <!-- Top floating badges -->
              <div class="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span class="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-white/10">
                  {project.badge}
                </span>
              </div>

              <!-- Top floating logo cluster -->
              <div class="absolute top-4 right-4 z-10 flex items-center -space-x-2">
                {#each project.logos as logo}
                  <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-zinc-100 shadow-md flex items-center justify-center p-1.5" title={logo.name}>
                    <img src={logo.src} alt={logo.name} class="w-full h-full object-contain" />
                  </div>
                {/each}
              </div>

              <!-- Bottom of image: Primary Outcome -->
              <div class="absolute bottom-3 left-6 right-6 z-10">
                <span class="text-xs font-mono text-violet-400 uppercase tracking-wider block mb-0.5">Primary Outcome</span>
                <span class="text-lg sm:text-xl font-bold text-white tracking-tight">{project.outcome}</span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 sm:p-8">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-2xl font-bold text-white tracking-tight">
                  {project.name}
                </h3>
              </div>
              <p class="text-xs text-zinc-400 mb-4 font-light">
                {project.category}
              </p>
              <p class="text-sm text-zinc-400 leading-relaxed font-light mb-6">
                {project.description}
              </p>

              <!-- Key metrics pills -->
              <div class="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-800/80">
                {#each project.metrics as m}
                  <div class="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800/60 text-center">
                    <div class="text-xs sm:text-sm font-bold text-white">{m.val}</div>
                    <div class="text-[10px] text-zinc-500 font-light mt-0.5">{m.label}</div>
                  </div>
                {/each}
              </div>
            </div>
          </div>

        </div>
      {/each}
    </div>

    <!-- Bottom custom sprint card -->
    <div class="mt-8 p-8 sm:p-10 rounded-3xl bg-[#141417] border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-6">
        <!-- Logo cluster for custom sprint -->
        <div class="hidden sm:flex items-center -space-x-3 shrink-0">
          <div class="w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center p-2.5">
            <img src="https://cdn.simpleicons.org/hubspot/FF7A59" alt="HubSpot" class="w-full h-full object-contain" />
          </div>
          <div class="w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center p-2.5">
            <img src="/flowjoy/slack.svg" alt="Slack" class="w-full h-full object-contain" />
          </div>
          <div class="w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center p-2.5">
            <img src="https://cdn.simpleicons.org/anthropic/D97757" alt="Claude" class="w-full h-full object-contain" />
          </div>
        </div>
        <div>
          <h4 class="text-xl font-bold text-white tracking-tight">Need a custom GTM system for your pipeline?</h4>
          <p class="text-sm text-zinc-400 font-light mt-1">You already have the tools. We engineer the custom machinery connecting them into high-converting revenue pipelines in 2–4 weeks.</p>
        </div>
      </div>
      <a
        href="#pricing"
        class="shrink-0 bg-white text-zinc-950 font-bold px-6 py-3.5 rounded-xl hover:bg-zinc-100 transition shadow-md text-sm"
      >
        Scope a 2–4 Week Sprint
      </a>
    </div>

  </div>
</section>
