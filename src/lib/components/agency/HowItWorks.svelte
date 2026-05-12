<script lang="ts">
	import { onMount } from 'svelte';
	import { MessageSquare, Wrench, Rocket } from 'lucide-svelte';

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

	const steps = [
		{
			num: '01',
			icon: MessageSquare,
			title: 'Tell us what\'s eating your time',
			desc: 'Book a free 15-minute call. Walk us through the repetitive work — calls, follow-ups, scheduling, data entry — anything that doesn\'t need a human every time.',
			accent: 'from-violet-500/20 to-violet-600/5'
		},
		{
			num: '02',
			icon: Wrench,
			title: 'We scope, design & build it',
			desc: 'We map the workflow, design the system, and build your custom AI operating system. You get a working MVP in 4 weeks — not a pitch deck.',
			accent: 'from-blue-500/20 to-blue-600/5'
		},
		{
			num: '03',
			icon: Rocket,
			title: 'It runs. We maintain it.',
			desc: 'Your system goes live. We handle hosting, updates, bug fixes, and new features as your business grows. You own the code — always.',
			accent: 'from-emerald-500/20 to-emerald-600/5'
		}
	];
</script>

<section id="how-it-works" bind:this={sectionRef} class="py-24 bg-white font-[Poppins]">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-20">
			<div
				class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-8 shadow-sm"
			>
				How it works
			</div>
			<h2
				class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-zinc-900 leading-[1.05]"
			>
				From <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">idea</span>
				to live system.<br />In 3 steps.
			</h2>
			<p class="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto font-light">
				You know what's slowing your business down. We build the system that fixes it.
			</p>
		</div>

		<!-- Steps Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
			{#each steps as step, idx}
				<div
					class="group relative bg-[#14161A] rounded-[2.5rem] p-8 lg:p-10 border border-white/5 shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-white/10"
					style="opacity: {visible ? 1 : 0}; transform: translateY({visible
						? 0
						: 40}px); transition: opacity 0.7s ease {idx * 150}ms, transform 0.7s ease {idx *
						150}ms;"
				>
					<!-- Gradient blob -->
					<div
						class="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br {step.accent} rounded-full blur-[60px] pointer-events-none transition-transform duration-700 group-hover:scale-150"
					></div>

					<!-- Noise texture -->
					<div
						class="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
						style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"
					></div>

					<div class="relative z-10">
						<!-- Step number -->
						<div
							class="text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-600 mb-6"
						>
							Step {step.num}
						</div>

						<!-- Icon -->
						<div
							class="w-14 h-14 rounded-2xl bg-[#212328] border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-zinc-900 group-hover:border-transparent transition-all duration-300 shadow-inner mb-6"
						>
							<svelte:component
								this={step.icon}
								class="w-6 h-6 flex-shrink-0"
							/>
						</div>

						<!-- Title -->
						<h3
							class="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight leading-tight"
						>
							{step.title}
						</h3>

						<!-- Description -->
						<p class="text-zinc-400 text-sm md:text-[15px] leading-relaxed font-light">
							{step.desc}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Objection handler: Why not DIY? -->
		<div
			class="mt-16 max-w-3xl mx-auto bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 md:p-10 relative overflow-hidden"
			style="opacity: {visible ? 1 : 0}; transform: translateY({visible
				? 0
				: 20}px); transition: opacity 0.7s ease 500ms, transform 0.7s ease 500ms;"
		>
			<div class="flex flex-col md:flex-row items-start gap-6">
				<div
					class="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white flex-shrink-0"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<div>
					<h4 class="text-lg font-bold text-zinc-900 mb-2 tracking-tight">
						"Can't I just use Make, Zapier, or GoHighLevel?"
					</h4>
					<p class="text-zinc-500 text-[15px] leading-relaxed font-light">
						Those tools exist, and we even build with some of them. But <strong class="font-medium text-zinc-700">setting them up, connecting them to your
						specific workflows, and making them actually work together reliably</strong> — that's what we do.
						You get a custom system built around your business, not a template you have to babysit.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
