<script lang="ts">
  import { onMount } from 'svelte';
  import StartupScrapeShowcase from '$lib/components/StartupScrapeShowcase.svelte';

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
      id: 'verve',
      badge: 'FOUNDER INTELLIGENCE SYSTEM',
      badgeBg: 'bg-[#C2410C]',
      cardBg: 'bg-[#FFF7ED]',
      cardBorder: 'border-[#FED7AA]',
      textColor: 'text-[#431407]',
      subTextColor: 'text-[#7C2D12]',
      primaryBtnBg: 'bg-[#C2410C] hover:bg-[#9A3412] text-white',
      title: 'Verve: the autonomous account intelligence engine',
      description:
        'Eliminates $1,200/mo in bloated data tool seats. Discovers early-stage B2B startups directly for free, scores intent with JEV for $0.04, and only enriches verified founder emails via Treg.to for pennies.',
      proofLogos: [
        { src: '/flowjoy/yc.svg', alt: 'Y Combinator' },
        { src: '/flowjoy/typesafe-ai-200x200.jfif', alt: 'JEV by TypeSafe AI' },
        { src: '/flowjoy/algolia.svg', alt: 'Algolia' },
        { src: '/flowjoy/logos/treg-logo.png', alt: 'Treg.to' }
      ],
      proofText:
        'Delivered 50 verified founder briefs for $0.22 total—saving 91% vs Apollo and ZoomInfo with zero browser fees and zero wasted credits.',
      primaryBtnText: 'View case study',
      caseStudySlug: 'verve-gtm-engine',
      image: '/flowjoy/verve-thumbnail.svg',
      webp: '/flowjoy/verve-thumbnail.svg',
      imageAlt: 'Verve Account Intelligence Engine'
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
        'Someone calls, AI handles the interaction with instant latency, qualifies ICP fit against your rules, schedules the meeting directly on your calendar, and updates your business workflow.',
      proofLogos: [
        { src: '/flowjoy/retell.svg', alt: 'Retell AI' },
        { src: '/flowjoy/twilio.svg', alt: 'Twilio' },
        { src: 'https://cdn.simpleicons.org/googlecalendar/4285F4', alt: 'Google Calendar' }
      ],
      proofText:
        'Fielded 1,200+ inbound calls with zero dropped rings, instant conversational response, and instant CRM calendar sync.',
      primaryBtnText: 'View case study',
      caseStudySlug: 'front-desk-assistant',
      image: '/flowjoy/projects/laurie-voice-assistant.jpg',
      webp: '/flowjoy/projects/laurie-voice-assistant.webp',
      imageAlt: 'Laurie Inbound Voice Assistant'
    },
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
      primaryBtnText: 'View case study',
      caseStudySlug: 'elio-reddit-agent',
      image: '/flowjoy/projects/elio-cover.jpg',
      webp: '/flowjoy/projects/elio-cover.webp',
      imageAlt: 'Elio Buyer Intent System'
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
      primaryBtnText: 'View case study',
      caseStudySlug: 'sms-management-platform',
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
                  <div class="logo-stack shrink-0">
                    {#each project.proofLogos as logo, index}
                      <div
                        class="logo-tile-shuffle"
                        style="--i: {index}; --delay: {index * 0.9}s;"
                      >
                        <img src={logo.src} alt={logo.alt} class="w-full h-full object-contain" />
                      </div>
                    {/each}
                  </div>
                  <p class="text-xs {project.subTextColor} leading-snug">
                    {project.proofText}
                  </p>
                </div>
              </div>

              <!-- Unified CTA -->
              <div class="pt-2">
                <a
                  href={`/case-studies/${project.caseStudySlug}`}
                  class="{project.primaryBtnBg} inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full text-sm shadow-xs transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>{project.primaryBtnText}</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

            <!-- ─── RIGHT: Clean Large Visual Window ─── -->
            <div class="lg:col-span-6 min-w-0">
              <div class="rounded-[2rem] overflow-hidden bg-white/70 border border-black/5 shadow-xl min-h-[280px] sm:min-h-0 aspect-[4/3] sm:aspect-[16/11] relative group flex items-center justify-center w-full max-w-full">
                {#if project.id === 'verve'}
                  <StartupScrapeShowcase />
                {:else}
                  <picture class="w-full h-full">
                    {#if project.webp && !project.webp.endsWith('.svg')}
                      <source srcset={project.webp} type="image/webp" />
                    {/if}
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      decoding="async"
                      class={project.image.endsWith('.svg')
                        ? "w-full h-full block max-w-full max-h-full box-border object-contain p-12 sm:p-16 bg-white transition-transform duration-700 group-hover:scale-105"
                        : "w-full h-full block max-w-full max-h-full box-border object-cover object-center transition-transform duration-700 group-hover:scale-105"}
                      style="width:100%;height:100%;display:block;box-sizing:border-box;"
                    />
                  </picture>
                {/if}
              </div>
            </div>

          </div>
        </div>
      {/each}
    </div>

  </div>
</section>

<style>
  .logo-stack {
    position: relative;
    width: 94px;
    height: 32px;
  }

  .logo-tile-shuffle {
    position: absolute;
    top: 0;
    left: calc(var(--i) * 16px);
    width: 32px;
    height: 32px;
    border-radius: 9999px;
    background: rgba(255,255,255,0.96);
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px;
    transform-origin: center center;
    animation: logoTileShuffle 2.8s ease-in-out infinite;
    animation-delay: var(--delay);
    z-index: calc(10 - var(--i));
  }

  @keyframes logoTileShuffle {
    0% {
      transform: translateX(calc(var(--i) * 0px)) translateY(0) rotate(0deg) scale(0.92);
      opacity: 0.7;
      filter: saturate(0.8);
    }
    20% {
      transform: translateX(calc(var(--i) * 2px + 2px)) translateY(-2px) rotate(-3deg) scale(0.98);
      opacity: 0.9;
    }
    38% {
      transform: translateX(calc(var(--i) * 6px + 10px)) translateY(-5px) rotate(6deg) scale(1.08);
      opacity: 1;
      z-index: 20;
    }
    55% {
      transform: translateX(calc(var(--i) * 10px + 18px)) translateY(-2px) rotate(-5deg) scale(1.02);
      opacity: 1;
      z-index: 20;
    }
    75% {
      transform: translateX(calc(var(--i) * 10px + 8px)) translateY(0) rotate(2deg) scale(0.96);
      opacity: 0.9;
      z-index: calc(10 - var(--i));
    }
    100% {
      transform: translateX(calc(var(--i) * 0px)) translateY(0) rotate(0deg) scale(0.92);
      opacity: 0.7;
      filter: saturate(0.8);
    }
  }
</style>
