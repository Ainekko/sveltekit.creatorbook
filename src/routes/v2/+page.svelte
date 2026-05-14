<script lang="ts">
  import { onMount } from 'svelte';

  import V2NavBar from '$lib/components/v2/V2NavBar.svelte';
  import V2Hero from '$lib/components/v2/V2Hero.svelte';
  import V2TryLive from '$lib/components/v2/V2TryLive.svelte';
  import V2ProblemOutcome from '$lib/components/v2/V2ProblemOutcome.svelte';
  import V2WhoIsFor from '$lib/components/v2/V2WhoIsFor.svelte';
  import HowItWorks from '$lib/components/agency/HowItWorks.svelte';
  import AgencyPricing from '$lib/components/agency/AgencyPricing.svelte';
  import WhyUs from '$lib/components/agency/WhyUs.svelte';
  import AgencyCTA from '$lib/components/agency/AgencyCTA.svelte';
  import AgencyFooter from '$lib/components/agency/AgencyFooter.svelte';

  onMount(() => {
    // Cal.com global embed init
    if (typeof window !== 'undefined') {
      (function (C, A, L) {
        let p = (a, ar) => a.q.push(ar);
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
              const api = function () { p(api, arguments); };
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
      window.Cal('init', '15min', { origin: 'https://app.cal.com' });
      window.Cal.ns['15min']('ui', {
        theme: 'light',
        hideEventTypeDetails: false,
        layout: 'month_view'
      });
    }
  });
</script>

<svelte:head>
  <title>Flowjoy – Stop Losing Leads to Slow Ops</title>
  <meta
    name="description"
    content="We build custom AI systems that handle your calls, bookings, follow-ups, and busywork — so your team focuses on closing. Working MVP in 4 weeks. You own the code."
  />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Poppins:wght@300;400;500;600;700&family=Pacifico&display=swap" rel="stylesheet">
</svelte:head>

<div class="bg-[#09090B]">
  <!-- Sticky Navbar -->
  <div class="sticky top-0 z-50">
    <V2NavBar />
  </div>

  <main>
    <!-- 1. Hero — Pain-first, outcome-driven -->
    <V2Hero />

    <!-- 2. Try It Live — USP: real working products -->
    <V2TryLive />

    <!-- 3. Problem → Outcome — What changes for the lead -->
    <V2ProblemOutcome />

    <!-- 4. How It Works — Keep existing, it's solid -->
    <HowItWorks />

    <!-- 5. Who Is This For — Qualifying + testimonial -->
    <V2WhoIsFor />

    <!-- 6. Pricing — Keep existing -->
    <AgencyPricing />

    <!-- 7. Why Us — comparison table (keep existing) -->
    <WhyUs />

    <!-- 8. Final CTA -->
    <AgencyCTA />

    <!-- 9. Footer -->
    <AgencyFooter />
  </main>
</div>
