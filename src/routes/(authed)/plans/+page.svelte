<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LifetimeModal from '$lib/components/LifetimeModal.svelte';
	import { get_user } from '$lib/users/users';
	import { onMount } from 'svelte';
	import { Check, Sparkles, Zap, Shield, Users, ArrowRight, Star } from 'lucide-svelte';

	let tier = 'free'; // default to free plan
	let billingPeriod = 'monthly';
	let loading = false;
	let error = '';
	let autoProcessing = false; // Flag to show if we're auto-processing from URL params

	let user_email: string | null = null;
	let user_id: number | string | null = null;
	let user_name: string | null = null;

	// Define tiers similar to pricing page, including free and lifetime
	// Define tiers matching NewPricing.svelte
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
			badge: 'Limited Offer'
		}
	];

	onMount(async () => {
		loading = true;
		error = '';

		try {
			// Get URL parameters
			const selectedTier = $page.url.searchParams.get('selected');
			const selectedBilling = $page.url.searchParams.get('billing');

			// Load user data
			const user_data = await get_user();
			console.log('CLIENT: onMount get_user response:', user_data);

			if (
				user_data &&
				user_data.user_id !== undefined &&
				user_data.user_id !== null &&
				user_data.email
			) {
				user_name = user_data.username || 'N/A';
				user_id = user_data.user_id;
				user_email = user_data.email;
				console.log('CLIENT: User data loaded:', { user_email, user_id, user_name });
			} else {
				console.error(
					'CLIENT: Failed to load user data or data is incomplete from get_user.',
					user_data
				);
				error =
					'Could not retrieve your complete user profile. Please try logging in again or refresh the page.';
				loading = false;
				return;
			}

			// If tier was pre-selected from pricing page, auto-process it
			if (selectedTier && tiers.find((t) => t.planId === selectedTier)) {
				console.log('CLIENT: Auto-processing tier from URL:', selectedTier);
				autoProcessing = true;
				tier = selectedTier;

				// Set billing period (lifetime doesn't need one, but we'll default to monthly)
				if (selectedTier === 'lifetime') {
					billingPeriod = 'monthly'; // Doesn't matter for lifetime, but keep it consistent
				} else {
					billingPeriod = selectedBilling || 'monthly';
				}

				// Small delay to show the auto-processing message
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Auto-submit the selection
				await submitSelection();
			}
		} catch (e) {
			console.error('CLIENT: Error in onMount while fetching user:', e);
			error = 'An error occurred while loading your profile. Please refresh the page.';
		} finally {
			if (!autoProcessing) {
				loading = false;
			}
		}
	});

	function selectTier(selectedTier: string) {
		tier = selectedTier;
		error = '';
	}

	async function submitSelection() {
		// Redirect agency tier to contact page
		if (tier === 'agency') {
			await goto('/contact-us');
			return;
		}

		if (
			tier !== 'free' &&
			(user_email === null || user_email === '' || user_id === null || user_id === undefined)
		) {
			error = 'User data is not fully loaded. Cannot proceed to payment. Please refresh the page.';
			console.warn('CLIENT: Submit selection aborted due to missing user data', {
				user_email,
				user_id
			});
			return;
		}

		loading = true;
		error = '';

		try {
			localStorage.setItem('tier', tier);
			localStorage.setItem('billingPeriod', tier === 'lifetime' ? 'lifetime' : billingPeriod);

			if (tier === 'free') {
				await goto('/projects');
			} else {
				if (user_email && user_id !== null && user_id !== undefined) {
					await handlePaidTier();
				} else {
					error = 'User information is missing. Cannot initiate payment.';
					console.error(error, { user_email, user_id });
				}
			}
		} catch (err) {
			error = 'Something went wrong during plan selection. Please try again.';
			console.error('CLIENT: Submit selection error:', err);
		} finally {
			loading = false;
			autoProcessing = false;
		}
	}

	async function handlePaidTier() {
		console.log('CLIENT: handlePaidTier called. Sending to /plans/checkout:', {
			userEmail: user_email,
			userID: user_id,
			tier,
			billingPeriod: tier === 'lifetime' ? 'lifetime' : billingPeriod
		});

		try {
			const response = await fetch('/plans/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userEmail: user_email!,
					userID: user_id!,
					tier,
					billingPeriod: tier === 'lifetime' ? 'lifetime' : billingPeriod
				})
			});

			const responseText = await response.text();
			console.log(
				`CLIENT: Raw response from /plans/checkout (Status: ${response.status}):`,
				responseText
			);

			let responseData;
			try {
				responseData = JSON.parse(responseText);
			} catch (parseError) {
				console.error(
					'CLIENT: Failed to parse JSON response from /plans/checkout. Raw text was:',
					responseText,
					'Parse error:',
					parseError
				);
				error = `Received an unexpected response from the server (Status: ${response.status}). Please check server logs or contact support.`;
				if (responseText && responseText.length < 200 && !responseText.trim().startsWith('<')) {
					error += ` Server said: ${responseText}`;
				}
				return;
			}

			console.log('CLIENT: Parsed responseData from /plans/checkout:', responseData);

			if (response.ok && responseData.source === 'creem_success' && responseData.url) {
				console.log('CLIENT: Received checkout URL:', responseData.url);
				window.location.href = responseData.url;
			} else {
				let displayError = 'Failed to create checkout session. Unknown error.';
				if (responseData && responseData.error) {
					displayError = responseData.error;
					if (responseData.source === 'creem_api_error' && responseData.creem_details) {
						try {
							const creemErrorDetails = JSON.parse(responseData.creem_details);
							if (creemErrorDetails.message) {
								displayError += ` (Creem: ${creemErrorDetails.message})`;
							} else {
								displayError += ` (Creem details: ${responseData.creem_details})`;
							}
						} catch (e) {
							displayError += ` (Creem details: ${responseData.creem_details})`;
						}
					} else if (responseData.details) {
						displayError += ` (Details: ${responseData.details})`;
					}
				} else if (!response.ok) {
					displayError = `Server responded with status ${response.status}.`;
				}

				error = displayError;
				console.error(
					`CLIENT: Checkout creation failed. Source: ${responseData?.source || 'unknown'}, Server Status: ${response.status}, Full ResponseData:`,
					responseData
				);
			}
		} catch (err) {
			console.error('CLIENT: Network or unexpected error in handlePaidTier:', err);
			error =
				'A network error occurred while trying to create checkout. Please check your connection and try again.';
		}
	}

	// Handle card keyboard interaction for accessibility
	function handleCardKeydown(event: KeyboardEvent, planId: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectTier(planId);
		}
	}
</script>

<svelte:head>
	<title>Select Your Plan | Your AI Marketing Team</title>
</svelte:head>

<div class="dashboard-scale min-h-screen bg-zinc-50 font-[Poppins] relative overflow-hidden py-12">
	<LifetimeModal />

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
		<div class="text-center mb-16 max-w-3xl mx-auto">
			<h1 class="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
				{autoProcessing && loading ? 'Setting Up Your Plan' : 'Select Your Plan'}
			</h1>
			<p class="text-xl text-zinc-500 font-light leading-relaxed">
				{autoProcessing && loading
					? `Preparing your ${tier} plan...`
					: 'Choose the perfect plan to unlock the full potential of your AI workforce.'}
			</p>
		</div>

		<!-- Error Message -->
		{#if error}
			<div class="max-w-4xl mx-auto mb-8">
				<div
					class="bg-red-50 rounded-2xl border border-red-200 p-6 text-left flex items-center gap-4"
				>
					<div class="bg-red-100 p-2 rounded-full flex-shrink-0">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-red-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.034 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<p class="text-red-700 font-medium">{error}</p>
				</div>
			</div>
		{/if}

		<!-- Loading Spinner for Auto-Processing -->
		{#if loading && autoProcessing}
			<div class="flex flex-col items-center justify-center py-12 max-w-md mx-auto">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mb-4"></div>
				<p class="text-zinc-500 text-lg">One moment please...</p>
			</div>
		{/if}

		<!-- Plan Selection UI -->
		{#if !loading || !autoProcessing}
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
					<svg
						class="w-4 h-4 text-emerald-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
					<span>Cancel anytime. No questions asked. We'll email you 2 days before trial ends.</span>
				</div>
			</div>

			<!-- Lifetime Deal Banner -->
			<div class="max-w-5xl mx-auto mb-20">
				{#each tiers as t}
					{#if t.isLifetime}
						<div class="group relative cursor-pointer" on:click={() => selectTier(t.planId)}>
							<div
								class="bg-white rounded-[2.5rem] p-2 border transition-all duration-500 hover:-translate-y-1 relative z-10 ring-4 {tier ===
								t.planId
									? 'border-amber-500 shadow-2xl ring-amber-500/20'
									: 'border-zinc-200 shadow-xl ring-amber-500/5'}"
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
											<h3 class="text-3xl font-bold text-zinc-900 mb-2">{t.name}</h3>
											<p class="text-sm font-medium text-amber-600 uppercase tracking-wider mb-4">
												{t.role}
											</p>
											<div class="flex items-baseline justify-center md:justify-start gap-1 mb-2">
												<span class="text-5xl font-bold text-zinc-900">{t.priceMonthly}</span>
											</div>
											<p class="text-sm text-zinc-500">One-time payment. Own it forever.</p>
										</div>

										<!-- Features -->
										<div class="bg-white/50 rounded-2xl p-6 border border-amber-100/50">
											<ul class="space-y-3">
												{#each t.features as feature}
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
												<svelte:component this={t.icon} class="w-10 h-10 text-amber-500" />
											</div>
											<button
												on:click|stopPropagation={() => {
													selectTier(t.planId);
													submitSelection();
												}}
												class="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800"
											>
												{loading && tier === t.planId ? 'Processing...' : t.buttonText}
												{#if !loading || tier !== t.planId}
													<ArrowRight class="w-4 h-4" />
												{/if}
											</button>
											<p class="text-xs text-amber-600 mt-4 font-medium animate-pulse">
												{t.badge}
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
				<div
					class="absolute top-[100px] left-0 right-0 h-1 bg-zinc-200 rounded-full hidden md:block"
				>
					<div
						class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-300 to-transparent opacity-50"
					></div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
					{#each tiers as t}
						{#if !t.isLifetime}
							<div class="group relative cursor-pointer" on:click={() => selectTier(t.planId)}>
								<!-- Card Container -->
								<div
									class="bg-white rounded-[2rem] p-2 border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative z-10 {tier ===
									t.planId
										? 'border-violet-500 ring-2 ring-violet-500/20 shadow-xl'
										: 'border-zinc-200 shadow-xl'}"
								>
									<!-- Inner Content -->
									<div class="bg-zinc-50/50 rounded-[1.5rem] p-8 h-full flex flex-col">
										<!-- Metallic Header Node -->
										<div
											class="w-16 h-16 mx-auto -mt-12 mb-6 rounded-full bg-gradient-to-b from-white to-zinc-100 border border-zinc-200 shadow-lg flex items-center justify-center relative z-20 group-hover:scale-110 transition-transform duration-500"
										>
											<svelte:component this={t.icon} class="w-8 h-8 text-{t.color}-500" />
										</div>

										<!-- Plan Info -->
										<div class="text-center mb-8">
											<h3 class="text-2xl font-bold text-zinc-900 mb-1">{t.name}</h3>
											<p
												class="text-xs font-medium text-{t.color}-600 uppercase tracking-wider mb-4"
											>
												{t.role}
											</p>
											<div class="flex items-baseline justify-center gap-1 mb-4">
												<span class="text-4xl font-bold text-zinc-900">
													{billingPeriod === 'monthly' ? t.priceMonthly : t.priceAnnual}
												</span>
												<span class="text-zinc-400 text-sm">/mo</span>
											</div>
											<p class="text-sm text-zinc-500 leading-relaxed min-h-[40px]">
												{t.description}
											</p>
										</div>

										<!-- Features -->
										<ul class="space-y-4 mb-8 flex-grow">
											{#each t.features as feature}
												<li class="flex items-start gap-3 text-sm text-zinc-600">
													<div
														class="mt-0.5 w-5 h-5 rounded-full bg-{t.color}-50 flex items-center justify-center flex-shrink-0"
													>
														<Check class="w-3 h-3 text-{t.color}-600" />
													</div>
													{feature}
												</li>
											{/each}
										</ul>

										<!-- CTA -->
										<button
											on:click|stopPropagation={() => {
												selectTier(t.planId);
												submitSelection();
											}}
											class="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2
											{tier === t.planId
												? 'bg-zinc-900 text-white hover:bg-zinc-800'
												: 'bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300'}"
										>
											{loading && tier === t.planId ? 'Processing...' : t.buttonText}
											{#if !loading || tier !== t.planId}
												<ArrowRight class="w-4 h-4" />
											{/if}
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
				<h2 class="text-3xl font-bold text-zinc-900 mb-12 text-center">
					Common Interview Questions
				</h2>
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
							Instantly. They analyze your niche, competitors, and winning content in seconds to
							start generating high-quality output immediately.
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
		{/if}
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
