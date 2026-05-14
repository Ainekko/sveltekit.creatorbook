<script lang="ts">
	import { onMount } from 'svelte';
	import { X, Minus, Check } from 'lucide-svelte';

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

	type RowStatus = 'yes' | 'no' | 'partial' | string;

	interface Row {
		label: string;
		inhouse: RowStatus;
		saas: RowStatus;
		flowjoy: RowStatus;
	}

	const rows: Row[] = [
		{
			label: 'Built 100% for your workflow',
			inhouse: 'yes',
			saas: 'no',
			flowjoy: 'yes'
		},
		{
			label: 'You own the code & tools forever',
			inhouse: 'yes',
			saas: 'no',
			flowjoy: 'yes'
		},
		{
			label: 'Ongoing updates & maintenance',
			inhouse: 'yes',
			saas: 'yes',
			flowjoy: 'yes'
		},
		{
			label: 'No salary, benefits, or hiring costs',
			inhouse: 'no',
			saas: 'yes',
			flowjoy: 'yes'
		},
		{
			label: 'Flexible — pause or cancel anytime',
			inhouse: 'no',
			saas: 'partial',
			flowjoy: 'yes'
		}
	];

	const cols = [
		{
			key: 'inhouse',
			label: 'In-house Dev',
			sub: '$80k–$150k salary + benefits + equity',
			highlight: false,
			headerClass: 'bg-zinc-800/60 border-zinc-700/50'
		},
		{
			key: 'saas',
			label: 'Off-the-shelf SaaS',
			sub: 'Monthly fees — forever. Generic features.',
			highlight: false,
			headerClass: 'bg-zinc-800/60 border-zinc-700/50'
		},
		{
			key: 'flowjoy',
			label: 'Flowjoy',
			sub: 'From $999/mo — cancel or pause anytime.',
			highlight: true,
			headerClass: 'bg-white/[0.08] border-white/20'
		}
	] as const;

	function icon(status: RowStatus) {
		if (status === 'yes') return 'yes';
		if (status === 'no') return 'no';
		if (status === 'partial') return 'partial';
		return 'partial';
	}
</script>

<section
	id="why-us"
	bind:this={sectionRef}
	class="py-24 bg-[#0A0B0E] font-[Poppins] overflow-hidden"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div
			class="text-center mb-16"
			style="opacity: {visible ? 1 : 0}; transform: translateY({visible
				? 0
				: 32}px); transition: opacity 0.7s ease, transform 0.7s ease;"
		>
			<div
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-zinc-400 mb-6"
			>
				<span class="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
				Why Flowjoy
			</div>
			<h2
				class="text-4xl md:text-6xl font-medium text-white mb-5 tracking-tight leading-[1.05]"
			>
				The smarter alternative<br class="hidden md:block" />
				to <span class="font-['Instrument_Serif'] italic font-normal text-zinc-400"
					>both</span
				> extremes.
			</h2>
			<p class="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
				Hiring a dev is a full-time commitment. Generic SaaS never quite fits. We sit
				in the middle — custom tools, flexible terms, and you keep everything.
			</p>
		</div>

		<!-- MOBILE: stacked cards (hidden on md+) -->
		<div class="md:hidden space-y-3">
			{#each rows as row, ri}
				<div
					class="bg-[#0F1114] border border-white/[0.07] rounded-2xl p-5 overflow-hidden"
					style="opacity: {visible ? 1 : 0}; transform: translateY({visible
						? 0
						: 20}px); transition: opacity 0.5s ease {ri * 80}ms, transform 0.5s ease {ri * 80}ms;"
				>
					<p class="text-sm text-zinc-300 font-medium mb-4">{row.label}</p>
					<div class="grid grid-cols-3 gap-2">
						{#each cols as col}
							{@const status = icon(row[col.key])}
							<div
								class="flex flex-col items-center gap-2 rounded-xl py-3 px-2 {col.highlight
									? 'bg-violet-500/[0.08] border border-violet-400/20'
									: 'bg-white/[0.03] border border-white/[0.06]'}"
							>
								<span
									class="text-[10px] font-semibold uppercase tracking-wider {col.highlight
										? 'text-violet-300'
										: 'text-zinc-500'}">{col.label}</span
								>
								{#if status === 'yes'}
									<div
										class="w-6 h-6 rounded-full flex items-center justify-center {col.highlight
											? 'bg-violet-500/20 border border-violet-400/40 shadow-[0_0_10px_rgba(139,92,246,0.3)]'
											: 'bg-zinc-700/50 border border-zinc-600/50'}"
									>
										<Check class="w-3 h-3 {col.highlight ? 'text-violet-300' : 'text-zinc-300'}" />
									</div>
								{:else if status === 'no'}
									<div
										class="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"
									>
										<X class="w-3 h-3 text-red-400" />
									</div>
								{:else}
									<div
										class="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"
									>
										<Minus class="w-3 h-3 text-amber-400" />
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- DESKTOP: comparison table (hidden on mobile) -->
		<div
			class="relative hidden md:block overflow-x-auto rounded-[2rem]"
			style="opacity: {visible ? 1 : 0}; transform: translateY({visible
				? 0
				: 48}px); transition: opacity 0.8s ease 150ms, transform 0.8s ease 150ms;"
		>
			<div
				class="bg-[#0F1114] border border-white/[0.07] rounded-[2rem] overflow-hidden shadow-2xl"
			>
				<!-- Subtle glow behind Flowjoy column -->
				<div
					class="absolute top-0 right-0 w-1/3 h-full bg-violet-600/5 pointer-events-none"
				></div>

				<!-- Column Headers -->
				<div class="grid grid-cols-4 border-b border-white/[0.07]">
					<div class="p-6 md:p-8"></div>
					{#each cols as col}
						<div
							class="p-5 md:p-7 border-l border-white/[0.07] {col.highlight ? 'relative' : ''}"
						>
							{#if col.highlight}
								<div
									class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-violet-500/0 via-violet-400 to-violet-500/0"
								></div>
								<div class="absolute inset-0 bg-violet-500/[0.04] pointer-events-none"></div>
							{/if}
							<div class="relative z-10">
								<p
									class="font-semibold text-sm md:text-base mb-1 {col.highlight
										? 'text-white'
										: 'text-zinc-400'}"
								>
									{col.label}
								</p>
								<p class="text-xs text-zinc-600 leading-snug">{col.sub}</p>
							</div>
						</div>
					{/each}
				</div>

				<!-- Rows -->
				{#each rows as row, ri}
					<div
						class="grid grid-cols-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors duration-200"
						style="opacity: {visible ? 1 : 0}; transform: translateY({visible
							? 0
							: 20}px); transition: opacity 0.5s ease {150 + ri * 60}ms, transform 0.5s ease {150 +
							ri * 60}ms;"
					>
						<div class="px-6 md:px-8 py-5 flex items-center">
							<span class="text-sm md:text-[15px] text-zinc-400 leading-snug">{row.label}</span>
						</div>

						{#each cols as col}
							{@const status = icon(row[col.key])}
							<div
								class="px-5 md:px-7 py-5 flex items-center justify-center border-l border-white/[0.04] {col.highlight
									? 'relative'
									: ''}"
							>
								{#if col.highlight}
									<div class="absolute inset-0 bg-violet-500/[0.04] pointer-events-none"></div>
								{/if}
								{#if status === 'yes'}
									<div
										class="relative w-7 h-7 rounded-full flex items-center justify-center {col.highlight
											? 'bg-violet-500/20 border border-violet-400/40 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
											: 'bg-zinc-700/50 border border-zinc-600/50'}"
									>
										<Check class="w-3.5 h-3.5 {col.highlight ? 'text-violet-300' : 'text-zinc-300'}" />
									</div>
								{:else if status === 'no'}
									<div
										class="relative w-7 h-7 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"
									>
										<X class="w-3.5 h-3.5 text-red-400" />
									</div>
								{:else}
									<div
										class="relative w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"
									>
										<Minus class="w-3.5 h-3.5 text-amber-400" />
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>

		<!-- Legend -->
		<div
			class="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8 text-xs text-zinc-600"
			style="opacity: {visible ? 1 : 0}; transition: opacity 0.6s ease 800ms;"
		>
			<span class="flex items-center gap-1.5">
				<span
					class="w-4 h-4 rounded-full bg-violet-500/20 border border-violet-400/40 inline-flex items-center justify-center"
					><Check class="w-2.5 h-2.5 text-violet-300" /></span
				> Yes
			</span>
			<span class="flex items-center gap-1.5">
				<span
					class="w-4 h-4 rounded-full bg-amber-500/10 border border-amber-500/20 inline-flex items-center justify-center"
					><Minus class="w-2.5 h-2.5 text-amber-400" /></span
				> Sometimes
			</span>
			<span class="flex items-center gap-1.5">
				<span
					class="w-4 h-4 rounded-full bg-red-500/10 border border-red-500/20 inline-flex items-center justify-center"
					><X class="w-2.5 h-2.5 text-red-400" /></span
				> No
			</span>
		</div>
	</div>
</section>
