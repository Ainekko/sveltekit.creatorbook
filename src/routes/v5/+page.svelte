<script lang="ts">
  import V5GtmNavbar from '$lib/components/v5/V5GtmNavbar.svelte';
  import V5GtmHero from '$lib/components/v5/V5GtmHero.svelte';
  import CostOfBrokenGtmV5 from '$lib/components/v5/CostOfBrokenGtmV5.svelte';
  import V5GtmStatBanner from '$lib/components/v5/V5GtmStatBanner.svelte';
  import OurWorkBentoV5 from '$lib/components/v5/OurWorkBentoV5.svelte';
  import V5GtmWhoIsFor from '$lib/components/v5/V5GtmWhoIsFor.svelte';
  import V5TeamAndValues from '$lib/components/v5/V5TeamAndValues.svelte';
  import V5HowItWorks from '$lib/components/v5/V5HowItWorks.svelte';
  import V5OfferPricing from '$lib/components/v5/V5OfferPricing.svelte';
  import V5TeardownCTA from '$lib/components/v5/V5TeardownCTA.svelte';
  import V5GtmFooter from '$lib/components/v5/V5GtmFooter.svelte';
  import FloatingScheduler from '$lib/components/FloatingScheduler.svelte';
</script>

<svelte:head>
  <title>Flowjoy • Your GTM Stack Is Powerful. Your Workflow Isn't.</title>
  <meta
    name="description"
    content="You're paying for Apollo, Clay, HubSpot, Slack and dozens of other tools. Yet your team is still doing work manually. We engineer the AI systems, data pipelines and automations that make your entire GTM operation faster, smarter and more scalable."
  />
</svelte:head>

<!-- Sticky Navbar -->
<V5GtmNavbar />

<main class="w-full overflow-hidden">
  <!-- 1. Hero: Under-engineered, not under-staffed -->
  <V5GtmHero />

  <!-- 2. Problem: More reps won't fix broken systems (Clay Bento Grid on White) -->
  <CostOfBrokenGtmV5 />

  <!-- 3. Stat Banner Hook -->
  <V5GtmStatBanner />

  <!-- 4. What We Build: Production GTM systems. Not experiments. (Clay Pastel Cards on Dark) -->
  <OurWorkBentoV5 />

  <!-- 5. For Whom -->
  <V5GtmWhoIsFor />

  <!-- 6. Who We Are as a Team & Core Values (Clay Bento Cards on Dark) -->
  <V5TeamAndValues />

  <!-- 7. How It Works -->
  <V5HowItWorks />

  <!-- 8. Pricing: GTM engineering without the hire -->
  <V5OfferPricing />

  <!-- 9. Final CTA: Stop waiting to hire a GTME -->
  <V5TeardownCTA />

  <!-- 10. Footer -->
  <V5GtmFooter />
</main>

<FloatingScheduler />
