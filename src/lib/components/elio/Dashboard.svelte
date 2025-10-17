<script>
    import { onMount } from 'svelte';
    
    // Props
    export let businessName = "Basecamp";
    export let apiEndpoint = "http://127.0.0.1:8000/elio/reddit/opportunities";
    
    // State
    let opportunities = [];
    let summary = {};
    let loading = true;
    let selectedOpportunity = null;
    let alternativeResponses = [];
    let loadingAlternatives = false;
    let filterType = 'all';
    let filterSubreddit = 'all';
    
    // Sentiment colors
    const sentimentStyles = {
      positive: 'bg-emerald-100 text-emerald-700',
      neutral: 'bg-gray-100 text-gray-700',
      negative: 'bg-red-100 text-red-700',
      frustrated: 'bg-orange-100 text-orange-700'
    };
    
    // Opportunity type icons
    const typeIcons = {
      help_request: '🆘',
      discussion: '💬',
      comparison: '⚖️',
      problem: '🔧',
      other: '📌'
    };
    
    // Fetch opportunities
    async function fetchOpportunities() {
      loading = true;
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        opportunities = data.opportunities || [];
        summary = data.summary || {};
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      } finally {
        loading = false;
      }
    }
    
    // Generate alternative responses
    async function generateAlternatives(opportunity) {
      loadingAlternatives = true;
      try {
        const response = await fetch(`${apiEndpoint}/alternatives`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ opportunity_id: opportunity.post_id })
        });
        const data = await response.json();
        alternativeResponses = data.alternatives || [];
      } catch (error) {
        console.error('Error generating alternatives:', error);
        alternativeResponses = [];
      } finally {
        loadingAlternatives = false;
      }
    }
    
    // Select opportunity
    function selectOpportunity(opp) {
      selectedOpportunity = opp;
      alternativeResponses = [];
    }
    
    // Copy response to clipboard
    async function copyResponse(text) {
      try {
        await navigator.clipboard.writeText(text);
        // Could add a toast notification here
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
    
    // Get filtered opportunities
    $: filteredOpportunities = opportunities.filter(opp => {
      const typeMatch = filterType === 'all' || opp.opportunity_type === filterType;
      const subMatch = filterSubreddit === 'all' || opp.subreddit === filterSubreddit;
      return typeMatch && subMatch;
    });
    
    // Get unique subreddits
    $: uniqueSubreddits = [...new Set(opportunities.map(o => o.subreddit))];
    
    // Get unique types
    $: uniqueTypes = [...new Set(opportunities.map(o => o.opportunity_type))];
    
    onMount(() => {
      fetchOpportunities();
      // Auto-refresh every 15 minutes
      const interval = setInterval(fetchOpportunities, 15 * 60 * 1000);
      return () => clearInterval(interval);
    });
  </script>
  
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Reddit Opportunities</h1>
          <p class="text-gray-600 mt-1">Conversations where {businessName} can add value</p>
        </div>
        <button 
          on:click={fetchOpportunities}
          class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm"
        >
          Refresh
        </button>
      </div>
      
      <!-- Summary Stats -->
      {#if !loading && summary.total_opportunities}
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-white rounded-xl p-4 border border-gray-200">
            <div class="text-2xl font-bold text-gray-900">{summary.total_opportunities}</div>
            <div class="text-sm text-gray-500">Total Opportunities</div>
          </div>
          
          <div class="bg-white rounded-xl p-4 border border-gray-200">
            <div class="text-2xl font-bold text-emerald-600">{summary.high_priority?.length || 0}</div>
            <div class="text-sm text-gray-500">High Priority</div>
          </div>
          
          <div class="bg-white rounded-xl p-4 border border-gray-200">
            <div class="text-2xl font-bold text-gray-900">{summary.avg_relevance}%</div>
            <div class="text-sm text-gray-500">Avg. Relevance</div>
          </div>
          
          <div class="bg-white rounded-xl p-4 border border-gray-200">
            <div class="text-2xl font-bold text-gray-900">{Object.keys(summary.by_subreddit || {}).length}</div>
            <div class="text-sm text-gray-500">Active Subreddits</div>
          </div>
        </div>
      {/if}
    </div>
    
    <!-- Filters -->
    {#if !loading && opportunities.length > 0}
      <div class="flex gap-3 mb-6">
        <select 
          bind:value={filterType}
          class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">All Types</option>
          {#each uniqueTypes as type}
            <option value={type}>{typeIcons[type]} {type.replace('_', ' ')}</option>
          {/each}
        </select>
        
        <select 
          bind:value={filterSubreddit}
          class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">All Subreddits</option>
          {#each uniqueSubreddits as sub}
            <option value={sub}>r/{sub}</option>
          {/each}
        </select>
        
        <div class="ml-auto text-sm text-gray-500 flex items-center">
          Showing {filteredOpportunities.length} of {opportunities.length} opportunities
        </div>
      </div>
    {/if}
    
    <!-- Main Content Grid -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Opportunities List -->
      <div class="col-span-5 space-y-3">
        {#if loading}
          <div class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p class="text-gray-500 mt-4">Finding opportunities...</p>
          </div>
        {:else if filteredOpportunities.length === 0}
          <div class="text-center py-12">
            <div class="text-6xl mb-4">🔍</div>
            <p class="text-gray-500">No opportunities found</p>
            <button 
              on:click={fetchOpportunities}
              class="mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              Try refreshing
            </button>
          </div>
        {:else}
          {#each filteredOpportunities as opp}
            <button
              on:click={() => selectOpportunity(opp)}
              class="w-full bg-white rounded-xl p-5 border border-gray-200 hover:border-orange-300 transition-all text-left {selectedOpportunity?.post_id === opp.post_id ? 'ring-2 ring-orange-500 border-orange-500' : ''}"
            >
              <!-- Header -->
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-2">
                  <span class="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-medium">
                    r/{opp.subreddit}
                  </span>
                  <span class={`text-xs px-2 py-1 rounded ${sentimentStyles[opp.sentiment]}`}>
                    {opp.sentiment}
                  </span>
                </div>
                <div class="text-lg">{typeIcons[opp.opportunity_type]}</div>
              </div>
              
              <!-- Title -->
              <h3 class="text-gray-900 font-semibold text-sm mb-2 line-clamp-2">
                {opp.title}
              </h3>
              
              <!-- Content Preview -->
              {#if opp.content}
                <p class="text-gray-600 text-xs mb-3 line-clamp-2">{opp.content}</p>
              {/if}
              
              <!-- Meta -->
              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-3 text-gray-500">
                  <span>↑ {opp.score}</span>
                  <span>💬 {opp.num_comments}</span>
                  <span>u/{opp.author}</span>
                </div>
                <div class="font-semibold text-orange-600">
                  {Math.round(opp.relevance_score)}% match
                </div>
              </div>
            </button>
          {/each}
        {/if}
      </div>
      
      <!-- Selected Opportunity Detail -->
      <div class="col-span-7">
        {#if selectedOpportunity}
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <!-- Header -->
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h2 class="text-xl font-bold text-gray-900 mb-2">{selectedOpportunity.title}</h2>
                  <a 
                    href={selectedOpportunity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-orange-600 hover:text-orange-700"
                  >
                    View on Reddit →
                  </a>
                </div>
                <div class="flex gap-2">
                  <span class={`text-xs px-3 py-1 rounded-full ${sentimentStyles[selectedOpportunity.sentiment]}`}>
                    {selectedOpportunity.sentiment}
                  </span>
                  <span class="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                    {Math.round(selectedOpportunity.relevance_score)}% match
                  </span>
                </div>
              </div>
              
              <!-- Key Points -->
              {#if selectedOpportunity.key_points?.length > 0}
                <div class="mt-4">
                  <h3 class="text-sm font-semibold text-gray-700 mb-2">Key Points:</h3>
                  <ul class="space-y-1">
                    {#each selectedOpportunity.key_points as point}
                      <li class="text-sm text-gray-600 flex items-start">
                        <span class="text-orange-500 mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}
            </div>
            
            <!-- Response Section -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-700">Suggested Response</h3>
                <div class="flex gap-2">
                  <button
                    on:click={() => generateAlternatives(selectedOpportunity)}
                    disabled={loadingAlternatives}
                    class="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors disabled:opacity-50"
                  >
                    {loadingAlternatives ? 'Generating...' : 'Get Alternatives'}
                  </button>
                  <button
                    on:click={() => copyResponse(selectedOpportunity.suggested_response)}
                    class="text-xs px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors"
                  >
                    Copy Response
                  </button>
                </div>
              </div>
              
              <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <p class="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selectedOpportunity.suggested_response}
                </p>
              </div>
              
              <!-- Alternative Responses -->
              {#if alternativeResponses.length > 0}
                <div class="space-y-3 mt-4">
                  <h4 class="text-sm font-semibold text-gray-700">Alternative Responses</h4>
                  {#each alternativeResponses as alt, idx}
                    <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-medium text-gray-500">Option {idx + 1}</span>
                        <button
                          on:click={() => copyResponse(alt)}
                          class="text-xs px-2 py-1 bg-white hover:bg-gray-100 text-gray-700 rounded transition-colors border border-gray-200"
                        >
                          Copy
                        </button>
                      </div>
                      <p class="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {alt}
                      </p>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        {:else}
          <div class="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 h-full flex items-center justify-center">
            <div class="text-center py-12">
              <div class="text-6xl mb-4">👈</div>
              <p class="text-gray-500">Select an opportunity to view details</p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>