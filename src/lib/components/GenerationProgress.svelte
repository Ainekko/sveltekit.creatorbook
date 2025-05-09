<!-- src/lib/components/GenerationProgress.svelte -->
<script lang="ts">
    export let progress = "";
    export let type = "content-analysis"; // "content-analysis" or "blog-post"
    export let postIndex = -1;
  </script>
  
  <div class="bg-purple-900/20 border border-purple-800 text-purple-200 p-4 rounded-lg mb-6">
    <h3 class="text-lg font-medium mb-2">
      {#if type === "content-analysis"}
        Generating Fresh Content Analysis
      {:else if type === "blog-post"}
        Generating Blog Post #{postIndex + 1}
      {/if}
    </h3>
    <p>Current status: {progress}</p>
    <div class="w-full bg-zinc-800 rounded-full h-2 mt-2">
      <div class="bg-purple-500 h-2 rounded-full animate-pulse"></div>
    </div>
    <p class="text-xs mt-2">This may take several minutes. Please don't close this page.</p>
  </div>