<script lang="ts">
    import { RefreshCw, Globe, Calendar, ExternalLink } from 'lucide-svelte';
  
    let competitors: any[] = [];
    let isLoading = false;
  
    const authToken = localStorage.getItem('token');
    const apiBaseUrl = 'http://127.0.0.1:8000';
  
    async function loadTopCompetitors() {
      isLoading = true;
      try {
        const response = await fetch(`${apiBaseUrl}/orion/api/top_comp/?limit=5`, {
          headers: {
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          competitors = data.results || [];
        }
      } catch (error) {
        console.error('Error loading competitors:', error);
      } finally {
        isLoading = false;
      }
    }
  
    function formatDate(dateString: string) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  
    function getPositionBadgeStyle(position: number) {
      if (position === 1) return 'bg-yellow-100 text-yellow-800';
      if (position <= 3) return 'bg-orange-100 text-orange-800';
      if (position <= 10) return 'bg-blue-100 text-blue-800';
      return 'bg-gray-100 text-gray-800';
    }
  
    loadTopCompetitors();
  </script>
  
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Top Competitors</h2>
        <p class="text-sm text-gray-500 mt-1">
          {competitors.length} recent rankings
        </p>
      </div>
      <button
        on:click={loadTopCompetitors}
        disabled={isLoading}
        class="bg-zinc-900 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {#if isLoading}
          <RefreshCw class="w-4 h-4 animate-spin" />
          Loading...
        {:else}
          <RefreshCw class="w-4 h-4" />
          Refresh
        {/if}
      </button>
    </div>
  
    {#if competitors.length === 0 && !isLoading}
      <div class="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No Competitors Yet</h3>
        <p class="text-gray-500">
          Competitor rankings will appear here once data is available.
        </p>
      </div>
    {:else}
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div class="divide-y divide-gray-200">
          {#each competitors as competitor (competitor.id)}
            <div class="p-6 hover:bg-gray-50 transition-colors">
              <div class="flex items-start gap-4">
                <div class="flex-1 min-w-0">
                  <!-- Position Badge & Domain -->
                  <div class="flex items-start gap-3 mb-2">
                    <span class={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getPositionBadgeStyle(competitor.position)}`}>
                      #{competitor.position}
                    </span>
                    <a
                      href={competitor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-lg font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2 truncate"
                    >
                      {competitor.domain}
                      <ExternalLink class="w-4 h-4 flex-shrink-0" />
                    </a>
                  </div>
  
                  <!-- Keyword -->
                  {#if competitor.keyword}
                    <div class="mb-3">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {competitor.keyword.keyword || competitor.keyword}
                      </span>
                    </div>
                  {/if}
  
                  <!-- Title -->
                  {#if competitor.title}
                    <h4 class="text-sm font-medium text-gray-900 mb-2">
                      {competitor.title}
                    </h4>
                  {/if}
  
                  <!-- Snippet -->
                  {#if competitor.snippet}
                    <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                      {competitor.snippet}
                    </p>
                  {/if}
  
                  <!-- Footer -->
                  <div class="flex items-center gap-4 text-xs text-gray-500">
                    <div class="flex items-center gap-1">
                      <Calendar class="w-3.5 h-3.5" />
                      {formatDate(competitor.last_updated)}
                    </div>
                    {#if competitor.position === 1}
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Top Position
                      </span>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
  
  <style>
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>