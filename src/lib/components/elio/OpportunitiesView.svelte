<!-- src/lib/components/elio/OpportunitiesView.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	import { ArrowUpRight, MessageCircle, FileText, AlertCircle, Flame } from 'lucide-svelte';

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

<div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
	<!-- Opportunities List -->
	<div
		class="lg:col-span-5 space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar"
	>
		{#if sortedOpportunities.length === 0}
			<div
				class="text-center py-16 bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-xl shadow-md border-2 border-dashed border-zinc-300"
			>
				<AlertCircle class="w-16 h-16 text-zinc-400 mx-auto mb-4" />
				<p class="text-zinc-600 font-medium mb-2">No opportunities yet</p>
				<p class="text-sm text-zinc-500">Click "Scan Opportunities" to find discussions</p>
			</div>
		{:else}
			<!-- Stats Overview -->
			<div
				class="bg-gradient-to-r from-zinc-50 to-zinc-100 rounded-xl p-4 border-2 border-zinc-200 mb-4"
			>
				<div class="grid grid-cols-2 gap-3">
					<div class="text-center">
						<p class="text-2xl font-bold text-zinc-900">{sortedOpportunities.length}</p>
						<p class="text-xs text-zinc-600 font-medium">Total Found</p>
					</div>
					<div class="text-center">
						<p class="text-2xl font-bold text-zinc-900">
							{sortedOpportunities.filter(
								(o) => o.frustration_level === 'desperate' || o.frustration_level === 'frustrated'
							).length}
						</p>
						<p class="text-xs text-zinc-600 font-medium">High Priority</p>
					</div>
				</div>
			</div>

			{#each sortedOpportunities as opp}
				{@const frustStyle = getFrustrationStyle(opp.frustration_level)}
				<button
					on:click={() => (selectedOpportunity = opp)}
					class="w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden group {selectedOpportunity?.id ===
					opp.id
						? 'bg-gradient-to-r from-zinc-800 to-zinc-900 border-zinc-700 ring-1 ring-zinc-700 shadow-lg'
						: 'bg-gradient-to-br from-white to-zinc-50 border-zinc-200 hover:border-zinc-300 hover:shadow-md'} {opp.is_responded
						? 'opacity-60'
						: ''}"
				>
					<div class="flex items-start justify-between mb-3 gap-2">
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
									class="font-bold text-lg {opp.relevance_score >= 85
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
					<h3 class="text-zinc-900 font-semibold text-sm mb-2 line-clamp-2">
						{opp.is_comment && opp.parent_post_title ? `Re: ${opp.parent_post_title}` : opp.title}
					</h3>

					<!-- Content Preview -->
					{#if opp.content}
						<p class="text-zinc-600 text-xs mb-3 line-clamp-2 leading-relaxed">{opp.content}</p>
					{/if}

					<!-- Bottom Metadata -->
					<div class="flex items-center justify-between text-xs text-zinc-500">
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
		{/if}
	</div>

	<!-- Selected Opportunity Detail -->
	<div class="lg:col-span-7 h-[calc(100vh-250px)]">
		{#if selectedOpportunity}
			{@const frustStyle = getFrustrationStyle(selectedOpportunity.frustration_level)}
			<div
				class="bg-white rounded-xl border-2 border-zinc-200 overflow-hidden h-full flex flex-col shadow-2xl"
			>
				<!-- Header -->
				<div
					class="p-6 border-b border-zinc-200 bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-50 relative overflow-hidden"
				>
					<div class="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
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
							<div class="flex gap-2 flex-shrink-0">
								<button
									on:click={() =>
										dispatch('updateOpportunity', {
											id: selectedOpportunity.id,
											updates: { is_responded: true }
										})}
									class="text-xs px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-colors whitespace-nowrap font-semibold shadow-md"
								>
									✓ Mark Responded
								</button>
								<button
									on:click={() =>
										dispatch('updateOpportunity', {
											id: selectedOpportunity.id,
											updates: { is_dismissed: true }
										})}
									class="text-xs px-4 py-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-lg transition-colors whitespace-nowrap font-semibold shadow-md"
								>
									× Dismiss
								</button>
							</div>
						</div>

						<!-- Content -->
						{#if selectedOpportunity.content}
							<div class="mt-4 p-4 bg-white rounded-lg border-2 border-zinc-200">
								<p class="text-sm text-zinc-800 whitespace-pre-wrap leading-relaxed">
									{selectedOpportunity.content}
								</p>
							</div>
						{/if}

						<!-- Why This Matches -->
						{#if selectedOpportunity.match_reasoning}
							<div class="mt-4 p-4 bg-zinc-50 rounded-lg border-2 border-zinc-200">
								<h3 class="text-xs font-bold text-zinc-900 mb-1.5 flex items-center gap-1.5">
									<AlertCircle class="w-3.5 h-3.5" />
									Why This Matches
								</h3>
								<p class="text-sm text-zinc-700">
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
						class="text-xs px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-all self-start sm:self-auto font-semibold shadow-md"
					>
						Copy Response
					</button>
				</div>

				<div
					class="bg-gradient-to-br from-zinc-50 to-white rounded-xl p-4 sm:p-5 border-2 border-zinc-200 shadow-inner"
				>
					<p class="text-sm text-zinc-800 whitespace-pre-wrap leading-relaxed">
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
				class="bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-xl border-2 border-dashed border-zinc-300 h-full flex items-center justify-center shadow-md"
			>
				<div class="text-center py-16">
					<AlertCircle class="w-16 h-16 text-zinc-400 mx-auto mb-4" />
					<p class="text-zinc-600 font-medium">Select an opportunity to view details</p>
					<p class="text-sm text-zinc-500 mt-2">Click on any opportunity from the list</p>
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
