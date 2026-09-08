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

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<div class="py-12 bg-[#09090A] px-4 sm:px-6 lg:px-8 flex justify-center w-full overflow-hidden font-[Poppins]">
  <div 
    bind:this={bannerRef}
    class="max-w-[1200px] w-full bg-[#1C1714] border border-[#2C2420] rounded-[28px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative"
    style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 20}px); transition: opacity 0.8s ease, transform 0.8s ease;"
  >
    <!-- Background Noise Texture -->
    <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none rounded-[28px]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"></div>

    <!-- Left side: Big Outcome Stat -->
    <div class="flex items-center flex-col md:flex-row gap-6 md:gap-8 z-10 text-center md:text-left">
      <div class="text-[5.5rem] md:text-[7.5rem] font-bold text-white leading-[0.8] tracking-tighter">
        20<span class="text-[3rem] md:text-[5rem] align-top text-amber-400">h+</span>
      </div>
      <div class="text-[1.8rem] md:text-[2.2rem] text-white font-['Instrument_Serif'] leading-[1.1] tracking-tight max-w-[420px]">
        saved weekly per sales rep <br />
        <span class="italic text-zinc-400">on manual research &amp; busywork.</span>
      </div>
    </div>

    <!-- Center: Rich Logo Cluster (Like the Hero!) -->
    <div class="flex items-center justify-center -space-x-3 z-10 py-2">
      <!-- HubSpot -->
      <div class="w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center p-2.5 hover:-translate-y-1 transition" title="HubSpot CRM">
        <img src="https://cdn.simpleicons.org/hubspot/FF7A59" alt="HubSpot" class="w-full h-full object-contain" />
      </div>
      <!-- Apollo -->
      <div class="w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center p-2.5 hover:-translate-y-1 transition" title="Apollo">
        <img src="/flowjoy/logos/apollo/apollo-icon.svg" alt="Apollo" class="w-full h-full object-contain" />
      </div>
      <!-- Slack -->
      <div class="w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center p-2.5 hover:-translate-y-1 transition" title="Slack Deal Rooms">
        <svg class="w-full h-full" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.2 80.6c0 7.3-5.9 13.2-13.2 13.2C6.7 93.8.8 87.9.8 80.6c0-7.3 5.9-13.2 13.2-13.2h13.2v13.2zm6.7 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33.2c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80.6z" fill="#E01E5A"/>
          <path d="M47.1 27.2c-7.3 0-13.2-5.9-13.2-13.2C33.9 6.7 39.8.8 47.1.8c7.3 0 13.2 5.9 13.2 13.2v13.2H47.1zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.3.7 54.4.7 47.1c0-7.3 5.9-13.2 13.2-13.2h33.2z" fill="#36C5F0"/>
          <path d="M100.8 47.1c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2h-13.2V47.1zm-6.7 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.9C80.9 6.6 86.8.7 94.1.7c7.3 0 13.2 5.9 13.2 13.2v33.2z" fill="#2EB67D"/>
          <path d="M80.9 100.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2v-13.2h13.2zm0-6.7c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.2c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.9z" fill="#ECB22E"/>
        </svg>
      </div>
      <!-- Reddit -->
      <div class="w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center p-2.5 hover:-translate-y-1 transition" title="Reddit Intent">
        <img src="/flowjoy/reddit.svg" alt="Reddit" class="w-full h-full object-contain" />
      </div>
      <!-- Twilio -->
      <div class="w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center p-2.5 hover:-translate-y-1 transition" title="Twilio">
        <img src="/flowjoy/logos/Twilio/Twilio_idseuPD28S_0.svg" alt="Twilio" class="w-full h-full object-contain" />
      </div>
    </div>

    <!-- Right side: Fast CTA -->
    <div class="flex flex-col items-center lg:items-end gap-3 z-10 shrink-0">
      <button 
        on:click={() => scrollToSection('gtm-teardown')}
        class="bg-white text-zinc-950 font-bold text-base px-8 py-3.5 rounded-xl hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl"
      >
        Get a Free GTM Teardown
      </button>

      <div class="text-zinc-500 text-xs font-medium tracking-wide">
        Shipped in 2–4 weeks &bull; You own the code
      </div>
    </div>
  </div>
</div>
