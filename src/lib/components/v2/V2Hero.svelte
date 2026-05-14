<script lang="ts">
  import { onMount } from 'svelte';
  import { blur, fly } from 'svelte/transition';

  let mounted = false;
  onMount(() => {
    setTimeout(() => (mounted = true), 50);
  });

  const painPoints = [
    'Missed calls going to voicemail',
    'Hours lost on manual follow-ups',
    'Leads slipping through the cracks',
    'Staff doing work a machine should do'
  ];

  let activePain = 0;
  onMount(() => {
    const interval = setInterval(() => {
      activePain = (activePain + 1) % painPoints.length;
    }, 2800);
    return () => clearInterval(interval);
  });
</script>

<section
  class="hero-wrap font-[Poppins] relative overflow-hidden min-h-[100vh] flex flex-col justify-center bg-[#09090B]"
>
  <!-- Grid pattern -->
  <div
    class="absolute inset-0 pointer-events-none opacity-[0.06] z-[1]"
    style="background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 60px 60px;"
  ></div>

  <!-- Glow orbs -->
  <div class="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none z-[1]"></div>
  <div class="absolute bottom-[-20%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none z-[1]"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 md:py-28">
    {#if mounted}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        <!-- Left: Copy -->
        <div class="flex flex-col">
          <!-- Badge -->
          <div
            in:fly={{ y: -10, duration: 500, delay: 0 }}
            class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-xs font-semibold text-zinc-400 mb-8 tracking-wide w-fit"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            Accepting new clients · Start this week
          </div>

          <!-- Pain-first headline -->
          <h1
            class="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] font-bold text-white leading-[1.06] tracking-tight mb-6"
          >
            <span in:blur={{ duration: 700, delay: 80, amount: 8 }}>Stop losing leads</span><br />
            <span in:blur={{ duration: 700, delay: 200, amount: 8 }}>to </span>
            <span
              in:blur={{ duration: 800, delay: 350, amount: 8 }}
              class="font-['Instrument_Serif'] italic text-zinc-500 font-normal"
            >
              slow ops.
            </span>
          </h1>

          <!-- Sub -->
          <p
            in:blur={{ duration: 600, delay: 250, amount: 5 }}
            class="text-lg md:text-xl text-zinc-400 leading-relaxed font-light max-w-xl mb-10"
          >
            We build <strong class="font-medium text-white">custom AI systems</strong> that handle your calls, bookings, follow-ups, and busywork — so your team focuses on closing, not chasing.
          </p>

          <!-- CTA Row -->
          <div
            in:fly={{ y: 16, duration: 600, delay: 400 }}
            class="flex flex-col sm:flex-row items-center gap-4 mb-12"
          >
            <button
              data-cal-link="hafid-ahlaqach-nigixz/15min"
              data-cal-namespace="15min"
              data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
              id="v2-hero-cta-call"
              class="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-zinc-900 px-8 py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 shadow-[0_0_60px_rgba(255,255,255,0.06)] hover:shadow-[0_0_80px_rgba(255,255,255,0.12)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Book a free discovery call
            </button>

            <a
              href="#try-live"
              id="v2-hero-cta-try"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-[15px] transition-all duration-300 backdrop-blur-sm"
            >
              Try our AI live
              <svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <!-- Social proof micro -->
          <div
            in:fly={{ y: 10, duration: 500, delay: 550 }}
            class="flex flex-wrap items-center gap-5 text-xs text-zinc-500"
          >
            {#each ['MVP in 4 weeks', 'You own the code', 'Cancel anytime', 'Money-back guarantee'] as item}
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {item}
              </span>
            {/each}
          </div>
        </div>

        <!-- Right: Rotating pain card -->
        <div
          in:fly={{ y: 30, duration: 800, delay: 300 }}
          class="w-full relative"
        >
          <div class="relative bg-[#111215] rounded-[2.5rem] p-8 lg:p-10 border border-white/[0.06] shadow-2xl overflow-hidden">
            <!-- Glow -->
            <div class="absolute -top-20 -right-20 w-80 h-80 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-500/10 rounded-full blur-[70px] pointer-events-none"></div>

            <!-- Noise -->
            <div class="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"></div>

            <div class="relative z-10">
              <!-- Header -->
              <div class="flex items-center gap-3 mb-8">
                <div class="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
                <span class="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">What's costing you right now</span>
              </div>

              <!-- Animated pain points -->
              <div class="space-y-3 mb-8">
                {#each painPoints as pain, i}
                  <div
                    class="flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-500 {activePain === i ? 'bg-rose-500/10 border-rose-500/20 scale-[1.02]' : 'bg-white/[0.02] border-white/[0.04] opacity-50'}"
                  >
                    <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 {activePain === i ? 'bg-rose-500/20' : 'bg-white/5'}">
                      <svg class="w-4 h-4 {activePain === i ? 'text-rose-400' : 'text-zinc-600'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <span class="text-sm font-medium {activePain === i ? 'text-white' : 'text-zinc-500'}">{pain}</span>
                  </div>
                {/each}
              </div>

              <!-- Arrow + solution tease -->
              <div class="border-t border-white/[0.06] pt-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-white font-semibold text-sm">We fix all of this.</p>
                    <p class="text-zinc-500 text-xs">Custom AI system. 4 weeks. You own it.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .hero-wrap {
    background: #09090B;
  }
</style>
