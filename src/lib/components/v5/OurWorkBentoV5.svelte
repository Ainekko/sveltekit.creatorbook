<script lang="ts">
  import { onMount } from 'svelte';

  let s: HTMLElement;
  let v = false;

  onMount(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { v = true; o.disconnect(); } }, { threshold: 0.05 });
    o.observe(s);
    return () => o.disconnect();
  });

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  const projects = [
    {
      id: 'elio',
      badge: 'BUYER-INTENT SYSTEM',
      badgeBg: 'bg-[#963816]',
      cardBg: 'bg-[#FAF1E8]',
      cardBorder: 'border-[#ECDCCF]',
      textColor: 'text-[#23150D]',
      subTextColor: 'text-[#5C483D]',
      primaryBtnBg: 'bg-[#963816] hover:bg-[#802F12] text-white',
      title: 'A buyer-intent system that turns social discussions into pipeline',
      description:
        'It detects conversations where potential buyers are expressing relevant problems, researches and contextualizes them with AI, and delivers actionable, scored outreach directly to your team.',
      proofLogos: [
        { src: '/flowjoy/reddit.svg', alt: 'Reddit' },
        { src: 'https://cdn.simpleicons.org/anthropic/D97757', alt: 'Claude' },
        { src: '/flowjoy/slack.svg', alt: 'Slack' }
      ],
      proofText:
        'Automated continuous signal detection across 40+ communities, delivering qualified buyer intent directly into Slack in under 60 seconds.',
      primaryBtnText: 'Explore Elio',
      secondaryBtnText: 'Case study',
      image: '/flowjoy/projects/elio-cover.jpg',
      webp: '/flowjoy/projects/elio-cover.webp',
      imageAlt: 'Elio Buyer Intent System'
    },
    {
      id: 'laurie',
      badge: 'INBOUND CONVERSION SYSTEM',
      badgeBg: 'bg-[#18533C]',
      cardBg: 'bg-[#EDF5F0]',
      cardBorder: 'border-[#D6E7DC]',
      textColor: 'text-[#0E241B]',
      subTextColor: 'text-[#3E5A4E]',
      primaryBtnBg: 'bg-[#18533C] hover:bg-[#124230] text-white',
      title: 'An inbound conversion system that qualifies and books 24/7',
      description:
        'Someone calls, AI handles the interaction with sub-600ms latency, qualifies ICP fit against your rules, schedules the meeting directly on your calendar, and updates your business workflow.',
      proofLogos: [
        { src: '/flowjoy/retell.svg', alt: 'Retell AI' },
        { src: '/flowjoy/twilio.svg', alt: 'Twilio' },
        { src: 'https://cdn.simpleicons.org/googlecalendar/4285F4', alt: 'Google Calendar' }
      ],
      proofText:
        'Fielded 1,200+ inbound calls with zero dropped rings, sub-600ms conversational response, and instant CRM calendar sync.',
      primaryBtnText: 'Explore Laurie',
      secondaryBtnText: 'Voice architecture',
      image: '/flowjoy/projects/laurie-voice-assistant.jpg',
      webp: '/flowjoy/projects/laurie-voice-assistant.webp',
      imageAlt: 'Laurie Inbound Voice Assistant'
    },
    {
      id: 'broadr',
      badge: 'LEAD REACTIVATION SYSTEM',
      badgeBg: 'bg-[#1A456F]',
      cardBg: 'bg-[#EDF3F9]',
      cardBorder: 'border-[#D7E3EE]',
      textColor: 'text-[#0C1E30]',
      subTextColor: 'text-[#3B526B]',
      primaryBtnBg: 'bg-[#1A456F] hover:bg-[#133557] text-white',
      title: 'A dormant-lead reactivation system for neglected CRM pipeline',
      description:
        'Connects to your existing CRM, identifies neglected opportunities, personalizes outreach at scale, contacts via carrier-safe SMS pools, handles responses, and updates the system.',
      proofLogos: [
        { src: '/flowjoy/twilio.svg', alt: 'Twilio' },
        { src: '/flowjoy/make.svg', alt: 'Make' },
        { src: 'https://cdn.simpleicons.org/hubspot/FF7A59', alt: 'HubSpot' }
      ],
      proofText:
        'Reactivated 3,400+ cold CRM records across 10 rotating 10DLC numbers, generating 142 booked discovery calls with zero carrier flags.',
      primaryBtnText: 'Explore Broadr',
      secondaryBtnText: 'SMS engine',
      image: '/flowjoy/projects/broadr-cover.jpg',
      webp: '/flowjoy/projects/broadr-cover.webp',
      imageAlt: 'Broadr SMS Reactivation System'
    }
  ];
</script>

<section id="what-we-built" bind:this={s} class="py-24 sm:py-32 bg-[#090A0E] font-[Poppins] text-white relative overflow-hidden">

  <!-- Subtle dark background glow -->
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/5 via-blue-500/5 to-transparent blur-[120px] pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

    <!-- Section header -->
    <div
      class="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
      style="opacity:{v?1:0};transform:translateY({v?0:28}px);transition:opacity .7s ease,transform .7s ease"
    >
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-zinc-400 mb-4">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        Production Systems
      </div>
      <h2 class="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
        Production GTM systems.<br />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-400">Not experiments.</span>
      </h2>
      <p class="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
        Custom revenue engines engineered around your existing stack.
      </p>
    </div>

    <!-- Stack of cards -->
    <div class="space-y-10 sm:space-y-14">
      {#each projects as project, i}
        <div
          id={project.id}
          class="rounded-[2.5rem] {project.cardBg} border {project.cardBorder} p-7 sm:p-10 lg:p-14 shadow-2xl transition-all duration-300"
          style="opacity:{v?1:0};transform:translateY({v?0:40}px);transition:opacity .7s ease {i*150}ms,transform .7s ease {i*150}ms"
        >
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

            <!-- ─── LEFT: Clay-style specs & copy ─── -->
            <div class="lg:col-span-6 flex flex-col justify-between {project.textColor}">
              <div>
                <!-- Badge Pill -->
                <div class="mb-5">
                  <span class="inline-flex items-center px-3.5 py-1 rounded-full {project.badgeBg} text-white text-[11px] font-bold tracking-wider uppercase font-mono shadow-xs">
                    {project.badge}
                  </span>
                </div>

                <!-- Display Headline -->
                <h3 class="text-2xl sm:text-3xl lg:text-[38px] font-bold {project.textColor} tracking-tight leading-[1.15] mb-4">
                  {project.title}
                </h3>

                <!-- Clean paragraph description -->
                <p class="{project.subTextColor} text-sm sm:text-base leading-relaxed font-light mb-8 max-w-lg">
                  {project.description}
                </p>

                <!-- Mini Proof -->
                <div class="flex items-center gap-3.5 mb-8">
                  <div class="flex items-center -space-x-2 shrink-0">
                    {#each project.proofLogos as logo}
                      <div class="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center p-1.5 shadow-xs">
                        <img src={logo.src} alt={logo.alt} class="w-full h-full object-contain" />
                      </div>
                    {/each}
                  </div>
                  <p class="text-xs {project.subTextColor} leading-snug">
                    {project.proofText}
                  </p>
                </div>
              </div>

              <!-- Dual Action Buttons -->
              <div class="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  on:click={() => scrollToSection('gtm-teardown')}
                  class="{project.primaryBtnBg} font-semibold px-6 py-3 rounded-full text-sm flex items-center gap-2 shadow-xs transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>{project.primaryBtnText}</span>
                  <span>&rarr;</span>
                </button>

                <button
                  type="button"
                  on:click={() => scrollToSection('gtm-teardown')}
                  class="bg-white hover:bg-white/90 text-zinc-900 border border-black/10 font-medium px-5 py-3 rounded-full text-sm shadow-xs transition cursor-pointer"
                >
                  {project.secondaryBtnText}
                </button>
              </div>
            </div>

            <!-- ─── RIGHT: Clean Large Visual Window ─── -->
            <div class="lg:col-span-6">
              <div class="rounded-[2rem] overflow-hidden bg-white/70 border border-black/5 shadow-xl aspect-[4/3] sm:aspect-[16/11] relative group">
                <picture class="w-full h-full">
                  <source srcset={project.webp} type="image/webp" />
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="550"
                    class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
              </div>
            </div>

          </div>
        </div>
      {/each}
    </div>

  </div>
</section>
