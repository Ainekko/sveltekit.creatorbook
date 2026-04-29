<script lang="ts">
	import { onMount } from 'svelte';
	import type { CaseStudy } from '$lib/data/caseStudies';
	import {
		Search,
		TrendingUp,
		FileText,
		PenTool,
		Zap,
		Target,
		AlertCircle,
		MessageCircle,
		Filter,
		Shield
	} from 'lucide-svelte';

	export let caseStudies: CaseStudy[] = [];

	let visibleCards: Set<number> = new Set();

	const iconMap: Record<string, any> = {
		search: Search,
		'trending-up': TrendingUp,
		'file-text': FileText,
		'pen-tool': PenTool,
		zap: Zap,
		target: Target,
		'alert-circle': AlertCircle,
		'message-circle': MessageCircle,
		filter: Filter,
		shield: Shield
	};

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
		quote: 'Client: MHR',
		author: '',
		role: '',
		project: '',
		initials: '',
		avatarColor: ''
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

		<!-- Case Studies List -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-24">
			{#each caseStudies as study, idx}
				<div
					class="case-card group relative grid grid-cols-1 sm:grid-cols-3 gap-3 w-full rounded-[2.5rem] p-3 overflow-hidden bg-[#181A1F] border border-white/5 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-white/10"
					data-idx={idx}
					style="opacity: {visibleCards.has(idx) ? 1 : 0}; transform: translateY({visibleCards.has(
						idx
					)
						? 0
						: 40}px); transition: opacity 0.8s ease {idx * 150}ms, transform 0.8s ease {idx *
						150}ms;"
				>
					<!-- Left Side: Main Visual + Title (2/3 width) -->
					<div class="sm:col-span-2 flex flex-col gap-3">
						<!-- Visual Box -->
						<a
							href="/case-studies/{study.slug}"
							class="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-zinc-800 block group/img"
						>
							{#if study.coverImage}
								<!-- Cover fills the full box — no screenshot on top -->
								<img
									src={study.coverImage}
									alt="{study.title} cover"
									class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
									loading="lazy"
								/>
								<!-- Subtle vignette so the card edge stays sharp -->
								<div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
							{:else if study.accentColor === 'violet'}
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
						</a>

						<!-- Title Strip -->
						<a
							href="/case-studies/{study.slug}"
							class="relative bg-[#212328] rounded-[2rem] p-5 flex items-center justify-between overflow-hidden shadow-inner border border-white/5 block w-full"
						>
							<div
								class="absolute -right-8 -bottom-8 w-32 h-32 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:opacity-30"
							>
								<div class="w-full h-full rounded-full bg-white blur-2xl"></div>
							</div>

							<div class="flex flex-col relative z-10 flex-1 min-w-0 pr-4">
								{#if study.techLogos && study.techLogos.length > 0}
									<div class="flex items-center gap-1.5 mb-2">
										{#each study.techLogos as logo}
											<div
												title={logo.label}
												class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/8 border border-white/10"
											>
												<img src={logo.src} alt={logo.label} class="w-3 h-3 object-contain" />
												<span class="text-[9px] font-semibold text-zinc-400">{logo.label}</span>
											</div>
										{/each}
									</div>
								{:else}
									<span class="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-1"
										>Project</span
									>
								{/if}
								<h3
									class="text-[15px] font-semibold text-white tracking-tight leading-tight w-full truncate"
								>
									{study.title}
								</h3>
							</div>

							<div
								class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 relative z-10 shrink-0 group-hover:bg-white group-hover:text-zinc-900 group-hover:border-transparent"
							>
								<svg class="w-4 h-4 -rotate-45" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V5C3 4.44772 3.44772 4 4 4H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"
									></path>
								</svg>
							</div>
						</a>
					</div>

					<!-- Right Side: Mini Outcome Cards Stack (1/3 width) -->
					<div class="sm:col-span-1 flex flex-col gap-3 min-h-0">
						{#each study.features.slice(0, 4) as feature}
							<div
								class="flex-1 min-h-[3.5rem] bg-[#212328] rounded-[1.5rem] border border-white/5 px-4 py-3 flex items-center justify-center text-center shadow-inner transition-colors duration-300 hover:bg-white/5"
							>
								<h4 class="text-zinc-300 font-bold text-[13px] leading-tight tracking-wide">
									{feature.title}
								</h4>
							</div>
						{/each}
					</div>
				</div>
			{/each}

			<!-- Testimonial card (Integrated into Bento) -->
			<div
				class="case-card group relative lg:col-span-2 md:col-span-2 w-full rounded-[2.5rem] p-3 overflow-hidden bg-[#181A1F] border border-white/5 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-white/10 flex flex-col md:flex-row gap-3"
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

					<div class="relative z-10 flex flex-col {testimonial.author ? '' : 'items-center text-center'}">
						{#if testimonial.author}
						<svg class="w-8 h-8 text-white/10 mb-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
							/>
						</svg>
						{/if}
						<blockquote
							class="text-white text-lg md:text-xl font-medium leading-relaxed mb-4 max-w-4xl"
						>
							{#if testimonial.author}
								"{testimonial.quote}"
							{:else}
								{testimonial.quote}
							{/if}
						</blockquote>
					</div>
				</div>

				{#if testimonial.author}
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
				{/if}
			</div>
		</div>
	</div>
</section>
