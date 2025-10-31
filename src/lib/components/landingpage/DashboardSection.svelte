<!-- DashboardSection.svelte -->

<div class="mt-32 mb-20">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-semibold text-zinc-900 mb-4">
        One dashboard. <span class=" text-zinc-950">Everything</span> connected.
      </h2>
      <p class="text-xl text-zinc-500 max-w-2xl mx-auto">
        No jumping between tools. See what's working across all channels, instantly.
      </p>
    </div>
  
    <!-- Main Dashboard Visual -->
    <div class="relative max-w-6xl mx-auto mb-16">
      <div class="video-container">
        <img 
          src="/oneDashboard.jpg" 
          alt="Unified dashboard" 
          class="w-full rounded-2xl"
        />
      </div>
      
      <!-- Floating Stat Cards -->
      <div class="absolute -bottom-8 left-8 bg-white rounded-xl shadow-lg p-4 border border-zinc-100 gentle-float" style="animation-delay: -1s;">
        <div class="text-2xl font-bold text-emerald-600">↑ 156%</div>
        <div class="text-sm text-zinc-500">Organic traffic</div>
      </div>
      
      <div class="absolute -top-6 right-8 bg-white rounded-xl shadow-lg p-4 border border-zinc-100 gentle-float" style="animation-delay: -3s;">
        <div class="text-2xl font-bold text-blue-600">10+</div>
        <div class="text-sm text-zinc-500">Keywords found</div>
      </div>
      
      <div class="absolute bottom-12 right-16 bg-white rounded-xl shadow-lg p-4 border border-zinc-100 gentle-float" style="animation-delay: -2s;">
        <div class="text-2xl font-bold text-orange-600">89%</div>
        <div class="text-sm text-zinc-500">Time saved</div>
      </div>
    </div>
  
    <!-- Benefits Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
      {#each [
        {
          icon: 'chart',
          title: 'Track real results',
          description: 'See keyword rankings, engagement rates, and conversions in one place. No guesswork.'
        },
        {
          icon: 'sync',
          title: 'Stay in sync',
          description: 'Auto-publish to WordPress, schedule X threads, monitor Reddit—all from one workflow.'
        },
        {
          icon: 'brain',
          title: 'Learn what works',
          description: 'AI analyzes performance across channels and suggests what to do next.'
        }
      ] as benefit}
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-zinc-100 to-zinc-50 rounded-2xl flex items-center justify-center">
            {#if benefit.icon === 'chart'}
              <svg class="w-8 h-8 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            {:else if benefit.icon === 'sync'}
              <svg class="w-8 h-8 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            {:else if benefit.icon === 'brain'}
              <svg class="w-8 h-8 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            {/if}
          </div>
          <h3 class="text-lg font-semibold text-zinc-900 mb-2">{benefit.title}</h3>
          <p class="text-sm text-zinc-500 leading-relaxed">{benefit.description}</p>
        </div>
      {/each}
    </div>
  </div>