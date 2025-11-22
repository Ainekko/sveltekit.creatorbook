<script lang="ts">
	import { onMount } from 'svelte';
	import { Check, Sparkles, Zap, Shield, Users, ArrowRight, Star } from 'lucide-svelte';

	let billingPeriod = 'monthly'; // or 'annual'
	let spotsRemaining = 10; // Could be fetched from API

	const tiers = [
		{
			name: 'The Intern',
			role: 'Starter Team',
			planId: 'starter',
			priceMonthly: '$29',
			priceAnnual: '$290',
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
			priceMonthly: '$79',
			priceAnnual: '$790',
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
			priceMonthly: '$299',
			priceAnnual: '$299',
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

	function handlePlanSelection(planId: string) {
		if (planId === 'custom' || planId === 'agency') {
			window.location.href = '/contact-us';
		} else {
			window.location.href = `/plans?selected=${planId}&billing=${billingPeriod}`;
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
					class="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-zinc-100 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] {billingPeriod ===
					'annual'
						? 'left-[calc(50%+3px)]'
						: 'left-1.5'}"
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
										<div class="flex items-baseline justify-center md:justify-start gap-1 mb-2">
											<span class="text-5xl font-bold text-zinc-900">{tier.priceMonthly}</span>
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

		<!-- Pricing Cards with Conduit Effect -->
		<div class="relative">
			<!-- The Conduit (Connecting Line) -->
			<div class="absolute top-[100px] left-0 right-0 h-1 bg-zinc-200 rounded-full hidden md:block">
				<div
					class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-300 to-transparent opacity-50"
				></div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
				{#each tiers as tier}
					{#if !tier.isLifetime}
						<div class="group relative">
							<!-- Card Container -->
							<div
								class="bg-white rounded-[2rem] p-2 border border-zinc-200 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative z-10 {tier.highlight
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
										<div class="flex items-baseline justify-center gap-1 mb-4">
											<span class="text-4xl font-bold text-zinc-900">
												{billingPeriod === 'monthly' ? tier.priceMonthly : tier.priceAnnual}
											</span>
											<span class="text-zinc-400 text-sm">/mo</span>
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
										<p class="text-xs text-zinc-400 mt-1">No credit card required</p>
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
				<p class="text-zinc-400 text-sm mt-6">No credit card required for trial • Cancel anytime</p>
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
