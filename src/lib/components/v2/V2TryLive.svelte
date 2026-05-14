<script lang="ts">
  import { onMount } from 'svelte';

  let sectionRef: HTMLElement;
  let visible = false;

  onMount(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { visible = true; obs.disconnect(); }
      },
      { threshold: 0.06 }
    );
    obs.observe(sectionRef);
    return () => obs.disconnect();
  });

  const demos = [
    {
      label: 'AI Front Desk',
      tagline: 'Never miss a call again',
      desc: 'Call our live AI receptionist right now. It answers, qualifies, books a meeting, and sends an SMS — all in under 60 seconds.',
      cta: 'Try Laurie live →',
      href: 'https://laurie.flowjoy.online',
      icon: '🔊',
      accent: 'from-emerald-500/20 to-emerald-600/5',
      borderAccent: 'border-emerald-500/20 hover:border-emerald-400/30',
      textAccent: 'text-emerald-400',
      metric: { value: '24/7', label: 'Uptime' },
      coverImage: '/flowjoy/front_desk_assistant.jpg'
    },
    {
      label: 'SMS Platform',
      tagline: 'Bulk outreach on autopilot',
      desc: 'Multi-brand SMS management with AI-powered DNC lists. Send thousands of messages, track responses, schedule follow-ups.',
      cta: 'Try Broadr free →',
      href: 'https://broadr.flowjoy.online',
      icon: '💬',
      accent: 'from-violet-500/20 to-violet-600/5',
      borderAccent: 'border-violet-500/20 hover:border-violet-400/30',
      textAccent: 'text-violet-400',
      metric: { value: '2h/day', label: 'Saved' },
      coverImage: '/flowjoy/sms_app.jpg'
    },
    {
      label: 'SEO Content Engine',
      tagline: 'Research → Write → Publish',
      desc: 'AI agent that does keyword research, competitor analysis, writes SEO-optimized posts, and publishes to WordPress. 10 min per article.',
      cta: 'Try Nai free →',
      href: '/signup',
      icon: '✍️',
      accent: 'from-blue-500/20 to-blue-600/5',
      borderAccent: 'border-blue-500/20 hover:border-blue-400/30',
      textAccent: 'text-blue-400',
      metric: { value: '~10 min', label: 'Per article' },
      coverImage: '/flowjoy/nai_cover.jpg'
    },
    {
      label: 'Reddit Lead Scanner',
      tagline: 'Find buyers before competitors',
      desc: 'Monitors Reddit 24/7 for high-intent leads. Scores intent, filters noise, drafts authentic reply suggestions.',
      cta: 'Try Elio free →',
      href: '/signup',
      icon: '🎯',
      accent: 'from-orange-500/20 to-orange-600/5',
      borderAccent: 'border-orange-500/20 hover:border-orange-400/30',
      textAccent: 'text-orange-400',
      metric: { value: '24/7', label: 'Scanning' },
      coverImage: '/flowjoy/elio_cover.jpg'
    }
  ];
</script>

<section id="try-live" bind:this={sectionRef} class="py-24 bg-[#09090B] font-[Poppins] relative overflow-hidden">
  <!-- Subtle grid -->
  <div class="absolute inset-0 pointer-events-none opacity-[0.04]" style="background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 60px 60px;"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <!-- Header -->
    <div
      class="text-center mb-16"
      style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 32}px); transition: opacity 0.7s ease, transform 0.7s ease;"
    >
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-zinc-400 mb-6">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Our work
      </div>
      <h2 class="text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
        Don't take our word<br class="hidden md:block" />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">for it.</span>
      </h2>
      <p class="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
        Real products running in real businesses. <strong class="text-white font-medium">Try them yourself</strong> — right now, for free.
      </p>
    </div>

    <!-- Demo Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      {#each demos as demo, idx}
        <a
          href={demo.href}
          target={demo.href.startsWith('http') ? '_blank' : undefined}
          rel={demo.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          class="group relative bg-[#111215] rounded-[2rem] p-7 border border-white/[0.06] {demo.borderAccent} shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl block"
          style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 30}px); transition: opacity 0.6s ease {idx * 100}ms, transform 0.6s ease {idx * 100}ms;"
        >
          <!-- Gradient blob -->
          <div class="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br {demo.accent} rounded-full blur-[50px] pointer-events-none transition-transform duration-700 group-hover:scale-[1.8]"></div>

          <!-- Noise -->
          <div class="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"></div>

          <div class="relative z-10">
            <!-- Cover image -->
            <div class="w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 border border-white/[0.06]">
              <img
                src={demo.coverImage}
                alt="{demo.label} screenshot"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <!-- Top row: emoji + label + metric -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <span class="text-2xl">{demo.icon}</span>
                <div>
                  <h3 class="text-[15px] font-bold text-white tracking-tight">{demo.label}</h3>
                  <p class="text-xs {demo.textAccent} font-medium">{demo.tagline}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-white leading-none">{demo.metric.value}</div>
                <div class="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">{demo.metric.label}</div>
              </div>
            </div>

            <!-- Description -->
            <p class="text-zinc-400 text-[13px] leading-relaxed font-light mb-5">{demo.desc}</p>

            <!-- CTA -->
            <div class="flex items-center gap-2 {demo.textAccent} font-bold text-sm group-hover:gap-3 transition-all duration-300">
              {demo.cta}
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <!-- Bottom hook -->
    <div
      class="mt-12 text-center"
      style="opacity: {visible ? 1 : 0}; transition: opacity 0.7s ease 600ms;"
    >
      <p class="text-zinc-500 text-sm">
        All built by Flowjoy. <strong class="text-white font-medium">We'll build one for you too.</strong>
      </p>
    </div>
  </div>
</section>
