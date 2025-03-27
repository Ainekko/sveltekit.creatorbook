<script>
  import { get_user } from '$lib/check';
  import AreaChart from '$lib/components/AreaChart.svelte';
  import { onMount } from 'svelte';
  import { userStore } from '$lib/stores';
  import { writable } from 'svelte/store';
  import Chat from '$lib/components/Chat.svelte';
  import { fly } from 'svelte/transition';
  import IdeaForm from '$lib/components/IdeaForm.svelte';

  // Store for marketing analysis data
  let marketingAnalysis = writable(null);
  let activeTab = writable('competitors');

  // Sample data for the demo
  const sampleAnalysis = {
    website_analysis: {
      business_name: "TalkMe AI",
      industry: "AI Conversation Tools",
      description: "Conversational AI platform for business communications",
      target_audience: "Small to medium businesses looking to automate customer service",
      key_features: ["Custom AI Agents", "24/7 Support", "Easy Integration", "Analytics Dashboard"]
    },
    current_marketing_strategy: {
      social_presence: ["LinkedIn", "Twitter"],
      content_focus: "Technical tutorials and business use cases",
      engagement_rate: "Moderate",
      strengths: ["Technical expertise", "Product innovation"],
      weaknesses: ["Limited brand awareness", "Few customer testimonials"]
    },
    competitors_analysis: [
      {
        name: "ChatFlow",
        domain: "chatflow.io",
        reddit_mentions: 156,
        sentiment: "Positive",
        marketing_channels: ["Reddit", "Product Hunt", "LinkedIn"],
        content_strategy: "Educational content and case studies"
      },
      {
        name: "TalkBot",
        domain: "talkbot.com",
        reddit_mentions: 89,
        sentiment: "Mixed",
        marketing_channels: ["Facebook", "Twitter", "Industry forums"],
        content_strategy: "Video tutorials and free templates"
      },
      {
        name: "ConvoAI",
        domain: "convoai.tech",
        reddit_mentions: 213,
        sentiment: "Very positive",
        marketing_channels: ["Reddit", "Discord", "YouTube"],
        content_strategy: "Community-driven content and open source tools"
      }
    ],
    strategy_recommendations: {
      primary_channels: ["Reddit", "Product Hunt", "LinkedIn"],
      content_types: ["Case studies", "Comparison guides", "How-to tutorials"],
      positioning: "Emphasize ease of use and quick implementation compared to competitors",
      community_strategy: "Create a dedicated subreddit and contribute to r/SaaS and r/AItools",
      action_items: [
        "Launch a weekly newsletter showcasing AI use cases",
        "Create comparison content against top competitors",
        "Develop a referral program for existing users",
        "Host monthly webinars on AI implementation"
      ]
    },
    sample_content: {
      reddit_post: "# How we reduced customer service costs by 62% with custom AI agents\n\nHi r/SaaS,\n\nI wanted to share how our team at [Company] implemented TalkMe's AI agents to handle our tier-1 support tickets. Within 3 months, we saw:\n\n- 62% reduction in support costs\n- 24/7 coverage without adding headcount\n- 94% customer satisfaction (up from 82%)\n\nThe implementation took less than a week, and the AI continues to learn from our existing knowledge base.\n\nHappy to answer any questions about our experience or share details about the setup process!",
      
      blog_post: "# 5 Ways AI Agents Are Transforming Customer Service in 2025\n\nIn today's competitive business landscape, customer service can make or break your brand. With advancements in AI technology, companies now have powerful new tools to enhance customer experiences while reducing operational costs.\n\nHere's how forward-thinking businesses are leveraging AI agents to transform their customer service operations:\n\n1. **24/7 Multilingual Support**\n   Even small businesses can now offer round-the-clock support in multiple languages without the need for large international teams.\n\n2. **Personalized Experiences at Scale**\n   AI agents can access customer history and preferences to provide tailored responses that feel personal even when handling thousands of inquiries.\n\n3. **Seamless Escalation Protocols**\n   Modern AI knows when to handle an issue itself and when to bring in human agents, creating a smooth experience for customers.\n\n4. **Proactive Problem Resolution**\n   The most advanced systems can identify potential issues before customers report them, reaching out with solutions proactively.\n\n5. **Continuous Improvement Through Learning**\n   Each interaction helps the AI improve, creating a constantly evolving support system that gets better with time.\n\nImplementing these AI-driven approaches doesn't require massive technical overhauls. Platforms like TalkMe AI are designed to integrate with existing systems, allowing businesses to transform their customer service operations in days rather than months."
    }
  };

  onMount(async () => {
    // Set sample data for demo purposes
    marketingAnalysis.set(sampleAnalysis);
    
    try {
      const user_data = await get_user();
      if (user_data) {
        userStore.set({
          username: user_data.username,
          user_id: user_data.user_id,
          user_email: user_data.email,
          subscription_status: user_data.subscription_status
        });
      } else {
        console.error('User data could not be fetched.');
      }
    } catch (error) {
      console.error('An error occurred while fetching user data:', error);
    }
  });

  // Reactive declarations
  $: $userStore;
  $: $marketingAnalysis;
  $: $activeTab;
</script>

<div class="min-h-[70vh] h-auto md:h-screen flex flex-col w-full pl-5 pt-5 bg-whit text-gray-800">
  <div class="px-4 py-2 w-auto h-8 flex flex-row items-center gap-3 bg-gr rounded-full shadow-sm mb-6" in:fly={{ y: 20, duration: 500 }}>
    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
    <p class="font-medium">
      {$userStore?.username || 'Client'} 
      {#if $userStore?.subscription_status === 'premium'} <span class="text-amber-500">★</span> {/if}
    </p>
  </div>

  <div class="flex flex-col md:flex-row gap-6 w-full pr-5">
    <!-- Overview panel -->
    <div class="bg-zinc-900 rounded-xl shadow-sm p-6 md:w-1/3" in:fly={{ y: 20, duration: 500 }}>
      <h2 class="text-2xl font-bold mb-4 text-gray-900">Marketing AI Dashboard</h2>
      
      {#if $marketingAnalysis}
        <div class="mb-6  text-zinc-200">
          <h3 class="text-lg font-semibold mb-2">Website Analysis</h3>
          <div class="p-4 bg-zinc-900 rounded-lg shadow-inner ">
            <p class="font-medium  ">{$marketingAnalysis.website_analysis.business_name}</p>
            <p class=" text-sm mb-2 ">{$marketingAnalysis.website_analysis.industry}</p>
            <p class=" mb-3">{$marketingAnalysis.website_analysis.description}</p>
            
            <div class="mt-3 text-zinc-200">
              <p class="text-sm font-medium ">Target Audience:</p>
              <p class="text-sm ">{$marketingAnalysis.website_analysis.target_audience}</p>
            </div>
            
            <div class="mt-3">
              <p class="text-sm font-medium text-gray-300">Key Features:</p>
              <ul class="list-disc list-inside text-sm text-gray-300">
                {#each $marketingAnalysis.website_analysis.key_features as feature}
                  <li>{feature}</li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Current Marketing</h3>
          <div class="p-4 bg-white rounded-lg shadow-inner">
            <div class="flex justify-between mb-2">
              <p class="text-sm font-medium text-gray-700">Social Presence:</p>
              <p class="text-sm text-gray-600">{$marketingAnalysis.current_marketing_strategy.social_presence.join(', ')}</p>
            </div>
            
            <div class="flex justify-between mb-2">
              <p class="text-sm font-medium text-gray-700">Content Focus:</p>
              <p class="text-sm text-gray-600">{$marketingAnalysis.current_marketing_strategy.content_focus}</p>
            </div>
            
            <div class="flex justify-between mb-2">
              <p class="text-sm font-medium text-gray-700">Engagement:</p>
              <p class="text-sm text-gray-600">{$marketingAnalysis.current_marketing_strategy.engagement_rate}</p>
            </div>
          </div>
        </div>
      {/if}
      
      <div class="mt-6 flex flex-col gap-2">
        <button class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Request New Analysis
        </button>
        <button class="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium" popovertarget="chat-popover">
          Chat with Marketing AI
        </button>
      </div>
    </div>
    
    <!-- Main content area -->
    <div class="bg-zinc-900 md:w-2/3 rounded-xl" in:fly={{ y: 20, duration: 500, delay: 200 }}>
      <!-- Tabs -->
      <div class="flex border-b border-gray-200">
        <button 
          class="px-4 py-2 font-medium text-sm {$activeTab === 'competitors' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}"
          on:click={() => activeTab.set('competitors')}>
          Competitor Analysis
        </button>
        <button 
          class="px-4 py-2 font-medium text-sm {$activeTab === 'strategy' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}"
          on:click={() => activeTab.set('strategy')}>
          Strategy Recommendations
        </button>
        <button 
          class="px-4 py-2 font-medium text-sm {$activeTab === 'content' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}"
          on:click={() => activeTab.set('content')}>
          Sample Content
        </button>
      </div>
      
      <!-- Tab content -->
      <div class="p-4 text-zinc-300">
        {#if $activeTab === 'competitors' && $marketingAnalysis}
          <div>
            <h2 class="text-xl font-bold mb-4">Reddit Competitor Analysis</h2>
            <p class="text-gray-200 mb-4">Based on Reddit data, we've identified these key competitors and analyzed their marketing strategies.</p>
            
            <div class="grid bg-zinc-900 md:grid-cols-2 gap-4">
              {#each $marketingAnalysis.competitors_analysis as competitor}
                <div class="border border-zinc-800 rounded-lg shadow-2xl shadow-green-300/10 p-4 hover:shadow-md transition-shadow bg-zinc-900">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="font-bold">{competitor.name}</h3>
                    <span class="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{competitor.reddit_mentions} mentions</span>
                  </div>
                  <p class="text-sm text-gray-500 mb-1">{competitor.domain}</p>
                  <div class="flex gap-2 mb-2">
                    <span class="text-sm font-medium">Sentiment:</span>
                    <span class="text-sm {competitor.sentiment.includes('positive') ? 'text-green-600' : 'text-orange-600'}">{competitor.sentiment}</span>
                  </div>
                  <div class="mb-2">
                    <p class="text-sm font-medium">Marketing Channels:</p>
                    <div class="flex flex-wrap gap-1 mt-1">
                      {#each competitor.marketing_channels as channel}
                        <span class="text-xs bg-gray-200 px-2 py-1 rounded-full">{channel}</span>
                      {/each}
                    </div>
                  </div>
                  <div>
                    <p class="text-sm font-medium">Content Strategy:</p>
                    <p class="text-sm text-gray-600">{competitor.content_strategy}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {:else if $activeTab === 'strategy' && $marketingAnalysis}
          <div>
            <h2 class="text-xl font-bold mb-4">AI-Generated Strategy Recommendations</h2>
            <p class="text-gray-600 mb-4">Based on your website analysis and competitor research, here are our recommended marketing strategies.</p>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
              <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 class="font-medium mb-2">Recommended Channels</h3>
                <div class="flex flex-wrap gap-2">
                  {#each $marketingAnalysis.strategy_recommendations.primary_channels as channel}
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{channel}</span>
                  {/each}
                </div>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 class="font-medium mb-2">Content Focus</h3>
                <div class="flex flex-wrap gap-2">
                  {#each $marketingAnalysis.strategy_recommendations.content_types as type}
                    <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">{type}</span>
                  {/each}
                </div>
              </div>
            </div>
            
            <div class="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
              <h3 class="font-medium mb-2">Positioning Strategy</h3>
              <p class="text-gray-700">{$marketingAnalysis.strategy_recommendations.positioning}</p>
            </div>
            
            <div class="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
              <h3 class="font-medium mb-2">Community Strategy</h3>
              <p class="text-gray-700">{$marketingAnalysis.strategy_recommendations.community_strategy}</p>
            </div>
            
            <div>
              <h3 class="font-medium mb-2">Action Plan</h3>
              <ul class="list-disc list-inside space-y-2 text-gray-700 pl-2">
                {#each $marketingAnalysis.strategy_recommendations.action_items as item}
                  <li>{item}</li>
                {/each}
              </ul>
            </div>
          </div>
        {:else if $activeTab === 'content' && $marketingAnalysis}
          <div>
            <h2 class="text-xl font-bold mb-4">AI-Generated Sample Content</h2>
            <p class="text-gray-600 mb-4">Based on our analysis, here are sample content pieces optimized for your audience and marketing goals.</p>
            
            <div class="mb-6">
              <h3 class="font-medium text-lg mb-2">Sample Reddit Post</h3>
              <div class="border border-gray-200 rounded-lg p-4 bg-gray-50 whitespace-pre-line">
                {$marketingAnalysis.sample_content.reddit_post}
              </div>
            </div>
            
            <div>
              <h3 class="font-medium text-lg mb-2">Sample Blog Post</h3>
              <div class="border border-gray-200 rounded-lg p-4 bg-gray-50 whitespace-pre-line">
                {$marketingAnalysis.sample_content.blog_post}
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<div class="relative" in:fly={{ y: 20, duration: 500 }} id="chat-popover" popover="manual">
  <div class="bg-white rounded-xl shadow-lg p-4 max-w-md w-full">
    <button class="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700" popovertarget="chat-popover" popovertargetaction="hide">
      <span class="font-mono">✕</span>
    </button>
    
    <Chat />
  </div>
</div>

<div class="relative" in:fly={{ y: 20, duration: 500 }} id="idea-popover" popover="manual">
  <div class="bg-white rounded-xl shadow-lg p-4 max-w-md w-full">
    <button class="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700" popovertarget="idea-popover" popovertargetaction="hide">
      <span class="font-mono">✕</span>
    </button>
    
    <IdeaForm />
  </div>
</div>