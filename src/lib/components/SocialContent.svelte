<script>
	// Props for the component
	export let socialData = {};
	export let businessData = {};

	const businessName = businessData.business_name || 'N/A';

	// Destructure the important data from the socialData object
	let twitterPosts = socialData?.twitter_posts || [];
	let linkedinPosts = socialData?.linkedin_posts || [];
	let redditPosts = socialData?.reddit_posts || [];

	// State for platform filter
	let activeFilter = 'all';

	// State for expanded posts
	let expandedPosts = new Set();

	// Copy notification state
	let copiedPostId = null;

	// Helper function to filter posts based on selected platform
	$: filteredPosts = () => {
		if (activeFilter === 'all') {
			return { twitter: twitterPosts, linkedin: linkedinPosts, reddit: redditPosts };
		} else if (activeFilter === 'twitter') {
			return { twitter: [], linkedin: [], reddit: [] }; // Twitter hidden
		} else if (activeFilter === 'linkedin') {
			return { twitter: [], linkedin: linkedinPosts, reddit: [] };
		} else if (activeFilter === 'reddit') {
			return { twitter: [], linkedin: [], reddit: redditPosts };
		}
		return { twitter: [], linkedin: [], reddit: [] };
	};

	// Copy functionality
	async function copyToClipboard(content, postId) {
		try {
			await navigator.clipboard.writeText(content);
			copiedPostId = postId;
			setTimeout(() => {
				copiedPostId = null;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}

	// Toggle expanded state
	function toggleExpanded(postId) {
		if (expandedPosts.has(postId)) {
			expandedPosts.delete(postId);
		} else {
			expandedPosts.add(postId);
		}
		expandedPosts = expandedPosts; // Trigger reactivity
	}

	// Check if content should be truncated
	function shouldTruncate(content) {
		return content && content.length > 200;
	}

	// Get truncated content
	function getTruncatedContent(content) {
		return content.length > 200 ? content.substring(0, 200) + '...' : content;
	}
</script>

<div class="max-w-6xl mx-auto p-4">
	<!-- Header -->
	<div class="flex items-center justify-between mb-6">
		<h2 class="text-2xl font-bold text-white">Social Media Content</h2>
		<div class="flex gap-3 text-sm">
			<span class="flex items-center gap-2">
				<!-- Twitter Hidden
              <div class="w-3 h-3 rounded-full bg-blue-400"></div>
              Twitter
              -->
			</span>
			<span class="flex items-center gap-2">
				<div class="w-3 h-3 rounded-full bg-purple-400"></div>
				LinkedIn
			</span>
			<span class="flex items-center gap-2">
				<div class="w-3 h-3 rounded-full bg-orange-400"></div>
				Reddit
			</span>
		</div>
	</div>

	<!-- Platform Filter Tabs -->
	<div class="border-b border-zinc-700 mb-6">
		<div class="flex gap-1">
			{#each [{ key: 'all', label: 'All Platforms' }, { key: 'all', label: 'All Platforms' }, // { key: 'twitter', label: 'Twitter' }, // Hidden
				{ key: 'linkedin', label: 'LinkedIn' }, { key: 'reddit', label: 'Reddit' }] as tab}
				<button
					class="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
                         {activeFilter === tab.key
						? 'bg-zinc-800 text-white border-b-2 border-blue-500'
						: 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}"
					on:click={() => (activeFilter = tab.key)}
				>
					{tab.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- Content Grid -->
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		<!-- Twitter Posts -->
		<!-- Twitter Posts Hidden
      {#each filteredPosts().twitter as post, index}
          {@const postId = `twitter-${index}`}
          <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 hover:border-blue-500/50 transition-colors">
              <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          T
                      </div>
                      <span class="text-blue-400 text-sm font-medium">Twitter</span>
                  </div>
                  <button 
                      class="p-1 text-zinc-400 hover:text-white transition-colors"
                      on:click={() => copyToClipboard(post.content || '', postId)}
                      title="Copy content"
                  >
                      {#if copiedPostId === postId}
                          <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                      {:else}
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                      {/if}
                  </button>
              </div>
              
              <div class="text-zinc-300 text-sm mb-4">
                  {#if shouldTruncate(post.content || '')}
                      <p class="leading-relaxed">
                          {expandedPosts.has(postId) ? (post.content || 'No content') : getTruncatedContent(post.content || 'No content')}
                      </p>
                      <button 
                          class="text-blue-400 hover:text-blue-300 text-xs mt-2 font-medium"
                          on:click={() => toggleExpanded(postId)}
                      >
                          {expandedPosts.has(postId) ? 'Show less' : 'Show more'}
                      </button>
                  {:else}
                      <p class="leading-relaxed">{post.content || 'No content'}</p>
                  {/if}
              </div>
              
              {#if post.hashtags && post.hashtags.length > 0}
                  <div class="flex flex-wrap gap-1 mb-4">
                      {#each post.hashtags.slice(0, 4) as tag}
                          <span class="text-blue-400 text-xs bg-blue-900/20 px-2 py-1 rounded">{tag}</span>
                      {/each}
                      {#if post.hashtags.length > 4}
                          <span class="text-zinc-500 text-xs">+{post.hashtags.length - 4} more</span>
                      {/if}
                  </div>
              {/if}
              
              <div class="flex gap-2 pt-3 border-t border-zinc-800">
                  <button class="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs text-zinc-300 transition-colors">
                      Edit
                  </button>
                  <button class="flex-1 py-2 bg-blue-900/30 hover:bg-blue-900/50 rounded text-xs text-blue-400 transition-colors">
                      Use Template
                  </button>
              </div>
          </div>
      {/each}
      -->

		<!-- LinkedIn Posts -->
		{#each filteredPosts().linkedin as post, index}
			{@const postId = `linkedin-${index}`}
			<div
				class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 hover:border-purple-500/50 transition-colors"
			>
				<!-- Header -->
				<div class="flex items-center justify-between mb-3">
					<div class="flex items-center gap-2">
						<div
							class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
						>
							in
						</div>
						<span class="text-purple-400 text-sm font-medium">LinkedIn</span>
					</div>
					<button
						class="p-1 text-zinc-400 hover:text-white transition-colors"
						on:click={() => copyToClipboard(post.content || '', postId)}
						title="Copy content"
					>
						{#if copiedPostId === postId}
							<svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						{:else}
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
						{/if}
					</button>
				</div>

				<!-- Title (if exists) -->
				{#if post.title}
					<h3 class="text-white font-semibold text-base mb-2 leading-tight">{post.title}</h3>
				{/if}

				<!-- Content -->
				<div class="text-zinc-300 text-sm mb-4">
					{#if shouldTruncate(post.content || '')}
						<p class="leading-relaxed">
							{expandedPosts.has(postId)
								? post.content || 'No content'
								: getTruncatedContent(post.content || 'No content')}
						</p>
						<button
							class="text-purple-400 hover:text-purple-300 text-xs mt-2 font-medium"
							on:click={() => toggleExpanded(postId)}
						>
							{expandedPosts.has(postId) ? 'Show less' : 'Show more'}
						</button>
					{:else}
						<p class="leading-relaxed">{post.content || 'No content'}</p>
					{/if}
				</div>

				<!-- Content Type -->
				{#if post.type}
					<div class="mb-4">
						<span class="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-xs">
							{post.type}
						</span>
					</div>
				{/if}

				<!-- Hashtags -->
				{#if post.hashtags && post.hashtags.length > 0}
					<div class="flex flex-wrap gap-1 mb-4">
						{#each post.hashtags.slice(0, 4) as tag}
							<span class="text-purple-400 text-xs bg-purple-900/20 px-2 py-1 rounded">{tag}</span>
						{/each}
						{#if post.hashtags.length > 4}
							<span class="text-zinc-500 text-xs">+{post.hashtags.length - 4} more</span>
						{/if}
					</div>
				{/if}

				<!-- Quick Actions -->
				<div class="flex gap-2 pt-3 border-t border-zinc-800">
					<button
						class="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs text-zinc-300 transition-colors"
					>
						Edit
					</button>
					<button
						class="flex-1 py-2 bg-purple-900/30 hover:bg-purple-900/50 rounded text-xs text-purple-400 transition-colors"
					>
						Use Template
					</button>
				</div>
			</div>
		{/each}

		<!-- Reddit Posts -->
		{#each filteredPosts().reddit as post, index}
			{@const postId = `reddit-${index}`}
			<div
				class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 hover:border-orange-500/50 transition-colors"
			>
				<!-- Header -->
				<div class="flex items-center justify-between mb-3">
					<div class="flex items-center gap-2">
						<div
							class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
						>
							r/
						</div>
						<div>
							<span class="text-orange-400 text-sm font-medium">Reddit</span>
							{#if post.target_subreddit}
								<p class="text-zinc-500 text-xs">{post.target_subreddit}</p>
							{/if}
						</div>
					</div>
					<button
						class="p-1 text-zinc-400 hover:text-white transition-colors"
						on:click={() => copyToClipboard(`${post.title || ''}\n\n${post.content || ''}`, postId)}
						title="Copy content"
					>
						{#if copiedPostId === postId}
							<svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						{:else}
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
						{/if}
					</button>
				</div>

				<!-- Title -->
				<h3 class="text-white font-semibold text-base mb-2 leading-tight">
					{post.title || 'Reddit Post Title'}
				</h3>

				<!-- Content -->
				<div class="text-zinc-300 text-sm mb-4">
					{#if shouldTruncate(post.content || '')}
						<p class="leading-relaxed">
							{expandedPosts.has(postId)
								? post.content || 'No content'
								: getTruncatedContent(post.content || 'No content')}
						</p>
						<button
							class="text-orange-400 hover:text-orange-300 text-xs mt-2 font-medium"
							on:click={() => toggleExpanded(postId)}
						>
							{expandedPosts.has(postId) ? 'Show less' : 'Show more'}
						</button>
					{:else}
						<p class="leading-relaxed">{post.content || 'No content'}</p>
					{/if}
				</div>

				<!-- Post Type -->
				{#if post.post_type}
					<div class="mb-4">
						<span class="bg-orange-900/30 text-orange-400 px-2 py-1 rounded text-xs">
							{post.post_type}
						</span>
					</div>
				{/if}

				<!-- Quick Actions -->
				<div class="flex gap-2 pt-3 border-t border-zinc-800">
					<button
						class="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs text-zinc-300 transition-colors"
					>
						Edit
					</button>
					<button
						class="flex-1 py-2 bg-orange-900/30 hover:bg-orange-900/50 rounded text-xs text-orange-400 transition-colors"
					>
						Use Template
					</button>
				</div>
			</div>
		{/each}
	</div>

	<!-- Empty State -->
	{#if filteredPosts().twitter.length === 0 && filteredPosts().linkedin.length === 0 && filteredPosts().reddit.length === 0}
		<div class="text-center py-12">
			<div class="w-16 h-16 mx-auto mb-4 bg-zinc-800 rounded-full flex items-center justify-center">
				<svg class="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
					/>
				</svg>
			</div>
			<h3 class="text-lg font-medium text-white mb-1">No content yet</h3>
			<p class="text-zinc-400">Generate some social media content to get started.</p>
		</div>
	{/if}
</div>
