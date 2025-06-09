<script lang="ts">
	import { goto } from '$app/navigation';
	import { get_user } from '$lib/check'; // Ensure this function is robust and returns expected structure
	import { onMount } from 'svelte';

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

<div class="h-screen w-full flex justify-center items-center bg-zinc-900 text-white font-sans">
	<div class="max-w-3xl w-full mx-auto p-4 flex flex-col justify-center items-center text-center">
		<div class="card bg-zinc-800 flex flex-col justify-center items-center w-full shadow-xl p-6 sm:p-8 rounded-lg">
			<p class="text-2xl sm:text-3xl text-zinc-100 font-semibold mb-6 sm:mb-8">Select Your Plan</p>

			{#if error}
				<div class="mb-4 p-3 w-full max-w-md bg-red-500/20 border border-red-500/50 rounded-md text-red-300 text-sm break-words">
					{error}
				</div>
			{/if}

			<div class="flex flex-col sm:flex-row justify-center items-stretch gap-4 sm:gap-6 p-4 w-full">
				<div class="flex-1 w-full">
					<button
						type="button"
						on:click={() => selectPlan('free')}
						disabled={loading}
						class={`w-full p-6 h-full rounded-lg border-2 transition-all duration-200 ease-in-out
                        ${plan === 'free' ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500' : 'border-zinc-700 hover:border-zinc-500 bg-zinc-700/50'}
                        ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'}
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-blue-400 text-white`}
					>
						<h3 class="text-xl sm:text-2xl font-semibold mb-2">Start for Free</h3>
						<p class="text-zinc-300 text-2xl sm:text-3xl mb-5 font-bold">$0<span class="text-base font-normal text-zinc-400">/m</span></p>
						<p class="text-sm text-zinc-400">Get access to AI assistants and basic features.</p>
					</button>
				</div>

				<div class="flex-1 w-full">
					<button
						type="button"
						on:click={() => selectPlan('paid')}
						disabled={loading}
						class={`w-full p-6 h-full rounded-lg border-2 transition-all duration-200 ease-in-out
                        ${plan === 'paid' ? 'border-gradient-active ring-2 ring-pink-500' : 'border-zinc-700 hover:border-zinc-500 bg-zinc-700/50'}
                        ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'}
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-pink-400 text-white`}
                        style="${plan === 'paid' ? 'border-image: linear-gradient(to right, #b363f1, #ec4899); border-image-slice: 1;' : ''}"
					>
						<h3 class="text-xl sm:text-2xl font-semibold mb-2">
							<span class="bg-gradient-to-r from-violet-400 via-pink-500 to-rose-400 text-transparent bg-clip-text font-bold">s-tier</span> Plan
						</h3>
						<p class="text-zinc-300 text-2xl sm:text-3xl mb-5 font-bold">$30<span class="text-base font-normal text-zinc-400">/m</span></p>
						<p class="text-sm text-zinc-400">Access all S-tier AI Agents</p>
					</button>
				</div>
			</div>

			<button
				on:click={submitSelection}
				disabled={loading || (plan === 'paid' && (user_email === null || user_id === null))}
				class={`mt-8 sm:mt-10 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105
                ${loading || (plan === 'paid' && (user_email === null || user_id === null)) ? 'opacity-50 cursor-not-allowed filter grayscale' : ''}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-pink-500`}
			>
				{#if loading}
					<span class="flex items-center justify-center gap-2">
						<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Processing...
					</span>
				{:else}
					Next
				{/if}
			</button>
		</div>
	</div>
</div>

<style>
	/* Custom style for active paid plan button border */
	.border-gradient-active {
		border-width: 2px; /* Ensure border is visible */
		border-style: solid;
		border-image-slice: 1;
		border-image-source: linear-gradient(to right, #b363f1, #ec4899); /* Ensure colors are distinct */
	}
    /* Ensure fonts are loaded or use system fonts */
    body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
</style>
