<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { API_BASE_URL } from '$lib/config';

	// ─── Form state ─────────────────────────────────────────────────────────────
	interface FormData {
		name: string;
		email: string;
		company: string;
		message: string;
	}

	let formData: FormData = { name: '', email: '', company: '', message: '' };
	let loading = false;
	let formSubmitted = false;
	let formError = '';

	let nameValid = true;
	let emailValid = true;
	let messageValid = true;

	// ─── Visibility ──────────────────────────────────────────────────────────────
	let mounted = false;
	let formVisible = false;
	let infoVisible = false;

	let formRef: HTMLElement;
	let infoRef: HTMLElement;

	function observe(el: HTMLElement | null, cb: () => void) {
		if (!el) return { disconnect: () => {} };
		const obs = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					cb();
					obs.disconnect();
				}
			},
			{ threshold: 0.08 }
		);
		obs.observe(el);
		return obs;
	}

	onMount(() => {
		setTimeout(() => (mounted = true), 40);

		// Cal.com embed
		if (typeof window !== 'undefined') {
			(function (C: any, A: string, L: string) {
				let p = (a: any, ar: any) => a.q.push(ar);
				let d = C.document;
				C.Cal =
					C.Cal ||
					function () {
						let cal = C.Cal;
						let ar: any = arguments;
						if (!cal.loaded) {
							cal.ns = {};
							cal.q = cal.q || [];
							d.head.appendChild(d.createElement('script')).src = A;
							cal.loaded = true;
						}
						if (ar[0] === L) {
							const api: any = function () {
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
			(window as any).Cal('init', '15min', { origin: 'https://app.cal.com' });
			(window as any).Cal.ns['15min']('ui', {
				theme: 'light',
				hideEventTypeDetails: false,
				layout: 'month_view'
			});
		}

		const o1 = observe(formRef, () => (formVisible = true));
		const o2 = observe(infoRef, () => (infoVisible = true));
		return () => {
			o1.disconnect();
			o2.disconnect();
		};
	});

	// ─── Validation & Submit ──────────────────────────────────────────────────────
	function validateForm(): boolean {
		nameValid = formData.name.trim().length > 0;
		emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
		messageValid = formData.message.trim().length >= 10;
		return nameValid && emailValid && messageValid;
	}

	async function submitForm(event: Event): Promise<void> {
		event.preventDefault();
		if (!validateForm()) {
			formError = 'Please fix the errors above.';
			return;
		}
		loading = true;
		formError = '';
		try {
			const res = await fetch(`${API_BASE_URL}/contact/s/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || 'Something went wrong');
			formSubmitted = true;
		} catch (err) {
			formError = err instanceof Error ? err.message : 'Network error. Please try again.';
		} finally {
			loading = false;
		}
	}

	function resetForm(): void {
		formSubmitted = false;
		formData = { name: '', email: '', company: '', message: '' };
	}

	// ─── Reassurance items ────────────────────────────────────────────────────────
	const guarantees = [
		'Response within 24 h',
		'No commitment required',
		'Clear pricing upfront',
		'Free discovery call'
	];

	interface Perk {
		icon: string;
		label: string;
		sub: string;
	}

	const perks: Perk[] = [
		{ icon: 'bolt', label: '< 4 wk delivery', sub: 'Average ship time' },
		{ icon: 'lock', label: '100% ownership', sub: 'Your code, forever' }
	];
</script>

<!-- ─── Page wrapper ──────────────────────────────────────────────────────────── -->
<section class="relative font-[Poppins] bg-white overflow-hidden pt-20 pb-0">
	<!-- Subtle dot grid -->
	<div
		class="absolute inset-0 pointer-events-none opacity-30"
		style="background-image: radial-gradient(circle, #d4d4d8 1px, transparent 1px); background-size: 28px 28px;"
	></div>

	<!-- Glow orb top-left -->
	<div
		class="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none"
	></div>
	<!-- Glow orb bottom-right -->
	<div
		class="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-violet-100/40 rounded-full blur-[100px] pointer-events-none"
	></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<!-- ── Hero label ── -->
		{#if mounted}
			<div in:fly={{ y: 24, duration: 600, delay: 0 }} class="mb-14 text-center">
				<div
					class="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 text-zinc-500 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider"
				>
					<span
						class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]"
					></span>
					Taking on new projects
				</div>
				<h1
					class="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 leading-[1.05] tracking-tight mb-4"
				>
					Let's build something<br />
					<span class="font-['Instrument_Serif'] italic text-zinc-400 font-normal tracking-wide">
						that actually works.
					</span>
				</h1>
				<p class="text-lg md:text-xl text-zinc-500 font-light max-w-xl mx-auto leading-relaxed">
					One dedicated team for your apps and workflows. <strong class="font-medium text-zinc-700"
						>No ghosting, no lock-in</strong
					> — just high-quality code.
				</p>
			</div>
		{/if}

		<!-- ── Main grid ── -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-24">
			<!-- Left: Contact Form -->
			<div bind:this={formRef} class="lg:col-span-7">
				{#if formVisible}
					<div
						in:fly={{ y: 32, duration: 700, delay: 0 }}
						class="bg-white border border-zinc-200 rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-8 md:p-10 relative overflow-hidden"
					>
						<!-- Subtle gradient wash -->
						<div
							class="absolute inset-0 bg-gradient-to-br from-indigo-50/40 to-violet-50/30 pointer-events-none rounded-[2rem]"
						></div>

						<div class="relative z-10">
							{#if !formSubmitted}
								<h2 class="text-2xl font-bold text-zinc-900 mb-2">Send us a message</h2>
								<p class="text-sm text-zinc-500 mb-8">
									We read every message and respond within 24 hours.
								</p>

								{#if formError}
									<div
										class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm"
									>
										{formError}
									</div>
								{/if}

								<form class="space-y-5" on:submit={submitForm}>
									<!-- Name + Email row -->
									<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label
												for="contact-name"
												class="block text-sm font-medium text-zinc-700 mb-1.5"
												>Name <span class="text-red-400">*</span></label
											>
											<input
												id="contact-name"
												type="text"
												bind:value={formData.name}
												placeholder="John Doe"
												required
												class="w-full bg-zinc-50 border rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all
												{!nameValid && formData.name ? 'border-red-400 bg-red-50' : 'border-zinc-200'}"
											/>
										</div>
										<div>
											<label
												for="contact-email"
												class="block text-sm font-medium text-zinc-700 mb-1.5"
												>Email <span class="text-red-400">*</span></label
											>
											<input
												id="contact-email"
												type="email"
												bind:value={formData.email}
												placeholder="you@company.com"
												required
												class="w-full bg-zinc-50 border rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all
												{!emailValid && formData.email ? 'border-red-400 bg-red-50' : 'border-zinc-200'}"
											/>
										</div>
									</div>

									<!-- Company -->
									<div>
										<label
											for="contact-company"
											class="block text-sm font-medium text-zinc-700 mb-1.5"
											>Company <span class="text-zinc-400 font-normal">(optional)</span></label
										>
										<input
											id="contact-company"
											type="text"
											bind:value={formData.company}
											placeholder="Acme Inc."
											class="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all"
										/>
									</div>

									<!-- Message -->
									<div>
										<label
											for="contact-message"
											class="block text-sm font-medium text-zinc-700 mb-1.5"
											>Message <span class="text-red-400">*</span></label
										>
										<textarea
											id="contact-message"
											rows="5"
											bind:value={formData.message}
											placeholder="Tell us about your project — what you want to build, your timeline, budget, etc."
											required
											class="w-full bg-zinc-50 border rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all resize-none
											{!messageValid && formData.message ? 'border-red-400 bg-red-50' : 'border-zinc-200'}"
										></textarea>
									</div>

									<!-- Submit -->
									<button
										type="submit"
										disabled={loading}
										class="w-full bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] text-white font-bold py-4 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
									>
										{#if loading}
											<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
												<circle
													class="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													stroke-width="4"
												></circle>
												<path
													class="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
												></path>
											</svg>
											Sending…
										{:else}
											Send message
											<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M14 5l7 7m0 0l-7 7m7-7H3"
												/>
											</svg>
										{/if}
									</button>
								</form>

								<!-- Divider + Cal booking -->
								<div
									class="mt-8 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center gap-4"
								>
									<p class="text-sm text-zinc-500">Prefer a call?</p>
									<button
										data-cal-link="hafid-ahlaqach-nigixz/15min"
										data-cal-namespace="15min"
										data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
										class="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 group"
									>
										<svg
											class="w-4 h-4 text-zinc-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
										Book a 15-min discovery call
										<svg
											class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2.5"
												d="M14 5l7 7m0 0l-7 7m7-7H3"
											/>
										</svg>
									</button>
								</div>
							{:else}
								<!-- Success state -->
								<div in:fade={{ duration: 400 }} class="text-center py-12">
									<div
										class="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5"
									>
										<svg
											class="w-8 h-8 text-emerald-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2.5"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<h3 class="text-2xl font-bold text-zinc-900 mb-2">Message sent!</h3>
									<p class="text-zinc-500 mb-8">
										We'll get back to you within 24 hours. Talk soon 👋
									</p>
									<button
										on:click={resetForm}
										class="text-sm font-medium text-zinc-500 hover:text-zinc-900 underline underline-offset-4 transition-colors"
									>
										Send another message
									</button>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<!-- Right: Info Column -->
			<div bind:this={infoRef} class="lg:col-span-5 flex flex-col gap-6">
				{#if infoVisible}
					<!-- Dark bento card — mirrors hero right card -->
					<div
						in:fly={{ y: 32, duration: 700, delay: 100 }}
						class="relative overflow-hidden bg-[#14161A] rounded-[2rem] p-8 border border-zinc-800/80 shadow-2xl isolate group"
					>
						<!-- Gradient blobs -->
						<div
							class="absolute -top-20 -right-20 w-[300px] h-[300px] bg-violet-600/25 rounded-full blur-[80px] pointer-events-none transition-transform duration-[10s] group-hover:scale-110 z-0"
						></div>
						<div
							class="absolute -bottom-20 -left-20 w-[250px] h-[250px] bg-emerald-500/15 rounded-full blur-[70px] pointer-events-none transition-transform duration-[15s] group-hover:scale-110 z-0"
						></div>

						<!-- Noise overlay -->
						<div
							class="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none z-10"
							style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"
						></div>

						<div class="relative z-20">
							<div
								class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 mb-6"
							>
								<span
									class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]"
								></span>
								Available now
							</div>
							<h2 class="text-3xl font-bold text-white leading-tight mb-2">
								Let's build<br />together.
							</h2>
							<p class="text-zinc-400 text-sm leading-relaxed mb-8 font-light">
								One team to build your apps, automations, and AI workflows — from idea to
								production.
							</p>

							<!-- Stat pills -->
							<div class="grid grid-cols-3 gap-3 mb-8">
								{#each perks as perk}
									<div
										class="bg-white/5 border border-white/8 rounded-2xl p-4 text-center hover:-translate-y-1 transition-transform duration-300"
									>
										<div class="flex justify-center mb-2">
											{#if perk.icon === 'bolt'}
												<svg
													class="w-4 h-4 text-violet-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M13 10V3L4 14h7v7l9-11h-7z"
													/>
												</svg>
											{:else if perk.icon === 'lock'}
												<svg
													class="w-4 h-4 text-emerald-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
													/>
												</svg>
											{:else if perk.icon === 'mail'}
												<svg
													class="w-4 h-4 text-blue-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
													/>
												</svg>
											{/if}
										</div>
										<div class="text-white font-bold text-xs leading-tight">{perk.label}</div>
										<div class="text-zinc-500 text-[10px] mt-0.5">{perk.sub}</div>
									</div>
								{/each}
							</div>

							<!-- CTA button -->
							<button
								data-cal-link="hafid-ahlaqach-nigixz/15min"
								data-cal-namespace="15min"
								data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
								class="w-full bg-white hover:bg-zinc-100 text-zinc-900 font-bold py-4 rounded-[1.25rem] text-sm transition-all duration-300 shadow-xl active:scale-[0.98]"
							>
								Book a free discovery call
							</button>
						</div>
					</div>

					<!-- Guarantees card -->
					<div
						in:fly={{ y: 32, duration: 700, delay: 180 }}
						class="bg-white border border-zinc-200 rounded-[2rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
					>
						<h3 class="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
							Our guarantees
						</h3>
						<ul class="space-y-3">
							{#each guarantees as item}
								<li class="flex items-center gap-3 text-sm text-zinc-700">
									<div
										class="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0"
									>
										<svg class="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/>
										</svg>
									</div>
									{item}
								</li>
							{/each}
						</ul>
					</div>

					<!-- Direct email -->
					<div
						in:fly={{ y: 32, duration: 700, delay: 260 }}
						class="flex items-center gap-4 px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl"
					>
						<div
							class="w-10 h-10 rounded-xl bg-zinc-200 flex items-center justify-center flex-shrink-0"
						>
							<svg
								class="w-4 h-4 text-zinc-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div>
							<p class="text-xs text-zinc-400 font-medium">Email us directly</p>
							<a
								href="mailto:hello@flowjoy.online"
								class="text-sm font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
							>
								hello@flowjoy.online
							</a>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Loading overlay -->
{#if loading}
	<div class="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
		<div class="bg-white border border-zinc-200 rounded-2xl p-8 text-center shadow-2xl">
			<div
				class="w-10 h-10 mx-auto mb-4 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"
			></div>
			<p class="text-zinc-500 text-sm">Sending your message…</p>
		</div>
	</div>
{/if}
