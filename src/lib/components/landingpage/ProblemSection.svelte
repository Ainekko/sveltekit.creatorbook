<script lang="ts">
	import { Check, X, Zap, Shield, Sparkles } from 'lucide-svelte';
	import { animate } from '$lib/actions/animate';
</script>

<div class="py-24 relative overflow-hidden bg-white">
	<!-- Background Elements -->
	<div
		class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"
	></div>

	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<!-- Header -->
		<div class="text-center mb-16 max-w-3xl mx-auto" use:animate={{ type: 'slide', y: 30 }}>
			<h2 class="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 leading-tight">
				Marketing Automation<br />
				<span class="text-zinc-500">Without the Headache</span>
			</h2>
			<p class="text-xl text-zinc-500 leading-relaxed">
				No more juggling credentials, wrestling with APIs, or debugging at 2 AM.<br />
				<span class="font-semibold text-zinc-700">Just simple, powerful automation that works.</span
				>
			</p>
		</div>

		<!-- Problem vs Solution Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20" use:animate={{ stagger: 0.2 }}>
			<!-- The Problem -->
			<div class="relative group">
				<div
					class="bg-white rounded-[2rem] p-8 border border-zinc-200 shadow-lg hover:shadow-xl transition-all duration-300"
				>
					<div class="flex items-center gap-3 mb-6">
						<div
							class="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center"
						>
							<X class="w-6 h-6 text-zinc-400" />
						</div>
						<h3 class="text-2xl font-bold text-zinc-900">Traditional Platforms</h3>
					</div>

					<div class="space-y-4">
						{#each ['Juggling 10+ different tools and logins', 'Wrestling with API keys and OAuth flows', 'Spending hours on "simple" automations', 'Debugging cryptic error messages at 2 AM', 'Paying for features you never use'] as problem}
							<div class="flex items-start gap-3 text-zinc-600">
								<div
									class="mt-0.5 w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0"
								>
									<X class="w-3 h-3 text-zinc-400" />
								</div>
								<span class="text-sm leading-relaxed">{problem}</span>
							</div>
						{/each}
					</div>

					<div class="mt-6 pt-6 border-t border-zinc-100">
						<p class="text-xs text-zinc-400 font-medium">Complexity that kills productivity</p>
					</div>
				</div>
			</div>

			<!-- The Solution -->
			<div class="relative group">
				<div
					class="bg-white rounded-[2rem] p-2 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
				>
					<!-- Gradient Border -->
					<div
						class="absolute inset-0 rounded-[2rem] p-[2px] bg-gradient-to-br from-blue-400 via-violet-500 to-purple-600"
					>
						<div class="bg-white rounded-[1.875rem] h-full w-full"></div>
					</div>

					<div class="relative z-10 bg-zinc-50/50 rounded-[1.75rem] p-8">
						<div class="flex items-center gap-3 mb-6">
							<div
								class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 flex items-center justify-center"
							>
								<Sparkles class="w-6 h-6 text-violet-600" />
							</div>
							<h3 class="text-2xl font-bold text-zinc-900">FlowJoy's Approach</h3>
						</div>

						<div class="space-y-4">
							{#each ['One login. Two agents. Infinite possibilities.', 'Zero API wrestling—we handle the complexity', 'Launch campaigns in minutes, not hours', 'Clear insights, not cryptic errors', 'Pay for results, not unused features'] as solution}
								<div class="flex items-start gap-3 text-zinc-700">
									<div
										class="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center flex-shrink-0"
									>
										<Check class="w-3 h-3 text-violet-600" />
									</div>
									<span class="text-sm leading-relaxed font-medium">{solution}</span>
								</div>
							{/each}
						</div>

						<div class="mt-6 pt-6 border-t border-zinc-200">
							<p class="text-xs text-violet-600 font-bold">✨ Simplicity that scales with you</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Agent Highlights - Redesigned -->
		<div class="relative mb-20">
			<!-- Connecting Line (Desktop) -->
			<div class="absolute top-[100px] left-0 right-0 h-1 bg-zinc-200 rounded-full hidden md:block">
				<div
					class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-300 to-transparent opacity-50"
				></div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				<!-- Nai Card -->
				<div class="group relative">
					<div
						class="bg-white rounded-[2rem] p-2 border border-zinc-200 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative z-10"
					>
						<div class="bg-zinc-50/50 rounded-[1.5rem] p-8 h-full flex flex-col">
							<!-- Metallic Header Node -->
							<div
								class="w-16 h-16 mx-auto -mt-12 mb-6 rounded-full bg-gradient-to-b from-white to-zinc-100 border border-zinc-200 shadow-lg flex items-center justify-center relative z-20 group-hover:scale-110 transition-transform duration-500"
							>
								<Zap class="w-8 h-8 text-blue-500" />
							</div>

							<div class="text-center mb-4">
								<h4 class="text-xl font-bold text-zinc-900 mb-1">Nai</h4>
								<p class="text-xs font-medium text-blue-600 uppercase tracking-wider mb-4">
									SEO Content Engine
								</p>
							</div>

							<p class="text-sm text-zinc-600 leading-relaxed text-center">
								Finds winning keywords, analyzes competitors, and writes SEO-optimized articles that
								actually rank. Auto-publishes while you sleep.
							</p>
						</div>
					</div>
				</div>

				<!-- Elio Card -->
				<div class="group relative">
					<div
						class="bg-white rounded-[2rem] p-2 border border-zinc-200 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative z-10"
					>
						<div class="bg-zinc-50/50 rounded-[1.5rem] p-8 h-full flex flex-col">
							<!-- Metallic Header Node -->
							<div
								class="w-16 h-16 mx-auto -mt-12 mb-6 rounded-full bg-gradient-to-b from-white to-zinc-100 border border-zinc-200 shadow-lg flex items-center justify-center relative z-20 group-hover:scale-110 transition-transform duration-500"
							>
								<Shield class="w-8 h-8 text-orange-500" />
							</div>

							<div class="text-center mb-4">
								<h4 class="text-xl font-bold text-zinc-900 mb-1">Elio</h4>
								<p class="text-xs font-medium text-orange-600 uppercase tracking-wider mb-4">
									Reddit Lead Hunter
								</p>
							</div>

							<p class="text-sm text-zinc-600 leading-relaxed text-center">
								Monitors Reddit for high-intent leads, detects competitor churn, and drafts
								authentic replies that build trust and drive clicks.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
