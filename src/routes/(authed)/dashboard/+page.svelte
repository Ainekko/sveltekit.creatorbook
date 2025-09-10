<script>
	import StartNewPraw from "$lib/components/startNewPraw.svelte";
	import { Coffee, Clock, Sparkles } from 'lucide-svelte';
</script>


<StartNewPraw />

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