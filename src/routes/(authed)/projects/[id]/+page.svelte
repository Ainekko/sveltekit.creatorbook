<!-- routes/projects/[id]/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { userStore } from '$lib/stores';
  import { fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  
  export let data;

  console.log(data.project)
  
  // Store for the project data
  let currentProject = writable(data.project);
  let error = writable(null);
  
  // UI state
  let activeTab = 'overview';
  let expandedCompetitors = {};
  let expandedBlog = false;
  let expandedReddit = false;
  
  onMount(() => {
    // Initialize competitor expand state
    if ($currentProject?.data?.competitors_analysis) {
      $currentProject.data.competitors_analysis.forEach((comp, index) => {
        expandedCompetitors[index] = true;
      });
    }
  });
  
  function toggleCompetitor(index) {
    expandedCompetitors = {
      ...expandedCompetitors,
      [index]: !expandedCompetitors[index]
    };
  }
  
  function toggleBlog() {
    expandedBlog = !expandedBlog;
  }
  
  function toggleReddit() {
    expandedReddit = !expandedReddit;
  }
  
  function startNewAnalysis() {
    goto('/generate');
  }
  
  function setActiveTab(tab) {
    activeTab = tab;
  }
  
  // Reactive declarations
  $: $currentProject;
  $: $error;
</script>

<div class="flex h-screen w-full bg-zinc-">
  <!-- Main Content -->
  <div class="flex-1 overflow-y-auto p-6">
    <!-- Project Dashboard -->
    <div in:fly={{ y: 20, duration: 300 }}>
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-zinc-100">{$currentProject.name}</h2>
          <p class="text-sm text-zinc-400 mt-1">Project Dashboard</p>
        </div>
        
        <button 
          on:click={startNewAnalysis}
          class="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 shadow-lg"
        >
          New Analysis
        </button>
      </div>
      
      {#if $currentProject?.data}
        <!-- Tab Navigation -->
        <div class="mb-6 border-b border-zinc-800">
          <div class="flex space-x-4">
            <button
              class="px-4 py-2 text-sm font-medium {activeTab === 'overview' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-zinc-400 hover:text-zinc-300'}"
              on:click={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              class="px-4 py-2 text-sm font-medium {activeTab === 'competitors' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-zinc-400 hover:text-zinc-300'}"
              on:click={() => setActiveTab('competitors')}
            >
              Competitors
            </button>
            <button
              class="px-4 py-2 text-sm font-medium {activeTab === 'strategy' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-zinc-400 hover:text-zinc-300'}"
              on:click={() => setActiveTab('strategy')}
            >
              Strategy
            </button>
            <button
              class="px-4 py-2 text-sm font-medium {activeTab === 'content' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-zinc-400 hover:text-zinc-300'}"
              on:click={() => setActiveTab('content')}
            >
              Content Samples
            </button>
          </div>
        </div>
        
        <!-- Overview Tab -->
        {#if activeTab === 'overview'}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Website Overview -->
            <div class="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-xl hover:border-zinc-600 transition-colors duration-200">
              <div class="flex items-center mb-4">
                <div class="p-2 bg-zinc-900 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-zinc-100">Website Overview</h3>
              </div>
              <div class="space-y-4">
                {#if $currentProject.data.website_analysis}
                  <div class="bg-zinc-900 p-3 rounded-lg">
                    <p class="text-xs text-zinc-400">Business</p>
                    <p class="text-zinc-100 font-medium">{$currentProject.data.website_analysis.business_name}</p>
                  </div>
                  <div class="bg-zinc-900 p-3 rounded-lg">
                    <p class="text-xs text-zinc-400">Industry</p>
                    <p class="text-zinc-100 font-medium">{$currentProject.data.website_analysis.industry}</p>
                  </div>
                  {#if $currentProject.data.website_analysis.target_audience}
                    <div class="bg-zinc-900 p-3 rounded-lg">
                      <p class="text-xs text-zinc-400">Target Audience</p>
                      <p class="text-zinc-100 font-medium">{$currentProject.data.website_analysis.target_audience}</p>
                    </div>
                  {/if}
                  {#if $currentProject.data.website_analysis.description}
                    <div class="bg-zinc-900 p-3 rounded-lg">
                      <p class="text-xs text-zinc-400">Description</p>
                      <p class="text-zinc-100">{$currentProject.data.website_analysis.description}</p>
                    </div>
                  {/if}
                {:else}
                  <p class="text-zinc-300">No website analysis data available.</p>
                {/if}
              </div>
            </div>
            
            <!-- Competitors Overview -->
            <div class="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-xl hover:border-zinc-600 transition-colors duration-200">
              <div class="flex items-center mb-4">
                <div class="p-2 bg-zinc-900 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-zinc-100">Competitors</h3>
              </div>
              {#if $currentProject.data.competitors_analysis && $currentProject.data.competitors_analysis.length > 0}
                <div class="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {#each $currentProject.data.competitors_analysis as competitor, index}
                    <div class="p-3 bg-zinc-900 rounded-lg text-sm transform transition-transform hover:translate-x-1">
                      <p class="font-medium text-zinc-100">{competitor.name}</p>
                      {#if competitor.domain}
                        <p class="text-xs text-zinc-400">{competitor.domain}</p>
                      {/if}
                      <div class="flex justify-between mt-2">
                        {#if competitor.reddit_mentions}
                          <span class="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300">Reddit: {competitor.reddit_mentions}</span>
                        {/if}
                        {#if competitor.relevance}
                          <span class="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300">Relevance: {competitor.relevance}</span>
                        {/if}
                      </div>
                    </div>
                  {/each}
                </div>
              {:else}
                <p class="text-zinc-300">No competitors found.</p>
              {/if}
            </div>
            
            <!-- Strategy Highlights -->
            <!-- Strategy Highlights -->
              <div class="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-xl hover:border-zinc-600 transition-colors duration-200">
                <div class="flex items-center mb-4">
                  <div class="p-2 bg-zinc-900 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-zinc-100">Strategy Highlights</h3>
                </div>
                {#if $currentProject.data.strategy_recommendations}
                  <div class="space-y-4">
                    {#if $currentProject.data.strategy_recommendations["Channel strategy"]}
                      <div>
                        <p class="text-sm text-zinc-400 mb-2">Recommended Channels</p>
                        <div class="flex flex-wrap gap-2">
                          {#each $currentProject.data.strategy_recommendations["Channel strategy"] as channel}
                            <span class="px-3 py-1 rounded-xl  text-xs text-indigo-300 border border-zinc-700">{channel.description}</span>
                          {/each}
                        </div>
                      </div>
                    {/if}
                    
                    {#if $currentProject.data.strategy_recommendations["Content strategy recommendations"]}
                      <div>
                        <p class="text-sm text-zinc-400 mb-2">Content Types</p>
                        <div class="flex flex-wrap gap-2">
                          {#each $currentProject.data.strategy_recommendations["Content strategy recommendations"] as content}
                            <span class="px-3 py-1 text-xs rounded-xl text-indigo-300 border border-zinc-700">{content.description}</span>
                          {/each}
                        </div>
                      </div>
                    {/if}
                  </div>
                {:else}
                  <p class="text-zinc-300">No strategy recommendations available.</p>
                {/if}
              </div>
          </div>
          
          <!-- Current Marketing Strategy -->
          {#if $currentProject.data.current_marketing_strategy}
            <div class="mt-6 bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-xl hover:border-zinc-600 transition-colors duration-200">
              <div class="flex items-center mb-4">
                <div class="p-2 bg-zinc-900 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-zinc-100">Current Marketing Strategy</h3>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Left column -->
                <div>
                  <!-- Main Topics -->
                  {#if $currentProject.data.current_marketing_strategy.main_topics?.length}
                    <div class="mb-4 bg-zinc-900 p-4 rounded-lg">
                      <h4 class="text-sm font-medium text-zinc-300 mb-2">Main Topics</h4>
                      <ul class="space-y-1">
                        {#each $currentProject.data.current_marketing_strategy.main_topics as topic}
                          <li class="flex items-center">
                            <span class="mr-2 text-indigo-400">•</span>
                            <span class="text-zinc-100">{topic}</span>
                          </li>
                        {/each}
                      </ul>
                    </div>
                  {/if}
                  
                  <!-- Content Types -->
                  {#if $currentProject.data.current_marketing_strategy.content_types?.length}
                    <div class="mb-4 bg-zinc-900 p-4 rounded-lg">
                      <h4 class="text-sm font-medium text-zinc-300 mb-2">Content Types</h4>
                      <div class="flex flex-wrap gap-2">
                        {#each $currentProject.data.current_marketing_strategy.content_types as type}
                          <span class="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300">{type}</span>
                        {/each}
                      </div>
                    </div>
                  {/if}
                  
                  <!-- Lead Generation -->
                  {#if $currentProject.data.current_marketing_strategy.lead_generation?.length}
                    <div class="mb-4 bg-zinc-900 p-4 rounded-lg">
                      <h4 class="text-sm font-medium text-zinc-300 mb-2">Lead Generation</h4>
                      <div class="flex flex-wrap gap-2">
                        {#each $currentProject.data.current_marketing_strategy.lead_generation as item}
                          <span class="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300">{item}</span>
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>
                
                <!-- Right column -->
                <div>
                  <!-- CTA Analysis -->
                  {#if $currentProject.data.current_marketing_strategy.cta_analysis}
                    <div class="mb-4 bg-zinc-900 p-4 rounded-lg">
                      <h4 class="text-sm font-medium text-zinc-300 mb-2">Call-to-Action Analysis</h4>
                      <ul class="space-y-2">
                        {#each Object.entries($currentProject.data.current_marketing_strategy.cta_analysis) as [key, value]}
                          <li class="text-zinc-100">
                            <span class="font-medium text-indigo-400">{key}:</span> {value}
                          </li>
                        {/each}
                      </ul>
                    </div>
                  {/if}
                  
                  <!-- Social Presence -->
                  {#if $currentProject.data.current_marketing_strategy.social_presence?.length}
                    <div class="mb-4 bg-zinc-900 p-4 rounded-lg">
                      <h4 class="text-sm font-medium text-zinc-300 mb-2">Social Presence</h4>
                      <div class="flex flex-wrap gap-2">
                        {#each $currentProject.data.current_marketing_strategy.social_presence as item}    
                          <span class="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300">{item}</span>
                        {/each}
                      </div>
                    </div>
                  {/if}
                  
                  <!-- Unique Selling Points -->
                  {#if $currentProject.data.current_marketing_strategy.unique_selling_points?.length}
                    <div class="mb-4 bg-zinc-900 p-4 rounded-lg">
                      <h4 class="text-sm font-medium text-zinc-300 mb-2">Unique Selling Points</h4>
                      <ul class="space-y-1">
                        {#each $currentProject.data.current_marketing_strategy.unique_selling_points as usp}
                          <li class="flex items-center">
                            <span class="mr-2 text-indigo-400">•</span>
                            <span class="text-zinc-100">{usp}</span>
                          </li>
                        {/each}
                      </ul>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          {/if}
        {/if}
        
        <!-- Competitors Tab -->
        {#if activeTab === 'competitors'}
          <div class="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-xl">
            <div class="flex items-center mb-6">
              <div class="p-2 bg-zinc-900 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-zinc-100">Competitor Analysis</h3>
            </div>
            
            {#if $currentProject.data.competitors_analysis && $currentProject.data.competitors_analysis.length > 0}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {#each $currentProject.data.competitors_analysis as competitor, index}
                  <div class="bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
                    <div class="p-4 bg-zinc-800 border-b border-zinc-700 flex justify-between items-center">
                      <h4 class="font-medium text-zinc-100">{competitor.name}</h4>
                      <button 
                        on:click={() => toggleCompetitor(index)}
                        class="flex items-center justify-center w-8 h-8 rounded-full text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 transition-colors duration-200"
                      >
                        {#if expandedCompetitors[index]}
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                          </svg>
                        {:else}
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        {/if}
                      </button>
                    </div>
                    
                    <div class="p-4 {expandedCompetitors[index] ? '' : 'hidden'}">
                      <div class="space-y-4">
                        {#if competitor.domain}
                          <div>
                            <p class="text-xs font-medium text-zinc-400">Website:</p>
                            <p class="text-zinc-200">{competitor.domain}</p>
                          </div>
                        {/if}
                        
                        {#if competitor.marketing_channels}
                          <div>
                            <p class="text-xs font-medium text-zinc-400">Marketing Channels:</p>
                            <div class="flex flex-wrap gap-2 mt-2">
                              {#each competitor.marketing_channels as channel}
                                <span class="px-2 py-1 bg-zinc-800 rounded-full text-xs text-indigo-300">{channel}</span>
                              {/each}
                            </div>
                          </div>
                        {/if}
                        
                        {#if competitor.content_strategy}
                          <div>
                            <p class="text-xs font-medium text-zinc-400">Content Strategy:</p>
                            <p class="text-zinc-200 mt-1 bg-zinc-800 p-2 rounded">{competitor.content_strategy}</p>
                          </div>
                        {/if}
                        
                        {#if competitor.marketing_strategy?.content_types}
                          <div>
                            <p class="text-xs font-medium text-zinc-400">Content Types:</p>
                            <div class="flex flex-wrap gap-2 mt-2">
                              {#each competitor.marketing_strategy.content_types as contentType}
                                <span class="px-2 py-1 bg-zinc-800 rounded-full text-xs text-indigo-300">{contentType}</span>
                              {/each}
                            </div>
                          </div>
                        {/if}
                        
                        {#if competitor.marketing_strategy?.lead_generation}
                          <div>
                            <p class="text-xs font-medium text-zinc-400">Lead Generation:</p>
                            <div class="flex flex-wrap gap-2 mt-2">
                              {#each competitor.marketing_strategy.lead_generation as leadGen}
                                <span class="px-2 py-1 bg-zinc-800 rounded-full text-xs text-indigo-300">{leadGen}</span>
                              {/each}
                            </div>
                          </div>
                        {/if}
                      </div>
                    </div>
                    
                    <div class="p-4 bg-zinc-800 border-t border-zinc-700 flex justify-between items-center {expandedCompetitors[index] ? '' : 'hidden'}">
                      {#if competitor.reddit_mentions}
                        <span class="text-xs bg-zinc-700 px-2 py-1 rounded text-zinc-300">Reddit: {competitor.reddit_mentions}</span>
                      {/if}
                      {#if competitor.relevance}
                        <span class="text-xs bg-zinc-700 px-2 py-1 rounded text-zinc-300">Relevance: {competitor.relevance}</span>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
            {:else}
              <div class="text-center p-10 bg-zinc-900 rounded-lg">
                <p class="text-zinc-300">No competitor analysis available.</p>
              </div>
            {/if}
          </div>
        {/if}
      {/if}  
        <!-- Strategy Tab -->
        {#if activeTab === 'strategy'}
        <div class="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-xl">
          <div class="flex items-center mb-6">
            <div class="p-2 bg-zinc-900 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-zinc-100">Strategy Recommendations</h3>
          </div>
          
          {#if $currentProject.data.strategy_recommendations}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Left column -->
              <div class="space-y-6">
                {#if $currentProject.data.strategy_recommendations["Key differentiation opportunities"]}
                  <div class="bg-zinc-900 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-indigo-300 mb-2">Positioning</h4>
                    <ul class="space-y-1">
                      {#each $currentProject.data.strategy_recommendations["Key differentiation opportunities"] as item}
                        <li class="flex items-center">
                          <span class="mr-2 text-indigo-400">•</span>
                          <span class="text-zinc-100">{item.description}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
                
                {#if $currentProject.data.strategy_recommendations["Channel strategy"]}
                  <div class="bg-zinc-900 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-indigo-300 mb-2">Recommended Channels</h4>
                    <div class="flex flex-wrap gap-2">
                      {#each $currentProject.data.strategy_recommendations["Channel strategy"] as channel}
                        <span class="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300 border border-zinc-700">{channel.description}</span>
                      {/each}
                    </div>
                  </div>
                {/if}
                
                {#if $currentProject.data.strategy_recommendations["Content strategy recommendations"]}
                  <div class="bg-zinc-900 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-indigo-300 mb-2">Content Types</h4>
                    <div class="flex flex-wrap gap-2">
                      {#each $currentProject.data.strategy_recommendations["Content strategy recommendations"] as type}
                        <span class="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300 border border-zinc-700">{type.description}</span>
                      {/each}
                    </div>
                  </div>
                {/if}
              </div>
              
              <!-- Right column -->
              <div class="space-y-6">
                {#if $currentProject.data.strategy_recommendations["Lead generation tactics"]}
                  <div class="bg-zinc-900 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-indigo-300 mb-2">Marketing Focus</h4>
                    <p class="text-zinc-100">{$currentProject.data.strategy_recommendations["Lead generation tactics"][0].description}</p>
                  </div>
                {/if}
                
                {#if $currentProject.data.strategy_recommendations["Conversion optimization ideas"]}
                  <div class="bg-zinc-900 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-indigo-300 mb-2">SEO Strategy</h4>
                    <p class="text-zinc-100">{$currentProject.data.strategy_recommendations["Conversion optimization ideas"][0].description}</p>
                  </div>
                {/if}
                
                {#if $currentProject.data.sample_content && $currentProject.data.sample_content.blog_post_ideas}
                  <div class="bg-zinc-900 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-indigo-300 mb-2">Content Pillars</h4>
                    <ul class="space-y-1">
                      {#each $currentProject.data.sample_content.blog_post_ideas as pillar}
                        <li class="flex items-center">
                          <span class="mr-2 text-indigo-400">•</span>
                          <span class="text-zinc-100">{pillar}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
                
                {#if $currentProject.data.strategy_recommendations["Key differentiation opportunities"]}
                  <div class="bg-zinc-900 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-indigo-300 mb-2">Key Metrics</h4>
                    <ul class="space-y-1">
                      {#each $currentProject.data.strategy_recommendations["Key differentiation opportunities"] as metric}
                        <li class="flex items-center">
                          <span class="mr-2 text-indigo-400">•</span>
                          <span class="text-zinc-100">{metric.description}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
              </div>
            </div>
            
            <!-- Additional Strategy Information -->
            {#if $currentProject.data.strategy_recommendations["Channel strategy"] || $currentProject.data.strategy_recommendations["Lead generation tactics"]}
              <div class="mt-6 space-y-6">
                {#if $currentProject.data.strategy_recommendations["Channel strategy"]}
                  <div class="bg-zinc-900 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-indigo-300 mb-2">Strategy Summary</h4>
                    <p class="text-zinc-100">{$currentProject.data.strategy_recommendations["Channel strategy"][0].description}</p>
                  </div>
                {/if}
                
                {#if $currentProject.data.strategy_recommendations["Lead generation tactics"]}
                  <div class="bg-zinc-900 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-indigo-300 mb-2">Action Plan</h4>
                    <ol class="space-y-2 pl-5 list-decimal text-zinc-100">
                      {#each $currentProject.data.strategy_recommendations["Lead generation tactics"] as step}
                        <li>{step.description}</li>
                      {/each}
                    </ol>
                  </div>
                {/if}
              </div>
            {/if}
          {:else}
            <div class="text-center p-10 bg-zinc-900 rounded-lg">
              <p class="text-zinc-300">No strategy recommendations available.</p>
            </div>
          {/if}
        </div>
        {/if}

        <!-- Content Samples Tab -->
        {#if activeTab === 'content'}
        <div class="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-xl">
          <div class="flex items-center mb-6">
            <div class="p-2 bg-zinc-900 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-zinc-100">Content Samples</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Blog Content -->
            <div class="bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
              <div class="p-4 bg-zinc-800 border-b border-zinc-700 flex justify-between items-center">
                <h4 class="font-medium text-zinc-100">Blog Post Ideas</h4>
                <button 
                  on:click={toggleBlog}
                  class="flex items-center justify-center w-8 h-8 rounded-full text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 transition-colors duration-200"
                >
                  {#if expandedBlog}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  {/if}
                </button>
              </div>
              
              {#if expandedBlog}
                <div class="p-4">
                  {#if $currentProject.data.sample_content?.blog_post_ideas}
                    {#each $currentProject.data.sample_content.blog_post_ideas as post}
                      <div class="mb-4 bg-zinc-800 p-3 rounded-lg">
                        <h5 class="font-medium text-sm text-indigo-300 mb-1">{post.title}</h5>
                        <p class="text-sm text-zinc-200">{post.description}</p>
                      </div>
                    {/each}
                  {:else}
                    <p class="text-zinc-300">No blog post samples available.</p>
                  {/if}
                </div>
              {/if}
            </div>
            
            <!-- Social Media Content -->
            <div class="bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
              <div class="p-4 bg-zinc-800 border-b border-zinc-700 flex justify-between items-center">
                <h4 class="font-medium text-zinc-100">Reddit Post Ideas</h4>
                <button 
                  on:click={toggleReddit}
                  class="flex items-center justify-center w-8 h-8 rounded-full text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 transition-colors duration-200"
                >
                  {#if expandedReddit}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  {/if}
                </button>
              </div>
              
              {#if expandedReddit}
                <div class="p-4">
                  {#if $currentProject.data.sample_content?.reddit_post_ideas}
                    {#each $currentProject.data.sample_content.reddit_post_ideas as post}
                      <div class="mb-4 bg-zinc-800 p-3 rounded-lg">
                        <h5 class="font-medium text-sm text-indigo-300 mb-1">{post.title}</h5>
                        <p class="text-sm text-zinc-200">{post.description}</p>
                      </div>
                    {/each}
                  {:else}
                    <p class="text-zinc-300">No Reddit post samples available.</p>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
          
          
          <!-- Email Campaign Templates -->
          {#if $currentProject.data.content_samples?.email_templates}
            <div class="mt-6 bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
              <div class="p-4 bg-zinc-800 border-b border-zinc-700">
                <h4 class="font-medium text-zinc-100">Email Campaign Templates</h4>
              </div>
              <div class="p-4">
                {#each $currentProject.data.content_samples.email_templates as template}
                  <div class="mb-4 bg-zinc-800 p-3 rounded-lg">
                    <h5 class="font-medium text-sm text-indigo-300 mb-1">{template.name}</h5>
                    <p class="text-xs text-zinc-400 mb-2">Subject: {template.subject}</p>
                    <div class="text-sm text-zinc-200 bg-zinc-900 p-3 rounded border border-zinc-700">
                      <p>{template.body}</p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
          
          <!-- Content Calendar -->
          {#if $currentProject.data.content_samples?.content_calendar}
            <div class="mt-6 bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
              <div class="p-4 bg-zinc-800 border-b border-zinc-700">
                <h4 class="font-medium text-zinc-100">Content Calendar</h4>
              </div>
              <div class="p-4">
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-zinc-700">
                    <thead>
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Date</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Content Type</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Topic</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Channel</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-800">
                      {#each $currentProject.data.content_samples.content_calendar as item}
                        <tr>
                          <td class="px-4 py-2 text-sm text-zinc-300">{item.date}</td>
                          <td class="px-4 py-2 text-sm text-zinc-300">{item.content_type}</td>
                          <td class="px-4 py-2 text-sm text-zinc-300">{item.topic}</td>
                          <td class="px-4 py-2 text-sm text-zinc-300">{item.channel}</td>
                        </tr>
                      {/each}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          {/if}
        </div>
     {/if}
    </div>  
  </div>    
</div>