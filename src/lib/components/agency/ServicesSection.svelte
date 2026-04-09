<script lang="ts">
	import { onMount } from 'svelte';
	import { Bot, Zap, Shield, BarChart3, Globe, MessageSquare } from 'lucide-svelte';

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
		return () => obs.disconnect();
	});

	// Consolidated to exactly 6 punchy services
	const services = [
		{ icon: Bot, title: 'AI Automation' },
		{ icon: BarChart3, title: 'Internal Tools' },
		{ icon: Globe, title: 'Custom SaaS' },
		{ icon: Zap, title: 'Fast Shipping' },
		{ icon: MessageSquare, title: 'Direct Access' },
		{ icon: Shield, title: 'Full Ownership' }
	];
</script>

<section id="services" bind:this={sectionRef} class="py-24 bg-white font-[Poppins]">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header styled to match cohesive aesthetic -->
		<div class="text-center mb-16">
			<div
				class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-8 shadow-sm"
			>
				What we do
			</div>
			<h2
				class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-zinc-900 leading-[1.05]"
			>
				The way development<br />
				<span class="font-['Instrument_Serif'] italic font-normal text-zinc-600">should've</span> been
				done.
			</h2>
			<p class="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto mt-6 font-light">
				We replaced unreliable freelancers and expensive traditional agencies for one streamlined
				process.
			</p>
		</div>

		<!-- Services Mini-Bento Grid (6 cols) -->
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
			{#each services as service, idx}
				<div
					class="case-card group relative overflow-hidden bg-[#181A1F] rounded-[2rem] p-6 lg:p-8 border border-white/5 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-white/10 flex flex-col items-center justify-center text-center gap-5"
					style="opacity: {visible ? 1 : 0}; transform: translateY({visible
						? 0
						: 30}px); transition: opacity 0.6s ease {idx * 100}ms, transform 0.6s ease {idx *
						100}ms;"
				>
					<!-- Candy gradients matching Our Work section -->
					<div
						class="absolute -top-10 -right-10 w-32 h-32 opacity-[0.05] pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:opacity-[0.1]"
					>
						<div class="w-full h-full rounded-full bg-white blur-2xl"></div>
					</div>

					<div
						class="w-14 h-14 rounded-2xl bg-[#212328] border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-zinc-900 group-hover:border-transparent transition-all duration-300 relative z-10 shrink-0 shadow-inner"
					>
						<svelte:component
							this={service.icon}
							class="w-6 h-6 flex-shrink-0 -rotate-12 group-hover:rotate-0 transition-transform duration-500"
						/>
					</div>

					<h3
						class="text-[14px] md:text-[15px] font-semibold text-white tracking-tight relative z-10 w-full"
					>
						{service.title}
					</h3>
				</div>
			{/each}
		</div>
	</div>
</section>
