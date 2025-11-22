<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import {
		Check,
		ArrowRight,
		Share2,
		Zap,
		Search,
		FileText,
		PenTool,
		TrendingUp,
		MessageCircle
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
						title: 'Keyword Discovery',
						description:
							"Real-time volume & difficulty data. Know what's rankable before you write."
					},
					{
						title: 'Competitor Analysis',
						description: 'See who ranks #1-10 and why. Extract their headers and snippets.'
					},
					{
						title: 'Outline Generation',
						description:
							'Structured briefs with word counts and meta descriptions. No blank page syndrome.'
					},
					{
						title: 'SEO Optimized Posts',
						description: 'Full articles based on your chosen keywords. You control the length.'
					},
					{
						title: 'Auto-Publish',
						description: 'Seamlessly publish content to WordPress or via API.'
					}
				];
			} else if (agent.icon === 'reddit') {
				// Elio
				features = [
					{
						title: 'Opportunity Scanning',
						description: 'Find discussions where people are actually looking for you.'
					},
					{
						title: 'Frustration Detection',
						description: 'Elio spots "Desperate" and "Frustrated" users who need your solution.'
					},
					{
						title: 'Smart Responses',
						description: 'Drafts context-aware replies based on the conversation history.'
					},
					{
						title: 'Match Reasoning',
						description: 'Tells you *why* a post is relevant before you engage.'
					},
					{
						title: 'Reputation Management',
						description: 'Monitor and manage your brand presence effectively.'
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

	<!-- Connected Ecosystem Visual -->
	<section
		class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-20"
		use:animate={{ type: 'slide', y: 30, duration: 0.8 }}
	>
		<div
			class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6"
		>
			<Share2 class="w-4 h-4" />
			<span>Connected Ecosystem</span>
		</div>
		<h2 class="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
			Your Agents Talk to Each Other
		</h2>
		<p class="text-xl text-zinc-500 max-w-2xl mx-auto mb-12">
			Don't build silos. Nai's SEO research informs Elio's Reddit strategy. One cohesive engine.
		</p>

		<div
			class="relative max-w-4xl mx-auto p-8 bg-white rounded-[2.5rem] border border-zinc-200 shadow-2xl"
		>
			<div
				class="absolute inset-0 bg-gradient-to-b from-zinc-50/50 to-transparent rounded-[2.5rem] pointer-events-none"
			></div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-center">
				<!-- Nai Node -->
				<div class="flex flex-col items-center gap-4">
					<div
						class="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm"
					>
						<Search class="w-8 h-8" />
					</div>
					<div class="text-center">
						<div class="font-bold text-zinc-900">Nai</div>
						<div class="text-sm text-zinc-500">SEO Content</div>
					</div>
				</div>

				<!-- Arrow 1 -->
				<div class="hidden md:flex justify-center text-zinc-300">
					<ArrowRight class="w-8 h-8 animate-pulse" />
				</div>

				<!-- Elio Node -->
				<div class="flex flex-col items-center gap-4">
					<div
						class="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm"
					>
						<Zap class="w-8 h-8" />
					</div>
					<div class="text-center">
						<div class="font-bold text-zinc-900">Elio</div>
						<div class="text-sm text-zinc-500">Reddit Strategy</div>
					</div>
				</div>

				<!-- Arrow 2 (Visual only for 3-step, but user asked for interconnectivity generally. Let's imply a cycle or flow) -->
				<!-- For simplicity in this grid, we'll just show the connection -->
			</div>

			<!-- Connecting Line Description -->
			<div
				class="mt-8 pt-8 border-t border-zinc-100 text-sm text-zinc-500 flex items-center justify-center gap-2"
			>
				<div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
				Live Data Sync: SEO keywords automatically trigger relevant Reddit monitoring.
			</div>
		</div>
	</section>

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

							<div
								class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
								use:animate={{ stagger: 0.2, y: 50 }}
							>
								<!-- Card 1: Daily Discovery -->
								<div
									class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[500px] flex flex-col"
								>
									<div class="h-[75%] relative overflow-hidden">
										<img
											src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
											alt="Daily Discovery"
											class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<div
											class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
										></div>

										<!-- Numbering Overlay -->
										<div
											class="absolute top-6 left-6 text-6xl font-bold text-white/20 group-hover:text-white/40 transition-colors"
										>
											01
										</div>

										<div class="absolute bottom-6 left-6 right-6">
											<h3 class="text-2xl font-bold text-white mb-2 relative inline-block">
												Daily Discovery
											</h3>
											<p
												class="text-zinc-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
											>
												Never run out of ideas. Nai scans your niche 24/7 finding low-competition
												keywords competitors missed.
											</p>
										</div>
									</div>
									<div class="h-[25%] p-6 flex items-center justify-between bg-white">
										<div>
											<div class="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">
												Research
											</div>
											<div class="text-zinc-900 font-medium">Save 5h/week</div>
										</div>
										<div
											class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"
										>
											<Zap class="w-5 h-5" />
										</div>
									</div>
								</div>

								<!-- Card 2: Smart Outlining -->
								<div
									class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[500px] flex flex-col md:mt-12"
								>
									<div class="h-[75%] relative overflow-hidden">
										<img
											src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop"
											alt="Smart Outlining"
											class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<div
											class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
										></div>

										<!-- Numbering Overlay -->
										<div
											class="absolute top-6 left-6 text-6xl font-bold text-white/20 group-hover:text-white/40 transition-colors"
										>
											02
										</div>

										<div class="absolute bottom-6 left-6 right-6">
											<h3 class="text-2xl font-bold text-white mb-2 relative inline-block">
												Smart Outlining
											</h3>
											<p
												class="text-zinc-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
											>
												Structure before you write. She builds data-backed outlines based on
												top-ranking content. No blank page syndrome.
											</p>
										</div>
									</div>
									<div class="h-[25%] p-6 flex items-center justify-between bg-white">
										<div>
											<div class="text-xs font-bold text-purple-500 uppercase tracking-wider mb-1">
												Structure
											</div>
											<div class="text-zinc-900 font-medium">Perfect Outlines</div>
										</div>
										<div
											class="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600"
										>
											<FileText class="w-5 h-5" />
										</div>
									</div>
								</div>

								<!-- Card 3: Scale on Autopilot -->
								<div
									class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[500px] flex flex-col"
								>
									<div class="h-[75%] relative overflow-hidden">
										<img
											src="https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2074&auto=format&fit=crop"
											alt="Scale on Autopilot"
											class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<div
											class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
										></div>

										<!-- Numbering Overlay -->
										<div
											class="absolute top-6 left-6 text-6xl font-bold text-white/20 group-hover:text-white/40 transition-colors"
										>
											03
										</div>

										<div class="absolute bottom-6 left-6 right-6">
											<h3 class="text-2xl font-bold text-white mb-2 relative inline-block">
												Scale on Autopilot
											</h3>
											<p
												class="text-zinc-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
											>
												Agency output, solo team. Generate high-quality drafts at scale. Perfect for
												founders needing volume without headcount.
											</p>
										</div>
									</div>
									<div class="h-[25%] p-6 flex items-center justify-between bg-white">
										<div>
											<div class="text-xs font-bold text-cyan-500 uppercase tracking-wider mb-1">
												Growth
											</div>
											<div class="text-zinc-900 font-medium">10x Output</div>
										</div>
										<div
											class="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600"
										>
											<TrendingUp class="w-5 h-5" />
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
							class="mt-24 bg-zinc-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative"
							use:animate={{ type: 'scale', delay: 0.2 }}
						>
							<!-- Background Glow -->
							<div
								class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
							></div>

							<div class="relative z-10">
								<div class="text-center max-w-3xl mx-auto mb-16">
									<h3 class="text-3xl md:text-4xl font-bold mb-6">
										Automate Your SEO Effortlessly
									</h3>
									<p class="text-zinc-400 text-lg leading-relaxed">
										Streamline your SEO process with Nai to get high-quality keywords, detailed
										outlines, and complete blog posts in minutes. Create a task, schedule it, et
										voilà—iterate fast without sacrificing quality.
									</p>
								</div>

								<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
									<!-- Left: The Process -->
									<div class="space-y-8">
										<div class="flex gap-4">
											<div
												class="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700"
											>
												<Search class="w-6 h-6 text-blue-400" />
											</div>
											<div>
												<h4 class="text-xl font-bold mb-2">Keyword Discovery</h4>
												<p class="text-zinc-400">
													Nai finds optimal keywords tailored to your project.
												</p>
											</div>
										</div>

										<div class="flex gap-4">
											<div
												class="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700"
											>
												<TrendingUp class="w-6 h-6 text-purple-400" />
											</div>
											<div>
												<h4 class="text-xl font-bold mb-2">Competitor Analysis</h4>
												<p class="text-zinc-400">
													Nai finds the top ranking competitors on selected keywords.
												</p>
											</div>
										</div>

										<div class="flex gap-4">
											<div
												class="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700"
											>
												<FileText class="w-6 h-6 text-pink-400" />
											</div>
											<div>
												<h4 class="text-xl font-bold mb-2">Outline Generation</h4>
												<p class="text-zinc-400">
													Generate structured outlines from discovered keywords and competitor
													analysis.
												</p>
											</div>
										</div>

										<div class="flex gap-4">
											<div
												class="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700"
											>
												<PenTool class="w-6 h-6 text-emerald-400" />
											</div>
											<div>
												<h4 class="text-xl font-bold mb-2">Full Posts</h4>
												<p class="text-zinc-400">
													Expand outlines into full, ready-to-publish articles.
												</p>
											</div>
										</div>
									</div>

									<!-- Right: Auto Publish Highlight -->
									<div
										class="bg-zinc-800/50 rounded-3xl p-8 border border-zinc-700 relative overflow-hidden"
									>
										<div
											class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"
										></div>

										<div class="relative z-10 text-center">
											<div
												class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg"
											>
												<!-- WordPress Logo SVG -->
												<svg
													class="w-12 h-12 text-[#21759b]"
													viewBox="0 0 24 24"
													fill="currentColor"
												>
													<path
														d="M12.04 0C5.41 0 .04 5.37.04 12s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12zm0 23.3c-2.6 0-4.98-.88-6.9-2.36l4.9-13.5 1.43 4.15 2.9-8.4c4.02 1.54 6.9 5.4 6.9 9.92 0 5.6-4.03 10.18-9.23 10.18zm-6.8-3.3c-1.6-1.9-2.58-4.35-2.58-7.03 0-2.2.66-4.25 1.8-6l5.2 14.3-4.42-1.27zm14.1-4.9l-3.4-9.8c1.6.5 3.04 1.4 4.18 2.64-.4 2.4-1.9 5.9-4.04 11.7l3.26-4.54z"
													/>
												</svg>
											</div>

											<h4 class="text-2xl font-bold mb-4">Auto Publish to Your Platforms</h4>
											<p class="text-zinc-400 mb-8">
												Automatically publish to integrated platforms like WordPress or via API.
												Automate your marketing with one click—quantity without compromising
												quality.
											</p>

											<div class="flex flex-wrap justify-center gap-3">
												<div
													class="px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-700 text-sm font-medium text-zinc-300 flex items-center gap-2"
												>
													<Check class="w-4 h-4 text-green-500" /> No complex workflow
												</div>
												<div
													class="px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-700 text-sm font-medium text-zinc-300 flex items-center gap-2"
												>
													<Check class="w-4 h-4 text-green-500" /> One click publish
												</div>
												<div
													class="px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-700 text-sm font-medium text-zinc-300 flex items-center gap-2"
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

				<!-- Elio Section (Reddit) -->
				{#if agent.icon === 'reddit'}
					<!-- Automation & Integrations Section (Elio) - MOVED TO TOP (Profile First) -->
					<div
						class="mb-24 bg-zinc-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative"
						use:animate={{ type: 'scale', delay: 0.2 }}
					>
						<!-- Background Glow -->
						<div
							class="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
						></div>

						<div class="relative z-10">
							<div class="text-center max-w-3xl mx-auto mb-16">
								<h3 class="text-3xl md:text-4xl font-bold mb-6">Automate Your Reddit Strategy</h3>
								<p class="text-zinc-400 text-lg leading-relaxed">
									Stop scrolling. Elio monitors thousands of communities 24/7 to find high-intent
									leads and drafts the perfect response for you. Turn Reddit into your best
									acquisition channel.
								</p>
							</div>

							<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<!-- Left: The Process -->
								<div class="space-y-8">
									<div class="flex gap-4">
										<div
											class="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700"
										>
											<Search class="w-6 h-6 text-orange-500" />
										</div>
										<div>
											<h4 class="text-xl font-bold mb-2">Smart Monitoring</h4>
											<p class="text-zinc-400">
												Tracks keywords & subreddits in real-time to find relevant discussions.
											</p>
										</div>
									</div>

									<div class="flex gap-4">
										<div
											class="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700"
										>
											<TrendingUp class="w-6 h-6 text-orange-500" />
										</div>
										<div>
											<h4 class="text-xl font-bold mb-2">Sentiment Analysis</h4>
											<p class="text-zinc-400">
												Detects frustration levels to prioritize high-intent opportunities.
											</p>
										</div>
									</div>

									<div class="flex gap-4">
										<div
											class="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700"
										>
											<PenTool class="w-6 h-6 text-orange-500" />
										</div>
										<div>
											<h4 class="text-xl font-bold mb-2">Draft Generation</h4>
											<p class="text-zinc-400">
												Writes context-aware, value-first replies that don't sound like bots.
											</p>
										</div>
									</div>

									<div class="flex gap-4">
										<div
											class="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700"
										>
											<MessageCircle class="w-6 h-6 text-orange-500" />
										</div>
										<div>
											<h4 class="text-xl font-bold mb-2">Engagement</h4>
											<p class="text-zinc-400">
												One-click response copying and tracking to manage your pipeline.
											</p>
										</div>
									</div>
								</div>

								<!-- Right: Auto Publish Highlight -->
								<div
									class="bg-zinc-800/50 rounded-3xl p-8 border border-zinc-700 relative overflow-hidden"
								>
									<div
										class="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-zinc-500/10"
									></div>

									<div class="relative z-10 text-center">
										<div
											class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg"
										>
											<!-- Reddit Logo SVG -->
											<svg class="w-12 h-12 text-[#FF4500]" viewBox="0 0 24 24" fill="currentColor">
												<path
													d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.926 15.563c-.21.21-.55.21-.76 0-.64-.64-2.47-1.08-4.166-1.08-1.69 0-3.52.44-4.16 1.08-.105.105-.243.158-.38.158-.138 0-.276-.053-.38-.158-.21-.21-.21-.55 0-.76.86-.86 2.98-1.4 4.92-1.4 1.94 0 4.06.54 4.92 1.4.216.21.216.55.006.76zm-1.14-3.33c-.7 0-1.27-.57-1.27-1.27s.57-1.27 1.27-1.27c.7 0 1.27.57 1.27 1.27s-.57 1.27-1.27 1.27zm-7.57 0c-.7 0-1.27-.57-1.27-1.27s.57-1.27 1.27-1.27c.7 0 1.27.57 1.27 1.27s-.57 1.27-1.27 1.27z"
												/>
											</svg>
										</div>

										<h4 class="text-2xl font-bold mb-4">Real-time Reddit Integration</h4>
										<p class="text-zinc-400 mb-8">
											Never miss a lead. Elio filters the noise and alerts you only when it matters.
										</p>

										<div class="flex flex-wrap justify-center gap-3">
											<div
												class="px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-700 text-sm font-medium text-zinc-300 flex items-center gap-2"
											>
												<Check class="w-4 h-4 text-orange-500" /> Real-time alerts
											</div>
											<div
												class="px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-700 text-sm font-medium text-zinc-300 flex items-center gap-2"
											>
												<Check class="w-4 h-4 text-orange-500" /> Context-aware
											</div>
											<div
												class="px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-700 text-sm font-medium text-zinc-300 flex items-center gap-2"
											>
												<Check class="w-4 h-4 text-orange-500" /> Spam filtering
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-6" use:animate={{ stagger: 0.2, y: 50 }}>
						<!-- Card 1: Competitor Gaps -->
						<div
							class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[400px] flex flex-col"
						>
							<div class="h-[70%] relative overflow-hidden bg-zinc-100">
								<img
									src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
									alt="Competitor Gaps"
									class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 grayscale group-hover:grayscale-0"
								/>
								<div
									class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
								></div>
								<div class="absolute bottom-6 left-6 right-6">
									<h3 class="text-xl font-bold text-white mb-2">Competitor Gaps</h3>
									<p
										class="text-zinc-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
									>
										Finds comments of people frustrated by your competitors.
									</p>
								</div>
							</div>
							<div class="h-[30%] p-6 flex items-center justify-between bg-white">
								<div>
									<div class="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">
										Opportunity
									</div>
									<div class="text-zinc-900 font-medium">Frustration Detected</div>
								</div>
								<div
									class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"
								>
									<Search class="w-5 h-5" />
								</div>
							</div>
						</div>

						<!-- Card 2: Active Leads -->
						<div
							class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[400px] flex flex-col md:mt-12"
						>
							<div class="h-[70%] relative overflow-hidden bg-zinc-100">
								<img
									src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
									alt="Active Leads"
									class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 grayscale group-hover:grayscale-0"
								/>
								<div
									class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
								></div>
								<div class="absolute bottom-6 left-6 right-6">
									<h3 class="text-xl font-bold text-white mb-2">Active Leads</h3>
									<p
										class="text-zinc-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
									>
										Identifies users actively seeking help in your domain.
									</p>
								</div>
							</div>
							<div class="h-[30%] p-6 flex items-center justify-between bg-white">
								<div>
									<div class="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">
										Leads
									</div>
									<div class="text-zinc-900 font-medium">Solution Seekers</div>
								</div>
								<div
									class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"
								>
									<Zap class="w-5 h-5" />
								</div>
							</div>
						</div>

						<!-- Card 3: Competitor Watch -->
						<div
							class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[400px] flex flex-col"
						>
							<div class="h-[70%] relative overflow-hidden bg-zinc-100">
								<img
									src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
									alt="Competitor Watch"
									class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 grayscale group-hover:grayscale-0"
								/>
								<div
									class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
								></div>
								<div class="absolute bottom-6 left-6 right-6">
									<h3 class="text-xl font-bold text-white mb-2">Competitor Watch</h3>
									<p
										class="text-zinc-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
									>
										Track exactly what your competitors are doing on Reddit.
									</p>
								</div>
							</div>
							<div class="h-[30%] p-6 flex items-center justify-between bg-white">
								<div>
									<div class="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">
										Intel
									</div>
									<div class="text-zinc-900 font-medium">Strategy Revealed</div>
								</div>
								<div
									class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"
								>
									<TrendingUp class="w-5 h-5" />
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
