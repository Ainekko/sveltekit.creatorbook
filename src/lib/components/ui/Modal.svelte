<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { X } from 'lucide-svelte';

	export let show = false;
	export let maxWidth = 'max-w-md';
	export let closeOnOutsideClick = true;

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}

	function handleKeydown(e) {
		if (e.key === 'Escape' && show) {
			close();
		}
	}

	// Lock body scroll when modal is open
	$: if (typeof document !== 'undefined') {
		if (show) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if show}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
		transition:fade={{ duration: 200 }}
	>
		<!-- Backdrop -->
		<div
			class="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity"
			on:click={closeOnOutsideClick ? close : null}
			role="button"
			tabindex="-1"
		></div>

		<!-- Modal Panel -->
		<div
			class="relative w-full {maxWidth} bg-white rounded-[2rem] shadow-2xl border border-zinc-200 overflow-hidden transform transition-all"
			transition:scale={{ start: 0.95, duration: 200 }}
			role="dialog"
			aria-modal="true"
		>
			<!-- Close Button -->
			<button
				on:click={close}
				class="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors z-10"
			>
				<X class="w-5 h-5" />
			</button>

			<!-- Content -->
			<div class="p-8">
				<slot />
			</div>
		</div>
	</div>
{/if}
