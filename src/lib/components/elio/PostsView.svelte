<!-- src/lib/components/elio/PostsView.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	import { Sparkles, Check, Copy } from 'lucide-svelte';

	export let pendingPosts;
	export let approvedPosts;
	export let copiedIndex;
	export let projectData;

	const dispatch = createEventDispatcher();
</script>

<div class="space-y-6">
	<!-- Pending Approval Section -->
	{#if pendingPosts.length > 0}
		<div
			class="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl border border-zinc-700 p-6 shadow-xl relative overflow-hidden"
		>
			<div
				class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-zinc-700/20 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"
			></div>
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-xl font-bold text-white flex items-center gap-2">
					<span class="w-2 h-2 bg-zinc-500 rounded-full animate-pulse"></span>
					Review & Approve
				</h2>
			</div>

			<div class="overflow-x-auto flex flex-row gap-8 pb-4 snap-x snap-mandatory scrollbar-hide">
				{#each pendingPosts as entry}
					<div class="space-y-4 min-w-[80vw] sm:min-w-[50vw] lg:min-w-[30vw] snap-center">
						<div class="flex items-center justify-between">
							<h3 class="font-semibold text-zinc-100">From: {entry.contentTitle}</h3>
							<span class="text-xs text-zinc-300"
								>{new Date(entry.createdAt).toLocaleDateString()}</span
							>
						</div>

						<div
							class="flex flex-row overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
						>
							{#each entry.posts as post, idx}
								<div
									class="bg-gradient-to-br from-zinc-900 to-black rounded-xl border border-zinc-700/50 p-5 hover:border-zinc-500 transition-all min-w-[300px] snap-center shadow-lg group relative overflow-hidden"
								>
									<div
										class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
									></div>
									<div class="flex items-start justify-between mb-4">
										<span
											class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-700 text-zinc-300"
										>
											{post.thread_type ?? 'Unknown'}
										</span>

										<button
											on:click={() => dispatch('approvePost', { entry, postIndex: idx })}
											class="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-lg transition-all hover:scale-110"
											title="Approve this post"
										>
											<Check class="w-5 h-5" />
										</button>
									</div>

									<div class="space-y-3 mb-4">
										<h4 class="font-bold text-zinc-100">{post.title}</h4>
										<p class="text-xs text-zinc-200 leading-relaxed">{post.content}</p>
									</div>

									<div class="flex flex-wrap gap-1.5 mb-2">
										{#each post.suggested_subreddits as sub}
											<span class="text-xs px-2 py-0.5 bg-zinc-700 text-zinc-300 rounded">
												r/{sub}
											</span>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Approved Posts -->
	<div>
		<h2 class="text-xl font-bold text-zinc-900 mb-4">Ready to Post</h2>

		{#if approvedPosts.length === 0}
			<div
				class="text-center py-16 bg-gradient-to-br from-white via-zinc-50 to-zinc-100 rounded-2xl border-2 border-dashed border-zinc-300 shadow-inner"
			>
				<Sparkles class="w-16 h-16 text-zinc-400 mx-auto mb-4" />
				<p class="text-zinc-600 font-medium text-lg">No approved posts yet</p>
				<p class="text-sm text-zinc-500 mt-2">Generate posts from Content and approve them here</p>
			</div>
		{:else}
			<div class="flex flex-row overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
				{#each approvedPosts as entry}
					<div
						class="bg-gradient-to-br from-zinc-900 to-black rounded-2xl border border-zinc-700 overflow-hidden hover:shadow-2xl transition-all min-w-[400px] snap-center shadow-lg group"
					>
						<!-- Header -->
						<div class="p-4 border-b border-zinc-700 bg-zinc-800">
							<div class="flex items-start justify-between">
								<div class="flex items-start gap-3">
									<div
										class="w-12 h-12 rounded-full bg-zinc-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
									>
										{projectData?.business_name?.charAt(0) || 'R'}
									</div>
									<div>
										<div class="font-bold text-white">
											{projectData?.business_name || 'Your Business'}
										</div>
										<div class="text-sm text-zinc-400">
											@{projectData?.business_name?.toLowerCase().replace(/\s+/g, '') ||
												'yourbusiness'}
										</div>
										<div class="text-xs text-zinc-500 mt-1">From: {entry.contentTitle}</div>
									</div>
								</div>

								<button
									on:click={() => dispatch('copyPost', { post: entry.post })}
									class="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg text-sm font-medium transition-all"
								>
									{#if copiedIndex === entry.post}
										<Check class="w-5 h-5" />
										Copied!
									{:else}
										<Copy class="w-5 h-5" />
									{/if}
								</button>
							</div>
						</div>

						<!-- Post Content -->
						<div class="p-4">
							<h4 class="font-bold text-white mb-2">{entry.post.title}</h4>
							<p
								class="text-white whitespace-pre-wrap leading-relaxed mb-4"
								style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6;"
							>
								{entry.post.content}
							</p>

							<!-- Subreddits -->
							<div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-600">
								{#each entry.post.suggested_subreddits as sub}
									<span
										class="px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full text-sm font-medium"
									>
										r/{sub}
									</span>
								{/each}
							</div>

							<!-- Post Type Badge -->
							<div class="mt-4 flex items-center justify-between">
								<span
									class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-700 text-zinc-300"
								>
									{entry.post.thread_type ?? 'Unknown'}
								</span>

								<button
									on:click={() => dispatch('deleteApprovedPost', { postId: entry.id })}
									class="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
