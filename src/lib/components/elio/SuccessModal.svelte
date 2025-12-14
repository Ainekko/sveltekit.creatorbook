<!-- src/lib/components/elio/SuccessModal.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	import { Check, ArrowRight } from 'lucide-svelte';
	import Modal from '$lib/components/ui/Modal.svelte';

	export let showSuccessModal;
	export let successMessage;

	const dispatch = createEventDispatcher();

	function closeSuccessModal() {
		dispatch('close');
	}

	function goToPostsView() {
		dispatch('goToPostsView');
	}
</script>

<Modal show={showSuccessModal} on:close={closeSuccessModal}>
	<div class="flex flex-col items-center text-center">
		<!-- Success Icon -->
		<div
			class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/20"
		>
			<Check class="w-10 h-10 text-white" />
		</div>

		<h2 class="text-3xl font-bold text-zinc-900 mb-3">
			{successMessage.includes('connected') ? 'Connected! 🎉' : 'Action Complete'}
		</h2>

		<p class="text-zinc-500 text-lg mb-8 leading-relaxed max-w-xs">
			{successMessage.replace('Posts Generated!', 'Response Drafted')}
		</p>

		<div class="flex flex-col gap-3 w-full">
			{#if !successMessage.includes('connected') && !successMessage.includes('Deep Scour started')}
				<button
					on:click={goToPostsView}
					class="w-full bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30 hover:-translate-y-0.5"
				>
					View Response <ArrowRight class="w-5 h-5" />
				</button>
			{/if}

			<button
				on:click={closeSuccessModal}
				class="w-full bg-white border-2 border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200"
			>
				{successMessage.includes('connected') ? 'Continue' : 'Close'}
			</button>
		</div>
	</div>
</Modal>
