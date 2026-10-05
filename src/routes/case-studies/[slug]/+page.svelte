<script lang="ts">
	import V6GtmNavbar from '$lib/components/v6/V6GtmNavbar.svelte';
	import V6GtmFooter from '$lib/components/v6/V6GtmFooter.svelte';
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
		{@html `<script type="application/ld+json">${JSON.stringify({
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
					"url": "https://www.flowjoy.online/flowjoy/flowjoy-brand/LOGO/New%20logo%20500%20500%20SVG.svg"
				}
			},
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": `https://www.flowjoy.online/case-studies/${slug}`
			}
			})}</script>`}
	{/if}
</svelte:head>

{#if study}
	<V6GtmNavbar />

	<main class="bg-white font-[Poppins] min-h-screen relative overflow-x-hidden">
		<!-- Subtle dot grid background matching the hero -->
		<div
			class="absolute inset-0 pointer-events-none opacity-[0.25] z-0"
			style="background-image: radial-gradient(circle, #d4d4d8 0.6px, transparent 0.6px); background-size: 28px 28px;"
		></div>

		<!-- Subtle ambient glow blobs -->
		<div class="absolute top-10 left-1/4 w-96 h-96 bg-[#fed7aa]/20 rounded-full blur-3xl pointer-events-none z-0"></div>
		<div class="absolute top-60 right-10 w-96 h-96 bg-[#e0e7ff]/25 rounded-full blur-3xl pointer-events-none z-0"></div>

		<!-- ─── HERO HEADER ────────────────────────────────────────── -->
		<header class="relative z-10 pt-10 sm:pt-14 pb-8 sm:pb-12">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				
				<!-- Back to work link -->
				<a
					href="/#what-we-built"
					class="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-8 font-semibold text-xs tracking-widest uppercase group"
				>
					<ArrowLeft class="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
					<span>Back to work</span>
				</a>

				<!-- Top badge & Overlapping logos -->
				<div
					class="flex flex-wrap items-center justify-between gap-4 mb-5"
					style="opacity:{visible ? 1 : 0}; transform:translateY({visible ? 0 : 15}px); transition: opacity 0.6s ease, transform 0.6s ease;"
				>
					<!-- Studio badge -->
					<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-zinc-800 shadow-2xs">
						<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
						<span><strong>{study.industry}</strong> &bull; Production Case Study</span>
					</div>

					<!-- Hero-style overlapping circular tech logo stack -->
					{#if study.techLogos && study.techLogos.length > 0}
						<div class="flex items-center pl-2" title="Built with">
							{#each study.techLogos as logo, idx}
								<div
									class="relative rounded-full bg-white border border-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex items-center justify-center p-2 transition-transform hover:-translate-y-1 cursor-pointer ring-3 ring-white {idx > 0 ? '-ml-3 sm:-ml-4' : ''}"
									style="width: clamp(2.25rem, 4vw, 2.75rem); height: clamp(2.25rem, 4vw, 2.75rem); z-index: {15 - idx};"
									title={logo.label}
								>
									<img src={logo.src} alt={logo.label} class="w-full h-full object-contain" />
								</div>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Title & Short Description Grid -->
				<div
					class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-8"
					style="opacity:{visible ? 1 : 0}; transform:translateY({visible ? 0 : 20}px); transition: opacity 0.7s ease 100ms, transform 0.7s ease 100ms;"
				>
					<div class="lg:col-span-8">
						<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-zinc-950 leading-[1.08] tracking-tight">
							{#if study.title.includes('—')}
								{@const parts = study.title.split('—')}
								<span>{parts[0].trim()}</span>
								<span class="block mt-1 sm:mt-2 font-['Instrument_Serif'] italic text-zinc-500 font-normal">
									— {parts.slice(1).join('—').trim()}
								</span>
							{:else}
								<span>{study.title}</span>
							{/if}
						</h1>
					</div>

					<div class="lg:col-span-4 text-zinc-600 text-sm sm:text-base font-light leading-relaxed border-l-2 border-zinc-200 pl-4 lg:pl-6">
						{study.shortDescription}
					</div>
				</div>

			</div>
		</header>

		<!-- ─── HERO VISUAL (ILLUSTRATION OR COVER) ────────────────── -->
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 relative z-10">
			<div
				class="relative rounded-2xl sm:rounded-[2.5rem] overflow-hidden min-h-[560px] sm:min-h-[500px] md:min-h-0 md:aspect-[16/9] shadow-xl border border-zinc-200/80 {study.coverImage ? '' : 'bg-gradient-to-br ' + heroGradient}"
				style="opacity:{visible ? 1 : 0}; transform:translateY({visible ? 0 : 30}px); transition: opacity 0.8s ease 200ms, transform 0.8s ease 200ms;"
			>
				{#if study.slug === 'verve-gtm-engine'}
					<div class="w-full h-full p-2 sm:p-4 flex items-center justify-center">
						<StartupScrapeHeaderIllustration />
					</div>
				{:else if study.coverImage}
					<img
						src={study.coverImage}
						alt="{study.title} cover"
						class="absolute inset-0 w-full h-full object-cover object-center"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
				{:else}
					<div class="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>
				{/if}
			</div>
		</div>

		<!-- ─── METRICS BENTO STRIP ──────────────────────────────── -->
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 relative z-10">
			<div
				class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
				style="opacity:{visible ? 1 : 0}; transition: opacity 0.9s ease 350ms;"
			>
				{#each study.metrics as metric}
					<div
						class="bg-white rounded-2xl sm:rounded-[1.75rem] p-5 sm:p-7 flex flex-col justify-between border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
					>
						<div class="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none"></div>
						<div class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1.5 {metric.highlight ? 'text-[#c2410c]' : 'text-zinc-950'}">
							{metric.value}
						</div>
						<div class="text-[10px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-widest leading-snug">
							{metric.label}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- ─── MAIN CONTENT GRID ────────────────────────────────── -->
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 relative z-10">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
				
				<!-- LEFT: Story Cards (8 cols) -->
				<div class="lg:col-span-8 flex flex-col gap-6 sm:gap-8">
					
					<!-- 01: The Challenge -->
					<div
						class="bg-white rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 border border-zinc-200/80 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
					>
						<div class="absolute -left-12 -bottom-12 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>
						<div class="relative z-10">
							<div
								class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-xs font-bold text-rose-800 uppercase tracking-widest mb-6"
							>
								<span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
								01 · Challenge
							</div>
							<h2 class="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight mb-4 leading-snug">
								The Challenge
							</h2>
							<p class="text-zinc-600 text-base sm:text-lg leading-relaxed font-light">{study.challenge}</p>
						</div>
					</div>

					<!-- 02: The Solution (houses the interactive showcase) -->
					<div
						class="bg-white rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 border border-zinc-200/80 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
					>
						<div class="absolute -right-12 -bottom-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
						<div class="relative z-10">
							<div
								class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-bold text-indigo-800 uppercase tracking-widest mb-6"
							>
								<span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
								02 · Solution
							</div>
							<h2 class="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight mb-4 leading-snug">
								The Solution
							</h2>
							<p class="text-zinc-600 text-base sm:text-lg leading-relaxed font-light mb-8">{study.solution}</p>

							<!-- Visual Component: Verve Showcase or Screenshots Carousel -->
							{#if study.slug === 'verve-gtm-engine'}
								<div class="flex flex-col gap-4">
									<div class="w-full min-h-[320px] sm:min-h-[380px] sm:aspect-[16/9] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-md relative bg-[#fbf9f5] border border-zinc-200/80">
										<StartupScrapeShowcase activeTab={currentScreenshotIndex + 1} />
									</div>

									<!-- Stage Navigation Controls -->
									<div class="flex items-center justify-between gap-3 px-1 mt-1">
										<div class="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
											{verveSlides[currentScreenshotIndex].title}
										</div>
										<div class="flex items-center gap-2">
											{#each verveSlides as _, index}
												<button
													type="button"
													on:click={() => (currentScreenshotIndex = index)}
													class={`h-2.5 rounded-full transition-all ${index === currentScreenshotIndex ? 'w-8 bg-zinc-900' : 'w-2.5 bg-zinc-300 hover:bg-zinc-500'}`}
													aria-label={`Go to visual ${index + 1}`}
												></button>
											{/each}
										</div>
									</div>
								</div>
							{:else if screenshots.length > 0}
								<div class="flex flex-col gap-4">
									<div class="relative rounded-2xl sm:rounded-[2rem] overflow-hidden bg-[#18181b] border border-zinc-800">
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
												class="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-lg text-white backdrop-blur-sm transition hover:bg-black/60 cursor-pointer"
												aria-label="Previous visual"
											>
												&#8249;
											</button>
											<button
												type="button"
												on:click={nextScreenshot}
												class="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-lg text-white backdrop-blur-sm transition hover:bg-black/60 cursor-pointer"
												aria-label="Next visual"
											>
												&#8250;
											</button>
										{/if}
									</div>
									<div class="flex items-center justify-between gap-3 px-1">
										<div class="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
											{screenshots[currentScreenshotIndex].caption}
										</div>
										{#if screenshots.length > 1}
											<div class="flex items-center gap-2">
												{#each screenshots as _, index}
													<button
														type="button"
														on:click={() => (currentScreenshotIndex = index)}
														class={`h-2.5 rounded-full transition-all ${index === currentScreenshotIndex ? 'w-8 bg-zinc-900' : 'w-2.5 bg-zinc-300 hover:bg-zinc-500'}`}
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

					<!-- 03: The Results -->
					<div
						class="bg-gradient-to-br from-white via-white to-emerald-50/40 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 border border-emerald-200/80 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
					>
						<div class="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
						<div class="relative z-10">
							<div
								class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-6"
							>
								<span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
								03 · Results
							</div>
							<h2 class="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight mb-4 leading-snug">
								The Results
							</h2>
							<p class="text-zinc-700 text-base sm:text-lg leading-relaxed font-light">{study.results}</p>
						</div>
					</div>

				</div>

				<!-- RIGHT: Sidebar Cards (4 cols) -->
				<div class="lg:col-span-4 flex flex-col gap-6">
					
					<!-- Executive Quote -->
					{#if study.quote}
						<div
							class="bg-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 border border-zinc-200/80 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
						>
							<div class="absolute -left-8 -bottom-8 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
							<div class="relative z-10">
								<svg class="w-7 h-7 text-zinc-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
									<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
								</svg>
								<blockquote class="text-zinc-800 text-sm sm:text-base font-normal leading-relaxed mb-6 font-['Instrument_Serif'] italic text-lg">
									"{study.quote.text}"
								</blockquote>
								{#if study.quote.author}
									<div class="border-t border-zinc-100 pt-3">
										<div class="font-bold text-sm text-zinc-950">{study.quote.author}</div>
										<div class="text-zinc-500 text-xs mt-0.5">{study.quote.role}</div>
									</div>
								{/if}
							</div>
						</div>
					{/if}

					<!-- Services Delivered -->
					<div
						class="bg-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 border border-zinc-200/80 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
					>
						<div class="relative z-10">
							<h3 class="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-5">
								Services Delivered
							</h3>
							<ul class="flex flex-col gap-3">
								{#each study.services as service}
									<li class="flex items-start gap-2.5 text-sm font-medium text-zinc-800">
										<CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
										<span>{service}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>

					<!-- Tech Stack Tags -->
					{#if study.techLogos && study.techLogos.length > 0}
						<div
							class="bg-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 border border-zinc-200/80 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
						>
							<div class="relative z-10">
								<h3 class="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
									Built With
								</h3>
								<div class="flex flex-wrap gap-2">
									{#each study.techLogos as logo}
										<div
											class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors shadow-2xs"
										>
											<img src={logo.src} alt={logo.label} class="w-4 h-4 object-contain shrink-0" />
											<span>{logo.label}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/if}

					<!-- Live Demo Link (if available) -->
					{#if study.websiteUrl}
						<a
							href={study.websiteUrl}
							target={study.websiteUrl.startsWith('http') ? '_blank' : undefined}
							rel={study.websiteUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
							class="bg-emerald-50/70 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 border border-emerald-200 flex flex-col gap-4 relative overflow-hidden group hover:border-emerald-300 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
						>
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
									<svg class="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
								</div>
								<div>
									<div class="text-xs font-bold text-emerald-800 uppercase tracking-widest">Live System</div>
									<div class="text-zinc-600 text-xs mt-0.5 font-mono">
										{study.websiteUrl.replace('https://', '')}
									</div>
								</div>
							</div>
							<div
								class="w-full text-center py-3 px-5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 active:scale-[0.98] transition-all text-xs flex items-center justify-center gap-2 shadow-sm"
							>
								<span>Explore Live System</span>
								<span aria-hidden="true">&rarr;</span>
							</div>
						</a>
					{/if}

					<!-- Brand Conversion CTA Card (Dark theme matching V6) -->
					<div
						class="bg-zinc-950 text-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 border border-zinc-800 flex flex-col gap-4 relative overflow-hidden shadow-xl"
					>
						<div class="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
						<div class="relative z-10">
							<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-semibold text-zinc-300 mb-3">
								<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
								<span>GTM Engineering Studio</span>
							</div>
							<h3 class="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
								Want something like this?
							</h3>
							<p class="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
								Get a custom outbound or account intelligence engine engineered for your team in 2–4 weeks. You own 100% of the code.
							</p>
							<a
								href="/#gtm-teardown"
								class="block w-full text-center py-3.5 px-5 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-100 active:scale-[0.98] transition-all text-xs sm:text-sm shadow-md cursor-pointer"
							>
								{study.cta?.label || 'Get a Free GTM Teardown →'}
							</a>
						</div>
					</div>

				</div>

			</div>
		</div>
	</main>

	<V6GtmFooter />
{:else}
	<div class="flex items-center justify-center h-screen bg-white font-[Poppins]">
		<div class="text-center p-8">
			<h1 class="text-2xl font-bold text-zinc-950 mb-3">Case study not found</h1>
			<a href="/#what-we-built" class="text-zinc-600 hover:text-zinc-950 font-medium transition-colors text-sm"
				>&larr; Back to work</a
			>
		</div>
	</div>
{/if}
