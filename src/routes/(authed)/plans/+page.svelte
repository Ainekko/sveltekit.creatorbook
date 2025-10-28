<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { get_user } from '$lib/users/users';
	import { onMount } from 'svelte';

	let tier = 'free'; // default to free plan
	let billingPeriod = 'monthly';
	let loading = false;
	let error = '';
	let autoProcessing = false; // Flag to show if we're auto-processing from URL params

	let user_email: string | null = null;
	let user_id: number | string | null = null;
	let user_name: string | null = null;

	// Define tiers similar to pricing page, including free and lifetime
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
			badge: '',
			isLifetime: false
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
			badge: '',
			isLifetime: false
		},
		{
			name: 'Lifetime',
			planId: 'lifetime',
			priceMonthly: '$299',
			priceAnnual: '$299',
			description: 'Pay once, market forever. Limited availability.',
			features: [
				'5 projects included',
				'All AI agents with priority execution',
				'Advanced analytics & A/B testing',
				'Custom content templates',
				'Lifetime updates & support',
				'API access',
				'Early access to new features'
			],
			buttonText: 'Claim Your Spot',
			gradient: 'from-amber-400 via-orange-500 to-red-600',
			bgPattern: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
			highlight: true,
			badge: 'Limited Offer',
			isLifetime: true
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
			highlight: false,
			badge: '',
			isLifetime: false
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
				
				// Set billing period (lifetime doesn't need one, but we'll default to monthly)
				if (selectedTier === 'lifetime') {
					billingPeriod = 'monthly'; // Doesn't matter for lifetime, but keep it consistent
				} else {
					billingPeriod = selectedBilling || 'monthly';
				}
				
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
			localStorage.setItem('billingPeriod', tier === 'lifetime' ? 'lifetime' : billingPeriod);

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

<div class="dashboard-scale w-full min-h-screen text-white bg-black font-[Poppins]">
	<main class="px-4 sm:px-8 py-16">
		<!-- Header -->
		<div class="text-center mb-16 max-w-4xl mx-auto">
			<h1 class="text-4xl md:text-5xl font-semibold text-white mb-4">
				{autoProcessing && loading ? 'Setting Up Your Plan' : 'Select Your Plan'}
			</h1>
			<p class="text-zinc-400 text-lg md:text-xl mb-8 font-light">
				{autoProcessing && loading 
					? `Preparing your ${tier} plan${tier !== 'lifetime' ? ` with ${billingPeriod} billing` : ''}...` 
					: 'Choose the perfect plan to unlock the full potential of our AI agents.'
				}
			</p>
		</div>

		<!-- Error Message -->
		{#if error}
			<div class="max-w-4xl mx-auto mb-6">
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
			<div class="flex flex-col items-center justify-center py-12 max-w-md mx-auto">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
				<p class="text-zinc-400 text-lg">One moment while we set up your {tiers.find(t => t.planId === tier)?.name} plan...</p>
			</div>
		{/if}

		<!-- Plan Selection UI -->
		{#if !loading || !autoProcessing}
			<!-- Billing Toggle (hide for free tier and lifetime) -->
			<div class="text-center mb-8 max-w-md mx-auto">
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

			<!-- Pricing Grid -->
			{#if loading}
				<div class="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-7xl mx-auto w-full">
					{#each [1, 2, 3, 4] as _}
						<div class="bg-zinc-950 rounded-2xl border border-zinc-800 h-[700px] animate-pulse">
							<div class="p-8 bg-zinc-800 rounded-t-2xl h-40"></div>
							<div class="p-8 space-y-4">
								<div class="h-4 bg-zinc-800 rounded w-3/4"></div>
								<div class="h-4 bg-zinc-800 rounded w-1/2"></div>
								<div class="h-4 bg-zinc-800 rounded w-2/3"></div>
								<div class="h-4 bg-zinc-800 rounded w-3/4"></div>
								<div class="h-4 bg-zinc-800 rounded w-1/2"></div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-7xl mx-auto w-full">
					{#each tiers as t}
						{@const displayPrice = (t.isLifetime || t.planId === 'free') ? t.priceMonthly : (billingPeriod === 'monthly' ? t.priceMonthly : t.priceAnnual)}
						{@const priceSubtext = t.planId === 'free' ? '' : (t.isLifetime ? 'one-time' : (billingPeriod === 'monthly' ? '/month' : '/year'))}
						<div 
							role="button"
							tabindex="0"
							class="plan-card bg-zinc-950 rounded-2xl border {t.highlight ? 'border-amber-500 shadow-lg shadow-amber-500/20' : 'border-zinc-800'} overflow-visible relative cursor-pointer flex flex-col h-[700px]"
							style="background-image: {t.bgPattern}"
							on:click={() => selectTier(t.planId)}
							on:keydown={(e) => handleCardKeydown(e, t.planId)}
						>
							{#if t.badge}
								<div class="absolute z-10 -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r {t.isLifetime ? 'from-amber-500 to-red-600' : 'from-blue-500 to-purple-600'} text-white text-xs font-medium px-4 py-1 rounded-full">
									{t.badge}
								</div>
							{/if}
							
							<!-- Tier Header -->
							<div class="p-8 bg-gradient-to-r rounded-2xl {t.gradient}">
								<h3 class="text-2xl font-bold text-white mb-2">{t.name}</h3>
								<div class="text-white/90 text-sm mb-6 min-h-[40px]">{t.description}</div>
								<div class="text-4xl font-bold text-white">
									{displayPrice}
									<span class="text-base font-normal text-white/80 ml-1">
										{priceSubtext}
									</span>
								</div>
							</div>

							<!-- Features - flex-grow to push button down -->
							<div class="p-8 flex-grow flex flex-col">
								<ul class="space-y-4 mb-8 flex-grow">
									{#each t.features as feature}
										<li class="flex items-start text-sm text-zinc-300">
											<svg class="w-5 h-5 {t.isLifetime ? 'text-amber-400' : 'text-emerald-400'} mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
											</svg>
											{feature}
										</li>
									{/each}
								</ul>

								<!-- Bottom section with fixed position -->
								<div>
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
											? (t.isLifetime ? 'bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700' : t.highlight ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : 'bg-zinc-800 hover:bg-zinc-700') 
											: 'bg-zinc-900 text-zinc-500 cursor-not-allowed'
										} text-white px-6 py-4 rounded-xl text-sm font-medium transition-all duration-200 {t.planId !== tier ? 'opacity-50' : ''} disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{#if loading && t.planId === tier}
											<span class="flex items-center justify-center gap-2">
												<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
												Processing...
											</span>
										{:else}
											{t.buttonText}
										{/if}
									</button>
									
									{#if t.buttonText.includes('trial') && t.planId === tier}
										<p class="text-xs text-zinc-500 text-center mt-3 flex items-center justify-center gap-1">
											<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
											</svg>
										</p>
									{/if}
									
									{#if t.isLifetime && t.planId === tier}
										<p class="text-xs text-zinc-500 text-center mt-3 flex items-center justify-center gap-1">
											<svg class="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
											</svg>
											One-time payment, lifetime access
										</p>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Submit Button -->
			<div class="text-center mt-12 max-w-md mx-auto">
				<button 
					on:click={submitSelection}
					disabled={loading}
					class="w-full {tier === 'free' 
						? 'bg-emerald-600 hover:bg-emerald-700' 
						: tier === 'lifetime'
						? 'bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700'
						: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
					} text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{#if loading}
						<span class="flex items-center justify-center gap-2">
							<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
							Processing...
						</span>
					{:else}
						{tier === 'free' 
							? 'Continue to Dashboard' 
							: tier === 'lifetime'
							? 'Get Lifetime Access'
							: `Start ${billingPeriod === 'annual' ? 'Annual' : 'Monthly'} Trial`
						}
					{/if}
				</button>
				{#if tier !== 'free' && tier !== 'lifetime'}
					<p class="text-xs text-zinc-500 mt-3">Cancel anytime</p>
				{/if}
			</div>
		{/if}

		<!-- What You Get Section -->
		<div class="max-w-6xl mx-auto mt-24 bg-zinc-950 rounded-2xl border border-zinc-800 p-8 md:p-12">
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
		<div class="mt-24 text-center max-w-6xl mx-auto">
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
					<h3 class="text-white font-medium mb-3 text-lg">What about the lifetime deal?</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">Limited time offer. Pay once, get lifetime access to all features and updates. Perfect for builders who want to lock in their marketing automation forever.</p>
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
		transition: none;
	}
</style>