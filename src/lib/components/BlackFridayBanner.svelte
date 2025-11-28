<script lang="ts">
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';

	let isVisible = false;
	let bannerRef: HTMLDivElement | null = null;

	onMount(() => {
		if (bannerRef) {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						isVisible = true;
						observer.unobserve(bannerRef!);
					}
				},
				{ threshold: 0.1 }
			);
			observer.observe(bannerRef);
			return () => observer.disconnect();
		}
	});
</script>

<div
	bind:this={bannerRef}
	class="w-full py-2 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden"
>
	{#if isVisible}
		<div in:blur={{ delay: 0, duration: 400, amount: 3 }} class="relative z-10">
			<!-- Background Glow -->
			<div
				class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 blur-2xl pointer-events-none"
			></div>

			<div class="max-w-7xl mx-auto px-4 relative z-10">
				<div
					class="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left"
				>
					<div class="flex items-center gap-2">
						<svg
							class="w-5 h-5 text-orange-400 animate-pulse"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
							/>
						</svg>
						<span class="text-sm font-bold text-orange-400 uppercase tracking-wider"
							>Black Friday</span
						>
					</div>
					<span class="text-white font-bold text-lg">🎉 40% OFF Everything!</span>
					<div
						class="flex items-center gap-2 bg-zinc-800/80 px-4 py-1.5 rounded-lg border border-zinc-700"
					>
						<span class="text-xs text-zinc-400">Code:</span>
						<code class="text-sm font-mono font-bold text-orange-400 tracking-wider"
							>684G4GK4N2</code
						>
					</div>
					<a
						href="#pricing"
						class="text-sm text-white hover:text-orange-400 transition-colors underline underline-offset-4"
					>
						View Deals →
					</a>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
