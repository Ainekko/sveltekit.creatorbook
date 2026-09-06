<script lang="ts">
  import { onMount } from 'svelte';

  const buyers = [
    {
      title: 'Founder / CEO',
      stage: 'Seed Stage Primary',
      pain: 'Needs to scale outbound pipeline and test growth channels without pulling core product developers off the roadmap.',
      hook: '"We build the GTM systems your engineering team doesn\'t have time to build."'
    },
    {
      title: 'Head of Growth / GTM',
      stage: 'Series A Primary',
      pain: 'Has aggressive pipeline targets. Reps are bogged down in manual prospecting, CSV cleaning, and messy research.',
      hook: '"We engineer custom intent pipelines and enrichment waterfalls directly into your CRM."'
    },
    {
      title: 'VP of Sales',
      stage: 'Series A',
      pain: 'Wants reps spending 90% of their day talking to qualified prospects, not researching company websites.',
      hook: '"We eliminate 15+ hours/rep/week of manual research and deliver pre-call account dossiers."'
    }
  ];

  const salesSteps = [
    {
      num: '01',
      title: 'Identify Company',
      action: 'Find Seed → Series A B2B startups with a live product, initial traction, and hiring or growing sales.'
    },
    {
      num: '02',
      title: 'Investigate Bottleneck',
      action: 'Find something specific in their GTM (e.g., they manually research agencies or lack signal detection).'
    },
    {
      num: '03',
      title: 'Outbound with Prototype',
      action: 'Send a 90-sec walkthrough: "I noticed your team manually does X. I built a prototype showing how to automate it."'
    },
    {
      num: '04',
      title: 'Discovery & Scope Sprint',
      action: 'Call isn\'t "what can we build?" It\'s: "Here\'s what we found. Is this costing your team time? If yes, scope a sprint."'
    }
  ];

  const comparisonRows = [
    { dimension: 'Buyer', laurie: 'SMB owner (clinics, salons, local)', flowjoy: 'Startup Founder / Head of GTM / VP Sales' },
    { dimension: 'Problem', laurie: 'Missed inbound calls & after-hours leads', flowjoy: 'Broken/manual GTM processes, rep click fatigue' },
    { dimension: 'Product', laurie: 'AI receptionist (voice & booking)', flowjoy: 'Custom GTM engineering (intent, scraping, outbound)' },
    { dimension: 'Sales Motion', laurie: 'Direct response, self-serve or demo', flowjoy: 'High-touch outbound with 90s prototype walkthrough' },
    { dimension: 'Entry Offer', laurie: 'Live demo of receptionist', flowjoy: 'Free GTM teardown & custom prototype' },
    { dimension: 'Pricing', laurie: '$299–$499/mo + setup', flowjoy: '$3,000–$7,500 sprint or $5k–$12k/mo embedded' },
    { dimension: 'Delivery', laurie: 'Productized template onboarding', flowjoy: 'Custom forward-deployed engineering' },
    { dimension: 'Proof', laurie: 'Live Laurie agent demo', flowjoy: 'Production systems (Elio, Nai, Broadr, Laurie)' },
    { dimension: 'Funnel', laurie: 'Demo → Call → Close', flowjoy: 'Research → Prototype → Call → Sprint' }
  ];
</script>

<svelte:head>
  <title>Flowjoy V2 Pitch &amp; Sales Playbook</title>
  <meta name="robots" content="noindex, nofollow" />
  <link
    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Poppins:wght@300;400;500;600;700;800&family=Pacifico&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="min-h-screen bg-[#09090B] font-[Poppins] text-white py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-6xl mx-auto space-y-16">

    <!-- Header & Pitch Card -->
    <div class="p-8 sm:p-12 rounded-[2.5rem] bg-[#141417] border border-zinc-800 shadow-2xl relative overflow-hidden">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div class="flex items-center gap-3">
          <span class="text-2xl font-bold tracking-tight">flow<span class="font-[Pacifico]">j</span>oy</span>
          <span class="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-violet-950/80 border border-violet-800/60 text-violet-300">
            Internal Sales &amp; Team Playbook
          </span>
        </div>
        <a href="/v2" class="text-xs font-mono text-zinc-400 hover:text-white transition flex items-center gap-1">
          View /v2 Landing Page &rarr;
        </a>
      </div>

      <div class="max-w-3xl">
        <span class="text-xs font-mono text-violet-400 uppercase tracking-wider block mb-2">The Positioning</span>
        <h1 class="text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
          A GTM Engineering Studio for Startups.<br />
          <span class="font-['Instrument_Serif'] italic font-normal text-zinc-400">The Forward-Deployed Engineering (FDE) Model.</span>
        </h1>
        <p class="text-zinc-400 text-base sm:text-lg leading-relaxed font-light mb-8">
          A real FDE model is about embedding close to the customer, understanding their actual environment, then shipping production systems rather than merely giving recommendations. We are <strong>not</strong> an "AI agency." We sell engineering capacity applied to GTM.
        </p>

        <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
          <span class="text-[11px] font-mono uppercase tracking-wider text-violet-400 block mb-1">The One-Sentence Pitch:</span>
          <p class="text-xl sm:text-2xl font-bold text-white tracking-tight">
            "We build the GTM systems your engineering team doesn't have time to build."
          </p>
          <p class="text-xs text-zinc-400 mt-2 font-light">
            You tell us where your growth process is breaking. We ship the system that fixes it.
          </p>
        </div>
      </div>
    </div>

    <!-- Core USPs (Why startups buy from us) -->
    <div>
      <div class="mb-8">
        <span class="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Core Value Proposition</span>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          The 4 Flowjoy USPs (Why Founders Say Yes)
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <div class="font-['Instrument_Serif'] italic text-3xl text-violet-400 mb-2">01</div>
          <h3 class="text-base font-bold text-white mb-2">Zero Eng Distraction</h3>
          <p class="text-xs text-zinc-400 leading-relaxed font-light">
            Core devs remain 100% focused on product. We never pull your senior backend engineers to build sales scrapers or CRM webhooks.
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <div class="font-['Instrument_Serif'] italic text-3xl text-violet-400 mb-2">02</div>
          <h3 class="text-base font-bold text-white mb-2">Production Code</h3>
          <p class="text-xs text-zinc-400 leading-relaxed font-light">
            Not fragile Zapier glue. Real databases (Postgres), idempotent job queues, retry handlers, error alerting, and deliverability monitoring.
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <div class="font-['Instrument_Serif'] italic text-3xl text-violet-400 mb-2">03</div>
          <h3 class="text-base font-bold text-white mb-2">Full IP Ownership</h3>
          <p class="text-xs text-zinc-400 leading-relaxed font-light">
            You own the GitHub repo, documentation, and cloud architecture. Deployed into your AWS, GCP, or Vercel. Zero vendor lock-in.
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <div class="font-['Instrument_Serif'] italic text-3xl text-violet-400 mb-2">04</div>
          <h3 class="text-base font-bold text-white mb-2">Fast 2–4 Week Sprints</h3>
          <p class="text-xs text-zinc-400 leading-relaxed font-light">
            No 6-month consulting engagements. We identify one high-leverage bottleneck, build the system, and deploy it live in 2–4 weeks.
          </p>
        </div>
      </div>
    </div>

    <!-- Who We Sell To & Buyer Personas -->
    <div>
      <div class="mb-8">
        <span class="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Target ICP</span>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Who Flowjoy Sells To (Seed &rarr; Series A)
        </h2>
        <p class="text-xs text-zinc-400 font-light mt-1">Must have: Live product, initial traction, engineers focused on product, manual GTM busywork, budget for engineering.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each buyers as b}
          <div class="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-mono text-violet-400 uppercase tracking-wider">{b.stage}</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{b.title}</h3>
              <p class="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                <strong>Pain Point:</strong> {b.pain}
              </p>
            </div>
            <div class="pt-4 border-t border-zinc-800">
              <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Pitch Hook:</span>
              <p class="text-xs text-zinc-200 font-medium italic">{b.hook}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- The 4-Step Sales Motion (How Sales Guys Run Outbound) -->
    <div class="p-8 sm:p-12 rounded-[2.5rem] bg-[#141417] border border-zinc-800">
      <div class="mb-8">
        <span class="text-xs font-mono text-violet-400 uppercase tracking-wider block mb-1">Sales Playbook</span>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          The 4-Step Flowjoy Sales Process
        </h2>
        <p class="text-xs text-zinc-400 font-light mt-1">Don't send: "Hi, we are an AI automation agency..." That is dead. Use this exact motion:</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each salesSteps as step}
          <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span class="font-['Instrument_Serif'] italic text-3xl text-zinc-500 block mb-2">{step.num}</span>
            <h4 class="text-base font-bold text-white mb-2">{step.title}</h4>
            <p class="text-xs text-zinc-400 font-light leading-relaxed">{step.action}</p>
          </div>
        {/each}
      </div>

      <div class="mt-8 p-6 rounded-2xl bg-violet-950/30 border border-violet-800/40">
        <span class="text-xs font-mono text-violet-300 uppercase tracking-wider block mb-1">Example Outbound Copy:</span>
        <p class="text-sm text-zinc-200 font-mono leading-relaxed">
          "Hey [Name], looked at [Company]. I noticed your sales team is manually researching every agency before outbound. I built a quick 90-second prototype showing how we automate that data pipeline directly into HubSpot. Here's the walkthrough: [Loom link]. Is this actually costing your team time?"
        </p>
      </div>
    </div>

    <!-- The Offer & Pricing Structure -->
    <div>
      <div class="mb-8">
        <span class="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Pricing Strategy</span>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          The Two Offers (No $999/mo generic agency tiers)
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-mono text-zinc-400 uppercase tracking-wider">Entry Offer</span>
            <span class="text-xs font-medium text-violet-400 bg-violet-950/60 px-3 py-1 rounded-full">2–4 Weeks</span>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">GTM Engineering Sprint</h3>
          <div class="text-3xl font-bold text-white mb-4">$3,000 – $7,500 <span class="text-sm text-zinc-500 font-light">/ one-time</span></div>
          <p class="text-xs text-zinc-400 font-light leading-relaxed mb-6">
            Pick one high-leverage GTM bottleneck (e.g. automated account intelligence pipeline, lead scraping engine). We deliver: architecture, integrations, production code, deployment, documentation, handoff.
          </p>
          <div class="text-xs text-zinc-300 font-mono">Goal: Prove speed and quality to upsell into embedded retainer.</div>
        </div>

        <div class="p-8 rounded-3xl bg-zinc-900/80 border border-violet-800/60">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-mono text-violet-300 uppercase tracking-wider">Recurring Retainer</span>
            <span class="text-xs font-medium text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full">Monthly</span>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">Embedded GTM Engineering</h3>
          <div class="text-3xl font-bold text-white mb-4">$5,000 – $12,000+ <span class="text-sm text-zinc-500 font-light">/ month</span></div>
          <p class="text-xs text-zinc-400 font-light leading-relaxed mb-6">
            We become their external engineering arm for GTM. One engineering team. One GTM problem at a time. Production shipped every sprint. Dedicated Slack, daily async updates, continuous shipping.
          </p>
          <div class="text-xs text-violet-300 font-mono">Goal: Long-term engineering partnership with Seed/Series A startups.</div>
        </div>
      </div>
    </div>

    <!-- Laurie vs Flowjoy Comparison Matrix -->
    <div class="p-8 sm:p-12 rounded-[2.5rem] bg-[#141417] border border-zinc-800">
      <div class="mb-8">
        <span class="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Company Architecture</span>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          How Laurie &amp; Flowjoy Coexist
        </h2>
        <p class="text-xs text-zinc-400 font-light mt-1">
          Flowjoy builds GTM systems. Laurie is one of those systems, productized for a specific SMB problem.
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-zinc-800 text-xs font-mono uppercase tracking-wider text-zinc-400">
              <th class="py-3 px-4">Dimension</th>
              <th class="py-3 px-4 text-zinc-300">Laurie</th>
              <th class="py-3 px-4 text-violet-400">Flowjoy</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-800/60 font-light text-xs sm:text-sm">
            {#each comparisonRows as row}
              <tr class="hover:bg-zinc-900/40 transition">
                <td class="py-3.5 px-4 font-medium text-zinc-300">{row.dimension}</td>
                <td class="py-3.5 px-4 text-zinc-400">{row.laurie}</td>
                <td class="py-3.5 px-4 text-white font-medium">{row.flowjoy}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

  </div>
</div>
