<script lang="ts">
  const outcomes = [
    {
      problem: 'Reps spending 15+ hours/week manually researching accounts & copying data',
      outcome: 'Autonomous enrichment waterfall syncs verified company dossiers directly into CRM',
      metric: '15h+',
      metricLabel: 'saved per rep weekly',
      logos: [
        'https://cdn.simpleicons.org/hubspot/FF7A59',
        'https://cdn.simpleicons.org/salesforce/00A1E0'
      ]
    },
    {
      problem: 'High-intent buying signals on Reddit, X, and job boards go completely unnoticed',
      outcome: 'Autonomous signal scanner alerts reps in Slack with drafted outreach within 60 seconds',
      metric: '<60s',
      metricLabel: 'signal to outreach',
      logos: [
        '/flowjoy/reddit.svg',
        'https://cdn.simpleicons.org/slack/4A154B'
      ]
    },
    {
      problem: 'Core engineering sprint derailed by sales requests for scrapers and webhooks',
      outcome: 'External forward-deployed team ships production pipelines with zero eng distraction',
      metric: '0',
      metricLabel: 'core eng hours lost',
      logos: [
        'https://cdn.simpleicons.org/postgresql/4169E1',
        '/flowjoy/Vercel_Logo_0.svg'
      ]
    },
    {
      problem: 'Inbound calls and form leads sitting uncontacted for hours until they go cold',
      outcome: 'Conversational voice & intake AI engages, qualifies, and books meetings in under 30 seconds',
      metric: '100%',
      metricLabel: 'inbounds engaged',
      logos: [
        '/flowjoy/retell.svg',
        'https://cdn.simpleicons.org/twilio/F22F46'
      ]
    },
    {
      problem: 'Paying thousands for bloated GTM SaaS seats and brittle Zapier zaps that break',
      outcome: 'Custom production code running on your own AWS/Postgres with full IP ownership',
      metric: '100%',
      metricLabel: 'code ownership',
      logos: [
        '/flowjoy/chatgpt.svg',
        '/flowjoy/clickup.svg'
      ]
    },
    {
      problem: 'Cold email domains burning out and hitting spam filters due to bad deliverability',
      outcome: 'Automated domain rotation, warmup telemetry, and AI reply classification',
      metric: '99.4%',
      metricLabel: 'inbox deliverability',
      logos: [
        'https://cdn.simpleicons.org/anthropic/D97757',
        '/flowjoy/make.svg'
      ]
    }
  ];
</script>

<section class="py-24 bg-[#09090B] font-[Poppins] text-white border-t border-zinc-800/80 relative">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

    <!-- Header -->
    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-zinc-400 mb-6">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
        The real cost of broken GTM
      </div>
      <h2 class="text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
        Your bottleneck.<br class="hidden md:block" />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">Our engineered outcome.</span>
      </h2>
      <p class="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed font-light">
        Every hour your sales reps spend on manual data entry is an hour they are not closing deals. Here is what changes.
      </p>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each outcomes as item}
        <div class="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition duration-300 flex flex-col justify-between">
          <div>
            <!-- Top row with metric and logo stack -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <span class="text-3xl font-bold text-white tracking-tight">{item.metric}</span>
                <span class="text-xs text-zinc-500 block font-light">{item.metricLabel}</span>
              </div>
              <div class="flex items-center -space-x-2">
                {#each item.logos as logo}
                  <div class="w-8 h-8 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center p-1.5">
                    <img src={logo} alt="Integration" class="w-full h-full object-contain" />
                  </div>
                {/each}
              </div>
            </div>

            <!-- Problem -->
            <div class="mb-4">
              <span class="text-[11px] font-mono uppercase tracking-wider text-rose-400 block mb-1">Bottleneck</span>
              <p class="text-sm text-zinc-400 font-light leading-relaxed">{item.problem}</p>
            </div>

            <!-- Outcome -->
            <div class="pt-4 border-t border-zinc-800/80">
              <span class="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">Shipped Outcome</span>
              <p class="text-sm text-zinc-200 font-medium leading-relaxed">{item.outcome}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>

  </div>
</section>
