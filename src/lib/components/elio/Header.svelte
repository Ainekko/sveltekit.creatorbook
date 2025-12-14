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
	export let deepScourStatus = null;
	export let checkingDeepScour = false;

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

			<button
				on:click={() => dispatch('deepScour')}
				disabled={scanning || !redditConnected}
				class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl transition-all duration-300 font-medium text-sm disabled:opacity-50 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 tracking-wide flex items-center gap-2"
				title={!redditConnected ? 'Connect Reddit account first' : 'Deep Scour (Pro Only)'}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-sparkles"
					><path
						d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
					/></svg
				>
				Deep Scour
			</button>
		</div>

		{#if deepScourStatus}
			<div class="flex justify-end mt-2">
				<div
					class="flex items-center gap-2 text-xs font-medium bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg shadow-sm"
				>
					<span class="text-zinc-500">Deep Scour Status:</span>
					<span
						class:text-orange-600={deepScourStatus.status === 'pending' ||
							deepScourStatus.status === 'processing'}
						class:text-emerald-600={deepScourStatus.status === 'completed'}
						class:text-red-600={deepScourStatus.status === 'failed'}
						class="uppercase tracking-wider"
					>
						{deepScourStatus.status}
					</span>

					<button
						on:click={() => dispatch('checkDeepScourStatus')}
						disabled={checkingDeepScour}
						class="ml-1 p-1 hover:bg-zinc-200 rounded-md transition-colors text-zinc-400 hover:text-zinc-600 disabled:opacity-50"
						title="Refresh status"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class:animate-spin={checkingDeepScour}
						>
							<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
							<path d="M3 3v5h5" />
							<path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
							<path d="M16 21h5v-5" />
						</svg>
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>
