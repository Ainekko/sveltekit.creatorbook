<script lang="ts">
	import { Shield, Zap, MessageSquare, Unlock } from 'lucide-svelte';

	const values = [
		{
			icon: Shield,
			title: 'Reliability vs Freelancers',
			description:
				'Unlike random freelancers from Upwork, we’re here long-term. You get a dedicated team that knows your codebase inside and out, with SLA-backed maintenance and zero ghosting.',
			span: 'md:col-span-6 lg:col-span-3'
		},
		{
			icon: Zap,
			title: 'Shipping in Weeks, Not Months',
			description:
				'We move fast. Expect working MVP turnarounds in less than 4 weeks. Iterative, agile, and always heavily integrating your feedback.',
			span: 'md:col-span-6 lg:col-span-3'
		},
		{
			icon: MessageSquare,
			title: 'Clear & Direct Communication',
			description:
				'No account managers or bloated project coordinators. You talk directly to the engineers building your product. Fast support, dedicated Slack channels.',
			span: 'md:col-span-3 lg:col-span-3'
		},
		{
			icon: Unlock,
			title: 'You Own Everything',
			description:
				'Every line of code, every asset, every database entry — full IP transfer from day one. No vendor lock-in, ever.',
			span: 'md:col-span-3 lg:col-span-3'
		}
	];
</script>

<section id="values" class="py-24 bg-white font-[Poppins]">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-16">
			<div
				class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-6 shadow-sm"
			>
				Our Values
			</div>
			<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
				<h2
					class="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.05] max-w-2xl"
				>
					Why work with <span class="font-['Instrument_Serif'] italic font-normal text-zinc-600"
						>us?</span
					>
				</h2>
			</div>
		</div>

		<!-- Bento Grid -->
		<div class="grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-8">
			{#each values as value, idx}
				<div
					class="{value.span} case-card group relative overflow-hidden bg-[#181A1F] rounded-[2.5rem] p-8 lg:p-10 border border-white/5 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-white/10 flex flex-col justify-between"
				>
					<!-- Candy glow -->
					<div
						class="absolute -bottom-16 -right-16 w-64 h-64 opacity-[0.05] pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:opacity-[0.1]"
					>
						<div class="w-full h-full rounded-full bg-white blur-3xl"></div>
					</div>

					<!-- Subtle pattern overlay -->
					<div
						class="absolute inset-0 opacity-[0.15] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [background-size:24px_24px] mix-blend-overlay"
					></div>

					<div
						class="relative z-10 w-16 h-16 rounded-[1.25rem] bg-[#212328] border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-zinc-900 group-hover:border-transparent transition-all duration-300 shadow-inner mb-24 shrink-0"
					>
						<svelte:component
							this={value.icon}
							class="w-7 h-7 flex-shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
						/>
					</div>

					<div class="relative z-10">
						<h3 class="text-2xl font-bold text-white tracking-tight mb-4">
							{value.title}
						</h3>
						<p class="text-zinc-400 text-[15px] leading-relaxed font-light">
							{value.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
