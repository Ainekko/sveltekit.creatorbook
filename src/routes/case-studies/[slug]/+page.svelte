<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import AgencyCTA from '$lib/components/agency/AgencyCTA.svelte';
	import { ArrowLeft, CheckCircle2 } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { getCaseStudyBySlug } from '$lib/data/caseStudies';
	import { onMount } from 'svelte';

	let contentRef: HTMLElement;
	let contentVisible = false;

	onMount(() => {
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					contentVisible = true;
					obs.disconnect();
				}
			},
			{ threshold: 0.05 }
		);
		if (contentRef) obs.observe(contentRef);
		return () => obs.disconnect();
	});

	$: slug = $page.params.slug;
	$: study = getCaseStudyBySlug(slug) || getCaseStudyBySlug('nai-seo-agent'); // Fallback for dev

	const accentMap: Record<string, string> = {
		blue: 'text-blue-600 bg-blue-50 border-blue-100',
		orange: 'text-orange-600 bg-orange-50 border-orange-100',
		violet: 'text-violet-600 bg-violet-50 border-violet-100'
	};
	$: accent = study ? accentMap[study.accentColor] || accentMap['violet'] : '';

	// Just parsing out icon coloring
	const iconColorMap: Record<string, string> = {
		blue: 'text-blue-500',
		orange: 'text-orange-500',
		violet: 'text-violet-500'
	};
	$: iconAccent = study ? iconColorMap[study.accentColor] || iconColorMap['violet'] : '';
</script>

<svelte:head>
	<title>{study?.title || 'Case Study'} | Flowjoy Case Studies</title>
</svelte:head>

{#if study}
	<div class="sticky top-0 z-50">
		<NavBar />
	</div>

	<main class="bg-zinc-50 font-[Poppins] min-h-screen pb-24 selection:bg-zinc-200">
		<!-- Hero Section -->
		<header class="bg-zinc-50 pt-28 pb-12">
			<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<a
					href="/#case-studies"
					class="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-12 font-bold text-sm tracking-wide uppercase"
				>
					<ArrowLeft class="w-4 h-4" /> Back to all work
				</a>

				<div class="flex flex-wrap items-center gap-3 mb-6">
					<div
						class="px-3 py-1.5 rounded-full {accent} border text-xs font-bold uppercase tracking-wider"
					>
						{study.client}
					</div>
					<div class="text-zinc-400 text-sm font-medium">{study.industry}</div>
				</div>

				<h1
					class="text-5xl md:text-7xl lg:text-[6rem] font-bold text-zinc-900 leading-[0.95] mb-8 tracking-tight"
				>
					{study.title}
				</h1>

				<!-- Metrics strip -->
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-zinc-100">
					{#each study.metrics as metric}
						<div>
							<div class="text-2xl md:text-3xl font-bold {iconAccent} mb-1">{metric.value}</div>
							<div class="text-sm font-medium text-zinc-500">{metric.label}</div>
						</div>
					{/each}
				</div>
			</div>
		</header>

		<!-- Main article content -->
		<article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
			<!-- Hero Image -->
			<div class="rounded-[2.5rem] overflow-hidden shadow-xl mb-12 aspect-[16/9] bg-zinc-100">
				<img
					src={study.heroImage}
					alt={study.title}
					class="w-full h-full object-cover object-top"
				/>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-12 gap-12">
				<!-- Left column: Main story -->
				<div class="md:col-span-8 space-y-16">
					<!-- The Challenge -->
					<section>
						<h2 class="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
							<span
								class="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-sm"
								>01</span
							>
							The Challenge
						</h2>
						<p class="text-lg text-zinc-600 leading-relaxed">
							{study.challenge}
						</p>
					</section>

					<!-- The Solution -->
					<section>
						<h2 class="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
							<span
								class="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-sm"
								>02</span
							>
							The Solution
						</h2>
						<p class="text-lg text-zinc-600 leading-relaxed mb-8">
							{study.solution}
						</p>

						<!-- App Screenshots Grid -->
						{#if study.screenshots.length > 0}
							<div class="grid grid-cols-1 gap-6 md:gap-8">
								{#each study.screenshots as shot}
									<figure
										class="rounded-[2.5rem] overflow-hidden bg-white shadow-xl border border-zinc-100"
									>
										<img src={shot.src} alt={shot.alt} class="w-full h-auto" />
										<figcaption
											class="p-4 border-t border-zinc-100 bg-zinc-50 text-sm text-zinc-500 text-center font-medium"
										>
											{shot.caption}
										</figcaption>
									</figure>
								{/each}
							</div>
						{/if}
					</section>

					<!-- The Results -->
					<section>
						<h2 class="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
							<span
								class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-sm"
								>03</span
							>
							The Results
						</h2>
						<p class="text-lg text-zinc-600 leading-relaxed">
							{study.results}
						</p>
					</section>
				</div>

				<!-- Right column: Sidebar -->
				<div
					class="md:col-span-4 space-y-10"
					style="opacity: {contentVisible ? 1 : 0}; transform: translateY({contentVisible
						? 0
						: 40}px); transition: opacity 0.8s ease 400ms, transform 0.8s ease 400ms;"
				>
					<!-- Client Quote on the side -->
					{#if study.quote}
						<div
							class="bg-zinc-900 rounded-[2.5rem] p-10 text-white relative shadow-lg overflow-hidden"
						>
							<div
								class="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-[80px] pointer-events-none"
							></div>
							<svg class="w-8 h-8 text-white/20 mb-6" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
								/>
							</svg>
							<blockquote class="text-xl font-medium leading-relaxed mb-6 relative z-10">
								"{study.quote.text}"
							</blockquote>
							<div class="relative z-10">
								<div class="font-bold text-sm text-white">{study.quote.author}</div>
								<div class="text-white/60 text-xs mt-0.5">{study.quote.role}</div>
							</div>
						</div>
					{/if}

					<!-- Services Used -->
					<div
						class="bg-white rounded-[2.5rem] p-10 shadow-sm shadow-zinc-100 border border-zinc-100"
					>
						<h3 class="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">
							Services Delivered
						</h3>
						<ul class="space-y-3">
							{#each study.services as service}
								<li class="flex items-start gap-3 text-sm font-medium text-zinc-700">
									<CheckCircle2 class="w-4 h-4 {iconAccent} flex-shrink-0 mt-0.5" />
									{service}
								</li>
							{/each}
						</ul>
					</div>

					<!-- Live product CTA -->
					<div
						class="bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-[2.5rem] p-10 shadow-sm border border-zinc-100 text-center"
					>
						<h3 class="text-2xl font-bold text-zinc-900 mb-3 mt-4 tracking-tight">
							See it in action
						</h3>
						<p class="text-zinc-500 mb-8 leading-relaxed">
							This isn't just a portfolio piece. Test drive the exact software right now.
						</p>
						<a
							href={study.cta.href}
							class="block w-full py-3 px-4 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors text-sm shadow-md"
						>
							{study.cta.label}
						</a>
					</div>
				</div>
			</div>
		</article>
	</main>

	<AgencyCTA />
{:else}
	<div class="flex items-center justify-center h-screen bg-zinc-50">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-zinc-900 mb-4">Case study not found</h1>
			<a href="/#case-studies" class="text-blue-600 hover:text-blue-800 font-medium"
				>← Back to work</a
			>
		</div>
	</div>
{/if}
