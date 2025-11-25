<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Modal from '$lib/components/ui/Modal.svelte';

	const dispatch = createEventDispatcher();
	export let show = false;

	function close() {
		dispatch('close');
	}
</script>

<Modal {show} on:close={close}>
	<div class="flex flex-col">
		<h3 class="text-2xl font-bold text-zinc-900 mb-6">Schedule Tasks</h3>

		<div class="space-y-5">
			<div>
				<label class="block text-sm font-medium text-zinc-700 mb-2">Task Type</label>
				<select
					class="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-zinc-50"
				>
					<option>Generate Keywords</option>
					<option>Create Outlines</option>
					<option>Generate Blog Posts</option>
				</select>
			</div>

			<div>
				<label class="block text-sm font-medium text-zinc-700 mb-2">Frequency</label>
				<select
					class="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-zinc-50"
				>
					<option>Daily</option>
					<option>Every 2 days</option>
					<option>Weekly</option>
					<option>Monthly</option>
				</select>
			</div>

			<div>
				<label class="block text-sm font-medium text-zinc-700 mb-2">Start Time</label>
				<input
					type="datetime-local"
					class="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-zinc-50"
				/>
			</div>
		</div>

		<div class="flex justify-end space-x-3 mt-8">
			<button
				on:click={close}
				class="px-6 py-3 border border-zinc-200 rounded-xl text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors font-medium"
				>Cancel</button
			>
			<button
				on:click={close}
				class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors font-medium shadow-lg shadow-emerald-600/20"
				>Schedule</button
			>
		</div>
	</div>
</Modal>
