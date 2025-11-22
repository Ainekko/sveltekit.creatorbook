<!-- src/lib/components/elio/ViewTabs.svelte -->
<script>
	import { FileText, Target, User, Settings } from 'lucide-svelte';

	export let view;
	export let blogPosts = [];
	export let filteredOpportunities = [];
	export let pendingPosts = [];
	export let approvedPosts = [];

	const tabs = [
		{
			id: 'profile',
			label: 'Profile',
			icon: User,
			count: null
		},
		{
			id: 'opportunities',
			label: 'Opportunities',
			icon: Target,
			count: filteredOpportunities.length
		},
		{
			id: 'content-posts',
			label: 'Content & Posts',
			icon: FileText,
			count: blogPosts.length + pendingPosts.length + approvedPosts.length
		},
		{
			id: 'config',
			label: 'Configuration',
			icon: Settings,
			count: null
		}
	];
</script>

<div class="mb-8">
	<div
		class="flex p-1.5 bg-zinc-100 rounded-xl border border-zinc-200 w-full sm:w-auto inline-flex overflow-x-auto scrollbar-hide"
	>
		{#each tabs as tab}
			<button
				on:click={() => (view = tab.id)}
				class="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap relative {view ===
				tab.id
					? 'bg-white text-zinc-900 shadow-sm'
					: 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50'}"
			>
				<svelte:component this={tab.icon} class="w-4 h-4" />
				<span>{tab.label}</span>
				{#if tab.count !== null}
					<span
						class="ml-1.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold {view === tab.id
							? 'bg-zinc-100 text-zinc-900'
							: 'bg-zinc-200 text-zinc-600'}"
					>
						{tab.count}
					</span>
				{/if}
			</button>
		{/each}
	</div>
</div>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
