<script lang="ts">
	import { onMount } from 'svelte';
	import { blur, fly } from 'svelte/transition';

	let mounted = false;
	onMount(() => {
		setTimeout(() => (mounted = true), 50);
	});
</script>

<section
	class="hero-bg font-[Poppins] relative overflow-hidden py-20 md:py-28 min-h-[92vh] flex flex-col justify-center bg-white"
>
	<!-- Prism gradient mesh — slow rotating rainbow -->
	<div class="prism-wrap">
		<div class="prism-blob prism-1"></div>
		<div class="prism-blob prism-2"></div>
		<div class="prism-blob prism-3"></div>
		<div class="prism-blob prism-4"></div>
	</div>

	<!-- Noise overlay -->
	<div class="noise-overlay"></div>

	<!-- Subtle dot grid -->
	<div
		class="absolute inset-0 pointer-events-none opacity-[0.35] z-[2]"
		style="background-image: radial-gradient(circle, #d4d4d8 0.6px, transparent 0.6px); background-size: 28px 28px;"
	></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
		{#if mounted}
			<div class="flex flex-col items-center text-center max-w-4xl mx-auto">
				<!-- Availability badge -->
				<div
					in:fly={{ y: -10, duration: 500, delay: 0 }}
					class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-zinc-200 shadow-sm text-xs font-semibold text-zinc-600 mb-10 tracking-wide"
				>
					<span
						class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"
					></span>
					Accepting new clients · Start this week
				</div>

				<!-- Main headline -->
				<h1
					class="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-zinc-900 leading-[1.08] tracking-tight mb-6"
				>
					<span in:blur={{ duration: 700, delay: 80, amount: 8 }}
						>A custom AI operating system</span
					><br />
					<span in:blur={{ duration: 700, delay: 200, amount: 8 }}
						>for your business —</span
					>
					<span
						in:blur={{ duration: 800, delay: 350, amount: 8 }}
						class="font-['Instrument_Serif'] italic text-zinc-500 font-normal"
					>
						scoped, built,
					</span><br class="hidden sm:block" />
					<span
						in:blur={{ duration: 800, delay: 450, amount: 8 }}
						class="font-['Instrument_Serif'] italic text-zinc-500 font-normal"
					>
						and maintained in 4 weeks.
					</span>
				</h1>

				<!-- Subheadline -->
				<p
					in:blur={{ duration: 600, delay: 250, amount: 5 }}
					class="text-lg md:text-xl text-zinc-500 leading-relaxed font-light max-w-2xl mb-10"
				>
					We automate your repetitive ops — <strong class="font-medium text-zinc-700"
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
						class="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
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
						class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/70 hover:bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-700 px-8 py-4 rounded-2xl font-semibold text-[15px] transition-all duration-300 backdrop-blur-sm shadow-sm"
					>
						See our work
						<svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</a>
				</div>

				<!-- WHO THIS IS FOR -->
				<div
					in:fly={{ y: 20, duration: 600, delay: 500 }}
					class="w-full max-w-4xl"
				>
					<div class="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-5">We build for</div>
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
								class="group flex flex-col items-center gap-2.5 bg-white/60 backdrop-blur-sm border border-zinc-200/80 rounded-2xl py-4 px-3 hover:bg-white hover:border-zinc-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-default"
							>
								<span class="text-2xl group-hover:scale-110 transition-transform duration-300">{industry.emoji}</span>
								<span class="text-[11px] font-semibold text-zinc-500 tracking-wide">{industry.label}</span>
							</div>
						{/each}
					</div>
					<p class="text-zinc-400 text-[12px] mt-4 font-medium">
						+ any business with ops that don't need a human every time
					</p>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.hero-bg {
		background: #fff;
	}

	/* ── Prism container ── */
	.prism-wrap {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		overflow: hidden;
		filter: blur(80px) saturate(1.8);
		opacity: 0.45;
	}

	/* ── Individual colour blobs ── */
	.prism-blob {
		position: absolute;
		border-radius: 50%;
		will-change: transform;
	}

	.prism-1 {
		width: 45%;
		height: 55%;
		top: -15%;
		left: -8%;
		background: conic-gradient(
			from 0deg,
			#ff6b6b,
			#feca57,
			#48dbfb,
			#ff9ff3,
			#ff6b6b
		);
		animation: drift1 18s ease-in-out infinite;
	}

	.prism-2 {
		width: 40%;
		height: 50%;
		bottom: -20%;
		right: -10%;
		background: conic-gradient(
			from 120deg,
			#0abde3,
			#a29bfe,
			#fd79a8,
			#fdcb6e,
			#0abde3
		);
		animation: drift2 22s ease-in-out infinite;
	}

	.prism-3 {
		width: 30%;
		height: 40%;
		top: 30%;
		right: 15%;
		background: conic-gradient(
			from 240deg,
			#6c5ce7,
			#00cec9,
			#e17055,
			#74b9ff,
			#6c5ce7
		);
		animation: drift3 25s ease-in-out infinite;
	}

	.prism-4 {
		width: 25%;
		height: 35%;
		bottom: 10%;
		left: 20%;
		background: conic-gradient(
			from 60deg,
			#fd79a8,
			#fdcb6e,
			#00b894,
			#e84393,
			#fd79a8
		);
		animation: drift4 20s ease-in-out infinite;
	}

	/* ── Drift keyframes ── */
	@keyframes drift1 {
		0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
		33%      { transform: translate(8%, 12%) rotate(40deg) scale(1.08); }
		66%      { transform: translate(-5%, 6%) rotate(-20deg) scale(0.95); }
	}

	@keyframes drift2 {
		0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
		33%      { transform: translate(-10%, -8%) rotate(-35deg) scale(1.1); }
		66%      { transform: translate(6%, -4%) rotate(25deg) scale(0.92); }
	}

	@keyframes drift3 {
		0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
		50%      { transform: translate(-12%, 10%) rotate(50deg) scale(1.12); }
	}

	@keyframes drift4 {
		0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
		40%      { transform: translate(10%, -6%) rotate(-30deg) scale(1.05); }
		70%      { transform: translate(-8%, 8%) rotate(20deg) scale(0.98); }
	}

	/* ── Noise overlay ── */
	.noise-overlay {
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		opacity: 0.12;
		mix-blend-mode: overlay;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
	}
</style>
