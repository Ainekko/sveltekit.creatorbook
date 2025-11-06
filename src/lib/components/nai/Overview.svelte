<!-- lib/components/nai/interface.svelte -->

<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { Search, FileText, TrendingUp, Target, RefreshCw, Play, Square, Pencil, AlertCircle, Check, Globe } from 'lucide-svelte';
  import { workflowStore, contentStore, activeSteps, progressPercent } from '$lib/components/nai/stores';
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

  $: selectedCompetitors = ['generate_outlines', 'generate_posts', 'full_workflow'].includes(workflow.selectedWorkflow);

  $: showAutoPublish = ['generate_posts', 'full_workflow'].includes(workflow.selectedWorkflow);
  $: autoEnabled = workflow.config.auto_publish.enabled;
  $: selectedIntegrations = workflow.config.auto_publish.integrations || [];

  const workflowNodes: Array<'keyword_research' | 'generate_outlines' | 'generate_posts' | 'full_workflow'> = [
    'keyword_research',
    'generate_outlines',
    'generate_posts',
    'full_workflow'
  ];

  interface DisplayNode {
    name: string;
    label: string;
    icon: typeof Search;
    completedKey: string | null;
    selectIndex?: number;
    isCompetitors?: boolean;
  }

  const displayNodes: DisplayNode[] = [
    { name: 'keyword_research', label: 'Keywords', icon: Search, completedKey: 'keyword_research', selectIndex: 0 },
    { name: 'find_competitors', label: 'Competitors', icon: TrendingUp, completedKey: null, isCompetitors: true },
    { name: 'generate_outlines', label: 'Outlines', icon: FileText, completedKey: 'outline_generation', selectIndex: 1 },
    { name: 'generate_posts', label: 'Posts', icon: FileText, completedKey: 'blog_post_generation', selectIndex: 2 },
    { name: 'full_workflow', label: 'Publish', icon: Target, completedKey: 'publish', selectIndex: 3 }
  ];

  $: currentSelectedIndex = workflowNodes.indexOf(workflow.selectedWorkflow);
  $: maxActive = currentSelectedIndex >= 0 ? currentSelectedIndex + (currentSelectedIndex >= 1 ? 1 : 0) : -1;

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

  function toggleAutoPublish(): void {
    const newEnabled = !autoEnabled;
    const newIntegrations = newEnabled && workflow.integrations.length > 0 ? workflow.integrations.map(i => i.type) : [];
    workflowStore.updateAutoPublish(newEnabled, newIntegrations);
  }

  function toggleIntegration(type: string): void {
    const newIntegrations = selectedIntegrations.includes(type)
      ? selectedIntegrations.filter(t => t !== type)
      : [...selectedIntegrations, type];
    workflowStore.updateAutoPublish(true, newIntegrations);
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
          }, 500)
        }, 500);
      }, 50);
    }

    try {
      await workflowStore.loadWorkflow(projectId);
      await workflowStore.loadIntegrations(projectId);

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
  
  $: canSelectAndConfigure = noWorkflow || isPaused || isCompleted;
  $: canEditFrequency = noWorkflow || workflow.isEditing || isPaused || isCompleted;

  // Determine competitor node active state (visual only - doesn't affect workflow)
  $: showCompetitorActive = selectedCompetitors || competitorEnabled;
</script>

{#if loading}
  <div class="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
    <div class="text-center">
      <p class="text-lg font-medium text-gray-950 mb-4 font-[Poppins]">Loading Nai...</p>
      <div class="w-64 bg-gray-200 rounded-full h-2">
        <div 
          class="bg-gray-950 h-2 rounded-full transition-all duration-1000 ease-out"
          style="width: {fakeProgress}%"
        ></div>
      </div>
    </div>
  </div>
{:else}
  <div class="grid grid-cols-12 gap-4 sm:gap-8">
    <div class="col-span-12 lg:col-span-8">
      <div class="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6 sm:mb-8">
          <h2 class="text-base sm:text-lg font-semibold text-gray-950">Workflow</h2>
          
          {#if isWorkflowRunning}
            <div class="flex items-center gap-2">
              <RefreshCw class="w-4 h-4 animate-spin text-blue-600" />
              <span class="text-xs text-gray-500">{workflow.progressMessage || 'Processing...'}</span>
            </div>
          {/if}
        </div>
        
        {#if workflow.scheduledNotification}
          <div class="mb-4 sm:mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
            <AlertCircle class="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-xs font-medium text-blue-900">{workflow.scheduledNotification.message}</p>
              <p class="text-xs text-blue-700 mt-1">{workflow.scheduledNotification.time}</p>
            </div>
            <button 
              on:click={() => workflowStore.clearNotification()}
              class="text-blue-400 hover:text-blue-600 flex-shrink-0 text-lg leading-none"
            >
              ×
            </button>
          </div>
        {/if}
        
        <div class="flex items-center justify-between mb-8 sm:mb-12 {!canSelectAndConfigure ? 'opacity-50 pointer-events-none' : ''}">
          {#each displayNodes as node, i}
            {#if i > 0}
              <div class="flex-1 h-0.5 {(i <= maxActive || (node.isCompetitors && showCompetitorActive)) ? 'bg-gray-900' : 'bg-gray-200'} mx-1 sm:mx-3 transition-colors"></div>
            {/if}
            
            {#if node.selectIndex !== undefined}
              <button 
                on:click={() => selectNode(node.selectIndex)} 
                disabled={!canSelectAndConfigure}
                class="flex flex-col items-center group flex-shrink-0"
              >
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full {(i <= maxActive) ? 'bg-gray-950' : 'bg-gray-50 border border-gray-300'} shadow-sm flex items-center justify-center mb-2 group-hover:shadow-md transition-all {canSelectAndConfigure ? 'group-hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}">
                  <svelte:component this={node.icon} class="w-6 h-6 sm:w-8 sm:h-8 {(i <= maxActive) ? 'text-white' : 'text-gray-400'} transition-colors" />
                </div>
                <span class="text-xs font-medium {(i <= maxActive) ? 'text-gray-950' : 'text-gray-500'} transition-colors">
                  {node.label}
                </span>
                {#if node.completedKey && isStepCompleted(node.completedKey)}
                  <span class="text-xs text-emerald-600 mt-1">✓</span>
                {/if}
              </button>
            {:else if node.isCompetitors}
              <button 
                on:click={toggleCompetitors}
                disabled={!canSelectAndConfigure}
                class="flex flex-col items-center group flex-shrink-0"
              >
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full {showCompetitorActive ? 'bg-gray-950' : 'bg-gray-50 border border-gray-300'} shadow-sm flex items-center justify-center mb-2 transition-all {canSelectAndConfigure ? 'group-hover:shadow-md group-hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}">
                  <svelte:component this={node.icon} class="w-6 h-6 sm:w-8 sm:h-8 {showCompetitorActive ? 'text-white' : 'text-gray-400'} transition-colors" />
                </div>
                <span class="text-xs font-medium {showCompetitorActive ? 'text-gray-950' : 'text-gray-500'} transition-colors">
                  {node.label}
                </span>
                {#if node.completedKey && isStepCompleted(node.completedKey)}
                  <span class="text-xs text-emerald-600 mt-1">✓</span>
                {/if}
              </button>
            {:else}
              <div class="flex flex-col items-center group flex-shrink-0">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full {(i <= maxActive) ? 'bg-gray-950' : 'bg-gray-50 border border-gray-300'} shadow-sm flex items-center justify-center mb-2 group-hover:shadow-md transition-all cursor-default">
                  <svelte:component this={node.icon} class="w-6 h-6 sm:w-8 sm:h-8 {(i <= maxActive) ? 'text-white' : 'text-gray-400'} transition-colors" />
                </div>
                <span class="text-xs font-medium {(i <= maxActive) ? 'text-gray-950' : 'text-gray-500'} transition-colors">
                  {node.label}
                </span>
                {#if node.completedKey && isStepCompleted(node.completedKey)}
                  <span class="text-xs text-emerald-600 mt-1">✓</span>
                {/if}
              </div>
            {/if}
          {/each}
        </div>

        {#if showAutoPublish}
          <div class="border-t border-gray-100 pt-6 sm:pt-8">
            <div class="flex items-center justify-between mb-4 sm:mb-6">
              <h3 class="text-xs font-semibold text-gray-950 uppercase tracking-wide flex items-center gap-2">
                <Globe class="w-3 h-3" />
                Auto Publish
              </h3>
            </div>
            
            <label class="flex items-center space-x-3 mb-4">
              <input 
                type="checkbox" 
                checked={autoEnabled}
                on:change={toggleAutoPublish}
                class="rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                disabled={!canSelectAndConfigure}
              />
              <span class="text-sm text-gray-700">Automatically publish generated posts to connected integrations</span>
            </label>

            {#if autoEnabled}
              <div class="pl-6 space-y-3">
                {#if workflow.integrations.length === 0}
                  <div class="text-center py-4 bg-gray-50 rounded-lg">
                    <p class="text-sm text-gray-500 mb-2">No integrations connected yet.</p>
                    <a 
                      href={`/project/${projectId}/integration`}
                      class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                    >
                      <Globe class="w-3 h-3" />
                      Connect an integration
                    </a>
                  </div>
                {:else}
                  <div class="space-y-2">
                    {#each workflow.integrations as int}
                      <label class="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={selectedIntegrations.includes(int.type)}
                          on:change={() => toggleIntegration(int.type)}
                          class="rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                        <span class="text-sm text-gray-700 capitalize">
                          {int.get_type_display || int.type} {int.name ? `(${int.config.site_url})` : ''}
                        </span>
                      </label>
                    {/each}
                  </div>
                  {#if selectedIntegrations.length === 0}
                    <p class="text-xs text-orange-600 mt-2 pl-2">Select at least one integration to enable auto-publishing.</p>
                  {/if}
                {/if}
              </div>
            {/if}
          </div>
        {/if}

        <div class="border-t border-gray-100 pt-6 sm:pt-8 ">
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <h3 class="text-xs font-semibold text-gray-950 uppercase tracking-wide">Frequency</h3>
          </div>
          
          {#if workflow.nextRun && !workflow.isEditing}
            <p class="text-xs text-gray-500 mb-3">
              Next: {new Date(workflow.nextRun).toLocaleDateString()} at {new Date(workflow.nextRun).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          {/if}

          <div class="flex gap-2 items-center flex-wrap">
            {#if canEditFrequency}
              {#each ['daily', '2days', '3days', 'weekly'] as freq}
                <button 
                  on:click={() => setFrequency(freq)} 
                  class="px-4 py-2 rounded-lg text-xs font-medium transition-all {workflow.selectedFrequency === freq ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
                >
                  {freq === 'daily' ? 'Daily' : freq === '2days' ? '2 Days' : freq === '3days' ? '3 Days' : 'Weekly'}
                </button>
              {/each}
            {/if}

            <div class="flex-1"></div>

            {#if noWorkflow}
              <button 
                on:click={createAndRun} 
                disabled={isSubmitting}
                class="px-4 py-2 rounded-lg bg-gray-950 text-white text-xs font-semibold shadow-sm hover:bg-gray-800 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                title="Create and run workflow"
              >
                {#if isSubmitting}
                  <RefreshCw class="w-4 h-4 animate-spin" />
                {:else}
                  <Play class="w-4 h-4 fill-white" />
                {/if}
                Create & Run
              </button>
            {/if}

            {#if !isPaused}
              <button 
                on:click={pauseWorkflow}
                disabled={isSubmitting}
                class="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold shadow-sm hover:bg-red-700 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                title="Pause workflow"
              >
                {#if isSubmitting}
                  <RefreshCw class="w-4 h-4 animate-spin" />
                {:else}
                  <Square class="w-4 h-4 fill-white" />
                {/if}
                Pause
              </button>
            {/if}

            {#if isPaused }
              <button 
                on:click={resumeWorkflow}
                disabled={isSubmitting}
                class="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold shadow-sm hover:bg-emerald-700 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                title="Resume workflow"
              >
                {#if isSubmitting}
                  <RefreshCw class="w-4 h-4 animate-spin" />
                {:else}
                  <Play class="w-4 h-4 fill-white" />
                {/if}
                Resume
              </button>
            {/if}

            {#if workflow.taskId && !isWorkflowRunning && !workflow.isEditing}
              <button 
                on:click={startEdit}
                class="px-4 py-2 rounded-lg bg-gray-950 text-white text-xs font-semibold shadow-sm hover:bg-gray-800 hover:shadow-md transition-all flex items-center gap-2"
                title="Edit workflow"
              >
                <Pencil class="w-4 h-4" />
                Edit
              </button>
            {/if}

            {#if workflow.isEditing}
              <button 
                on:click={submitEdit} 
                disabled={isSubmitting}
                class="px-4 py-2 rounded-lg bg-gray-950 text-white text-xs font-semibold shadow-sm hover:bg-gray-800 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {#if isSubmitting}
                  <RefreshCw class="w-4 h-4 animate-spin" />
                {:else}
                  <Check class="w-4 h-4" />
                {/if}
                Save
              </button>
              <button 
                on:click={cancelEdit} 
                disabled={isSubmitting}
                class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-12 lg:col-span-4">
      <div class="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
        <h2 class="text-base sm:text-lg font-semibold text-gray-950 mb-4 sm:mb-6">Progress</h2>
        
        {#if workflow.taskId}
          <div class="space-y-4 mb-6">
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-medium text-gray-600 uppercase tracking-wide">Status</span>
                <span class="text-xs font-bold {workflow.status === 'running' ? 'text-blue-600' : workflow.status === 'pending' ? 'text-amber-600' : workflow.status === 'completed' ? 'text-emerald-600' : workflow.status === 'failed' ? 'text-red-600' : 'text-gray-600'}">
                  {workflow.status.toUpperCase()}
                </span>
              </div>
              
              {#if workflow.progressMessage}
                <p class="text-xs text-gray-500">{workflow.progressMessage}</p>
              {/if}
            </div>

            <div class="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <span class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-3 block">Progress</span>
              <div class="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div 
                  class="bg-gray-950 h-1.5 rounded-full transition-all duration-500"
                  style="width: {progress}%"
                ></div>
              </div>
              <p class="text-xs text-gray-500">
                {workflow.completedSteps?.length || 0} of {steps.length} steps
              </p>
            </div>

            {#if workflow.completedSteps?.length > 0}
              <div class="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <span class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2 block">Completed</span>
                <ul class="space-y-1">
                  {#each workflow.completedSteps as step}
                    <li class="text-xs text-emerald-600 flex items-center gap-2">
                      <span class="w-3 h-3 bg-emerald-600 rounded-full flex-shrink-0"></span>
                      {step.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        {:else}
          <div class="text-center py-8">
            <p class="text-xs text-gray-500">No active workflow</p>
            <p class="text-xs text-gray-400 mt-1">Configure and run to see progress</p>
          </div>
        {/if}

        <div class="border-t border-gray-100 pt-4 sm:pt-6">
          <h3 class="text-xs font-semibold text-gray-950 uppercase tracking-wide mb-4">Config</h3>
          <div class="space-y-3">
            <div class="flex items-start space-x-2">
              <div class="w-7 h-7 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <Search class="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-gray-900 font-medium text-xs">Type</p>
                <p class="text-gray-600 text-xs capitalize">{workflow.selectedWorkflow.replace(/_/g, ' ')}</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-2">
              <div class="w-7 h-7 bg-purple-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp class="w-3.5 h-3.5 text-purple-600" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-gray-900 font-medium text-xs">Frequency</p>
                <p class="text-gray-600 text-xs capitalize">{workflow.selectedFrequency.replace('days', ' days')}</p>
              </div>
            </div>

            {#if showCompetitorActive}
              <div class="flex items-start space-x-2">
                <div class="w-7 h-7 bg-amber-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp class="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-gray-900 font-medium text-xs">Competitors</p>
                  <p class="text-gray-600 text-xs">Enabled</p>
                </div>
              </div>
            {/if}

            {#if workflow.config.auto_publish.enabled}
              <div class="flex items-start space-x-2">
                <div class="w-7 h-7 bg-green-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Globe class="w-3.5 h-3.5 text-green-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-gray-900 font-medium text-xs">Auto Publish</p>
                  <p class="text-gray-600 text-xs">Enabled for {workflow.config.auto_publish.integrations.length} integration(s)</p>
                </div>
              </div>
            {/if}
          </div>
        </div>

        <div class="border-t border-gray-100 pt-4 sm:pt-6 mt-4 sm:mt-6">
          <h3 class="text-xs font-semibold text-gray-950 uppercase tracking-wide mb-4">Generated</h3>
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-600">Keywords</span>
              <span class="font-semibold text-gray-950">
                {content.keywordsLoading ? '...' : content.keywords.length}
              </span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-600">Outlines</span>
              <span class="font-semibold text-gray-950">
                {content.outlinesLoading ? '...' : content.outlines.length}
              </span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-600">Posts</span>
              <span class="font-semibold text-gray-950">
                {content.postsLoading ? '...' : content.blogPosts.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col sm:flex-row sm:justify-evenly items-start gap-2 sm:gap-4 p-2 sm:p-4 mt-4 sm:mt-8">
    <TopComp {projectId} />
    <Keywords {projectId}/>
  </div>
{/if}