<!-- /+layout.svelte -->

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
      api_host: 'https://www.flowjoy.online/ingest', 
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

<style>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

   @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>

<!-- <svelte:head>
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
  <meta property="og:image" content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/NEW+OG.jpg" />

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
  <meta name="twitter:image" content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/NEW+OG.jpg" />
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
      "image": "https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/NEW+OG.jpg"
    }
  </script>
</svelte:head> -->

<main class="min-h-screen">
  
  <div class="overflow-hi">
    <slot />
  </div>
  
  
</main>