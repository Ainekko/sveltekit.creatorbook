<!-- src/lib/components/elio/OpportunitiesView.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { ArrowUpRight } from 'lucide-svelte';
  
    export let filteredOpportunities;
    export let selectedOpportunity;
  
    const dispatch = createEventDispatcher();
  </script>
  
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
    <!-- Opportunities List -->
    <div class="lg:col-span-5 space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
      {#if filteredOpportunities.length === 0}
        <div class="text-center py-12 bg-zinc-50 rounded-xl shadow-md">
          <p class="text-zinc-500 mb-2">No opportunities yet</p>
          <p class="text-sm text-zinc-400">Click "Scan Opportunities" to find discussions</p>
        </div>
      {:else}
        {#each filteredOpportunities as opp}
          <button
            on:click={() => selectedOpportunity = opp}
            class="w-full bg-white rounded-xl p-4 sm:p-5 border border-zinc-200 hover:border-zinc-300 transition-all duration-300 text-left shadow-md hover:shadow-lg {selectedOpportunity?.id === opp.id ? 'ring-2 ring-zinc-900 border-zinc-900' : ''} {opp.is_responded ? 'opacity-60' : ''}"
          >
            <div class="flex items-start justify-between mb-3 gap-2">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs px-2 py-1 bg-zinc-200 text-zinc-800 rounded font-medium">
                  r/{opp.subreddit}
                </span>
                <span class="text-xs px-2 py-1 rounded bg-zinc-100 text-zinc-700">
                  {opp.sentiment}
                </span>
                {#if opp.is_responded}
                  <span class="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-100">
                    ✓ Responded
                  </span>
                {/if}
              </div>
              <div class="font-semibold text-zinc-900 text-sm flex-shrink-0">
                {Math.round(opp.relevance_score)}%
              </div>
            </div>
  
            <h3 class="text-zinc-900 font-semibold text-sm mb-2 line-clamp-2">
              {opp.title}
            </h3>
  
            {#if opp.content}
              <p class="text-zinc-600 text-xs mb-3 line-clamp-2">{opp.content}</p>
            {/if}
  
            <div class="flex items-center justify-between text-xs text-zinc-500">
              <div class="flex items-center gap-3">
                <span>↑ {opp.score}</span>
                <span>💬 {opp.num_comments}</span>
              </div>
              <span class="text-zinc-900 font-medium">{opp.opportunity_type}</span>
            </div>
          </button>
        {/each}
      {/if}
    </div>
  
    <!-- Selected Opportunity Detail -->
    <div class="lg:col-span-7 h-[calc(100vh-250px)]">
      {#if selectedOpportunity}
        <div class="bg-white rounded-xl border border-zinc-200 overflow-hidden h-full flex flex-col shadow-xl">
          <div class="p-4 sm:p-6 border-b border-zinc-200 flex-shrink-0">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <div class="flex-1">
                <h2 class="text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                  {selectedOpportunity.title}
                </h2>
                <a
                  href={selectedOpportunity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-zinc-700 hover:text-zinc-900 inline-flex items-center gap-1"
                >
                  View on Reddit <ArrowUpRight class="w-3 h-3" />
                </a>
              </div>
  
              <div class="flex gap-2">
                <button
                  on:click={() => dispatch('updateOpportunity', { id: selectedOpportunity.id, updates: { is_responded: true } })}
                  class="text-xs px-3 py-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded transition-colors whitespace-nowrap"
                >
                  ✓ Mark Responded
                </button>
                <button
                  on:click={() => dispatch('updateOpportunity', { id: selectedOpportunity.id, updates: { is_dismissed: true } })}
                  class="text-xs px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded transition-colors whitespace-nowrap"
                >
                  × Dismiss
                </button>
              </div>
            </div>
  
            {#if selectedOpportunity.match_reasoning}
              <div class="mt-4 p-3 bg-zinc-50 rounded-lg">
                <p class="text-sm text-zinc-700">
                  <span class="font-semibold text-zinc-900">Why this matches:</span>
                  {selectedOpportunity.match_reasoning}
                </p>
              </div>
            {/if}
  
            {#if selectedOpportunity.key_points && selectedOpportunity.key_points.length > 0}
              <div class="mt-4">
                <h3 class="text-sm font-semibold text-zinc-700 mb-2">Key Points:</h3>
                <ul class="space-y-1">
                  {#each selectedOpportunity.key_points as point}
                    <li class="text-sm text-zinc-600 flex items-start">
                      <span class="text-zinc-900 mr-2 flex-shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
  
          <div class="p-4 sm:p-6 flex-1 overflow-y-auto">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <h3 class="text-sm font-semibold text-zinc-700">Suggested Response</h3>
              <button
                on:click={() => dispatch('copyResponse', { text: selectedOpportunity.suggested_response })}
                class="text-xs px-3 py-1 bg-zinc-900 hover:bg-zinc-700 text-white rounded transition-colors self-start sm:self-auto"
              >
                Copy Response
              </button>
            </div>
  
            <div class="bg-zinc-50 rounded-lg p-3 sm:p-4">
              <p class="text-sm text-zinc-800 whitespace-pre-wrap leading-relaxed">
                {selectedOpportunity.suggested_response}
              </p>
            </div>
          </div>
        </div>
      {:else}
        <div class="bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-300 h-full flex items-center justify-center shadow-md">
          <div class="text-center py-12">
            <p class="text-zinc-500">Select an opportunity to view details</p>
          </div>
        </div>
      {/if}
    </div>
  </div>