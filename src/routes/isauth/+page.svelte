<script>
  import { onMount } from 'svelte';
  
  // Project data from route params
  export let projectData = {
    id: "123",
    name: "Tech Software Blog",
    url: "techsoftwareblog.com",
    startDate: "2025-04-10"
  };
  
  // Weekly content states
  let selectedWeek = "Current Week"; // Default selected week
  let expanded = {}; // Store expanded state of content items
  let scheduledItems = {}; // Track scheduled items
  
  // Toggle expanded state for content
  function toggleExpand(id) {
    expanded[id] = !expanded[id];
  }
  
  // Schedule a post
  function schedulePost(id) {
    scheduledItems[id] = true;
  }
  
  // Generate new content for the week
  function generateNewContent() {
    alert("Generating new content recommendations...");
  }
  
  // Weekly content data
  let weeklyContent = [
    { 
      id: "tw1",
      type: "twitter",
      date: "2025-04-15",
      title: "New Features Release",
      draft: "Just released our latest update with 5 game-changing features that will transform how you manage your workflow!",
      hashtags: "#ProductUpdate #TechTips #Productivity",
      scheduled: false
    },
    {
      id: "rd1",
      type: "reddit",
      date: "2025-04-16",
      title: "Tech Stack Discussion",
      draft: "We've been using React + Node.js for our latest project, but considering switching to Svelte. What are your experiences with both frameworks?",
      subreddit: "r/webdev",
      scheduled: false
    },
    {
      id: "seo1",
      type: "seo",
      date: "2025-04-17",
      title: "Top 10 Developer Tools in 2025",
      keywords: ["developer tools", "coding efficiency", "tech stack"],
      outline: "Introduction to modern development tools\n- IDE recommendations\n- Version control systems comparison\n- Testing frameworks overview\n- CI/CD tools\n- Conclusion and recommendations",
      scheduled: false
    }
  ];
  
  // Analytics data (simplified for demo)
  let analyticsData = {
    engagement: 78,
    views: 1234,
    conversions: 42
  };
  
  onMount(() => {
    // Any initialization logic
  });
</script>

<div class="min-h-screen bg-zinc-900 text-white">
  <!-- Project Header -->
  <header class="bg-gradient-to-r from-violet-600 to-pink-500 py-4 px-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">{projectData.name}</h1>
        <p class="text-sm opacity-80">{projectData.url}</p>
      </div>
      <div class="flex gap-3">
        <button class="bg-black/20 hover:bg-black/30 px-4 py-2 rounded-md text-sm flex items-center gap-2 transition">
          <span class="text-lg">📅</span>
          Started on {projectData.startDate}
        </button>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="p-6 space-y-6">
    <!-- Quick Analytics -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-zinc-800 p-4 rounded-lg flex items-center">
        <div class="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center mr-3">
          <span class="text-violet-400 text-lg">🐦</span>
        </div>
        <div>
          <p class="text-zinc-400 text-sm">Social Engagement</p>
          <p class="text-xl font-medium">{analyticsData.engagement}%</p>
        </div>
      </div>
      
      <div class="bg-zinc-800 p-4 rounded-lg flex items-center">
        <div class="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
          <span class="text-pink-400 text-lg">📝</span>
        </div>
        <div>
          <p class="text-zinc-400 text-sm">Content Views</p>
          <p class="text-xl font-medium">{analyticsData.views}</p>
        </div>
      </div>
      
      <div class="bg-zinc-800 p-4 rounded-lg flex items-center">
        <div class="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center mr-3">
          <span class="text-violet-400 text-lg">✓</span>
        </div>
        <div>
          <p class="text-zinc-400 text-sm">Conversions</p>
          <p class="text-xl font-medium">{analyticsData.conversions}</p>
        </div>
      </div>
    </section>

    <!-- Weekly Content Section -->
    <section class="bg-zinc-800 p-6 rounded-lg">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <h2 class="text-xl font-semibold">Weekly Content Plan</h2>
          <div class="relative">
            <button class="bg-zinc-700 rounded-md px-3 py-1 text-sm flex items-center gap-1">
              {selectedWeek} <span class="text-xs">▼</span>
            </button>
          </div>
        </div>
        <button 
          on:click={generateNewContent}
          class="bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 px-4 py-2 rounded-md text-sm flex items-center gap-2 transition"
        >
          <span class="text-sm">+</span>
          Generate New Content
        </button>
      </div>
      
      <!-- Content Items -->
      <div class="space-y-4">
        {#each weeklyContent as item}
          <div class="bg-zinc-900 rounded-lg overflow-hidden">
            <!-- Content Header -->
            <div class="flex items-center justify-between p-4 cursor-pointer" on:click={() => toggleExpand(item.id)}>
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                  {#if item.type === 'twitter'}
                    <span class="text-violet-400">🐦</span>
                  {:else if item.type === 'reddit'}
                    <span class="text-violet-400">💬</span>
                  {:else if item.type === 'seo'}
                    <span class="text-violet-400">📊</span>
                  {/if}
                </div>
                <div>
                  <p class="font-medium">{item.title}</p>
                  <p class="text-xs text-zinc-400 flex items-center gap-1">
                    <span class="text-xs">🕒</span> {item.date}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                {#if scheduledItems[item.id]}
                  <span class="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Scheduled</span>
                {:else}
                  <span class="bg-violet-500/20 text-violet-400 text-xs px-2 py-1 rounded">Draft</span>
                {/if}
                <span class={expanded[item.id] ? "rotate-180 transition-transform text-xs" : "transition-transform text-xs"}>▼</span>
              </div>
            </div>
            
            <!-- Expanded Content -->
            {#if expanded[item.id]}
              <div class="p-4 pt-0 border-t border-zinc-800">
                {#if item.type === 'twitter'}
                  <div class="mb-3">
                    <p class="text-sm text-zinc-300 mb-1">Tweet:</p>
                    <p class="bg-zinc-800 p-3 rounded">{item.draft}</p>
                  </div>
                  <div>
                    <p class="text-sm text-zinc-300 mb-1">Hashtags:</p>
                    <p class="text-pink-400">{item.hashtags}</p>
                  </div>
                {:else if item.type === 'reddit'}
                  <div class="mb-3">
                    <p class="text-sm text-zinc-300 mb-1">Subreddit: <span class="text-pink-400">{item.subreddit}</span></p>
                    <p class="text-sm text-zinc-300 mb-1">Post:</p>
                    <p class="bg-zinc-800 p-3 rounded">{item.draft}</p>
                  </div>
                {:else if item.type === 'seo'}
                  <div class="mb-3">
                    <p class="text-sm text-zinc-300 mb-1">Target Keywords:</p>
                    <div class="flex flex-wrap gap-2 mb-3">
                      {#each item.keywords as keyword}
                        <span class="bg-violet-500/20 text-violet-400 text-xs px-2 py-1 rounded">{keyword}</span>
                      {/each}
                    </div>
                    <p class="text-sm text-zinc-300 mb-1">Content Outline:</p>
                    <pre class="bg-zinc-800 p-3 rounded text-sm whitespace-pre-wrap">{item.outline}</pre>
                  </div>
                {/if}
                
                <!-- Expand/Schedule Buttons -->
                <div class="flex justify-end mt-4 gap-2">
                  <button class="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded text-sm flex items-center gap-1 transition">
                    <span class="text-xs">✏️</span> Edit
                  </button>
                  {#if !scheduledItems[item.id]}
                    <button 
                      on:click={() => schedulePost(item.id)}
                      class="bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 px-3 py-1 rounded text-sm flex items-center gap-1 transition"
                    >
                      <span class="text-xs">🕒</span> Schedule
                    </button>
                  {/if}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </section>
    
    <!-- SEO Performance -->
    <section class="bg-zinc-800 p-6 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">SEO Performance</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-zinc-900 p-4 rounded-lg">
          <h3 class="text-pink-400 font-medium mb-2">Top Performing Keywords</h3>
          <ul class="space-y-2">
            <li class="flex justify-between items-center">
              <span>tech software tools</span>
              <span class="text-green-400">+12%</span>
            </li>
            <li class="flex justify-between items-center">
              <span>developer productivity</span>
              <span class="text-green-400">+8%</span>
            </li>
            <li class="flex justify-between items-center">
              <span>coding best practices</span>
              <span class="text-yellow-400">+2%</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-zinc-900 p-4 rounded-lg">
          <h3 class="text-pink-400 font-medium mb-2">Content Opportunities</h3>
          <ul class="space-y-2">
            <li class="flex items-center gap-2">
              <span class="text-violet-400">→</span>
              <span>AI-powered development tools</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-violet-400">→</span>
              <span>Front-end framework comparison</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-violet-400">→</span>
              <span>DevOps automation tutorials</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</div>