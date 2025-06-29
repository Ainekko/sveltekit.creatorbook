<script>
    export let businessAnalysis = {};
    
    // Check if the analysis object has data
    $: hasData = businessAnalysis && Object.keys(businessAnalysis).length > 0;
  </script>
  
  {#if hasData}
    <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Business Analysis
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-3">
          {#if businessAnalysis.business_name}
            <div>
              <span class="text-gray-400 text-sm font-medium">Business Name</span>
              <p class="text-white font-semibold">{businessAnalysis.business_name}</p>
            </div>
          {/if}
          {#if businessAnalysis.industry}
            <div>
              <span class="text-gray-400 text-sm font-medium">Industry</span>
              <p class="text-white">{businessAnalysis.industry}</p>
            </div>
          {/if}
          {#if businessAnalysis.target_audience}
            <div>
              <span class="text-gray-400 text-sm font-medium">Target Audience</span>
              <p class="text-white">{businessAnalysis.target_audience}</p>
            </div>
          {/if}
        </div>
        <div class="space-y-3">
          {#if businessAnalysis.description}
            <div>
              <span class="text-gray-400 text-sm font-medium">Description</span>
              <p class="text-white">{businessAnalysis.description}</p>
            </div>
          {/if}
          {#if businessAnalysis.tone}
            <div>
              <span class="text-gray-400 text-sm font-medium">Tone</span>
              <p class="text-white">{businessAnalysis.tone}</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}