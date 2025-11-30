<script lang="ts">
	import { onMount } from 'svelte';
	import { Check, Sparkles, Zap, Shield, Users, ArrowRight, Star } from 'lucide-svelte';

	let billingPeriod = 'monthly'; // or 'annual'
	let spotsRemaining = 10; // Could be fetched from API

	const tiers = [
		{
			name: 'Free Demo',
			role: 'Try Before You Hire',
			planId: 'free',
			priceMonthly: '$0',
			priceAnnual: '$0',
			description: 'Experience the power of AI agents with our free demo. No credit card required.',
			features: [
				'1 Active Project',
				'2 AI Agents (Nai + Elio)',
				'SEO Keyword Research',
				'Blog Post Generation',
				'Reddit Lead Monitoring',
				'Community Support'
			],
			buttonText: 'Get Free Demo',
			icon: Sparkles,
			color: 'emerald',
			highlight: false,
			isLifetime: false,
			isFree: true
		},
		{
			name: 'The Intern',
			role: 'Starter Team',
			planId: 'starter',
			priceMonthly: '$17.40',
			priceAnnual: '$174',
			originalPriceMonthly: '$29',
			originalPriceAnnual: '$290',
			description: 'Perfect for solopreneurs testing the waters with AI-powered content.',
			features: [
				'3 Active Projects',
				'SEO Keyword Research (Nai)',
				'Competitor Analysis',
				'Blog Post Generation',
				'Reddit Lead Monitoring (Elio)',
				'Auto-Publish to WordPress'
			],
			buttonText: 'Hire Intern',
			icon: Users,
			color: 'blue',
			highlight: false,
			isLifetime: false
		},
		{
			name: 'The Pro Team',
			role: 'Full Marketing Squad',
			planId: 'pro',
			priceMonthly: '$47.40',
			priceAnnual: '$474',
			originalPriceMonthly: '$79',
			originalPriceAnnual: '$790',
			description: 'Unlimited projects with deep Reddit intelligence and advanced SEO.',
			features: [
				'Unlimited Projects',
				'Deep Keyword Research',
				'SEO-Optimized Articles',
				'Deep Reddit Scouring (Elio)',
				'Competitor Churn Detection',
				'Priority Support'
			],
			buttonText: 'Hire Team',
			icon: Zap,
			color: 'violet',
			highlight: true,
			isLifetime: false
		},
		{
			name: 'The Agency',
			role: 'White-Label Partner',
			planId: 'agency',
			priceMonthly: "Let's Talk",
			priceAnnual: "Let's Talk",
			description: 'Custom dashboard for agencies. Manage multiple clients under your brand.',
			features: [
				'Everything in Pro',
				'White-Label Dashboard',
				'Client Management Portal',
				'Custom Branding',
				'Dedicated Account Manager'
			],
			buttonText: "Let's Talk",
			icon: Shield,
			color: 'amber',
			highlight: false,
			isLifetime: false
		},
		{
			name: 'Lifetime Deal',
			role: 'Founding Member',
			planId: 'lifetime',
			priceMonthly: '$179.40',
			priceAnnual: '$179.40',
			originalPriceMonthly: '$299',
			originalPriceAnnual: '$299',
			description: 'One-time payment for lifetime access to the SaaS platform.',
			features: [
				'20 Active Projects',
				'All Future Updates',
				'Priority Support',
				'Community Access',
				'Early Feature Access'
			],
			buttonText: 'Get Lifetime Access',
			icon: Star,
			color: 'emerald',
			highlight: true,
			isLifetime: true,
			badge: `Only ${spotsRemaining} Spots Left`
		}
	];

	onMount(() => {
		// Initialize Cal.com embed
		if (typeof window !== 'undefined') {
			(function (C, A, L) {
				let p = function (a, ar) {
					a.q.push(ar);
				};
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
							const namespace = ar[1];
							api.q = api.q || [];
							if (typeof namespace === 'string') {
								cal.ns[namespace] = cal.ns[namespace] || api;
								p(cal.ns[namespace], ar);
								p(cal, ['initNamespace', namespace]);
							} else p(cal, ar);
							return;
						}
						p(cal, ar);
					};
			})(window, 'https://app.cal.com/embed/embed.js', 'init');
			window.Cal('init', '30min', { origin: 'https://app.cal.com' });
			window.Cal.ns['30min']('ui', {
				theme: 'light',
				hideEventTypeDetails: false,
				layout: 'month_view'
			});
		}
	});

	function handlePlanSelection(planId: string) {
		if (planId === 'custom' || planId === 'agency') {
			// Cal.com popup will be triggered by the data attributes on the button
			return;
		} else if (planId === 'free') {
			window.location.href = '/signup';
		} else {
			// Redirect to signup with plan context to avoid flicker from hitting authed route
			window.location.href = `/signup?plan=${planId}&billing=${billingPeriod}`;
		}
	}
</script>

<div
	id="pricing"
	class="dashboard-scale min-h-screen bg-zinc-50 font-[Poppins] relative overflow-hidden py-24"
>
	<!-- Background Elements -->
	<div
		class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none"
	></div>
	<div
		class="absolute top-40 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none"
	></div>
	<div
		class="absolute bottom-40 right-0 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl pointer-events-none"
	></div>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
		<!-- Header -->
		<div class="text-center mb-20 max-w-3xl mx-auto">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 shadow-sm mb-6"
			>
				<Sparkles class="w-4 h-4 text-amber-500 fill-amber-500" />
				<span class="text-sm font-medium text-zinc-600"
					>Stop paying for tools. Start hiring talent.</span
				>
			</div>

			<h1 class="text-5xl md:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
				Hire Your AI <span class="text-zinc-900">Workforce</span>
			</h1>
			<p class="text-xl text-zinc-500 font-light leading-relaxed">
				Don't just buy software. Onboard a 24/7 marketing team that researches, writes, and promotes
				for you.
			</p>
		</div>

		<!-- Black Friday Banner -->
		<div class="max-w-5xl mx-auto mb-12">
			<div class="relative group">
				<div
					class="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-[2rem] p-1 shadow-2xl transition-all duration-500 hover:-translate-y-1"
				>
					<div class="bg-zinc-900 rounded-[1.8rem] p-8 md:p-10 relative overflow-hidden">
						<!-- Background Glow -->
						<div
							class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 blur-3xl pointer-events-none"
						></div>

						<div class="relative z-10 text-center">
							<div
								class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 mb-4"
							>
								<svg
									class="w-5 h-5 text-orange-400 animate-pulse"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
									/>
								</svg>
								<span class="text-sm font-bold text-orange-400 uppercase tracking-wider"
									>Black Friday Deal</span
								>
							</div>

							<h3 class="text-3xl md:text-4xl font-bold text-white mb-3">40% OFF Everything 🎉</h3>
							<p class="text-lg text-zinc-400 mb-6">
								Including the Lifetime Deal! Limited time only.
							</p>

							<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
								<div
									class="flex items-center gap-3 bg-zinc-800/50 px-6 py-3 rounded-xl border border-zinc-700"
								>
									<span class="text-sm text-zinc-400">Use code:</span>
									<code class="text-xl font-mono font-bold text-orange-400 tracking-wider"
										>684G4GK4N2</code
									>
									<button
										on:click={() => {
											navigator.clipboard.writeText('684G4GK4N2');
											alert('Promo code copied to clipboard!');
										}}
										class="ml-2 p-2 hover:bg-zinc-700 rounded-lg transition-colors"
										aria-label="Copy promo code"
									>
										<svg
											class="w-4 h-4 text-zinc-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
											/>
										</svg>
									</button>
								</div>
							</div>

							<p class="text-xs text-zinc-500 mt-4">⏰ Offer ends soon • Apply code at checkout</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Lifetime Deal Banner -->
		<div class="max-w-5xl mx-auto mb-20">
			{#each tiers as tier}
				{#if tier.isLifetime}
					<div class="group relative">
						<div
							class="bg-white rounded-[2.5rem] p-2 border border-zinc-200 shadow-2xl transition-all duration-500 hover:-translate-y-1 relative z-10 ring-4 ring-amber-500/10"
						>
							<div
								class="bg-amber-50/30 rounded-[2rem] p-8 md:p-12 h-full relative overflow-hidden"
							>
								<!-- Background Glow -->
								<div
									class="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"
								></div>

								<div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
									<!-- Header -->
									<div class="text-center md:text-left">
										<div
											class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold mb-4 border border-amber-200"
										>
											<Star class="w-3 h-3 fill-amber-700" />
											LIMITED TIME OFFER
										</div>
										<h3 class="text-3xl font-bold text-zinc-900 mb-2">{tier.name}</h3>
										<p class="text-sm font-medium text-amber-600 uppercase tracking-wider mb-4">
											{tier.role}
										</p>
										<div class="flex flex-col items-center md:items-start gap-1 mb-2">
											{#if tier.originalPriceMonthly}
												<span class="text-2xl text-zinc-400 line-through">
													{tier.originalPriceMonthly}
												</span>
											{/if}
											<div class="flex items-baseline gap-2">
												<span class="text-5xl font-bold text-zinc-900">{tier.priceMonthly}</span>
												{#if tier.originalPriceMonthly}
													<span
														class="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-sm font-bold rounded-full"
													>
														40% OFF
													</span>
												{/if}
											</div>
										</div>
										<p class="text-sm text-zinc-500">One-time payment. Own it forever.</p>
									</div>

									<!-- Features -->
									<div class="bg-white/50 rounded-2xl p-6 border border-amber-100/50">
										<ul class="space-y-3">
											{#each tier.features as feature}
												<li class="flex items-start gap-3 text-sm text-zinc-700">
													<div
														class="mt-0.5 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0"
													>
														<Check class="w-3 h-3 text-amber-600" />
													</div>
													{feature}
												</li>
											{/each}
										</ul>
									</div>

									<!-- CTA -->
									<div class="text-center">
										<div
											class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-b from-white to-amber-50 border border-amber-200 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
										>
											<svelte:component this={tier.icon} class="w-10 h-10 text-amber-500" />
										</div>
										<button
											on:click={() => handlePlanSelection(tier.planId)}
											class="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800"
										>
											{tier.buttonText}
											<ArrowRight class="w-4 h-4" />
										</button>
										<p class="text-xs text-amber-600 mt-4 font-medium animate-pulse">
											{tier.badge}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Billing Toggle -->
		<div class="flex flex-col items-center mb-16">
			<div
				class="bg-white p-1.5 rounded-2xl border border-zinc-200 shadow-sm inline-flex relative mb-6"
			>
				<button
					class="px-6 py-3 rounded-xl text-sm font-medium transition-all relative z-10 {billingPeriod ===
					'monthly'
						? 'text-zinc-900'
						: 'text-zinc-500 hover:text-zinc-700'}"
					on:click={() => (billingPeriod = 'monthly')}
				>
					Monthly Salary
				</button>
				<button
					class="px-6 py-3 rounded-xl text-sm font-medium transition-all relative z-10 {billingPeriod ===
					'annual'
						? 'text-zinc-900'
						: 'text-zinc-500 hover:text-zinc-700'}"
					on:click={() => (billingPeriod = 'annual')}
				>
					Annual Contract <span class="text-emerald-600 text-xs font-bold ml-1">-20%</span>
				</button>

				<!-- Sliding Pill -->
				<div
					class="absolute top-1.5 bottom-1.5 rounded-xl bg-zinc-100 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] {billingPeriod ===
					'annual'
						? 'left-[calc(50%+3px)] w-[calc(50%-6px)]'
						: 'left-1.5 w-[calc(50%-6px)]'}"
				></div>
			</div>

			<!-- Reassurance Text -->
			<div
				class="flex items-center gap-3 text-sm font-medium text-zinc-500 bg-white px-6 py-3 rounded-full border border-zinc-200 shadow-sm mt-2"
			>
				<Shield class="w-4 h-4 text-emerald-500" />
				<span>Cancel anytime. No questions asked. We'll email you 2 days before trial ends.</span>
			</div>
		</div>

		<!-- Pricing Cards with Conduit Effect -->
		<div class="relative">
			<!-- The Conduit (Connecting Line) -->
			<div class="absolute top-[100px] left-0 right-0 h-1 bg-zinc-200 rounded-full hidden md:block">
				<div
					class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-300 to-transparent opacity-50"
				></div>
			</div>

			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-7xl mx-auto"
			>
				{#each tiers as tier}
					{#if !tier.isLifetime && !tier.isFree}
						<div class="group relative h-full">
							<!-- Card Container -->
							<div
								class="bg-white rounded-[2rem] p-2 border border-zinc-200 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative z-10 h-full {tier.highlight
									? 'ring-2 ring-violet-500/20'
									: ''}"
							>
								<!-- Inner Content -->
								<div class="bg-zinc-50/50 rounded-[1.5rem] p-8 h-full flex flex-col">
									<!-- Metallic Header Node -->
									<div
										class="w-16 h-16 mx-auto -mt-12 mb-6 rounded-full bg-gradient-to-b from-white to-zinc-100 border border-zinc-200 shadow-lg flex items-center justify-center relative z-20 group-hover:scale-110 transition-transform duration-500"
									>
										<svelte:component this={tier.icon} class="w-8 h-8 text-{tier.color}-500" />
									</div>

									<!-- Plan Info -->
									<div class="text-center mb-8">
										<h3 class="text-2xl font-bold text-zinc-900 mb-1">{tier.name}</h3>
										<p
											class="text-xs font-medium text-{tier.color}-600 uppercase tracking-wider mb-4"
										>
											{tier.role}
										</p>
										<div class="flex flex-col items-center justify-center gap-1 mb-4">
											{#if tier.originalPriceMonthly}
												<span class="text-lg text-zinc-400 line-through">
													{billingPeriod === 'monthly'
														? tier.originalPriceMonthly
														: tier.originalPriceAnnual}
												</span>
											{/if}
											<div class="flex items-baseline gap-1">
												<span class="text-4xl font-bold text-zinc-900">
													{billingPeriod === 'monthly' ? tier.priceMonthly : tier.priceAnnual}
												</span>
												<span class="text-zinc-400 text-sm">/mo</span>
											</div>
											{#if tier.originalPriceMonthly}
												<span
													class="inline-block px-2 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full"
												>
													40% OFF
												</span>
											{/if}
										</div>
										<p class="text-sm text-zinc-500 leading-relaxed min-h-[40px]">
											{tier.description}
										</p>
									</div>

									<!-- Features -->
									<ul class="space-y-4 mb-8 flex-grow">
										{#each tier.features as feature}
											<li class="flex items-start gap-3 text-sm text-zinc-600">
												<div
													class="mt-0.5 w-5 h-5 rounded-full bg-{tier.color}-50 flex items-center justify-center flex-shrink-0"
												>
													<Check class="w-3 h-3 text-{tier.color}-600" />
												</div>
												{feature}
											</li>
										{/each}
									</ul>

									<!-- CTA -->
									<button
										on:click={() => handlePlanSelection(tier.planId)}
										data-cal-link={tier.planId === 'agency' ? 'hafid-ahlaqach-nigixz/30min' : null}
										data-cal-namespace={tier.planId === 'agency' ? '30min' : null}
										data-cal-config={tier.planId === 'agency'
											? JSON.stringify({ layout: 'month_view', theme: 'light' })
											: null}
										class="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2
										{tier.highlight
											? 'bg-zinc-900 text-white hover:bg-zinc-800'
											: 'bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300'}"
									>
										{tier.buttonText}
										<ArrowRight class="w-4 h-4" />
									</button>

									<div class="text-center mt-4">
										<p class="text-sm font-bold text-zinc-900">14 Days Free Trial</p>
										<p class="text-xs text-zinc-400 mt-1">Cancel anytime</p>
									</div>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<!-- FAQ / "Interview" Section -->
		<div class="mt-32 max-w-4xl mx-auto">
			<h2 class="text-3xl font-bold text-zinc-900 mb-12 text-center">Common Interview Questions</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div
					class="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
				>
					<h3 class="font-bold text-zinc-900 mb-3 flex items-center gap-2">
						<div class="w-2 h-2 rounded-full bg-blue-500"></div>
						Do they work weekends?
					</h3>
					<p class="text-zinc-500 text-sm leading-relaxed">
						Yes. Your AI agents work 24/7/365. They don't take holidays, get sick, or ask for
						raises. They just ship content.
					</p>
				</div>
				<div
					class="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
				>
					<h3 class="font-bold text-zinc-900 mb-3 flex items-center gap-2">
						<div class="w-2 h-2 rounded-full bg-violet-500"></div>
						Can I fire them?
					</h3>
					<p class="text-zinc-500 text-sm leading-relaxed">
						Anytime. Cancel your subscription instantly with one click. But once you see the
						results, you'll probably want to promote them.
					</p>
				</div>
				<div
					class="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
				>
					<h3 class="font-bold text-zinc-900 mb-3 flex items-center gap-2">
						<div class="w-2 h-2 rounded-full bg-amber-500"></div>
						How fast do they learn?
					</h3>
					<p class="text-zinc-500 text-sm leading-relaxed">
						Instantly. They analyze your niche, competitors, and winning content in seconds to start
						generating high-quality output immediately.
					</p>
				</div>
				<div
					class="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
				>
					<h3 class="font-bold text-zinc-900 mb-3 flex items-center gap-2">
						<div class="w-2 h-2 rounded-full bg-emerald-500"></div>
						Do I need to manage them?
					</h3>
					<p class="text-zinc-500 text-sm leading-relaxed">
						Barely. Set your strategy once, and they execute daily. You just approve the work (or
						let them auto-publish).
					</p>
				</div>
			</div>
		</div>

		<!-- Final CTA -->
		<div class="mt-32 text-center">
			<div class="inline-flex flex-col items-center">
				<h2 class="text-4xl font-bold text-zinc-900 mb-6">Ready to make your first hire?</h2>
				<button
					on:click={() => handlePlanSelection('pro')}
					class="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-3 group"
				>
					Start Onboarding
					<ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
				</button>
				<p class="text-zinc-400 text-sm mt-6">14 days free trial • Cancel anytime</p>
			</div>
		</div>
	</main>
</div>

<style>
	.dashboard-scale {
		zoom: 0.9;
	}
	@supports not (zoom: 1) {
		.dashboard-scale {
			transform: scale(0.9);
			transform-origin: top center;
		}
	}
</style>
