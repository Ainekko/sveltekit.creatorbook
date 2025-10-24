<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { get_user } from '$lib/users/users';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let tier = 'free'; // default to free plan
	let billingPeriod = 'monthly';
	let loading = false;
	let error = '';
	let autoProcessing = false; // Flag to show if we're auto-processing from URL params

	let user_email: string | null = null;
	let user_id: number | string | null = null;
	let user_name: string | null = null;

	// Define tiers similar to pricing page, including free
	const tiers = [
		{
			name: 'Free',
			planId: 'free',
			priceMonthly: '$0',
			priceAnnual: '$0',
			description: 'Perfect for getting started and testing the waters.',
			features: [
				'1 project included',
				'All AI agents (Nai, Elio, Rio)',
				'Simple workflow builder',
				'Automated execution',
				'Email support'
			],
			buttonText: 'Continue for Free',
			gradient: 'from-gray-500 via-gray-600 to-gray-700',
			bgPattern: 'radial-gradient(circle at 50% 50%, rgba(107, 114, 128, 0.1) 0%, transparent 50%)',
			highlight: false,
			badge: ''
		},
		{
			name: 'Starter',
			planId: 'starter',
			priceMonthly: '$29',
			priceAnnual: '$290',
			description: 'Perfect for solopreneurs testing a few ideas.',
			features: [
				'3 projects included',
				'All AI agents (Nai, Elio, Rio)',
				'Daily automated execution',
				'WordPress & webhook integrations',
				'Email support'
			],
			buttonText: 'Start 14-day free trial',
			gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
			bgPattern: 'radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
			highlight: false,
			badge: ''
		},
		{
			name: 'Pro',
			planId: 'pro',
			priceMonthly: '$79',
			priceAnnual: '$790',
			description: 'Built for builders launching multiple products.',
			features: [
				'Unlimited projects',
				'All AI agents with priority execution',
				'Advanced analytics & A/B testing',
				'Custom content templates',
				'Priority support',
				'API access',
				'Team collaboration'
			],
			buttonText: 'Start 14-day free trial',
			gradient: 'from-blue-400 via-indigo-500 to-purple-600',
			bgPattern: 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
			highlight: true,
			badge: 'Most Value'
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

			if (user_data && user_data.user_id !== undefined && user_data.user_id !== null && user_data.email) {
				user_name = user_data.username || 'N/A';
				user_id = user_data.user_id;
				user_email = user_data.email;
				console.log('CLIENT: User data loaded:', { user_email, user_id, user_name });
			} else {
				console.error('CLIENT: Failed to load user data or data is incomplete from get_user.', user_data);
				error = 'Could not retrieve your complete user profile. Please try logging in again or refresh the page.';
				loading = false;
				return;
			}

			// If tier was pre-selected from pricing page, auto-process it
			if (selectedTier && tiers.find(t => t.planId === selectedTier)) {
				console.log('CLIENT: Auto-processing tier from URL:', selectedTier);
				autoProcessing = true;
				tier = selectedTier;
				billingPeriod = selectedBilling || 'monthly';
				
				// Small delay to show the auto-processing message
				await new Promise(resolve => setTimeout(resolve, 500));
				
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
		if (selectedTier === 'free') {
			billingPeriod = 'monthly'; // Reset for free
		}
	}

	async function submitSelection() {
		if (tier !== 'free' && (user_email === null || user_email === '' || user_id === null || user_id === undefined)) {
			error = 'User data is not fully loaded. Cannot proceed to payment. Please refresh the page.';
			console.warn('CLIENT: Submit selection aborted due to missing user data', { user_email, user_id });
			return;
		}

		loading = true;
		error = '';

		try {
			localStorage.setItem('tier', tier);
			localStorage.setItem('billingPeriod', billingPeriod);

			if (tier === 'free') {
				await goto('/projects');
			} else {
				if (user_email && (user_id !== null && user_id !== undefined)) {
					await handlePaidTier();
				} else {
					error = "User information is missing. Cannot initiate payment.";
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
		console.log('CLIENT: handlePaidTier called. Sending to /plans/checkout:', { userEmail: user_email, userID: user_id, tier, billingPeriod });

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
					billingPeriod 
				})
			});

			const responseText = await response.text();
			console.log(`CLIENT: Raw response from /plans/checkout (Status: ${response.status}):`, responseText);

			let responseData;
			try {
				responseData = JSON.parse(responseText);
			} catch (parseError) {
				console.error('CLIENT: Failed to parse JSON response from /plans/checkout. Raw text was:', responseText, 'Parse error:', parseError);
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
				console.error(`CLIENT: Checkout creation failed. Source: ${responseData?.source || 'unknown'}, Server Status: ${response.status}, Full ResponseData:`, responseData);
			}
		} catch (err) {
			console.error('CLIENT: Network or unexpected error in handlePaidTier:', err);
			error = 'A network error occurred while trying to create checkout. Please check your connection and try again.';
		}
	}
</script>

<svelte:head>
	<title>Select Your Plan | Your AI Marketing Team</title>
</svelte:head>

<div class="dashboard-scale min-h-screen text-white bg-black font-[Poppins]">
	<main class="px-4 sm:px-8 py-16">
		<!-- Header -->
		<div class="text-center mb-16 max-w-4xl mx-auto" in:fade={{ duration: 300, delay: 100 }}>
			<h1 class="text-4xl md:text-5xl font-semibold text-white mb-4">
				{autoProcessing && loading ? 'Setting Up Your Plan' : 'Select Your Plan'}
			</h1>
			<p class="text-zinc-400 text-lg md:text-xl mb-8 font-light">
				{autoProcessing && loading 
					? `Preparing your ${tier} plan with ${billingPeriod} billing...` 
					: 'Choose the perfect plan to unlock the full potential of our AI agents.'
				}
			</p>
		</div>

		<!-- Error Message -->
		{#if error}
			<div class="max-w-4xl mx-auto mb-6" in:fly={{ y: 20, duration: 300 }}>
				<div class="bg-gradient-to-r from-red-950 to-red-800 rounded-2xl border border-red-800 p-6 text-left">
					<div class="flex items-center">
						<div class="mr-4 bg-red-200/20 p-3 rounded-full flex-shrink-0">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.034 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
						</div>
						<div>
							<p class="text-red-200 font-medium">{error}</p>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Loading Spinner for Auto-Processing -->
		{#if loading && autoProcessing}
			<div class="flex flex-col items-center justify-center py-12 max-w-md mx-auto" in:fade={{ duration: 300 }}>
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
				<p class="text-zinc-400 text-lg">One moment while we set up your {tiers.find(t => t.planId === tier)?.name} plan...</p>
			</div>
		{/if}

		<!-- Plan Selection UI -->
		{#if !loading || !autoProcessing}
			<!-- Billing Toggle (hide for free tier) -->
			{#if tier !== 'free'}
				<div class="text-center mb-8 max-w-md mx-auto" in:fly={{ y: 20, duration: 300, delay: 200 }}>
					<div class="inline-flex bg-zinc-950 rounded-full p-1 border border-zinc-800">
						<button 
							class="px-6 py-2 rounded-full text-sm font-medium transition-all {billingPeriod === 'monthly' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}"
							on:click={() => billingPeriod = 'monthly'}
						>
							Monthly
						</button>
						<button 
							class="px-6 py-2 rounded-full text-sm font-medium transition-all {billingPeriod === 'annual' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}"
							on:click={() => billingPeriod = 'annual'}
						>
							Annual <span class="text-emerald-400">(Save 20%)</span>
						</button>
					</div>
				</div>
			{/if}

			<!-- Pricing Grid -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full" in:fly={{ y: 20, duration: 300, delay: 400 }}>
				{#each tiers as t}
					<div 
						class="plan-card bg-zinc-950 rounded-2xl border {t.highlight ? 'border-blue-500 shadow-lg shadow-blue-500/20 scale-105' : 'border-zinc-800'} {t.planId === tier ? 'ring-2 ring-blue-500/30' : ''} overflow-visible hover:border-zinc-700 transition-all duration-300 relative cursor-pointer"
						style="background-image: {t.bgPattern}"
						on:click={() => selectTier(t.planId)}
					>
						{#if t.badge}
							<div class="absolute z-10 -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium px-4 py-1 rounded-full">
								{t.badge}
							</div>
						{/if}
						
						<!-- Tier Header -->
						<div class="p-8 bg-gradient-to-r rounded-2xl {t.gradient}">
							<h3 class="text-2xl font-bold text-white mb-2">{t.name}</h3>
							<div class="text-white/90 text-sm mb-6 min-h-[40px]">{t.description}</div>
							<div class="text-4xl font-bold text-white">
								{t.planId === 'free' 
									? t.priceMonthly 
									: billingPeriod === 'monthly' ? t.priceMonthly : t.priceAnnual
								}
								<span class="text-base font-normal text-white/80 ml-1">
									{t.planId === 'free' ? '' : billingPeriod === 'monthly' ? '/month' : '/year'}
								</span>
							</div>
						</div>

						<!-- Features -->
						<div class="p-8">
							<ul class="space-y-4 mb-8">
								{#each t.features as feature}
									<li class="flex items-start text-sm text-zinc-300">
										<svg class="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
										</svg>
										{feature}
									</li>
								{/each}
							</ul>

							<!-- Selection Indicator -->
							{#if t.planId === tier}
								<div class="flex items-center justify-center mb-4">
									<svg class="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm text-blue-400 font-medium">Selected</span>
								</div>
							{/if}

							<!-- CTA Button (disabled style for non-selected) -->
							<button 
								disabled={t.planId !== tier || loading}
								on:click|stopPropagation={submitSelection}
								class="w-full {t.planId === tier 
									? (t.highlight ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : 'bg-zinc-800 hover:bg-zinc-700') 
									: 'bg-zinc-900 text-zinc-500 cursor-not-allowed'
								} text-white px-6 py-4 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg {t.planId !== tier ? 'opacity-50' : ''}"
							>
								{t.buttonText}
							</button>
							
							{#if t.buttonText.includes('trial') && t.planId === tier}
								<p class="text-xs text-zinc-500 text-center mt-3 flex items-center justify-center gap-1">
									<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
									</svg>
								</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<!-- Submit Button -->
			<div class="text-center mt-12 max-w-md mx-auto" in:fly={{ y: 20, duration: 300, delay: 600 }}>
				<button 
					on:click={submitSelection}
					disabled={loading}
					class="w-full {tier === 'free' 
						? 'bg-emerald-600 hover:bg-emerald-700' 
						: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
					} text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{#if loading}
						<span class="flex items-center justify-center gap-2">
							<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
							Processing...
						</span>
					{:else}
						{tier === 'free' ? 'Continue to Dashboard' : `Start ${billingPeriod === 'annual' ? 'Annual' : 'Monthly'} Trial`}
					{/if}
				</button>
				{#if tier !== 'free'}
					<p class="text-xs text-zinc-500 mt-3">Cancel anytime</p>
				{/if}
			</div>
		{/if}

		<!-- What You Get Section (shared across plans, like pricing page) -->
		<div class="max-w-6xl mx-auto mt-24 bg-zinc-950 rounded-2xl border border-zinc-800 p-8 md:p-12" in:fade={{ duration: 300, delay: 800 }}>
			<h2 class="text-2xl md:text-3xl font-semibold text-white mb-8 text-center">
				All plans include your AI marketing team
			</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="text-center">
					<div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white mb-2">Nai - SEO Agent</h3>
					<p class="text-sm text-zinc-400">Keywords → Outlines → Posts → Auto-publish. Set it once, watch it run daily.</p>
				</div>
				<div class="text-center">
					<div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 00.029.463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white mb-2">Elio - Reddit Agent</h3>
					<p class="text-sm text-zinc-400">Finds relevant threads where you can add value. Fresh opportunities delivered daily.</p>
				</div>
				<div class="text-center">
					<div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white mb-2">Rio - X Agent</h3>
					<p class="text-sm text-zinc-400">Discovers conversations on X where your expertise matters. Never miss an opportunity.</p>
				</div>
			</div>
		</div>

		<!-- FAQ Section -->
		<div class="mt-24 text-center max-w-6xl mx-auto" in:fade={{ duration: 300, delay: 1000 }}>
			<h2 class="text-3xl font-semibold text-white mb-12">Questions? We've got answers.</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="bg-zinc-950 rounded-xl p-8 border border-zinc-800 text-left hover:border-zinc-700 transition-all">
					<h3 class="text-white font-medium mb-3 text-lg">What's a project?</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">A project is a product you're marketing. Each project gets access to all three AI agents (Nai, Elio, Rio) working daily to grow your presence.</p>
				</div>
				<div class="bg-zinc-950 rounded-xl p-8 border border-zinc-800 text-left hover:border-zinc-700 transition-all">
					<h3 class="text-white font-medium mb-3 text-lg">How does the free trial work?</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">14 days, full access to everything. No credit card needed. If you love it, keep going. If not, no hard feelings.</p>
				</div>
				<div class="bg-zinc-950 rounded-xl p-8 border border-zinc-800 text-left hover:border-zinc-700 transition-all">
					<h3 class="text-white font-medium mb-3 text-lg">Can I switch plans anytime?</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">Absolutely. Upgrade when you're launching more projects, downgrade if you need to pause. Changes take effect immediately.</p>
				</div>
				<div class="bg-zinc-950 rounded-xl p-8 border border-zinc-800 text-left hover:border-zinc-700 transition-all">
					<h3 class="text-white font-medium mb-3 text-lg">What if I need custom agents?</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">That's what Custom is for. We'll build specialized marketing assistants tailored to your niche and strategy. <a href="/contact" class="text-blue-400 hover:underline">Contact us</a>.</p>
				</div>
			</div>
		</div>
	</main>
</div>

<style>
	.dashboard-scale {
    zoom: 0.8;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @supports not (zoom: 1) {
    .dashboard-scale {
      transform: scale(0.8);
      transform-origin: top left;
      width: 125%;
    }
  }
	.plan-card {
		transition: all 0.3s ease;
	}

	.plan-card:hover {
		transform: translateY(-2px);
	}

	.plan-card.selected {
		transform: translateY(-1px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	}
</style>