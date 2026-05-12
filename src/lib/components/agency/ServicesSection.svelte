<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Phone,
		Home,
		Building2,
		Utensils,
		Scale,
		Megaphone
	} from 'lucide-svelte';

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
			{ threshold: 0.06 }
		);
		obs.observe(sectionRef);
		return () => obs.disconnect();
	});

	const industries = [
		{
			icon: Phone,
			industry: 'Clinics & Healthcare',
			example: 'AI front desk that answers every call, books appointments, and sends SMS confirmations — 24/7, zero missed leads.',
			tags: ['Voice AI', 'Scheduling', 'SMS'],
			accent: 'from-blue-500/20 to-cyan-500/5'
		},
		{
			icon: Home,
			industry: 'Real Estate',
			example: 'Instant lead follow-up via text the moment a form is filled. Qualify, schedule showings, and sync to your CRM automatically.',
			tags: ['Lead capture', 'Auto follow-up', 'CRM sync'],
			accent: 'from-emerald-500/20 to-teal-500/5'
		},
		{
			icon: Building2,
			industry: 'Home Services',
			example: 'Automated call answering, job scheduling, and post-service review requests. Your office runs itself while your crew is on the job.',
			tags: ['Call handling', 'Dispatch', 'Reviews'],
			accent: 'from-amber-500/20 to-orange-500/5'
		},
		{
			icon: Megaphone,
			industry: 'Agencies',
			example: 'Custom client dashboards, automated reporting, and white-label tools your clients think you built. Scale without hiring.',
			tags: ['Dashboards', 'Reporting', 'White-label'],
			accent: 'from-violet-500/20 to-purple-500/5'
		},
		{
			icon: Utensils,
			industry: 'Restaurants',
			example: 'AI that handles reservations, answers menu questions, and sends review requests after every visit — all from one system.',
			tags: ['Reservations', 'AI chat', 'Reviews'],
			accent: 'from-rose-500/20 to-pink-500/5'
		},
		{
			icon: Scale,
			industry: 'Law Firms',
			example: 'Automated client intake, document collection, and appointment scheduling. New leads get a response in seconds, not hours.',
			tags: ['Intake forms', 'Doc collection', 'Scheduling'],
			accent: 'from-indigo-500/20 to-blue-500/5'
		}
	];
</script>

<section id="services" bind:this={sectionRef} class="py-24 bg-white font-[Poppins]">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-20">
			<div
				class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-8 shadow-sm"
			>
				What we build
			</div>
			<h2
				class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-zinc-900 leading-[1.05]"
			>
				One system. <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">Your</span> business.<br />
				Every industry.
			</h2>
			<p class="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto font-light">
				We don't sell templates. We map how your business actually works and build the AI system that runs it.
			</p>
		</div>

		<!-- Industry Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each industries as item, idx}
				<div
					class="group relative bg-[#14161A] rounded-[2rem] p-7 border border-white/5 shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-white/10"
					style="opacity: {visible ? 1 : 0}; transform: translateY({visible
						? 0
						: 30}px); transition: opacity 0.6s ease {idx * 80}ms, transform 0.6s ease {idx *
						80}ms;"
				>
					<!-- Gradient blob -->
					<div
						class="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br {item.accent} rounded-full blur-[50px] pointer-events-none transition-transform duration-700 group-hover:scale-[1.8]"
					></div>

					<!-- Noise -->
					<div
						class="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
						style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"
					></div>

					<div class="relative z-10">
						<!-- Icon + Industry -->
						<div class="flex items-center gap-3 mb-4">
							<div
								class="w-11 h-11 rounded-xl bg-[#1E2025] border border-white/10 flex items-center justify-center text-white/60 group-hover:bg-white group-hover:text-zinc-900 group-hover:border-transparent transition-all duration-300 shadow-inner flex-shrink-0"
							>
								<svelte:component
									this={item.icon}
									class="w-5 h-5"
								/>
							</div>
							<h3 class="text-[15px] font-bold text-white tracking-tight">{item.industry}</h3>
						</div>

						<!-- Example -->
						<p class="text-zinc-400 text-[13px] leading-relaxed font-light mb-5">
							{item.example}
						</p>

						<!-- Tags -->
						<div class="flex flex-wrap gap-1.5">
							{#each item.tags as tag}
								<span
									class="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-semibold text-zinc-500 tracking-wide"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- CTA Card -->
		<div
			class="mt-10 bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group"
			style="opacity: {visible ? 1 : 0}; transform: translateY({visible
				? 0
				: 20}px); transition: opacity 0.6s ease 600ms, transform 0.6s ease 600ms;"
		>
			<!-- Glow accents -->
			<div
				class="absolute -top-10 -left-10 w-40 h-40 bg-violet-500/10 rounded-full blur-[50px] pointer-events-none group-hover:scale-150 transition-transform duration-700"
			></div>
			<div
				class="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none group-hover:scale-150 transition-transform duration-700"
			></div>

			<div class="relative z-10 text-center md:text-left">
				<h3 class="text-xl font-bold text-zinc-900 mb-1.5 tracking-tight">
					Don't see your industry?
				</h3>
				<p class="text-zinc-500 text-[15px] font-light">
					If your business has repetitive ops, we can automate them.
				</p>
			</div>

			<button
				data-cal-link="hafid-ahlaqach-nigixz/15min"
				data-cal-namespace="15min"
				data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
				class="relative z-10 flex-shrink-0 inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
			>
				Let's talk
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>
			</button>
		</div>
	</div>
</section>
