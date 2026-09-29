<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import AgencyFooter from '$lib/components/agency/AgencyFooter.svelte';
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

	const startupScrapeSlides = [
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
				class="relative rounded-[2.5rem] overflow-hidden aspect-[16/9] {study.coverImage
					? ''
					: 'bg-gradient-to-br ' + heroGradient}"
				style="opacity:{visible ? 1 : 0}; transform:translateY({visible
					? 0
					: 30}px); transition: opacity 0.8s ease 200ms, transform 0.8s ease 200ms;"
			>
				{#if study.slug === 'startupscrape-gtm-engine'}
					<div class="startup-header-visual">
						<div class="startup-scrape-visual-wrap startup-header-wrap">
							<div class="startup-scrape-visual startup-header-flow">
								<div class="startup-brand-row">
									<div class="startup-logo-pill"><span class="logo-mark yc"><img src="/flowjoy/yc.svg" alt="Y Combinator" /></span><span>Launch list</span></div>
									<div class="startup-logo-pill"><span class="logo-mark jev"><img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV" /></span><span>ICP score</span></div>
									<div class="startup-logo-pill"><span class="logo-mark algolia"><img src="https://cdn.simpleicons.org/algolia/003DFF" alt="Algolia" /></span><span>Signal fit</span></div>
								</div>

								<div class="startup-flow-pipeline">
									<div class="pipeline-step intake">
										<div class="step-header">
											<span class="mini-logo yc"><img src="/flowjoy/yc.svg" alt="Y Combinator" /></span>
											<span>Signal intake</span>
										</div>
										<p>Find startup launch activity, founder posts, and account demand.</p>
										<div class="step-stat"><span>Founders</span><strong>42</strong></div>
									</div>

									<div class="pipeline-arrow">→</div>

									<div class="pipeline-step score">
										<div class="step-header">
											<span class="mini-logo jev"><img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV" /></span>
											<span>JEV score</span>
										</div>
										<p>Score each company by intent, authority, and founder fit.</p>
										<div class="step-stat"><span>Fit</span><strong>0.91</strong></div>
									</div>

									<div class="pipeline-arrow">→</div>

									<div class="pipeline-step gate">
										<div class="step-header">
											<span class="mini-logo algolia"><img src="https://cdn.simpleicons.org/algolia/003DFF" alt="Algolia" /></span>
											<span>Algolia + browser gate</span>
										</div>
										<p>Only send qualified accounts through the browser and AI reply path.</p>
										<div class="step-stat"><span>Saved</span><strong>82%</strong></div>
									</div>
								</div>

								<div class="startup-flow-caption">
									<span class="caption-mark">✦</span>
									StartupScrape combines launch discovery, JEV ICP scoring, and selective browser + AI outbound routing.
								</div>
							</div>
						</div>
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
							{#if study.slug === 'startupscrape-gtm-engine'}
								<div class="flex flex-col gap-5">
									<div class="startup-scrape-visual-wrap rounded-[2rem] overflow-hidden border border-[#d8d0c7] bg-[#f6f3ee] p-3 sm:p-4">
										<button
											type="button"
											on:click={previousScreenshot}
											class="startup-nav prev"
											aria-label="Previous StartupScrape view"
										>
											&#8249;
										</button>

										<div class="startup-scrape-visual">
											<div class="startup-brand-row">
												<div class="startup-logo-pill"><span class="logo-mark yc"><img src="/flowjoy/yc.svg" alt="Y Combinator" /></span><span>Launch list</span></div>
												<div class="startup-logo-pill"><span class="logo-mark jev"><img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV" /></span><span>ICP score</span></div>
												<div class="startup-logo-pill"><span class="logo-mark algolia"><img src="https://cdn.simpleicons.org/algolia/003DFF" alt="Algolia" /></span><span>Signal fit</span></div>
											</div>

											<div class="startup-flow-pipeline">
												<div class="pipeline-step intake">
													<div class="step-header">
														<span class="mini-logo yc"><img src="/flowjoy/yc.svg" alt="Y Combinator" /></span>
														<span>Signal intake</span>
													</div>
													<p>Find startup launch activity, founder posts, and account demand.</p>
													<div class="step-stat"><span>Founders</span><strong>42</strong></div>
												</div>

												<div class="pipeline-arrow">→</div>

												<div class="pipeline-step score">
													<div class="step-header">
														<span class="mini-logo jev"><img src="/flowjoy/typesafe-ai-200x200.jfif" alt="JEV" /></span>
														<span>JEV score</span>
													</div>
													<p>Score each company by intent, authority, and founder fit.</p>
													<div class="step-stat"><span>Fit</span><strong>0.91</strong></div>
												</div>

												<div class="pipeline-arrow">→</div>

												<div class="pipeline-step gate">
													<div class="step-header">
														<span class="mini-logo algolia"><img src="https://cdn.simpleicons.org/algolia/003DFF" alt="Algolia" /></span>
														<span>Algolia + browser gate</span>
													</div>
													<p>Only send qualified accounts through the browser and AI reply path.</p>
													<div class="step-stat"><span>Saved</span><strong>82%</strong></div>
												</div>
											</div>

											<div class="startup-flow-caption">
												<span class="caption-mark">✦</span>
												StartupScrape combines launch discovery, JEV ICP scoring, and selective browser + AI outbound routing.
											</div>
										</div>
									</div>

									<button
										type="button"
										on:click={nextScreenshot}
										class="startup-nav next"
										aria-label="Next StartupScrape view"
									>
										&#8250;
									</button>
								</div>

								<div class="flex items-center justify-between gap-3">
									<div class="px-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
										{startupScrapeSlides[currentScreenshotIndex].title}
									</div>
									<div class="flex items-center gap-2">
										{#each startupScrapeSlides as _, index}
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

<style>
	.startup-header-visual {
		position: absolute;
		inset: 0;
		padding: 0.8rem;
		background: linear-gradient(180deg, #f7f4f1 0%, #f1ece5 100%);
	}

	.startup-header-wrap {
		width: 100%;
		height: 100%;
		padding: 0.75rem;
	}

	.startup-header-flow {
		padding: 0.8rem 0.7rem 0.65rem;
	}

	.startup-scrape-visual-wrap {
		position: relative;
		background: #f4f1ed;
		border: 1px solid #d8d0c7;
		animation: flowFrameFloat 4.5s ease-in-out infinite;
	}

	.startup-scrape-visual {
		width: 100%;
		height: 100%;
		background: #f7f4f1;
		border-radius: 1.5rem;
		padding: 1rem 1rem 0.9rem;
		border: 1px solid #dcd3ca;
		display: flex;
		flex-direction: column;
		justify-content: center;
		animation: visualFadeIn 0.9s ease-out both;
	}

	.startup-brand-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		padding: 0.1rem 0.1rem 0.7rem;
		animation: brandRowSlide 0.8s ease-out both;
	}

	.startup-logo-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.38rem 0.8rem;
		border-radius: 999px;
		background: rgba(255,255,255,0.72);
		border: 1px solid #d8d0c7;
		font-size: 0.68rem;
		font-weight: 600;
		color: #2d2a29;
		animation: chipFloat 5s ease-in-out infinite;
		animation-delay: calc(var(--i, 0) * 0.2s);
	}

	.logo-mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 500px;
		font-size: 0.55rem;
		font-weight: 800;
	}

	.logo-mark.yc { background: #f3d5a6; color: #8a4d0c; }
	.logo-mark.jev { background: rgba(255,255,255,0.8); padding: 0.08rem; }
	.logo-mark.jev img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
	.logo-mark.algolia { background: #e7f0ff; padding: 0.08rem; }
	.logo-mark.algolia img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

	.startup-flow-pipeline {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
		align-items: stretch;
		gap: 0.55rem;
		margin: 0.2rem 0 0.6rem;
		flex: 1;
	}

	.pipeline-step {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 0.55rem;
		padding: 0.8rem 0.72rem 0.7rem;
		background: rgba(255,255,255,0.8);
		border: 1px solid #d9d0c7;
		border-radius: 1rem;
		box-shadow: 0 6px 18px rgba(32, 24, 20, 0.04);
		animation: stepRise 0.8s ease-out both;
	}

	.pipeline-step.intake { animation-delay: 0.1s; }
	.pipeline-step.score { animation-delay: 0.25s; }
	.pipeline-step.gate { animation-delay: 0.4s; }

	.pipeline-step p {
		margin: 0;
		font-size: 0.72rem;
		line-height: 1.5;
		color: #4b4643;
		font-weight: 500;
	}

	.step-header {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.02em;
		color: #201d1c;
	}

	.mini-logo {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;
		font-size: 0.54rem;
		font-weight: 800;
	}

	.mini-logo.yc { background: #f3d5a6; color: #8a4d0c; }
	.mini-logo.jev { background: rgba(255,255,255,0.8); padding: 0.06rem; }
	.mini-logo.jev img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
	.mini-logo.algolia { background: #e7f0ff; padding: 0.06rem; }
	.mini-logo.algolia img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

	.step-stat {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 0.6rem;
		border-top: 1px solid #e8e1d8;
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #6b625d;
	}

	.step-stat strong {
		font-size: 1rem;
		letter-spacing: 0.02em;
		color: #1e1d1b;
	}

	.pipeline-arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 700;
		color: #8d8078;
	}

	.startup-flow-caption {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.25rem 0.5rem 0;
		text-align: center;
		font-size: 0.72rem;
		line-height: 1.4;
		font-weight: 600;
		color: #5f5854;
		animation: captionPulse 4s ease-in-out infinite;
	}

	.caption-mark {
		font-size: 0.9rem;
		color: #201d1c;
	}

	.startup-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 999px;
		border: 1px solid rgba(31, 41, 55, 0.15);
		background: rgba(255,255,255,0.8);
		color: #1d1a1a;
		font-size: 1.8rem;
		line-height: 1;
	}

	.startup-nav.prev { left: 0.7rem; }
	.startup-nav.next { right: 0.7rem; }

	@keyframes flowFrameFloat {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		25% { transform: translateY(-6px) rotate(-0.2deg); }
		50% { transform: translateY(-10px) rotate(0deg); }
		75% { transform: translateY(-6px) rotate(0.2deg); }
	}

	@keyframes visualFadeIn {
		from { opacity: 0; transform: scale(0.96) translateY(8px); }
		to { opacity: 1; transform: scale(1) translateY(0); }
	}

	@keyframes brandRowSlide {
		from { opacity: 0; transform: translateY(12px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes chipFloat {
		0%, 100% { transform: translateY(0) scale(1); }
		50% { transform: translateY(-4px) scale(1.03); }
	}

	@keyframes stepRise {
		from { opacity: 0; transform: translateY(18px) scale(0.98); }
		to { opacity: 1; transform: translateY(0) scale(1); }
	}

	@keyframes captionPulse {
		0%, 100% { opacity: 0.8; transform: translateY(0); }
		50% { opacity: 1; transform: translateY(-1px); }
	}

	@media (max-width: 900px) {
		.startup-flow-pipeline {
			grid-template-columns: 1fr;
		}

		.pipeline-arrow {
			transform: rotate(90deg);
		}
	}

	@media (max-width: 640px) {
		.startup-brand-row {
			justify-content: flex-start;
		}

		.startup-nav {
			width: 2.1rem;
			height: 2.1rem;
			font-size: 1.5rem;
		}

		.startup-logo-pill {
			font-size: 0.6rem;
		}
	}
</style>
