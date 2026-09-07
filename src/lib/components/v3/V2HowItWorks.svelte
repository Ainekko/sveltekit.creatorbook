<script lang="ts">
  const steps = [
    {
      num: '01',
      title: 'Find the bottleneck',
      timeframe: 'Days 1–3',
      description: 'We inspect your current GTM workflow to see where growth stalls — lead sources, rep click patterns, CRM data leaks, and manual overhead. We isolate the single highest-leverage system.',
      deliverable: 'Architecture blueprint'
    },
    {
      num: '02',
      title: 'Engineer around your stack',
      timeframe: 'Weeks 1–2',
      description: 'We don\'t ask you to migrate or replace your tools. Apollo, Clay, HubSpot, Salesforce, and Slack are building blocks — we engineer the missing custom pipelines and intelligence between them.',
      deliverable: 'Staging integrations'
    },
    {
      num: '03',
      title: 'Ship production code',
      timeframe: 'Weeks 3–4',
      description: 'We test rate limits, webhook delivery, retry queues, and error logging. We ship production systems that process actual revenue events automatically.',
      deliverable: 'Live production pipeline'
    },
    {
      num: '04',
      title: 'Iterate or handoff',
      timeframe: 'Continuous',
      description: 'You own 100% of the code. We provide comprehensive documentation, walkthrough videos, and GitHub handoff. Keep us embedded or run it in-house.',
      deliverable: 'Complete repo handoff'
    }
  ];
</script>

<section id="how-it-works" class="py-24 bg-[#09090A] font-[Poppins] text-white border-t border-[#2C2420] relative">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-zinc-400 mb-6">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        How it works
      </div>
      <h2 class="text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
        Embedded into your stack.<br class="hidden md:block" />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">Shipping in 2–4 weeks.</span>
      </h2>
      <p class="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed font-light">
        We embed close to your team, understand your actual environment, and ship production systems rather than slide decks.
      </p>
    </div>

    <!-- 4 Step Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each steps as step}
        <div class="flex flex-col justify-between p-8 rounded-3xl bg-[#1C1714] border border-[#2C2420] hover:border-[#5C4435] transition duration-300">
          <div>
            <div class="flex items-center justify-between mb-6">
              <span class="font-['Instrument_Serif'] italic text-4xl text-zinc-500">{step.num}</span>
              <span class="text-[11px] font-mono text-zinc-500 bg-zinc-800/60 px-2.5 py-1 rounded-full">
                {step.timeframe}
              </span>
            </div>

            <h3 class="text-lg font-bold text-white mb-2">
              {step.title}
            </h3>
            <p class="text-xs text-zinc-400 leading-relaxed font-light mb-6">
              {step.description}
            </p>
          </div>

          <div class="pt-4 border-t border-[#2C2420]">
            <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-mono block mb-1">Deliverable:</span>
            <span class="text-xs font-medium text-zinc-300 block">{step.deliverable}</span>
          </div>
        </div>
      {/each}
    </div>

  </div>
</section>
