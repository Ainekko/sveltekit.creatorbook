<script>
    import { onMount } from 'svelte';
  
    let apiUrl = '';
    let loading = false;
    let leadsData = {
      business_analysis: {},
      leads_found: 0,
      leads: []
    };
    let errorMessage = '';
    let expandedCards = new Set();
  
    onMount(() => {
      const storedData = localStorage.getItem('redditLeads');
      if (storedData) {
        leadsData = JSON.parse(storedData);
        console.log(leadsData)
      }
    });
  
    async function fetchLeads() {
      loading = true;
      errorMessage = '';
      try {
        const response = await fetch(`http://127.0.0.1:8000/cry_praw/find-leads/?url=${encodeURIComponent(apiUrl)}`);
        if (!response.ok) {
          const error = await response.json();
          errorMessage = error.error || 'Failed to fetch leads.';
        } else {
          leadsData = await response.json();
          localStorage.setItem('redditLeads', JSON.stringify(leadsData));
        }
      } catch (error) {
        errorMessage = 'An unexpected error occurred.';
        console.error('Fetch error:', error);
      } finally {
        loading = false;
      }
    }
  
    function clearLocalStorage() {
      localStorage.removeItem('redditLeads');
      leadsData = {
        business_analysis: {},
        leads_found: 0,
        leads: []
      };
      expandedCards.clear();
      expandedCards = expandedCards;
    }
  
    function toggleCard(index) {
      if (expandedCards.has(index)) {
        expandedCards.delete(index);
      } else {
        expandedCards.add(index);
      }
      expandedCards = expandedCards;
    }
  </script>
  
  <div class="min-h-screen bg-gradient-to-tr max-h-screen overflow-y-scroll from-black via-zinc-950 to-zinc-900 rounded-xl">
    <div class="max-w-7xl mx-auto p-6">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="text-center mb-8">
          <!-- <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Reddit Lead Discovery
          </h1> -->
          <p class="text-gray-400 text-lg">Find and analyze potential leads from Reddit discussions</p>
        </div>
  
        <!-- Search Form -->
        <form on:submit|preventDefault={fetchLeads} class="bg-zinc-900 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl mb-6">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <label for="url" class="block text-gray-300 font-medium mb-2">Website URL</label>
              <input
                type="url"
                id="url"
                class="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                bind:value={apiUrl}
                placeholder="https://example.com"
                required
              />
            </div>
            <div class="flex gap-3 items-end">
              <button
                type="submit"
                class="bg-gradient-to-r from-white/80 to-white hover:from-zinc-200 hover:to-zinc-300 text-zinc-950 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                disabled={loading}
              >
                {#if loading}
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </div>
                {:else}
                  Find Leads
                {/if}
              </button>
              <button
                type="button"
                class="bg-transparent border border-zinc-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                on:click={clearLocalStorage}
              >
                Clear Data
              </button>
            </div>
          </div>
        </form>
  
        <!-- Error Message -->
        {#if errorMessage}
          <div class="bg-red-900/20 border border-red-500/50 text-red-300 px-6 py-4 rounded-xl mb-6 backdrop-blur-sm">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <span class="font-semibold">Error:</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        {/if}
  
        <!-- Business Analysis -->
        {#if leadsData.business_analysis && Object.keys(leadsData.business_analysis).length > 0}
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl mb-6">
            <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Business Analysis
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <div>
                  <span class="text-gray-400 text-sm font-medium">Business Name</span>
                  <p class="text-white font-semibold">{leadsData.business_analysis.business_name}</p>
                </div>
                <div>
                  <span class="text-gray-400 text-sm font-medium">Industry</span>
                  <p class="text-white">{leadsData.business_analysis.industry}</p>
                </div>
                <div>
                  <span class="text-gray-400 text-sm font-medium">Target Audience</span>
                  <p class="text-white">{leadsData.business_analysis.target_audience}</p>
                </div>
              </div>
              <div class="space-y-3">
                <div>
                  <span class="text-gray-400 text-sm font-medium">Description</span>
                  <p class="text-white">{leadsData.business_analysis.description}</p>
                </div>
                <div>
                  <span class="text-gray-400 text-sm font-medium">Tone</span>
                  <p class="text-white">{leadsData.business_analysis.tone}</p>
                </div>
              </div>
            </div>
          </div>
        {/if}
  
        <!-- Leads Count -->
        <div class="flex items-center gap-2 mb-6">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="text-white font-semibold">Found {leadsData.leads_found} potential leads</span>
        </div>
      </div>
  
      <!-- Leads Grid -->
      {#if leadsData.leads && leadsData.leads.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each leadsData.leads as lead, index}
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
              <!-- Card Header -->
              <div class="p-6 pb-4">
                <div class="flex items-start justify-between mb-3">
                  <h3 class="text-xl font-bold text-white truncate pr-2">{lead.name}</h3>
                  <button
                    on:click={() => toggleCard(index)}
                    class="flex-shrink-0 p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors duration-200"
                  >
                    <svg 
                      class="w-4 h-4 text-gray-300 transition-transform duration-200 {expandedCards.has(index) ? 'rotate-180' : ''}"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
  
                <!-- Quick Info -->
                <div class="space-y-2 mb-4">
                  {#if lead.company}
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span class="text-gray-300 text-sm">{lead.company}</span>
                    </div>
                  {/if}
                  {#if lead.title}
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span class="text-gray-300 text-sm">{lead.title}</span>
                    </div>
                  {/if}
                </div>
  
                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-4">
                  {#if lead.lead_source}
                    <a href='{lead.lead_source}' class="px-3 py-1 bg-indigo-600/20 text-indigo-300 text-xs font-medium rounded-full border border-indigo-500/30">
                      Post link
                    </a>
                  {/if}
                  {#if lead.relevance_score}
                    <span class="px-3 py-1 text-xs font-medium rounded-full border {
                      lead.relevance_score === 'high' 
                        ? 'bg-green-600/20 text-green-300 border-green-500/30' 
                        : lead.relevance_score === 'medium' 
                          ? 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30' 
                          : 'bg-red-600/20 text-red-300 border-red-500/30'
                    }">
                      {lead.relevance_score} relevance
                    </span>
                  {/if}
                </div>
  
                <!-- Preview Description -->
                {#if lead.description && !expandedCards.has(index)}
                  <p class="text-gray-400 text-sm line-clamp-2">{lead.description.substring(0, 120)}...</p>
                {/if}
              </div>
  
              <!-- Expanded Content -->
              {#if expandedCards.has(index)}
                <div class="px-6 pb-6 space-y-4 border-t border-gray-700/50 pt-4">
                  <!-- Full Description -->
                  {#if lead.description}
                    <div>
                      <h4 class="text-white font-semibold mb-2">Description</h4>
                      <p class="text-gray-300 text-sm leading-relaxed">{lead.description}</p>
                    </div>
                  {/if}
  
                  <!-- Industry -->
                  {#if lead.industry}
                    <div>
                      <h4 class="text-white font-semibold mb-2">Industry</h4>
                      <p class="text-gray-300 text-sm">{lead.industry}</p>
                    </div>
                  {/if}
  
                  <!-- Contact Information -->
                  {#if lead.contact_info}
                    <div>
                      <h4 class="text-white font-semibold mb-2">Contact Information</h4>
                      <div class="space-y-2">
                        {#if lead.contact_info.email}
                          <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href="mailto:{lead.contact_info.email}" class="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                              {lead.contact_info.email}
                            </a>
                          </div>
                        {/if}
                        {#if lead.contact_info.linkedin}
                          <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <a href={lead.contact_info.linkedin} target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 text-sm transition-colors truncate">
                              LinkedIn Profile
                            </a>
                          </div>
                        {/if}
                        {#if lead.contact_info.twitter}
                          <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                            <a href={lead.contact_info.twitter} target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 text-sm transition-colors truncate">
                              Twitter Profile
                            </a>
                          </div>
                        {/if}
                        {#if lead.contact_info.website}
                          <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                            </svg>
                            <a href={lead.contact_info.website} target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 text-sm transition-colors truncate">
                              Website
                            </a>
                          </div>
                        {/if}
                        {#if lead.contact_info.phone}
                          <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span class="text-gray-300 text-sm">{lead.contact_info.phone}</span>
                          </div>
                        {/if}
                      </div>
                    </div>
                  {/if}
  
                  <!-- Pain Points -->
                  {#if lead.pain_points && lead.pain_points.length > 0}
                    <div>
                      <h4 class="text-white font-semibold mb-2">Pain Points</h4>
                      <div class="flex flex-wrap gap-2">
                        {#each lead.pain_points as painPoint}
                          <span class="px-3 py-1 bg-orange-600/20 text-orange-300 text-xs rounded-full border border-orange-500/30">
                            {painPoint}
                          </span>
                        {/each}
                      </div>
                    </div>
                  {/if}
  
                  <!-- Reddit Context -->
                  {#if lead.reddit_context}
                    <div>
                      <h4 class="text-white font-semibold mb-2">Reddit Context</h4>
                      <p class="text-gray-300 text-sm leading-relaxed bg-gray-700/30 p-3 rounded-lg border border-gray-600/30">
                        {lead.reddit_context}
                      </p>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {:else if !loading && !errorMessage}
        <div class="text-center py-12">
          <svg class="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p class="text-gray-400 text-lg">No leads found yet</p>
          <p class="text-gray-500 text-sm mt-2">Enter a website URL above to start discovering potential leads</p>
        </div>
      {/if}
    </div>
  </div>