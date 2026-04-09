<script lang="ts">
	export let data;

	import NewPricing from '$lib/components/NewPricing.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import Landing from '$lib/components/landingpage/Landing.svelte';
</script>

<svelte:head>
	<title>Scale your content - delegate reasearch and grunt work to AI - In minutes</title>
	<meta
		name="description"
		content="Meet Flowjoy: AI marketing agents that automate SEO and Reddit growth without complex workflows. Perfect for founders, growth teams, and solo creators."
	/>
	<meta
		name="keywords"
		content="AI marketing, marketing automation, AI agents, SEO automation, Reddit marketing, generative AI, content automation, Flowjoy"
	/>
	<meta name="author" content="Flowjoy" />
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="UTF-8" />

	<link rel="canonical" href="https://www.flowjoy.online" />

	<meta
		property="og:title"
		content="Scale your content - delegate reasearch and grunt work to AI - In minutes"
	/>
	<meta
		property="og:description"
		content="Automate SEO, X, and Reddit growth without complex workflows. Flowjoy's AI agents are built for founders, growth teams, and solo creators."
	/>

	<meta
		property="og:image"
		content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/flowjoy/og.jpg"
	/>
	<meta property="og:image:alt" content="Flowjoy AI Marketing Agents Dashboard" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta property="og:url" content="https://www.flowjoy.online" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Flowjoy" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />

	<meta name="twitter:site" content="" />
	<meta name="twitter:creator" content="@_nagativeIQ" />

	<meta
		name="twitter:title"
		content="Scale your content - delegate reasearch and grunt work to AI - In minutes"
	/>
	<meta
		name="twitter:description"
		content="Automate SEO and Reddit growth without complex workflows. Built for founders, growth teams, and solo creators."
	/>

	<meta
		name="twitter:image"
		content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/flowjoy/og.jpg"
	/>
	<meta name="twitter:image:alt" content="Flowjoy AI Marketing Agents Dashboard" />

	<meta name="theme-color" content="#000000" />
	<meta name="msapplication-TileColor" content="#000000" />
	<meta name="application-name" content="Flowjoy" />
	<meta name="apple-mobile-web-app-title" content="Flowjoy" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
</svelte:head>

<div class="sticky top-0 z-50">
	<NavBar />
</div>

<main class="">
	<div>
		<Landing posts={data?.posts} />
		<NewPricing />
	</div>
</main>
