<script lang="ts">
    // src/lib/components/blog/SEO.svelte
    export let title: string;
    export let description: string;
    export let keywords: string[] = [];
    export let author: string = '';
    export let publishedDate: string = '';
    export let modifiedDate: string = '';
    export let image: string = '';
    export let url: string = '';
    export let type: string = 'article';
    
    const siteUrl = 'https://yourblog.com'; // Update with your domain
    const siteName = 'Your Blog Name';
    
    $: canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;
    $: ogImage = image || `${siteUrl}/og-default.png`;
  </script>
  
  <svelte:head>
    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    {#if keywords.length > 0}
      <meta name="keywords" content={keywords.join(', ')} />
    {/if}
    {#if author}
      <meta name="author" content={author} />
    {/if}
    
    <!-- Canonical URL -->
    <link rel="canonical" href={canonicalUrl} />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={type} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:site_name" content={siteName} />
    {#if publishedDate}
      <meta property="article:published_time" content={publishedDate} />
    {/if}
    {#if modifiedDate}
      <meta property="article:modified_time" content={modifiedDate} />
    {/if}
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonicalUrl} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={ogImage} />
    
    <!-- Schema.org for Google -->
    {#if type === 'article'}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "description": description,
          "image": ogImage,
          "datePublished": publishedDate,
          "dateModified": modifiedDate || publishedDate,
          "author": {
            "@type": "Person",
            "name": author
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
          }
        })}
      </script>
    {/if}
  </svelte:head>