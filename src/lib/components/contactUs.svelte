<script lang="ts">
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
	import { API_BASE_URL } from '$lib/config';

	// Form data interface
	interface FormData {
		name: string;
		email: string;
		company: string;
		message: string;
	}

	// Form states
	let formData: FormData = {
		name: '',
		email: '',
		company: '',
		message: ''
	};
	let loading = false;
	let formSubmitted = false;
	let formError = '';

	// Form validation states
	let nameValid = true;
	let emailValid = true;
	let messageValid = true;

	// Agents
	interface Item {
		title: string;
		description: string;
		icon: string;
		color: string;
	}

	const agents: Item[] = [
		{
			title: 'SEO Agent',
			description: 'AI-powered search optimization',
			icon: 'search',
			color: 'text-blue-400'
		},
		{
			title: 'Reddit Agent',
			description: 'Targeted growth campaigns',
			icon: 'reddit',
			color: 'text-orange-400'
		}
		// { title: "X Agent", description: "Coming soon: Engage on X", icon: "twitter", color: "text-gray-400" } // Hidden
	];

	// Other Benefits
	const otherBenefits: Item[] = [
		{
			title: 'Brand Matching',
			description: 'Replicates your voice',
			icon: 'fa-microphone',
			color: 'text-purple-400'
		},
		{
			title: 'Business AI',
			description: 'Tailored strategies',
			icon: 'fa-lightbulb',
			color: 'text-yellow-400'
		},
		{
			title: 'Integrations',
			description: 'WordPress, APIs & more',
			icon: 'fa-plug',
			color: 'text-green-400'
		}
	];

	// Features adapted
	interface Feature {
		title: string;
		description: string;
		icon: string;
		iconColor: string;
	}

	const features: Feature[] = [
		{
			title: 'Fast Automation',
			description: 'Lightning-speed efficiency',
			icon: 'fa-bolt',
			iconColor: 'text-indigo-400'
		},
		{
			title: 'Custom Fit',
			description: 'Tailored to your needs',
			icon: 'fa-fingerprint',
			iconColor: 'text-purple-400'
		},
		{
			title: 'Secure Growth',
			description: 'Protected and reliable',
			icon: 'fa-shield-alt',
			iconColor: 'text-pink-400'
		}
	];

	// Stats
	interface Stat {
		value: string;
		label: string;
		gradient: string;
	}

	const stats: Stat[] = [
		{ value: '<1 Day', label: 'Support Response', gradient: 'from-indigo-400 to-purple-400' },
		{ value: '2 Weeks', label: 'Custom Turnaround', gradient: 'from-purple-400 to-pink-400' },
		{ value: '14 Days', label: 'Free Trial', gradient: 'from-pink-400 to-orange-400' }
	];

	// Validate the form
	function validateForm(): boolean {
		nameValid = formData.name.trim().length > 0;
		emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
		messageValid = formData.message.trim().length >= 10;

		return nameValid && emailValid && messageValid;
	}

	// Submit the form
	async function submitForm(event: Event): Promise<void> {
		event.preventDefault();

		if (!validateForm()) {
			formError = 'Please check the form for errors';
			return;
		}

		loading = true;
		formError = '';

		try {
			const response = await fetch(`${API_BASE_URL}/contact/s/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Something went wrong');
			}

			formSubmitted = true;
		} catch (error) {
			console.error('Error submitting form:', error);
			formError = error instanceof Error ? error.message : 'Network error. Please try again.';
		} finally {
			loading = false;
		}
	}

	// Reset the form
	function resetForm(): void {
		formSubmitted = false;
		formData = {
			name: '',
			email: '',
			company: '',
			message: ''
		};
	}

	// Observer setup function
	function setupObserver(ref: HTMLElement | null, callback: () => void) {
		if (!ref) return { disconnect: () => {} };
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					callback();
					observer.unobserve(ref);
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(ref);
		return observer;
	}

	// Visibility states
	let isVisibleHeader = false;
	let headerRef: HTMLDivElement | null = null;

	let isVisibleMain = false;
	let mainRef: HTMLDivElement | null = null;

	let isVisibleAgents = false;
	let agentsRef: HTMLDivElement | null = null;

	let isVisibleBenefits = false;
	let benefitsRef: HTMLDivElement | null = null;

	let isVisibleFeatures = false;
	let featuresRef: HTMLDivElement | null = null;

	let isVisibleStats = false;
	let statsRef: HTMLDivElement | null = null;

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

		const obsHeader = setupObserver(headerRef, () => (isVisibleHeader = true));
		const obsMain = setupObserver(mainRef, () => (isVisibleMain = true));
		const obsAgents = setupObserver(agentsRef, () => (isVisibleAgents = true));
		const obsBenefits = setupObserver(benefitsRef, () => (isVisibleBenefits = true));
		const obsFeatures = setupObserver(featuresRef, () => (isVisibleFeatures = true));
		const obsStats = setupObserver(statsRef, () => (isVisibleStats = true));

		return () => {
			obsHeader.disconnect();
			obsMain.disconnect();
			obsAgents.disconnect();
			obsBenefits.disconnect();
			obsFeatures.disconnect();
			obsStats.disconnect();
		};
	});
</script>

<div
	class="min-h-screen bg-gradient-to-br from-black to-zinc-950 text-white font-[Poppins] flex flex-col items-center justify-start pt-20 px-4 relative"
>
	<div class="absolute inset-0 bg-soft-light pointer-events-none"></div>

	<!-- Header -->
	<div bind:this={headerRef} class="text-center mb-12 max-w-4xl w-full relative">
		{#if isVisibleHeader}
			<h1
				in:blur={{ delay: 0, duration: 600 }}
				class="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300"
			>
				Get in Touch
			</h1>
			<p in:blur={{ delay: 200, duration: 600 }} class="text-xl text-zinc-400">
				Let's automate your marketing with AI
			</p>
		{/if}
		<div class="accent-dot bg-blue-500 top-0 left-0" style="animation-delay: 0s;"></div>
		<div class="accent-dot bg-purple-500 bottom-0 right-0" style="animation-delay: -4s;"></div>
	</div>

	<!-- Main Content -->
	<div bind:this={mainRef} class="w-full max-w-6xl grid md:grid-cols-2 gap-8">
		{#if isVisibleMain}
			<!-- Form Card -->
			<div in:blur={{ delay: 0, duration: 600 }} class="card p-8 md:col-span-1 row-span-2 relative">
				<div class="accent-dot bg-orange-400 top-4 right-4" style="animation-delay: -2s;"></div>
				<h2 class="text-2xl font-semibold mb-6">Send Message</h2>

				{#if !formSubmitted}
					{#if formError}
						<div
							class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm"
						>
							{formError}
						</div>
					{/if}

					<form class="space-y-4" on:submit={submitForm}>
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-sm text-zinc-300 mb-1">Name *</label>
								<input
									type="text"
									bind:value={formData.name}
									class="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:border-blue-500 transition-all {!nameValid &&
									formData.name
										? 'border-red-500'
										: ''}"
									placeholder="John Doe"
									required
								/>
							</div>
							<div>
								<label class="block text-sm text-zinc-300 mb-1">Email *</label>
								<input
									type="email"
									bind:value={formData.email}
									class="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:border-blue-500 transition-all {!emailValid &&
									formData.email
										? 'border-red-500'
										: ''}"
									placeholder="you@email.com"
									required
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm text-zinc-300 mb-1">Message *</label>
							<textarea
								rows="4"
								bind:value={formData.message}
								class="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:border-blue-500 transition-all {!messageValid &&
								formData.message
									? 'border-red-500'
									: ''}"
								placeholder="Tell us about your project..."
								required
							></textarea>
						</div>

						<button
							type="submit"
							class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50"
							disabled={loading}
						>
							{loading ? 'Sending...' : 'Submit'}
						</button>
					</form>
				{:else}
					<div in:blur class="text-center py-8">
						<i class="fas fa-check-circle text-green-400 text-4xl mb-4"></i>
						<h3 class="text-xl font-bold mb-2">Message Sent!</h3>
						<p class="text-zinc-400 mb-6">We'll get back to you soon.</p>
						<button on:click={resetForm} class="text-blue-400 hover:text-blue-300">
							Send Another
						</button>
					</div>
				{/if}

				<div class="mt-6 pt-6 border-t border-zinc-800 text-center space-y-4">
					<p class="text-sm text-zinc-400">
						Or email us at <a
							href="mailto:hi@s-tierproject.online"
							class="text-blue-400 hover:text-blue-300">hello@flowjoy.online</a
						>
					</p>
					<button
						data-cal-link="hafid-ahlaqach-nigixz/30min"
						data-cal-namespace="30min"
						data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
						class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
					>
						📅 Schedule a Call
					</button>
				</div>
			</div>

			<!-- Agents Card -->
			<div
				bind:this={agentsRef}
				in:blur={{ delay: 200, duration: 600 }}
				class="card p-6 md:col-span-1 relative"
			>
				<div class="accent-dot bg-green-400 bottom-4 left-4" style="animation-delay: -1s;"></div>
				<h3 class="text-lg font-bold mb-4">Our AI Agents</h3>
				<div class="grid grid-cols-3 gap-4">
					{#each agents as agent, i}
						<div
							class="item-card flex flex-col items-center p-2 bg-zinc-900/30 rounded-xl border border-zinc-800/50"
						>
							<div class="mb-1">
								{#if agent.icon === 'search'}
									<svg
										class="w-5 h-5 {agent.color}"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										></path>
									</svg>
								{:else if agent.icon === 'reddit'}
									<svg class="w-5 h-5 {agent.color}" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 00.029.463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"
										/>
									</svg>
								{:else if agent.icon === 'twitter'}
									<svg class="w-5 h-5 {agent.color}" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
										/>
									</svg>
								{/if}
							</div>
							<span class="text-xs font-medium text-zinc-200 text-center">{agent.title}</span>
							<p class="text-xs text-zinc-500 text-center">{agent.description}</p>
						</div>
					{/each}
				</div>
				<p class="text-center mt-4 text-sm">
					<a href="/signup" class="text-blue-400 hover:text-blue-300">Try for free →</a>
				</p>
			</div>

			<!-- Other Benefits Card -->
			<div
				bind:this={benefitsRef}
				in:blur={{ delay: 300, duration: 600 }}
				class="card p-6 md:col-span-1 relative"
			>
				<div class="accent-dot bg-yellow-400 top-4 right-4" style="animation-delay: -3s;"></div>
				<h3 class="text-lg font-bold mb-4">Additional Benefits</h3>
				<div class="grid grid-cols-3 gap-4">
					{#each otherBenefits as benefit, i}
						<div
							class="item-card flex flex-col items-center p-2 bg-zinc-900/30 rounded-xl border border-zinc-800/50"
						>
							<div class="mb-1">
								<i class="fas {benefit.icon} text-lg {benefit.color}"></i>
							</div>
							<span class="text-xs font-medium text-zinc-200 text-center">{benefit.title}</span>
							<p class="text-xs text-zinc-500 text-center">{benefit.description}</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- Features Card -->
			<div
				bind:this={featuresRef}
				in:blur={{ delay: 400, duration: 600 }}
				class="card p-6 md:col-span-1 relative"
			>
				<div class="accent-dot bg-pink-400 bottom-4 left-4" style="animation-delay: -5s;"></div>
				<h3 class="text-lg font-bold mb-4">Key Features</h3>
				<div class="space-y-3">
					{#each features as feature, i}
						<div
							in:blur={{ delay: 100 * i, duration: 600 }}
							class="flex items-center gap-3 bg-zinc-900/30 rounded-lg p-3 border border-zinc-800/50"
						>
							<i class="fas {feature.icon} {feature.iconColor} text-xl"></i>
							<div>
								<h4 class="text-sm font-medium">{feature.title}</h4>
								<p class="text-xs text-zinc-500">{feature.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Stats Card -->
			<div
				bind:this={statsRef}
				in:blur={{ delay: 500, duration: 600 }}
				class="card p-6 md:col-span-1 relative"
			>
				<div class="accent-dot bg-indigo-400 top-4 left-4" style="animation-delay: -6s;"></div>
				<h3 class="text-lg font-bold mb-4">Our Stats</h3>
				<div class="grid grid-cols-3 gap-3">
					{#each stats as stat, i}
						<div
							in:blur={{ delay: 100 * i, duration: 600 }}
							class="stat-card p-3 rounded-lg text-center"
						>
							<div
								class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r {stat.gradient}"
							>
								{stat.value}
							</div>
							<div class="text-xs text-zinc-500">{stat.label}</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	{#if loading}
		<div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
			<div class="card p-8 text-center">
				<div
					class="w-12 h-12 mx-auto mb-4 border-4 border-t-blue-500 rounded-full animate-spin"
				></div>
				<p class="text-zinc-400">Sending message...</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.card {
		background: rgba(9, 9, 11, 0.8);
		backdrop-filter: blur(16px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 24px;
		overflow: hidden;
		transition: all 0.3s ease;
		position: relative;
	}

	.card:hover {
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	}

	.item-card {
		transition: all 0.3s ease;
	}

	.item-card:hover {
		transform: translateY(-4px);
	}

	.stat-card {
		background: rgba(9, 9, 11, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		border-color: rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
	}

	.accent-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		position: absolute;
		animation: gentle-float 8s ease-in-out infinite;
	}

	@keyframes gentle-float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-4px);
		}
	}

	.bg-soft-light {
		background: radial-gradient(circle at center, rgba(113, 113, 122, 0.05) 0%, transparent 70%);
	}
</style>
