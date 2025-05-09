<!-- src/lib/components/AiStrategySuggestion.svelte -->
<script lang="ts">
    export let suggestion = "";
  </script>
  
  <div class="mb-8 bg-gradient-to-r from-violet-900/30 to-pink-900/30 rounded-lg border border-pink-800/50 overflow-hidden p-5">
    <div class="flex items-center mb-4">
      <div class="mr-4 bg-pink-900/50 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div>
        <h3 class="text-lg font-bold text-white">AI Content Strategy</h3>
        <p class="text-xs text-pink-300/80">Personalized strategy recommendation</p>
      </div>
    </div>
    <p class="text-zinc-300">
      {suggestion}
    </p>
  </div>