<script lang="ts">
  import { goto } from '$app/navigation';
  import type { AgentData, Task } from './types';

  export let agentData: AgentData;
  export let isAutopilotEnabled: boolean;
  export let currentTasks: Task[];
  export let toggleAutopilot: () => void;

  const agentGradient = 'from-red-400 via-zinc-500 to-zinc-300';
</script>

<div class="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 max-w-[1900px] font-[Poppins] text-white shadow-2xl rounded-2xl mt-2 px-8 py-6 border border-zinc-700/50">
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center space-x-6">
      <button on:click={() => goto('/')} class="text-zinc-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium group">
        <span class="group-hover:-tranzinc-x-1 transition-transform">←</span>
        <span>Dashboard</span>
      </button>
      <div class="w-px h-8 bg-zinc-600"></div>
      <div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">{agentData.name}</h1>
        <p class="text-zinc-400 text-sm mt-1.5">Master of search optimization and content strategy</p>
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-3 bg-zinc-800/50 backdrop-blur-sm rounded-xl p-3 border border-zinc-700/50">
        <span class="text-zinc-300 text-sm font-medium">Autopilot</span>
        <button on:click={toggleAutopilot} class={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAutopilotEnabled ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-zinc-700'}`}>
          <span class={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${isAutopilotEnabled ? 'tranzinc-x-6' : 'tranzinc-x-1'}`}></span>
        </button>
      </div>

      <div class="text-right bg-zinc-800/30 rounded-xl px-4 py-2.5 border border-zinc-700/50">
        <div class="flex items-center space-x-2 justify-end">
          <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span class="text-white text-sm font-medium capitalize">{agentData.status}</span>
        </div>
        <div class="text-zinc-400 text-xs mt-1">Last scan: {agentData.lastScan}</div>
      </div>
    </div>
  </div>

 
</div>