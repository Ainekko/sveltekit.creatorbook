<!-- src/lib/components/elio/ContentAndPostsView.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	import {
		FileText,
		Lightbulb,
		Check,
		Copy,
		ChevronDown,
		ChevronUp,
		Eye,
		X,
		Sparkles,
		MessageCircle
	} from 'lucide-svelte';

	export let blogPosts;
	export let generatingPosts;
	export let pendingPosts;
	export let approvedPosts;
	export let copiedIndex;
	export let projectData;
	export let config; // NEW: need config for subreddits
	export let workerUrl; // NEW: need worker URL

	const dispatch = createEventDispatcher();

	let hoveredPost = null;
	let expandedContent = null;
	let previewPost = null;

	function toggleExpandContent(postId) {
		expandedContent = expandedContent === postId ? null : postId;
	}

	function openPreview(post) {
		previewPost = post;
	}

	function closePreview() {
		previewPost = null;
	}

	// 🆕 Enhanced conversion using the new expand API
	async function convertToRedditPost(blogPost) {
		dispatch('convertToRedditPost', blogPost);
	}
</script>

<div class="space-y-8">
	<!-- Source Content Section -->
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-2xl font-bold text-zinc-900">Source Content</h2>
				<p class="text-sm text-zinc-500 mt-1">Transform your content into engaging Reddit posts</p>
			</div>
			<span
				class="px-3 py-1.5 bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-800 rounded-full text-sm font-medium"
			>
				{blogPosts.length} post{blogPosts.length !== 1 ? 's' : ''}
			</span>
		</div>

		{#if blogPosts.length === 0}
			<div
				class="text-center py-20 bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200"
			>
				<FileText class="w-20 h-20 text-zinc-400 mx-auto mb-4" />
				<p class="text-zinc-700 mb-2 font-medium text-lg">No blog posts available</p>
				<p class="text-sm text-zinc-500">
					Create blog posts to convert them into Reddit-ready content
				</p>
			</div>
		{:else}
			<div class="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
				{#each blogPosts as post}
					<div
						class="group relative bg-gradient-to-br from-white via-zinc-50 to-zinc-100 rounded-xl border border-zinc-200 min-w-[340px] max-w-[340px] hover:shadow-2xl hover:border-zinc-300 transition-all duration-300 snap-center flex flex-col overflow-hidden"
					>
						<!-- Gradient header -->
						<div class="h-2 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800"></div>

						<div class="p-5 flex-1 flex flex-col">
							<div class="flex items-start justify-between mb-3">
								<span
									class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-800 border border-zinc-200"
								>
									{post.status}
								</span>
								<button
									on:click={() => openPreview(post)}
									class="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
									title="Preview full content"
								>
									<Eye class="w-4 h-4 text-zinc-600" />
								</button>
							</div>

							<h3 class="text-base font-bold text-zinc-900 mb-2 line-clamp-2 min-h-[48px]">
								{post.title}
							</h3>

							<p class="text-sm text-zinc-600 line-clamp-4 mb-4 flex-1">
								{post.content.substring(0, 150)}...
							</p>

							<button
								on:click={() => convertToRedditPost(post)}
								disabled={generatingPosts.has(post.id)}
								class="w-full px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group-hover:scale-105"
							>
								{#if generatingPosts.has(post.id)}
									<div
										class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
									></div>
									Generating...
								{:else}
									<Sparkles class="w-4 h-4" />
									Generate Reddit Posts
								{/if}
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Pending Approval Section -->
	{#if pendingPosts.length > 0}
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-2xl font-bold text-zinc-900">Review & Approve</h2>
					<p class="text-sm text-zinc-500 mt-1">
						Review AI-generated variations and approve the best ones
					</p>
				</div>
				<span
					class="px-3 py-1.5 bg-zinc-100 text-zinc-800 rounded-full text-sm font-semibold border border-zinc-200"
				>
					{pendingPosts.length} pending
				</span>
			</div>

			<div class="space-y-4">
				{#each pendingPosts as entry}
					<div class="bg-white rounded-xl border-2 border-zinc-200 shadow-lg overflow-hidden">
						<button
							on:click={() => toggleExpandContent(entry.id)}
							class="w-full p-5 flex items-center justify-between hover:bg-zinc-50 transition-colors"
						>
							<div class="flex-1 text-left">
								<div class="flex items-center gap-2 mb-1">
									<FileText class="w-4 h-4 text-zinc-600" />
									<h3 class="font-semibold text-zinc-900">From: {entry.contentTitle}</h3>
								</div>
								<p class="text-xs text-zinc-500">
									{entry.posts.length} variation{entry.posts.length !== 1 ? 's' : ''} • Generated {new Date(
										entry.createdAt
									).toLocaleDateString()}
								</p>
							</div>
							<div class="flex items-center gap-3">
								{#if expandedContent === entry.id}
									<ChevronUp class="w-5 h-5 text-zinc-600" />
								{:else}
									<ChevronDown class="w-5 h-5 text-zinc-600" />
								{/if}
							</div>
						</button>

						{#if expandedContent === entry.id}
							<div class="border-t-2 border-zinc-200 p-5 bg-gradient-to-br from-zinc-50 to-white">
								<div class="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory scrollbar-hide">
									{#each entry.posts as post, idx}
										<div
											class="bg-white rounded-xl border-2 border-zinc-300 p-5 min-w-[360px] max-w-[360px] snap-center hover:border-zinc-400 hover:shadow-xl transition-all"
										>
											<div class="flex items-start justify-between mb-3 gap-2">
												<div class="flex flex-wrap gap-2">
													<span
														class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200"
													>
														{post.thread_type ?? 'Post'}
													</span>
													{#if post.hook_type}
														<span
															class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
														>
															{post.hook_type}
														</span>
													{/if}
												</div>
												<button
													on:click={() => dispatch('approvePost', { entry, postIndex: idx })}
													class="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-lg transition-all hover:scale-110 shadow-md"
													title="Approve this post"
												>
													<Check class="w-4 h-4" />
												</button>
											</div>

											<h4 class="font-bold text-zinc-900 mb-3 text-sm line-clamp-2">
												{post.title}
											</h4>

											<div class="relative mb-3">
												<p
													class="text-xs text-zinc-700 leading-relaxed max-h-[140px] overflow-y-auto custom-scrollbar whitespace-pre-wrap"
												>
													{post.content}
												</p>
											</div>

											<!-- Target Subreddits -->
											<div class="pt-3 border-t border-zinc-200">
												<p class="text-xs text-zinc-500 font-medium mb-2">Target Subreddits:</p>
												<div class="flex flex-wrap gap-1.5">
													{#each post.suggested_subreddits as sub}
														<span
															class="text-xs px-2.5 py-1 bg-zinc-100 text-zinc-700 rounded-full font-semibold border border-zinc-200"
														>
															r/{sub}
														</span>
													{/each}
												</div>
											</div>

											{#if post.reasoning}
												<div class="mt-3 pt-3 border-t border-zinc-200">
													<p class="text-xs text-zinc-600 italic">{post.reasoning}</p>
												</div>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Approved Posts Section -->
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-2xl font-bold text-zinc-900">Ready to Post</h2>
				<p class="text-sm text-zinc-500 mt-1">Copy and paste these into Reddit</p>
			</div>
			<span
				class="px-3 py-1.5 bg-zinc-100 text-zinc-800 rounded-full text-sm font-semibold border border-zinc-200"
			>
				{approvedPosts.length} approved
			</span>
		</div>

		{#if approvedPosts.length === 0}
			<div
				class="text-center py-20 bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-2xl border-2 border-dashed border-zinc-300"
			>
				<Lightbulb class="w-20 h-20 text-zinc-400 mx-auto mb-4" />
				<p class="text-zinc-600 font-medium text-lg">No approved posts yet</p>
				<p class="text-sm text-zinc-500 mt-2">Generate and approve posts to see them here</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				{#each approvedPosts as entry}
					<div
						class="bg-white rounded-xl border-2 border-zinc-200 overflow-hidden hover:shadow-2xl hover:border-zinc-300 transition-all"
					>
						<!-- Reddit-style header -->
						<div class="p-4 border-b-2 border-zinc-200 bg-gradient-to-r from-zinc-50 to-zinc-100">
							<div class="flex items-start justify-between mb-2">
								<div class="flex items-center gap-3">
									<div
										class="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md"
									>
										{projectData?.business_name?.charAt(0) || 'R'}
									</div>
									<div>
										<div class="font-bold text-zinc-900 text-sm">
											u/{projectData?.business_name?.toLowerCase().replace(/\s+/g, '_') ||
												'your_business'}
										</div>
										<div class="text-xs text-zinc-500">From: {entry.contentTitle}</div>
									</div>
								</div>

								<button
									on:click={() => dispatch('copyPost', { post: entry.post })}
									class="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-zinc-50 text-zinc-700 rounded-lg text-xs font-semibold transition-all border-2 border-zinc-200 shadow-sm"
								>
									{#if copiedIndex === entry.post}
										<Check class="w-3.5 h-3.5 text-zinc-900" />
										<span class="text-zinc-900">Copied!</span>
									{:else}
										<Copy class="w-3.5 h-3.5" />
										Copy
									{/if}
								</button>
							</div>
						</div>

						<!-- Post Content -->
						<div class="p-4">
							<h4 class="font-bold text-zinc-900 mb-3 text-base">{entry.post.title}</h4>

							<div class="relative mb-4">
								<p
									class="text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed max-h-[200px] overflow-y-auto custom-scrollbar"
								>
									{entry.post.content}
								</p>
							</div>

							<!-- Metadata -->
							<div class="space-y-3">
								<!-- Subreddits -->
								<div>
									<p class="text-xs text-zinc-500 font-medium mb-1.5">Post to:</p>
									<div class="flex flex-wrap gap-1.5">
										{#each entry.post.suggested_subreddits as sub}
											<span
												class="px-2.5 py-1 bg-zinc-100 text-zinc-700 rounded-full text-xs font-semibold border border-zinc-200"
											>
												r/{sub}
											</span>
										{/each}
									</div>
								</div>

								<!-- Footer -->
								<div class="flex items-center justify-between pt-3 border-t-2 border-zinc-200">
									<div class="flex items-center gap-2">
										<span
											class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200"
										>
											{entry.post.thread_type ?? 'Post'}
										</span>
										{#if entry.post.hook_type}
											<span
												class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
											>
												{entry.post.hook_type}
											</span>
										{/if}
									</div>

									<button
										on:click={() => dispatch('deleteApprovedPost', { postId: entry.id })}
										class="text-xs text-zinc-500 hover:text-zinc-800 transition-colors font-medium"
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<!-- Full Content Preview Modal -->
{#if previewPost}
	<div
		class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
		on:click={closePreview}
	>
		<div
			class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border-2 border-zinc-200"
			on:click|stopPropagation
		>
			<div class="h-2 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800"></div>

			<div class="p-6 border-b-2 border-zinc-200 flex items-start justify-between">
				<div class="flex-1">
					<h3 class="text-xl font-bold text-zinc-900 mb-2">{previewPost.title}</h3>
					<span
						class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-800 border border-zinc-200"
					>
						{previewPost.status}
					</span>
				</div>
				<button on:click={closePreview} class="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
					<X class="w-5 h-5 text-zinc-600" />
				</button>
			</div>

			<div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)] custom-scrollbar">
				<p class="text-zinc-700 leading-relaxed whitespace-pre-wrap">
					{previewPost.content}
				</p>
			</div>

			<div class="p-6 border-t-2 border-zinc-200 bg-zinc-50">
				<button
					on:click={() => {
						dispatch('convertToRedditPost', previewPost);
						closePreview();
					}}
					disabled={generatingPosts.has(previewPost.id)}
					class="w-full px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
				>
					<Sparkles class="w-5 h-5" />
					{generatingPosts.has(previewPost.id) ? 'Generating...' : 'Generate Reddit Posts'}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-4 {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.05);
		border-radius: 3px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 3px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: rgba(0, 0, 0, 0.3);
	}

	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
