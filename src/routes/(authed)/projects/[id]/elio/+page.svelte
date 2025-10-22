<!-- (authed)/projects/[id]/elio/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  // Get project ID from URL
  $: projectId = $page.params.id;

  let authToken = localStorage.getItem('token');
  
  // Configuration from parent component or environment
  const MAIN_BACKEND_URL = 'http://127.0.0.1:8000'; // Your Django backend
  const WORKER_URL = 'http://127.0.0.1:8001'; // Your worker service
  
  // LocalStorage keys
  const getConfigKey = () => `elio_config_${projectId}`;
  const getOpportunitiesKey = () => `elio_opportunities_${projectId}`;
  
  // State
  let loading = true;
  let projectData = null;
  let config = null;
  let opportunities = [];
  let scanning = false;
  let view = 'opportunities'; // 'opportunities' or 'config'
  let selectedOpportunity = null;
  
  // Default config
  const defaultConfig = {
    subreddits: ['entrepreneur', 'startups'],
    keywords: [],
    exclude_keywords: [],
    min_relevance: 65.0,
    time_window_hours: 24,
    max_per_subreddit: 5
  };
  
  // Fetch project data from main backend
  async function fetchProjectData() {
  try {
    const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/`, {
      headers: {
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch project data');
    
    const data = await response.json();
    projectData = data.project;
    
    // Try to get config from backend, fallback to localStorage
    if (data.config) {
      config = data.config;
      saveConfigToLocalStorage(config);
    } else {
      loadConfigFromLocalStorage();
    }
    
    // NEW: Load opportunities from backend
    await fetchOpportunitiesFromBackend();
    
  } catch (error) {
    console.error('Error fetching project data:', error);
    // If backend fails, try localStorage
    loadConfigFromLocalStorage();
    loadOpportunitiesFromLocalStorage();
  } finally {
    loading = false;
  }
}

// NEW: Fetch opportunities from backend
async function fetchOpportunitiesFromBackend() {
  try {
    const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/opportunities/`, {
      headers: {
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch opportunities');
    
    const data = await response.json();
    
    if (data.opportunities && data.opportunities.length > 0) {
      // Transform backend opportunities to match frontend format
      opportunities = data.opportunities.map(opp => ({
        ...opp,
        id: opp.post_id || opp.id,
        scanned_at: opp.created_at || new Date().toISOString(),
      }));
      
      // Also save to localStorage as a cache
      saveOpportunitiesToLocalStorage(opportunities);
      
      console.log(`Loaded ${opportunities.length} opportunities from backend`);
    } else {
      // No opportunities in backend, try localStorage
      loadOpportunitiesFromLocalStorage();
    }
    
  } catch (error) {
    console.error('Error fetching opportunities from backend:', error);
    // Fallback to localStorage
    loadOpportunitiesFromLocalStorage();
  }
}
  
  // LocalStorage helpers
  function saveConfigToLocalStorage(cfg) {
    try {
      localStorage.setItem(getConfigKey(), JSON.stringify(cfg));
    } catch (error) {
      console.error('Failed to save config to localStorage:', error);
    }
  }
  
  function loadConfigFromLocalStorage() {
    try {
      const stored = localStorage.getItem(getConfigKey());
      if (stored) {
        config = JSON.parse(stored);
      } else {
        config = { ...defaultConfig };
      }
    } catch (error) {
      console.error('Failed to load config from localStorage:', error);
      config = { ...defaultConfig };
    }
  }
  
  function saveOpportunitiesToLocalStorage(opps) {
    try {
      localStorage.setItem(getOpportunitiesKey(), JSON.stringify(opps));
    } catch (error) {
      console.error('Failed to save opportunities to localStorage:', error);
    }
  }
  
  function loadOpportunitiesFromLocalStorage() {
    try {
      const stored = localStorage.getItem(getOpportunitiesKey());
      if (stored) {
        opportunities = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load opportunities from localStorage:', error);
      opportunities = [];
    }
  }
  
  // Save opportunities to backend
  async function saveOpportunitiesToBackend(opps) {
    const backendOpportunities = opps.map(opp => ({
      post_id: opp.post_id,
      subreddit: opp.subreddit,
      title: opp.title,
      content: opp.content || '',
      author: opp.author,
      url: opp.url,
      score: opp.score,
      num_comments: opp.num_comments,
      created_utc: opp.created_utc,
      relevance_score: opp.relevance_score,
      opportunity_type: opp.opportunity_type,
      sentiment: opp.sentiment,
      key_points: opp.key_points || [],
      suggested_response: opp.suggested_response,
    }));
    
    const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/opportunities/save/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ opportunities: backendOpportunities })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend save failed: ${response.status} - ${errorText}`);
    }
    
    return await response.json();
  }
  
  // Scan for new opportunities via worker
  async function scanOpportunities() {
    if (!projectData || !config) return;
    
    scanning = true;
    
    try {
      // Call worker directly with project data
      const response = await fetch(`${WORKER_URL}/elio/reddit/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: projectData.business_name,
          business_description: projectData.description,
          subreddits: config.subreddits,
          keywords: config.keywords,
          exclude_keywords: config.exclude_keywords,
          min_relevance: config.min_relevance,
          time_window_hours: config.time_window_hours,
          max_per_subreddit: config.max_per_subreddit,
        })
      });
      
      if (!response.ok) throw new Error('Worker scan failed');
      
      const result = await response.json();
      
      // Save opportunities
      if (result.opportunities && result.opportunities.length > 0) {
        // Add unique IDs and timestamps if not present
        const newOpportunities = result.opportunities.map(opp => ({
          ...opp,
          id: opp.post_id,
          scanned_at: new Date().toISOString(),
          is_responded: false,
          is_dismissed: false
        }));
        
        // Merge with existing (avoid duplicates)
        const existingIds = new Set(opportunities.map(o => o.id));
        const uniqueNew = newOpportunities.filter(o => !existingIds.has(o.id));
        
        if (uniqueNew.length > 0) {
          // Try to save to backend first
          try {
            await saveOpportunitiesToBackend(uniqueNew);
            console.log('Opportunities saved to backend successfully');
            // Update in-memory state
            opportunities = [...uniqueNew, ...opportunities];
            alert(`Found ${uniqueNew.length} new opportunities and saved to backend!`);
          } catch (backendError) {
            console.error('Failed to save to backend, using localStorage fallback:', backendError);
            // Fallback to localStorage if backend fails
            opportunities = [...uniqueNew, ...opportunities];
            saveOpportunitiesToLocalStorage(opportunities);
            alert(`Found ${uniqueNew.length} new opportunities! (Saved locally - backend unavailable)`);
          }
        } else {
          alert('No new opportunities found (all duplicates)');
        }
      } else {
        alert('No new opportunities found');
      }
      
    } catch (error) {
      console.error('Error scanning:', error);
      alert('Failed to scan for opportunities: ' + error.message);
    } finally {
      scanning = false;
    }
  }
  
  // Save configuration
  async function saveConfig() {
    try {
      // Save to localStorage
      saveConfigToLocalStorage(config);
      
      // Try to save to backend (don't fail if this doesn't work)
      try {
        const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/config/`, {
          method: 'POST',
          headers: { 
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json' 
          },
          credentials: 'include',
          body: JSON.stringify(config)
        });
        
        if (response.ok) {
          alert('Configuration saved to server and locally!');
        } else {
          alert('Configuration saved locally!');
        }
      } catch (backendError) {
        console.error('Backend save failed, but localStorage succeeded:', backendError);
        alert('Configuration saved locally!');
      }
      
    } catch (error) {
      console.error('Error saving config:', error);
      alert('Failed to save configuration');
    }
  }
  
  // Copy response to clipboard
  async function copyResponse(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert('Response copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }
  
  // Mark opportunity as responded/dismissed
  function updateOpportunity(opportunityId, updates) {
    opportunities = opportunities.map(opp => 
      opp.id === opportunityId ? { ...opp, ...updates } : opp
    );
    saveOpportunitiesToLocalStorage(opportunities);
    
    // Also try to update backend (non-blocking)
    try {
      fetch(
        `${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/opportunities/${opportunityId}/`,
        {
          method: 'PATCH',
          headers: { 
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json' 
          },
          credentials: 'include',
          body: JSON.stringify(updates)
        }
      ).catch(err => console.log('Backend update failed (non-critical):', err));
    } catch (error) {
      console.log('Backend update skipped:', error);
    }
  }
  
  // Clear dismissed opportunities
  function clearDismissed() {
    if (confirm('Remove all dismissed opportunities?')) {
      opportunities = opportunities.filter(o => !o.is_dismissed);
      saveOpportunitiesToLocalStorage(opportunities);
    }
  }
  
  // Filter opportunities
  $: filteredOpportunities = opportunities.filter(o => !o.is_dismissed);
  
  onMount(() => {
    fetchProjectData();
  });
</script>

<div class="max-w-7xl mx-auto p-6">
  {#if loading}
    <div class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
      <p class="text-gray-500 mt-4">Loading Elio...</p>
    </div>
  {:else}
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Elio Reddit Assistant</h1>
          <p class="text-gray-600 mt-1">
            {#if projectData}
              Monitoring opportunities for {projectData.business_name || 'your project'}
            {/if}
          </p>
        </div>
        
        <div class="flex gap-3">
          {#if opportunities.some(o => o.is_dismissed)}
            <button 
              on:click={clearDismissed}
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
            >
              Clear Dismissed
            </button>
          {/if}
          <button 
            on:click={scanOpportunities}
            disabled={scanning}
            class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm disabled:opacity-50"
          >
            {#if scanning}
              bleep bleep...
            {:else}
              Go!
            {/if}
          </button>
        </div>
      </div>
      
      <!-- View Tabs -->
      <div class="flex gap-2 border-b border-gray-200">
        <button
          on:click={() => view = 'opportunities'}
          class="px-4 py-2 font-medium text-sm transition-colors {view === 'opportunities' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}"
        >
          Opportunities ({filteredOpportunities.length})
        </button>
        <button
          on:click={() => view = 'config'}
          class="px-4 py-2 font-medium text-sm transition-colors {view === 'config' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}"
        >
          Configuration
        </button>
      </div>
    </div>
    
    {#if view === 'opportunities'}
      <!-- Opportunities View -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Opportunities List -->
        <div class="col-span-5 space-y-3">
          {#if filteredOpportunities.length === 0}
            <div class="text-center py-12 bg-gray-50 rounded-xl">
              <p class="text-gray-500 mb-2">No opportunities yet</p>
              <p class="text-sm text-gray-400">Click "Scan Now" to find discussions</p>
            </div>
          {:else}
            {#each filteredOpportunities as opp}
              <button
                on:click={() => selectedOpportunity = opp}
                class="w-full bg-white rounded-xl p-5 border border-gray-200 hover:border-orange-300 transition-all text-left {selectedOpportunity?.id === opp.id ? 'ring-2 ring-orange-500 border-orange-500' : ''} {opp.is_responded ? 'opacity-60' : ''}"
              >
                <!-- Header -->
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-medium">
                      r/{opp.subreddit}
                    </span>
                    <span class="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                      {opp.sentiment}
                    </span>
                    {#if opp.is_responded}
                      <span class="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">
                        ✓ Responded
                      </span>
                    {/if}
                  </div>
                  <div class="font-semibold text-orange-600 text-sm">
                    {Math.round(opp.relevance_score)}%
                  </div>
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
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <div class="flex items-center gap-3">
                    <span>↑ {opp.score}</span>
                    <span>💬 {opp.num_comments}</span>
                  </div>
                  <span class="text-orange-600 font-medium">{opp.opportunity_type}</span>
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
                  <div class="flex-1">
                    <h2 class="text-xl font-bold text-gray-900 mb-2">
                      {selectedOpportunity.title}
                    </h2>
                    <a 
                      href={selectedOpportunity.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-sm text-orange-600 hover:text-orange-700"
                    >
                      View on Reddit →
                    </a>
                  </div>
                  
                  <div class="flex gap-2 ml-4">
                    <button
                      on:click={() => updateOpportunity(selectedOpportunity.id, { is_responded: true })}
                      class="text-xs px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded transition-colors"
                    >
                      ✓ Mark Responded
                    </button>
                    <button
                      on:click={() => updateOpportunity(selectedOpportunity.id, { is_dismissed: true })}
                      class="text-xs px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                    >
                      × Dismiss
                    </button>
                  </div>
                </div>
                
                <!-- Match Reasoning -->
                {#if selectedOpportunity.match_reasoning}
                  <div class="mt-4 p-3 bg-orange-50 rounded-lg">
                    <p class="text-sm text-gray-700">
                      <span class="font-semibold text-orange-700">Why this matches:</span>
                      {selectedOpportunity.match_reasoning}
                    </p>
                  </div>
                {/if}
                
                <!-- Key Points -->
                {#if selectedOpportunity.key_points && selectedOpportunity.key_points.length > 0}
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
                  <button
                    on:click={() => copyResponse(selectedOpportunity.suggested_response)}
                    class="text-xs px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors"
                  >
                    Copy Response
                  </button>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {selectedOpportunity.suggested_response}
                  </p>
                </div>
              </div>
            </div>
          {:else}
            <div class="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 h-full flex items-center justify-center">
              <div class="text-center py-12">
                <p class="text-gray-500">Select an opportunity to view details</p>
              </div>
            </div>
          {/if}
        </div>
      </div>
      
    {:else if view === 'config'}
      <!-- Configuration View -->
      {#if config}
        <div class="max-w-4xl space-y-6">
          <!-- Subreddits -->
          <div class="bg-white rounded-xl p-6 border border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Target Subreddits</h2>
            <div class="space-y-3">
              <div class="flex flex-wrap gap-2">
                {#each config.subreddits as sub, idx}
                  <span class="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm">
                    r/{sub}
                    <button 
                      on:click={() => {
                        config.subreddits = config.subreddits.filter((_, i) => i !== idx);
                      }}
                      class="text-orange-500 hover:text-orange-700"
                    >
                      ×
                    </button>
                  </span>
                {/each}
              </div>
              
              <div class="flex gap-2">
                <input
                  type="text"
                  placeholder="Add subreddit (e.g., entrepreneur)"
                  class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  on:keypress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      config.subreddits = [...config.subreddits, e.target.value.replace('r/', '')];
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <!-- Keywords -->
          <div class="bg-white rounded-xl p-6 border border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Target Keywords</h2>
            <p class="text-sm text-gray-500 mb-3">Optional - Leave empty to let AI find relevant posts automatically</p>
            <div class="space-y-3">
              <div class="flex flex-wrap gap-2">
                {#each config.keywords as kw, idx}
                  <span class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm">
                    {kw}
                    <button 
                      on:click={() => {
                        config.keywords = config.keywords.filter((_, i) => i !== idx);
                      }}
                      class="text-emerald-500 hover:text-emerald-700"
                    >
                      ×
                    </button>
                  </span>
                {/each}
              </div>
              
              <div class="flex gap-2">
                <input
                  type="text"
                  placeholder="Add keyword"
                  class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  on:keypress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      config.keywords = [...config.keywords, e.target.value];
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <!-- Exclude Keywords -->
          <div class="bg-white rounded-xl p-6 border border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Exclude Keywords</h2>
            <div class="space-y-3">
              <div class="flex flex-wrap gap-2">
                {#each config.exclude_keywords as kw, idx}
                  <span class="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm">
                    {kw}
                    <button 
                      on:click={() => {
                        config.exclude_keywords = config.exclude_keywords.filter((_, i) => i !== idx);
                      }}
                      class="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                {/each}
              </div>
              
              <div class="flex gap-2">
                <input
                  type="text"
                  placeholder="Add exclude keyword"
                  class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  on:keypress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      config.exclude_keywords = [...config.exclude_keywords, e.target.value];
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <!-- Relevance Threshold -->
          <div class="bg-white rounded-xl p-6 border border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Minimum Relevance</h2>
            <div class="flex items-center gap-4">
              <input
                type="range"
                bind:value={config.min_relevance}
                min="50"
                max="90"
                step="5"
                class="flex-1"
              />
              <span class="text-2xl font-bold text-orange-600 min-w-[60px]">
                {config.min_relevance}%
              </span>
            </div>
          </div>
          
          <!-- Save Button -->
          <div class="flex justify-end">
            <button
              on:click={saveConfig}
              class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Save Configuration
            </button>
          </div>
        </div>
      {/if}
    {/if}
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