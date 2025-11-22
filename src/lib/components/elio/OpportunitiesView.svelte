<!-- src/lib/components/elio/OpportunitiesView.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	import {
		ArrowUpRight,
		MessageCircle,
		FileText,
		AlertCircle,
		Flame,
		Loader2
	} from 'lucide-svelte';

	export let filteredOpportunities;
	export let selectedOpportunity;

	const dispatch = createEventDispatcher();

	// Frustration level colors and icons
	const frustrationStyles = {
		neutral: {
			bg: 'bg-zinc-100',
			text: 'text-zinc-700',
			border: 'border-zinc-200',
			icon: '😐',
			priority: 1
		},
		mild: {
			bg: 'bg-yellow-100',
			text: 'text-yellow-800',
			border: 'border-yellow-200',
			icon: '😕',
			priority: 2
		},
		frustrated: {
			bg: 'bg-zinc-100',
			text: 'text-zinc-800',
			border: 'border-zinc-300',
			icon: '😤',
			priority: 3
		},
		desperate: {
			bg: 'bg-zinc-900',
			text: 'text-white',
			border: 'border-zinc-900',
			icon: '😫',
			priority: 4
		}
	};

	function getFrustrationStyle(level) {
		return frustrationStyles[level] || frustrationStyles.neutral;
	}

	// Sort by frustration level and relevance
	$: sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
		const priorityDiff =
			getFrustrationStyle(b.frustration_level).priority -
			getFrustrationStyle(a.frustration_level).priority;
		if (priorityDiff !== 0) return priorityDiff;
		return b.relevance_score - a.relevance_score;
	});
</script>

<div class="flex flex-col gap-8">
	<!-- Opportunities List -->
	<div class="w-full space-y-3">
		{#if sortedOpportunities.length === 0}
			<div class="text-center py-16 bg-zinc-50 rounded-[2rem] border border-zinc-200/60">
				<AlertCircle class="w-16 h-16 text-zinc-300 mx-auto mb-4" />
				<p class="text-zinc-900 font-medium mb-2 text-lg">No opportunities yet</p>
				<p class="text-sm text-zinc-500">Click "Scan Opportunities" to find discussions</p>
			</div>
		{:else}
			<!-- Stats Overview -->
			<div class="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm mb-6">
				<div class="grid grid-cols-2 gap-8">
					<div class="text-center border-r border-zinc-100 last:border-0">
						<p class="text-3xl font-bold text-zinc-900 tracking-tight">
							{sortedOpportunities.length}
						</p>
						<p class="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">
							Total Found
						</p>
					</div>
					<div class="text-center">
						<p class="text-3xl font-bold text-zinc-900 tracking-tight">
							{sortedOpportunities.filter(
								(o) => o.frustration_level === 'desperate' || o.frustration_level === 'frustrated'
							).length}
						</p>
						<p class="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">
							High Priority
						</p>
					</div>
				</div>
			</div>

			<div class="flex overflow-x-auto gap-4 pb-4 custom-scrollbar snap-x">
				{#each sortedOpportunities as opp}
					{@const frustStyle = getFrustrationStyle(opp.frustration_level)}
					<button
						on:click={() => (selectedOpportunity = opp)}
						class="text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group h-full flex flex-col min-w-[320px] max-w-[320px] snap-center {selectedOpportunity?.id ===
						opp.id
							? 'bg-zinc-900 border-zinc-900 shadow-xl shadow-zinc-900/20 ring-1 ring-zinc-700'
							: 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-lg hover:-translate-y-1'} {opp.is_responded
							? 'opacity-60'
							: ''}"
					>
						<div class="flex items-start justify-between mb-3 gap-2 w-full">
							<div class="flex items-center gap-2 flex-wrap flex-1">
								<!-- Type Badge -->
								<span
									class="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-zinc-200 text-zinc-800 rounded-full font-semibold border border-zinc-300"
								>
									{#if opp.is_comment}
										<MessageCircle class="w-3 h-3" />
										Comment
									{:else}
										<FileText class="w-3 h-3" />
										Post
									{/if}
								</span>

								<!-- Subreddit -->
								<span
									class="text-xs px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold border border-blue-200"
								>
									r/{opp.subreddit}
								</span>

								<!-- Frustration Level -->
								<span
									class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold border {frustStyle.bg} {frustStyle.text} {frustStyle.border}"
								>
									<span>{frustStyle.icon}</span>
									{opp.frustration_level}
								</span>

								<!-- Responded Badge -->
								{#if opp.is_responded}
									<span
										class="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-800 font-semibold border border-green-200"
									>
										✓ Responded
									</span>
								{/if}
							</div>

							<!-- Relevance Score -->
							<div class="flex-shrink-0">
								<div class="text-center">
									<div
										class="font-bold text-lg {selectedOpportunity?.id === opp.id
											? 'text-white'
											: opp.relevance_score >= 85
												? 'text-zinc-900'
												: opp.relevance_score >= 70
													? 'text-zinc-700'
													: 'text-zinc-500'}"
									>
										{Math.round(opp.relevance_score)}%
									</div>
								</div>
							</div>
						</div>

						<!-- Title (or parent post title for comments) -->
						<h3
							class="font-semibold text-sm mb-2 line-clamp-2 {selectedOpportunity?.id === opp.id
								? 'text-white'
								: 'text-zinc-900'}"
						>
							{opp.is_comment && opp.parent_post_title ? `Re: ${opp.parent_post_title}` : opp.title}
						</h3>

						<!-- Content Preview -->
						{#if opp.content}
							<p
								class="text-xs mb-3 line-clamp-2 leading-relaxed flex-1 {selectedOpportunity?.id ===
								opp.id
									? 'text-zinc-300'
									: 'text-zinc-600'}"
							>
								{opp.content}
							</p>
						{/if}

						<!-- Bottom Metadata -->
						<div
							class="flex items-center justify-between text-xs mt-auto pt-3 border-t {selectedOpportunity?.id ===
							opp.id
								? 'border-zinc-700 text-zinc-400'
								: 'border-zinc-100 text-zinc-500'}"
						>
							<div class="flex items-center gap-3">
								<span class="flex items-center gap-1">
									<span>↑</span>
									{opp.score}
								</span>
								{#if !opp.is_comment}
									<span class="flex items-center gap-1">
										<MessageCircle class="w-3 h-3" />
										{opp.num_comments}
									</span>
								{/if}
							</div>
							<span class="text-zinc-900 font-semibold text-xs px-2 py-0.5 bg-zinc-100 rounded">
								{opp.opportunity_type.replace(/_/g, ' ')}
							</span>
						</div>
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Selected Opportunity Detail -->
	<div class="w-full min-h-[600px]">
		{#if selectedOpportunity}
			{@const frustStyle = getFrustrationStyle(selectedOpportunity.frustration_level)}
			<div
				class="bg-white rounded-[2rem] border border-zinc-200/60 overflow-hidden h-full flex flex-col shadow-xl shadow-zinc-200/40"
			>
				<!-- Header -->
				<div class="p-8 border-b border-zinc-100 bg-white relative overflow-hidden">
					<div class="absolute inset-0 bg-gradient-to-b from-zinc-50/50 to-transparent"></div>
					<div class="relative z-10">
						<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
							<div class="flex-1">
								<!-- Title -->
								<h2 class="text-lg sm:text-xl font-bold text-zinc-900 mb-2">
									{selectedOpportunity.is_comment && selectedOpportunity.parent_post_title
										? `Comment on: ${selectedOpportunity.parent_post_title}`
										: selectedOpportunity.title}
								</h2>

								<!-- Badges Row -->
								<div class="flex flex-wrap gap-2 mb-3">
									<!-- Type -->
									<span
										class="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-zinc-700 text-white rounded-full font-semibold"
									>
										{#if selectedOpportunity.is_comment}
											<MessageCircle class="w-3 h-3" />
											Comment
										{:else}
											<FileText class="w-3 h-3" />
											Post
										{/if}
									</span>

									<!-- Frustration -->
									<span
										class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold border {frustStyle.bg} {frustStyle.text} {frustStyle.border}"
									>
										<span class="text-sm">{frustStyle.icon}</span>
										{selectedOpportunity.frustration_level}
										{#if selectedOpportunity.frustration_level === 'desperate'}
											<Flame class="w-3 h-3" />
										{/if}
									</span>

									<!-- Relevance -->
									<span
										class="text-xs px-2.5 py-1 rounded-full font-semibold {selectedOpportunity.relevance_score >=
										85
											? 'bg-zinc-100 text-zinc-900 border border-zinc-200'
											: 'bg-zinc-50 text-zinc-700 border border-zinc-200'}"
									>
										{Math.round(selectedOpportunity.relevance_score)}% Match
									</span>
								</div>

								<!-- Link -->
								<a
									href={selectedOpportunity.url}
									target="_blank"
									rel="noopener noreferrer"
									class="text-sm text-zinc-500 hover:text-zinc-900 inline-flex items-center gap-1 font-medium"
								>
									View on Reddit <ArrowUpRight class="w-3 h-3" />
								</a>
							</div>

							<!-- Action Buttons -->
							<div class="flex gap-3 flex-shrink-0">
								<button
									on:click={() =>
										dispatch('updateOpportunity', {
											id: selectedOpportunity.id,
											updates: { is_responded: true }
										})}
									class="text-sm px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl transition-all duration-300 whitespace-nowrap font-medium shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30"
								>
									✓ Mark Responded
								</button>
								<button
									on:click={() =>
										dispatch('updateOpportunity', {
											id: selectedOpportunity.id,
											updates: { is_dismissed: true }
										})}
									class="text-sm px-5 py-2.5 bg-white border-2 border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 rounded-xl transition-all duration-300 whitespace-nowrap font-medium"
								>
									× Dismiss
								</button>
							</div>
						</div>

						<!-- Content -->
						{#if selectedOpportunity.content}
							<div
								class="mt-6 p-6 bg-zinc-50 rounded-2xl border border-zinc-100 max-h-[400px] overflow-y-auto custom-scrollbar"
							>
								<p class="text-sm whitespace-pre-wrap leading-relaxed text-zinc-600">
									{selectedOpportunity.content}
								</p>
							</div>
						{/if}

						<!-- Why This Matches -->
						{#if selectedOpportunity.match_reasoning}
							<div class="mt-6 p-5 bg-violet-50/50 rounded-2xl border border-violet-100">
								<h3
									class="text-xs font-bold text-violet-900 mb-2 flex items-center gap-2 uppercase tracking-wider"
								>
									<AlertCircle class="w-4 h-4" />
									Why This Matches
								</h3>
								<p class="text-sm text-zinc-700 leading-relaxed">
									{selectedOpportunity.match_reasoning}
								</p>
							</div>
						{/if}

						<!-- Key Points -->
						{#if selectedOpportunity.key_points && selectedOpportunity.key_points.length > 0}
							<div class="mt-4">
								<h3 class="text-xs font-bold text-zinc-700 mb-2">Key Discussion Points:</h3>
								<ul class="space-y-1.5">
									{#each selectedOpportunity.key_points as point}
										<li class="text-sm text-zinc-700 flex items-start">
											<span class="text-zinc-400 mr-2 flex-shrink-0 font-bold">•</span>
											<span>{point}</span>
										</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Suggested Response -->
			<div class="p-4 sm:p-6 flex-1 overflow-y-auto custom-scrollbar">
				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
					<h3 class="text-sm font-bold text-zinc-900">Suggested Response</h3>
					<button
						on:click={() =>
							dispatch('copyResponse', { text: selectedOpportunity.suggested_response })}
						class="text-sm px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl transition-all duration-300 self-start sm:self-auto font-medium shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30"
					>
						Copy Response
					</button>
				</div>

				<div class="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
					<p class="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed font-medium">
						{selectedOpportunity.suggested_response}
					</p>
				</div>

				<!-- Metadata Footer -->
				<div
					class="mt-4 pt-4 border-t-2 border-zinc-200 flex items-center justify-between text-xs text-zinc-500"
				>
					<div class="flex items-center gap-4">
						<span class="flex items-center gap-1">
							<span>↑</span>
							{selectedOpportunity.score} upvotes
						</span>
						{#if !selectedOpportunity.is_comment}
							<span class="flex items-center gap-1">
								<MessageCircle class="w-3 h-3" />
								{selectedOpportunity.num_comments} comments
							</span>
						{/if}
						<span>by u/{selectedOpportunity.author}</span>
					</div>
					<span class="text-zinc-600 font-medium">
						{new Date(selectedOpportunity.created_utc * 1000).toLocaleDateString()}
					</span>
				</div>
			</div>
		{:else}
			<div
				class="bg-zinc-50 rounded-[2rem] border border-zinc-200/60 h-full flex items-center justify-center min-h-[400px]"
			>
				<div class="text-center py-16">
					<div
						class="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6"
					>
						<AlertCircle class="w-8 h-8 text-zinc-400" />
					</div>
					<p class="text-zinc-900 font-medium text-lg mb-2">Select an opportunity</p>
					<p class="text-sm text-zinc-500">Click on any card from the list to view details</p>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.custom-scrollbar::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.05);
		border-radius: 4px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: rgba(0, 0, 0, 0.3);
	}
</style>
