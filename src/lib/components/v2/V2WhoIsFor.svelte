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

  const checks = [
    'You\'re missing calls while on the job or after hours',
    'You spend 2+ hours/day on follow-ups that should be automatic',
    'You\'ve tried Zapier or GoHighLevel but it broke or didn\'t fit',
    'You want custom tools but can\'t justify a $120k/yr dev hire',
    'You need a system that works for YOUR workflow, not a generic template',
    'You want to own the code — not rent features forever'
  ];
</script>

<section bind:this={sectionRef} class="py-24 bg-[#09090B] font-[Poppins] relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Left: Text -->
      <div
        style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 32}px); transition: opacity 0.7s ease, transform 0.7s ease;"
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-zinc-400 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
          Is this you?
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
          This is for you
          <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">if...</span>
        </h2>
        <p class="text-zinc-500 text-lg leading-relaxed mb-10">
          We work best with small businesses and agencies that know what's slowing them down — they just need someone to build the fix.
        </p>

        <div class="space-y-4">
          {#each checks as check, idx}
            <div
              class="flex items-start gap-4 px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] transition-all duration-300 hover:bg-white/[0.05] hover:border-white/10"
              style="opacity: {visible ? 1 : 0}; transform: translateX({visible ? 0 : -20}px); transition: opacity 0.5s ease {idx * 80}ms, transform 0.5s ease {idx * 80}ms;"
            >
              <div class="w-6 h-6 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-[14px] text-zinc-300 font-light leading-snug">{check}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Right: CTA Card -->
      <div
        class="relative"
        style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 40}px); transition: opacity 0.7s ease 300ms, transform 0.7s ease 300ms;"
      >
        <div class="relative bg-[#111215] rounded-[2.5rem] p-8 lg:p-12 border border-white/[0.06] shadow-2xl overflow-hidden">
          <!-- Glow -->
          <div class="absolute -top-20 -right-20 w-80 h-80 bg-violet-500/15 rounded-full blur-[80px] pointer-events-none"></div>
          <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-[70px] pointer-events-none"></div>

          <!-- Noise -->
          <div class="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"></div>

          <div class="relative z-10">
            <!-- Testimonial -->
            <svg class="w-8 h-8 text-white/10 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <blockquote class="text-white text-lg md:text-xl font-medium leading-relaxed mb-8">
              "We were missing calls left and right while on the job. They built us an AI front desk that picks up every call, books the meeting, and sends a confirmation — we haven't missed a lead since."
            </blockquote>

            <div class="flex items-center gap-4 mb-8 pb-8 border-b border-white/[0.06]">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 border border-white/10 flex items-center justify-center">
                <span class="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <div class="text-white font-medium">MHR</div>
                <div class="text-zinc-500 text-sm">Service Business · AI Front Desk Client</div>
              </div>
            </div>

            <button
              data-cal-link="hafid-ahlaqach-nigixz/15min"
              data-cal-namespace="15min"
              data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
              class="w-full py-4 rounded-2xl font-bold text-sm bg-white text-zinc-900 hover:bg-zinc-100 transition-all duration-200 shadow-[0_0_60px_rgba(255,255,255,0.06)] hover:shadow-[0_0_80px_rgba(255,255,255,0.12)] hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              That sounds like me — let's talk
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <p class="text-center text-white/30 text-xs mt-3">15-min call · No pitch · We'll scope the project together</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
