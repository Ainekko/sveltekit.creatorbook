<script>
  import { onMount } from 'svelte';
  import { marked } from 'marked';

  // State variables
  let clientUrl = "";
  let businessType = "";
  let marketingGoals = "";
  let useSampleData = false;
  let isLoading = false;
  let error = null;
  let analysisResult = null;
  let expandedCompetitors = {};
  let expandedBlog = false;
  let expandedReddit = false;

  // Handle form submission
  async function analyzeWebsite() {
    if (!clientUrl && !useSampleData) {
      error = "Please enter a website URL or use sample data";
      return;
    }

    isLoading = true;
    error = null;
    analysisResult = null;

    try {
      // If using sample data, generate mock response
      if (useSampleData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data that matches the expected API response
        analysisResult = {
          website_analysis: {
            business_name: "Sample Business",
            industry: businessType || "E-commerce",
            description: "An example business in the selected industry"
          },
          competitors_analysis: [
            {
              name: "Competitor A",
              domain: "competitora.com",
              relevance: "High",
              marketing_strategy: {
                content_types: ["Blog posts", "Social media", "Email newsletters"],
                lead_generation: ["Free trials", "Webinars", "Lead magnets"]
              }
            },
            {
              name: "Competitor B",
              domain: "competitorb.com",
              relevance: "Medium",
              marketing_strategy: {
                content_types: ["Video content", "Case studies", "Infographics"],
                lead_generation: ["Discount codes", "Referral program", "Content upgrades"]
              }
            },
            {
              name: "Competitor C",
              domain: "competitorc.com",
              relevance: "Low",
              marketing_strategy: {
                content_types: ["Podcasts", "Webinars", "eBooks"],
                lead_generation: ["Quizzes", "Free tools", "Email courses"]
              }
            }
          ],
          strategy_recommendations: {
            content_marketing: [
              { recommendation: "Focus on Reddit community engagement to build trust" },
              { recommendation: "Create comparative content highlighting your unique value" }
            ],
            social_media: [
              { recommendation: "Develop a dedicated Reddit content strategy" },
              { recommendation: "Engage in relevant subreddits where competitors are active" }
            ],
            lead_generation: [
              { recommendation: "Create Reddit-specific landing pages for conversions" },
              { recommendation: "Offer exclusive resources to Reddit community members" }
            ],
            audience_targeting: [
              { recommendation: "Target specific subreddits based on competitor activity" },
              { recommendation: "Develop buyer personas based on Reddit community feedback" }
            ]
          },
          sample_content: {
            blog_post: "# How to Leverage Reddit for Business Growth\n\nReddit offers unique opportunities for businesses looking to expand their reach and engage with potential customers. In this post, we'll explore how to effectively use Reddit as part of your marketing strategy.\n\n## Understanding Reddit Communities\n\nReddit is organized into thousands of communities called subreddits, each focused on specific topics or interests. Finding the right subreddits for your business is crucial for success.\n\n## Engagement Strategies That Work\n\nUnlike other social platforms, Reddit users value authenticity and genuine contributions. Hard selling rarely works and can damage your reputation.\n\n## Building a Long-term Presence\n\nConsistency and providing value are key to building a successful presence on Reddit.",
            reddit_post: {
              title: "I analyzed the top competitors in the [Industry] space - here's what I learned (with data)",
              body: "After spending weeks researching the top players in our industry, I've compiled some interesting insights about what's working and what's not in their marketing strategies. I thought this might be helpful for others in this subreddit.\n\nKey findings:\n- The most successful companies are focusing on X, Y, and Z\n- Engagement rates are highest when content includes A and B\n- Customer acquisition costs have been trending downward for companies that implement C\n\nI'd be happy to answer any questions or provide more specific details about my research methodology!"
            }
          }
        };
      } else {
        // Real API call
        const response = await fetch(`http://127.0.0.1:8000/cry_praw/analyze/?url=${encodeURIComponent(clientUrl)}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        analysisResult = await response.json();
      }
      
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

  // Helper functions
  function toggleCompetitor(index) {
    expandedCompetitors[index] = !expandedCompetitors[index];
    expandedCompetitors = {...expandedCompetitors}; // Trigger reactivity
  }

  function toggleBlog() {
    expandedBlog = !expandedBlog;
  }

  function toggleReddit() {
    expandedReddit = !expandedReddit;
  }

  function getRelevanceColor(relevance) {
    switch (relevance.toLowerCase()) {
      case 'high': return 'text-rose-600';
      case 'medium': return 'text-amber-600';
      case 'low': return 'text-emerald-600';
      default: return 'text-zinc-600';
    }
  }
</script>

<section class="min-h-screen bg-white py-20 px-8">
  <div class="max-w-6xl mx-auto">
    <!-- Section Header -->
    <div class="flex items-center gap-4 mb-12">
      <div class="w-10 h-10 rounded-full flex items-center justify-center">

        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zm302.5-49.5c0 137-111 248-248 248s-248-111-248-248 111-248 248-248 248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zm-68.9 116.2c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z"/></svg>
       
      </div>
      <h2 class="text-3xl text-zinc-600 md:text-4xl font-semibold">Reddit Research Agent</h2>
    </div>
    
    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Left Column: Description -->
      <div class="flex flex-col justify-center text-zinc-700">
        <h3 class="text-2xl font-medium mb-6">Competitive intelligence at your fingertips</h3>
        <ul class="space-y-4">
          <li class="flex items-start gap-3">
            
            <p class="text-zinc-600">Analyzes your website and discovers relevant competitors</p>
          </li>
          <li class="flex items-start gap-3">
            
            <p class="text-zinc-600">Scans Reddit for valuable competitor intelligence</p>
          </li>
          <li class="flex items-start gap-3">
            
            <p class="text-zinc-600">Compares your marketing strategy against competitors</p>
          </li>
          <li class="flex items-start gap-3">
            
            <p class="text-zinc-600">Creates customized marketing strategy recommendations</p>
          </li>
          <li class="flex items-start gap-3">
            
            <p class="text-zinc-600">Generates ready-to-use blog and Reddit content</p>
          </li>
        </ul>
        
        <div class="mt-8">
          <a href="#pricing" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-black rounded-full hover:bg-zinc-800 transition">
            See full capabilities
            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
      
     <!-- Right Column: Interactive Demo -->
<div>
  <div class="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 shadow-sm">
    <!-- Terminal-like header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-rose-400"></div>
        <div class="w-3 h-3 rounded-full bg-amber-400"></div>
        <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
      </div>
      <div class="text-sm text-zinc-500">
        <svg class="w-3 h-3" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="m201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zm302.5-49.5c0 137-111 248-248 248s-248-111-248-248 111-248 248-248 248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zm-68.9 116.2c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z" fill="#ffffff"/>
        </svg>
        Reddit Research Agent Demo</div>
      <div class="w-4"></div> <!-- Spacer for alignment -->
    </div>
    
    <!-- Form -->
    {#if !analysisResult}
      <form on:submit|preventDefault={analyzeWebsite} class="space-y-6">
        <div>
          <label for="website-url" class="block text-sm font-medium text-zinc-900 mb-1">Your website URL</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
            </div>
            <input 
              type="url" 
              bind:value={clientUrl} 
              id="website-url" 
              class="pl-10 block w-full rounded-lg border border-zinc-300 bg-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
              placeholder="https://yourbusiness.com"
            >
          </div>
        </div>
        
        <div>
          <label for="business-type" class="block text-sm font-medium text-zinc-900 mb-1">Business type</label>
          <select 
            bind:value={businessType} 
            id="business-type" 
            class="block w-full rounded-lg border border-zinc-300 bg-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="" selected disabled>Select your business type</option>
            <option value="ecommerce">E-commerce</option>
            <option value="saas">SaaS</option>
            <option value="service">Service Business</option>
            <option value="local">Local Business</option>
            <option value="content">Content Creator</option>
          </select>
        </div>
        
        <div>
          <label for="marketing-goals" class="block text-sm font-medium text-zinc-900 mb-1">Marketing goals (optional)</label>
          <textarea 
            bind:value={marketingGoals} 
            id="marketing-goals" 
            rows="3" 
            class="block w-full rounded-lg border border-zinc-300 bg-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
            placeholder="What are your main marketing objectives?"
          ></textarea>
        </div>
        
        <div class="flex items-center justify-between pt-2">
          <div class="flex items-center">
            <input 
              bind:checked={useSampleData} 
              id="sample-data" 
              type="checkbox" 
              class="h-4 w-4 text-black border-zinc-300 rounded focus:ring-black"
            >
            <label for="sample-data" class="ml-2 block text-sm text-zinc-900">Use sample data</label>
          </div>
          
          <button 
            type="submit" 
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-black hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            disabled={isLoading}
          >
            <span>{isLoading ? 'Analyzing...' : 'Analyze'}</span>
            <div class="ml-2 w-4 h-4 rounded-full bg-[#fffbbd]"></div>
          </button>
        </div>
      </form>

      {#if error}
        <div class="mt-4 p-3 bg-rose-50 text-rose-600 rounded-lg text-sm">
          {error}
        </div>
      {/if}

      {#if isLoading}
        <div class="mt-6 flex flex-col items-center justify-center">
          <div class="w-8 h-8 border-4 border-t-black rounded-full animate-spin"></div>
          <p class="mt-4 text-sm text-zinc-500">Analyzing your website and competitors...</p>
          <p class="text-xs text-zinc-400">This may take 1-2 minutes</p>
        </div>
      {/if}
    {/if}

    <!-- Results display -->
    {#if analysisResult && !isLoading}
      <div class="space-y-6">
        <!-- Header with reset option -->
        <div class="flex justify-between items-center">
          <h3 class="font-medium text-lg text-zinc-900">Analysis Results</h3>
          <button 
            on:click={() => { analysisResult = null; error = null; }}
            class="text-sm text-zinc-500 hover:text-black"
          >
            New Analysis
          </button>
        </div>

        <!-- Competitors Found -->
        <div>
          <h4 class="text-sm font-medium mb-2 text-zinc-900">Discovered {analysisResult.competitors_analysis.length} relevant competitors</h4>
          <div class="flex flex-wrap gap-2">
            {#each analysisResult.competitors_analysis as competitor}
              <span class="px-2 py-1 bg-zinc-100 rounded-full text-xs text-zinc-900">
                {competitor.name}
              </span>
            {/each}
          </div>
        </div>

        <!-- Strategy Recommendation -->
        <div>
          <p class="text-sm text-zinc-900">
            <span class="font-medium">Strategy recommendation:</span> 
            <span class="text-zinc-900">
              {#if analysisResult.strategy_recommendations?.content_marketing && analysisResult.strategy_recommendations.content_marketing.length > 0}
                {analysisResult.strategy_recommendations.content_marketing[0].recommendation}
              {:else if analysisResult.strategy_recommendations?.social_media && analysisResult.strategy_recommendations.social_media.length > 0}
                {analysisResult.strategy_recommendations.social_media[0].recommendation}
              {:else}
                Focus on targeted marketing strategies
              {/if}
            </span>
          </p>
        </div>

        <!-- See Full Analysis Button -->
        <button 
          on:click={() => { expandedCompetitors = {}; expandedBlog = true; expandedReddit = true; }}
          class="w-full py-2 border border-zinc-300 rounded-lg text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition"
        >
          View Full Analysis
        </button>

        <!-- Expanded Analysis (always shown for competitors by default) -->
        <div class="pt-4 mt-4 border-t border-zinc-200 space-y-4">
          
          <!-- Competitor Marketing Strategy - All open by default -->
          {#each analysisResult.competitors_analysis as competitor, index}
            <div class="p-3 bg-zinc-50 rounded-lg">
              <div class="flex justify-between items-center mb-2">
                <h5 class="font-medium text-zinc-900">{competitor.name} Strategy</h5>
                <button 
                  on:click={() => toggleCompetitor(index)}
                  class="text-xs text-zinc-500"
                >
                  Hide
                </button>
              </div>
              
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p class="font-medium mb-1 text-zinc-900">Content Types:</p>
                  <ul class="list-disc list-inside text-zinc-900">
                    {#if competitor.marketing_strategy && competitor.marketing_strategy.content_types}
                      {#each competitor.marketing_strategy.content_types.slice(0, 3) as contentType}
                        <li>{contentType}</li>
                      {/each}
                    {:else}
                      <li>No content types found</li>
                    {/if}
                  </ul>
                </div>
                <div>
                  <p class="font-medium mb-1 text-zinc-900">Lead Generation:</p>
                  <ul class="list-disc list-inside text-zinc-900">
                    {#if competitor.marketing_strategy && competitor.marketing_strategy.lead_generation}
                      {#each competitor.marketing_strategy.lead_generation.slice(0, 3) as leadGen}
                        <li>{leadGen}</li>
                      {/each}
                    {:else}
                      <li>No lead generation strategies found</li>
                    {/if}
                  </ul>
                </div>
              </div>
            </div>
          {/each}

          <!-- Strategy Recommendations -->
          {#if expandedBlog}
            <div class="p-3 bg-zinc-50 rounded-lg">
              <div class="flex justify-between items-center mb-2">
                <h5 class="font-medium text-zinc-900">Strategy Recommendations</h5>
                <button 
                  on:click={toggleBlog}
                  class="text-xs text-zinc-500"
                >
                  Hide
                </button>
              </div>
              <div class="text-xs">
                {#if analysisResult.strategy_recommendations}
                  <div class="space-y-2">
                    {#if analysisResult.strategy_recommendations.content_marketing}
                      <div>
                        <p class="font-medium text-zinc-900">Content Marketing:</p>
                        <ul class="list-disc list-inside text-zinc-900">
                          {#each analysisResult.strategy_recommendations.content_marketing as item}
                            <li>{item.recommendation}</li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                    
                    {#if analysisResult.strategy_recommendations.social_media}
                      <div>
                        <p class="font-medium text-zinc-900">Social Media:</p>
                        <ul class="list-disc list-inside text-zinc-900">
                          {#each analysisResult.strategy_recommendations.social_media as item}
                            <li>{item.recommendation}</li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                    
                    {#if analysisResult.strategy_recommendations.lead_generation}
                      <div>
                        <p class="font-medium text-zinc-900">Lead Generation:</p>
                        <ul class="list-disc list-inside text-zinc-900">
                          {#each analysisResult.strategy_recommendations.lead_generation as item}
                            <li>{item.recommendation}</li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                    
                    {#if analysisResult.strategy_recommendations.audience_targeting}
                      <div>
                        <p class="font-medium text-zinc-900">Audience Targeting:</p>
                        <ul class="list-disc list-inside text-zinc-900">
                          {#each analysisResult.strategy_recommendations.audience_targeting as item}
                            <li>{item.recommendation}</li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                  </div>
                {:else}
                  <p class="text-zinc-900">No strategy recommendations available.</p>
                {/if}
              </div>
            </div>
          {/if}

          <!-- Sample Content Previews -->
          {#if analysisResult.sample_content?.blog_post}
            <div class="p-3 bg-zinc-50 rounded-lg">
              <div class="flex justify-between items-center mb-2">
                <h5 class="font-medium text-zinc-900">Sample Blog Post</h5>
                <button 
                  on:click={toggleBlog}
                  class="text-xs text-zinc-500"
                >
                  {expandedBlog ? 'Hide' : 'Show'}
                </button>
              </div>
              {#if expandedBlog}
                <div class="text-xs prose prose-sm max-w-none text-zinc-900">
                  {@html marked(analysisResult.sample_content.blog_post.substring(0, 200) + '...')}
                </div>
              {:else}
                <div class="text-xs text-zinc-500">Click to see sample blog content</div>
              {/if}
            </div>
          {/if}

          {#if analysisResult.sample_content?.reddit_post}
            <div class="p-3 bg-zinc-50 rounded-lg">
              <div class="flex justify-between items-center mb-2">
                <h5 class="font-medium text-zinc-900">Sample Reddit Post</h5>
                <button 
                  on:click={toggleReddit}
                  class="text-xs text-zinc-500"
                >
                  {expandedReddit ? 'Hide' : 'Show'}
                </button>
              </div>
              {#if expandedReddit}
                <div class="text-xs">
                  <p class="font-medium text-zinc-900">{analysisResult.sample_content.reddit_post.title}</p>
                  <p class="mt-1 text-zinc-900">{analysisResult.sample_content.reddit_post.body.substring(0, 150)}...</p>
                </div>
              {:else}
                <div class="text-xs text-zinc-500">Click to see sample Reddit content</div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    {/if}

    {#if !isLoading && !analysisResult}
      <!-- Preview for when no analysis has been run -->
      <div class="mt-8 pt-6 border-t border-zinc-200">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <p class="text-sm font-medium text-zinc-900">Results preview</p>
        </div>
        
        <div class="space-y-3 text-sm text-zinc-900">
          <p class="font-medium">Discovered 3 relevant competitors</p>
          <div class="flex gap-2">
            <span class="px-2 py-1 bg-zinc-100 rounded-full text-xs text-zinc-900">Competitor A</span>
            <span class="px-2 py-1 bg-zinc-100 rounded-full text-xs text-zinc-900">Competitor B</span>
            <span class="px-2 py-1 bg-zinc-100 rounded-full text-xs text-zinc-900">Competitor C</span>
          </div>
          <p>Strategy recommendation: <span class="text-zinc-900">Focus on Reddit community engagement</span></p>
          <p class="text-xs text-zinc-500">Complete analysis includes blog post and Reddit content examples</p>
        </div>
      </div>
    {/if}
  </div>
  
  <!-- Social proof -->
  <div class="mt-6 px-4">
    <p class="text-sm text-zinc-500 text-center">Trusted by 100+ businesses to improve their marketing strategy</p>
  </div>
</div>
    </div>
  </div>
</section>