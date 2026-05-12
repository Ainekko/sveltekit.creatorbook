<script lang="ts">
	import { onMount } from 'svelte';

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
			{ threshold: 0.1 }
		);
		obs.observe(sectionRef);
		return () => obs.disconnect();
	});
</script>

<section bind:this={sectionRef} class="py-24 bg-zinc-50 font-[Poppins] px-4 sm:px-6 lg:px-8">
	<div
		class="max-w-7xl mx-auto bg-[#0F1114] rounded-[2.5rem] relative overflow-hidden shadow-2xl p-12 md:p-24"
	>
		<!-- Background elements -->
		<div
			class="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-500/8 rounded-full blur-[100px] pointer-events-none"
		></div>
		<div
			class="absolute -bottom-32 right-10 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[100px] pointer-events-none"
		></div>

		<!-- Noise -->
		<div
			class="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
			style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"
		></div>

		<div class="relative z-10 text-center">
			<div
				style="opacity: {visible ? 1 : 0}; transform: translateY({visible
					? 0
					: 40}px); transition: opacity 0.8s ease 0ms, transform 0.8s ease 0ms;"
			>
				<!-- Badge -->
				<div
					class="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-wider"
				>
					<span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
					Ready to start
				</div>

				<h2
					class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[0.95]"
				>
					Tell us what's<br />
					<span class="font-['Instrument_Serif'] italic font-normal text-white/50"
						>slowing you down.</span
					>
				</h2>

				<p
					class="text-lg md:text-xl font-light text-white/40 mb-12 max-w-xl mx-auto leading-relaxed"
				>
					15-minute call. No pitch. We'll listen to the problem and tell you honestly if we can solve it.
				</p>

				<!-- CTAs -->
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
					<button
						data-cal-link="hafid-ahlaqach-nigixz/15min"
						data-cal-namespace="15min"
						data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
						id="final-cta-meeting"
						class="group inline-flex items-center gap-3 bg-white text-zinc-900 hover:bg-zinc-100 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-[0_0_60px_rgba(255,255,255,0.06)] hover:shadow-[0_0_80px_rgba(255,255,255,0.12)] hover:scale-[1.03]"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						Book a discovery call
					</button>
				</div>

				<!-- Reassurance row -->
				<div class="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
					{#each ['No commitment', 'Response within 24h', 'Clear pricing upfront', 'Money-back guarantee'] as item}
						<span class="flex items-center gap-1.5">
							<svg
								class="w-4 h-4 text-emerald-400 flex-shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
							{item}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
