<script lang="ts">
  const steps = [
    {
      num: '01',
      title: 'Find the bottleneck',
      timeframe: 'Days 1–3',
      description: 'We inspect your current GTM workflow and isolate the highest-leverage system.',
      deliverable: 'Architecture blueprint'
    },
    {
      num: '02',
      title: 'Engineer the system',
      timeframe: 'Weeks 1–2',
      description: 'We build production-grade pipelines around your existing tools (Clay, Apollo, CRM, Slack).',
      deliverable: 'Staging integrations & webhooks'
    },
    {
      num: '03',
      title: 'Ship & hand off',
      timeframe: 'Weeks 3–4',
      description: 'You get live systems + full code ownership in 2–4 weeks.',
      deliverable: 'Live pipeline + full GitHub handoff'
    }
  ];
</script>

<section id="how-it-works" class="py-24 bg-[#09090A] font-[Poppins] text-white border-t border-[#2C2420] relative">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-zinc-400 mb-6">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        How It Works
      </div>
      <h2 class="text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
        From bottleneck to production<br class="hidden md:block" />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">in 2–4 weeks.</span>
      </h2>
      <p class="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed font-light">
        Fixed sprints. Dedicated engineering. Zero product team distraction.
      </p>
    </div>

    <!-- 3 Step Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each steps as step}
        <div class="flex flex-col justify-between p-8 rounded-3xl bg-[#1C1714] border border-[#2C2420] hover:border-[#5C4435] transition duration-300">
          <div>
            <div class="flex items-center justify-between mb-6">
              <span class="font-['Instrument_Serif'] italic text-4xl text-amber-400">{step.num}</span>
              <span class="text-[11px] font-mono text-zinc-400 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                {step.timeframe}
              </span>
            </div>

            <h3 class="text-xl font-bold text-white mb-3">
              {step.title}
            </h3>
            <p class="text-sm text-zinc-400 leading-relaxed font-light mb-8">
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
