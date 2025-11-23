<script lang="ts">
	import { goto } from '$app/navigation';
	import Googleauth from '$lib/components/Googleauth.svelte';
	import OnboardingModal from '$lib/components/OnboardingModal.svelte';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { API_BASE_URL } from '$lib/config';
	import { Check, ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-svelte';
	import { get_user } from '$lib/users/users';

	let username = '';
	let email = '';
	let password = '';
	let loading = false;
	let formError = '';
	let showOnboarding = false;

	// Form validation state
	let usernameValid = true;
	let emailValid = true;
	let passwordValid = true;

	// Focus states for inputs
	let usernameFocused = false;
	let emailFocused = false;
	let passwordFocused = false;

	// Check token and redirect if already logged in
	onMount(() => {
		const token = localStorage.getItem('token');
		if (token) {
			goto('/dashboard');
		}
	});

	// Validate form inputs
	function validateForm(): boolean {
		usernameValid = username.length >= 3;
		emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		passwordValid = password.length >= 6;

		return usernameValid && emailValid && passwordValid;
	}

	async function register(event: any) {
		event.preventDefault();

		if (!validateForm()) {
			formError = 'Please check the form for errors';
			return;
		}

		loading = true;
		formError = '';

		const user_data = {
			username,
			email,
			password
		};

		try {
			const response = await fetch(`${API_BASE_URL}/users/register/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user_data)
			});

			if (response.status === 201) {
				const res_data = await response.json();
				const token = res_data.token;
				localStorage.setItem('token', token);
				// Show onboarding modal instead of immediate redirect
				showOnboarding = true;
			} else {
				const responseText = await response.text();

				try {
					const errorData = JSON.parse(responseText);
					formError = errorData.message || 'Registration failed. Please try again.';
				} catch (parseError) {
					formError = 'Registration failed. Please try again.';
				}
			}
		} catch (error) {
			formError = 'Network error. Please check your connection.';
			console.error('Error submitting form:', error);
		} finally {
			loading = false;
		}
	}

	function handleOnboardingComplete() {
		showOnboarding = false;
		goto('/plans');
	}

	async function handleGoogleSuccess(data: any) {
		// Token is already set in localStorage by Googleauth component
		try {
			// Fetch user profile to check if they have completed onboarding
			const user = await get_user();

			if (user && !user.source) {
				// New user or hasn't completed onboarding -> Show modal
				showOnboarding = true;
			} else {
				// Existing user with onboarding data -> Redirect
				goto('/plans');
			}
		} catch (error) {
			console.error('Error checking user status:', error);
			// Fallback to redirect if check fails
			goto('/plans');
		}
	}
</script>

<div class="min-h-screen bg-zinc-50 flex items-center justify-center p-4 lg:p-8">
	<div
		class="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]"
	>
		<!-- Left Side: Sign Up Form -->
		<div class="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative">
			<div class="max-w-md mx-auto w-full">
				<!-- Logo -->
				<a href="/" class="inline-block mb-12 text-2xl font-bold text-zinc-900">
					flow<span class="font-['Pacifico']">joy</span>
				</a>

				<div class="mb-10">
					<h1 class="text-3xl lg:text-4xl font-bold text-zinc-900 mb-3">Create your account</h1>
					<p class="text-zinc-500">Start your 14-day free trial. Cancel anytime.</p>
				</div>

				<form on:submit|preventDefault={register} class="space-y-5">
					<!-- Username -->
					<div>
						<label for="username" class="block text-sm font-medium text-zinc-700 mb-1.5"
							>Username</label
						>
						<div class="relative">
							<input
								type="text"
								id="username"
								placeholder="johndoe"
								bind:value={username}
								on:focus={() => (usernameFocused = true)}
								on:blur={() => (usernameFocused = false)}
								class="w-full px-4 py-3 rounded-xl border bg-zinc-50 focus:bg-white transition-all outline-none
                                {usernameFocused
									? 'border-zinc-900 ring-1 ring-zinc-900'
									: 'border-zinc-200 hover:border-zinc-300'}
                                {!usernameValid && username ? 'border-red-500 bg-red-50' : ''}"
							/>
						</div>
						{#if !usernameValid && username}
							<p class="text-red-500 text-xs mt-1.5 ml-1" transition:fly={{ y: -5, duration: 200 }}>
								Username must be at least 3 characters
							</p>
						{/if}
					</div>

					<!-- Email -->
					<div>
						<label for="email" class="block text-sm font-medium text-zinc-700 mb-1.5"
							>Work Email</label
						>
						<div class="relative">
							<input
								type="email"
								id="email"
								placeholder="name@company.com"
								bind:value={email}
								on:focus={() => (emailFocused = true)}
								on:blur={() => (emailFocused = false)}
								class="w-full px-4 py-3 rounded-xl border bg-zinc-50 focus:bg-white transition-all outline-none
                                {emailFocused
									? 'border-zinc-900 ring-1 ring-zinc-900'
									: 'border-zinc-200 hover:border-zinc-300'}
                                {!emailValid && email ? 'border-red-500 bg-red-50' : ''}"
							/>
						</div>
						{#if !emailValid && email}
							<p class="text-red-500 text-xs mt-1.5 ml-1" transition:fly={{ y: -5, duration: 200 }}>
								Please enter a valid email address
							</p>
						{/if}
					</div>

					<!-- Password -->
					<div>
						<label for="password" class="block text-sm font-medium text-zinc-700 mb-1.5"
							>Password</label
						>
						<div class="relative">
							<input
								type="password"
								id="password"
								placeholder="••••••••"
								bind:value={password}
								on:focus={() => (passwordFocused = true)}
								on:blur={() => (passwordFocused = false)}
								class="w-full px-4 py-3 rounded-xl border bg-zinc-50 focus:bg-white transition-all outline-none
                                {passwordFocused
									? 'border-zinc-900 ring-1 ring-zinc-900'
									: 'border-zinc-200 hover:border-zinc-300'}
                                {!passwordValid && password ? 'border-red-500 bg-red-50' : ''}"
							/>
						</div>
						{#if !passwordValid && password}
							<p class="text-red-500 text-xs mt-1.5 ml-1" transition:fly={{ y: -5, duration: 200 }}>
								Password must be at least 6 characters
							</p>
						{/if}
					</div>

					{#if formError}
						<div
							class="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2"
							transition:fly={{ y: -5, duration: 200 }}
						>
							<Shield class="w-4 h-4" />
							{formError}
						</div>
					{/if}

					<button
						type="submit"
						disabled={loading}
						class="w-full bg-zinc-900 text-white font-medium py-3.5 rounded-xl hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/10"
					>
						{#if loading}
							<div
								class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
							></div>
							Creating account...
						{:else}
							Get Started <ArrowRight class="w-4 h-4" />
						{/if}
					</button>
				</form>

				<div class="my-8 flex items-center gap-4">
					<div class="h-px bg-zinc-200 flex-1"></div>
					<span class="text-xs font-medium text-zinc-400 uppercase tracking-wider"
						>Or continue with</span
					>
					<div class="h-px bg-zinc-200 flex-1"></div>
				</div>

				<div class="flex justify-center">
					<Googleauth
						redirectUrl="/plans"
						theme="outline"
						size="large"
						onSuccess={handleGoogleSuccess}
					/>
				</div>

				<p class="mt-8 text-center text-sm text-zinc-500">
					Already have an account?
					<a href="/login" class="font-semibold text-zinc-900 hover:underline">Log in</a>
				</p>
			</div>
		</div>

		<!-- Right Side: Trivia / Info -->
		<div
			class="hidden lg:flex w-1/2 bg-zinc-900 p-16 flex-col justify-between relative overflow-hidden"
		>
			<!-- Background Decoration -->
			<div
				class="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"
			></div>
			<div
				class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"
			></div>

			<div class="relative z-10">
				<div
					class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs font-medium mb-8"
				>
					<Sparkles class="w-3 h-3" />
					<span>Did you know?</span>
				</div>

				<h2 class="text-4xl font-bold text-white mb-6 leading-tight">
					Reddit has over <span
						class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500"
						>57 million</span
					> daily active users.
				</h2>
				<p class="text-zinc-400 text-lg leading-relaxed max-w-md">
					It's the internet's largest focus group. Elio helps you tap into these conversations to
					find high-intent leads before your competitors do.
				</p>
			</div>

			<!-- Stats Cards -->
			<div class="grid grid-cols-2 gap-4 relative z-10 mt-12">
				<div class="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
					<TrendingUp class="w-8 h-8 text-green-400 mb-4" />
					<div class="text-3xl font-bold text-white mb-1">300%</div>
					<div class="text-sm text-zinc-400">Avg. Traffic Increase</div>
				</div>
				<div class="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
					<Shield class="w-8 h-8 text-blue-400 mb-4" />
					<div class="text-3xl font-bold text-white mb-1">24/7</div>
					<div class="text-sm text-zinc-400">Brand Monitoring</div>
				</div>
			</div>
		</div>
	</div>
</div>

<OnboardingModal visible={showOnboarding} on:complete={handleOnboardingComplete} />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

	:global(body) {
		font-family: 'Poppins', sans-serif;
	}
</style>
