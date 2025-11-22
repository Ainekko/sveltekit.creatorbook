<script>
	import { animate } from '$lib/actions/animate';
	import { goto } from '$app/navigation';
	import { Rocket, Users, Zap, Sparkles, ArrowRight } from 'lucide-svelte';
</script>

<!-- Perfect For Section -->
<div class="text-center mt-20 pt-12 border-t border-zinc-200 relative">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-12" use:animate={{ type: 'slide', y: 20 }}>
			<h2 class="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">Built for Modern Creators</h2>
			<p class="text-lg text-zinc-500 max-w-2xl mx-auto">
				Whether you're validating ideas, scaling growth, or building your brand—our AI agents handle
				the heavy lifting.
			</p>
		</div>

		<!-- Bento Grid with White Cards -->
		<div
			class="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10"
			use:animate={{ stagger: 0.15, y: 40 }}
		>
			<!-- Card 1: Founders - Spans 2 columns -->
			<div
				class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 md:col-span-2 h-[280px] flex flex-col shadow-lg"
			>
				<div class="relative z-10 p-6 flex flex-col h-full">
					<div class="flex items-start justify-between mb-4">
						<div
							class="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center"
						>
							<Rocket class="w-6 h-6 text-violet-600" />
						</div>
						<span
							class="text-xs font-bold text-violet-600 uppercase tracking-wider px-3 py-1 bg-violet-50 rounded-full border border-violet-100"
							>Founders</span
						>
					</div>
					<h3 class="text-2xl font-bold text-zinc-900 mb-3">Validate Ideas Fast</h3>
					<p class="text-zinc-600 text-sm leading-relaxed mb-auto">
						Launch projects in minutes, not months. Test multiple ideas simultaneously with AI
						agents handling SEO, social, and community building. See what resonates before
						committing resources.
					</p>
					<div class="flex items-center gap-2 text-xs text-zinc-500 mt-4">
						<div class="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
						<span>Ship faster, learn quicker</span>
					</div>
				</div>
			</div>

			<!-- Card 2: Growth Teams -->
			<div
				class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[280px] flex flex-col shadow-lg"
			>
				<div class="relative z-10 p-6 flex flex-col h-full">
					<div
						class="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4"
					>
						<Users class="w-6 h-6 text-blue-600" />
					</div>
					<h3 class="text-xl font-bold text-zinc-900 mb-3">Scale Without Headcount</h3>
					<p class="text-zinc-600 text-sm leading-relaxed mb-auto">
						Automate content, SEO, and social campaigns. Your team focuses on strategy while AI
						handles execution.
					</p>
					<span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Growth</span>
				</div>
			</div>

			<!-- Card 3: Solo Creators -->
			<div
				class="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-[280px] flex flex-col shadow-lg"
			>
				<div class="relative z-10 p-6 flex flex-col h-full">
					<div
						class="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4"
					>
						<Sparkles class="w-6 h-6 text-emerald-600" />
					</div>
					<h3 class="text-xl font-bold text-zinc-900 mb-3">Create Like a Team</h3>
					<p class="text-zinc-600 text-sm leading-relaxed mb-auto">
						Produce content, build community, and grow your brand—all without hiring. AI agents
						amplify your impact.
					</p>
					<span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">Impact</span>
				</div>
			</div>

			<!-- Card 4: Agencies with Gradient Border -->
			<div
				class="group relative bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 h-[280px] flex flex-col shadow-lg"
			>
				<!-- Gradient Border -->
				<div
					class="absolute inset-0 bg-gradient-to-br from-orange-500 via-pink-500 to-violet-500 rounded-3xl p-[2px]"
				>
					<div class="bg-white rounded-3xl h-full w-full"></div>
				</div>
				<div class="relative z-10 p-6 flex flex-col h-full">
					<div
						class="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4"
					>
						<Zap class="w-6 h-6 text-orange-600" />
					</div>
					<h3 class="text-xl font-bold text-zinc-900 mb-3">10x Client Output</h3>
					<p class="text-zinc-600 text-sm leading-relaxed mb-auto">
						Deliver more value per client. Automate repetitive tasks and scale your agency without
						proportional costs.
					</p>
					<span class="text-xs font-bold text-orange-600 uppercase tracking-wider">Scale</span>
				</div>
			</div>

			<!-- Card 5: CTA Button -->
			<div
				on:click={() => goto('/signup')}
				on:keydown={(e) => e.key === 'Enter' && goto('/signup')}
				role="button"
				tabindex="0"
				class="group relative bg-zinc-900 rounded-3xl border border-zinc-700 overflow-hidden hover:shadow-2xl hover:shadow-zinc-500/20 transition-all duration-300 h-[280px] flex flex-col items-center justify-center cursor-pointer hover:border-zinc-500 shadow-lg"
			>
				<div class="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900"></div>
				<div class="relative z-10 text-center">
					<h3 class="text-2xl font-bold text-white mb-3">Ready to Start?</h3>
					<p class="text-zinc-400 text-sm mb-6 px-6">Join creators automating their growth</p>
					<div
						class="w-14 h-14 rounded-full bg-white text-zinc-900 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg"
					>
						<ArrowRight class="w-7 h-7" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
