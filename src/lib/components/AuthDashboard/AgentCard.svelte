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
	<!-- Header -->
	<div class="flex items-start justify-between mb-8">
		<div>
			<h2 class="text-2xl font-semibold text-zinc-900 tracking-tight">{agent.name}</h2>
			<p class="text-sm text-zinc-500 mt-1">{agent.desc}</p>
		</div>
		<div class="text-right">
			<div class="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Status</div>
			<span
				class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize
        {agent.status === 'active'
					? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
					: agent.status === 'monitoring'
						? 'bg-amber-50 text-amber-700 border border-amber-100'
						: 'bg-zinc-100 text-zinc-600 border border-zinc-200'}"
			>
				{agent.status}
			</span>
			<div class="text-xs text-zinc-400 mt-2">Scanned {agent.lastScan}</div>
		</div>
	</div>

	<!-- Metrics Grid -->
	<div class="grid grid-cols-3 gap-4 mb-8">
		{#each agent.metrics as metric}
			<div
				class="bg-zinc-50 rounded-2xl p-5 border border-zinc-100 hover:border-zinc-200 transition-colors"
			>
				<div class="text-2xl font-bold text-zinc-900 tracking-tight mb-1">{metric.value}</div>
				<div class="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
					{metric.label}
				</div>
				<div
					class="text-xs font-medium inline-flex items-center gap-1
          {metric.trend.startsWith('+') ? 'text-emerald-600' : 'text-zinc-400'}"
				>
					{metric.trend}
					{#if metric.trend.startsWith('+')}
						<span class="text-[10px] text-emerald-600/70">vs last week</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Activity & Insights Split -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
		<!-- Activity -->
		<div>
			<h3 class="text-xs font-semibold text-zinc-400 mb-4 uppercase tracking-wider px-1">
				Recent Activity
			</h3>
			<div class="space-y-3">
				{#each agent.activity as act}
					<div
						class="group bg-white rounded-xl p-4 border border-zinc-100 hover:border-zinc-200 hover:shadow-sm transition-all"
					>
						<div class="flex justify-between items-start mb-1">
							<span class="text-sm font-medium text-zinc-900">{act.action}</span>
							<span
								class="text-[10px] font-medium text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded-full"
								>{act.time}</span
							>
						</div>
						<p class="text-xs text-zinc-500 leading-relaxed">{act.detail}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Insights -->
		<div>
			<h3 class="text-xs font-semibold text-zinc-400 mb-4 uppercase tracking-wider px-1">
				Key Insights
			</h3>
			<div class="space-y-3">
				{#each agent.insights as insight}
					<div
						class="bg-gradient-to-br from-zinc-50 to-white rounded-xl p-4 border border-zinc-100 relative overflow-hidden group hover:border-zinc-200 transition-all"
					>
						<div class="flex justify-between items-start mb-2 relative z-10">
							<h4 class="text-sm font-semibold text-zinc-900">{insight.title}</h4>
							<span
								class="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider
                {insight.priority === 'high'
									? 'bg-rose-50 text-rose-600'
									: 'bg-amber-50 text-amber-600'}"
							>
								{insight.priority}
							</span>
						</div>
						<p class="text-xs text-zinc-500 relative z-10">
							{insight.description || insight.desc}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Content Preview -->
	<div>
		<h3 class="text-xs font-semibold text-zinc-400 mb-4 uppercase tracking-wider px-1">
			Ready Content
		</h3>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			{#each agent.content.slice(0, 3) as item}
				<div
					class="bg-white rounded-xl p-5 border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all group cursor-pointer"
				>
					{#if agentId === 'seo'}
						<h4
							class="text-sm font-semibold text-zinc-900 mb-2 group-hover:text-violet-600 transition-colors"
						>
							{item.title}
						</h4>
						<p class="text-xs text-zinc-500 line-clamp-3 leading-relaxed">
							{item.meta_description}
						</p>
					{:else}
						<h4 class="text-sm font-semibold text-zinc-900 mb-2">{item.title}</h4>
						<p class="text-xs text-zinc-500 line-clamp-3 leading-relaxed">{item.content}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Go To Button -->
	<button
		on:click={gotoAgent}
		class="mt-8 w-full py-4 bg-zinc-900 text-white rounded-xl font-medium shadow-lg shadow-zinc-900/10 hover:shadow-xl hover:shadow-zinc-900/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
	>
		<span>Go to {agent.name} Dashboard</span>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M17 8l4 4m0 0l-4 4m4-4H3"
			/>
		</svg>
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
