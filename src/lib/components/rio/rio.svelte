<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import {API_BASE_URL, WORKER_API_URL} from '$lib/config'
  
  $: projectId = $page.params.id;
  
  const BACKEND_URL = API_BASE_URL;
  const WORKER_URL = WORKER_API_URL;

  const authToken = localStorage.getItem('token');
  
  // State - all in memory, no localStorage
  let loading = true;
  let projectData = null;
  let xAccount = null;
  let config = {
    keywords: [],
    exclude_keywords: [],
    monitor_mentions: true,
    monitor_keywords: true,
    min_followers: 100,
    min_relevance: 65.0
  };
  let opportunities = [];
  let monitoring = false;
  let view = 'opportunities';
  let selectedOpportunity = null;
  let showDemoModal = true;
  
  function closeDemo() {
    showDemoModal = false;
  }
  
  // Get auth token from wherever you store it
  onMount(() => {
    fetchInitialData();
  });
  
  async function fetchInitialData() {
    try {
      // Fetch project data
      const projectRes = await fetch(`${BACKEND_URL}/elio/api/projects/${projectId}/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      if (!projectRes.ok) throw new Error('Failed to fetch project');
      const projectJson = await projectRes.json();
      projectData = projectJson.project || projectJson;
      
      // Check X connection
      const accountRes = await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/account/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      if (accountRes.ok) {
        const accountData = await accountRes.json();
        if (accountData.connected) {
          xAccount = accountData;
        }
      }
      
      // Fetch config
      const configRes = await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/config/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      if (configRes.ok) {
        const configData = await configRes.json();
        config = configData;
      }
      
      // Fetch opportunities
      await fetchOpportunities();
      
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load project data');
    } finally {
      loading = false;
    }
  }
  
  async function fetchOpportunities() {
    try {
      const res = await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/opportunities/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        opportunities = data.opportunities || [];
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  }
  
  async function connectX() {
  try {
    // <-- LOGGING
    console.log('[connectX] Initiating connect...', { projectId, authToken });

    const res = await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/connect/`, {
      headers: { 'Authorization': `Token ${authToken}` }
    });
    
    if (!res.ok) throw new Error('Failed to initiate OAuth');
    
    const data = await res.json();
    
    // <-- LOGGING
    console.log('[connectX] Received auth_url from backend:', data.auth_url);
    
    // Open OAuth window
    const width = 600;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    const authWindow = window.open(
      data.auth_url,
      'X OAuth',
      `width=${width},height=${height},left=${left},top=${top}`
    );
    
    // Listen for OAuth callback
    // <-- LOGGING
    console.log('[connectX] Now listening for "message" event from popup...');
    window.addEventListener('message', handleOAuthCallback);
    
  } catch (error) {
    // <-- LOGGING
    console.error('Error connecting X:', error);
    alert('Failed to connect X account');
  }
}

function handleOAuthCallback(event) {
  // <-- LOGGING: This is the most important log on this page
  console.log('[handleOAuthCallback] Received event:', event);

  // Security check: only accept messages from your own origin
  if (event.origin !== window.location.origin) {
      console.warn('[handleOAuthCallback] Ignored message from different origin:', event.origin);
      return;
  }

  if (event.data.type === 'x-oauth-success') {
    // <-- LOGGING
    console.log('[handleOAuthCallback] SUCCESS! Account data:', event.data.account);
    xAccount = event.data.account;
    window.removeEventListener('message', handleOAuthCallback);
    alert('X account connected successfully!');
  }
  
  if (event.data.type === 'x-oauth-error') {
    // <-- LOGGING
    console.error('[handleOAuthCallback] ERROR from popup:', event.data.error);
    alert(`Failed to connect X account: ${event.data.error}`);
    window.removeEventListener('message', handleOAuthCallback);
  }
}
  
  async function disconnectX() {
    if (!confirm('Disconnect X account?')) return;
    
    try {
      await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/disconnect/`, {
        method: 'POST',
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      xAccount = null;
      alert('X account disconnected');
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  }
  
  async function saveConfig() {
    try {
      const res = await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/config/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });
      
      if (res.ok) {
        alert('Configuration saved!');
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      alert('Failed to save configuration');
    }
  }
  
  async function monitorNow() {
    if (!xAccount) {
      alert('Please connect your X account first');
      return;
    }
    
    monitoring = true;
    
    try {
      // Get fresh account data with token
      const accountRes = await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/account/`, {
        headers: { 'Authorization': `Token ${authToken}` }
      });
      
      if (!accountRes.ok) throw new Error('Failed to get account data');
      
      const accountData = await accountRes.json();
      // Log the account data to inspect its contents
      console.log('[DEBUG] Raw Account Data (JSON):', JSON.stringify(accountData, null, 2));

// Table view for easy scanning (shows keys like x_user_id, access_token, etc.)
      console.table(accountData);
      
      // Call worker to monitor
      const res = await fetch(`${WORKER_URL}/rio/monitor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: accountData.access_token,
          x_user_id: accountData.x_user_id,
          business_name: projectData.business_name || projectData.name,
          business_description: projectData.description,
          config: config
        })
      });
      
      if (!res.ok) throw new Error('Monitor failed');
      
      const data = await res.json();
      
      if (data.opportunities && data.opportunities.length > 0) {
        // Save to backend
        await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/opportunities/save/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ opportunities: data.opportunities })
        });
        
        // Refresh list
        await fetchOpportunities();
        
        alert(`Found ${data.opportunities.length} new opportunities!`);
      } else {
        alert('No new opportunities found');
      }
      
    } catch (error) {
      console.error('Error monitoring:', error);
      alert('Failed to monitor: ' + error.message);
    } finally {
      monitoring = false;
    }
  }
  
  async function copyResponse(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert('Response copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }
  
  async function updateOpportunity(oppId, updates) {
    try {
      await fetch(`${BACKEND_URL}/rio/api/projects/${projectId}/opportunities/${oppId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      
      // Update local state
      opportunities = opportunities.map(o => 
        o.id === oppId ? { ...o, ...updates } : o
      );
      
    } catch (error) {
      console.error('Error updating opportunity:', error);
    }
  }
  
  function openTweet(url) {
    window.open(url, '_blank');
  }
  
  $: filteredOpportunities = opportunities.filter(o => !o.is_dismissed);
</script>

{#if showDemoModal}
  <div 
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
    on:click={closeDemo}
  >
    <div 
      class="bg-white rounded-2xl p-8 border border-gray-200 max-w-lg relative flex flex-col text-center shadow-xl" 
      on:click|stopPropagation
    >
      <button 
        on:click={closeDemo} 
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none transition-colors"
      >
        ×
      </button>
      
      <div class="space-y-6">
        <!-- Title -->
        <h2 class="text-3xl md:text-4xl font-semibold text-zinc-700 leading-tight tracking-tight">
          This is just a little <span class="font-['Pacifico'] text-blue-600">demo</span>
        </h2>
        
        <!-- Subtext -->
        <p class="text-lg text-gray-500 leading-relaxed font-light max-w-md mx-auto">
          Monitor X in real-time and never miss an opportunity to engage with your audience.
        </p>
        
        <!-- Features -->
        <div class="space-y-3 text-left max-w-sm mx-auto pt-2">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm text-gray-600">Track mentions and keywords automatically</span>
          </div>
          
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm text-gray-600">AI-powered response suggestions</span>
          </div>
          
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm text-gray-600">Smart relevance scoring</span>
          </div>
        </div>
        
        <!-- Coming Next -->
        <div class="pt-4 border-t border-gray-100">
          <p class="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Coming Next</p>
          <p class="text-sm text-gray-500">
            Auto-replies, sentiment analysis, and multi-account support
          </p>
        </div>
        
        <!-- CTA -->
        <button
          on:click={closeDemo}
          class="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          Let's go!
        </button>
      </div>
    </div>
  </div>
{/if}

<div class="max-w-7xl mx-auto p-6">
  {#if loading}
    <div class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="text-gray-500 mt-4">Loading RIO...</p>
    </div>
  {:else}
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">RIO - X </h1>
          <p class="text-gray-600 mt-1">
            {#if projectData}
              Real-time opportunities for {projectData.business_name || projectData.name}
            {/if}
          </p>
        </div>
        
        <div class="flex gap-3 items-center">
          {#if xAccount}
            <div class="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-lg">
              <div class="text-sm">
                <div class="font-medium text-gray-900">@{xAccount.username}</div>
                <div class="text-gray-500 text-xs">{xAccount.display_name}</div>
              </div>
              <button
                on:click={disconnectX}
                class="text-xs text-red-600 hover:text-red-700"
              >
                Disconnect
              </button>
            </div>
            
            <button 
              on:click={monitorNow}
              disabled={monitoring}
              class="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium disabled:opacity-50"
            >
              {#if monitoring}
                bleep bleep...
              {:else}
                GO!
              {/if}
            </button>
          {:else}
            <button
              on:click={connectX}
              class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Connect X Account
            </button>
          {/if}
        </div>
      </div>
      
      <!-- View Tabs -->
      <div class="flex gap-2 border-b border-gray-200">
        <button
          on:click={() => view = 'opportunities'}
          class="px-4 py-2 font-medium text-sm transition-colors {view === 'opportunities' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}"
        >
          Opportunities ({filteredOpportunities.length})
        </button>
        <button
          on:click={() => view = 'config'}
          class="px-4 py-2 font-medium text-sm transition-colors {view === 'config' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}"
        >
          Configuration
        </button>
      </div>
    </div>
    
    {#if view === 'opportunities'}
      <!-- Opportunities View -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Opportunities List -->
        <div class="col-span-5 space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
          {#if filteredOpportunities.length === 0}
            <div class="text-center py-12 bg-gray-50 rounded-xl">
              <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <p class="text-gray-500 mb-2">No opportunities yet</p>
              <p class="text-sm text-gray-400">
                {#if !xAccount}
                  Connect your X account to start monitoring
                {:else}
                  Click "Monitor Now" to find relevant tweets
                {/if}
              </p>
            </div>
          {:else}
            {#each filteredOpportunities as opp}
              <button
                on:click={() => selectedOpportunity = opp}
                class="w-full bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-300 transition-all text-left {selectedOpportunity?.id === opp.id ? 'ring-2 ring-blue-500 border-blue-500' : ''} {opp.is_responded ? 'opacity-60' : ''}"
              >
                <!-- Header -->
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
                      @{opp.author_username}
                    </span>
                    <span class="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                      {opp.author_followers.toLocaleString()} followers
                    </span>
                    {#if opp.is_responded}
                      <span class="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                        ✓ Responded
                      </span>
                    {/if}
                  </div>
                  <div class="font-semibold text-blue-600 text-sm">
                    {Math.round(opp.relevance_score)}%
                  </div>
                </div>
                
                <!-- Tweet Text -->
                <p class="text-gray-900 text-sm mb-3 line-clamp-3">
                  {opp.text}
                </p>
                
                <!-- Meta -->
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <div class="flex items-center gap-3">
                    <span>❤️ {opp.likes}</span>
                    <span>🔄 {opp.retweets}</span>
                    <span>💬 {opp.replies}</span>
                  </div>
                  <span class="text-blue-600 font-medium capitalize">{opp.opportunity_type}</span>
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
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {selectedOpportunity.author_name.charAt(0)}
                    </div>
                    <div>
                      <div class="font-bold text-gray-900">{selectedOpportunity.author_name}</div>
                      <div class="text-sm text-gray-500">@{selectedOpportunity.author_username}</div>
                      <div class="text-xs text-gray-400">{selectedOpportunity.author_followers.toLocaleString()} followers</div>
                    </div>
                  </div>
                  
                  <div class="flex gap-2">
                    <button
                      on:click={() => openTweet(selectedOpportunity.url)}
                      class="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                    >
                      View Tweet →
                    </button>
                    <button
                      on:click={() => updateOpportunity(selectedOpportunity.id, { is_responded: true })}
                      class="text-xs px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded transition-colors"
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
                
                <!-- Tweet Content -->
                <div class="p-4 bg-gray-50 rounded-lg mb-4">
                  <p class="text-gray-900 whitespace-pre-wrap">{selectedOpportunity.text}</p>
                  <div class="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>❤️ {selectedOpportunity.likes}</span>
                    <span>🔄 {selectedOpportunity.retweets}</span>
                    <span>💬 {selectedOpportunity.replies}</span>
                  </div>
                </div>
                
                <!-- Match Reasoning -->
                {#if selectedOpportunity.match_reasoning}
                  <div class="p-3 bg-blue-50 rounded-lg mb-4">
                    <p class="text-sm text-gray-700">
                      <span class="font-semibold text-blue-700">Why this matches:</span>
                      {selectedOpportunity.match_reasoning}
                    </p>
                  </div>
                {/if}
                
                <!-- Key Points -->
                {#if selectedOpportunity.key_points && selectedOpportunity.key_points.length > 0}
                  <div>
                    <h3 class="text-sm font-semibold text-gray-700 mb-2">Key Points:</h3>
                    <ul class="space-y-1">
                      {#each selectedOpportunity.key_points as point}
                        <li class="text-sm text-gray-600 flex items-start">
                          <span class="text-blue-500 mr-2">•</span>
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
                    class="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
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
      <div class="max-w-4xl space-y-6">
        <!-- Monitor Options -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">What to Monitor</h2>
          <div class="space-y-3">
            <label class="flex items-center gap-3">
              <input
                type="checkbox"
                bind:checked={config.monitor_mentions}
                class="w-4 h-4 text-blue-600 rounded"
              />
              <span class="text-sm text-gray-700">Monitor mentions of your X account</span>
            </label>
            
            <label class="flex items-center gap-3">
              <input
                type="checkbox"
                bind:checked={config.monitor_keywords}
                class="w-4 h-4 text-blue-600 rounded"
              />
              <span class="text-sm text-gray-700">Monitor keywords</span>
            </label>
          </div>
        </div>
        
        <!-- Keywords -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Target Keywords</h2>
          <p class="text-sm text-gray-500 mb-3">Track tweets containing these keywords</p>
          <div class="space-y-3">
            <div class="flex flex-wrap gap-2">
              {#each config.keywords as kw, idx}
                <span class="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                  {kw}
                  <button 
                    on:click={() => {
                      config.keywords = config.keywords.filter((_, i) => i !== idx);
                    }}
                    class="text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </span>
              {/each}
            </div>
            
            <input
              type="text"
              placeholder="Add keyword (press Enter)"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              on:keypress={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  config.keywords = [...config.keywords, e.target.value];
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
        
        <!-- Exclude Keywords -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Exclude Keywords</h2>
          <p class="text-sm text-gray-500 mb-3">Filter out tweets containing these words</p>
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
            
            <input
              type="text"
              placeholder="Add exclude keyword (press Enter)"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              on:keypress={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  config.exclude_keywords = [...config.exclude_keywords, e.target.value];
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
        
        <!-- Filters -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          
          <div class="space-y-4">
            <!-- Min Followers -->
            <div>
              <label class="text-sm text-gray-700 mb-2 block">Minimum Followers</label>
              <input
                type="number"
                bind:value={config.min_followers}
                min="0"
                step="100"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <!-- Min Relevance -->
            <div>
              <label class="text-sm text-gray-700 mb-2 block">Minimum Relevance</label>
              <div class="flex items-center gap-4">
                <input
                  type="range"
                  bind:value={config.min_relevance}
                  min="50"
                  max="90"
                  step="5"
                  class="flex-1"
                />
                <span class="text-2xl font-bold text-blue-600 min-w-[60px]">
                  {config.min_relevance}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Save Button -->
        <div class="flex justify-end">
          <button
            on:click={saveConfig}
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Configuration
          </button>
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  
  .font-poppins {
    font-family: 'Poppins', sans-serif;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>