<script>
	import StartNewPraw from "$lib/components/startNewPraw.svelte";
	import { Coffee, Clock, Sparkles } from 'lucide-svelte';
</script>

<section class="w-full h-screen bg-zinc-950 overflow-hidden flex flex-col">
  
  
  <!-- Main content - scrollable -->
  <div class="flex-1 overflow-y-auto pr-1" style="scrollbar-width: thin;">
    <div class="max-w-6xl mx-auto p-6">
      <!-- Main input component -->
      <div class="mb-8 ">
        <StartNewPraw />
      </div>
      
      <!-- Expectation management cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Processing time card -->
        <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-800 shadow-lg">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-medium text-lg text-white">Processing Time</h3>
            <div class="bg-violet-500/20 p-2 rounded-full">
              <Clock size={20} class="text-violet-400" />
            </div>
          </div>
          <p class="text-zinc-300 text-sm mb-3">Our AI agent needs about 5 minutes to analyze your website and generate a complete content strategy.</p>
          <div class="bg-zinc-800/60 p-3 rounded-lg text-amber-300 text-sm flex items-center gap-2">
            <Coffee size={16} />
            <span>Perfect time to grab a coffee!</span>
          </div>
        </div>
        
        <!-- What you'll get card -->
        <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-800 shadow-lg">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-medium text-lg text-white">What You'll Get</h3>
            <div class="bg-pink-500/20 p-2 rounded-full">
              <Sparkles size={20} class="text-pink-400" />
            </div>
          </div>
          <ul class="space-y-2">
            <li class="flex items-center gap-2 text-sm text-zinc-300">
              <div class="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
              SEO keyword analysis & opportunities
            </li>
            <li class="flex items-center gap-2 text-sm text-zinc-300">
              <div class="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
              Content strategy recommendations
            </li>
            <li class="flex items-center gap-2 text-sm text-zinc-300">
              <div class="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
              Blog post outlines & topics
            </li>
            <li class="flex items-center gap-2 text-sm text-zinc-300">
              <div class="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
              Social media content ideas
            </li>
          </ul>
        </div>
        
        <!-- Processing steps card -->
        <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-800 shadow-lg">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-medium text-lg text-white">Processing Steps</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-emerald-400">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M3.6 8.5C5.98156 10.4884 9.29917 11.9897 12 12C14.7008 12.0103 18.0184 10.4884 20.4 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M12 12L12 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <ol class="space-y-3">
            <li class="flex items-center gap-2 text-sm">
              <div class="bg-zinc-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium text-white">1</div>
              <span class="text-zinc-300">Analyzing website structure & content</span>
            </li>
            <li class="flex items-center gap-2 text-sm">
              <div class="bg-zinc-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium text-white">2</div>
              <span class="text-zinc-300">Researching industry competitors</span>
            </li>
            <li class="flex items-center gap-2 text-sm">
              <div class="bg-zinc-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium text-white">3</div>
              <span class="text-zinc-300">Identifying keyword opportunities</span>
            </li>
            <li class="flex items-center gap-2 text-sm">
              <div class="bg-zinc-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium text-white">4</div>
              <span class="text-zinc-300">Generating content recommendations</span>
            </li>
          </ol>
        </div>
      </div>
      
      
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