<script lang="ts">
	import { onMount } from 'svelte';

	import V2NavBar from '$lib/components/v2/V2NavBar.svelte';
	import V2Hero from '$lib/components/v2/V2Hero.svelte';
	import V2StatBanner from '$lib/components/v2/V2StatBanner.svelte';
	import V2CaseStudies from '$lib/components/v2/V2CaseStudies.svelte';
	import V2ProblemOutcome from '$lib/components/v2/V2ProblemOutcome.svelte';
	import V2Testimonial from '$lib/components/v2/V2Testimonial.svelte';
	import V2WhoIsFor from '$lib/components/v2/V2WhoIsFor.svelte';
	import ServicesSection from '$lib/components/agency/ServicesSection.svelte';
	import HowItWorks from '$lib/components/agency/HowItWorks.svelte';
	import AgencyPricing from '$lib/components/agency/AgencyPricing.svelte';
	import WhyUs from '$lib/components/agency/WhyUs.svelte';
	import AgencyCTA from '$lib/components/agency/AgencyCTA.svelte';
	import AgencyFooter from '$lib/components/agency/AgencyFooter.svelte';
	import FloatingScheduler from '$lib/components/FloatingScheduler.svelte';

	onMount(() => {
		// Cal.com global embed init
		if (typeof window !== 'undefined') {
			(function (C, A, L) {
				let p = (a, ar) => a.q.push(ar);
				let d = C.document;
				C.Cal =
					C.Cal ||
					function () {
						let cal = C.Cal;
						let ar = arguments;
						if (!cal.loaded) {
							cal.ns = {};
							cal.q = cal.q || [];
							d.head.appendChild(d.createElement('script')).src = A;
							cal.loaded = true;
						}
						if (ar[0] === L) {
							const api = function () {
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
			window.Cal('init', '15min', { origin: 'https://app.cal.com' });
			window.Cal.ns['15min']('ui', {
				theme: 'light',
				hideEventTypeDetails: false,
				layout: 'month_view'
			});
		}
	});
</script>

<svelte:head>
	<title>Flowjoy – AI Systems for Growing Businesses</title>
	<meta
		name="description"
		content="We build custom AI systems that handle your calls, bookings, follow-ups, and busywork — so your team focuses on closing. Working MVP in 4 weeks. You own the code."
	/>
	<meta property="og:title" content="Flowjoy – AI Systems for Growing Businesses" />
	<meta
		property="og:description"
		content="We build custom AI systems that handle your calls, bookings, follow-ups, and busywork — so your team focuses on closing. Working MVP in 4 weeks. You own the code."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://www.flowjoy.online" />
	<meta property="og:url" content="https://www.flowjoy.online" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Flowjoy – AI Systems for Growing Businesses" />
	<meta
		name="twitter:description"
		content="We build custom AI systems that handle your calls, bookings, follow-ups, and busywork — so your team focuses on closing."
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Poppins:wght@300;400;500;600;700&family=Pacifico&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- Navbar: white frosted glass, sticky -->
<div class="bg-white sticky top-0 z-50">
	<V2NavBar />
</div>

<!-- Hero: blur is clipped internally via clip-path on the section itself -->

<V2Hero />

<!-- Dark lower sections -->
<div class="bg-[#09090B]">
	<main>
		<!-- 1.5 Stat Banner Hook -->
		<V2StatBanner />

		<!-- 2. Case Studies — portfolio presentation -->
		<V2CaseStudies />

		<!-- 3. Problem → Outcome -->
		<V2ProblemOutcome />

		<!-- 4. What We Build — Industry-specific -->
		<ServicesSection />

		<!-- 5. Who Is This For -->
		<V2WhoIsFor />

		<!-- 6. How It Works -->
		<HowItWorks />

		<!-- 7. Pricing -->
		<AgencyPricing />

		<!-- 8. Why Us — comparison table -->
		<WhyUs />

		<!-- 9. Final CTA -->
		<AgencyCTA />

		<!-- 10. Footer -->
		<AgencyFooter />
	</main>
	<FloatingScheduler />
</div>
