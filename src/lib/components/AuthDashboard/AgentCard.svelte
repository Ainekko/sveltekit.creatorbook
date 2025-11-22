<!-- AgentCard.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';

	export let agent;
	export let agentId;
	export let agentStyle;
	export let projectId: string;

	const routeMap = {
		seo: 'nai',
		// twitter: 'rio',
		reddit: 'elio'
	};

	function gotoAgent() {
		const routeName = routeMap[agentId];
		if (routeName) {
			goto(`/projects/${projectId}/${routeName}`);
		} else {
			console.error(`No route found for agentId: ${agentId}`);
		}
	}
</script>

<div class="p-6">
	<!-- Header -->
	<div class="flex items-start justify-between mb-6">
		<div>
			<h2 class="text-xl font-semibold text-zinc-900">{agent.name}</h2>
			<p class="text-sm text-zinc-600">{agent.desc}</p>
		</div>
		<div class="text-right text-sm">
			<div class="text-zinc-500">Last scan: {agent.lastScan}</div>
			<span class="inline-block px-2 py-1 mt-1 bg-zinc-100 text-zinc-700 rounded-full capitalize">
				{agent.status}
			</span>
		</div>
	</div>

	<!-- Metrics Grid -->
	<div class="grid grid-cols-2 gap-4 mb-8">
		{#each agent.metrics as metric}
			<div class="bg-zinc-50 rounded-lg p-4 text-center border border-zinc-200">
				<div class="text-xl font-bold text-zinc-900">{metric.value}</div>
				<div class="text-xs text-zinc-500">{metric.label}</div>
				<div class="text-xs {metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}">
					{metric.trend}
				</div>
			</div>
		{/each}
	</div>

	<!-- Activity & Insights Split -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
		<!-- Activity -->
		<div>
			<h3 class="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wide">Activity</h3>
			<div class="space-y-3">
				{#each agent.activity as act}
					<div class="bg-zinc-50 rounded-lg p-3 border border-zinc-200">
						<div class="flex justify-between text-sm">
							<span class="font-medium text-zinc-900">{act.action}</span>
							<span class="text-zinc-500">{act.time}</span>
						</div>
						<p class="text-xs text-zinc-600">{act.detail}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Insights -->
		<div>
			<h3 class="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wide">Insights</h3>
			<div class="space-y-3">
				{#each agent.insights as insight}
					<div class="bg-zinc-50 rounded-lg p-3 border border-zinc-200">
						<div class="flex justify-between mb-1">
							<h4 class="text-sm font-medium text-zinc-900">{insight.title}</h4>
							<span
								class="text-xs px-2 py-1 rounded-full {insight.priority === 'high'
									? 'bg-red-100 text-red-600'
									: 'bg-yellow-100 text-yellow-600'}"
							>
								{insight.priority}
							</span>
						</div>
						<p class="text-xs text-zinc-600">{insight.description || insight.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Content Preview -->
	<div>
		<h3 class="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wide">Ready Content</h3>
		<div class="space-y-3">
			{#each agent.content.slice(0, 3) as item}
				<div class="bg-zinc-50 rounded-lg p-4 border border-zinc-200">
					{#if agentId === 'seo'}
						<h4 class="text-sm font-medium text-zinc-900 mb-1">{item.title}</h4>
						<p class="text-xs text-zinc-600 line-clamp-2">{item.meta_description}</p>
						<!-- {:else if agentId === 'twitter'}
              <p class="text-sm text-zinc-900 mb-1">{item.content}</p>
              <div class="text-xs text-blue-600"># {item.hashtags?.join(' #') || 'AI'}</div> -->
					{:else}
						<h4 class="text-sm font-medium text-zinc-900 mb-1">{item.title}</h4>
						<p class="text-xs text-zinc-600 line-clamp-2">{item.content}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Go To Button -->
	<button
		on:click={gotoAgent}
		class="mt-6 w-full py-3 bg-gradient-to-r {agentStyle.gradient} text-white rounded-lg hover:opacity-90 transition border border-zinc-700"
	>
		Go to {agent.name}
	</button>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
