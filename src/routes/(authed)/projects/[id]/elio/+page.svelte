<!-- src/routes/(authed)/projects/[id]/elio/+page.svelte -->
<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { contentStore } from '$lib/components/nai/stores';
	import { WORKER_API_URL, API_BASE_URL } from '$lib/config';
	import * as api from '$lib/components/elio/api';

	import SuccessModal from '$lib/components/elio/SuccessModal.svelte';
	import Header from '$lib/components/elio/Header.svelte';
	import RedditConnectionAlert from '$lib/components/elio/RedditConnectionAlert.svelte';
	import ViewTabs from '$lib/components/elio/ViewTabs.svelte';
	import ContentAndPostsView from '$lib/components/elio/ContentAndPostsView.svelte';
	import OpportunitiesView from '$lib/components/elio/OpportunitiesView.svelte';
	import ProfileView from '$lib/components/elio/ProfileView.svelte';
	import ConfigView from '$lib/components/elio/ConfigView.svelte';
	import { MessageCircle, Loader2, Check } from 'lucide-svelte';
	import { fade, scale, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	$: projectId = $page.params.id;
	$: blogPosts = $contentStore.blogPosts || [];
	let authToken = localStorage.getItem('token');

	const MAIN_BACKEND_URL = API_BASE_URL;
	const WORKER_URL = WORKER_API_URL;

	// LocalStorage keys
	const getConfigKey = () => `elio_config_${projectId}`;
	const getOpportunitiesKey = () => `elio_opportunities_${projectId}`;
	const getRedditPostsKey = () => `elio_reddit_posts_${projectId}`;
	const getDeepScourTaskKey = () => `elio_deep_scour_task_${projectId}`;

	// State
	let loading = true;
	let projectData = null;
	let config = null;
	let opportunities = [];
	let pendingPosts = [];
	let approvedPosts = [];
	let scanning = false;
	let view = 'profile';
	let selectedOpportunity = null;
	let generatingPosts = new Set();
	let showSuccessModal = false;
	let successMessage = '';
	let copiedIndex = null;
	let currentCopiedTimer;
	let includeComments = true; // NEW: toggle for comment scanning
	let scanStep = 0; // Track scanning progress steps
	let deepScourTaskId = null;
	let deepScourStatus = null;
	let checkingDeepScour = false;

	// Progress steps for scanning
	const scanProgressSteps = [
		{ label: 'Connecting to Reddit', description: 'Setting up secure connection...' },
		{
			label: 'Searching Communities',
			description: 'This may take a minute—scouring through discussions'
		},
		{ label: 'Reading the Room', description: 'Analyzing sentiment and pain points' },
		{ label: 'Finding Your Matches', description: 'Scoring relevance to your project' }
	];

	// Reddit Auth State
	let redditConnected = false;
	let redditUsername = null;
	let redditConnecting = false;
	let checkingRedditAuth = true;

	async function loadBlogPosts() {
		await contentStore.loadBlogPosts(projectId);
	}

	async function loadRedditPosts() {
		if (!browser) return;
		try {
			const stored = localStorage.getItem(getRedditPostsKey());
			if (stored) {
				const parsed = JSON.parse(stored);
				pendingPosts = parsed.filter((p) => !p.approved);
				approvedPosts = parsed.filter((p) => p.approved);
			}
		} catch (error) {
			console.error('Failed to load reddit posts:', error);
			pendingPosts = [];
			approvedPosts = [];
		}
	}

	function saveRedditPostsToLocalStorage() {
		try {
			const allPosts = [...pendingPosts, ...approvedPosts];
			localStorage.setItem(getRedditPostsKey(), JSON.stringify(allPosts));
		} catch (error) {
			console.error('Failed to save reddit posts to localStorage:', error);
		}
	}

	// 🆕 Enhanced conversion using new expand API
	async function convertToRedditPost(blogPost) {
		generatingPosts.add(blogPost.id);
		generatingPosts = generatingPosts;

		try {
			// Call the new backend endpoint that handles expansion via worker
			const result = await api.expandContentToReddit(
				projectId,
				blogPost.id,
				authToken,
				MAIN_BACKEND_URL
			);

			// Backend returns { success: true, post: {...} }
			if (result.success && result.post) {
				const post = {
					id: result.post.id,
					original_content_id: blogPost.id,
					title: result.post.title,
					content: result.post.content,
					suggested_subreddits: result.post.suggested_subreddits,
					thread_type: result.post.thread_type,
					hook_type: result.post.hook_type,
					reasoning: result.post.reasoning,
					created_at: result.post.created_at,
					approved: false
				};

				savePosts(blogPost.id, blogPost.title, [post]);
				successMessage = `Generated Reddit post for "${blogPost.title}"`;
				showSuccessModal = true;
			} else {
				throw new Error('No post generated');
			}
		} catch (error) {
			console.error('Error converting to Reddit post:', error);
			alert('Failed to convert content to Reddit post: ' + error.message);
		} finally {
			generatingPosts.delete(blogPost.id);
			generatingPosts = generatingPosts;
		}
	}

	function savePosts(contentId, contentTitle, posts) {
		try {
			const newEntry = {
				id: `entry_${Date.now()}`,
				contentId,
				contentTitle,
				posts: posts.map((p) => ({ ...p, approved: false })),
				createdAt: new Date().toISOString()
			};
			pendingPosts = [newEntry, ...pendingPosts];
			saveRedditPostsToLocalStorage();
		} catch (error) {
			console.error('Failed to save posts:', error);
		}
	}

	function approvePost(entry, postIndex) {
		const entryIndex = pendingPosts.findIndex((e) => e.id === entry.id);
		if (entryIndex === -1) return;
		const post = pendingPosts[entryIndex].posts.splice(postIndex, 1)[0];
		if (!post) return;
		post.approved = true;
		const approvedEntry = {
			id: `approved_${Date.now()}`,
			contentId: entry.contentId,
			contentTitle: entry.contentTitle,
			post,
			createdAt: new Date().toISOString()
		};
		approvedPosts = [approvedEntry, ...approvedPosts];
		pendingPosts = pendingPosts.filter((e) => e.posts.length > 0);
		saveRedditPostsToLocalStorage();
		successMessage = 'Post approved and ready to share!';
		showSuccessModal = true;
	}

	function deleteApprovedPost(postId) {
		if (!confirm('Delete this post?')) return;
		approvedPosts = approvedPosts.filter((p) => p.id !== postId);
		saveRedditPostsToLocalStorage();
	}

	async function copyPost(post) {
		const postText = `${post.title}\n\n${post.content}\n\nTarget Subreddits: ${post.suggested_subreddits.join(', ')}`;
		try {
			await navigator.clipboard.writeText(postText);
			if (currentCopiedTimer) clearTimeout(currentCopiedTimer);
			copiedIndex = post;
			currentCopiedTimer = setTimeout(() => {
				copiedIndex = null;
				currentCopiedTimer = null;
			}, 2000);
		} catch (error) {
			console.error('Failed to copy:', error);
		}
	}

	function saveConfigToLocalStorage(cfg) {
		try {
			localStorage.setItem(getConfigKey(), JSON.stringify(cfg));
		} catch (error) {
			console.error('Failed to save config to localStorage:', error);
		}
	}

	function loadConfigFromLocalStorage() {
		try {
			const stored = localStorage.getItem(getConfigKey());
			if (stored) {
				config = JSON.parse(stored);
			} else {
				config = {
					subreddits: [],
					keywords: [],
					exclude_keywords: [],
					min_relevance: 65.0,
					time_window_hours: 24,
					max_per_subreddit: 5
				};
			}
		} catch (error) {
			console.error('Failed to load config from localStorage:', error);
			config = {
				subreddits: [],
				keywords: [],
				exclude_keywords: [],
				min_relevance: 65.0,
				time_window_hours: 24,
				max_per_subreddit: 5
			};
		}
	}

	function saveOpportunitiesToLocalStorage(opps) {
		try {
			localStorage.setItem(getOpportunitiesKey(), JSON.stringify(opps));
		} catch (error) {
			console.error('Failed to save opportunities to localStorage:', error);
		}
	}

	function loadOpportunitiesFromLocalStorage() {
		try {
			const stored = localStorage.getItem(getOpportunitiesKey());
			if (stored) {
				opportunities = JSON.parse(stored);
			}
		} catch (error) {
			console.error('Failed to load opportunities from localStorage:', error);
			opportunities = [];
		}
	}

	async function copyResponse(text) {
		try {
			await navigator.clipboard.writeText(text);
			successMessage = 'Response copied to clipboard!';
			showSuccessModal = true;
		} catch (error) {
			console.error('Failed to copy:', error);
		}
	}

	function updateOpportunity(opportunityId, updates) {
		opportunities = opportunities.map((opp) =>
			opp.id === opportunityId ? { ...opp, ...updates } : opp
		);
		saveOpportunitiesToLocalStorage(opportunities);

		try {
			api.updateOpportunity(projectId, opportunityId, updates, authToken, MAIN_BACKEND_URL);
		} catch (error) {
			console.log('Backend update skipped:', error);
		}
	}

	function clearDismissed() {
		if (confirm('Remove all dismissed opportunities?')) {
			opportunities = opportunities.filter((o) => !o.is_dismissed);
			saveOpportunitiesToLocalStorage(opportunities);
		}
	}

	$: filteredOpportunities = opportunities
		.filter((o) => !o.is_dismissed)
		.sort((a, b) => new Date(b.scanned_at) - new Date(a.scanned_at));

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const redditSuccess = urlParams.get('reddit_success');
		const redditUsernameParam = urlParams.get('username');

		if (redditSuccess === 'true' && redditUsernameParam) {
			successMessage = `Successfully connected to Reddit as u/${redditUsernameParam}`;
			showSuccessModal = true;
			window.history.replaceState({}, '', window.location.pathname);
		}

		await api
			.checkRedditConnection(authToken, MAIN_BACKEND_URL)
			.then(({ connected, username }) => {
				redditConnected = connected;
				redditUsername = username;
				checkingRedditAuth = false;
			})
			.catch(() => {
				checkingRedditAuth = false;
			});

		await loadBlogPosts();

		await api
			.fetchProjectData(projectId, authToken, MAIN_BACKEND_URL)
			.then(({ project, config: backendConfig }) => {
				projectData = project;
				if (backendConfig) {
					config = backendConfig;
					saveConfigToLocalStorage(config);
				} else {
					loadConfigFromLocalStorage();
				}
			})
			.catch(() => {
				loadConfigFromLocalStorage();
			});

		await api
			.fetchOpportunitiesFromBackend(projectId, authToken, MAIN_BACKEND_URL)
			.then((data) => {
				if (data.opportunities && data.opportunities.length > 0) {
					opportunities = data.opportunities.map((opp) => ({
						...opp,
						id: opp.post_id || opp.id,
						scanned_at: opp.created_at || new Date().toISOString()
					}));
					saveOpportunitiesToLocalStorage(opportunities);
				} else {
					loadOpportunitiesFromLocalStorage();
				}
			})
			.catch(() => {
				loadOpportunitiesFromLocalStorage();
			});

		await loadRedditPosts();

		// Check for active deep scour task
		const storedTaskId = localStorage.getItem(getDeepScourTaskKey());
		if (storedTaskId) {
			deepScourTaskId = storedTaskId;
			checkDeepScourStatus();
		}

		loading = false;
	});

	async function checkDeepScourStatus() {
		if (!deepScourTaskId) return;

		checkingDeepScour = true;
		try {
			const status = await api.getDeepScourTaskStatus(deepScourTaskId, authToken, MAIN_BACKEND_URL);
			deepScourStatus = status;

			// If completed or failed, we might want to update opportunities if completed
			if (status.status === 'completed') {
				// Optionally fetch new opportunities if we just found out it's done
				// But maybe let the user trigger that or just do it silently
				// For now just update the status display
			}
		} catch (error) {
			console.error('Failed to check deep scour status:', error);
			// If 404, maybe clear the task
			if (error.message && error.message.includes('404')) {
				deepScourTaskId = null;
				deepScourStatus = null;
				localStorage.removeItem(getDeepScourTaskKey());
			}
		} finally {
			checkingDeepScour = false;
		}
	}

	async function connectReddit() {
		redditConnecting = true;
		try {
			const data = await api.connectReddit(projectId, authToken, MAIN_BACKEND_URL);
			if (data.auth_url) {
				window.location.href = data.auth_url;
			}
		} catch (error) {
			alert(`Failed to connect to Reddit: ${error.message}`);
		} finally {
			redditConnecting = false;
		}
	}

	async function disconnectReddit() {
		if (!confirm('Are you sure you want to disconnect your Reddit account?')) return;
		try {
			await api.disconnectReddit(authToken, MAIN_BACKEND_URL);
			redditConnected = false;
			redditUsername = null;
			successMessage = 'Reddit account disconnected successfully';
			showSuccessModal = true;
		} catch (error) {
			alert('Failed to disconnect Reddit account');
		}
	}

	async function scanOpportunities() {
		if (!projectData || !config) return;

		if (!redditConnected) {
			alert('Please connect your Reddit account first to scan for opportunities');
			return;
		}

		scanning = true;
		scanStep = 0;

		// Variable step timing for realistic progression
		// Step 0->1: 5s (connecting), 1->2: 30s (searching), 2->3: 60s (analyzing)
		const stepTimings = [5000, 30000, 60000];
		let currentStepIndex = 0;

		const advanceStep = () => {
			if (currentStepIndex < stepTimings.length && scanStep < 3) {
				scanStep++;
				currentStepIndex++;
				if (currentStepIndex < stepTimings.length) {
					setTimeout(advanceStep, stepTimings[currentStepIndex]);
				}
			}
		};

		// Start the first step timer
		const firstStepTimeout = setTimeout(advanceStep, stepTimings[0]);

		try {
			const result = await api.scanOpportunities(projectId, authToken, MAIN_BACKEND_URL);

			// Clear any pending timeouts
			clearTimeout(firstStepTimeout);
			scanStep = 3; // Final step

			if (result.opportunities && result.opportunities.length > 0) {
				const newOpportunities = result.opportunities.map((opp) => ({
					...opp,
					id: opp.post_id,
					scanned_at: new Date().toISOString(),
					is_responded: false,
					is_dismissed: false
				}));

				const existingIds = new Set(opportunities.map((o) => o.id));
				const uniqueNew = newOpportunities.filter((o) => !existingIds.has(o.id));

				if (uniqueNew.length > 0) {
					try {
						await api.saveOpportunitiesToBackend(uniqueNew, projectId, authToken, MAIN_BACKEND_URL);
						opportunities = [...uniqueNew, ...opportunities];

						// Redirect to opportunities view directly
						view = 'opportunities';
					} catch (backendError) {
						console.error('Failed to save to backend, using localStorage fallback:', backendError);
						opportunities = [...uniqueNew, ...opportunities];
						saveOpportunitiesToLocalStorage(opportunities);

						// Redirect to opportunities view directly
						view = 'opportunities';
					}
				} else {
					alert('No new opportunities found (all duplicates)');
				}
			} else {
				alert('No new opportunities found');
			}
		} catch (error) {
			clearTimeout(firstStepTimeout);
			alert('Failed to scan for opportunities: ' + error.message);
		} finally {
			scanning = false;
			scanStep = 0;
		}
	}

	async function deepScour() {
		if (!projectData || !config) return;

		if (!redditConnected) {
			alert('Please connect your Reddit account first to use Deep Scour');
			return;
		}

		scanning = true;

		try {
			// 1. Initiate Deep Scour Task
			const initResult = await api.deepScour(projectId, authToken, MAIN_BACKEND_URL);

			if (!initResult.success || !initResult.task_id) {
				throw new Error(initResult.error || 'Failed to start deep scour task');
			}

			const taskId = initResult.task_id;
			console.log(`Deep Scour started, task_id: ${taskId}`);

			deepScourTaskId = taskId;
			deepScourStatus = { status: 'pending' }; // Optimistic update
			localStorage.setItem(getDeepScourTaskKey(), taskId);

			successMessage =
				'Deep Scour started. This can take up to 30 minutes. You will be notified by email when results are ready.';
			showSuccessModal = true;
		} catch (error) {
			console.error('Deep scour error:', error);
			alert('Failed to perform Deep Scour: ' + error.message);
		} finally {
			scanning = false;
		}
	}

	async function saveConfig() {
		try {
			saveConfigToLocalStorage(config);

			try {
				await api.saveConfig(projectId, config, authToken, MAIN_BACKEND_URL);
				successMessage = 'Configuration saved successfully!';
				showSuccessModal = true;
			} catch (backendError) {
				console.error('Backend save failed, but localStorage succeeded:', backendError);
				successMessage = 'Configuration saved locally!';
				showSuccessModal = true;
			}
		} catch (error) {
			alert('Failed to save configuration');
		}
	}

	function closeSuccessModal() {
		showSuccessModal = false;
	}

	function goToPostsView() {
		showSuccessModal = false;
		view = 'content-posts';
	}
</script>

{#if loading || checkingRedditAuth}
	<div class="text-center py-16">
		<div class="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto"></div>
		<p class="text-zinc-600 mt-4 font-medium">Loading Elio...</p>
	</div>
{:else}
	<div class="max-w-screen-2xl mx-auto p-4 sm:p-6">
		<Header
			{projectData}
			{redditConnected}
			{redditUsername}
			{redditConnecting}
			{scanning}
			{view}
			{opportunities}
			on:connectReddit={connectReddit}
			on:disconnectReddit={disconnectReddit}
			on:scanOpportunities={scanOpportunities}
			on:scanOpportunities={scanOpportunities}
			on:deepScour={deepScour}
			on:clearDismissed={clearDismissed}
			{deepScourStatus}
			{checkingDeepScour}
			on:checkDeepScourStatus={checkDeepScourStatus}
		/>

		{#if !redditConnected}
			<RedditConnectionAlert {redditConnecting} on:connectReddit={connectReddit} />
		{/if}

		<ViewTabs bind:view {blogPosts} {filteredOpportunities} {pendingPosts} {approvedPosts} />

		{#if view === 'content-posts'}
			<ContentAndPostsView
				{blogPosts}
				{generatingPosts}
				bind:pendingPosts
				bind:approvedPosts
				{copiedIndex}
				{projectData}
				{config}
				workerUrl={WORKER_URL}
				on:convertToRedditPost={(e) => convertToRedditPost(e.detail)}
				on:approvePost={(e) => approvePost(e.detail.entry, e.detail.postIndex)}
				on:deleteApprovedPost={(e) => deleteApprovedPost(e.detail.postId)}
				on:copyPost={(e) => copyPost(e.detail.post)}
			/>
		{:else if view === 'opportunities'}
			<OpportunitiesView
				{filteredOpportunities}
				bind:selectedOpportunity
				on:updateOpportunity={(e) => updateOpportunity(e.detail.id, e.detail.updates)}
				on:copyResponse={(e) => copyResponse(e.detail.text)}
			/>
		{:else if view === 'profile'}
			<ProfileView {projectId} {filteredOpportunities} {approvedPosts} />
		{:else if view === 'config'}
			<ConfigView bind:config bind:includeComments on:saveConfig={saveConfig} />
		{/if}
	</div>
{/if}

<!-- Progress Dialog -->
{#if scanning}
	<div
		class="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
		transition:fade={{ duration: 200 }}
	>
		<div
			class="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden border border-white/10 relative"
			transition:scale={{ duration: 300, easing: cubicOut, start: 0.95 }}
		>
			<!-- Ambient glow effect -->
			<div
				class="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-zinc-500/10 pointer-events-none"
			></div>

			<!-- Header -->
			<div class="relative z-10 p-8 pb-6">
				<div class="flex items-center gap-4 mb-3">
					<div
						class="w-14 h-14 rounded-full bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-400 flex items-center justify-center shadow-[0_5px_15px_-5px_rgba(255,255,255,0.4)] border-2 border-white/20 shimmer"
					>
						<MessageCircle size={24} class="text-zinc-900" />
					</div>
					<div>
						<h3 class="text-2xl font-bold text-white tracking-tight">Scanning Reddit</h3>
						<p class="text-sm text-zinc-400 mt-0.5">Finding high-value opportunities for you</p>
					</div>
				</div>
			</div>

			<!-- Progress Steps -->
			<div class="relative z-10 px-8 pb-6 space-y-5">
				{#each scanProgressSteps as step, index}
					<div class="flex items-start gap-4" transition:fly={{ y: 20, delay: index * 100 }}>
						<div class="flex-shrink-0 mt-1">
							{#if index < scanStep}
								<div
									class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
									transition:scale={{ duration: 200 }}
								>
									<Check size={16} class="text-white stroke-[3]" />
								</div>
							{:else if index === scanStep}
								<div
									class="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/40 pulse-ring"
								>
									<Loader2 size={16} class="text-white animate-spin" />
								</div>
							{:else}
								<div
									class="w-8 h-8 rounded-full bg-zinc-700/50 border border-zinc-600 flex items-center justify-center"
								>
									<div class="w-2.5 h-2.5 rounded-full bg-zinc-500"></div>
								</div>
							{/if}
						</div>
						<div class="flex-1 pt-0.5">
							<p
								class="text-base font-semibold mb-1 {index === scanStep
									? 'text-white'
									: index < scanStep
										? 'text-emerald-400'
										: 'text-zinc-500'}"
							>
								{step.label}
							</p>
							<p class="text-sm text-zinc-400 leading-relaxed">
								{step.description}
							</p>
						</div>
					</div>
				{/each}

				<!-- Liquid Light Progress Bar -->
				<div class="mt-8 pt-6 border-t border-white/10">
					<div
						class="relative h-3 bg-zinc-800/50 rounded-full overflow-hidden border border-zinc-700/50"
					>
						<div
							class="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 transition-all duration-700 ease-out liquid-light"
							style="width: {((scanStep + 1) / scanProgressSteps.length) * 100}%"
						>
							<div
								class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"
							></div>
						</div>
					</div>
					<div class="flex items-center justify-between mt-3">
						<p class="text-xs font-medium text-zinc-400">
							Step {scanStep + 1} of {scanProgressSteps.length}
						</p>
						<p class="text-xs font-medium text-zinc-400">
							{Math.round(((scanStep + 1) / scanProgressSteps.length) * 100)}% Complete
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<SuccessModal
	bind:showSuccessModal
	{successMessage}
	on:close={closeSuccessModal}
	on:goToPostsView={goToPostsView}
/>

<style>
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

	.pulse-ring {
		position: relative;
	}

	.pulse-ring::before {
		content: '';
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(251, 146, 60, 0.4), transparent 70%);
		animation: pulse-ring 2s ease-out infinite;
	}

	@keyframes pulse-ring {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(1.5);
			opacity: 0;
		}
	}

	.liquid-light {
		box-shadow:
			0 0 20px rgba(251, 146, 60, 0.5),
			0 0 40px rgba(251, 146, 60, 0.3),
			inset 0 0 20px rgba(255, 255, 255, 0.2);
	}
</style>
