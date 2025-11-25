<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import {
		Check,
		ArrowRight,
		Share2,
		Zap,
		Search,
		FileText,
		PenTool,
		TrendingUp,
		MessageCircle,
		Shield
	} from 'lucide-svelte';

	export let agents;
	export let posts = [];

	import { animate } from '$lib/actions/animate';

	// Enhanced agent data with specific features as objects for cards
	$: enhancedAgents = Object.values(agents)
		.map((agent) => {
			let features = [];
			if (agent.icon === 'search') {
				// Nai
				features = [
					{
						title: 'Find Winning Keywords',
						description:
							'Instantly spot high-volume, low-competition terms you can actually rank for.'
					},
					{
						title: 'Steal Competitor Strategy',
						description: 'See exactly why they rank #1 and how to beat them.'
					},
					{
						title: "Banish Writer's Block",
						description:
							'Get structured, SEO-perfect outlines in seconds. Never start from scratch.'
					},
					{
						title: 'Write Like an Expert',
						description:
							'Generate deep, researched articles that drive traffic. You control the voice.'
					},
					{
						title: 'Publish While You Sleep',
						description: 'Auto-post to WordPress or your CMS. Scale without the grind.'
					}
				];
			} else if (agent.icon === 'reddit') {
				// Elio
				features = [
					{
						title: 'Spot Hot Leads',
						description: 'Find users asking for your exact solution right now.'
					},
					{
						title: 'Catch Competitor Churn',
						description: 'Alerts you when users complain about your rivals. Swoop in and save them.'
					},
					{
						title: 'Engage Authentically',
						description: 'Draft helpful, non-salesy replies that build trust and drive clicks.'
					},
					{
						title: 'Skip the Noise',
						description: 'Elio filters out the junk. You only see high-intent conversations.'
					},
					{
						title: 'Protect Your Brand',
						description: 'Catch negative mentions early and control the narrative.'
					}
				];
			} else {
				// Rio (Twitter)
				features = [
					{
						title: 'Viral Thread Generation',
						description: 'Create compelling threads designed to go viral.'
					},
					{
						title: 'Engagement Automation',
						description: 'Automate interactions to grow your following organically.'
					},
					{
						title: 'Trend Spotting',
						description: 'Identify and leverage trending hashtags and topics.'
					},
					{
						title: 'Smart Scheduling',
						description: 'Post at optimal times for maximum visibility.'
					},
					{
						title: 'Analytics & Insights',
						description: 'Track performance and optimize your strategy with data.'
					}
				];
			}
			return { ...agent, features };
		})
		.sort((a, b) => {
			const order = { search: 0, reddit: 1 }; // Rio (twitter) removed from order
			return order[a.icon] - order[b.icon];
		});

	function viewport(node) {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				node.dispatchEvent(new CustomEvent('enterViewport'));
				observer.unobserve(node);
			}
		});
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<div id="agents" class="py-24 relative overflow-hidden bg-white space-y-32">
	<!-- Global Background -->
	<div
		class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none fixed"
	></div>

	{#each enhancedAgents as agent, i}
		<section
			class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
			use:viewport
			on:enterViewport={() => (agent.visible = true)}
		>
			{#if agent.visible || true}
				<!-- Section Header -->
				<div
					class="flex flex-col lg:flex-row items-end justify-between gap-8 mb-12"
					use:animate={{ type: 'slide', y: 30 }}
				>
					<div class="lg:w-1/2">
						<div class="flex items-center gap-3 mb-4">
							<span
								class="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-sm font-bold border border-zinc-200 uppercase tracking-wider"
							>
								{agent.name}
							</span>
						</div>
						<h2 class="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
							{agent.subtitle}
						</h2>
					</div>
					<div class="lg:w-1/3 text-left lg:text-right">
						<p class="text-lg text-zinc-500 leading-relaxed">
							{#if agent.icon === 'reddit'}
								Elio reads your Nai articles and transforms them into value-first Reddit
								discussions. No copy-paste, just context-aware adaptation.
							{:else}
								{agent.description}
							{/if}
						</p>
					</div>
				</div>

				<!-- Modular Workflow Visual for Nai -->
				{#if agent.icon === 'search'}
					<div class="mb-24">
						<div
							class="p-8 bg-zinc-50 rounded-3xl border border-zinc-200 mb-12"
							use:animate={{ type: 'scale', delay: 0.2 }}
						>
							<div class="flex flex-col md:flex-row items-center justify-between gap-4 relative">
								<!-- Steps -->
								{#each ['Keywords', 'Competitors', 'Outlines', 'Full Posts'] as step, idx}
									<div
										class="flex flex-col items-center gap-3 relative z-10 group cursor-pointer w-full"
									>
										<div
											class="w-10 h-10 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center text-blue-600 font-bold shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-colors"
										>
											{idx + 1}
										</div>
										<span class="font-medium text-zinc-700 group-hover:text-blue-700">{step}</span>
										{#if idx < 3}
											<div
												class="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-zinc-200 -z-10"
											></div>
										{/if}
									</div>
								{/each}
							</div>
							<div class="text-center mt-6 text-zinc-500 text-sm">
								<span class="font-bold text-zinc-900">Flexible Workflow:</span> Stop at any step. Just
								need keywords? Done. Need outlines? Easy.
							</div>
						</div>

						<!-- Benefits Chain -->
						<div class="relative mb-24">
							<!-- Connecting Line (Desktop) -->
							<div
								class="hidden md:block absolute top-1/2 left-0 right-0 h-32 -translate-y-1/2 z-0 pointer-events-none"
							>
								<svg class="w-full h-full" preserveAspectRatio="none">
									<path
										d="M0,64 C300,64 300,0 600,64 C900,128 900,64 1200,64"
										fill="none"
										stroke="url(#gradient-line)"
										stroke-width="4"
										stroke-dasharray="8 8"
										class="opacity-30"
									/>
									<defs>
										<linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
											<stop offset="0%" stop-color="#3b82f6" />
											<stop offset="50%" stop-color="#8b5cf6" />
											<stop offset="100%" stop-color="#06b6d4" />
										</linearGradient>
									</defs>
								</svg>
							</div>

							<!-- Tech Bento Grid: 3 columns, 2 rows -->
							<div
								class="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10"
								use:animate={{ stagger: 0.15, y: 40 }}
							>
								<!-- Card 1: Research - Spans 2 columns -->
								<div
									class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 md:col-span-2 h-[280px] flex flex-col shadow-lg"
								>
									<div class="relative z-10 p-6 flex flex-col h-full">
										<div class="flex items-start justify-between mb-4">
											<div
												class="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center"
											>
												<Search class="w-6 h-6 text-blue-600" />
											</div>
											<span
												class="text-xs font-bold text-blue-600 uppercase tracking-wider px-3 py-1 bg-blue-50 rounded-full border border-blue-100"
												>Research</span
											>
										</div>
										<h3 class="text-2xl font-bold text-zinc-900 mb-3">Keyword Discovery</h3>
										<p class="text-zinc-600 text-sm leading-relaxed mb-auto">
											Real-time volume & difficulty data. Know what's rankable before you write. Nai
											scans your niche 24/7 finding low-competition keywords.
										</p>
										<div class="flex items-center gap-2 text-xs text-zinc-500 mt-4">
											<div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
											<span>Save 5h/week</span>
										</div>
									</div>
								</div>

								<!-- Card 2: Competitor Analysis with Screenshot -->
								<div
									class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[280px] flex flex-col shadow-lg"
								>
									<!-- Screenshot Placeholder -->
									<div class="relative h-[55%] bg-zinc-50 border-b border-zinc-200 overflow-hidden">
										<div class="absolute inset-0 flex items-center justify-center">
											<div class="text-center">
												<TrendingUp class="w-12 h-12 text-purple-300 mx-auto mb-2" />
												<p class="text-xs text-zinc-400 font-medium">Screenshot Placeholder</p>
											</div>
										</div>
										<!-- Decorative grid pattern -->
										<div
											class="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"
										></div>
									</div>
									<div class="relative z-10 p-4 flex flex-col flex-1">
										<h3 class="text-lg font-bold text-zinc-900 mb-2">Competitor Analysis</h3>
										<p class="text-zinc-600 text-xs leading-relaxed mb-auto">
											See who ranks #1-10 and why. Extract their headers and snippets.
										</p>
										<span class="text-xs font-bold text-purple-600 uppercase tracking-wider"
											>Intel</span
										>
									</div>
								</div>

								<!-- Card 3: Outline Generation -->
								<div
									class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[280px] flex flex-col shadow-lg"
								>
									<div class="relative z-10 p-6 flex flex-col h-full">
										<div
											class="w-12 h-12 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center mb-4"
										>
											<FileText class="w-6 h-6 text-pink-600" />
										</div>
										<h3 class="text-xl font-bold text-zinc-900 mb-3">Smart Outlining</h3>
										<p class="text-zinc-600 text-sm leading-relaxed mb-auto">
											Structured briefs with word counts. No blank page syndrome.
										</p>
										<span class="text-xs font-bold text-pink-600 uppercase tracking-wider"
											>Structure</span
										>
									</div>
								</div>

								<!-- Card 4: SEO Posts with Screenshot -->
								<div
									class="group relative bg-white rounded-3xl border-0 overflow-hidden hover:shadow-xl transition-all duration-300 h-[280px] flex flex-col shadow-lg"
								>
									<!-- Gradient Border Container -->
									<div
										class="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 opacity-100"
									>
										<div class="bg-white rounded-[22px] h-full w-full"></div>
									</div>

									<!-- Screenshot Placeholder -->
									<div
										class="relative h-[55%] bg-zinc-50 border-b border-zinc-200 overflow-hidden rounded-t-[22px] z-10 mx-[2px] mt-[2px]"
									>
										<div class="absolute inset-0 flex items-center justify-center">
											<div class="text-center">
												<PenTool class="w-12 h-12 text-cyan-300 mx-auto mb-2" />
												<p class="text-xs text-zinc-400 font-medium">Screenshot Placeholder</p>
											</div>
										</div>
										<!-- Decorative grid pattern -->
										<div
											class="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"
										></div>
									</div>
									<div class="relative z-10 p-4 flex flex-col flex-1 mx-[2px] mb-[2px]">
										<h3 class="text-lg font-bold text-zinc-900 mb-2">SEO Optimized Posts</h3>
										<p class="text-zinc-600 text-xs leading-relaxed mb-auto">
											Full articles based on your chosen keywords. You control the length.
										</p>
										<span class="text-xs font-bold text-cyan-600 uppercase tracking-wider"
											>Growth</span
										>
									</div>
								</div>

								<!-- Card 5: CTA Button -->
								<div
									on:click={() => goto('/signup')}
									on:keydown={(e) => e.key === 'Enter' && goto('/signup')}
									role="button"
									tabindex="0"
									class="group relative bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden hover:shadow-2xl hover:shadow-zinc-500/20 transition-all duration-300 h-[280px] flex flex-col items-center justify-center cursor-pointer hover:border-zinc-500"
								>
									<div class="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900"></div>
									<div class="relative z-10 text-center">
										<h3 class="text-2xl font-bold text-white mb-3">Try Nai Free</h3>
										<p class="text-zinc-400 text-sm mb-6 px-6">
											14 days on us. No credit card required.
										</p>
										<div
											class="w-14 h-14 rounded-full bg-white text-zinc-900 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg"
										>
											<ArrowRight class="w-7 h-7" />
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Arrow Down to Result -->
						<div class="flex justify-center mb-12">
							<div class="flex flex-col items-center gap-2 text-zinc-400">
								<div class="h-12 w-px bg-gradient-to-b from-zinc-200 to-blue-500"></div>
								<span class="text-xs uppercase tracking-widest font-medium text-blue-600"
									>The Result</span
								>
								<ArrowRight class="w-5 h-5 text-blue-600 rotate-90" />
							</div>
						</div>

						<!-- Featured Result (Proof of Work) -->
						{#if posts && posts.length > 0}
							<div
								class="relative max-w-5xl mx-auto"
								use:animate={{ type: 'slide', y: 40, delay: 0.2 }}
							>
								<div
									class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-20 transform rotate-1"
								></div>
								<div
									class="relative bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col md:flex-row"
								>
									<!-- Left: Content Preview -->
									<div
										class="md:w-2/3 p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-100"
									>
										<div class="flex items-center gap-3 mb-6">
											<span
												class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
											>
												Generated by Nai
											</span>
											<span class="text-zinc-400 text-sm">
												{new Date(posts[0].created_at).toLocaleDateString('en-US', {
													month: 'long',
													day: 'numeric',
													year: 'numeric'
												})}
											</span>
										</div>

										<h3 class="text-3xl md:text-4xl font-bold text-zinc-900 mb-6 leading-tight">
											{posts[0].title}
										</h3>

										<div class="prose prose-zinc max-w-none mb-8">
											<p class="text-zinc-600 text-lg leading-relaxed">
												{posts[0].meta_description}
											</p>
										</div>

										<div class="flex items-center gap-4">
											<a
												href="/blog/{posts[0].slug}"
												class="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors"
											>
												Read Full Article <ArrowRight class="w-4 h-4" />
											</a>
											<a
												href="/blog"
												class="text-zinc-500 hover:text-zinc-900 font-medium text-sm px-4"
											>
												View all examples
											</a>
										</div>
									</div>

									<!-- Right: Metrics/Stats -->
									<div
										class="md:w-1/3 bg-zinc-50/50 p-8 md:p-12 flex flex-col justify-center gap-8"
									>
										<div>
											<div class="text-sm text-zinc-500 font-medium mb-1">Word Count</div>
											<div class="text-3xl font-bold text-zinc-900">{posts[0].word_count}</div>
										</div>
										<div>
											<div class="text-sm text-zinc-500 font-medium mb-1">Est. Reading Time</div>
											<div class="text-3xl font-bold text-zinc-900">
												{Math.ceil(posts[0].word_count / 200)} min
											</div>
										</div>
										<div>
											<div class="text-sm text-zinc-500 font-medium mb-1">SEO Score</div>
											<div class="flex items-center gap-2">
												<div class="text-3xl font-bold text-green-600">98</div>
												<div
													class="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded"
												>
													OPTIMIZED
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/if}

						<!-- Automation & Integrations Section -->
						<div
							class="mt-24 bg-white rounded-3xl p-8 md:p-12 border border-zinc-200 overflow-hidden relative"
							use:animate={{ type: 'scale', delay: 0.2 }}
						>
							<!-- Background Glow -->
							<div
								class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
							></div>

							<div class="relative z-10">
								<div class="text-center max-w-3xl mx-auto mb-16">
									<h3 class="text-3xl md:text-4xl font-bold mb-6 text-zinc-900">
										Ship Months of Content in Minutes
									</h3>
									<p class="text-lg text-zinc-500 mb-8 leading-relaxed">
										Stop staring at blank pages. NAI researches, plans, and writes SEO-optimized
										articles that actually rank—while you sleep.
									</p>
								</div>

								<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
									<!-- Left: The Process -->
									<div class="space-y-4">
										<!-- Card 1: Dominate Your Niche (Gradient Border) -->
										<div
											class="relative bg-white rounded-2xl p-6 shadow-lg border-0 overflow-hidden group"
										>
											<div
												class="absolute inset-0 p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl"
											>
												<div class="bg-white h-full w-full rounded-[14px]"></div>
											</div>
											<div class="relative z-10 flex gap-4">
												<div
													class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100"
												>
													<Search class="w-6 h-6 text-blue-600" />
												</div>
												<div>
													<h4 class="text-xl font-bold mb-2 text-zinc-900">Dominate Your Niche</h4>
													<p class="text-zinc-600 text-sm leading-relaxed">
														Uncover high-value, low-competition keywords that your competitors are
														missing. Stop guessing what to write.
													</p>
												</div>
											</div>
										</div>

										<!-- Card 2: Steal Their Strategy -->
										<div
											class="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100 flex gap-4 group hover:shadow-xl transition-all"
										>
											<div
												class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100"
											>
												<TrendingUp class="w-6 h-6 text-purple-600" />
											</div>
											<div>
												<h4 class="text-xl font-bold mb-2 text-zinc-900">Steal Their Strategy</h4>
												<p class="text-zinc-600 text-sm leading-relaxed">
													Instantly analyze top-ranking content to understand exactly what Google
													wants. Reverse-engineer success.
												</p>
											</div>
										</div>

										<!-- Card 3: Banish Writer's Block -->
										<div
											class="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100 flex gap-4 group hover:shadow-xl transition-all"
										>
											<div
												class="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0 border border-pink-100"
											>
												<FileText class="w-6 h-6 text-pink-600" />
											</div>
											<div>
												<h4 class="text-xl font-bold mb-2 text-zinc-900">Banish Writer's Block</h4>
												<p class="text-zinc-600 text-sm leading-relaxed">
													Get scientifically structured outlines optimized for readability and
													retention. Never start from scratch again.
												</p>
											</div>
										</div>

										<!-- Card 4: Scale Your Output -->
										<div
											class="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100 flex gap-4 group hover:shadow-xl transition-all"
										>
											<div
												class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 border border-emerald-100"
											>
												<PenTool class="w-6 h-6 text-emerald-600" />
											</div>
											<div>
												<h4 class="text-xl font-bold mb-2 text-zinc-900">Scale Your Output</h4>
												<p class="text-zinc-600 text-sm leading-relaxed">
													Generate deep, researched articles that establish authority—without typing
													a word.
												</p>
											</div>
										</div>
									</div>

									<!-- Right: Auto Publish Highlight -->
									<div
										class="bg-zinc-50 rounded-3xl p-8 border border-zinc-200 relative overflow-hidden"
									>
										<div
											class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
										></div>

										<div class="relative z-10 text-center">
											<div
												class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg border border-zinc-100"
											>
												<!-- WordPress Logo SVG -->
												<svg
													class="w-12 h-12 text-[#21759b]"
													viewBox="0 0 122.52 122.523"
													fill="currentColor"
												>
													<path
														d="M8.708 61.26c0 20.802 12.089 38.779 29.619 47.298L13.258 39.872a52.354 52.354 0 0 0-4.55 21.388zM96.74 58.608c0-6.495-2.333-10.993-4.334-14.494-2.664-4.329-5.161-7.995-5.161-12.324 0-4.831 3.664-9.328 8.825-9.328.233 0 .454.029.681.042-9.35-8.566-21.807-13.796-35.489-13.796-18.36 0-34.513 9.42-43.91 23.688 1.233.037 2.395.063 3.382.063 5.497 0 14.006-.667 14.006-.667 2.833-.167 3.167 3.994.337 4.329 0 0-2.847.335-6.015.501L48.2 93.547l11.501-34.493-8.188-22.434c-2.83-.166-5.511-.501-5.511-.501-2.832-.166-2.5-4.496.332-4.329 0 0 8.679.667 13.843.667 5.496 0 14.006-.667 14.006-.667 2.835-.167 3.168 3.994.337 4.329 0 0-2.853.335-6.015.501l18.992 56.494 5.242-17.517c2.272-7.269 4.001-12.49 4.001-16.989z"
													/>
													<path
														d="M62.184 65.857l-15.768 45.819a52.563 52.563 0 0 0 14.846 2.095c6.12 0 11.989-1.058 17.452-2.979a4.135 4.135 0 0 1-.336-.646l-16.194-44.289zM107.376 36.046c.226 1.674.354 3.471.354 5.404 0 5.333-.996 11.328-3.996 18.824l-16.053 46.413c15.624-9.111 26.133-26.038 26.133-45.426.001-9.137-2.333-17.729-6.438-25.215z"
													/>
													<path
														d="M61.262 0C27.483 0 0 27.481 0 61.26c0 33.783 27.483 61.263 61.262 61.263 33.778 0 61.265-27.48 61.265-61.263C122.526 27.481 95.04 0 61.262 0zm0 119.715c-32.23 0-58.453-26.223-58.453-58.455 0-32.23 26.222-58.451 58.453-58.451 32.229 0 58.45 26.221 58.45 58.451 0 32.232-26.221 58.455-58.45 58.455z"
													/>
												</svg>
											</div>

											<h4 class="text-2xl font-bold mb-4 text-zinc-900">
												Auto Publish to Your Platforms
											</h4>
											<p class="text-zinc-500 mb-8">
												Automatically publish to integrated platforms like WordPress or via API.
												Scale your marketing with one click—quantity without compromising quality.
											</p>

											<div class="flex flex-wrap justify-center gap-3">
												<div
													class="px-4 py-2 bg-white rounded-lg border border-zinc-200 text-sm font-medium text-zinc-600 flex items-center gap-2 shadow-sm"
												>
													<Check class="w-4 h-4 text-green-500" /> No complex workflow
												</div>
												<div
													class="px-4 py-2 bg-white rounded-lg border border-zinc-200 text-sm font-medium text-zinc-600 flex items-center gap-2 shadow-sm"
												>
													<Check class="w-4 h-4 text-green-500" /> One click publish
												</div>
												<div
													class="px-4 py-2 bg-white rounded-lg border border-zinc-200 text-sm font-medium text-zinc-600 flex items-center gap-2 shadow-sm"
												>
													<Check class="w-4 h-4 text-green-500" /> Less friction marketing
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- Connected Ecosystem Visual -->
				{#if agent.icon === 'search'}
					<section
						class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center my-32"
						use:animate={{ type: 'slide', y: 30, duration: 0.8 }}
					>
						<div
							class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6"
						>
							<Share2 class="w-4 h-4" />
							<span>Connected Ecosystem</span>
						</div>
						<h2 class="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
							Your Agents Talk to Each Other
						</h2>
						<p class="text-xl text-zinc-500 max-w-2xl mx-auto mb-12">
							Don't build silos. Nai's SEO research informs Elio's Reddit strategy. One cohesive
							engine.
						</p>

						<div
							class="relative max-w-4xl mx-auto p-8 bg-white rounded-[2.5rem] border border-zinc-200 shadow-2xl"
						>
							<div
								class="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-orange-50/30 rounded-[2.5rem] pointer-events-none"
							></div>
							<div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-center">
								<!-- Nai Node (WordPress) -->
								<div class="flex flex-col items-center gap-4">
									<div
										class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shadow-lg"
									>
										<!-- WordPress Icon -->
										<svg class="w-11 h-11" viewBox="0 0 122.52 122.523" fill="currentColor">
											<path
												d="M8.708 61.26c0 20.802 12.089 38.779 29.619 47.298L13.258 39.872a52.354 52.354 0 0 0-4.55 21.388zM96.74 58.608c0-6.495-2.333-10.993-4.334-14.494-2.664-4.329-5.161-7.995-5.161-12.324 0-4.831 3.664-9.328 8.825-9.328.233 0 .454.029.681.042-9.35-8.566-21.807-13.796-35.489-13.796-18.36 0-34.513 9.42-43.91 23.688 1.233.037 2.395.063 3.382.063 5.497 0 14.006-.667 14.006-.667 2.833-.167 3.167 3.994.337 4.329 0 0-2.847.335-6.015.501L48.2 93.547l11.501-34.493-8.188-22.434c-2.83-.166-5.511-.501-5.511-.501-2.832-.166-2.5-4.496.332-4.329 0 0 8.679.667 13.843.667 5.496 0 14.006-.667 14.006-.667 2.835-.167 3.168 3.994.337 4.329 0 0-2.853.335-6.015.501l18.992 56.494 5.242-17.517c2.272-7.269 4.001-12.49 4.001-16.989z"
											/>
											<path
												d="M62.184 65.857l-15.768 45.819a52.563 52.563 0 0 0 14.846 2.095c6.12 0 11.989-1.058 17.452-2.979a4.135 4.135 0 0 1-.336-.646l-16.194-44.289zM107.376 36.046c.226 1.674.354 3.471.354 5.404 0 5.333-.996 11.328-3.996 18.824l-16.053 46.413c15.624-9.111 26.133-26.038 26.133-45.426.001-9.137-2.333-17.729-6.438-25.215z"
											/>
											<path
												d="M61.262 0C27.483 0 0 27.481 0 61.26c0 33.783 27.483 61.263 61.262 61.263 33.778 0 61.265-27.48 61.265-61.263C122.526 27.481 95.04 0 61.262 0zm0 119.715c-32.23 0-58.453-26.223-58.453-58.455 0-32.23 26.222-58.451 58.453-58.451 32.229 0 58.45 26.221 58.45 58.451 0 32.232-26.221 58.455-58.45 58.455z"
											/>
										</svg>
									</div>
									<div class="text-center">
										<div class="font-bold text-zinc-900 text-lg">Nai</div>
										<div class="text-sm text-zinc-500">SEO Content</div>
									</div>
								</div>

								<!-- Arrow -->
								<div class="hidden md:flex justify-center">
									<div class="flex items-center gap-2">
										<div class="h-px w-16 bg-gradient-to-r from-blue-300 to-orange-300"></div>
										<ArrowRight class="w-6 h-6 text-zinc-400 animate-pulse" />
										<div class="h-px w-16 bg-gradient-to-r from-blue-300 to-orange-300"></div>
									</div>
								</div>

								<!-- Elio Node (Reddit) -->
								<div class="flex flex-col items-center gap-4">
									<div
										class="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 shadow-lg"
									>
										<!-- Reddit Icon -->
										<svg class="w-11 h-11" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"
											/>
										</svg>
									</div>
									<div class="text-center">
										<div class="font-bold text-zinc-900 text-lg">Elio</div>
										<div class="text-sm text-zinc-500">Reddit Strategy</div>
									</div>
								</div>
							</div>

							<!-- Connecting Line Description -->
							<div
								class="mt-8 pt-8 border-t border-zinc-200 text-sm text-zinc-600 flex items-center justify-center gap-2"
							>
								<div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
								<span class="font-medium">Live Data Sync:</span> SEO keywords automatically trigger relevant
								Reddit monitoring.
							</div>
						</div>
					</section>
				{/if}

				<!-- Elio Section (Reddit) -->
				{#if agent.icon === 'reddit'}
					<!-- Automation & Integrations Section (Elio) - MOVED TO TOP (Profile First) -->
					<div
						class="mb-24 bg-white rounded-3xl p-8 md:p-12 border border-zinc-200 overflow-hidden relative"
						use:animate={{ type: 'scale', delay: 0.2 }}
					>
						<!-- Background Glow -->
						<div
							class="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
						></div>

						<div class="relative z-10">
							<div class="text-center max-w-3xl mx-auto mb-16">
								<h3 class="text-3xl md:text-4xl font-bold mb-6 text-zinc-900">
									Turn Reddit into a Revenue Engine
								</h3>
								<p class="text-lg text-zinc-500 mb-8 leading-relaxed">
									Elio finds high-intent leads and drafts authentic responses that convert. Scale
									your presence without spamming.
								</p>
							</div>

							<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<!-- Left: The Process -->
								<div class="space-y-4">
									<!-- Card 1: Spot High-Intent Buyers (Gradient Border) -->
									<div
										class="relative bg-white rounded-2xl p-6 shadow-lg border-0 overflow-hidden group"
									>
										<div
											class="absolute inset-0 p-[2px] bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-2xl"
										>
											<div class="bg-white h-full w-full rounded-[14px]"></div>
										</div>
										<div class="relative z-10 flex gap-4">
											<div
												class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 border border-orange-100"
											>
												<!-- Reddit Icon -->
												<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
													<path
														d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"
													/>
												</svg>
											</div>
											<div>
												<h4 class="text-xl font-bold mb-2 text-zinc-900">
													Spot High-Intent Buyers
												</h4>
												<p class="text-zinc-600 text-sm leading-relaxed">
													Identify users who are complaining about your competitors or asking for
													your exact solution right now.
												</p>
											</div>
										</div>
									</div>

									<!-- Card 2: Engage Like a Human -->
									<div
										class="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100 flex gap-4 group hover:shadow-xl transition-all"
									>
										<div
											class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100"
										>
											<MessageCircle class="w-6 h-6 text-blue-600" />
										</div>
										<div>
											<h4 class="text-xl font-bold mb-2 text-zinc-900">Engage Like a Human</h4>
											<p class="text-zinc-600 text-sm leading-relaxed">
												Draft helpful, non-salesy replies that position you as an expert and drive
												traffic. No robotic spam.
											</p>
										</div>
									</div>

									<!-- Card 3: Focus on What Matters -->
									<div
										class="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100 flex gap-4 group hover:shadow-xl transition-all"
									>
										<div
											class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 border border-green-100"
										>
											<TrendingUp class="w-6 h-6 text-green-600" />
										</div>
										<div>
											<h4 class="text-xl font-bold mb-2 text-zinc-900">Focus on What Matters</h4>
											<p class="text-zinc-600 text-sm leading-relaxed">
												Elio explains *why* a conversation is worth your time, so you never waste
												effort on dead ends.
											</p>
										</div>
									</div>

									<!-- Card 4: Control the Narrative -->
									<div
										class="bg-white rounded-2xl p-6 shadow-lg border border-zinc-100 flex gap-4 group hover:shadow-xl transition-all"
									>
										<div
											class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100"
										>
											<Shield class="w-6 h-6 text-red-600" />
										</div>
										<div>
											<h4 class="text-xl font-bold mb-2 text-zinc-900">Control the Narrative</h4>
											<p class="text-zinc-600 text-sm leading-relaxed">
												Monitor every mention of your brand and competitors. Catch negative
												sentiment before it spreads.
											</p>
										</div>
									</div>
								</div>

								<!-- Right: Auto Publish Highlight -->
								<div
									class="bg-zinc-50 rounded-3xl p-8 border border-zinc-200 relative overflow-hidden"
								>
									<div
										class="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-zinc-500/5"
									></div>

									<div class="relative z-10 text-center">
										<div
											class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg border border-zinc-100"
										>
											<!-- Reddit Logo SVG -->
											<svg class="w-12 h-12 text-[#FF4500]" fill="currentColor" viewBox="0 0 24 24">
												<path
													d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"
												/>
											</svg>
										</div>

										<h4 class="text-2xl font-bold mb-4 text-zinc-900">
											Real-time Reddit Integration
										</h4>
										<p class="text-zinc-500 mb-8">
											Never miss a lead. Elio filters the noise and alerts you only when it matters.
										</p>

										<div class="flex flex-wrap justify-center gap-3">
											<div
												class="px-4 py-2 bg-white rounded-lg border border-zinc-200 text-sm font-medium text-zinc-600 flex items-center gap-2 shadow-sm"
											>
												<Check class="w-4 h-4 text-orange-500" /> Real-time alerts
											</div>
											<div
												class="px-4 py-2 bg-white rounded-lg border border-zinc-200 text-sm font-medium text-zinc-600 flex items-center gap-2 shadow-sm"
											>
												<Check class="w-4 h-4 text-orange-500" /> Context-aware
											</div>
											<div
												class="px-4 py-2 bg-white rounded-lg border border-zinc-200 text-sm font-medium text-zinc-600 flex items-center gap-2 shadow-sm"
											>
												<Check class="w-4 h-4 text-orange-500" /> Spam filtering
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Tech Bento Grid: 3 columns, 2 rows -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4" use:animate={{ stagger: 0.15, y: 40 }}>
						<!-- Card 1: Opportunity Scanning - Spans 2 columns -->
						<div
							class="group relative bg-white rounded-3xl border-0 overflow-hidden hover:shadow-xl transition-all duration-300 md:col-span-2 h-[280px] flex flex-col shadow-lg"
						>
							<!-- Gradient Border Container -->
							<div
								class="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 opacity-100"
							>
								<div class="bg-white rounded-[22px] h-full w-full"></div>
							</div>

							<div class="relative z-10 p-6 flex flex-col h-full mx-[2px] my-[2px]">
								<div class="flex items-start justify-between mb-4">
									<div
										class="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center"
									>
										<Search class="w-6 h-6 text-orange-600" />
									</div>
									<span
										class="text-xs font-bold text-orange-600 uppercase tracking-wider px-3 py-1 bg-orange-50 rounded-full border border-orange-100"
										>Opportunity</span
									>
								</div>
								<h3 class="text-2xl font-bold text-zinc-900 mb-3">Opportunity Scanning</h3>
								<p class="text-zinc-600 text-sm leading-relaxed mb-auto">
									Find discussions where people are actually looking for you. Elio spots "Desperate"
									and "Frustrated" users who need your solution.
								</p>
								<div class="flex items-center gap-2 text-xs text-zinc-500 mt-4">
									<div class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
									<span>Frustration Detected</span>
								</div>
							</div>
						</div>

						<!-- Card 2: Smart Responses with Screenshot -->
						<div
							class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[280px] flex flex-col shadow-lg"
						>
							<!-- Screenshot Placeholder -->
							<div class="relative h-[55%] bg-zinc-50 border-b border-zinc-200 overflow-hidden">
								<div class="absolute inset-0 flex items-center justify-center">
									<div class="text-center">
										<PenTool class="w-12 h-12 text-orange-300 mx-auto mb-2" />
										<p class="text-xs text-zinc-400 font-medium">Screenshot Placeholder</p>
									</div>
								</div>
								<!-- Decorative grid pattern -->
								<div
									class="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"
								></div>
							</div>
							<div class="relative z-10 p-4 flex flex-col flex-1">
								<h3 class="text-lg font-bold text-zinc-900 mb-2">Smart Responses</h3>
								<p class="text-zinc-600 text-xs leading-relaxed mb-auto">
									Drafts context-aware replies based on the conversation history.
								</p>
								<span class="text-xs font-bold text-orange-600 uppercase tracking-wider"
									>Engagement</span
								>
							</div>
						</div>

						<!-- Card 3: Match Reasoning -->
						<div
							class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[280px] flex flex-col shadow-lg"
						>
							<div class="relative z-10 p-6 flex flex-col h-full">
								<div
									class="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4"
								>
									<TrendingUp class="w-6 h-6 text-orange-600" />
								</div>
								<h3 class="text-xl font-bold text-zinc-900 mb-3">Match Reasoning</h3>
								<p class="text-zinc-600 text-sm leading-relaxed mb-auto">
									Tells you *why* a post is relevant before you engage.
								</p>
								<span class="text-xs font-bold text-orange-600 uppercase tracking-wider">Intel</span
								>
							</div>
						</div>

						<!-- Card 4: Reputation Management with Screenshot -->
						<div
							class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[280px] flex flex-col shadow-lg"
						>
							<!-- Screenshot Placeholder -->
							<div class="relative h-[55%] bg-zinc-50 border-b border-zinc-200 overflow-hidden">
								<div class="absolute inset-0 flex items-center justify-center">
									<div class="text-center">
										<MessageCircle class="w-12 h-12 text-orange-300 mx-auto mb-2" />
										<p class="text-xs text-zinc-400 font-medium">Screenshot Placeholder</p>
									</div>
								</div>
								<!-- Decorative grid pattern -->
								<div
									class="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"
								></div>
							</div>
							<div class="relative z-10 p-4 flex flex-col flex-1">
								<h3 class="text-lg font-bold text-zinc-900 mb-2">Reputation Management</h3>
								<p class="text-zinc-600 text-xs leading-relaxed mb-auto">
									Monitor and manage your brand presence effectively.
								</p>
								<span class="text-xs font-bold text-orange-600 uppercase tracking-wider"
									>Strategy</span
								>
							</div>
						</div>

						<!-- Card 5: CTA Button -->
						<div
							on:click={() => goto('/signup')}
							on:keydown={(e) => e.key === 'Enter' && goto('/signup')}
							role="button"
							tabindex="0"
							class="group relative bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden hover:shadow-2xl hover:shadow-zinc-500/20 transition-all duration-300 h-[280px] flex flex-col items-center justify-center cursor-pointer hover:border-zinc-500"
						>
							<div class="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900"></div>
							<div class="relative z-10 text-center">
								<h3 class="text-2xl font-bold text-white mb-3">Start with Elio</h3>
								<p class="text-zinc-400 text-sm mb-6 px-6">Turn Reddit into your best channel</p>
								<div
									class="w-14 h-14 rounded-full bg-white text-zinc-900 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg"
								>
									<ArrowRight class="w-7 h-7" />
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- Benefit Cards Grid (Only for Rio) -->
				{#if agent.icon !== 'search' && agent.icon !== 'reddit'}
					<div
						class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						use:animate={{ stagger: 0.2, y: 50 }}
					>
						{#each agent.features as feature, j}
							<div
								class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
							>
								<!-- Card Image -->
								<div class="h-48 overflow-hidden relative bg-zinc-100">
									<div class="w-full h-full bg-gradient-to-br from-sky-400 to-blue-600 relative">
										<div
											class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"
										></div>
									</div>
									<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
									<div class="absolute bottom-4 left-4 text-white font-bold text-lg">
										{feature.title}
									</div>
								</div>

								<!-- Card Content -->
								<div class="p-6">
									<p class="text-zinc-600 text-sm leading-relaxed">
										{feature.description}
									</p>
								</div>
							</div>
						{/each}

						<!-- CTA Card -->
						<div
							class="group relative bg-zinc-900 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center p-8 text-center cursor-pointer"
						>
							<h3 class="text-2xl font-bold text-white mb-2">Start with {agent.name}</h3>
							<p class="text-zinc-400 text-sm mb-6">Launch your first campaign today.</p>
							<div
								class="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform"
							>
								<ArrowRight class="w-6 h-6" />
							</div>
						</div>
					</div>
				{/if}
			{/if}
		</section>
	{/each}
</div>

<style>
	/* No custom CSS needed, using Tailwind */
</style>
