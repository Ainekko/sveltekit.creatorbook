<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import {
		TrendingUp,
		Target,
		BarChart3,
		Globe,
		Briefcase,
		Users,
		RefreshCw,
		ExternalLink
	} from 'lucide-svelte';
	import { ArrowUpRight } from 'lucide-svelte';
	import * as api from '$lib/components/elio/api';
	import { API_BASE_URL } from '$lib/config';

	export let projectId;
	export let filteredOpportunities;
	export let approvedPosts;

	const dispatch = createEventDispatcher();
	const authToken = localStorage.getItem('token');

	let loading = true;
	let projectData = null;
	let analytics = null;
	let error = null;
	let refreshing = false;

	let opportunitiesScroll;
	let postsScroll;
	let topScroll;

	async function loadProjectProfile() {
		loading = true;
		error = null;

		try {
			const data = await api.fetchProjectData(projectId, authToken, API_BASE_URL);
			projectData = data.project;

			// Calculate analytics from opportunities
			analytics = calculateAnalytics();
		} catch (err) {
			console.error('Failed to load project:', err);
			error = err.message;

			// Fallback
			projectData = {
				business_name: 'Your Business',
				url: '',
				description: 'No description available',
				target_audience: 'General audience',
				industry: 'Technology',
				tone: 'Professional'
			};

			analytics = {
				total_opportunities: 0,
				active_opportunities: 0,
				responded_opportunities: 0,
				avg_relevance: 0,
				top_subreddits: [],
				best_opportunities: [],
				response_rate: 0
			};
		} finally {
			loading = false;
		}
	}

	function calculateAnalytics() {
		const total = filteredOpportunities.length;
		const active = filteredOpportunities.filter((o) => !o.is_dismissed && !o.is_responded).length;
		const responded = filteredOpportunities.filter((o) => o.is_responded).length;

		const avgRelevance =
			total > 0 ? filteredOpportunities.reduce((sum, o) => sum + o.relevance_score, 0) / total : 0;

		// Top subreddits by count
		const subredditCounts = {};
		filteredOpportunities.forEach((o) => {
			subredditCounts[o.subreddit] = (subredditCounts[o.subreddit] || 0) + 1;
		});

		const topSubreddits = Object.entries(subredditCounts)
			.map(([subreddit, count]) => ({ subreddit, count }))
			.sort((a, b) => b.count - a.count)
			.slice(0, 5);

		// Best opportunities by relevance
		const bestOpportunities = [...filteredOpportunities]
			.filter((o) => !o.is_dismissed)
			.sort((a, b) => b.relevance_score - a.relevance_score)
			.slice(0, 5);

		return {
			total_opportunities: total,
			active_opportunities: active,
			responded_opportunities: responded,
			avg_relevance: Math.round(avgRelevance * 10) / 10,
			top_subreddits: topSubreddits,
			best_opportunities: bestOpportunities,
			response_rate: total > 0 ? Math.round((responded / total) * 100) : 0
		};
	}

	async function handleRefresh() {
		refreshing = true;
		await loadProjectProfile();
		refreshing = false;
	}

	onMount(() => {
		loadProjectProfile();
	});

	// Update analytics when opportunities change
	$: if (filteredOpportunities) {
		analytics = calculateAnalytics();
	}

	function scrollOpportunitiesLeft() {
		opportunitiesScroll?.scrollBy({ left: -400, behavior: 'smooth' });
	}
	function scrollOpportunitiesRight() {
		opportunitiesScroll?.scrollBy({ left: 400, behavior: 'smooth' });
	}
	function scrollPostsLeft() {
		postsScroll?.scrollBy({ left: -400, behavior: 'smooth' });
	}
	function scrollPostsRight() {
		postsScroll?.scrollBy({ left: 400, behavior: 'smooth' });
	}
	function scrollTopLeft() {
		topScroll?.scrollBy({ left: -300, behavior: 'smooth' });
	}
	function scrollTopRight() {
		topScroll?.scrollBy({ left: 300, behavior: 'smooth' });
	}

	function getInitials(name) {
		if (!name) return '?';
		return name
			.split(' ')
			.map((word) => word[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}
</script>

{#if loading}
	<div class="text-center py-12">
		<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto"></div>
		<p class="text-zinc-500 mt-4">Loading project profile...</p>
	</div>
{:else if error}
	<div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
		<p class="text-red-800 font-medium mb-2">Failed to load project</p>
		<p class="text-sm text-red-600 mb-4">{error}</p>
		<button
			on:click={handleRefresh}
			class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
		>
			Try Again
		</button>
	</div>
{:else}
	<div class="space-y-6">
		<!-- Header with Refresh Button -->
		<div class="flex items-center justify-between">
			<h2 class="text-3xl font-bold text-zinc-900 tracking-tight">Project Profile & Analytics</h2>
			<button
				on:click={handleRefresh}
				disabled={refreshing}
				class="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-zinc-200 text-zinc-700 rounded-xl hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md font-medium text-sm"
			>
				<RefreshCw class="w-4 h-4 {refreshing ? 'animate-spin' : ''}" />
				Refresh
			</button>
		</div>

		<!-- Project Card -->
		<div
			class="bg-white rounded-[2rem] border border-zinc-200/60 p-8 shadow-xl shadow-zinc-200/40 relative overflow-hidden"
		>
			<div
				class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-zinc-100/80 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"
			></div>
			<h3 class="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
				<Briefcase class="w-5 h-5 text-zinc-900" />
				Project Overview
			</h3>
			<div class="flex items-start gap-4 mb-6">
				<!-- Project Avatar/Icon -->
				<div
					class="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 text-2xl font-bold"
				>
					{getInitials(projectData.business_name)}
				</div>

				<div class="flex-1">
					<h4 class="font-bold text-xl text-zinc-900">
						{projectData.business_name || 'Unnamed Project'}
					</h4>
					{#if projectData.url}
						<a
							href={projectData.url}
							target="_blank"
							rel="noopener noreferrer"
							class="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-1 mt-1 transition-colors"
						>
							<Globe class="w-3 h-3" />
							{projectData.url}
							<ExternalLink class="w-3 h-3" />
						</a>
					{/if}
					<p class="text-sm text-zinc-600 mt-2">
						{projectData.description || 'No description available'}
					</p>

					<div class="flex flex-wrap gap-2 mt-3">
						{#if projectData.industry}
							<span
								class="inline-block text-xs px-2 py-1 bg-zinc-100 text-zinc-700 rounded font-medium border border-zinc-200"
							>
								{projectData.industry}
							</span>
						{/if}
						{#if projectData.tone}
							<span
								class="inline-block text-xs px-2 py-1 bg-zinc-100 text-zinc-700 rounded font-medium border border-zinc-200"
							>
								{projectData.tone}
							</span>
						{/if}
					</div>
				</div>
			</div>

			<!-- Target Audience Section -->
			{#if projectData.target_audience}
				<div class="mt-4 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
					<div class="flex items-center gap-2 mb-2">
						<Users class="w-4 h-4 text-zinc-500" />
						<p class="text-sm font-semibold text-zinc-900">Target Audience</p>
					</div>
					<p class="text-sm text-zinc-600">{projectData.target_audience}</p>
				</div>
			{/if}
		</div>

		<!-- Analytics Stats Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
			<div
				class="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
			>
				<div class="flex items-center gap-3 mb-2">
					<div
						class="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center border border-zinc-200"
					>
						<Target class="w-5 h-5 text-zinc-900" />
					</div>
					<div>
						<p class="text-sm text-zinc-500 font-medium">Total Opportunities</p>
						<p class="text-2xl font-bold text-zinc-900">{analytics.total_opportunities}</p>
					</div>
				</div>
				<p class="text-xs text-zinc-400 mt-2">
					{analytics.active_opportunities} active • {analytics.responded_opportunities} responded
				</p>
			</div>

			<div
				class="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
			>
				<div class="flex items-center gap-3 mb-2">
					<div
						class="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center border border-zinc-200"
					>
						<BarChart3 class="w-5 h-5 text-zinc-600" />
					</div>
					<div>
						<p class="text-sm text-zinc-500 font-medium">Avg Relevance</p>
						<p class="text-2xl font-bold text-zinc-900">{analytics.avg_relevance}%</p>
					</div>
				</div>
			</div>

			<div
				class="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
			>
				<div class="flex items-center gap-3 mb-2">
					<div
						class="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center border border-zinc-200"
					>
						<TrendingUp class="w-5 h-5 text-zinc-600" />
					</div>
					<div>
						<p class="text-sm text-zinc-500 font-medium">Response Rate</p>
						<p class="text-2xl font-bold text-zinc-900">{analytics.response_rate}%</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Best Opportunities -->
		{#if analytics.best_opportunities.length > 0}
			<div
				class="bg-white rounded-[2rem] border border-zinc-200/60 p-8 shadow-xl shadow-zinc-200/40"
			>
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-semibold text-zinc-900 flex items-center gap-2">
						<Target class="w-5 h-5 text-zinc-900" />
						Top Opportunities by Relevance
					</h3>
					<div class="flex gap-2">
						<button
							on:click={scrollOpportunitiesLeft}
							class="bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-600 p-2 rounded-md transition-colors shadow-sm"
						>
							&lt;
						</button>
						<button
							on:click={scrollOpportunitiesRight}
							class="bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-600 p-2 rounded-md transition-colors shadow-sm"
						>
							&gt;
						</button>
					</div>
				</div>
				<div
					class="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
					bind:this={opportunitiesScroll}
				>
					{#each analytics.best_opportunities as opp}
						<a
							href={opp.url}
							target="_blank"
							rel="noopener noreferrer"
							class="bg-white rounded-2xl p-5 border border-zinc-200 min-w-[300px] snap-center shadow-sm hover:shadow-lg transition-all duration-300 hover:border-zinc-300 hover:-translate-y-1 group"
						>
							<div class="flex items-start justify-between mb-2">
								<span
									class="text-xs px-2 py-1 bg-zinc-100 text-zinc-600 rounded font-medium border border-zinc-200"
								>
									r/{opp.subreddit}
								</span>
								<span class="font-semibold text-zinc-900 text-sm">
									{Math.round(opp.relevance_score)}%
								</span>
							</div>
							<h4
								class="font-semibold text-zinc-900 text-sm mb-2 line-clamp-2 group-hover:text-zinc-700 transition-colors"
							>
								{opp.title}
							</h4>
							<div
								class="flex items-center gap-1 text-xs text-zinc-400 font-medium mt-2 group-hover:text-zinc-600 transition-colors"
							>
								View on Reddit <ArrowUpRight class="w-3 h-3" />
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Top Subreddits -->
		{#if analytics.top_subreddits.length > 0}
			<div
				class="bg-white rounded-[2rem] border border-zinc-200/60 p-8 shadow-xl shadow-zinc-200/40"
			>
				<div class="flex items-center justify-between mb-4">
					<div class="flex items-center gap-2">
						<Target class="w-5 h-5 text-zinc-500" />
						<h3 class="text-lg font-semibold text-zinc-900">
							Top Subreddits for {projectData.business_name}
						</h3>
					</div>
					<div class="flex gap-2">
						<button
							on:click={scrollTopLeft}
							class="bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-600 p-2 rounded-md transition-colors shadow-sm"
						>
							&lt;
						</button>
						<button
							on:click={scrollTopRight}
							class="bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-600 p-2 rounded-md transition-colors shadow-sm"
						>
							&gt;
						</button>
					</div>
				</div>
				<div
					class="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
					bind:this={topScroll}
				>
					{#each analytics.top_subreddits as item, idx}
						<div
							class="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-200 min-w-[250px] snap-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
						>
							<div class="flex items-center gap-3">
								<div
									class="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 text-sm font-bold"
								>
									{idx + 1}
								</div>
								<span class="font-medium text-zinc-900">r/{item.subreddit}</span>
							</div>
							<span class="font-bold text-zinc-900">{item.count} opps</span>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Approved Posts -->
		{#if approvedPosts.length > 0}
			<div
				class="bg-white rounded-[2rem] border border-zinc-200/60 p-8 shadow-xl shadow-zinc-200/40"
			>
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-semibold text-zinc-900">
						Reddit Posts for {projectData.business_name}
					</h3>
					<div class="flex gap-2">
						<button
							on:click={scrollPostsLeft}
							class="bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-600 p-2 rounded-md transition-colors shadow-sm"
						>
							&lt;
						</button>
						<button
							on:click={scrollPostsRight}
							class="bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-600 p-2 rounded-md transition-colors shadow-sm"
						>
							&gt;
						</button>
					</div>
				</div>

				<div
					class="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
					bind:this={postsScroll}
				>
					{#each approvedPosts as entry}
						<div
							class="border border-zinc-200 rounded-2xl p-5 hover:border-zinc-300 hover:shadow-lg transition-all duration-300 bg-white min-w-[350px] snap-center shadow-sm group hover:-translate-y-1"
						>
							<div class="flex items-start justify-between mb-3">
								<div class="flex-1">
									<h4
										class="font-semibold text-zinc-900 mb-1 group-hover:text-zinc-700 transition-colors"
									>
										{entry.post.title}
									</h4>
									<p class="text-sm text-zinc-600 line-clamp-2">{entry.post.content}</p>
								</div>
								<div class="text-right ml-4">
									{#if entry.post.posted}
										<div class="text-lg font-bold text-zinc-900">↑ {entry.post.karma}</div>
										<div class="text-xs text-zinc-500">💬 {entry.post.comments}</div>
									{:else}
										<span
											class="text-xs px-2 py-1 bg-zinc-100 text-zinc-600 rounded font-medium border border-zinc-200"
											>Ready</span
										>
									{/if}
								</div>
							</div>

							<div class="flex items-center gap-2 flex-wrap">
								{#each entry.post.suggested_subreddits as subreddit}
									<span
										class="text-xs px-2 py-1 bg-zinc-100 text-zinc-700 rounded font-medium border border-zinc-200"
									>
										r/{subreddit}
									</span>
								{/each}
							</div>

							{#if entry.post.url}
								<a
									href={entry.post.url}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 font-medium mt-3 transition-colors"
								>
									View on Reddit <ArrowUpRight class="w-3 h-3" />
								</a>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
