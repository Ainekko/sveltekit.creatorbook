<script lang="ts">
  import { onMount } from 'svelte';

  let bannerRef: HTMLElement;
  let visible = false;

  onMount(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { visible = true; obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(bannerRef);
    return () => obs.disconnect();
  });
</script>

<div class="py-12 bg-[#09090B] px-4 sm:px-6 lg:px-8 flex justify-center w-full overflow-hidden">
  <div 
    bind:this={bannerRef}
    class="max-w-[1200px] w-full bg-[#1A1A1C] rounded-[24px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative"
    style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 20}px); transition: opacity 0.8s ease, transform 0.8s ease;"
  >
    <!-- Background Noise Texture -->
    <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none rounded-[24px]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"></div>

    <!-- Left side: Big Stat -->
    <div class="flex items-center flex-col md:flex-row gap-4 md:gap-8 z-10 text-center md:text-left">
      <div class="text-[6rem] md:text-[8rem] font-medium text-[#F4E6FF] leading-[0.8] tracking-tighter">
        85<span class="text-[4rem] md:text-[6rem] align-top">%</span>
      </div>
      <div class="text-[2rem] md:text-[2.5rem] text-[#F4E6FF] font-['Instrument_Serif'] leading-[1.1] tracking-tight max-w-[400px]">
        of leads engaged <br />
        <span class="italic text-[#E1C8F4]">without a single delay.</span>
      </div>
    </div>

    <!-- Center decorative icon (Sticker effect) -->
    <div class="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] z-0 pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
      <div class="bg-[#FFFFEE] p-3 rounded-full border-[3px] border-[#1A1A1C] transform -rotate-[10deg] relative">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#1A1A1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="#E1C8F4" />
        </svg>
        <div class="absolute -bottom-6 -right-2 bg-white text-[#1A1A1C] font-bold text-[11px] px-2 py-1 rounded-[6px] border-[2px] border-[#1A1A1C] uppercase tracking-widest transform rotate-[15deg]">
          zoom zoom
        </div>
      </div>
    </div>

    <!-- Right side: CTA -->
    <div class="flex flex-col items-center lg:items-end gap-5 z-10 shrink-0">
      <div class="flex items-center gap-2 text-white font-semibold text-2xl tracking-tight">
        <svg class="w-6 h-6 text-[#F4E6FF]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
        </svg>
        Flowjoy
      </div>
      
      <button 
        data-cal-link="15min"
        class="bg-[#F4E6FF] text-[#1A1A1C] font-semibold text-lg px-8 py-3.5 rounded-[12px] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
      >
        Book a Demo
      </button>

      <div class="text-zinc-400 text-sm font-medium tracking-wide">
        AI infrastructure that actually scales.
      </div>
    </div>
  </div>
</div>
