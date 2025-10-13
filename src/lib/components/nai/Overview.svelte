<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { Search, FileText, TrendingUp, Target, RefreshCw, Play, Square, Edit2, AlertCircle, Check } from 'lucide-svelte';
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
  let hasHandledCompletion = false; // ADD THIS FLAG

  const workflowNodes: Array<'keyword_research' | 'generate_outlines' | 'generate_posts' | 'full_workflow'> = [
    'keyword_research',
    'generate_outlines',
    'generate_posts',
    'full_workflow'
  ];

  function selectNode(index: number): void {
    const selectedWorkflow = workflowNodes[index];
    workflowStore.updateSelection(selectedWorkflow, workflow.selectedFrequency);
  }

  function setFrequency(freq: string): void {
    workflowStore.updateSelection(workflow.selectedWorkflow, freq);
  }

  async function runWorkflow(): Promise<void> {
    if (isSubmitting) return;
    isSubmitting = true;

    try {
      await workflowStore.runWorkflow(projectId);
      dispatch('workflowStarted', { task_id: workflow.taskId });
      await contentStore.loadAll(projectId);
    } catch (error: any) {
      console.error('Error running workflow:', error);
    } finally {
      isSubmitting = false;
    }
  }

  async function stopWorkflow(): Promise<void> {
    if (isSubmitting) return;
    isSubmitting = true;

    try {
      await workflowStore.stopWorkflow();
      dispatch('workflowStopped');
    } catch (error) {
      console.error('Error stopping workflow:', error);
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
        selectedFrequency: workflow.selectedFrequency
      });
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
    await workflowStore.loadWorkflow(projectId);
    await contentStore.loadAll(projectId);

    if (workflow.taskId && (workflow.status === 'running' || workflow.status === 'pending')) {
      dispatch('workflowLoaded', { task_id: workflow.taskId });
    }
  });

  onDestroy(() => {
    workflowStore.destroy();
  });

  // FIXED: Only reload when status CHANGES to 'completed', not on every render
  $: if (workflow.status === 'completed' && !hasHandledCompletion) {
    hasHandledCompletion = true;
    contentStore.loadAll(projectId);
    dispatch('workflowComplete', workflow);
  }

  // Reset flag when workflow status changes away from completed
  $: if (workflow.status !== 'completed') {
    hasHandledCompletion = false;
  }

  $: isWorkflowRunning = workflow.status === 'running' || workflow.status === 'pending';
  $: isFailed = workflow.status === 'failed';
  $: noActiveWorkflow = !workflow.isActive;
  
  $: canTrigger = noActiveWorkflow || isFailed;
  $: canSelectNodes = workflow.isEditing || noActiveWorkflow;
  $: showFrequencyButtons = workflow.isEditing || noActiveWorkflow;
</script>

<div class="grid grid-cols-12 gap-8">
  <div class="col-span-12 lg:col-span-8">
    <div class="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 shadow-lg border border-gray-100">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-xl font-semibold text-gray-900">Agent Workflow</h2>
        
        {#if isWorkflowRunning}
          <div class="flex items-center gap-2">
            <RefreshCw class="w-4 h-4 animate-spin text-blue-600" />
            <span class="text-sm text-gray-600">{workflow.progressMessage || 'Processing...'}</span>
          </div>
        {/if}
      </div>
      
      <!-- Scheduled Notification -->
      {#if workflow.scheduledNotification}
        <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <AlertCircle class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div class="flex-1">
            <p class="text-sm font-medium text-blue-900">{workflow.scheduledNotification.message}</p>
            <p class="text-xs text-blue-700 mt-1">{workflow.scheduledNotification.time}</p>
          </div>
          <button 
            on:click={() => workflowStore.clearNotification()}
            class="text-blue-400 hover:text-blue-600 flex-shrink-0"
          >
            ×
          </button>
        </div>
      {/if}
      
      <!-- Workflow Steps Visualization -->
      <div class="flex items-center justify-between mb-12 {!canSelectNodes ? 'opacity-60 pointer-events-none' : ''}">
        <button 
          on:click={() => selectNode(0)} 
          disabled={!canSelectNodes}
          class="flex flex-col items-center group"
        >
          <div class="w-20 h-20 rounded-full {steps.includes(0) ? 'bg-gray-900' : 'bg-gray-50 border-2 border-gray-200'} shadow-xl flex items-center justify-center mb-3 group-hover:shadow-2xl transition-all group-hover:scale-105 {!canSelectNodes ? 'cursor-not-allowed' : 'cursor-pointer'}">
            <Search class="w-8 h-8 {steps.includes(0) ? 'text-white' : 'text-gray-400'} transition-colors" />
          </div>
          <span class="text-sm font-medium {steps.includes(0) ? 'text-gray-900' : 'text-gray-500'} transition-colors">Keyword Research</span>
          {#if isStepCompleted('keyword_research')}
            <span class="text-xs text-green-600 mt-1">✓ Completed</span>
          {/if}
        </button>

        <div class="flex-1 h-0.5 {steps.includes(1) ? 'bg-gray-900' : 'bg-gray-200'} mx-4 transition-colors"></div>

        <button 
          on:click={() => selectNode(1)} 
          disabled={!canSelectNodes}
          class="flex flex-col items-center group"
        >
          <div class="w-20 h-20 rounded-full {steps.includes(1) ? 'bg-gray-900' : 'bg-gray-50 border-2 border-gray-200'} shadow-md flex items-center justify-center mb-3 group-hover:shadow-xl transition-all group-hover:scale-105 {!canSelectNodes ? 'cursor-not-allowed' : 'cursor-pointer'}">
            <FileText class="w-8 h-8 {steps.includes(1) ? 'text-white' : 'text-gray-400'} transition-colors" />
          </div>
          <span class="text-sm font-medium {steps.includes(1) ? 'text-gray-900' : 'text-gray-500'} transition-colors">Create Outlines</span>
          {#if isStepCompleted('outline_generation')}
            <span class="text-xs text-green-600 mt-1">✓ Completed</span>
          {/if}
        </button>

        <div class="flex-1 h-0.5 {steps.includes(2) ? 'bg-gray-900' : 'bg-gray-200'} mx-4 transition-colors"></div>

        <button 
          on:click={() => selectNode(2)} 
          disabled={!canSelectNodes}
          class="flex flex-col items-center group"
        >
          <div class="w-20 h-20 rounded-full {steps.includes(2) ? 'bg-gray-900' : 'bg-gray-50 border-2 border-gray-200'} shadow-md flex items-center justify-center mb-3 group-hover:shadow-xl transition-all group-hover:scale-105 {!canSelectNodes ? 'cursor-not-allowed' : 'cursor-pointer'}">
            <FileText class="w-8 h-8 {steps.includes(2) ? 'text-white' : 'text-gray-400'} transition-colors" />
          </div>
          <span class="text-sm font-medium {steps.includes(2) ? 'text-gray-900' : 'text-gray-500'} transition-colors">Generate Posts</span>
          {#if isStepCompleted('blog_post_generation')}
            <span class="text-xs text-green-600 mt-1">✓ Completed</span>
          {/if}
        </button>

        <div class="flex-1 h-0.5 {steps.includes(3) ? 'bg-gray-900' : 'bg-gray-200'} mx-4 transition-colors"></div>

        <button 
          on:click={() => selectNode(3)} 
          disabled={!canSelectNodes}
          class="flex flex-col items-center group"
        >
          <div class="w-20 h-20 rounded-full {steps.includes(3) ? 'bg-gray-900' : 'bg-gray-50 border-2 border-gray-200'} shadow-md flex items-center justify-center mb-3 group-hover:shadow-xl transition-all group-hover:scale-105 {!canSelectNodes ? 'cursor-not-allowed' : 'cursor-pointer'}">
            <Target class="w-8 h-8 {steps.includes(3) ? 'text-white' : 'text-gray-400'} transition-colors" />
          </div>
          <span class="text-sm font-medium {steps.includes(3) ? 'text-gray-900' : 'text-gray-500'} transition-colors">Find & Publish</span>
          {#if isStepCompleted('publish')}
            <span class="text-xs text-green-600 mt-1">✓ Completed</span>
          {/if}
        </button>
      </div>

      <!-- Configuration Panel -->
      <div class="border-t border-gray-200 pt-8 bg-white/50 -mx-8 px-8 -mb-8 pb-8 rounded-b-2xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-sm font-semibold text-gray-900">Run Frequency</h3>
          {#if !workflow.isEditing && workflow.isActive}
            <button on:click={startEdit} class="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Edit2 class="w-3 h-3" />
              Edit
            </button>
          {/if}
        </div>
        
        {#if workflow.nextRun && !workflow.isEditing}
          <p class="text-xs text-gray-500 mb-4">
            Next run scheduled: {new Date(workflow.nextRun).toLocaleString()}
          </p>
        {/if}

        {#if workflow.lastRun && !workflow.isEditing}
          <p class="text-xs text-gray-400 mb-4">
            Last run: {new Date(workflow.lastRun).toLocaleString()}
          </p>
        {/if}

        {#if showFrequencyButtons}
          <div class="flex gap-3 items-center flex-wrap mb-4">
            <button 
              on:click={() => setFrequency('daily')} 
              class="px-6 py-2.5 rounded-full {workflow.selectedFrequency === 'daily' ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'} text-sm font-medium hover:shadow-lg transition-all"
            >
              Daily
            </button>
            <button 
              on:click={() => setFrequency('2days')} 
              class="px-6 py-2.5 rounded-full {workflow.selectedFrequency === '2days' ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'} text-sm font-medium hover:shadow-lg transition-all"
            >
              Every 2 Days
            </button>
            <button 
              on:click={() => setFrequency('3days')} 
              class="px-6 py-2.5 rounded-full {workflow.selectedFrequency === '3days' ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'} text-sm font-medium hover:shadow-lg transition-all"
            >
              Every 3 Days
            </button>
            <button 
              on:click={() => setFrequency('weekly')} 
              class="px-6 py-2.5 rounded-full {workflow.selectedFrequency === 'weekly' ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'} text-sm font-medium hover:shadow-lg transition-all"
            >
              Weekly
            </button>
          </div>
        {/if}

        <div class="flex gap-3 items-center justify-between flex-wrap">
          <div />

          <div class="flex gap-3 items-center flex-wrap">
            {#if canTrigger}
              <!-- PLAY BUTTON: No active workflow or failed -->
              <button 
                on:click={runWorkflow} 
                disabled={isSubmitting}
                class="w-14 h-14 rounded-full bg-zinc-900 text-white shadow-md hover:bg-zinc-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                title="Run Workflow"
              >
                {#if isSubmitting}
                  <RefreshCw class="w-6 h-6 animate-spin" />
                {:else}
                  <Play class="w-6 h-6 fill-white" />
                {/if}
              </button>
            {:else if isWorkflowRunning}
              <!-- STOP BUTTON: Workflow is running/pending -->
              <button 
                on:click={stopWorkflow}
                disabled={isSubmitting}
                class="w-14 h-14 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                title="Stop Workflow"
              >
                <Square class="w-6 h-6 fill-white" />
              </button>
            {:else if workflow.isActive}
              <!-- STOP BUTTON: Workflow is scheduled/active but not running -->
              <button 
                on:click={stopWorkflow}
                disabled={isSubmitting}
                class="w-14 h-14 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                title="Stop Scheduled Workflow"
              >
                <Square class="w-6 h-6 fill-white" />
              </button>
            {/if}

            {#if workflow.isEditing}
              <button 
                on:click={submitEdit} 
                disabled={isSubmitting}
                class="px-8 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-semibold shadow-md hover:bg-zinc-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {#if isSubmitting}
                  <RefreshCw class="w-4 h-4 animate-spin" />
                  Saving...
                {:else}
                  <Check class="w-4 h-4" />
                  Save
                {/if}
              </button>
              <button 
                on:click={cancelEdit} 
                disabled={isSubmitting}
                class="px-6 py-2.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Progress Sidebar -->
  <div class="col-span-12 lg:col-span-4">
    <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Workflow Progress</h2>
      
      {#if workflow.taskId}
        <div class="space-y-4 mb-6">
          <div class="bg-white rounded-lg p-4 border border-gray-100">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Status</span>
              <span class="text-sm font-semibold {workflow.status === 'running' ? 'text-blue-600' : workflow.status === 'pending' ? 'text-yellow-600' : workflow.status === 'completed' ? 'text-green-600' : workflow.status === 'failed' ? 'text-red-600' : 'text-gray-600'}">
                {workflow.status.toUpperCase()}
              </span>
            </div>
            
            {#if workflow.progressMessage}
              <p class="text-xs text-gray-500">{workflow.progressMessage}</p>
            {/if}
          </div>

          <div class="bg-white rounded-lg p-4 border border-gray-100">
            <span class="text-sm font-medium text-gray-700 mb-2 block">Progress</span>
            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                class="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style="width: {progress}%"
              ></div>
            </div>
            <p class="text-xs text-gray-500">
              {workflow.completedSteps?.length || 0} of {steps.length} steps completed
            </p>
          </div>

          {#if workflow.completedSteps?.length > 0}
            <div class="bg-white rounded-lg p-4 border border-gray-100">
              <span class="text-sm font-medium text-gray-700 mb-2 block">Completed Steps</span>
              <ul class="space-y-1">
                {#each workflow.completedSteps as step}
                  <li class="text-xs text-green-600 flex items-center gap-2">
                    <span class="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-xs">✓</span>
                    {step.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {:else}
        <div class="text-center py-8">
          <p class="text-sm text-gray-500">No active workflow</p>
          <p class="text-xs text-gray-400 mt-2">Configure and run a workflow to see progress here</p>
        </div>
      {/if}

      <div class="border-t border-gray-200 pt-6">
        <h3 class="text-sm font-semibold text-gray-900 mb-4">Configuration</h3>
        <div class="space-y-3">
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Search class="w-4 h-4 text-blue-600" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-gray-900 font-medium text-sm">Workflow Type</p>
              <p class="text-gray-600 text-sm capitalize">{workflow.selectedWorkflow.replace(/_/g, ' ')}</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp class="w-4 h-4 text-purple-600" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-gray-900 font-medium text-sm">Frequency</p>
              <p class="text-gray-600 text-sm capitalize">{workflow.selectedFrequency.replace('days', ' days')}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Summary -->
      <div class="border-t border-gray-200 pt-6 mt-6">
        <h3 class="text-sm font-semibold text-gray-900 mb-4">Generated Content</h3>
        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Keywords</span>
            <span class="font-semibold text-gray-900">
              {content.keywordsLoading ? '...' : content.keywords.length}
            </span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Outlines</span>
            <span class="font-semibold text-gray-900">
              {content.outlinesLoading ? '...' : content.outlines.length}
            </span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Blog Posts</span>
            <span class="font-semibold text-gray-900">
              {content.postsLoading ? '...' : content.blogPosts.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="flex justify-evenly items-start gap-2 p-2">
  <TopComp {projectId} />
  <Keywords {projectId}/>
</div>