<script lang="ts">
  import V2GtmNavbar from '$lib/components/v3/V2GtmNavbar.svelte';
  import V2GtmHero from '$lib/components/v3/V2GtmHero.svelte';
  import V2GtmStatBanner from '$lib/components/v3/V2GtmStatBanner.svelte';
  import CostOfBrokenGtmV2 from '$lib/components/v3/CostOfBrokenGtmV2.svelte';
  import OurWorkBentoV2 from '$lib/components/v3/OurWorkBentoV2.svelte';
  import V2GtmWhoIsFor from '$lib/components/v3/V2GtmWhoIsFor.svelte';
  import V2HowItWorks from '$lib/components/v3/V2HowItWorks.svelte';
  import V2OfferPricing from '$lib/components/v3/V2OfferPricing.svelte';
  import V2TeardownCTA from '$lib/components/v3/V2TeardownCTA.svelte';
  import V2GtmFooter from '$lib/components/v3/V2GtmFooter.svelte';
  import FloatingScheduler from '$lib/components/FloatingScheduler.svelte';
</script>

<svelte:head>
  <title>Flowjoy • GTM Engineering Studio for High-Growth Teams</title>
  <meta
    name="description"
    content="We engineer the prospecting infrastructure, lead intelligence pipelines, outbound systems, and AI agents your team doesn't have time to build."
  />
</svelte:head>

<!-- Sticky Navbar -->
<div class="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-100">
  <V2GtmNavbar />
</div>

<main class="w-full overflow-hidden">
  <!-- 1. Hero Section -->
  <V2GtmHero />

  <!-- 2. The Real Cost of Broken GTM -->
  <CostOfBrokenGtmV2 />

  <!-- 3. Stat Banner Hook -->
  <V2GtmStatBanner />

  <!-- 4. What We've Built: Production Systems Bento Grid (DARK #110E0D Espresso) -->
  <OurWorkBentoV2 />

  <!-- 5. Who Flowjoy Sells To (WHITE) -->
  <V2GtmWhoIsFor />

  <!-- 6. How It Works (DARK #110E0D Espresso) -->
  <V2HowItWorks />

  <!-- 7. Sprints & Retainer Offers (WHITE) -->
  <V2OfferPricing />

  <!-- 8. Free GTM Teardown & Prototype (DARK #110E0D Espresso) -->
  <V2TeardownCTA />

  <!-- 9. Footer (DARK #0B0908 Deep Espresso) -->
  <V2GtmFooter />
</main>

<FloatingScheduler />
