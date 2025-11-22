<!-- lib/components/nai/interface.svelte -->

<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import {
		Search,
		FileText,
		TrendingUp,
		Target,
		RefreshCw,
		Play,
		Square,
		Pencil,
		AlertCircle,
		Check,
		Globe
	} from 'lucide-svelte';
	import {
		workflowStore,
		contentStore,
		activeSteps,
		progressPercent
	} from '$lib/components/nai/stores';
	import Keywords from './Keywords.svelte';
	import TopComp from './TopComp.svelte';

	export let projectId: string;

	const dispatch = createEventDispatcher();

	$: workflow = $workflowStore;
	$: content = $contentStore;
	$: steps = $activeSteps;
	$: progress = $progressPercent;

	let isSubmitting = false;
	let hasHandledCompletion = false;
	let loading = false;
	let fakeProgress = 0;

	// LocalStorage key for competitor toggle (visual only - doesn't affect workflow)
	let competitorEnabled = false;
	const COMPETITOR_STORAGE_KEY = `competitor_enabled_${projectId}`;

	$: selectedCompetitors = ['generate_outlines', 'generate_posts', 'full_workflow'].includes(
		workflow.selectedWorkflow
	);

	$: showAutoPublish = ['generate_posts', 'full_workflow'].includes(workflow.selectedWorkflow);
	$: autoEnabled = workflow.config.auto_publish.enabled;
	$: selectedIntegrations = workflow.config.auto_publish.integrations || [];

	const workflowNodes: Array<
		'keyword_research' | 'generate_outlines' | 'generate_posts' | 'full_workflow'
	> = ['keyword_research', 'generate_outlines', 'generate_posts', 'full_workflow'];

	interface DisplayNode {
		name: string;
		label: string;
		icon: any;
		completedKey: string | null;
		selectIndex?: number;
		isCompetitors?: boolean;
		description: string;
	}

	const displayNodes: DisplayNode[] = [
		{
			name: 'keyword_research',
			label: 'Research',
			icon: Search,
			completedKey: 'keyword_research',
			selectIndex: 0,
			description: 'Finding the best [keywords] for you'
		},
		{
			name: 'find_competitors',
			label: 'Competitors',
			icon: TrendingUp,
			completedKey: null,
			isCompetitors: true,
			description: 'Analyze ranking [Competitors]'
		},
		{
			name: 'generate_outlines',
			label: 'Planning',
			icon: FileText,
			completedKey: 'outline_generation',
			selectIndex: 1,
			description: 'Structuring your [Ideas]'
		},
		{
			name: 'generate_posts',
			label: 'Writing',
			icon: FileText,
			completedKey: 'blog_post_generation',
			selectIndex: 2,
			description: '[Engaging & Optimized] articles to rank'
		},
		{
			name: 'full_workflow',
			label: 'Publishing',
			icon: Target,
			completedKey: 'publish',
			selectIndex: 3,
			description: 'Publishing to your [Site]'
		}
	];

	$: currentSelectedIndex = workflowNodes.indexOf(workflow.selectedWorkflow);
	$: maxActive =
		currentSelectedIndex >= 0 ? currentSelectedIndex + (currentSelectedIndex >= 1 ? 1 : 0) : -1;

	function selectNode(index: number): void {
		const selectedWorkflow = workflowNodes[index];
		workflowStore.updateSelection(selectedWorkflow, workflow.selectedFrequency);
	}

	function toggleCompetitors(): void {
		competitorEnabled = !competitorEnabled;
		localStorage.setItem(COMPETITOR_STORAGE_KEY, JSON.stringify(competitorEnabled));
	}

	function setFrequency(freq: string): void {
		workflowStore.updateSelection(workflow.selectedWorkflow, freq);
	}

	async function toggleAutoPublish(): Promise<void> {
		const newEnabled = !autoEnabled;
		const newIntegrations =
			newEnabled && workflow.integrations.length > 0
				? workflow.integrations.map((i) => i.type)
				: [];
		workflowStore.updateAutoPublish(newEnabled, newIntegrations);

		if (workflow.taskId) {
			try {
				await workflowStore.updateWorkflow({
					config: {
						...workflow.config,
						auto_publish: {
							enabled: newEnabled,
							integrations: newIntegrations
						}
					}
				});
			} catch (error) {
				console.error('Error saving auto-publish settings:', error);
				workflowStore.updateAutoPublish(!newEnabled, newIntegrations);
			}
		}
	}

	async function toggleIntegration(type: string): Promise<void> {
		const newIntegrations = selectedIntegrations.includes(type)
			? selectedIntegrations.filter((t) => t !== type)
			: [...selectedIntegrations, type];
		workflowStore.updateAutoPublish(true, newIntegrations);

		if (workflow.taskId) {
			try {
				await workflowStore.updateWorkflow({
					config: {
						...workflow.config,
						auto_publish: {
							enabled: true,
							integrations: newIntegrations
						}
					}
				});
			} catch (error) {
				console.error('Error saving integration settings:', error);
				workflowStore.loadWorkflow(projectId);
			}
		}
	}

	async function createAndRun(): Promise<void> {
		if (isSubmitting) return;
		isSubmitting = true;

		try {
			await workflowStore.createAndRunWorkflow(projectId);
			dispatch('workflowStarted', { task_id: workflow.taskId });
			await contentStore.loadAll(projectId);
		} catch (error: any) {
			console.error('Error creating and running workflow:', error);
		} finally {
			isSubmitting = false;
		}
	}

	async function pauseWorkflow(): Promise<void> {
		if (isSubmitting) return;
		isSubmitting = true;

		try {
			await workflowStore.pauseWorkflow();
			dispatch('workflowPaused');
		} catch (error) {
			console.error('Error pausing workflow:', error);
		} finally {
			isSubmitting = false;
		}
	}

	async function resumeWorkflow(): Promise<void> {
		if (isSubmitting) return;
		isSubmitting = true;

		try {
			await workflowStore.resumeWorkflow();
			dispatch('workflowResumed');
		} catch (error) {
			console.error('Error resuming workflow:', error);
		} finally {
			isSubmitting = false;
		}
	}

	async function startEdit(): Promise<void> {
		workflowStore.setEditing(true);
	}

	async function submitEdit(): Promise<void> {
		if (isSubmitting) return;
		isSubmitting = true;

		try {
			await workflowStore.updateWorkflow({
				selectedWorkflow: workflow.selectedWorkflow,
				selectedFrequency: workflow.selectedFrequency,
				config: workflow.config
			});
			workflowStore.setEditing(false);
			dispatch('workflowUpdated', workflow);
		} catch (error: any) {
			console.error('Error updating workflow:', error);
		} finally {
			isSubmitting = false;
		}
	}

	function cancelEdit(): void {
		workflowStore.setEditing(false);
		workflowStore.loadWorkflow(projectId);
	}

	function isStepCompleted(stepName: string): boolean {
		return workflow.completedSteps?.includes(stepName) || false;
	}

	onMount(async () => {
		// Load competitor state from localStorage
		const stored = localStorage.getItem(COMPETITOR_STORAGE_KEY);
		if (stored !== null) {
			competitorEnabled = JSON.parse(stored);
		}

		const shouldShowLoading = !workflow.taskId;

		if (shouldShowLoading) {
			loading = true;
			setTimeout(() => {
				fakeProgress = 40;
				setTimeout(() => {
					fakeProgress = 60;
					setTimeout(() => {
						fakeProgress = 90;
					}, 500);
				}, 500);
			}, 50);
		}

		try {
			await workflowStore.loadWorkflow(projectId);
			await workflowStore.loadIntegrations(projectId);
			await contentStore.loadAll(projectId);

			if (workflow.taskId && (workflow.status === 'running' || workflow.status === 'pending')) {
				dispatch('workflowLoaded', { task_id: workflow.taskId });
			}
		} finally {
			if (shouldShowLoading) {
				loading = false;
			}
		}
	});

	onDestroy(() => {
		workflowStore.destroy();
	});

	$: if (workflow.status === 'completed' && !hasHandledCompletion) {
		hasHandledCompletion = true;
		contentStore.loadAll(projectId);
		dispatch('workflowComplete', workflow);
	}

	$: if (workflow.status !== 'completed') {
		hasHandledCompletion = false;
	}

	$: isWorkflowRunning = workflow.status === 'running' || workflow.status === 'pending';
	$: isPaused = workflow.taskId && !workflow.isActive;
	$: isCompleted = workflow.taskId && workflow.status === 'completed';
	$: noWorkflow = !workflow.taskId;

	$: canSelectAndConfigure =
		noWorkflow || isPaused || isCompleted || (workflow.isActive && workflow.status === 'idle');
	$: canEditFrequency =
		noWorkflow ||
		workflow.isEditing ||
		isPaused ||
		isCompleted ||
		(workflow.isActive && workflow.status === 'idle');

	// Determine competitor node active state (visual only - doesn't affect workflow)
	$: showCompetitorActive = selectedCompetitors || competitorEnabled;
</script>

{#if loading}
	<div class="fixed inset-0 bg-zinc-50 flex items-center justify-center z-50">
		<div class="text-center">
			<p class="text-xl font-medium text-zinc-900 mb-6 tracking-tight">Loading Nai...</p>
			<div class="w-80 bg-zinc-200 rounded-full h-2 overflow-hidden shadow-inner">
				<div
					class="bg-violet-600 h-2 rounded-full transition-all duration-1000 ease-out relative"
					style="width: {fakeProgress}%"
				>
					<div class="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="grid grid-cols-12 gap-4">
		<!-- Main Workflow Area -->
		<div class="col-span-12 lg:col-span-8 space-y-4">
			<!-- Workflow Card -->
			<div
				class="bg-white rounded-[2rem] p-8 shadow-xl border border-zinc-200/20 relative overflow-hidden group"
			>
				<!-- Premium Gradient Background -->
				<div
					class="absolute inset-0 bg-gradient-to-br from-zinc- border border-zinc-300 pointer-events-none"
				></div>

				<!-- Header -->
				<div class="flex items-center justify-between mb-12 relative z-10">
					<div>
						<h2 class="text-5xl text-zinc-700 tracking-tight font-[Poppins]">Nai</h2>
						<p class="text-base font-medium text-zinc-500 mt-2">
							Let's create some amazing content today.
						</p>
					</div>

					{#if isWorkflowRunning}
						<div
							class="flex items-center gap-3 px-5 py-2.5 bg-violet-600 rounded-full shadow-lg shadow-violet-600/20"
						>
							<RefreshCw class="w-4 h-4 animate-spin text-white" />
							<span class="text-sm font-medium text-white tracking-wide"
								>{workflow.progressMessage || 'Processing...'}</span
							>
						</div>
					{/if}
				</div>

				{#if workflow.scheduledNotification}
					<div
						class="mb-10 p-5 bg-violet-50 border-l-4 border-violet-500 rounded-r-xl flex items-start gap-4 shadow-sm relative z-10"
					>
						<div class="p-2 bg-violet-100 rounded-lg">
							<AlertCircle class="w-5 h-5 text-violet-700" />
						</div>
						<div class="flex-1 pt-0.5">
							<p class="text-base font-medium text-violet-900">
								{workflow.scheduledNotification.message}
							</p>
							<p class="text-sm text-violet-700 mt-1 font-medium">
								{workflow.scheduledNotification.time}
							</p>
						</div>
						<button
							on:click={() => workflowStore.clearNotification()}
							class="text-violet-400 hover:text-violet-700 p-2 hover:bg-violet-100 rounded-lg transition-colors"
						>
							<Check class="w-5 h-5" />
						</button>
					</div>
				{/if}

				<!-- COMPACT ZINC CARDS: 5-Column Grid Layout -->
				<div class="relative mb-16 mt-6">
					<!-- The Conduit (Line Behind Cards) -->
					<div
						class="absolute top-1/2 left-0 right-0 h-1 bg-zinc-200 -translate-y-1/2 rounded-full overflow-hidden z-0 mx-4 hidden md:block"
					>
						<!-- Active Liquid Light -->
						<div
							class="h-full bg-gradient-to-r from-pink-500 to-violet-600 shadow-[0_0_20px_rgba(236,72,153,0.8)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative"
							style="width: {((maxActive + (showCompetitorActive ? 0.5 : 0)) /
								(displayNodes.length - 1)) *
								100}%"
						>
							<div
								class="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-1 bg-gradient-to-l from-white to-transparent opacity-50"
							></div>
						</div>
					</div>

					<!-- Grid Container -->
					<div class="grid grid-cols-2 md:grid-cols-5 gap-3 relative z-10 px-1">
						{#each displayNodes as node, i}
							{@const isActive = i <= maxActive}
							{@const isCompetitor = node.isCompetitors}
							{@const isCompetitorActive = isCompetitor && showCompetitorActive}
							{@const isSelectable = node.selectIndex !== undefined}
							{@const isCompletedStep = node.completedKey && isStepCompleted(node.completedKey)}

							<button
								on:click={() => {
									if (isSelectable) selectNode(node.selectIndex);
									else if (isCompetitor) toggleCompetitors();
								}}
								class="relative group outline-none text-left w-full cursor-pointer
                  {isActive || isCompetitorActive ? 'scale-100' : 'hover:-translate-y-1'}
                  transition-all duration-500"
							>
								<!-- CARD CONTAINER -->
								<div
									class="h-full relative rounded-2xl p-3 transition-all duration-500 overflow-hidden flex flex-col items-center gap-3 min-h-[160px] shadow-lg
                  {isActive || isCompetitorActive
										? 'bg-zinc-800 border border-zinc-600 shadow-violet-600/10 ring-1 ring-white/10'
										: 'bg-zinc-200 border border-zinc-300 hover:border-zinc-400 hover:shadow-xl'}
                "
								>
									<!-- Active Indicator (Pink Dot) -->
									{#if isActive || isCompetitorActive}
										<div class="absolute top-3 right-3 flex h-2 w-2">
											<span
												class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"
											></span>
											<span class="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
										</div>
									{/if}

									<!-- METALLIC BEARING (Compact Node Circle) -->
									<div
										class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 shrink-0 mt-2
                    {isActive || isCompetitorActive
											? 'bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-400 shadow-[0_5px_15px_-5px_rgba(255,255,255,0.4)] border-2 border-white scale-110'
											: 'bg-gradient-to-b from-white to-zinc-100 border border-zinc-300 shadow-sm'}
                  "
									>
										<!-- Metallic Shine Highlight -->
										<div
											class="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent rounded-t-full pointer-events-none"
										></div>

										<!-- Icon -->
										<div
											class="transition-all duration-500 relative z-10
                      {isActive || isCompetitorActive
												? 'text-zinc-900 drop-shadow-sm scale-110'
												: 'text-zinc-500 group-hover:text-zinc-700'}
                    "
										>
											<svelte:component this={node.icon} class="w-5 h-5 stroke-[2]" />
										</div>

										<!-- Completed Checkmark -->
										{#if isCompletedStep}
											<div
												class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-md border-2 border-zinc-800"
											>
												<Check class="w-2.5 h-2.5 text-white stroke-[3]" />
											</div>
										{/if}
									</div>

									<!-- TEXT CONTENT -->
									<div class="flex flex-col items-center text-center w-full">
										<span
											class="text-xs font-medium tracking-wide mb-1.5 transition-colors font-sans
                      {isActive || isCompetitorActive
												? 'text-white'
												: 'text-zinc-700 group-hover:text-zinc-900'}
                    "
										>
											{node.label}
										</span>

										<!-- Compact Description with Pills -->
										<p
											class="text-[10px] font-medium leading-tight font-sans hidden sm:block
                      {isActive || isCompetitorActive ? 'text-zinc-400' : 'text-zinc-500'}
                    "
										>
											{@html node.description.replace(
												/\[(.*?)\]/g,
												isActive || isCompetitorActive
													? '<span class="bg-zinc-900/50 text-zinc-200 px-1 py-0.5 rounded-full mx-0.5 shadow-sm border border-zinc-700/50 inline-block my-0.5">$1</span>'
													: '<span class="bg-white text-zinc-700 px-1 py-0.5 rounded-full mx-0.5 shadow-sm border border-zinc-300 inline-block my-0.5">$1</span>'
											)}
										</p>
									</div>
								</div>
							</button>
						{/each}
					</div>
				</div>

				<!-- Configuration Tabs -->
				{#if showAutoPublish}
					<div
						class="bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden mb-10 shadow-inner"
					>
						<div
							class="px-6 py-5 border-b border-zinc-200 flex items-center justify-between bg-white"
						>
							<h3
								class="text-sm font-medium text-zinc-800 uppercase tracking-widest flex items-center gap-3"
							>
								<Globe class="w-4 h-4 text-zinc-500" />
								Auto Publish
							</h3>
							<button
								class="relative w-14 h-8 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2
                  {autoEnabled ? 'bg-zinc-900 border-zinc-900' : 'bg-zinc-200 border-zinc-300'}
                  border shadow-inner"
								on:click={toggleAutoPublish}
								disabled={isSubmitting}
							>
								<span class="sr-only">Enable Auto Publish</span>
								<span
									class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    {autoEnabled ? 'translate-x-6' : 'translate-x-0'}
                  "
								></span>
							</button>
						</div>

						{#if autoEnabled}
							<div class="p-6 bg-zinc-50">
								{#if workflow.integrations.length === 0}
									<div class="text-center py-10">
										<p class="text-base font-medium text-zinc-500 mb-5">
											No integrations connected yet.
										</p>
										<a
											href={`/project/${projectId}/integration`}
											class="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm hover:shadow-md"
										>
											<Globe class="w-4 h-4" />
											Connect Integration
										</a>
									</div>
								{:else}
									<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
										{#each workflow.integrations as int}
											<label
												class="flex items-center gap-4 p-5 bg-white rounded-xl border border-zinc-200 cursor-pointer hover:border-zinc-400 transition-all shadow-sm hover:shadow-md group"
											>
												<div class="relative flex items-center">
													<input
														type="checkbox"
														checked={selectedIntegrations.includes(int.type)}
														on:change={() => toggleIntegration(int.type)}
														class="peer sr-only"
													/>
													<div
														class="w-6 h-6 border-2 border-zinc-300 rounded-lg transition-all peer-checked:bg-zinc-800 peer-checked:border-zinc-800 flex items-center justify-center shadow-sm"
													>
														<Check
															class="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 stroke-[3]"
														/>
													</div>
												</div>
												<div class="flex flex-col">
													<span
														class="text-base font-medium text-zinc-700 group-hover:text-zinc-900 capitalize transition-colors"
													>
														{int.get_type_display || int.type}
													</span>
													{#if int.name}
														<span class="text-zinc-400 font-medium text-xs mt-0.5"
															>({int.config.site_url})</span
														>
													{/if}
												</div>
											</label>
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					</div>
				{/if}

				<!-- Frequency & Actions -->
				<div
					class="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t-2 border-zinc-100"
				>
					<!-- Frequency Selector -->
					<div class="flex items-center gap-6 w-full sm:w-auto">
						<span class="text-xs font-medium text-zinc-400 uppercase tracking-widest"
							>Frequency</span
						>
						<div class="flex p-1.5 bg-zinc-100 rounded-xl border border-zinc-200">
							{#if canEditFrequency}
								{#each ['daily', '2days', '3days', 'weekly'] as freq}
									<button
										on:click={() => setFrequency(freq)}
										class="px-5 py-2.5 rounded-lg text-sm font-medium transition-all relative
                      {workflow.selectedFrequency === freq
											? 'bg-white text-zinc-900 shadow-md'
											: 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/50'}
                    "
									>
										{freq === 'daily'
											? 'Daily'
											: freq === '2days'
												? '2d'
												: freq === '3days'
													? '3d'
													: 'Weekly'}
									</button>
								{/each}
							{:else}
								<div
									class="px-5 py-2.5 rounded-lg text-sm font-medium bg-zinc-100 text-zinc-500 border border-zinc-200 cursor-not-allowed"
								>
									{workflow.selectedFrequency === 'daily'
										? 'Daily'
										: workflow.selectedFrequency === '2days'
											? 'Every 2 Days'
											: workflow.selectedFrequency === '3days'
												? 'Every 3 Days'
												: 'Weekly'}
								</div>
							{/if}
						</div>
					</div>

					<!-- Action Buttons -->
					<div class="flex items-center gap-4 w-full sm:w-auto justify-end">
						{#if noWorkflow}
							<button
								on:click={createAndRun}
								disabled={isSubmitting}
								class="px-8 py-4 rounded-2xl bg-zinc-900 text-white text-base font-medium shadow-xl shadow-zinc-900/20 hover:shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 group relative overflow-hidden"
							>
								<div
									class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
								></div>
								{#if isSubmitting}
									<RefreshCw class="w-5 h-5 animate-spin" />
								{:else}
									<Play class="w-5 h-5 fill-white/90 group-hover:fill-white" />
								{/if}
								Start Workflow
							</button>
						{/if}

						{#if !isPaused && !noWorkflow}
							<button
								on:click={pauseWorkflow}
								disabled={isSubmitting}
								class="px-8 py-4 rounded-2xl bg-white border-2 border-zinc-200 text-zinc-700 text-base font-medium shadow-sm hover:bg-zinc-50 hover:border-zinc-300 transition-all flex items-center gap-3"
							>
								{#if isSubmitting}
									<RefreshCw class="w-5 h-5 animate-spin" />
								{:else}
									<Square class="w-5 h-5 fill-zinc-700" />
								{/if}
								Pause
							</button>
						{/if}

						{#if isPaused}
							<button
								on:click={resumeWorkflow}
								disabled={isSubmitting}
								class="px-8 py-4 rounded-2xl bg-emerald-500 text-white text-base font-medium shadow-xl shadow-emerald-500/20 hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center gap-3"
							>
								{#if isSubmitting}
									<RefreshCw class="w-5 h-5 animate-spin" />
								{:else}
									<Play class="w-5 h-5 fill-white" />
								{/if}
								Resume
							</button>
						{/if}

						{#if workflow.taskId && !isWorkflowRunning && !workflow.isEditing}
							<button
								on:click={startEdit}
								class="p-4 rounded-2xl bg-white border-2 border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 shadow-sm transition-all hover:shadow-md"
								title="Edit workflow"
							>
								<Pencil class="w-5 h-5" />
							</button>
						{/if}

						{#if workflow.isEditing}
							<button
								on:click={submitEdit}
								disabled={isSubmitting}
								class="px-8 py-4 rounded-2xl bg-zinc-900 text-white text-base font-medium shadow-lg hover:bg-zinc-800 transition-all flex items-center gap-3"
							>
								<Check class="w-5 h-5" />
								Save
							</button>
							<button
								on:click={cancelEdit}
								disabled={isSubmitting}
								class="px-8 py-4 rounded-2xl text-zinc-500 text-base font-medium hover:bg-zinc-100 transition-all"
							>
								Cancel
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Progress & Stats Sidebar -->
		<div class="col-span-12 lg:col-span-4 space-y-8">
			<!-- Progress Card -->
			<div
				class="bg-white rounded-[2rem] p-8 shadow-xl border border-zinc-200/20 h-full flex flex-col relative overflow-hidden"
			>
				<!-- Subtle Gradient Background for Cohesion -->
				<div
					class="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-transparent pointer-events-none"
				></div>

				<h2 class="text-xl font-medium text-zinc-900 mb-8 flex items-center gap-3 relative z-10">
					<TrendingUp class="w-6 h-6 text-zinc-400" />
					Your Progress
				</h2>

				{#if workflow.taskId}
					<div class="space-y-8 flex-1 relative z-10">
						<!-- Status Badge -->
						<div
							class="flex items-center justify-between p-5 bg-zinc-50 rounded-2xl border border-zinc-100"
						>
							<span class="text-xs font-medium text-zinc-400 uppercase tracking-widest"
								>Currently</span
							>
							<span
								class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border
                {workflow.status === 'running'
									? 'bg-blue-50 text-blue-600 border-blue-100'
									: workflow.status === 'pending'
										? 'bg-amber-50 text-amber-600 border-amber-100'
										: workflow.status === 'completed'
											? 'bg-emerald-50 text-emerald-600 border-emerald-100'
											: workflow.isActive
												? 'bg-violet-50 text-violet-600 border-violet-100'
												: 'bg-zinc-100 text-zinc-600 border-zinc-200'}
              "
							>
								{#if workflow.status === 'running'}
									<span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
								{/if}
								{workflow.status === 'running'
									? 'Working on it...'
									: workflow.status === 'pending'
										? 'Queued'
										: workflow.status === 'completed'
											? 'All Done!'
											: workflow.isActive
												? 'Scheduled'
												: workflow.taskId
													? 'Paused'
													: 'Ready'}
							</span>
						</div>

						<!-- Progress Bar -->
						<div>
							<div class="flex items-center justify-between mb-3">
								<span class="text-sm font-medium text-zinc-500">Completion</span>
								<span class="text-sm font-medium text-zinc-900">{Math.round(progress)}%</span>
							</div>
							<div
								class="w-full bg-zinc-100 rounded-full h-3 overflow-hidden border border-zinc-200/50"
							>
								<div
									class="bg-violet-600 h-3 rounded-full transition-all duration-700 ease-out relative"
									style="width: {progress}%"
								>
									<div class="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
								</div>
							</div>
							<p class="text-xs text-zinc-400 mt-3 text-right font-medium">
								{workflow.completedSteps?.length || 0} of {steps.length} steps
							</p>
						</div>

						<!-- Completed Steps List -->
						{#if workflow.completedSteps?.length > 0}
							<div class="border-t border-zinc-100 pt-6">
								<div class="space-y-5 relative">
									<div class="absolute left-[9px] top-2 bottom-2 w-[2px] bg-zinc-100"></div>
									{#each workflow.completedSteps as step}
										<div class="relative pl-10 group">
											<div
												class="absolute left-0 top-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-sm z-10 transition-transform group-hover:scale-110"
											></div>
											<p
												class="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors"
											>
												{step.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
											</p>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{:else}
					<div
						class="flex-1 flex flex-col items-center justify-center text-center py-12 opacity-60 relative z-10"
					>
						<div
							class="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6 border border-zinc-100"
						>
							<Play class="w-8 h-8 text-zinc-300 ml-1" />
						</div>
						<p class="text-lg font-medium text-zinc-900">Ready to Start?</p>
						<p class="text-sm text-zinc-500 mt-2 font-medium">Pick a mode above and let's go!</p>
					</div>
				{/if}

				<!-- Stats Grid -->
				<div class="grid grid-cols-3 gap-2 mt-8 pt-8 border-t border-zinc-100 relative z-10">
					<div class="text-center p-3 bg-zinc-50 rounded-xl border border-zinc-100">
						<p class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Keywords</p>
						<p class="text-xl font-medium text-zinc-900 mt-1">
							{content.keywordsLoading ? '-' : content.keywords.length}
						</p>
					</div>
					<div class="text-center p-3 bg-zinc-50 rounded-xl border border-zinc-100">
						<p class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Outlines</p>
						<p class="text-xl font-medium text-zinc-900 mt-1">
							{content.outlinesLoading ? '-' : content.outlines.length}
						</p>
					</div>
					<div class="text-center p-3 bg-zinc-50 rounded-xl border border-zinc-100">
						<p class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Posts</p>
						<p class="text-xl font-medium text-zinc-900 mt-1">
							{content.postsLoading ? '-' : content.blogPosts.length}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom Components -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
		<TopComp {projectId} />
		<Keywords {projectId} />
	</div>
{/if}
```
