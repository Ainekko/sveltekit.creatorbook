<script lang="ts">
	import { goto } from '$app/navigation';
	import { get_user } from '$lib/check'; // Ensure this function is robust and returns expected structure
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let plan = 'free'; // default to free plan
	let loading = false;
	let error = '';

	let user_email: string | null = null;
	let user_id: number | string | null = null; // Allow string if get_user might provide it as such
	let user_name: string | null = null;

	onMount(async () => {
		loading = true; // Set loading true at the start of onMount
		error = ''; // Clear previous errors
		try {
			const user_data = await get_user();
			console.log('CLIENT: onMount get_user response:', user_data);

			// Check for presence of essential user data
			if (user_data && user_data.user_id !== undefined && user_data.user_id !== null && user_data.email) {
				user_name = user_data.username || 'N/A'; // Handle potentially missing username
				user_id = user_data.user_id;
				user_email = user_data.email;
				console.log('CLIENT: User data loaded:', { user_email, user_id, user_name });
			} else {
				console.error('CLIENT: Failed to load user data or data is incomplete from get_user.', user_data);
				error = 'Could not retrieve your complete user profile. Please try logging in again or refresh the page.';
			}
		} catch (e) {
			console.error('CLIENT: Error in onMount while fetching user:', e);
			error = 'An error occurred while loading your profile. Please refresh the page.';
		} finally {
			loading = false; // Set loading false at the end
		}
	});

	function selectPlan(selectedPlan: string) {
		plan = selectedPlan;
		error = ''; // Clear any previous errors
	}

	async function submitSelection() {
		// More robust check for user_id and user_email before proceeding with paid plan
		if (plan === 'paid' && (user_email === null || user_email === '' || user_id === null || user_id === undefined)) {
			error = 'User data is not fully loaded. Cannot proceed to payment. Please refresh the page.';
			console.warn('CLIENT: Submit selection aborted due to missing user data', { user_email, user_id });
			return;
		}

		loading = true;
		error = '';

		try {
			localStorage.setItem('plan', plan);

			if (plan === 'free') {
				await goto('/dashboard');
			} else {
				// Ensure user_id and user_email are not null before calling handlePaidPlan
				if (user_email && (user_id !== null && user_id !== undefined)) {
					await handlePaidPlan();
				} else {
					// This case should ideally be caught by the check at the start of submitSelection
					error = "User information is missing. Cannot initiate payment.";
					console.error(error, { user_email, user_id });
				}
			}
		} catch (err) {
			error = 'Something went wrong during plan selection. Please try again.';
			console.error('CLIENT: Submit selection error:', err);
		} finally {
			loading = false;
		}
	}

	async function handlePaidPlan() {
		// This function assumes user_email and user_id are valid, as checked by submitSelection
		console.log('CLIENT: handlePaidPlan called. Sending to /plans/checkout:', { userEmail: user_email, userID: user_id });

		try {
			const response = await fetch('/plans/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				// Ensure user_email and user_id are not null when stringifying
				body: JSON.stringify({ userEmail: user_email!, userID: user_id! })
			});

            // Log the raw response text regardless of status for debugging
            const responseText = await response.text();
            console.log(`CLIENT: Raw response from /plans/checkout (Status: ${response.status}):`, responseText);

			let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (parseError) {
                console.error('CLIENT: Failed to parse JSON response from /plans/checkout. Raw text was:', responseText, 'Parse error:', parseError);
                error = `Received an unexpected response from the server (Status: ${response.status}). Please check server logs or contact support.`;
                // Display raw text if it's short and not HTML, otherwise generic message
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
                        // Try to parse creem_details if it's a JSON string
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
		} catch (err) { // Catches network errors or if fetch itself fails
			console.error('CLIENT: Network or unexpected error in handlePaidPlan:', err);
			error = 'A network error occurred while trying to create checkout. Please check your connection and try again.';
		}
	}
</script>

<style>
	.plan-card {
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.plan-card:hover {
		transform: translateY(-2px);
	}

	.plan-card.selected {
		transform: translateY(-1px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	}
</style>

<div class="text-zinc-200 min-h-screen bg-zinc-900">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
		<!-- Header Section -->
		<div class="flex flex-col items-center justify-center mb-8 sm:mb-12" in:fade={{ duration: 300, delay: 100 }}>
			<h1 class="text-center font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-3">Select Your Plan</h1>
			<p class="text-center text-base sm:text-lg text-zinc-400 max-w-xl px-4">Choose the perfect plan to unlock the full potential of our AI agents</p>
		</div>

		<!-- Error Message -->
		{#if error}
			<div class="max-w-4xl mx-auto mb-6" in:fade={{ duration: 300 }}>
				<div class="bg-gradient-to-r from-red-950 to-red-800 rounded-xl border border-red-800 p-4">
					<div class="flex items-center">
						<div class="mr-3 bg-red-200/20 p-2 rounded-full">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
							</svg>
						</div>
						<div>
							<p class="text-red-200 text-sm">{error}</p>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Plans Section -->
		<div class="max-w-4xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
				<!-- Free Plan -->
				<div class="plan-card bg-gradient-to-r from-zinc-950 to-zinc-800 rounded-xl border border-zinc-800 overflow-hidden p-6 {plan === 'free' ? 'selected border-blue-600' : ''}" 
					 in:fly={{ y: 20, duration: 400, delay: 200 }}
					 on:click={() => selectPlan('free')}
					 on:keydown={(e) => e.key === 'Enter' && selectPlan('free')}
					 role="button"
					 tabindex="0"
					 class:opacity-60={loading}
					 class:cursor-not-allowed={loading}>
					
					<div class="flex items-center mb-4">
						<div class="mr-4 bg-blue-200/20 p-2 rounded-full">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						</div>
						<div class="flex-1">
							<h3 class="text-lg font-bold text-white">Start for Free</h3>
							<p class="text-xs text-blue-300/80">Perfect for getting started</p>
						</div>
						{#if plan === 'free'}
							<div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center ml-4">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
						{:else}
							<div class="w-6 h-6 rounded-full border-2 border-zinc-600 ml-4"></div>
						{/if}
					</div>

					<div class="mb-4">
						<div class="flex items-baseline mb-2">
							<span class="text-3xl font-bold text-white">$0</span>
							<span class="text-zinc-400 ml-2 text-sm">/month</span>
						</div>
					</div>

					<div class="space-y-2 text-zinc-300 text-sm">
						<div class="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Access to basic AI assistants
						</div>
						<div class="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Standard response speed
						</div>
						<div class="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Community support
						</div>
						<div class="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Basic features included
						</div>
					</div>
				</div>

				<!-- Paid Plan -->
				<div class="plan-card bg-gradient-to-r from-zinc-950 to-zinc-800 rounded-xl border border-zinc-800 overflow-hidden p-6 {plan === 'paid' ? 'selected border-pink-600' : ''}" 
					 in:fly={{ y: 20, duration: 400, delay: 300 }}
					 on:click={() => selectPlan('paid')}
					 on:keydown={(e) => e.key === 'Enter' && selectPlan('paid')}
					 role="button"
					 tabindex="0"
					 class:opacity-60={loading}
					 class:cursor-not-allowed={loading}>
					
					<div class="flex items-center mb-4">
						<div class="mr-4 bg-violet-200/20 p-2 rounded-full">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
							</svg>
						</div>
						<div class="flex-1">
							<h3 class="text-lg font-bold">
								<span class="bg-gradient-to-r from-violet-400 via-pink-500 to-rose-400 text-transparent bg-clip-text">s-tier</span>
								<span class="text-white ml-1">Plan</span>
							</h3>
							<p class="text-xs text-pink-300/80">Unlock premium AI capabilities</p>
						</div>
						{#if plan === 'paid'}
							<div class="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center ml-4">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
						{:else}
							<div class="w-6 h-6 rounded-full border-2 border-zinc-600 ml-4"></div>
						{/if}
					</div>

					<div class="mb-4">
						<div class="flex items-baseline mb-2">
							<span class="text-3xl font-bold bg-gradient-to-r from-violet-400 via-pink-500 to-rose-400 text-transparent bg-clip-text">$30</span>
							<span class="text-zinc-400 ml-2 text-sm">/month</span>
						</div>
					</div>

					<div class="space-y-2 text-zinc-300 text-sm">
						<div class="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Access to all S-tier AI Agents
						</div>
						<div class="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Priority response speed
						</div>
						<div class="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Advanced AI capabilities
						</div>
						<div class="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Premium support
						</div>
						<div class="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Custom integrations
						</div>
					</div>
				</div>
			</div>

			<!-- Continue Button -->
			<div class="flex justify-center mt-8 sm:mt-12" in:fly={{ y: 20, duration: 400, delay: 400 }}>
				<button
					on:click={submitSelection}
					disabled={loading || (plan === 'paid' && (user_email === null || user_id === null))}
					class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 {loading || (plan === 'paid' && (user_email === null || user_id === null)) ? 'opacity-50 cursor-not-allowed' : ''}"
				>
					{#if loading}
						<span class="flex items-center justify-center gap-3">
							<div class="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
							Processing...
						</span>
					{:else}
						Continue with {plan === 'free' ? 'Free Plan' : 'S-tier Plan'}
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Loading Overlay -->
	{#if loading}
		<div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" transition:fade={{ duration: 200 }}>
			<div class="bg-gradient-to-r from-zinc-950 to-zinc-800 rounded-xl border border-zinc-800 p-8 shadow-xl flex flex-col items-center max-w-sm w-full">
				<div class="w-12 h-12 rounded-full border-4 border-t-indigo-500 border-r-purple-500 border-b-pink-500 border-l-zinc-600 animate-spin mb-4"></div>
				<p class="text-gray-300 text-center">
					{plan === 'paid' ? 'Setting up your premium plan...' : 'Processing your selection...'}
				</p>
			</div>
		</div>
	{/if}
</div>