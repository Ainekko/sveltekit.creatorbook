<script lang="ts">
	import { onMount } from 'svelte';
	export let data;

	import NavBar from '$lib/components/NavBar.svelte';
	import AgencyHero from '$lib/components/agency/AgencyHero.svelte';
	import CaseStudiesSection from '$lib/components/agency/CaseStudiesSection.svelte';
	import ServicesSection from '$lib/components/agency/ServicesSection.svelte';
	import HowItWorks from '$lib/components/agency/HowItWorks.svelte';
	import AgencyPricing from '$lib/components/agency/AgencyPricing.svelte';
	import WhyUs from '$lib/components/agency/WhyUs.svelte';
	import AgencyCTA from '$lib/components/agency/AgencyCTA.svelte';
	import AgencyFooter from '$lib/components/agency/AgencyFooter.svelte';
	import FloatingScheduler from '$lib/components/FloatingScheduler.svelte';

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
			(window as any).Cal('init', '15min', { origin: 'https://app.cal.com' });
			(window as any).Cal.ns['15min']('ui', {
				theme: 'light',
				hideEventTypeDetails: false,
				layout: 'month_view'
			});
		}
	});
</script>

<svelte:head>
	<title>Flowjoy – Custom AI Operating Systems for Your Business</title>
	<meta
		name="description"
		content="We scope, build, and maintain custom AI systems that handle your repetitive ops — calls, scheduling, follow-ups, intake — so your team focuses on what actually moves the needle. Starting at $999/mo."
	/>
	<meta
		name="keywords"
		content="custom AI system, business automation, AI operating system, AI agents, workflow automation, custom software development"
	/>
	<meta name="author" content="Flowjoy" />
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="UTF-8" />

	<link rel="canonical" href="https://www.flowjoy.online" />

	<meta property="og:title" content="Flowjoy – Custom AI Operating Systems for Your Business" />
	<meta
		property="og:description"
		content="We scope, build, and maintain custom AI systems that handle your repetitive ops — calls, scheduling, follow-ups, intake. Starting at $999/mo."
	/>
	<meta
		property="og:image"
		content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/flowjoy/og.jpg"
	/>
	<meta property="og:image:alt" content="Flowjoy – Custom AI Systems" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content="https://www.flowjoy.online" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Flowjoy" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@_nagativeIQ" />
	<meta name="twitter:title" content="Flowjoy – Custom AI Operating Systems for Your Business" />
	<meta
		name="twitter:description"
		content="We scope, build, and maintain custom AI systems that handle your repetitive ops — calls, scheduling, follow-ups, intake."
	/>
	<meta
		name="twitter:image"
		content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/flowjoy/og.jpg"
	/>
	<meta name="twitter:image:alt" content="Flowjoy – Custom AI Systems" />

	<meta name="theme-color" content="#09090B" />
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
			"description": "We scope, build, and maintain custom AI systems that handle your repetitive business operations — calls, scheduling, follow-ups, intake.",
			"serviceType": ["Custom AI Systems", "Business Automation", "AI Integration"],
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
	<!-- 1. Hero — Outcome-driven -->
	<AgencyHero />

	<!-- 2. Case Studies — Proof first -->
	<CaseStudiesSection {caseStudies} />

	<!-- 3. What We Build — Industry + concrete examples -->
	<ServicesSection />

	<!-- 4. How It Works — 3 steps -->
	<HowItWorks />

	<!-- 4. Pricing — Single plan -->
	<AgencyPricing />

	<!-- 5. Why Us — comparison table -->
	<WhyUs />

	<!-- 6. Final CTA -->
	<AgencyCTA />

	<!-- 6. Footer -->
	<AgencyFooter />
</main>
<FloatingScheduler />

<style>
</style>
