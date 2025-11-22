<script lang="ts">
	import { page } from '$app/stores';
	import Tabs from '$lib/components/nai/Tabs.svelte';
	import Overview from '$lib/components/nai/Overview.svelte';
	import Keywords from '$lib/components/nai/Keywords.svelte';
	import Outlines from '$lib/components/nai/Outlines.svelte';
	import Content from '$lib/components/nai/Content.svelte';
	import Settings from '$lib/components/nai/Settings.svelte';

	export let data: any;

	let activeTab: string = 'overview';
	let isAutopilotEnabled: boolean = false;

	let projectId = data.projectId;

	function toggleAutopilot() {
		isAutopilotEnabled = !isAutopilotEnabled;
		console.log(`Autopilot ${isAutopilotEnabled ? 'enabled' : 'disabled'}`);
	}
</script>

<div class="min-h-screen bg-white text-gray-900">
	<div class="overflow-x-auto scrollbar-hide">
		<Tabs {activeTab} on:tabChange={(e) => (activeTab = e.detail)} />
	</div>
	<div class="px-4 py-4 sm:px-8 sm:py-8">
		{#if activeTab === 'overview'}
			<Overview {projectId} />
		{:else if activeTab === 'keywords'}
			<Keywords {projectId} />
		{:else if activeTab === 'outlines'}
			<Outlines {projectId} />
		{:else if activeTab === 'content'}
			<Content {projectId} />
		{:else if activeTab === 'settings'}
			<Settings {isAutopilotEnabled} {toggleAutopilot} />
		{/if}
	</div>
</div>

<style>
	/* Hide scrollbar for webkit browsers */
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	/* Ensure smooth scrolling on mobile */
	.scrollbar-hide {
		-webkit-overflow-scrolling: touch;
	}
</style>
