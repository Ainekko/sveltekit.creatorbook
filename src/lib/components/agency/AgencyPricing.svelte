<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, Check } from 'lucide-svelte';

	let sectionRef: HTMLElement;
	let visible = false;

	onMount(() => {
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					obs.disconnect();
				}
			},
			{ threshold: 0.08 }
		);
		obs.observe(sectionRef);

		// Cal.com embed init
		if (typeof window !== 'undefined') {
			(function (C: any, A: string, L: string) {
				let p = function (a: any, ar: any) {
					a.q.push(ar);
				};
				let d = (C as any).document;
				(C as any).Cal =
					(C as any).Cal ||
					function () {
						let cal = (C as any).Cal;
						let ar = arguments as any;
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
			(window as any).Cal('init', '15min', { origin: 'https://app.cal.com' });
			(window as any).Cal.ns['15min']('ui', {
				theme: 'light',
				hideEventTypeDetails: false,
				layout: 'month_view'
			});
		}

		return () => obs.disconnect();
	});

	const features = [
		'Custom AI system built for your specific workflows',
		'Full scoping — we map your ops before writing a line of code',
		'Working MVP delivered in 4 weeks',
		'Monthly maintenance, updates & bug fixes',
		'New features as your business grows',
		'Direct Slack access to your dev team',
		'Dedicated project manager',
		'Full IP transfer — you own the code, always',
		'Unlimited revisions during build phase'
	];
</script>

<section id="pricing" bind:this={sectionRef} class="py-24 bg-white font-[Poppins]">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-16">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-200 text-sm font-medium text-zinc-600 mb-6"
			>
				<svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				One plan. Everything included.
			</div>
			<h2 class="text-5xl md:text-7xl font-medium text-zinc-900 mb-6 tracking-tight leading-[0.95]">
				Simple, <span class="font-['Instrument_Serif'] italic font-normal text-zinc-600"
					>honest</span
				> pricing.
			</h2>
			<p class="text-lg text-zinc-500 max-w-2xl mx-auto">
				No tiers, no upsells. One monthly subscription that covers everything your system needs.
			</p>
		</div>

		<!-- Single Pricing Card -->
		<div class="max-w-2xl mx-auto">
			<div
				class="relative bg-[#0F1114] text-white rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl"
				style="opacity: {visible ? 1 : 0}; transform: translateY({visible
					? 0
					: 40}px); transition: opacity 0.8s ease 0ms, transform 0.8s ease 0ms;"
			>
				<!-- Background glows -->
				<div
					class="absolute -top-10 -right-10 w-80 h-80 bg-violet-500/15 rounded-full blur-[80px] pointer-events-none"
				></div>
				<div
					class="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"
				></div>

				<!-- Noise -->
				<div
					class="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none"
					style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"
				></div>

				<div class="relative z-10">
					<!-- Urgency badge -->
					<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-wide mb-6">
						<span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
						Launch pricing · 3 of 5 spots left
					</div>

					<!-- Price -->
					<div class="flex items-baseline gap-3 mb-1">
						<span class="text-2xl text-white/30 line-through font-medium">$1,200</span>
						<span class="text-6xl md:text-7xl font-bold tracking-tight">$999</span>
						<span class="text-white/50 text-xl">/mo</span>
					</div>
					<p class="text-white/40 text-sm mb-10">
						First 5 clients only · custom quote based on scope · cancel anytime
					</p>

					<!-- Features -->
					<ul class="space-y-4 mb-10">
						{#each features as feat}
							<li class="flex items-start gap-3 text-[15px] text-white/80">
								<div
									class="mt-0.5 w-5 h-5 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center flex-shrink-0"
								>
									<Check class="w-3 h-3 text-emerald-400" />
								</div>
								{feat}
							</li>
						{/each}
					</ul>

					<!-- CTA -->
					<button
						data-cal-link="hafid-ahlaqach-nigixz/15min"
						data-cal-namespace="15min"
						data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
						id="pricing-agency-cta"
						class="w-full py-5 rounded-2xl font-bold text-base bg-white text-zinc-900 hover:bg-zinc-100 transition-all duration-200 shadow-[0_0_60px_rgba(255,255,255,0.06)] hover:shadow-[0_0_80px_rgba(255,255,255,0.12)] hover:scale-[1.01] flex items-center justify-center gap-2"
					>
						Book a free discovery call
						<ArrowRight class="w-4 h-4" />
					</button>
					<p class="text-center text-white/30 text-xs mt-4">
						No commitment · 15-min call · we'll scope the project together
					</p>
				</div>
			</div>
		</div>

		<!-- Guarantee Banner -->
		<div
			class="max-w-2xl mx-auto mt-8 bg-[#14161A] rounded-[2rem] p-8 lg:p-10 border border-white/5 shadow-xl flex flex-col md:flex-row items-center gap-6 justify-between relative overflow-hidden group"
		>
			<div
				class="absolute -right-20 -bottom-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"
			></div>
			<div class="flex items-start md:items-center gap-5 relative z-10">
				<div
					class="w-14 h-14 rounded-2xl bg-[#1E2025] border border-white/10 shadow-inner flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-500"
				>
					<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<div>
					<h3 class="text-xl font-bold text-white mb-1.5 tracking-tight">
						100% Risk-Free Guarantee
					</h3>
					<p class="text-zinc-400 text-sm font-light leading-relaxed">
						Love the working MVP in the first 4 weeks, or get your <strong
							class="text-white font-medium">money back entirely</strong
						>. No lock-in, no awkward questions.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
