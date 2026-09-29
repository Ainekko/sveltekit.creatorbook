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
      id: 'startupscrape',
      badge: 'ACCOUNT INTELLIGENCE SYSTEM',
      badgeBg: 'bg-[#C2410C]',
      cardBg: 'bg-[#FFF7ED]',
      cardBorder: 'border-[#FED7AA]',
      textColor: 'text-[#431407]',
      subTextColor: 'text-[#7C2D12]',
      primaryBtnBg: 'bg-[#C2410C] hover:bg-[#9A3412] text-white',
      title: 'Signal Forge: the founder-intelligence engine for high-fit pipeline',
      description:
        'Finds startups with the right signals, sends everything to JEV to score, and only qualifies the strongest matches—cheap, fast, and built to keep costs low.',
      proofLogos: [
        { src: '/flowjoy/yc.svg', alt: 'Y Combinator' },
        { src: '/flowjoy/typesafe-ai-200x200.jfif', alt: 'JEV by TypeSafe AI' },
        { src: 'https://cdn.simpleicons.org/algolia/003DFF', alt: 'Algolia' }
      ],
      proofText:
        'Queried live YC batches in <500ms, achieved 90%+ browser cost savings, and extracted verified founder LinkedIn profiles and custom pitch hooks.',
      primaryBtnText: 'View case study',
      caseStudySlug: 'startupscrape-gtm-engine',
      image: '/flowjoy/startupscrape-thumbnail.svg',
      webp: '/flowjoy/startupscrape-thumbnail.svg',
      imageAlt: 'Signal Forge Account Intelligence Engine'
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
            <div class="lg:col-span-6">
              <div class="rounded-[2rem] overflow-hidden bg-white/70 border border-black/5 shadow-xl aspect-[4/3] sm:aspect-[16/11] relative group flex items-center justify-center">
                {#if project.id === 'startupscrape'}
                  <div class="startup-scrape-visual-wrap">
                    <div class="startup-scrape-visual">
                      <div class="startup-brand-row">
                        <div class="startup-logo-pill"><span class="logo-mark yc"><img src="/flowjoy/yc.svg" alt="Y Combinator" /></span><span>Launch list</span></div>
                        <div class="startup-logo-pill"><span class="logo-mark jev"><img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV" /></span><span>ICP score</span></div>
                        <div class="startup-logo-pill"><span class="logo-mark algolia"><img src="https://cdn.simpleicons.org/algolia/003DFF" alt="Algolia" /></span><span>Signal fit</span></div>
                      </div>

                      <div class="startup-flow-pipeline">
                        <div class="pipeline-step intake">
                          <div class="step-header">
                            <span class="mini-logo yc"><img src="/flowjoy/yc.svg" alt="Y Combinator" /></span>
                            <span>Signal intake</span>
                          </div>
                          <p>Find startup launch activity, founder posts, and account demand.</p>
                          <div class="step-stat"><span>Founders</span><strong>42</strong></div>
                        </div>

                        <div class="pipeline-arrow">→</div>

                        <div class="pipeline-step score">
                          <div class="step-header">
                            <span class="mini-logo jev"><img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV" /></span>
                            <span>JEV score</span>
                          </div>
                          <p>Score each company by intent, authority, and founder fit.</p>
                          <div class="step-stat"><span>Fit</span><strong>0.91</strong></div>
                        </div>

                        <div class="pipeline-arrow">→</div>

                        <div class="pipeline-step gate">
                          <div class="step-header">
                            <span class="mini-logo algolia"><img src="https://cdn.simpleicons.org/algolia/003DFF" alt="Algolia" /></span>
                            <span>Algolia + browser gate</span>
                          </div>
                          <p>Only send qualified accounts through the browser and AI reply path.</p>
                          <div class="step-stat"><span>Saved</span><strong>82%</strong></div>
                        </div>
                      </div>

                      <div class="startup-flow-caption">
                        <span class="caption-mark">✦</span>
                        Signal Forge blends launch discovery, JEV ICP scoring, and selective browser + AI outbound routing.
                      </div>
                    </div>
                  </div>
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
                      width="800"
                      height="550"
                      class="w-full h-full {project.image.endsWith('.svg') ? 'object-contain p-12 sm:p-16 bg-white' : 'object-cover object-center'} transition-transform duration-700 group-hover:scale-105"
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

  .startup-scrape-visual-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f4f1ed;
    border: 1px solid #d8d0c7;
    border-radius: 1.5rem;
    padding: 0.55rem;
    box-shadow: 0 10px 24px rgba(32, 24, 20, 0.04);
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    animation: flowFrameFloat 4.5s ease-in-out infinite;
  }

  .startup-scrape-visual {
    width: 100%;
    height: 100%;
    background: #f7f4f1;
    border-radius: 1.5rem;
    padding: 0.9rem 0.8rem 0.7rem;
    border: 1px solid #dcd3ca;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: visualFadeIn 0.9s ease-out both;
  }

  .startup-brand-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.1rem 0.1rem 0.7rem;
    animation: brandRowSlide 0.8s ease-out both;
  }

  .startup-logo-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.38rem 0.8rem;
    border-radius: 999px;
    background: rgba(255,255,255,0.72);
    border: 1px solid #d8d0c7;
    font-size: 0.68rem;
    font-weight: 600;
    color: #2d2a29;
    animation: chipFloat 5s ease-in-out infinite;
    animation-delay: calc(var(--i, 0) * 0.2s);
  }

  .logo-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 500px;
    font-size: 0.55rem;
    font-weight: 800;
  }

  .logo-mark.yc { background: #f3d5a6; padding: 0.08rem; }
  .logo-mark.yc img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .logo-mark.jev { background: rgba(255,255,255,0.8); padding: 0.08rem; }
  .logo-mark.jev img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .logo-mark.algolia { background: #e7f0ff; padding: 0.08rem; }
  .logo-mark.algolia img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

  .startup-flow-pipeline {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: stretch;
    gap: 0.55rem;
    margin: 0.2rem 0 0.6rem;
    flex: 1;
  }

  .pipeline-step {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.55rem;
    padding: 0.8rem 0.72rem 0.7rem;
    background: rgba(255,255,255,0.8);
    border: 1px solid #d9d0c7;
    border-radius: 1rem;
    box-shadow: 0 6px 18px rgba(32, 24, 20, 0.04);
    animation: stepRise 0.8s ease-out both;
  }

  .pipeline-step.intake { animation-delay: 0.1s; }
  .pipeline-step.score { animation-delay: 0.25s; }
  .pipeline-step.gate { animation-delay: 0.4s; }

  .pipeline-step p {
    margin: 0;
    font-size: 0.72rem;
    line-height: 1.5;
    color: #4b4643;
    font-weight: 500;
  }

  .step-header {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: #201d1c;
  }

  .mini-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    font-size: 0.54rem;
    font-weight: 800;
  }

  .mini-logo.yc { background: #f3d5a6; padding: 0.06rem; }
  .mini-logo.yc img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .mini-logo.jev { background: rgba(255,255,255,0.8); padding: 0.06rem; }
  .mini-logo.jev img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .mini-logo.algolia { background: #e7f0ff; padding: 0.06rem; }
  .mini-logo.algolia img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

  .step-stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.6rem;
    border-top: 1px solid #e8e1d8;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b625d;
  }

  .step-stat strong {
    font-size: 1rem;
    letter-spacing: 0.02em;
    color: #1e1d1b;
  }

  .pipeline-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #8d8078;
  }

  .startup-flow-caption {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem 0;
    text-align: center;
    font-size: 0.72rem;
    line-height: 1.4;
    font-weight: 600;
    color: #5f5854;
    animation: captionPulse 4s ease-in-out infinite;
  }

  .caption-mark {
    font-size: 0.9rem;
    color: #201d1c;
  }

  @keyframes flowFrameFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-6px) rotate(-0.2deg); }
    50% { transform: translateY(-10px) rotate(0deg); }
    75% { transform: translateY(-6px) rotate(0.2deg); }
  }

  @keyframes visualFadeIn {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes brandRowSlide {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes chipFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-4px) scale(1.03); }
  }

  @keyframes stepRise {
    from { opacity: 0; transform: translateY(18px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes captionPulse {
    0%, 100% { opacity: 0.8; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(-1px); }
  }

  @media (max-width: 900px) {
    .startup-flow-pipeline {
      grid-template-columns: 1fr;
    }

    .pipeline-arrow {
      transform: rotate(90deg);
    }
  }

  @media (max-width: 640px) {
    .startup-brand-row {
      justify-content: flex-start;
    }
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
