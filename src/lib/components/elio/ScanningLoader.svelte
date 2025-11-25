<script>
	import { onMount, onDestroy } from 'svelte';
	import { Search, Radio, Shield, Zap } from 'lucide-svelte';

	export let status = 'scanning'; // scanning, analyzing, filtering

	let steps = [
		{ id: 'scanning', text: 'Scanning Subreddits...', icon: Search },
		{ id: 'analyzing', text: 'Analyzing Sentiment...', icon: Radio },
		{ id: 'filtering', text: 'Filtering Opportunities...', icon: Zap }
	];

	let currentStepIndex = 0;
	let interval;

	onMount(() => {
		interval = setInterval(() => {
			currentStepIndex = (currentStepIndex + 1) % steps.length;
		}, 2000);
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<div class="flex flex-col items-center justify-center py-20 w-full">
	<!-- Radar Animation Container -->
	<div class="relative w-32 h-32 mb-8">
		<!-- Pulse Rings -->
		<div class="absolute inset-0 rounded-full bg-orange-500/20 animate-ping"></div>
		<div class="absolute inset-0 rounded-full bg-orange-500/10 animate-pulse delay-75"></div>
		
		<!-- Center Circle -->
		<div class="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center border border-orange-100 z-10">
			<div class="relative w-full h-full rounded-full overflow-hidden">
				<!-- Radar Sweep -->
				<div class="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent w-1/2 h-full origin-right animate-[spin_2s_linear_infinite]"></div>
				
				<!-- Icon -->
				<div class="absolute inset-0 flex items-center justify-center">
					<Zap class="w-10 h-10 text-orange-500" />
				</div>
			</div>
		</div>
	</div>

	<!-- Status Text -->
	<div class="text-center space-y-2">
		<h3 class="text-xl font-bold text-zinc-900">
			Finding Opportunities
		</h3>
		<div class="h-6 overflow-hidden relative">
			{#key currentStepIndex}
				<p 
					class="text-zinc-500 text-sm font-medium flex items-center justify-center gap-2 animate-[slideUp_0.3s_ease-out]"
				>
					<svelte:component this={steps[currentStepIndex].icon} class="w-4 h-4" />
					{steps[currentStepIndex].text}
				</p>
			{/key}
		</div>
	</div>
</div>

<style>
	@keyframes slideUp {
		from {
			transform: translateY(100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
