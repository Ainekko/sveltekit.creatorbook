<script lang="ts">
  import V4GtmNavbar from '$lib/components/v4/V4GtmNavbar.svelte';
  import V4GtmHero from '$lib/components/v4/V4GtmHero.svelte';
  import CostOfBrokenGtmV4 from '$lib/components/v4/CostOfBrokenGtmV4.svelte';
  import V4GtmStatBanner from '$lib/components/v4/V4GtmStatBanner.svelte';
  import OurWorkBentoV4 from '$lib/components/v4/OurWorkBentoV4.svelte';
  import V4GtmWhoIsFor from '$lib/components/v4/V4GtmWhoIsFor.svelte';
  import V4HowItWorks from '$lib/components/v4/V4HowItWorks.svelte';
  import V4OfferPricing from '$lib/components/v4/V4OfferPricing.svelte';
  import V4TeardownCTA from '$lib/components/v4/V4TeardownCTA.svelte';
  import V4GtmFooter from '$lib/components/v4/V4GtmFooter.svelte';
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
<V4GtmNavbar />

<main class="w-full overflow-hidden">
  <!-- 1. Hero: Under-engineered, not under-staffed -->
  <V4GtmHero />

  <!-- 2. Problem: More reps won't fix broken systems -->
  <CostOfBrokenGtmV4 />

  <!-- 3. Stat Banner Hook -->
  <V4GtmStatBanner />

  <!-- 4. What We Build: Production GTM systems. Not experiments. -->
  <OurWorkBentoV4 />

  <!-- 5. For Whom -->
  <V4GtmWhoIsFor />

  <!-- 6. How It Works -->
  <V4HowItWorks />

  <!-- 7. Pricing: GTM engineering without the hire -->
  <V4OfferPricing />

  <!-- 8. Final CTA: Stop waiting to hire a GTME -->
  <V4TeardownCTA />

  <!-- 9. Footer -->
  <V4GtmFooter />
</main>

<FloatingScheduler />
