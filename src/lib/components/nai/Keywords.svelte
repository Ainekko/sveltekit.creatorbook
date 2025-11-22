<!-- src/lib/components/nai/Keywords.svelte -->

<script lang="ts">
	import {
		RefreshCw,
		TrendingUp,
		TrendingDown,
		Minus,
		Sparkles,
		ChevronDown,
		Globe,
		Check,
		Loader2
	} from 'lucide-svelte';
	import { contentStore } from '$lib/components/nai/stores';
	import type {
		Keyword,
		CompetitorRanking,
		CompetitionLevel,
		TrendType
	} from '$lib/components/nai/types';
	import type { UUID } from 'crypto';
	import { API_BASE_URL } from '$lib/config';
	import { fade, scale, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let projectId: string;

	// Subscribe to content store
	$: keywords = $contentStore.keywords as Keyword[];
	$: isLoading = $contentStore.keywordsLoading;
	$: competitorRankings = $contentStore.competitorRankings as Map<UUID, CompetitorRanking[]>;
	$: competitorsLoading = $contentStore.competitorsLoading;

	let selectedKeywordIds: UUID[] = [];
	let expandedKeywordId: UUID | null = null;
	let isGeneratingOutlines = false;
	let showProgressDialog = false;
	let currentStep = 0;

	const authToken = localStorage.getItem('token');
	const apiBaseUrl = API_BASE_URL;

	const progressSteps = [
		{ label: 'Analyzing Keywords', description: 'Processing your selected keywords' },
		{ label: 'Researching Topics', description: 'Finding relevant content ideas' },
		{ label: 'Building Structure', description: 'Creating outline frameworks' },
		{ label: 'Finalizing Outlines', description: 'Adding final touches' }
	];

	function getCompetitionColor(competition: CompetitionLevel): string {
		switch (competition) {
			case 'Low':
				return 'text-emerald-600 bg-emerald-100';
			case 'Medium':
				return 'text-yellow-600 bg-yellow-100';
			case 'High':
				return 'text-red-600 bg-red-100';
			default:
				return 'text-gray-600 bg-gray-100';
		}
	}

	function getTrendIcon(trend: TrendType) {
		switch (trend) {
			case 'Rising':
				return TrendingUp;
			case 'Declining':
				return TrendingDown;
			case 'Stable':
				return Minus;
			case 'New':
				return Sparkles;
			default:
				return Minus;
		}
	}

	function getTrendColor(trend: TrendType): string {
		switch (trend) {
			case 'Rising':
				return 'text-emerald-600';
			case 'Declining':
				return 'text-red-600';
			case 'Stable':
				return 'text-blue-600';
			case 'New':
				return 'text-purple-600';
			default:
				return 'text-gray-600';
		}
	}

	function getRankingColor(position: number): string {
		if (position === 1) return 'bg-yellow-50 border-l-4 border-yellow-400';
		if (position <= 3) return 'bg-orange-50 border-l-4 border-orange-400';
		if (position <= 10) return 'bg-blue-50 border-l-4 border-blue-400';
		return 'bg-gray-50 border-l-4 border-gray-400';
	}

	function getPositionBadgeStyle(position: number): string {
		if (position === 1) return 'bg-yellow-500 text-white';
		if (position <= 3) return 'bg-orange-500 text-white';
		if (position <= 10) return 'bg-blue-500 text-white';
		return 'bg-gray-500 text-white';
	}

	function getDomainName(url: string): string {
		try {
			const domain = new URL(url).hostname;
			return domain.replace('www.', '');
		} catch {
			return url;
		}
	}

	function toggleKeywordSelection(keywordId: UUID): void {
		if (selectedKeywordIds.includes(keywordId)) {
			selectedKeywordIds = selectedKeywordIds.filter((id) => id !== keywordId);
		} else {
			selectedKeywordIds = [...selectedKeywordIds, keywordId];
		}
	}

	function toggleSelectAll(): void {
		if (selectedKeywordIds.length === keywords.length) {
			selectedKeywordIds = [];
		} else {
			selectedKeywordIds = keywords.map((k) => k.id);
		}
	}

	async function toggleExpanded(keywordId: UUID): Promise<void> {
		if (expandedKeywordId === keywordId) {
			expandedKeywordId = null;
		} else {
			expandedKeywordId = keywordId;
			if (!competitorRankings.has(keywordId)) {
				await contentStore.loadCompetitorRankings(keywordId);
			}
		}
	}

	async function refreshKeywords(): Promise<void> {
		await contentStore.loadKeywords(projectId);
	}

	async function generateOutlines(): Promise<void> {
		if (selectedKeywordIds.length === 0) return;

		isGeneratingOutlines = true;
		showProgressDialog = true;
		currentStep = 0;

		// Simulate progress through steps
		const stepDuration = 15000; // 15 seconds per step
		const stepInterval = setInterval(() => {
			if (currentStep < progressSteps.length - 1) {
				currentStep++;
			}
		}, stepDuration);

		try {
			const response = await fetch(`${apiBaseUrl}/orion/api/generate_outlines/`, {
				method: 'POST',
				headers: {
					Authorization: `Token ${authToken}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					project_id: projectId,
					keyword_ids: selectedKeywordIds
				})
			});

			clearInterval(stepInterval);

			if (response.ok) {
				currentStep = progressSteps.length - 1;
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Show completion state
				await contentStore.loadOutlines(projectId);
				selectedKeywordIds = [];
				showProgressDialog = false;
				currentStep = 0;
			} else {
				console.error('Failed to generate outlines');
				showProgressDialog = false;
				currentStep = 0;
			}
		} catch (error) {
			console.error('Error generating outlines:', error);
			clearInterval(stepInterval);
			showProgressDialog = false;
			currentStep = 0;
		} finally {
			isGeneratingOutlines = false;
		}
	}

	$: isAllSelected = keywords.length > 0 && selectedKeywordIds.length === keywords.length;
	$: isSomeSelected = selectedKeywordIds.length > 0 && selectedKeywordIds.length < keywords.length;
</script>

<!-- Progress Dialog -->
{#if showProgressDialog}
	<div
		class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
		transition:fade={{ duration: 200 }}
	>
		<div
			class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden pulse-glow"
			transition:scale={{ duration: 300, easing: cubicOut, start: 0.95 }}
		>
			<!-- Header with gradient -->
			<div class="bg-zinc-900 p-6 text-white">
				<div class="flex items-center gap-3 mb-2">
					<div
						class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shimmer"
					>
						<Sparkles size={20} class="text-white" />
					</div>
					<div>
						<h3 class="text-lg font-semibold">Generating Outlines</h3>
						<p class="text-sm text-white/80">
							Creating {selectedKeywordIds.length} outline{selectedKeywordIds.length !== 1
								? 's'
								: ''}
						</p>
					</div>
				</div>
			</div>

			<!-- Progress Steps -->
			<div class="p-6 space-y-4">
				{#each progressSteps as step, index}
					<div class="flex items-start gap-3" transition:fly={{ y: 20, delay: index * 100 }}>
						<div class="flex-shrink-0 mt-0.5">
							{#if index < currentStep}
								<div
									class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
									transition:scale={{ duration: 200 }}
								>
									<Check size={14} class="text-white" />
								</div>
							{:else if index === currentStep}
								<div class="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center">
									<Loader2 size={14} class="text-white animate-spin" />
								</div>
							{:else}
								<div class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
									<div class="w-2 h-2 rounded-full bg-gray-400"></div>
								</div>
							{/if}
						</div>
						<div class="flex-1">
							<p
								class="text-sm font-medium text-zinc-900 {index === currentStep
									? 'text-zinc-900'
									: index < currentStep
										? 'text-emerald-600'
										: 'text-zinc-400'}"
							>
								{step.label}
							</p>
							<p class="text-xs text-gray-500 mt-0.5">
								{step.description}
							</p>
						</div>
					</div>
				{/each}

				<!-- Progress Bar -->
				<div class="mt-6">
					<div class="h-2 bg-gray-200 rounded-full overflow-hidden">
						<div
							class="h-full bg-zinc-900 transition-all duration-500 ease-out shimmer"
							style="width: {((currentStep + 1) / progressSteps.length) * 100}%"
						></div>
					</div>
					<p class="text-xs text-gray-500 text-center mt-2">
						Step {currentStep + 1} of {progressSteps.length}
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<div class="space-y-6 w-full">
	<div class="flex justify-between items-center">
		<div>
			<h2 class="text-2xl font-semibold text-zinc-900 tracking-tight">Keyword Research</h2>
			<p class="text-sm text-gray-500 mt-1">
				{keywords.length} Tracked keywords
			</p>
		</div>
	</div>

	{#if keywords.length === 0 && !isLoading}
		<div
			class="bg-white rounded-[2rem] border border-zinc-200/60 p-12 text-center shadow-xl shadow-zinc-200/40"
		>
			<div class="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
				<RefreshCw class="w-8 h-8 text-zinc-400" />
			</div>
			<h3 class="text-xl font-bold text-zinc-900 mb-2">No Keywords Yet</h3>
			<p class="text-zinc-500 mb-6 max-w-md mx-auto">
				Run the keyword research workflow to generate keywords for your project.
			</p>
		</div>
	{:else}
		<div
			class="bg-white rounded-[2rem] border border-zinc-200/60 overflow-hidden shadow-xl shadow-zinc-200/40"
		>
			<div class="px-8 py-6 border-b border-zinc-100 bg-white">
				<div class="flex justify-between items-center">
					<div class="text-sm text-gray-600">
						{selectedKeywordIds.length} of {keywords.length} keywords selected
					</div>
					<button
						on:click={generateOutlines}
						disabled={selectedKeywordIds.length === 0 || isGeneratingOutlines}
						class="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 tracking-wide"
					>
						{#if isGeneratingOutlines}
							<Loader2 class="w-4 h-4 animate-spin" />
							Generating...
						{:else}
							Generate Outlines ({selectedKeywordIds.length})
						{/if}
					</button>
				</div>
			</div>

			<div class="divide-y divide-gray-200">
				{#each keywords as keyword (keyword.id)}
					<div class="border-b border-gray-200 last:border-b-0">
						<!-- Keyword Row -->
						<button
							on:click={() => toggleExpanded(keyword.id)}
							class="w-full px-8 py-5 hover:bg-zinc-50 transition-colors flex items-center justify-between group"
						>
							<div class="flex items-center gap-4 flex-1 text-left">
								<input
									type="checkbox"
									checked={selectedKeywordIds.includes(keyword.id)}
									on:change={() => toggleKeywordSelection(keyword.id)}
									on:click={(e) => e.stopPropagation()}
									class="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 w-5 h-5"
								/>
								<div class="flex-1">
									<div class="text-sm font-medium text-gray-900 mb-2">
										{keyword.keyword}
									</div>
									<div class="flex flex-wrap gap-3 items-center">
										<div class="text-xs text-gray-600">
											<span class="font-semibold"
												>{keyword.monthly_searches?.toLocaleString() || '—'}</span
											> searches/mo
										</div>
										<span
											class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCompetitionColor(keyword.competition)}`}
										>
											{keyword.competition}
										</span>
										<div class="text-xs text-gray-600">
											Difficulty: <span class="font-semibold"
												>{keyword.keyword_difficulty
													? keyword.keyword_difficulty.toFixed(1)
													: '—'}</span
											>
										</div>
										<div class="text-xs text-gray-600">
											CPC: <span class="font-semibold"
												>{keyword.cpc ? `$${keyword.cpc.toFixed(2)}` : '—'}</span
											>
										</div>
										<div
											class={`flex items-center gap-1 text-xs font-medium ${getTrendColor(keyword.trend)}`}
										>
											<svelte:component this={getTrendIcon(keyword.trend)} class="w-3.5 h-3.5" />
											{keyword.trend}
										</div>
									</div>
								</div>
							</div>
							<div class="transition-transform" class:rotate-180={expandedKeywordId === keyword.id}>
								<ChevronDown class="w-5 h-5 text-gray-400 flex-shrink-0" />
							</div>
						</button>

						<!-- Competitor Rankings Expansion -->
						{#if expandedKeywordId === keyword.id}
							<div class="border-t border-zinc-100 bg-zinc-50/50">
								{#if competitorsLoading}
									<div class="px-6 py-8 text-center">
										<div class="animate-spin h-5 w-5 text-gray-400 mx-auto mb-2"></div>
										<p class="text-sm text-gray-500">Loading competitor data...</p>
									</div>
								{:else if competitorRankings.has(keyword.id) && (competitorRankings.get(keyword.id) || []).length > 0}
									<div class="space-y-0">
										{#each competitorRankings.get(keyword.id) || [] as competitor (competitor.id)}
											<div
												class={`p-4 border-t border-gray-200 first:border-t-0 ${getRankingColor(competitor.position)}`}
											>
												<div class="flex items-start gap-3">
													<div
														class={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${getPositionBadgeStyle(competitor.position)}`}
													>
														#{competitor.position}
													</div>
													<div class="flex-1 min-w-0">
														<h4 class="text-sm font-semibold text-gray-900 mb-1">
															{competitor.title || competitor.domain}
														</h4>
														<p class="text-xs text-gray-600 mb-2 line-clamp-2">
															{competitor.snippet || 'No snippet available'}
														</p>
														{#if competitor.url}
															<a
																href={competitor.url}
																target="_blank"
																rel="noopener noreferrer"
																class="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
															>
																<Globe class="w-3 h-3" />
																{getDomainName(competitor.url)}
															</a>
														{/if}
													</div>
												</div>
											</div>
										{/each}
									</div>
								{:else}
									<div class="px-6 py-8 text-center">
										<p class="text-sm text-gray-500">No competitor data available</p>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>

			{#if keywords.length > 10}
				<div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
					<p class="text-xs text-gray-500 text-center">
						Showing {keywords.length} keywords
					</p>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	input[type='checkbox']:indeterminate {
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");
		background-color: currentColor;
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.shimmer {
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		background-size: 200% 100%;
		animation: shimmer 2s infinite;
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	.pulse-glow {
		animation: pulse-glow 2s ease-in-out infinite;
	}

	@keyframes pulse-glow {
		0%,
		100% {
			box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
		}
		50% {
			box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
		}
	}
</style>
