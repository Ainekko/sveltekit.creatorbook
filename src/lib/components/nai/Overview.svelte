<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { Search, FileText, TrendingUp, Target, RefreshCw } from 'lucide-svelte';

  export let projectId: string;
  let apiBaseUrl: string = 'http://127.0.0.1:8000';
  const authToken = localStorage.getItem('token')

  const dispatch = createEventDispatcher();

  let selectedNodes = [true, false, false, false];
  let selectedFrequency = 'daily';
  let isActive = false;
  let isSubmitting = false;
  let currentTaskId: string | null = null;
  let taskStatus: any = null;
  let pollingInterval: any = null;

  // Poll for task status every 3 seconds when active
  async function pollTaskStatus() {
    if (!currentTaskId) return;

    try {
      const response = await fetch(
        `${apiBaseUrl}/orion/api/workflow_status/?task_id=${currentTaskId}`,
        {
          headers: {
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        taskStatus = await response.json();
        
        // Stop polling if task is completed or failed
        if (taskStatus.status === 'completed' || taskStatus.status === 'failed') {
          isActive = false;
          stopPolling();
          dispatch('workflowComplete', taskStatus);
        } else if (taskStatus.status === 'running' || taskStatus.status === 'pending') {
          isActive = true;
        }
      }
    } catch (error) {
      console.error('Error polling task status:', error);
    }
  }

  function startPolling() {
    if (pollingInterval) clearInterval(pollingInterval);
    pollingInterval = setInterval(pollTaskStatus, 3000);
  }

  function stopPolling() {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
  }

  function toggleNode(index: number) {
    if (!isActive) {
      selectedNodes[index] = !selectedNodes[index];
    }
  }

  function setFrequency(freq: string) {
    if (!isActive) {
      selectedFrequency = freq;
    }
  }

  async function runWorkflow() {
    isSubmitting = true;

    try {
      // Step 1: Create the workflow task
      const createResponse = await fetch(`${apiBaseUrl}/orion/api/create_workflow/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: projectId,
          workflow_config: {
            nodes: selectedNodes,
            frequency: selectedFrequency
          }
        })
      });

      if (!createResponse.ok) {
        const error = await createResponse.json();
        alert(error.detail || 'Failed to create workflow');
        return;
      }

      const createData = await createResponse.json();
      currentTaskId = createData.task_id;

      // Step 2: Trigger the workflow execution
      const triggerResponse = await fetch('http://127.0.0.1:8000/orion/api/trigger_task/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task_id: currentTaskId
        })
      });

      if (triggerResponse.ok) {
        isActive = true;
        
        // Start polling for status updates
        startPolling();
        pollTaskStatus(); // Poll immediately
        
        dispatch('workflowStarted', { task_id: currentTaskId });
      } else {
        const error = await triggerResponse.json();
        alert(error.detail || 'Failed to start workflow');
      }
    } catch (error) {
      console.error('Error starting workflow:', error);
      alert('Failed to start workflow');
    } finally {
      isSubmitting = false;
    }
  }

  async function stopWorkflow() {
    if (!currentTaskId) return;

    try {
      const response = await fetch(`${apiBaseUrl}/orion/api/update_workflow/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task_id: currentTaskId,
          is_active: false
        })
      });

      if (response.ok) {
        isActive = false;
        stopPolling();
        dispatch('workflowStopped');
      }
    } catch (error) {
      console.error('Error stopping workflow:', error);
    }
  }

  // Load existing workflow on mount
  onMount(async () => {
    try {
      // Check if there's an active workflow for this project
      const response = await fetch(
        `${apiBaseUrl}/orion/api/?project_id=${projectId}`,
        {
          headers: {
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        // If there's an active workflow, load its status
        if (data.active_task_id) {
          currentTaskId = data.active_task_id;
          await pollTaskStatus();
          if (taskStatus && (taskStatus.status === 'running' || taskStatus.status === 'pending')) {
            isActive = true;
            startPolling();
          }
        }
      }
    } catch (error) {
      console.error('Error loading workflow:', error);
    }
  });

  onDestroy(() => {
    stopPolling();
  });

  // Helper to determine if a step is completed
  function isStepCompleted(stepName: string): boolean {
    return taskStatus?.completed_steps?.includes(stepName) || false;
  }

  // Calculate progress percentage
  $: progressPercent = taskStatus?.completed_steps?.length 
    ? (taskStatus.completed_steps.length / selectedNodes.filter(n => n).length) * 100 
    : 0;
</script>

<div class="grid grid-cols-12 gap-8">
  <div class="col-span-12 lg:col-span-8">
    <div class="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 shadow-lg border border-gray-100">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-xl font-semibold text-gray-900">Agent Workflow</h2>
        
        {#if taskStatus?.status === 'running' || taskStatus?.status === 'pending'}
          <div class="flex items-center gap-2">
            <RefreshCw class="w-4 h-4 animate-spin text-blue-600" />
            <span class="text-sm text-gray-600">{taskStatus.progress_message || 'Processing...'}</span>
          </div>
        {/if}
      </div>
      
      <div class="flex items-center justify-between mb-12">
        <button 
          on:click={() => toggleNode(0)} 
          disabled={isActive}
          class="flex flex-col items-center group"
        >
          <div class="w-20 h-20 rounded-full {selectedNodes[0] ? 'bg-gray-900' : 'bg-gray-50 border-2 border-gray-200'} shadow-xl flex items-center justify-center mb-3 group-hover:shadow-2xl transition-all group-hover:scale-105 {isActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}">
            <Search class="w-8 h-8 {selectedNodes[0] ? 'text-white' : 'text-gray-400'} transition-colors" />
          </div>
          <span class="text-sm font-medium {selectedNodes[0] ? 'text-gray-900' : 'text-gray-500'} transition-colors">Keyword Research</span>
          {#if isStepCompleted('keyword_research')}
            <span class="text-xs text-green-600 mt-1">✓ Completed</span>
          {/if}
        </button>

        <div class="flex-1 h-0.5 bg-gray-200 mx-4"></div>

        <button 
          on:click={() => toggleNode(1)} 
          disabled={isActive}
          class="flex flex-col items-center group"
        >
          <div class="w-20 h-20 rounded-full {selectedNodes[1] ? 'bg-gray-900' : 'bg-gray-50 border-2 border-gray-200'} shadow-md flex items-center justify-center mb-3 group-hover:shadow-xl transition-all group-hover:scale-105 {isActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}">
            <FileText class="w-8 h-8 {selectedNodes[1] ? 'text-white' : 'text-gray-400'} transition-colors" />
          </div>
          <span class="text-sm font-medium {selectedNodes[1] ? 'text-gray-900' : 'text-gray-500'} transition-colors">Create Outlines</span>
          {#if isStepCompleted('outline_generation')}
            <span class="text-xs text-green-600 mt-1">✓ Completed</span>
          {/if}
        </button>

        <div class="flex-1 h-0.5 bg-gray-200 mx-4"></div>

        <button 
          on:click={() => toggleNode(2)} 
          disabled={isActive}
          class="flex flex-col items-center group"
        >
          <div class="w-20 h-20 rounded-full {selectedNodes[2] ? 'bg-gray-900' : 'bg-gray-50 border-2 border-gray-200'} shadow-md flex items-center justify-center mb-3 group-hover:shadow-xl transition-all group-hover:scale-105 {isActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}">
            <FileText class="w-8 h-8 {selectedNodes[2] ? 'text-white' : 'text-gray-400'} transition-colors" />
          </div>
          <span class="text-sm font-medium {selectedNodes[2] ? 'text-gray-900' : 'text-gray-500'} transition-colors">Generate Posts</span>
          {#if isStepCompleted('blog_post_generation')}
            <span class="text-xs text-green-600 mt-1">✓ Completed</span>
          {/if}
        </button>

        <div class="flex-1 h-0.5 bg-gray-200 mx-4"></div>

        <button 
          on:click={() => toggleNode(3)} 
          disabled={isActive}
          class="flex flex-col items-center group"
        >
          <div class="w-20 h-20 rounded-full {selectedNodes[3] ? 'bg-gray-900' : 'bg-gray-50 border-2 border-gray-200'} shadow-md flex items-center justify-center mb-3 group-hover:shadow-xl transition-all group-hover:scale-105 {isActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}">
            <Target class="w-8 h-8 {selectedNodes[3] ? 'text-white' : 'text-gray-400'} transition-colors" />
          </div>
          <span class="text-sm font-medium {selectedNodes[3] ? 'text-gray-900' : 'text-gray-500'} transition-colors">Find & Publish</span>
          {#if isStepCompleted('publish')}
            <span class="text-xs text-green-600 mt-1">✓ Completed</span>
          {/if}
        </button>
      </div>

      <div class="border-t border-gray-200 pt-8 bg-white/50 -mx-8 px-8 -mb-8 pb-8 rounded-b-2xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-900">Run Frequency</h3>
          {#if isActive}
            <div class="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200">
              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span class="text-xs font-medium text-emerald-700">Active</span>
            </div>
          {/if}
        </div>
        
        {#if taskStatus?.next_run}
          <p class="text-xs text-gray-500 mb-4">
            Next run scheduled: {new Date(taskStatus.next_run).toLocaleString()}
          </p>
        {/if}

        <div class="flex gap-3 items-center flex-wrap">
          <button 
            on:click={() => setFrequency('daily')} 
            disabled={isActive}
            class="px-6 py-2.5 rounded-full {selectedFrequency === 'daily' ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'} text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Daily
          </button>
          <button 
            on:click={() => setFrequency('2days')} 
            disabled={isActive}
            class="px-6 py-2.5 rounded-full {selectedFrequency === '2days' ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'} text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Every 2 Days
          </button>
          <button 
            on:click={() => setFrequency('3days')} 
            disabled={isActive}
            class="px-6 py-2.5 rounded-full {selectedFrequency === '3days' ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'} text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Every 3 Days
          </button>
          <button 
            on:click={() => setFrequency('weekly')} 
            disabled={isActive}
            class="px-6 py-2.5 rounded-full {selectedFrequency === 'weekly' ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'} text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Weekly
          </button>
          
          <div class="flex-1"></div>
          
          {#if !isActive}
            <button 
              on:click={runWorkflow} 
              disabled={isSubmitting || !selectedNodes.some(n => n)}
              class="px-8 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-semibold shadow-md hover:bg-zinc-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {#if isSubmitting}
                <RefreshCw class="w-4 h-4 animate-spin" />
                Starting...
              {:else}
                Run Workflow
              {/if}
            </button>
          {:else}
            <button 
              on:click={stopWorkflow}
              class="px-8 py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold shadow-md hover:bg-red-700 hover:shadow-lg transition-all flex items-center gap-2"
            >
              Stop Workflow
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <div class="col-span-12 lg:col-span-4">
    <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Workflow Progress</h2>
      
      {#if taskStatus}
        <div class="space-y-4 mb-6">
          <div class="bg-white rounded-lg p-4 border border-gray-100">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Status</span>
              <span class="text-sm font-semibold {taskStatus.status === 'running' ? 'text-blue-600' : taskStatus.status === 'pending' ? 'text-yellow-600' : taskStatus.status === 'completed' ? 'text-green-600' : taskStatus.status === 'failed' ? 'text-red-600' : 'text-gray-600'}">
                {taskStatus.status.toUpperCase()}
              </span>
            </div>
            
            {#if taskStatus.progress_message}
              <p class="text-xs text-gray-500">{taskStatus.progress_message}</p>
            {/if}
          </div>

          <div class="bg-white rounded-lg p-4 border border-gray-100">
            <span class="text-sm font-medium text-gray-700 mb-2 block">Progress</span>
            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                class="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style="width: {progressPercent}%"
              ></div>
            </div>
            <p class="text-xs text-gray-500">
              {taskStatus.completed_steps?.length || 0} of {selectedNodes.filter(n => n).length} steps completed
            </p>
          </div>

          {#if taskStatus.completed_steps?.length > 0}
            <div class="bg-white rounded-lg p-4 border border-gray-100">
              <span class="text-sm font-medium text-gray-700 mb-2 block">Completed Steps</span>
              <ul class="space-y-1">
                {#each taskStatus.completed_steps as step}
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
              <p class="text-gray-900 font-medium text-sm">Enabled Steps</p>
              <p class="text-gray-600 text-sm">{selectedNodes.filter(n => n).length} of 4 steps active</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp class="w-4 h-4 text-purple-600" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-gray-900 font-medium text-sm">Frequency</p>
              <p class="text-gray-600 text-sm capitalize">{selectedFrequency.replace('days', ' days')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>