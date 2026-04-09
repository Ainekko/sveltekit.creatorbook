<script lang="ts">
	import { onMount } from 'svelte';
	import { blur, fly } from 'svelte/transition';

	let mounted = false;
	onMount(() => {
		setTimeout(() => (mounted = true), 50);
	});

	const stats = [
		{ value: '4 weeks', label: 'Average ship time' },
		{ value: '100%', label: 'Client retention' },
		{ value: '5+', label: 'AI apps shipped' }
	];
</script>

<section
	class="hero-bg font-[Poppins] relative overflow-hidden py-24 md:py-32 min-h-screen flex flex-col justify-center bg-white"
>
	<!-- Subtle light dot grid overlay -->
	<div
		class="absolute inset-0 pointer-events-none opacity-40"
		style="background-image: radial-gradient(circle, #d4d4d8 1px, transparent 1px); background-size: 28px 28px;"
	></div>

	<!-- Glow orbs — subtle light mode matching the process/values -->
	<div
		class="absolute -top-20 left-1/3 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none"
	></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
		{#if mounted}
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
				<!-- Left Column: Headline and Subheading -->
				<div class="lg:col-span-7 space-y-8 lg:pr-8">
					<h1
						class="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 leading-[1.05] tracking-tight"
					>
						<span in:blur={{ duration: 800, delay: 100, amount: 8 }}>Custom apps &</span><br />
						<span
							in:blur={{ duration: 800, delay: 250, amount: 8 }}
							class="font-['Instrument_Serif'] italic text-zinc-600 font-normal tracking-wide"
							>AI automation</span
						><span in:blur={{ duration: 800, delay: 400, amount: 8 }}> for small business.</span>
					</h1>

					<p
						in:blur={{ duration: 700, delay: 180, amount: 6 }}
						class="text-lg md:text-xl text-zinc-500 leading-relaxed font-light max-w-xl"
					>
						We're a dedicated team building bespoke applications and automation workflows for small
						businesses. <strong class="font-medium text-zinc-700">No ghosting, no lock-in</strong> —
						just high-quality code and a team that actually stays.
					</p>

					<!-- Stats bar moved to left under copy -->
					<div
						in:fly={{ y: 20, duration: 600, delay: 420 }}
						class="flex flex-wrap items-center gap-10 pt-6"
					>
						{#each stats as stat}
							<div>
								<div class="text-2xl font-bold text-zinc-900 tracking-tight">{stat.value}</div>
								<div class="text-xs uppercase tracking-widest text-zinc-500 font-semibold mt-1">
									{stat.label}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Right Column: Bento Card with CTAs -->
				<div class="lg:col-span-5 w-full relative" in:fly={{ y: 30, duration: 800, delay: 200 }}>
					<div
						class="case-card group relative overflow-hidden bg-[#14161A] rounded-[2.5rem] p-8 lg:p-10 border border-zinc-800/80 shadow-2xl flex flex-col justify-between w-full isolate h-[550px] md:h-[600px]"
					>
						<!-- Tasty distorted noise overlay -->
						<div
							class="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none z-10"
							style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"
						></div>

						<!-- Colorful gradient blobs -->
						<div
							class="absolute -top-24 -right-24 w-[350px] h-[350px] bg-violet-600/30 rounded-full blur-[80px] pointer-events-none transition-transform duration-[10s] group-hover:scale-125 z-0"
						></div>
						<div
							class="absolute -bottom-24 -left-24 w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[70px] pointer-events-none transition-transform duration-[15s] group-hover:scale-125 z-0"
						></div>

						<!-- Top Section -->
						<div class="relative z-20 flex justify-between items-start">
							<!-- Availability Badge inside card -->
							<div
								class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1C21]/80 backdrop-blur-sm border border-white/10 shadow-xl text-xs font-semibold text-zinc-200"
							>
								<span
									class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"
								></span>
								Start today
							</div>

							<!-- Floating abstract visual element -->
							<div
								class="absolute -top-6 -right-12 rotate-[12deg] transition-transform duration-500 group-hover:rotate-[16deg] group-hover:scale-105 pointer-events-none hidden md:block"
							>
								<div
									class="w-48 h-32 bg-[#212328] rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden relative"
								>
									<div
										class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [background-size:24px_24px] mix-blend-overlay"
									></div>
									<div class="absolute inset-0 flex flex-wrap gap-2 p-4 opacity-20">
										<div class="w-6 h-6 rounded-full border-[3px] border-emerald-400"></div>
										<div class="w-6 h-6 rounded-sm border-[3px] border-violet-400"></div>
									</div>
									<div
										class="absolute bottom-3 left-3 text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold"
									>
										Automation
									</div>
								</div>
							</div>
						</div>

						<div class="relative z-20 mt-auto pt-16">
							<!-- Typography -->
							<div class="mb-8">
								<h3 class="text-[3.25rem] font-bold text-white mb-2 leading-[1.05] tracking-tight">
									Let's build<br />together.
								</h3>
								<p class="text-zinc-400 text-lg leading-relaxed font-light">
									One team to build your apps and automations.
								</p>
							</div>

							<!-- Massive Primary CTA -->
							<a
								href="#case-studies"
								id="hero-cta-work"
								class="block w-full text-center bg-white hover:bg-zinc-100 text-zinc-900 px-6 py-5 rounded-[1.25rem] font-bold text-[17px] transition-all duration-300 shadow-xl active:scale-[0.98]"
							>
								See our work
							</a>
						</div>

						<!-- Secondary CTA (Bottom row layout) -->
						<div
							class="relative z-20 mt-6 pt-6 border-t border-white/5 flex items-center justify-between"
						>
							<div class="flex items-center gap-4">
								<!-- Icon Container -->
								<div
									class="w-12 h-12 rounded-full bg-[#1A1C21]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden group-hover:border-white/20 transition-colors"
								>
									<svg
										class="w-5 h-5 text-zinc-300"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
										/></svg
									>
								</div>
								<div class="flex flex-col">
									<span class="text-white font-bold text-[15px]">Book a 15-min call</span>
									<span class="text-zinc-400 text-[13px]">Schedule discovery</span>
								</div>
							</div>

							<!-- Arrow Button -->
							<button
								data-cal-link="hafid-ahlaqach-nigixz/30min"
								data-cal-namespace="30min"
								data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
								class="w-12 h-12 rounded-full bg-white hover:bg-zinc-100 text-zinc-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-md flex-shrink-0"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.5"
										d="M14 5l7 7m0 0l-7 7m7-7H3"
									/></svg
								>
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.hero-bg {
		background: white;
	}
</style>
