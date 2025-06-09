<script>
  import { inject } from '@vercel/analytics';
  import "../app.css";
  import NavBar from '$lib/components/NavBar.svelte';
  import { onMount } from 'svelte';
  import posthog from 'posthog-js'
  import { browser } from '$app/environment';
  import { page } from '$app/stores';


  inject();

  let initialized = false;

  
  onMount(() => {
  if (browser) {
    posthog.init('phc_JyJ1MIeHjGHDj50rZhIFmLSJlKm9kXjejFtBbKipRk5', {
      api_host: 'https://www.s-tierproject.online/ingest', 
      capture_pageview: 'history_change',
      debug: true,
      disable_compression: true,  // Add this line
      loaded: function(ph) {
        console.log('PostHog (simplified config) loaded. API host:', ph.config.api_host);
        ph.capture('test_event_simple_config', { method: 'proxy_check_simple' });
      }
    });
    initialized = true;
  }
});

$: if (browser && initialized && $page.url.pathname) {
  posthog.capture('$pageview', {
    $current_url: $page.url.href,
    $pathname: $page.url.pathname
  });
}
  
</script>

<svelte:head>
  <title>AI Marketing Agents for SaaS</title>
  <meta name="description" content="Grow your SaaS marketing with AI agents. Be the first to catch latest industry trends, create targeted content and grow your business faster." />
  <meta name="keywords" content="AI marketing, SaaS marketing, marketing automation, AI agents, content creation, industry trends, business growth, marketing tools" />
  <meta name="author" content="S-Tier Project" />
  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="UTF-8" />
  
  <link rel="canonical" href="https://s-tierproject.online" />
  
  <meta property="og:title" content="AI Marketing Agents for SaaS" />
  <meta property="og:description" content="Grow your SaaS marketing with AI agents. Be the first to catch latest industry trends, create targeted content and grow your business faster." />
  <meta property="og:image" content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/OGImg.jpg" />

  <meta property="og:image:alt" content="AI Marketing Agents for SaaS - Dashboard Preview" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://s-tierproject.online" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="S-Tier Project" />
  <meta property="og:locale" content="en_US" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@yourtwitterhandle" />
  <meta name="twitter:creator" content="@yourtwitterhandle" />
  <meta name="twitter:title" content="AI Marketing Agents for SaaS" />
  <meta name="twitter:description" content="Grow your SaaS marketing with AI agents. Be the first to catch latest industry trends, create targeted content and grow your business faster." />
  <meta name="twitter:image" content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/OGImg.jpg" />
  <meta name="twitter:image:alt" content="AI Marketing Agents for SaaS - Dashboard Preview" />
  
  <meta name="theme-color" content="#000000" />
  <meta name="msapplication-TileColor" content="#000000" />
  <meta name="application-name" content="S-Tier Project" />
  <meta name="apple-mobile-web-app-title" content="S-Tier Project" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "AI Marketing Agents for SaaS",
      "url": "https://s-tierproject.online",
      "description": "Revolutionize your SaaS marketing with AI agents. Be the first to catch latest industry trends, create targeted content and grow your business faster.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Organization",
        "name": "S-Tier Project"
      },
      "image": "https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/OGImg.jpg"
    }
  </script>
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