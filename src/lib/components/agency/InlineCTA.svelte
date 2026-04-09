<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	export let text = 'Ready to build something real?';
	export let buttonText = 'Book a free discovery call';
</script>

<div class="py-12 bg-white relative z-10 w-full flex justify-center">
	<div
		class="bg-zinc-50 border border-zinc-200 rounded-[2rem] px-8 py-10 md:px-12 w-full max-w-4xl text-center shadow-sm relative overflow-hidden group"
	>
		<!-- Subtle animation glows -->
		<div
			class="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"
		></div>
		<div
			class="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"
		></div>

		<h3 class="text-2xl font-bold text-zinc-900 mb-6 tracking-tight relative z-10">
			{text}
		</h3>

		<button
			data-cal-link="hafid-ahlaqach-nigixz/30min"
			data-cal-namespace="30min"
			data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
			class="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] relative z-10"
		>
			{buttonText}
			<ArrowRight class="w-4 h-4 text-white/70" />
		</button>
	</div>
</div>
