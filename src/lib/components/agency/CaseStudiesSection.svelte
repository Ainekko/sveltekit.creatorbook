<script lang="ts">
	import { onMount } from 'svelte';
	import type { CaseStudy } from '$lib/data/caseStudies';

	export let caseStudies: CaseStudy[] = [];

	let visibleCards: Set<number> = new Set();

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const idx = parseInt(entry.target.getAttribute('data-idx') || '0');
						visibleCards = new Set([...visibleCards, idx]);
					}
				});
			},
			{ threshold: 0.08 }
		);
		document.querySelectorAll('.case-card').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});

	const accentMap: Record<string, { pill: string; cta: string; metric: string }> = {
		blue: {
			pill: 'bg-blue-50 text-blue-700 border border-blue-100',
			cta: 'text-blue-600 hover:text-blue-800',
			metric: 'text-blue-600'
		},
		orange: {
			pill: 'bg-orange-50 text-orange-700 border border-orange-100',
			cta: 'text-orange-600 hover:text-orange-800',
			metric: 'text-orange-600'
		},
		violet: {
			pill: 'bg-violet-50 text-violet-700 border border-violet-100',
			cta: 'text-violet-600 hover:text-violet-800',
			metric: 'text-violet-600'
		}
	};

	function accent(color: string) {
		return accentMap[color] ?? accentMap['violet'];
	}

	// Testimonial
	const testimonial = {
		quote:
			"I was losing leads every week and didn't even know it. They mapped the whole problem, built the CRM automation, and set up a follow-up system in under a month. The system runs itself now.",
		author: 'Marcus R.',
		role: 'Owner, Home Remodeling Co.',
		project: 'CRM & Automation Setup',
		initials: 'MR',
		avatarColor: 'bg-zinc-800'
	};
</script>

<section id="case-studies" class="py-24 bg-white font-[Poppins]">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section header -->
		<div class="mb-24">
			<div
				class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-8"
			>
				Work
			</div>
			<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
				<h2
					class="text-5xl md:text-7xl lg:text-8xl font-medium text-zinc-900 leading-[0.95] tracking-tight max-w-2xl"
				>
					Software that <span class="font-['Instrument_Serif'] italic font-normal text-zinc-600"
						>actually</span
					> works.
				</h2>
				<p
					class="text-zinc-500 text-lg md:text-xl font-light max-w-xs md:text-right leading-relaxed mb-2"
				>
					Live products — designed, built, and maintained by us.
				</p>
			</div>
		</div>

		<!-- Case Studies & Testimonial Bento Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 mb-24">
			{#each caseStudies as study, idx}
				{@const isFeatured = idx === 0}
				<!-- Grid Cell / Card -->
				<a
					href="/case-studies/{study.slug}"
					class="case-card group relative grid grid-cols-1 sm:grid-cols-2 gap-3 w-full rounded-[2.5rem] p-3 overflow-hidden bg-[#181A1F] border border-white/5 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-white/10 {isFeatured
						? 'lg:col-span-4'
						: 'lg:col-span-2'} md:col-span-2"
					data-idx={idx}
					style="opacity: {visibleCards.has(idx) ? 1 : 0}; transform: translateY({visibleCards.has(
						idx
					)
						? 0
						: 40}px); transition: opacity 0.8s ease {idx * 150}ms, transform 0.8s ease {idx *
						150}ms;"
				>
					<!-- Top Bento box: Visual Half -->
					<div
						class="col-span-2 sm:col-span-2 relative w-full {isFeatured
							? 'aspect-[16/10] lg:aspect-[16/9]'
							: 'aspect-square'} rounded-[2rem] overflow-hidden bg-zinc-800 flex flex-col items-center justify-end px-6 pt-12"
					>
						<!-- Gradient backgrounds -->
						{#if study.accentColor === 'violet'}
							<div
								class="absolute inset-0 bg-gradient-to-br from-[#E2D4F0] via-[#F4D9DC] to-[#FADAB8]"
							></div>
						{:else if study.accentColor === 'blue'}
							<div
								class="absolute inset-0 bg-gradient-to-br from-[#D4E8F0] via-[#D9F4ED] to-[#B8FAE4]"
							></div>
						{:else if study.accentColor === 'orange'}
							<div
								class="absolute inset-0 bg-gradient-to-br from-[#F0DFD4] via-[#F4DDD9] to-[#FAB8B8]"
							></div>
						{:else}
							<div class="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300"></div>
						{/if}

						<!-- Visual shape candy -->
						<div
							class="absolute inset-0 opacity-[0.15] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [background-size:24px_24px]"
						></div>

						<!-- Floating embedded screenshot -->
						<div
							class="relative z-10 w-[95%] sm:w-[90%] rounded-t-[1.25rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.15)] transition-transform duration-700 ease-out translate-y-6 group-hover:translate-y-3 group-hover:scale-[1.02]"
						>
							<img
								src={study.heroImage}
								alt={study.title}
								class="w-full h-auto object-cover object-top"
								loading="lazy"
							/>
						</div>
					</div>

					<!-- Bottom Left Bento box: Title & Arrow -->
					<div
						class="col-span-1 relative bg-[#212328] rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden shadow-inner border border-white/5"
					>
						<!-- Visual gradient blob candy -->
						<div
							class="absolute -right-8 -bottom-8 w-32 h-32 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:opacity-30"
						>
							<div class="w-full h-full rounded-full bg-white blur-2xl"></div>
						</div>
						<div class="flex flex-col relative z-10">
							<span class="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2"
								>Project</span
							>
							<h3
								class="text-xl lg:text-2xl font-semibold text-white tracking-tight leading-[1.2] mb-5 pr-2"
							>
								{study.title}
							</h3>
						</div>
						<div
							class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-zinc-900 group-hover:border-transparent transition-all duration-300 relative z-10 shrink-0"
						>
							<svg class="w-4 h-4 -rotate-45" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V5C3 4.44772 3.44772 4 4 4H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"
								></path>
							</svg>
						</div>
					</div>

					<!-- Bottom Right Bento box: Description -->
					<div
						class="col-span-1 relative bg-[#212328] rounded-[2rem] p-6 flex flex-col justify-start overflow-hidden border border-white/5 shadow-inner"
					>
						<!-- Dot pattern candy -->
						<div
							class="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:20px_20px] mix-blend-overlay"
						></div>
						<p class="text-zinc-400 text-[14px] leading-relaxed font-light relative z-10">
							{study.shortDescription}
						</p>
					</div>
				</a>
			{/each}

			<!-- Testimonial card (Integrated into Bento) -->
			<div
				class="case-card group relative lg:col-span-6 md:col-span-2 w-full rounded-[2.5rem] p-3 overflow-hidden bg-[#181A1F] border border-white/5 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-white/10 flex flex-col md:flex-row gap-3"
				style="opacity: {visibleCards.size > 0 ? 1 : 0}; transform: translateY({visibleCards.size >
				0
					? 0
					: 20}px); transition: opacity 0.7s ease 300ms, transform 0.7s ease 300ms;"
			>
				<!-- Inner Bento Box for Quote -->
				<div
					class="flex-1 relative bg-[#212328] rounded-[2rem] p-8 md:p-10 flex flex-col justify-center overflow-hidden border border-white/5 shadow-inner"
				>
					<!-- Visual gradient blob candy -->
					<div
						class="absolute -left-12 -bottom-12 w-64 h-64 opacity-10 pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:opacity-20"
					>
						<div class="w-full h-full rounded-full bg-indigo-500 blur-3xl"></div>
					</div>

					<div class="relative z-10 flex flex-col">
						<svg class="w-8 h-8 text-white/10 mb-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
							/>
						</svg>
						<blockquote
							class="text-white text-lg md:text-xl font-medium leading-relaxed mb-4 max-w-4xl"
						>
							"{testimonial.quote}"
						</blockquote>
					</div>
				</div>

				<!-- Inner Bento Box for Author -->
				<div
					class="w-full md:w-[350px] lg:w-[400px] relative bg-[#212328] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden border border-white/5 shadow-inner"
				>
					<!-- Dot pattern candy -->
					<div
						class="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:20px_20px] mix-blend-overlay"
					></div>

					<div class="flex items-center gap-5 relative z-10">
						<div
							class="w-16 h-16 rounded-full {testimonial.avatarColor} border border-white/10 flex items-center justify-center shrink-0 shadow-[0_4px_20px_rgb(0,0,0,0.5)]"
						>
							<span class="text-white font-bold text-xl">{testimonial.initials}</span>
						</div>
						<div>
							<div class="text-white font-medium text-[15px]">{testimonial.author}</div>
							<div class="text-zinc-500 text-sm mt-0.5">{testimonial.role}</div>
						</div>
					</div>
					<div class="relative z-10 mt-8 pt-6 border-t border-white/5">
						<span
							class="text-zinc-500 text-[11px] font-bold tracking-[0.1em] uppercase flex items-center gap-2"
						>
							<svg
								class="w-3.5 h-3.5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M22 11.08V12a10 10 2-5.93-9.14"></path><polyline
									points="22 4 12 14.01 9 11.01"
								></polyline></svg
							>
							{testimonial.project}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
