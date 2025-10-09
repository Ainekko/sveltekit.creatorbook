<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { Search, FileText, TrendingUp, Target, RefreshCw } from 'lucide-svelte';
  import { workflowStore, contentStore, activeSteps, progressPercent } from '$lib/components/nai/stores';
	import Keywords from './Keywords.svelte';

  export let projectId: string;

  const dispatch = createEventDispatcher();

  // Subscribe to stores
  $: workflow = $workflowStore;
  $: content = $contentStore;
  $: steps = $activeSteps;
  $: progress = $progressPercent;

  let isSubmitting = false;

  // Map workflow types to node indices for UI
  const workflowNodes = ['keyword_research', 'generate_outlines', 'generate_posts', 'full_workflow'];

  function selectNode(index: number) {
    if (workflow.status === 'running' || workflow.status === 'pending') return;
    
    const selectedWorkflow = workflowNodes[index] as typeof workflow.selectedWorkflow;
    workflowStore.updateSelection(selectedWorkflow, workflow.selectedFrequency);
  }

  function setFrequency(freq: string) {
    if (workflow.status === 'running' || workflow.status === 'pending') return;
    workflowStore.updateSelection(workflow.selectedWorkflow, freq);
  }

  async function runWorkflow() {
    if (isSubmitting) return;
    isSubmitting = true;

    try {
      await workflowStore.runWorkflow(projectId);
      dispatch('workflowStarted', { task_id: workflow.taskId });
      
      // Load content after workflow starts
      await contentStore.loadAll(projectId);
    } catch (error: any) {
      alert(error.message || 'Failed to start workflow');
    } finally {
      isSubmitting = false;
    }
  }

  async function stopWorkflow() {
    try {
      await workflowStore.stopWorkflow();
      dispatch('workflowStopped');
    } catch (error) {
      console.error('Error stopping workflow:', error);
    }
  }

  async function toggleWorkflow() {
    if (!workflow.taskId) return;
    
    try {
      await workflowStore.updateWorkflow({ 
        isActive: !workflow.isActive 
      });
    } catch (error) {
      console.error('Error toggling workflow:', error);
    }
  }

  async function updateFrequency(newFrequency: string) {
    if (!workflow.taskId) return;
    
    try {
      await workflowStore.updateWorkflow({ 
        frequency: newFrequency 
      });
    } catch (error) {
      console.error('Error updating frequency:', error);
    }
  }

  function isStepCompleted(stepName: string): boolean {
    return workflow.completedSteps?.includes(stepName) || false;
  }

  onMount(async () => {
    // Load existing workflow for this project
    await workflowStore.loadWorkflow(projectId);
    
    // Load content data
    await contentStore.loadAll(projectId);

    // Dispatch workflow loaded event if there's an active workflow
    if (workflow.taskId && (workflow.status === 'running' || workflow.status === 'pending')) {
      dispatch('workflowLoaded', { task_id: workflow.taskId });
    }
  });

  onDestroy(() => {
    workflowStore.destroy();
  });

  // Watch for completed workflows to reload content
  $: if (workflow.status === 'completed') {
    contentStore.loadAll(projectId);
    dispatch('workflowComplete', workflow);
  }

  $: isWorkflowActive = workflow.status === 'running' || workflow.status === 'pending';
  $: canModify = !isWorkflowActive;
</script>

<div class="grid grid-cols-12 gap-8">
  <div class="col-span-12 lg:col-span-8">
    <div class="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 shadow-lg border border-gray-100">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-xl font-semibold text-gray-900">Agent Workflow</h2>
        
        {#if isWorkflowActive}
          <div class="flex items-center gap-2">
            <RefreshCw class="w-4 h-4 animate-spin text-blue-600" />
            <span class="text-sm text-gray-600">{workflow.progressMessage || 'Processing...'}</span>
          </div>
        {/if}
      </div>
      
      <!-- Workflow Steps Visualization -->
      <div class="flex items-center justify-between mb-12">
        <button 
          on:click={() => selectNode(0)} 
          disabled={isWorkflowActive}
          class="flex flex-col items-center group"
        >
          <div class="w-20 h-20 rounded-full {steps.includes(0) ? 'bg-gray-900' : 'bg-gray-50 border-2 border-gray-200'} shadow-xl flex items-center justify-center mb-3 group-hover:shadow-2xl transition-all group-hover:scale-105 {isWorkflowActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}">
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
          disabled={isWorkflowActive}
          class="flex flex-col items-center group"
        >
          <div class="w-20 h-20 rounded-full {steps.includes(1) ? 'bg-gray-900' : 'bg-gray-50 border-2 border-gray-200'} shadow-md flex items-center justify-center mb-3 group-hover:shadow-xl transition-all group-hover:scale-105 {isWorkflowActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}">
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
          disabled={isWorkflowActive}
          class="flex flex-col items-center group"
        >
          <div class="w-20 h-20 rounded-full {steps.includes(2) ? 'bg-gray-900' : 'bg-gray-50 border-2 border-gray-200'} shadow-md flex items-center justify-center mb-3 group-hover:shadow-xl transition-all group-hover:scale-105 {isWorkflowActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}">
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
          disabled={isWorkflowActive}
          class="flex flex-col items-center group"
        >
          <div class="w-20 h-20 rounded-full {steps.includes(3) ? 'bg-gray-900' : 'bg-gray-50 border-2 border-gray-200'} shadow-md flex items-center justify-center mb-3 group-hover:shadow-xl transition-all group-hover:scale-105 {isWorkflowActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}">
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
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-900">Run Frequency</h3>
          {#if workflow.isActive}
            <div class="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200">
              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span class="text-xs font-medium text-emerald-700">Active</span>
            </div>
          {/if}
        </div>
        
        {#if workflow.nextRun}
          <p class="text-xs text-gray-500 mb-4">
            Next run scheduled: {new Date(workflow.nextRun).toLocaleString()}
          </p>
        {/if}

        {#if workflow.lastRun}
          <p class="text-xs text-gray-400 mb-4">
            Last run: {new Date(workflow.lastRun).toLocaleString()}
          </p>
        {/if}

        <div class="flex gap-3 items-center flex-wrap">
          <button 
            on:click={() => setFrequency('daily')} 
            disabled={!canModify}
            class="px-6 py-2.5 rounded-full {workflow.selectedFrequency === 'daily' ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'} text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Daily
          </button>
          <button 
            on:click={() => setFrequency('2days')} 
            disabled={!canModify}
            class="px-6 py-2.5 rounded-full {workflow.selectedFrequency === '2days' ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'} text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Every 2 Days
          </button>
          <button 
            on:click={() => setFrequency('3days')} 
            disabled={!canModify}
            class="px-6 py-2.5 rounded-full {workflow.selectedFrequency === '3days' ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'} text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Every 3 Days
          </button>
          <button 
            on:click={() => setFrequency('weekly')} 
            disabled={!canModify}
            class="px-6 py-2.5 rounded-full {workflow.selectedFrequency === 'weekly' ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'} text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Weekly
          </button>
          
          <div class="flex-1"></div>
          
          {#if !workflow.taskId || workflow.status === 'idle' || workflow.status === 'completed' || workflow.status === 'failed'}
            <button 
              on:click={runWorkflow} 
              disabled={isSubmitting}
              class="px-8 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-semibold shadow-md hover:bg-zinc-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {#if isSubmitting}
                <RefreshCw class="w-4 h-4 animate-spin" />
                Starting...
              {:else}
                Run Workflow
              {/if}
            </button>
          {:else if workflow.isActive}
            <button 
              on:click={stopWorkflow}
              class="px-8 py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold shadow-md hover:bg-red-700 hover:shadow-lg transition-all flex items-center gap-2"
            >
              Stop Workflow
            </button>
          {:else}
            <button 
              on:click={toggleWorkflow}
              class="px-8 py-2.5 rounded-full bg-green-600 text-white text-sm font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition-all flex items-center gap-2"
            >
              Resume Workflow
            </button>
          {/if}
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
                    <span class="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">✓</span>
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

<Keywords {projectId}/>