<!-- // src/lib/components/blog/SEO.svelte -->
<script lang="ts">
  export let title: string;
  export let description: string;
  export let keywords: string[] = [];
  export let author: string = '';
  export let publishedDate: string = '';
  export let modifiedDate: string = '';
  export let image: string = '';
  export let url: string = '';
  export let type: string = 'article';

  import {API_BASE_URL} from '$lib/config'
  
  // CRITICAL: Update these with your actual domain
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.flowjoy.online';
  const siteName = import.meta.env.VITE_SITE_NAME || 'flowjoy';
  const twitterHandle = import.meta.env.VITE_TWITTER_HANDLE || '@_negativeIQ';
  
  $: canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;
  $: ogImage = image || `${siteUrl}/og-default.png`;
  $: fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  
  // Structured data for articles
  $: articleSchema = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": [ogImage],
    "datePublished": publishedDate,
    "dateModified": modifiedDate || publishedDate,
    "author": {
      "@type": "Person",
      "name": author || siteName
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "keywords": keywords.join(', ')
  } : null;
  
  // BreadcrumbList schema for better navigation understanding
  $: breadcrumbSchema = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": canonicalUrl
      }
    ]
  } : null;
  
  // WebSite schema for homepage
  $: websiteSchema = type === 'website' ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  } : null;
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{fullTitle}</title>
  <meta name="title" content={fullTitle} />
  <meta name="description" content={description} />
  {#if keywords.length > 0}
    <meta name="keywords" content={keywords.join(', ')} />
  {/if}
  {#if author}
    <meta name="author" content={author} />
  {/if}
  
  <!-- Robots Meta -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  
  <!-- Canonical URL - CRITICAL for SEO -->
  <link rel="canonical" href={canonicalUrl} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:locale" content="en_US" />
  {#if publishedDate}
    <meta property="article:published_time" content={publishedDate} />
  {/if}
  {#if modifiedDate}
    <meta property="article:modified_time" content={modifiedDate} />
  {/if}
  {#if keywords.length > 0}
    {#each keywords.slice(0, 5) as keyword}
      <meta property="article:tag" content={keyword} />
    {/each}
  {/if}
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={twitterHandle} />
  <meta name="twitter:creator" content={twitterHandle} />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  
  <!-- Additional SEO Meta Tags -->
  <meta name="theme-color" content="#ffffff" />
  <meta name="format-detection" content="telephone=no" />
  
  <!-- Structured Data - Article/Blog Posting -->
  {#if articleSchema}
    {@html `<script type="application/ld+json">${JSON.stringify(articleSchema)}</script>`}
  {/if}
  
  <!-- Structured Data - Breadcrumbs -->
  {#if breadcrumbSchema}
    {@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
  {/if}
  
  <!-- Structured Data - Website -->
  {#if websiteSchema}
    {@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}
  {/if}
  
  <!-- Preconnect to external domains for faster loading -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  
  <!-- DNS Prefetch for your API -->
  <link rel="dns-prefetch" href={`${API_BASE_URL}`} />
</svelte:head>