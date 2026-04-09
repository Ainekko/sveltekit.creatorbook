<script lang="ts">
	import { onMount } from 'svelte';
	export let data;

	import NavBar from '$lib/components/NavBar.svelte';
	import AgencyHero from '$lib/components/agency/AgencyHero.svelte';
	import CaseStudiesSection from '$lib/components/agency/CaseStudiesSection.svelte';
	import ProcessSection from '$lib/components/agency/ProcessSection.svelte';
	import SaaSPromoSection from '$lib/components/agency/SaaSPromoSection.svelte';
	import ServicesSection from '$lib/components/agency/ServicesSection.svelte';
	import ValuesSection from '$lib/components/agency/ValuesSection.svelte';
	import AgencyPricing from '$lib/components/agency/AgencyPricing.svelte';
	import AgencyCTA from '$lib/components/agency/AgencyCTA.svelte';
	import InlineCTA from '$lib/components/agency/InlineCTA.svelte';
	import AgencyFooter from '$lib/components/agency/AgencyFooter.svelte';

	import { getFeaturedCaseStudies } from '$lib/data/caseStudies';

	const caseStudies = getFeaturedCaseStudies();

	onMount(() => {
		// Cal.com global embed init (shared across all sections that use it)
		if (typeof window !== 'undefined') {
			(function (C: any, A: string, L: string) {
				let p = (a: any, ar: any) => a.q.push(ar);
				let d = C.document;
				C.Cal =
					C.Cal ||
					function () {
						let cal = C.Cal;
						let ar: any = arguments;
						if (!cal.loaded) {
							cal.ns = {};
							cal.q = cal.q || [];
							d.head.appendChild(d.createElement('script')).src = A;
							cal.loaded = true;
						}
						if (ar[0] === L) {
							const api: any = function () {
								p(api, arguments);
							};
							const ns = ar[1];
							api.q = api.q || [];
							if (typeof ns === 'string') {
								cal.ns[ns] = cal.ns[ns] || api;
								p(cal.ns[ns], ar);
								p(cal, ['initNamespace', ns]);
							} else p(cal, ar);
							return;
						}
						p(cal, ar);
					};
			})(window, 'https://app.cal.com/embed/embed.js', 'init');
			(window as any).Cal('init', '30min', { origin: 'https://app.cal.com' });
			(window as any).Cal.ns['30min']('ui', {
				theme: 'light',
				hideEventTypeDetails: false,
				layout: 'month_view'
			});
		}
	});
</script>

<svelte:head>
	<title>Flowjoy – Custom Software & AI Automation for Small Businesses</title>
	<meta
		name="description"
		content="We build custom software, AI-powered apps, and automation systems for small businesses. No ghosting, no lock-in — just quality code and a team that stays."
	/>
	<meta
		name="keywords"
		content="custom software development, AI automation, small business software, agency software, SaaS development, AI agents, automation"
	/>
	<meta name="author" content="Flowjoy" />
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="UTF-8" />

	<link rel="canonical" href="https://www.flowjoy.online" />

	<meta
		property="og:title"
		content="Flowjoy – Custom Software & AI Automation for Small Businesses"
	/>
	<meta
		property="og:description"
		content="We build custom software, AI-powered apps, and automation systems for small businesses. No ghosting, no lock-in — just quality code and a team that stays."
	/>
	<meta
		property="og:image"
		content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/flowjoy/og.jpg"
	/>
	<meta property="og:image:alt" content="Flowjoy – Custom Software Agency" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content="https://www.flowjoy.online" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Flowjoy" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@_nagativeIQ" />
	<meta
		name="twitter:title"
		content="Flowjoy – Custom Software & AI Automation for Small Businesses"
	/>
	<meta
		name="twitter:description"
		content="We build custom software, AI-powered apps, and automation systems for small businesses. No ghosting, no lock-in."
	/>
	<meta
		name="twitter:image"
		content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/flowjoy/og.jpg"
	/>
	<meta name="twitter:image:alt" content="Flowjoy – Custom Software Agency" />

	<meta name="theme-color" content="#000000" />
	<meta name="application-name" content="Flowjoy" />
	<meta name="apple-mobile-web-app-title" content="Flowjoy" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "ProfessionalService",
			"name": "Flowjoy",
			"url": "https://www.flowjoy.online",
			"description": "Custom software development and AI automation agency for small businesses.",
			"serviceType": ["Custom Software Development", "AI Integration", "Business Automation"],
			"areaServed": "Worldwide",
			"author": {
				"@type": "Organization",
				"name": "Flowjoy"
			},
			"image": "https://rechatcreatorbook.s3.us-west-2.amazonaws.com/flowjoy/og.jpg"
		}
	</script>
</svelte:head>

<!-- Sticky Navbar -->
<div class="sticky top-0 z-50">
	<NavBar />
</div>

<main>
	<!-- 1. Hero -->
	<AgencyHero />

	<!-- 2. Work (Case Studies) -->
	<CaseStudiesSection {caseStudies} />
	<InlineCTA text="See something you like?" buttonText="Book a discovery call" />

	<!-- 3. What We Do -->
	<ServicesSection />
	<InlineCTA
		text="Tired of dealing with bad code and ghosting?"
		buttonText="Talk to a real engineer"
	/>

	<!-- 4. Process -->
	<ProcessSection />
	<InlineCTA text="Ready to sprint with us?" buttonText="Start your project" />

	<!-- 5. SaaS Promotion -->
	<div class="bg-white pb-12 pt-4">
		<SaaSPromoSection />
	</div>

	<!-- 6. Pricing & Final CTA -->
	<AgencyPricing />
	<AgencyCTA />

	<!-- 7. Footer -->
	<AgencyFooter />
</main>

<style>
</style>
