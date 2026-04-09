<script lang="ts">
	import { Shield, Zap, MessageSquare, BadgeCheck, CheckCircle, Unlock } from 'lucide-svelte';

	const items = [
		{ icon: Shield, title: 'Reliability vs Freelancers' },
		{ icon: Zap, title: '< 4 Weeks Turnaround' },
		{ icon: MessageSquare, title: 'Clear Communication' },
		{ icon: BadgeCheck, title: 'Precise Scoping' },
		{ icon: CheckCircle, title: 'Fast Support' },
		{ icon: Unlock, title: 'Full IP Ownership' }
	];
</script>

<section id="process" class="py-24 bg-white font-[Poppins]">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center max-w-4xl mx-auto mb-16">
			<!-- Header badge -->
			<div
				class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-8 shadow-sm"
			>
				Our Process & Values
			</div>
			<!-- Premium Typography aesthetic -->
			<h2
				class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-zinc-900 leading-[1.05]"
			>
				Software that <span class="font-['Instrument_Serif'] italic font-normal text-zinc-600"
					>works.</span
				><br />
				Teams that stay.
			</h2>
		</div>

		<!-- Mini-Bento Grid of Mix & Match 6 small cards -->
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
			{#each items as item, idx}
				<div
					class="case-card group relative overflow-hidden bg-[#181A1F] rounded-[2rem] p-6 lg:p-8 border border-white/5 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-white/10 flex flex-col items-center justify-center text-center gap-5"
				>
					<!-- Candy gradients -> same styling as ServicesSection -->
					<div
						class="absolute -top-10 -right-10 w-32 h-32 opacity-[0.05] pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:opacity-[0.1]"
					>
						<div class="w-full h-full rounded-full bg-white blur-2xl"></div>
					</div>

					<!-- Visual shape candy background -->
					<div
						class="absolute inset-0 opacity-[0.15] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [background-size:24px_24px] mix-blend-overlay"
					></div>

					<div
						class="w-14 h-14 rounded-2xl bg-[#212328] border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-zinc-900 group-hover:border-transparent transition-all duration-300 relative z-10 shrink-0 shadow-inner"
					>
						<svelte:component
							this={item.icon}
							class="w-6 h-6 flex-shrink-0 -rotate-12 group-hover:rotate-0 transition-transform duration-500"
						/>
					</div>

					<h3
						class="text-[14px] md:text-[15px] font-semibold text-white tracking-tight relative z-10 w-full"
					>
						{item.title}
					</h3>
				</div>
			{/each}
		</div>
	</div>
</section>
