<script lang="ts">
  import { onMount } from 'svelte';
  import { getFeaturedCaseStudies } from '$lib/data/caseStudies';

  let sectionRef: HTMLElement;
  let visible = false;

  const studies = getFeaturedCaseStudies();

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

  const accentMap: Record<string, { blob: string; badge: string; tag: string }> = {
    blue:   { blob: 'bg-blue-500/20',   badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20',   tag: 'text-blue-400' },
    violet: { blob: 'bg-violet-500/20', badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20', tag: 'text-violet-400' },
    orange: { blob: 'bg-orange-500/20', badge: 'bg-orange-500/10 text-orange-300 border-orange-500/20', tag: 'text-orange-400' },
    green:  { blob: 'bg-emerald-500/20',badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', tag: 'text-emerald-400' },
  };

  function accent(color: string) {
    return accentMap[color] ?? accentMap['violet'];
  }
</script>

<section
  id="case-studies"
  bind:this={sectionRef}
  class="pt-8 pb-24 bg-[#09090B] font-[Poppins] relative overflow-hidden"
>
  <!-- Subtle grid -->
  <div
    class="absolute inset-0 pointer-events-none opacity-[0.04]"
    style="background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 60px 60px;"
  ></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

    <!-- Section header -->
    <div
      class="mb-16"
      style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 28}px); transition: opacity 0.7s ease, transform 0.7s ease;"
    >
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-zinc-400 mb-6">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Case Studies
      </div>
      <h2 class="text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
        Real work.<br />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">Real results.</span>
      </h2>
      <p class="text-zinc-500 text-lg max-w-2xl leading-relaxed">
        We don't just pitch ideas — we ship them. Here's what we've built and the outcomes our clients got.
      </p>
    </div>

    <!-- Case study cards grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each studies as study, idx}
        {@const ac = accent(study.accentColor)}
        <a
          href="/case-studies/{study.slug}"
          class="group relative bg-[#111215] rounded-[2rem] overflow-hidden border border-white/[0.06] hover:border-white/[0.12] shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl block"
          style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 32}px); transition: opacity 0.6s ease {idx * 110}ms, transform 0.6s ease {idx * 110}ms, box-shadow 0.3s ease, border-color 0.3s ease;"
        >
          <!-- Glow blob -->
          <div class="absolute -top-16 -right-16 w-48 h-48 {ac.blob} rounded-full blur-[60px] pointer-events-none transition-transform duration-700 group-hover:scale-[1.6]"></div>

          <!-- Noise texture -->
          <div class="absolute inset-0 opacity-[0.10] mix-blend-overlay pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"></div>

          <!-- Cover image -->
          {#if study.coverImage}
            <div class="w-full aspect-[16/9] overflow-hidden relative">
              <img
                src={study.coverImage}
                alt="{study.title} case study cover"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <!-- Vignette -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#111215] via-transparent to-transparent opacity-70"></div>
            </div>
          {:else}
            <div class="w-full aspect-[16/9] bg-gradient-to-br from-white/[0.04] to-transparent border-b border-white/[0.06]"></div>
          {/if}

          <!-- Card body -->
          <div class="relative z-10 p-7">
            <!-- Industry badge + index -->
            <div class="flex items-center justify-between mb-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border {ac.badge}">
                {study.industry}
              </span>
              <span class="text-[11px] font-bold text-zinc-600 tracking-widest uppercase">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            <!-- Title & short description -->
            <h3 class="text-xl font-bold text-white tracking-tight mb-2 leading-snug group-hover:text-zinc-100 transition-colors">
              {study.title}
            </h3>
            <p class="text-zinc-500 text-sm leading-relaxed font-light mb-6 line-clamp-2">
              {study.shortDescription}
            </p>

            <!-- Metrics strip -->
            {#if study.metrics.length > 0}
              {@const highlighted = study.metrics.find(m => m.highlight)}
              {@const others = study.metrics.filter(m => !m.highlight).slice(0, 2)}
              <div class="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-white/[0.06]">

                <!-- Highlighted metric: gradient-border pill -->
                {#if highlighted}
                  <div
                    class="rounded-xl p-[1px] flex-shrink-0"
                    style="background: conic-gradient(from 180deg at 50% 50%, {study.accentColor === 'blue' ? '#3b82f6, #6366f1, #8b5cf6, #3b82f6' : study.accentColor === 'violet' ? '#8b5cf6, #a855f7, #d946ef, #8b5cf6' : study.accentColor === 'orange' ? '#f97316, #f59e0b, #eab308, #f97316' : '#10b981, #34d399, #6ee7b7, #10b981'});"
                  >
                    <div class="bg-[#111215] rounded-[11px] px-4 py-2.5 flex flex-col">
                      <span class="text-xl font-bold text-white leading-none tracking-tight">{highlighted.value}</span>
                      <span class="text-[10px] font-semibold uppercase tracking-wider mt-1 {study.accentColor === 'blue' ? 'text-blue-400' : study.accentColor === 'violet' ? 'text-violet-400' : study.accentColor === 'orange' ? 'text-orange-400' : 'text-emerald-400'}">{highlighted.label}</span>
                    </div>
                  </div>
                {/if}

                <!-- Regular metrics -->
                {#each others as metric}
                  <div class="flex-shrink-0">
                    <div class="text-base font-bold text-white leading-none">{metric.value}</div>
                    <div class="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mt-0.5">{metric.label}</div>
                  </div>
                {/each}
              </div>
            {/if}

            <!-- Services tags -->
            <div class="flex flex-wrap gap-2 mb-5">
              {#each study.services.slice(0, 3) as service}
                <span class="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-medium text-zinc-500">
                  {service}
                </span>
              {/each}
            </div>

            <!-- Read more CTA -->
            <div class="flex items-center gap-2 {ac.tag} font-bold text-sm group-hover:gap-3 transition-all duration-300">
              Read case study
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <!-- Bottom line -->
    <div
      class="mt-12 text-center"
      style="opacity: {visible ? 1 : 0}; transition: opacity 0.7s ease 700ms;"
    >
      <p class="text-zinc-600 text-sm">
        Every project ships with full code ownership. <strong class="text-zinc-400 font-medium">No lock-in. No surprises.</strong>
      </p>
    </div>

  </div>
</section>
