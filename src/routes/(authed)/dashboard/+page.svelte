<script>
	import StartNewPraw from "$lib/components/startNewPraw.svelte";
	import { Coffee, Clock, Sparkles } from 'lucide-svelte';
</script>

<section class="w-full h-screen bg-zinc-950 overflow-hidden flex flex-col">
  
  
  <!-- Main content - scrollable -->
  <div class="w-full overflow-y-auto pr-1" style="scrollbar-width: thin;">
    <div class="max-w  mx-auto p-6">
      <!-- Main input component -->
      <div class="mb-8 ">
        <StartNewPraw />
      </div>
      
      <!-- Expectation management cards -->
      
      
      
    </div>
  </div>
</section>

<style>
  /* Custom scrollbar styling */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(39, 39, 42, 0.2); /* Zinc-800 with opacity */
    border-radius: 8px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(82, 82, 91, 0.6); /* Zinc-600 with opacity */
    border-radius: 8px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(113, 113, 122, 0.8); /* Zinc-500 with opacity */
  }
  
  /* For Firefox */
  .overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(82, 82, 91, 0.6) rgba(39, 39, 42, 0.2);
  }
</style>