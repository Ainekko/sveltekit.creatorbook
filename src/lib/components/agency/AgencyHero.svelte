<script lang="ts">
	import { onMount } from 'svelte';
	import { blur, fly } from 'svelte/transition';

	let mounted = false;
	onMount(() => {
		setTimeout(() => (mounted = true), 50);
	});
</script>

<section
	class="hero-bg font-[Poppins] relative overflow-hidden py-20 md:py-28 min-h-[92vh] flex flex-col justify-center bg-[#09090B]"
>
	<!-- Grain -->
	<div
		class="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
		style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"
	></div>

	<!-- Blobs -->
	<div
		class="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse"
		style="animation-duration: 8s;"
	></div>
	<div
		class="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse"
		style="animation-duration: 12s;"
	></div>

	<!-- Dot grid -->
	<div
		class="absolute inset-0 pointer-events-none opacity-[0.06] z-[1]"
		style="background-image: radial-gradient(circle, #fff 0.8px, transparent 0.8px); background-size: 32px 32px;"
	></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
		{#if mounted}
			<div class="flex flex-col items-center text-center max-w-4xl mx-auto">
				<!-- Availability badge -->
				<div
					in:fly={{ y: -10, duration: 500, delay: 0 }}
					class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-xs font-semibold text-zinc-300 mb-10 tracking-wide"
				>
					<span
						class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.6)]"
					></span>
					Accepting new clients · Start this week
				</div>

				<!-- Main headline -->
				<h1
					class="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white leading-[1.08] tracking-tight mb-6"
				>
					<span in:blur={{ duration: 700, delay: 80, amount: 8 }}
						>A custom AI operating system</span
					><br />
					<span in:blur={{ duration: 700, delay: 200, amount: 8 }}
						>for your business —</span
					>
					<span
						in:blur={{ duration: 800, delay: 350, amount: 8 }}
						class="font-['Instrument_Serif'] italic text-white/50 font-normal"
					>
						scoped, built,
					</span><br class="hidden sm:block" />
					<span
						in:blur={{ duration: 800, delay: 450, amount: 8 }}
						class="font-['Instrument_Serif'] italic text-white/50 font-normal"
					>
						and maintained in 4 weeks.
					</span>
				</h1>

				<!-- Subheadline — short -->
				<p
					in:blur={{ duration: 600, delay: 250, amount: 5 }}
					class="text-lg md:text-xl text-zinc-400 leading-relaxed font-light max-w-2xl mb-10"
				>
					We automate your repetitive ops — <strong class="font-medium text-zinc-300"
						>calls, scheduling, follow-ups, intake</strong
					> — so your team focuses on clients.
				</p>

				<!-- CTA Row -->
				<div
					in:fly={{ y: 16, duration: 600, delay: 400 }}
					class="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
				>
					<button
						data-cal-link="hafid-ahlaqach-nigixz/15min"
						data-cal-namespace="15min"
						data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
						id="hero-cta-call"
						class="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-zinc-900 px-8 py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 shadow-[0_0_60px_rgba(255,255,255,0.08)] hover:shadow-[0_0_80px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						Book a free discovery call
					</button>

					<a
						href="#case-studies"
						id="hero-cta-work"
						class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] text-white px-8 py-4 rounded-2xl font-semibold text-[15px] transition-all duration-300 backdrop-blur-sm"
					>
						See our work
						<svg class="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</a>
				</div>

				<!-- WHO THIS IS FOR — prominent, visual, scannable -->
				<div
					in:fly={{ y: 20, duration: 600, delay: 500 }}
					class="w-full max-w-4xl"
				>
					<div class="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-5">We build for</div>
					<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
						{#each [
							{ emoji: '🏥', label: 'Clinics' },
							{ emoji: '🏠', label: 'Real Estate' },
							{ emoji: '🔧', label: 'Home Services' },
							{ emoji: '⚖️', label: 'Law Firms' },
							{ emoji: '🏢', label: 'Agencies' },
							{ emoji: '🍽️', label: 'Restaurants' }
						] as industry}
							<div
								class="group flex flex-col items-center gap-2.5 bg-white/[0.03] border border-white/[0.06] rounded-2xl py-4 px-3 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300 hover:-translate-y-0.5 cursor-default"
							>
								<span class="text-2xl group-hover:scale-110 transition-transform duration-300">{industry.emoji}</span>
								<span class="text-[11px] font-semibold text-zinc-400 tracking-wide">{industry.label}</span>
							</div>
						{/each}
					</div>
					<p class="text-zinc-600 text-[12px] mt-4 font-medium">
						+ any business with ops that don't need a human every time
					</p>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.hero-bg {
		background: #09090b;
	}
</style>
