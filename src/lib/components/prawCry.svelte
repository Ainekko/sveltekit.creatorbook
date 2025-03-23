<script>
  import { onMount } from 'svelte';
  import { marked } from 'marked';

  // State variables
  let clientUrl = "";
  let isLoading = false;
  let error = null;
  let analysisResult = null;
  let expandedCompetitors = {};
  let expandedBlog = false;
  let expandedReddit = false;

  // Handle form submission
  async function analyzeWebsite() {
    if (!clientUrl) {
      error = "Please enter a website URL";
      return;
    }

    isLoading = true;
    error = null;
    analysisResult = null;

    try {
      const response = await fetch(`http://127.0.0.1:8000/cry_praw/analyze/?url=${encodeURIComponent(clientUrl)}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      analysisResult = await response.json();
      
      // Initialize competitor expand state
      if (analysisResult.competitors_analysis) {
        analysisResult.competitors_analysis.forEach((comp, index) => {
          expandedCompetitors[index] = false;
        });
      }
    } catch (err) {
      error = `Error analyzing website: ${err.message}`;
    } finally {
      isLoading = false;
    }
  }

  // Helper to toggle expansion states
  function toggleCompetitor(index) {
    expandedCompetitors[index] = !expandedCompetitors[index];
    expandedCompetitors = expandedCompetitors; // Trigger reactivity
  }

  function toggleBlog() {
    expandedBlog = !expandedBlog;
  }

  function toggleReddit() {
    expandedReddit = !expandedReddit;
  }

  // Helper to format relevance with color
  function getRelevanceColor(relevance) {
    switch (relevance.toLowerCase()) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  }
</script>

<div class="max-w-4xl mx-auto p-4">
  <div class="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h1 class="text-2xl font-bold text-center mb-6">Marketing Analysis Tool</h1>
    
    <form on:submit|preventDefault={analyzeWebsite} class="mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <input
          type="url"
          bind:value={clientUrl}
          placeholder="Enter client website URL (e.g., https://www.example.com)"
          class="flex-1 p-3 border rounded-md"
          required
        />
        <button
          type="submit"
          class="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Website'}
        </button>
      </div>
    </form>

    {#if isLoading}
      <div class="text-center p-8">
        <div class="inline-block w-8 h-8 border-4 border-t-blue-600 rounded-full animate-spin"></div>
        <p class="mt-2 text-gray-600">This may take 1-2 minutes to analyze competitors...</p>
      </div>
    {:else if error}
      <div class="bg-red-100 text-red-700 p-4 rounded-md">
        {error}
      </div>
    {:else if analysisResult}
      <div class="space-y-8">
        <!-- Website Analysis -->
        <div>
          <h2 class="text-xl font-semibold border-b pb-2">Website Analysis: {analysisResult.website_analysis.business_name}</h2>
          <div class="mt-4">
            <p><span class="font-medium">Industry:</span> {analysisResult.website_analysis.industry}</p>
            <p class="mt-2"><span class="font-medium">Description:</span> {analysisResult.website_analysis.description}</p>
          </div>
        </div>

        <!-- Competitors Analysis -->
        <div>
          <h2 class="text-xl font-semibold border-b pb-2">Competitors Found ({analysisResult.competitors_analysis.length})</h2>
          
          <div class="mt-4 space-y-4">
            {#each analysisResult.competitors_analysis as competitor, index}
              <div class="border rounded-md p-4">
                <div class="flex justify-between items-center">
                  <div>
                    <h3 class="font-medium">{competitor.name}</h3>
                    <div class="text-sm text-gray-600">
                      {#if competitor.domain}
                        <span>{competitor.domain}</span>
                      {:else}
                        <span class="italic">No domain found</span>
                      {/if}
                      <span class="ml-2 {getRelevanceColor(competitor.relevance)}">
                        Relevance: {competitor.relevance}
                      </span>
                    </div>
                  </div>
                  <button 
                    on:click={() => toggleCompetitor(index)}
                    class="text-blue-600 text-sm"
                  >
                    {expandedCompetitors[index] ? 'Hide Strategy' : 'View Strategy'}
                  </button>
                </div>

                {#if expandedCompetitors[index] && competitor.marketing_strategy}
                  <div class="mt-3 pt-3 border-t text-sm">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 class="font-medium">Content Types</h4>
                        <ul class="list-disc list-inside">
                          {#each competitor.marketing_strategy.content_types.slice(0, 3) as contentType}
                            <li>{contentType}</li>
                          {/each}
                        </ul>
                      </div>
                      <div>
                        <h4 class="font-medium">Lead Generation</h4>
                        <ul class="list-disc list-inside">
                          {#each competitor.marketing_strategy.lead_generation.slice(0, 3) as leadGen}
                            <li>{leadGen}</li>
                          {/each}
                        </ul>
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Strategy Recommendations Summary -->
        {#if analysisResult.strategy_recommendations}
          <div>
            <h2 class="text-xl font-semibold border-b pb-2">Strategy Recommendations</h2>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {#each Object.entries(analysisResult.strategy_recommendations).slice(0, 4) as [key, recommendations]}
                <div>
                  <h3 class="font-medium capitalize">{key.replace(/_/g, ' ')}</h3>
                  <ul class="mt-2 list-disc list-inside text-sm">
                    {#each recommendations.slice(0, 2) as rec}
                      <li>{rec.recommendation}</li>
                    {/each}
                  </ul>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Sample Content -->
        {#if analysisResult.sample_content}
          <div>
            <h2 class="text-xl font-semibold border-b pb-2">Sample Content</h2>
            
            <!-- Blog Post Preview -->
            <div class="mt-4 border rounded-md p-4">
              <div class="flex justify-between items-center">
                <h3 class="font-medium">Blog Post</h3>
                <button 
                  on:click={toggleBlog}
                  class="text-blue-600 text-sm"
                >
                  {expandedBlog ? 'Collapse' : 'Expand'}
                </button>
              </div>
              
              {#if expandedBlog}
                <div class="mt-4 prose max-w-none">
                  {@html marked(analysisResult.sample_content.blog_post)}
                </div>
              {:else}
                <div class="mt-2 text-sm text-gray-600">
                  {analysisResult.sample_content.blog_post.split('\n').slice(0, 3).join(' ').substring(0, 150)}...
                </div>
              {/if}
            </div>
            
            <!-- Reddit Post Preview -->
            <div class="mt-4 border rounded-md p-4">
              <div class="flex justify-between items-center">
                <h3 class="font-medium">Reddit Post</h3>
                <button 
                  on:click={toggleReddit}
                  class="text-blue-600 text-sm"
                >
                  {expandedReddit ? 'Collapse' : 'Expand'}
                </button>
              </div>
              
              {#if analysisResult.sample_content.reddit_post}
                <div class="mt-2">
                  <p class="font-medium">{analysisResult.sample_content.reddit_post.title}</p>
                  
                  {#if expandedReddit}
                    <div class="mt-2 text-sm">
                      {analysisResult.sample_content.reddit_post.body}
                    </div>
                  {:else}
                    <div class="mt-2 text-sm text-gray-600">
                      {analysisResult.sample_content.reddit_post.body.substring(0, 100)}...
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>