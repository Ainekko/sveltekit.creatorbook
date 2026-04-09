<script lang="ts">
	import { ArrowRight, Sparkles } from 'lucide-svelte';
</script>

<section class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-[Poppins]">
	<div class="bg-zinc-900 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden shadow-2xl group">
		<!-- Background Glows -->
		<div
			class="absolute -top-24 -right-24 w-96 h-96 bg-violet-600/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-violet-500/30 transition-all duration-700"
		></div>
		<div
			class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/30 transition-all duration-700"
		></div>

		<div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
			<div class="max-w-2xl">
				<div
					class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium mb-6"
				>
					<Sparkles class="w-4 h-4 text-violet-400" />
					Try our internal tools
				</div>
				<h2 class="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
					Prefer to do it yourself? <br />
					<span class="text-white/50">Use the same SaaS products we built for our agency.</span>
				</h2>
			</div>

			<div class="flex-shrink-0 w-full md:w-auto">
				<a
					href="/software"
					class="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-white text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-zinc-100 transition-all duration-200 hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)]"
				>
					Explore our software
					<ArrowRight class="w-5 h-5" />
				</a>
			</div>
		</div>
	</div>
</section>
