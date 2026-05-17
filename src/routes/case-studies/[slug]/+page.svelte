<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import AgencyFooter from '$lib/components/agency/AgencyFooter.svelte';
	import { ArrowLeft, CheckCircle2 } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { getCaseStudyBySlug } from '$lib/data/caseStudies';
	import { onMount } from 'svelte';

	let visible = false;

	onMount(() => {
		setTimeout(() => (visible = true), 100);
	});

	$: slug = $page.params.slug;
	$: study = getCaseStudyBySlug(slug) || getCaseStudyBySlug('nai-seo-agent');

	const heroGradientMap: Record<string, string> = {
		blue: 'from-[#D4E8F0] via-[#D9F4ED] to-[#B8FAE4]',
		orange: 'from-[#F0DFD4] via-[#F4DDD9] to-[#FAB8B8]',
		violet: 'from-[#E2D4F0] via-[#F4D9DC] to-[#FADAB8]'
	};
	$: heroGradient = study ? heroGradientMap[study.accentColor] || heroGradientMap['violet'] : '';
</script>

<svelte:head>
	<title>{study?.title || 'Case Study'} [Case Study] | Flowjoy</title>
	<meta name="description" content={study?.shortDescription || 'A Flowjoy case study — real AI systems built for real businesses.'} />
	<meta property="og:title" content="{study?.title || 'Case Study'} [Case Study] | Flowjoy" />
	<meta property="og:description" content={study?.shortDescription || 'A Flowjoy case study.'} />
	<meta property="og:type" content="article" />
	{#if study?.coverImage}
		<meta property="og:image" content={study.coverImage} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{study?.title || 'Case Study'} | Flowjoy" />
	<meta name="twitter:description" content={study?.shortDescription || 'A Flowjoy case study.'} />
</svelte:head>

{#if study}
	<div class="sticky top-0 z-50">
		<NavBar />
	</div>

	<main class="bg-white font-[Poppins] min-h-screen">
		<!-- ─── HERO ───────────────────────────────────────────────── -->
		<header class="bg-white pt-24 pb-0">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<!-- back link -->
				<a
					href="/#case-studies"
					class="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-12 font-semibold text-xs tracking-widest uppercase"
				>
					<ArrowLeft class="w-3.5 h-3.5" /> Back to work
				</a>

				<!-- Title row -->
				<div
					class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
					style="opacity:{visible ? 1 : 0}; transform:translateY({visible
						? 0
						: 20}px); transition: opacity 0.7s ease, transform 0.7s ease;"
				>
					<div class="max-w-3xl">
						<div
							class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-6"
						>
							{study.industry}
						</div>
						<h1
							class="text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-900 leading-[0.95] tracking-tight"
						>
							{study.title}
						</h1>
					</div>
					<div class="text-zinc-500 text-lg font-light max-w-xs leading-relaxed lg:text-right mb-2">
						{study.shortDescription}
					</div>
				</div>
			</div>
		</header>

		<!-- ─── HERO IMAGE ────────────────────────────────────────── -->
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
			<div
				class="relative rounded-[2.5rem] overflow-hidden aspect-[16/9] {study.coverImage
					? ''
					: 'bg-gradient-to-br ' + heroGradient}"
				style="opacity:{visible ? 1 : 0}; transform:translateY({visible
					? 0
					: 30}px); transition: opacity 0.8s ease 200ms, transform 0.8s ease 200ms;"
			>
				{#if study.coverImage}
					<!-- Cover photo fills the full frame -->
					<img
						src={study.coverImage}
						alt="{study.title} cover"
						class="absolute inset-0 w-full h-full object-cover object-center"
					/>
					<!-- Subtle bottom vignette -->
					<div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
				{:else}
					<div
						class="absolute inset-0 opacity-[0.12] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [background-size:24px_24px]"
					></div>
				{/if}
			</div>
		</div>

		<!-- ─── METRICS BENTO STRIP ──────────────────────────────── -->
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
			<div
				class="grid grid-cols-2 md:grid-cols-4 gap-4"
				style="opacity:{visible ? 1 : 0}; transition: opacity 0.9s ease 350ms;"
			>
				{#each study.metrics as metric}
					<div
						class="bg-[#181A1F] rounded-[2rem] p-7 flex flex-col justify-between border border-white/5 relative overflow-hidden group hover:-translate-y-0.5 transition-transform duration-300"
					>
						<div class="absolute -right-6 -bottom-6 w-24 h-24 opacity-[0.08] pointer-events-none">
							<div class="w-full h-full rounded-full bg-white blur-2xl"></div>
						</div>
						<div class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
							{metric.value}
						</div>
						<div class="text-xs font-semibold text-zinc-500 uppercase tracking-widest leading-snug">
							{metric.label}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- ─── MAIN CONTENT GRID ────────────────────────────────── -->
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
				<!-- LEFT: Story cards -->
				<div class="lg:col-span-8 flex flex-col gap-6">
					<!-- The Challenge -->
					<div
						class="bg-[#181A1F] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
					>
						<div class="absolute -left-12 -bottom-12 w-48 h-48 opacity-[0.06] pointer-events-none">
							<div class="w-full h-full rounded-full bg-rose-400 blur-3xl"></div>
						</div>
						<div class="relative z-10">
							<div
								class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8"
							>
								01 · Challenge
							</div>
							<h2 class="text-3xl font-bold text-white tracking-tight mb-6 leading-snug">
								The Challenge
							</h2>
							<p class="text-zinc-400 text-lg leading-relaxed font-light">{study.challenge}</p>
						</div>
					</div>

					<!-- The Solution -->
					<div
						class="bg-[#181A1F] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
					>
						<div class="absolute -right-12 -bottom-12 w-48 h-48 opacity-[0.06] pointer-events-none">
							<div class="w-full h-full rounded-full bg-indigo-400 blur-3xl"></div>
						</div>
						<div class="relative z-10">
							<div
								class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8"
							>
								02 · Solution
							</div>
							<h2 class="text-3xl font-bold text-white tracking-tight mb-6 leading-snug">
								The Solution
							</h2>
							<p class="text-zinc-400 text-lg leading-relaxed font-light mb-10">{study.solution}</p>

							<!-- Screenshots -->
							{#if study.screenshots.length > 0}
								<div class="flex flex-col gap-5">
									{#each study.screenshots as shot}
										<figure
											class="rounded-[2rem] overflow-hidden bg-[#212328] border border-white/5"
										>
											<img src={shot.src} alt={shot.alt} class="w-full h-auto" loading="lazy" />
											<figcaption
												class="px-6 py-4 border-t border-white/5 text-xs text-zinc-500 font-semibold uppercase tracking-widest"
											>
												{shot.caption}
											</figcaption>
										</figure>
									{/each}
								</div>
							{/if}
						</div>
					</div>

					<!-- The Results -->
					<div
						class="bg-[#181A1F] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
					>
						<div class="absolute -right-12 -top-12 w-48 h-48 opacity-[0.06] pointer-events-none">
							<div class="w-full h-full rounded-full bg-emerald-400 blur-3xl"></div>
						</div>
						<div class="relative z-10">
							<div
								class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8"
							>
								03 · Results
							</div>
							<h2 class="text-3xl font-bold text-white tracking-tight mb-6 leading-snug">
								The Results
							</h2>
							<p class="text-zinc-400 text-lg leading-relaxed font-light">{study.results}</p>
						</div>
					</div>
				</div>

				<!-- RIGHT: Sidebar bento cards -->
				<div class="lg:col-span-4 flex flex-col gap-6">
					<!-- Quote -->
					{#if study.quote}
						<div
							class="bg-[#181A1F] rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden"
						>
							<div class="absolute -left-8 -bottom-8 w-40 h-40 opacity-[0.08] pointer-events-none">
								<div class="w-full h-full rounded-full bg-violet-500 blur-3xl"></div>
							</div>
							<div class="relative z-10">
								<svg class="w-7 h-7 text-white/15 mb-6" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
									/>
								</svg>
								<blockquote class="text-white text-base font-medium leading-relaxed mb-6">
									{#if study.quote.author}
										"{study.quote.text}"
									{:else}
										{study.quote.text}
									{/if}
								</blockquote>
								{#if study.quote.author}
								<div>
									<div class="font-bold text-sm text-white">{study.quote.author}</div>
									<div class="text-zinc-500 text-xs mt-0.5">{study.quote.role}</div>
								</div>
								{/if}
							</div>
						</div>
					{/if}

					<!-- Services delivered -->
					<div
						class="bg-[#181A1F] rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden"
					>
						<div
							class="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:20px_20px] mix-blend-overlay"
						></div>
						<div class="relative z-10">
							<h3 class="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">
								Services Delivered
							</h3>
							<ul class="flex flex-col gap-3">
								{#each study.services as service}
									<li class="flex items-start gap-3 text-sm font-medium text-zinc-300">
										<CheckCircle2 class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
										{service}
									</li>
								{/each}
							</ul>
						</div>
					</div>

					<!-- Tech logos — only shown if defined -->
					{#if study.techLogos && study.techLogos.length > 0}
						<div
							class="bg-[#181A1F] rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden"
						>
							<div class="absolute -right-8 -bottom-8 w-32 h-32 opacity-[0.06] pointer-events-none">
								<div class="w-full h-full rounded-full bg-indigo-400 blur-3xl"></div>
							</div>
							<div class="relative z-10">
								<h3 class="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-5">
									Built with
								</h3>
								<div class="flex flex-wrap gap-3">
									{#each study.techLogos as logo}
										<div
											class="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
										>
											<img src={logo.src} alt={logo.label} class="w-5 h-5 object-contain" />
											<span class="text-sm font-semibold text-zinc-300">{logo.label}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/if}

					<!-- Visit Website — only shown if live -->
					{#if study.websiteUrl}
						<a
							href={study.websiteUrl}
							target={study.websiteUrl.startsWith('http') ? '_blank' : undefined}
							rel={study.websiteUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
							class="bg-[#181A1F] rounded-[2.5rem] p-8 border border-emerald-500/15 flex flex-col gap-5 relative overflow-hidden group/visit hover:border-emerald-400/25 transition-all duration-300 block"
						>
							<div class="absolute -left-8 -bottom-8 w-40 h-40 opacity-[0.08] pointer-events-none">
								<div class="w-full h-full rounded-full bg-emerald-400 blur-3xl"></div>
							</div>
							<div class="relative z-10">
								<div class="flex items-center gap-3 mb-3">
									<div class="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
										<svg class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
									</div>
									<div>
										<div class="text-xs font-bold text-emerald-400 uppercase tracking-widest">Demo</div>
										<div class="text-zinc-500 text-[11px] mt-0.5">
											{study.websiteUrl.startsWith('http') ? study.websiteUrl.replace('https://', '') : 'Try the live demo'}
										</div>
									</div>
								</div>
								<div
									class="block w-full text-center py-4 px-6 bg-emerald-500 text-white font-bold rounded-[1.25rem] hover:bg-emerald-400 active:scale-95 transition-all text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
								>
									View Demo
									<svg class="w-4 h-4 transition-transform duration-300 group-hover/visit:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
								</div>
							</div>
						</a>
					{/if}

					<!-- CTA -->
					<div
						class="bg-[#181A1F] rounded-[2.5rem] p-8 border border-white/5 flex flex-col gap-5 relative overflow-hidden"
					>
						<div class="absolute -right-8 -top-8 w-40 h-40 opacity-[0.08] pointer-events-none">
							<div class="w-full h-full rounded-full bg-white blur-3xl"></div>
						</div>
						<div class="relative z-10">
							<h3 class="text-xl font-bold text-white tracking-tight mb-2">
								Want something like this?
							</h3>
							<p class="text-zinc-400 text-sm leading-relaxed mb-6">
								Book a free discovery call and we'll map out your project together.
							</p>
							<a
								href={study.cta.href}
								class="block w-full text-center py-4 px-6 bg-white text-zinc-900 font-bold rounded-[1.25rem] hover:bg-zinc-100 active:scale-95 transition-all text-sm shadow-lg"
							>
								{study.cta.label}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>

	<AgencyFooter />
{:else}
	<div class="flex items-center justify-center h-screen bg-[#0A0A0B]">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-white mb-4">Case study not found</h1>
			<a href="/#case-studies" class="text-zinc-400 hover:text-white font-medium transition-colors"
				>← Back to work</a
			>
		</div>
	</div>
{/if}
