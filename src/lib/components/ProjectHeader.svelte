<!-- src/lib/components/ProjectHeader.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    export let projectData = {
      id: "",
      name: "N/A",
      url: "N/A",
      startDate: "N/A"
    };
    export let isGenerating = false;
  
    const dispatch = createEventDispatcher();
  
    function generateContent() {
      dispatch('generateContent');
    }
  </script>
  
  <header class="py-4 px-6 z-10 border-b border-zinc-800 bg-zinc-950 sticky top-0">
    <div class="flex items-center justify-between max-w-7xl mx-auto">
      <div>
        <h1 class="text-2xl font-bold text-white">{projectData.name}</h1>
        <p class="text-sm text-zinc-400">{projectData.url}</p>
      </div>
      <div class="flex gap-3">
        <div class="bg-zinc-900 px-4 py-2 rounded-md text-sm flex items-center gap-2">
          <span class="text-lg">📅</span>
          <span class="text-zinc-400">Started <span class="text-zinc-200">{projectData.startDate}</span></span>
        </div>
        
        <button 
          on:click={generateContent}
          class="bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 px-4 py-2 rounded-md text-sm flex items-center gap-2 transition {isGenerating ? 'opacity-75 cursor-not-allowed' : ''}"
          disabled={isGenerating}
        >
          {#if isGenerating}
            <span class="animate-spin mr-2">⟳</span>
            Generating...
          {:else}
            <span class="text-sm">+</span>
            Generate New Content
          {/if}
        </button>
      </div>
    </div>
  </header>