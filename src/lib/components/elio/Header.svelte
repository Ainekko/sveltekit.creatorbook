<!-- src/lib/components/elio/Header.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	import { LogIn, LogOut } from 'lucide-svelte';

	export let projectData;
	export let redditConnected;
	export let redditUsername;
	export let redditConnecting;
	export let scanning;
	export let view;
	export let opportunities;

	const dispatch = createEventDispatcher();
</script>

<div class="mb-6 sm:mb-8">
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
		<div>
			<h1 class="text-2xl sm:text-3xl font-bold text-zinc-900 flex items-center gap-2">
				<img
					src="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png"
					alt="Reddit"
					class="w-8 h-8"
				/>
				Elio Reddit Assistant
			</h1>
			<p class="text-sm sm:text-base text-zinc-600 mt-1">
				{#if projectData}
					Managing Reddit presence for {projectData.business_name || 'your project'}
				{/if}
			</p>
		</div>

		<div class="flex gap-2 sm:gap-3 flex-wrap">
			<!-- Reddit Auth Button -->
			{#if redditConnected}
				<div
					class="flex items-center gap-2 px-5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl shadow-sm"
				>
					<div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
					<span class="text-sm font-medium text-zinc-700">u/{redditUsername}</span>
					<button
						on:click={() => dispatch('disconnectReddit')}
						class="ml-2 p-1.5 hover:bg-zinc-200 rounded-lg transition-colors text-zinc-400 hover:text-zinc-600"
						title="Disconnect"
					>
						<LogOut class="w-4 h-4" />
					</button>
				</div>
			{:else}
				<button
					on:click={() => dispatch('connectReddit')}
					disabled={redditConnecting}
					class="px-6 py-3 bg-white border-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900 rounded-xl transition-all duration-300 font-medium text-sm disabled:opacity-50 flex items-center gap-2 shadow-sm hover:shadow-md"
				>
					<LogIn class="w-4 h-4" />
					{redditConnecting ? 'Connecting...' : 'Connect Reddit'}
				</button>
			{/if}

			{#if view === 'opportunities' && opportunities.some((o) => o.is_dismissed)}
				<button
					on:click={() => dispatch('clearDismissed')}
					class="px-5 py-3 bg-white border-2 border-zinc-200 text-zinc-600 rounded-xl hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900 transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md"
				>
					Clear Dismissed
				</button>
			{/if}
			<button
				on:click={() => dispatch('scanOpportunities')}
				disabled={scanning || !redditConnected}
				class="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl transition-all duration-300 font-medium text-sm disabled:opacity-50 shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30 tracking-wide"
				title={!redditConnected ? 'Connect Reddit account first' : ''}
			>
				{#if scanning}
					Scanning...
				{:else}
					Scan Opportunities
				{/if}
			</button>
		</div>
	</div>
</div>
