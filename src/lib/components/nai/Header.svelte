
<script lang="ts">
  import { goto } from '$app/navigation';
  import type { AgentData, Task } from './types';

  export let agentData: AgentData;
  export let isAutopilotEnabled: boolean;
  export let currentTasks: Task[];
  export let toggleAutopilot: () => void;

  const agentGradient = 'from-red-400 via-zinc-500 to-zinc-300';
</script>

<div class={`bg- -400 max-w-[1900px] font-[Poppins] text-black shadow-xl rounded-xl mt-2  px-8 py-8`}>
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center space-x-4">
      <button on:click={() => goto('/')} class="text- hover:text- transition-colors">← Back to Dashboard</button>
      <div class="w-px h-6 bg-white/30"></div>
      <div>
        <h1 class="text-3xl font-bold">{agentData.name}</h1>
        <p class="text- mt-1">Master of search optimization and content strategy</p>
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
        <span class="text- text-sm">Autopilot</span>
        <button on:click={toggleAutopilot} class={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAutopilotEnabled ? 'bg-pink-600' : 'bg-black/30'}`}>
          <span class={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${isAutopilotEnabled ? 'translate-x-6' : 'translate-x-1'}`}></span>
        </button>
      </div>

      <div class="text-right">
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span class="text text-sm capitalize">{agentData.status}</span>
        </div>
        <div class="text- text-xs mt-1">Last scan: {agentData.lastScan}</div>
      </div>
    </div>
  </div>

  {#if currentTasks.length > 0}
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
      <h3 class="text- font-medium mb-3">Active Tasks</h3>
      <div class="space-y-2">
        {#each currentTasks as task}
          <div class="flex items-center justify-between">
            <span class="text-w text-sm capitalize">{task.type.replace('_', ' ')}</span>
            <div class="flex items-center space-x-3">
              <div class="bg-white/20 rounded-full h-2 w-24">
                <div class="bg-wh rounded-full h-2 transition-all duration-300" style="width: {task.progress}%"></div>
              </div>
              <span class="text- text-xs">{task.progress}%</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>