<script lang="ts">
  import { onMount } from 'svelte';

  import V2GtmNavbar from '$lib/components/v2/V2GtmNavbar.svelte';
  import V2GtmHero from '$lib/components/v2/V2GtmHero.svelte';
  import V2GtmStatBanner from '$lib/components/v2/V2GtmStatBanner.svelte';
  import V2WhatWeBuilt from '$lib/components/v2/V2WhatWeBuilt.svelte';
  import V2GtmProblemOutcome from '$lib/components/v2/V2GtmProblemOutcome.svelte';
  import V2Capabilities from '$lib/components/v2/V2Capabilities.svelte';
  import V2GtmWhoIsFor from '$lib/components/v2/V2GtmWhoIsFor.svelte';
  import V2HowItWorks from '$lib/components/v2/V2HowItWorks.svelte';
  import V2OfferPricing from '$lib/components/v2/V2OfferPricing.svelte';
  import V2TeardownCTA from '$lib/components/v2/V2TeardownCTA.svelte';
  import V2GtmFooter from '$lib/components/v2/V2GtmFooter.svelte';
  import FloatingScheduler from '$lib/components/FloatingScheduler.svelte';

  onMount(() => {
    // Cal.com global embed init
    if (typeof window !== 'undefined') {
      (function (C, A, L) {
        let p = (a: any, ar: any) => a.q.push(ar);
        let d = C.document;
        C.Cal =
          C.Cal ||
          function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement('script')).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () {
                p(api, arguments);
              };
              const ns = ar[1];
              api.q = api.q || [];
              if (typeof ns === 'string') {
                cal.ns[ns] = cal.ns[ns] || api;
                p(cal.ns[ns], ar);
                p(cal, ['initNamespace', ns]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          };
      })(window, 'https://app.cal.com/embed/embed.js', 'init');
      (window as any).Cal('init', '15min', { origin: 'https://app.cal.com' });
      (window as any).Cal.ns['15min']('ui', {
        theme: 'light',
        hideEventTypeDetails: false,
        layout: 'month_view'
      });
    }
  });
</script>

<svelte:head>
  <title>Flowjoy — GTM Engineering Studio for Startups</title>
  <meta
    name="description"
    content="We build the GTM systems your engineering team doesn't have time to build. Production-grade prospecting, intelligence, outbound, and AI systems for Seed &amp; Series A startups."
  />
  <meta property="og:title" content="Flowjoy — GTM Engineering Studio for Startups" />
  <meta
    property="og:description"
    content="We build the GTM systems your engineering team doesn't have time to build. Forward-deployed engineering for revenue."
  />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.flowjoy.online/v2" />
  <meta property="og:url" content="https://www.flowjoy.online/v2" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Flowjoy — GTM Engineering Studio for Startups" />
  <meta
    name="twitter:description"
    content="We build the GTM systems your engineering team doesn't have time to build. Production code in 2–4 weeks."
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Poppins:wght@300;400;500;600;700;800&family=Pacifico&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- Sticky Navbar -->
<div class="bg-white sticky top-0 z-50">
  <V2GtmNavbar />
</div>

<!-- 1. Hero Section (Light with Mesh Gradients & Logos) -->
<V2GtmHero />

<!-- Dark Deep Engineering & Outcome Sections -->
<div class="bg-[#09090B]">
  <main>
    <!-- 2. Outcome Hook Stat Banner (FIRST SECTION AFTER HERO - Instant Punch!) -->
    <V2GtmStatBanner />

    <!-- 3. What We've Built (Real Systems Proof: Elio, Nai, Broadr, Laurie) -->
    <V2WhatWeBuilt />

    <!-- 4. Problem → Outcome (Bottlenecks vs Shipped Outcomes) -->
    <V2GtmProblemOutcome />

    <!-- 5. Capabilities (Outcome-focused with logo clusters, NO code snippets) -->
    <V2Capabilities />

    <!-- 6. Who Flowjoy Sells To (Seed -> Series A ICP & Buyer Personas) -->
    <V2GtmWhoIsFor />

    <!-- 7. How It Works (Forward-Deployed Process) -->
    <V2HowItWorks />

    <!-- 8. Sprints & Retainer Offers -->
    <V2OfferPricing />

    <!-- 9. Free GTM Teardown & Prototype Lead Magnet -->
    <V2TeardownCTA />

    <!-- 10. Footer -->
    <V2GtmFooter />
  </main>

  <FloatingScheduler />
</div>
