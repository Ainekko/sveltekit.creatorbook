<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import AgencyFooter from '$lib/components/agency/AgencyFooter.svelte';
	import StartupScrapeHeaderIllustration from '$lib/components/StartupScrapeHeaderIllustration.svelte';
	import StartupScrapeShowcase from '$lib/components/StartupScrapeShowcase.svelte';
	import { ArrowLeft, CheckCircle2 } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let data;

	let visible = false;
	let currentScreenshotIndex = 0;

	onMount(() => {
		setTimeout(() => (visible = true), 100);
	});

	$: study = data?.study;
	$: slug = study?.slug || 'case-study';
	$: screenshots = study?.screenshots ?? [];
	$: if (currentScreenshotIndex > screenshots.length - 1) {
		currentScreenshotIndex = 0;
	}

	function nextScreenshot() {
		if (!screenshots.length) return;
		currentScreenshotIndex = (currentScreenshotIndex + 1) % screenshots.length;
	}

	function previousScreenshot() {
		if (!screenshots.length) return;
		currentScreenshotIndex = (currentScreenshotIndex - 1 + screenshots.length) % screenshots.length;
	}

	const heroGradientMap: Record<string, string> = {
		blue: 'from-[#D4E8F0] via-[#D9F4ED] to-[#B8FAE4]',
		orange: 'from-[#F0DFD4] via-[#F4DDD9] to-[#FAB8B8]',
		violet: 'from-[#E2D4F0] via-[#F4D9DC] to-[#FADAB8]'
	};
	$: heroGradient = study ? heroGradientMap[study.accentColor] || heroGradientMap['violet'] : '';

	const verveSlides = [
		{
			title: 'Signal intake',
			chip: 'YC',
			stat: '42',
			label: 'founders',
			metaOne: 'launch list',
			metaTwo: 'founder intent',
			progress: 82,
			accent: 'amber'
		},
		{
			title: 'ICP scoring',
			chip: 'JEV',
			stat: '0.91',
			label: 'fit',
			metaOne: 'intent 93',
			metaTwo: 'risk low',
			progress: 74,
			accent: 'orange'
		},
		{
			title: 'AI outreach',
			chip: 'Algolia',
			stat: '82%',
			label: 'saved',
			metaOne: 'browser gate',
			metaTwo: 'reply AI',
			progress: 68,
			accent: 'gold'
		}
	];
</script>

<svelte:head>
	<title>{study?.title || 'Case Study'} | Flowjoy</title>
	<meta name="description" content={study?.shortDescription || 'A Flowjoy case study — real AI systems built for real businesses.'} />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<link rel="canonical" href={`https://www.flowjoy.online/case-studies/${slug}`} />
	<meta property="og:title" content="{study?.title || 'Case Study'} | Flowjoy" />
	<meta property="og:description" content={study?.shortDescription || 'A Flowjoy case study.'} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://www.flowjoy.online/case-studies/${slug}`} />
	{#if study?.coverImage}
		<meta property="og:image" content={study.coverImage} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{study?.title || 'Case Study'} | Flowjoy" />
	<meta name="twitter:description" content={study?.shortDescription || 'A Flowjoy case study.'} />
	{#if study}
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Article",
				"headline": study.title,
				"description": study.shortDescription,
				"image": study.coverImage || undefined,
				"author": {
					"@type": "Organization",
					"name": "Flowjoy"
				},
				"publisher": {
					"@type": "Organization",
					"name": "Flowjoy",
					"logo": {
						"@type": "ImageObject",
						"url": "https://www.flowjoy.online/flowjoy/LOGO%20GREEN%202.png"
					}
				},
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": `https://www.flowjoy.online/case-studies/${slug}`
				}
			})}
		</script>
	{/if}
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
				class="relative rounded-[2.5rem] overflow-hidden min-h-[580px] sm:min-h-[520px] md:min-h-0 md:aspect-[16/9] {study.coverImage
					? ''
					: 'bg-gradient-to-br ' + heroGradient}"
				style="opacity:{visible ? 1 : 0}; transform:translateY({visible
					? 0
					: 30}px); transition: opacity 0.8s ease 200ms, transform 0.8s ease 200ms;"
			>
			{#if study.slug === 'verve-gtm-engine'}
					<div class="w-full h-full p-2 sm:p-4 flex items-center justify-center">
						<StartupScrapeHeaderIllustration />
					</div>
				{:else if study.coverImage}
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
						class="bg-[#f7f3ee] rounded-[2rem] p-7 flex flex-col justify-between border border-[#e2d8cf] relative overflow-hidden group hover:-translate-y-0.5 transition-transform duration-300 shadow-[0_10px_30px_rgba(31,22,17,0.04)]"
					>
						<div class="absolute -right-6 -bottom-6 w-24 h-24 opacity-[0.08] pointer-events-none">
							<div class="w-full h-full rounded-full bg-white blur-2xl"></div>
						</div>
						<div class="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-2">
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
						class="bg-[#f7f3ee] rounded-[2.5rem] p-10 border border-[#e2d8cf] relative overflow-hidden shadow-[0_10px_30px_rgba(31,22,17,0.04)]"
					>
						<div class="absolute -left-12 -bottom-12 w-48 h-48 opacity-[0.06] pointer-events-none">
							<div class="w-full h-full rounded-full bg-rose-400 blur-3xl"></div>
						</div>
						<div class="relative z-10">
							<div
								class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e5ded7] text-xs font-bold text-zinc-600 uppercase tracking-widest mb-8"
							>
								01 · Challenge
							</div>
							<h2 class="text-3xl font-bold text-zinc-900 tracking-tight mb-6 leading-snug">
								The Challenge
							</h2>
							<p class="text-zinc-600 text-lg leading-relaxed font-light">{study.challenge}</p>
						</div>
					</div>

					<!-- The Solution -->
					<div
						class="bg-[#f7f3ee] rounded-[2.5rem] p-10 border border-[#e2d8cf] relative overflow-hidden shadow-[0_10px_30px_rgba(31,22,17,0.04)]"
					>
						<div class="absolute -right-12 -bottom-12 w-48 h-48 opacity-[0.06] pointer-events-none">
							<div class="w-full h-full rounded-full bg-indigo-400 blur-3xl"></div>
						</div>
						<div class="relative z-10">
							<div
								class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e5ded7] text-xs font-bold text-zinc-600 uppercase tracking-widest mb-8"
							>
								02 · Solution
							</div>
							<h2 class="text-3xl font-bold text-zinc-900 tracking-tight mb-6 leading-snug">
								The Solution
							</h2>
							<p class="text-zinc-600 text-lg leading-relaxed font-light mb-10">{study.solution}</p>

							<!-- Screenshots carousel -->
							{#if study.slug === 'verve-gtm-engine'}
								<div class="flex flex-col gap-5">
									<div class="w-full min-h-[440px] sm:min-h-[380px] sm:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-xl relative bg-[#fbf9f5]">
										<StartupScrapeShowcase activeTab={currentScreenshotIndex + 1} />
									</div>
								</div>

								<div class="flex items-center justify-between gap-3">
									<div class="px-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
										{verveSlides[currentScreenshotIndex].title}
									</div>
									<div class="flex items-center gap-2">
										{#each verveSlides as _, index}
											<button
												type="button"
												on:click={() => (currentScreenshotIndex = index)}
												class={`h-2.5 rounded-full transition-all ${index === currentScreenshotIndex ? 'w-8 bg-zinc-900' : 'w-2.5 bg-zinc-400 hover:bg-zinc-600'}`}
												aria-label={`Go to visual ${index + 1}`}
											></button>
										{/each}
									</div>
								</div>
							{:else if screenshots.length > 0}
								<div class="flex flex-col gap-5">
									<div class="relative rounded-[2rem] overflow-hidden bg-[#212328] border border-white/5">
										<img
											src={screenshots[currentScreenshotIndex].src}
											alt={screenshots[currentScreenshotIndex].alt}
											class="w-full h-auto block"
											loading="lazy"
										/>
										{#if screenshots.length > 1}
											<button
												type="button"
												on:click={previousScreenshot}
												class="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-lg text-white backdrop-blur-sm transition hover:bg-black/30"
												aria-label="Previous visual"
											>
												&#8249;
											</button>
											<button
												type="button"
												on:click={nextScreenshot}
												class="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-lg text-white backdrop-blur-sm transition hover:bg-black/30"
												aria-label="Next visual"
											>
												&#8250;
											</button>
										{/if}
									</div>
									<div class="flex items-center justify-between gap-3">
										<div class="px-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
											{screenshots[currentScreenshotIndex].caption}
										</div>
										{#if screenshots.length > 1}
											<div class="flex items-center gap-2">
												{#each screenshots as _, index}
													<button
														type="button"
														on:click={() => (currentScreenshotIndex = index)}
														class={`h-2.5 rounded-full transition-all ${index === currentScreenshotIndex ? 'w-8 bg-white' : 'w-2.5 bg-zinc-600 hover:bg-zinc-400'}`}
														aria-label={`Go to visual ${index + 1}`}
													></button>
												{/each}
											</div>
										{/if}
									</div>
								</div>
							{/if}
						</div>
					</div>

					<!-- The Results -->
					<div
						class="bg-[#f7f3ee] rounded-[2.5rem] p-10 border border-[#e2d8cf] relative overflow-hidden shadow-[0_10px_30px_rgba(31,22,17,0.04)]"
					>
						<div class="absolute -right-12 -top-12 w-48 h-48 opacity-[0.06] pointer-events-none">
							<div class="w-full h-full rounded-full bg-emerald-400 blur-3xl"></div>
						</div>
						<div class="relative z-10">
							<div
								class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e5ded7] text-xs font-bold text-zinc-600 uppercase tracking-widest mb-8"
							>
								03 · Results
							</div>
							<h2 class="text-3xl font-bold text-zinc-900 tracking-tight mb-6 leading-snug">
								The Results
							</h2>
							<p class="text-zinc-600 text-lg leading-relaxed font-light">{study.results}</p>
						</div>
					</div>
				</div>

				<!-- RIGHT: Sidebar bento cards -->
				<div class="lg:col-span-4 flex flex-col gap-6">
					<!-- Quote -->
					{#if study.quote}
						<div
							class="bg-[#f7f3ee] rounded-[2.5rem] p-8 border border-[#e2d8cf] relative overflow-hidden shadow-[0_10px_30px_rgba(31,22,17,0.04)]"
						>
							<div class="absolute -left-8 -bottom-8 w-40 h-40 opacity-[0.08] pointer-events-none">
								<div class="w-full h-full rounded-full bg-violet-500 blur-3xl"></div>
							</div>
							<div class="relative z-10">
								<svg class="w-7 h-7 text-zinc-300 mb-6" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
									/>
								</svg>
								<blockquote class="text-zinc-900 text-base font-medium leading-relaxed mb-6">
									{#if study.quote.author}
										"{study.quote.text}"
									{:else}
										{study.quote.text}
									{/if}
								</blockquote>
								{#if study.quote.author}
								<div>
									<div class="font-bold text-sm text-zinc-900">{study.quote.author}</div>
									<div class="text-zinc-500 text-xs mt-0.5">{study.quote.role}</div>
								</div>
								{/if}
							</div>
						</div>
					{/if}

					<!-- Services delivered -->
					<div
						class="bg-[#f7f3ee] rounded-[2.5rem] p-8 border border-[#e2d8cf] relative overflow-hidden shadow-[0_10px_30px_rgba(31,22,17,0.04)]"
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
									<li class="flex items-start gap-3 text-sm font-medium text-zinc-700">
										<CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
										{service}
									</li>
								{/each}
							</ul>
						</div>
					</div>

					<!-- Tech logos — only shown if defined -->
					{#if study.techLogos && study.techLogos.length > 0}
						<div
							class="bg-[#f7f3ee] rounded-[2.5rem] p-8 border border-[#e2d8cf] relative overflow-hidden shadow-[0_10px_30px_rgba(31,22,17,0.04)]"
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
											class="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#e7dfd8] hover:bg-[#faf7f4] transition-colors"
										>
											<img src={logo.src} alt={logo.label} class="w-5 h-5 object-contain" />
											<span class="text-sm font-semibold text-zinc-700">{logo.label}</span>
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
							class="bg-[#f7f3ee] rounded-[2.5rem] p-8 border border-emerald-500/20 flex flex-col gap-5 relative overflow-hidden group/visit hover:border-emerald-400/30 transition-all duration-300 shadow-[0_10px_30px_rgba(31,22,17,0.04)]"
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
									class="w-full text-center py-4 px-6 bg-emerald-500 text-white font-bold rounded-[1.25rem] hover:bg-emerald-400 active:scale-95 transition-all text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
								>
									View Demo
									<svg class="w-4 h-4 transition-transform duration-300 group-hover/visit:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
								</div>
							</div>
						</a>
					{/if}

					<!-- CTA -->
					<div
						class="bg-[#f7f3ee] rounded-[2.5rem] p-8 border border-[#e2d8cf] flex flex-col gap-5 relative overflow-hidden shadow-[0_10px_30px_rgba(31,22,17,0.04)]"
					>
						<div class="absolute -right-8 -top-8 w-40 h-40 opacity-[0.08] pointer-events-none">
							<div class="w-full h-full rounded-full bg-white blur-3xl"></div>
						</div>
						<div class="relative z-10">
							<h3 class="text-xl font-bold text-zinc-900 tracking-tight mb-2">
								Want something like this?
							</h3>
							<p class="text-zinc-600 text-sm leading-relaxed mb-6">
								Book a free discovery call and we'll map out your project together.
							</p>
							<a
								href={study.cta.href}
								class="block w-full text-center py-4 px-6 bg-zinc-900 text-white font-bold rounded-[1.25rem] hover:bg-zinc-800 active:scale-95 transition-all text-sm shadow-lg"
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
	<div class="flex items-center justify-center h-screen bg-[#f7f3ee]">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-zinc-900 mb-4">Case study not found</h1>
			<a href="/#case-studies" class="text-zinc-600 hover:text-zinc-900 font-medium transition-colors"
				>← Back to work</a
			>
		</div>
	</div>
{/if}
