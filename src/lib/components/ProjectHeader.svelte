<!-- src/lib/components/ProjectHeader.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let projectData = {
   
    
  };
  export let isGenerating = false;

  const dispatch = createEventDispatcher();

  function generateContent() {
    dispatch('generateContent');
  }
</script>

<header class="py-4 px-6 z-10 border-b border-zinc-800 bg-zinc-950 sticky top-0">
  <div class="flex items-center justify-between max-w-7xl mx-auto">
    <div class="flex-1">
      {#if projectData.business_name}
      <h1 class="text-base font-medium text-zinc-300">
        {projectData.business_name}
      </h1>
    {:else}
      <h1 class="text-base font-medium text-zinc-600">No business name yet</h1>
    {/if}
    
      <p class="text-sm text-zinc-400 mb-2">{projectData.industry}</p>
      
      <!-- Project Details -->
      <div class="flex flex-wrap gap-3 items-center">
        {#if projectData.tone}
          <div class="bg-zinc-900 px-2 py-1 rounded text-xs flex items-center gap-1">
            <span class="text-zinc-500">Tone:</span>
            <span class="text-zinc-300">{projectData.tone}</span>
          </div>
        {/if}
        
        {#if projectData.target_audience}
          <div class="bg-zinc-900 px-2 py-1 rounded text-xs flex items-center gap-1">
            <span class="text-zinc-500">Audience:</span>
            <span class="text-zinc-300">{projectData.target_audience}</span>
          </div>
        {/if}
        
        {#if projectData.description}
          <div class="bg-zinc-900 px-2 py-1 rounded text-xs flex items-center gap-1 max-w-md">
            <span class="text-zinc-500">Description:</span>
            <span class="text-zinc-300 truncate">{projectData.description}</span>
          </div>
        {/if}
      </div>
    </div>
    
    <div class="flex gap-3 items-center ml-4">
      <div class="bg-zinc-900 px-4 py-2 rounded-md text-sm flex items-center gap-2">
        <span class="text-zinc-400">Started <span class="text-zinc-200">{projectData.startDate}</span></span>
      </div>
      
      <button 
        on:click={generateContent}
        class="border border-zinc-700 rounded-xl px-4 py-2 text-sm flex items-center gap-2 transition {isGenerating ? 'opacity-75 cursor-not-allowed' : ''}"
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