<script>
  import { inject } from '@vercel/analytics';
  import "../app.css";
  import NavBar from '$lib/components/NavBar.svelte';
  import { onMount } from 'svelte';
  import posthog from 'posthog-js'
  import { browser } from '$app/environment';

  inject();
  
  onMount(() => {
  if (browser) {
    posthog.init('phc_JyJ1MIeHjGHDj50rZhIFmLSJlKm9kXjejFtBbKipRk5', {
      api_host: 'https://www.s-tierproject.online/ingest',  // Remove trailing slash
      debug: true,
      disable_compression: true,  // Add this line
      loaded: function(ph) {
        console.log('PostHog (simplified config) loaded. API host:', ph.config.api_host);
        ph.capture('test_event_simple_config', { method: 'proxy_check_simple' });
      }
    });
  }
});
  
</script>

<svelte:head>
  <title>Ai marketing agents for saas</title>
  <meta
    name="description"
    content="Be the first to catch latest industry trends, create targeted content and grow"
  />
  <meta property="og:title" content="Ai marketing agents for saas" />
  <meta
    property="og:description"
    content="Be the first to catch latest industry trends, create targeted content and grow"
  />
  <meta
    property="og:image"
    content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/createrbook+final/new+cb+assets/Home.jpg"
  />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Ai marketing agents for saas" />
  <meta
    name="twitter:description"
    content="Be the first to catch latest industry trends, create targeted content and grow"
  />
  <meta
    name="twitter:image"
    content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/createrbook+final/new+cb+assets/Home.jpg"
  />
</svelte:head>

<main class="min-h-screen">
  <div class="sticky top-0 z-50">
    <NavBar />
  </div>
  <div class="overflow-hidden">
    <slot />
  </div>
  
  <section>
    <!-- Calendly badge widget begin -->
    <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
    <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
    <script type="text/javascript">
      window.onload = function() {
        Calendly.initBadgeWidget({
          url: 'https://calendly.com/ahlaqachhafid/let-s-talk-about-what-we-can-bring-to-the-table?hide_event_type_details=1&hide_gdpr_banner=1',
          text: 'Book a call',
          color: '#1a1a1a',
          textColor: '#ffffff',
          branding: undefined
        });
      }
    </script>
    <!-- Calendly badge widget end -->
  </section>
</main>