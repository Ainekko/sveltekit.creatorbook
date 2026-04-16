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

	const agencyFeatures = [
		'Custom software built for your business',
		'AI integration & automation setup',
		'Monthly maintenance & updates',
		'New features as you grow',
		'Direct Slack access to your dev team',
		'Dedicated project manager',
		'Full IP transfer — you own the code',
		'Unlimited revisions during build phase'
	];

	const saasFeatures = [
		'Nai – AI SEO agent (keyword research, blog generation)',
		'Elio – Reddit lead monitoring & outreach intel',
		'3–20 active projects depending on plan',
		'14-day free trial, cancel anytime',
		'Auto-publish to WordPress',
		'Priority support'
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
				Simple, transparent pricing
			</div>
			<h2 class="text-5xl md:text-7xl font-medium text-zinc-900 mb-6 tracking-tight leading-[0.95]">
				Two ways to <span class="font-['Instrument_Serif'] italic font-normal text-zinc-600"
					>work with us</span
				>
			</h2>
			<p class="text-lg text-zinc-500 max-w-2xl mx-auto">
				Full-service agency retainer, or self-serve SaaS tools — or both.
			</p>
		</div>

		<!-- Pricing grid -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
			<!-- Agency Retainer -->
			<div
				class="relative bg-zinc-900 text-white rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl"
				style="opacity: {visible ? 1 : 0}; transform: translateY({visible
					? 0
					: 40}px); transition: opacity 0.8s ease 0ms, transform 0.8s ease 0ms;"
			>
				<!-- Background glow -->
				<div
					class="absolute -top-10 -right-10 w-80 h-80 bg-violet-500/20 rounded-full blur-[80px] pointer-events-none"
				></div>
				<div
					class="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"
				></div>

				<div class="relative z-10">
					<!-- Badge -->
					<div
						class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider"
					>
						🏆 Most Popular
					</div>

					<h3 class="text-2xl font-bold mb-1">Agency Retainer</h3>
					<p class="text-white/60 text-sm mb-6">
						Your dedicated software team. We build, maintain, and grow your product.
					</p>

					<!-- Price -->
					<div class="flex items-baseline gap-2 mb-2">
						<span class="text-5xl font-bold">$800</span>
						<span class="text-white/60">/mo</span>
					</div>
					<p class="text-white/50 text-sm mb-8">Starting price · custom quote based on scope</p>

					<!-- Features -->
					<ul class="space-y-3 mb-8">
						{#each agencyFeatures as feat}
							<li class="flex items-start gap-3 text-sm text-white/80">
								<div
									class="mt-0.5 w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0"
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
						class="w-full py-4 rounded-2xl font-bold text-sm bg-white text-zinc-900 hover:bg-zinc-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
					>
						Book a free discovery call
						<ArrowRight class="w-4 h-4" />
					</button>
					<p class="text-center text-white/40 text-xs mt-3">
						No commitment · 15-min call · we'll scope the project together
					</p>
				</div>
			</div>

			<!-- SaaS Plan -->
			<div
				class="relative bg-gradient-to-br from-zinc-50 to-zinc-100/50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 shadow-sm overflow-hidden"
				style="opacity: {visible ? 1 : 0}; transform: translateY({visible
					? 0
					: 40}px); transition: opacity 0.8s ease 150ms, transform 0.8s ease 150ms;"
			>
				<!-- Subtle glow for balance -->
				<div
					class="absolute -bottom-24 -left-20 w-80 h-80 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none"
				></div>
				<div class="relative z-10">
					<div
						class="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider"
					>
						✨ Self-Serve
					</div>

					<h3 class="text-2xl font-bold text-zinc-900 mb-1">Flowjoy SaaS</h3>
					<p class="text-zinc-500 text-sm mb-6">
						Access our own AI marketing platform. Use the tools we built for ourselves and our
						clients.
					</p>

					<!-- Price range -->
					<div class="flex items-baseline gap-2 mb-2">
						<span class="text-5xl font-bold text-zinc-900">$0</span>
						<span class="text-zinc-400">→ $79</span>
						<span class="text-zinc-400 text-sm">/mo</span>
					</div>
					<p class="text-zinc-400 text-sm mb-8">Free to start · upgrade as you grow</p>

					<!-- Features -->
					<ul class="space-y-3 mb-8">
						{#each saasFeatures as feat}
							<li class="flex items-start gap-3 text-sm text-zinc-600">
								<div
									class="mt-0.5 w-5 h-5 rounded-full bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0"
								>
									<Check class="w-3 h-3 text-violet-600" />
								</div>
								{feat}
							</li>
						{/each}
					</ul>

					<!-- CTA -->
					<a
						href="/signup"
						id="pricing-saas-cta"
						class="w-full py-4 rounded-2xl font-bold text-sm bg-zinc-900 text-white hover:bg-zinc-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
					>
						Start for free
						<ArrowRight class="w-4 h-4" />
					</a>
					<p class="text-center text-zinc-400 text-xs mt-3">
						No credit card required · 14-day trial
					</p>
				</div>
			</div>

			<!-- Compare note -->
			<p class="text-center text-sm text-zinc-400 mt-8">
				Need something in between? <button
					data-cal-link="hafid-ahlaqach-nigixz/15min"
					data-cal-namespace="15min"
					data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
					class="text-violet-600 font-medium hover:underline"
				>
					Let's talk →
				</button>
			</p>
		</div>

		<!-- Guarantee Banner -->
		<div
			class="max-w-5xl mx-auto mt-12 bg-[#181A1F] rounded-[2rem] p-8 lg:p-10 border border-white/5 shadow-xl flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden group"
		>
			<div
				class="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"
			></div>
			<div
				class="absolute inset-0 opacity-[0.1] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [background-size:24px_24px] mix-blend-overlay"
			></div>
			<div
				class="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 w-full text-left"
			>
				<div
					class="w-16 h-16 rounded-[1.25rem] bg-[#212328] border border-white/10 shadow-inner flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-500"
				>
					<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<div>
					<h3 class="text-2xl font-bold text-white mb-2 tracking-tight">
						100% Risk-Free Guarantee
					</h3>
					<p class="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-xl">
						Love the working MVP in the first 4 weeks, or get your <strong
							class="text-white font-medium">money back entirely</strong
						>. No lock-in, no awkward questions.
					</p>
				</div>
			</div>
			<div class="relative z-10 w-full md:w-auto flex-shrink-0">
				<button
					data-cal-link="hafid-ahlaqach-nigixz/15min"
					data-cal-namespace="15min"
					data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
					class="w-full md:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-white text-zinc-900 hover:bg-zinc-100 transition-all shadow-md active:scale-95 whitespace-nowrap hidden md:block"
				>
					Claim your guarantee
				</button>
			</div>
		</div>
	</div>
</section>
