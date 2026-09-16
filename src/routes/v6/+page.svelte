<script lang="ts">
  import V6GtmNavbar from '$lib/components/v6/V6GtmNavbar.svelte';
  import V6GtmHero from '$lib/components/v6/V6GtmHero.svelte';
  import CostOfBrokenGtmV6 from '$lib/components/v6/CostOfBrokenGtmV6.svelte';
  import V6GtmStatBanner from '$lib/components/v6/V6GtmStatBanner.svelte';
  import OurWorkBentoV6 from '$lib/components/v6/OurWorkBentoV6.svelte';
  import V6GtmWhoIsFor from '$lib/components/v6/V6GtmWhoIsFor.svelte';
  import V6TeamAndValues from '$lib/components/v6/V6TeamAndValues.svelte';
  import V6HowItWorks from '$lib/components/v6/V6HowItWorks.svelte';
  import V6OfferPricing from '$lib/components/v6/V6OfferPricing.svelte';
  import V6TeardownCTA from '$lib/components/v6/V6TeardownCTA.svelte';
  import V6GtmFooter from '$lib/components/v6/V6GtmFooter.svelte';
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
<V6GtmNavbar />

<main class="w-full overflow-hidden">
  <!-- 1. Hero: Under-engineered, not under-staffed -->
  <V6GtmHero />

  <!-- 2. Problem: Broken systems, not broken teams (v6 — creative pill block, no duplicate text, no bottom bar) -->
  <CostOfBrokenGtmV6 />

  <!-- 3. Stat Banner Hook -->
  <V6GtmStatBanner />

  <!-- 4. What We Build: Production GTM systems. Not experiments. -->
  <OurWorkBentoV6 />

  <!-- 5. For Whom -->
  <V6GtmWhoIsFor />

  <!-- 6. Who We Are as a Team & Core Values -->
  <V6TeamAndValues />

  <!-- 7. How It Works -->
  <V6HowItWorks />

  <!-- 8. Pricing: GTM engineering without the hire -->
  <V6OfferPricing />

  <!-- 9. Final CTA -->
  <V6TeardownCTA />

  <!-- 10. Footer -->
  <V6GtmFooter />
</main>

<FloatingScheduler />
