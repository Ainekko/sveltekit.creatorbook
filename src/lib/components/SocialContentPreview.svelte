<!-- lib/components/SocialContentPreview.svelte -->
<script lang="ts">
    export let twitterPosts = [];
    export let linkedinPosts = [];
    export let redditPosts = [];
    export let projectId = "";
    export let businessData={};
    const businessName = businessData.business_name || 'N/A'

    function navigateToSection(section) {
      // Navigate to the social section
      window.location.href = `${projectId}/${section}`;
    }
  </script>
  
  <div class="mb-8">
    <div class="flex items-center mb-4">
      <h2 class="text-xl font-medium text-zinc-200">Social Content</h2>
      <div class="ml-auto">
        <div class="flex gap-2 items-center">
          <div class="flex gap-2">
            <span class="flex items-center gap-1 text-xs text-zinc-500">
              <span class="w-3 h-3 inline-block rounded-full bg-blue-400"></span> Twitter
            </span>
            <span class="flex items-center gap-1 text-xs text-zinc-500">
              <span class="w-3 h-3 inline-block rounded-full bg-purple-400"></span> LinkedIn
            </span>
            <span class="flex items-center gap-1 text-xs text-zinc-500">
              <span class="w-3 h-3 inline-block rounded-full bg-orange-400"></span> Reddit
            </span>
          </div>
          <button 
            on:click={() => navigateToSection('socials')}
            class="text-sm text-zinc-300 ml-4 hover:underline flex items-center"
          >
            View All Social <span class="text-lg ml-1">→</span>
          </button>
        </div>
      </div>
    </div>
  
    <!-- Social Content Grid - Preview of 3 items -->
    <div class="grid md:grid-cols-3 gap-5">
      <!-- Twitter Post -->
      {#if twitterPosts.length > 0}
        <div class="relative bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden group hover:border-blue-500/50 transition-all duration-200">
          <div class="absolute top-3 right-3 z-10">
            <span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400">
              Twitter
            </span>
          </div>
          
          <div class="p-4">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-lg">
                𝕏
              </div>
              <div class="ml-3">
                <p class="text-white font-medium">{businessName}</p>
                <p class="text-xs text-zinc-500">{businessName}</p>
              </div>
            </div>
            
            <p class="text-sm text-zinc-300 mb-4 line-clamp-4">
              {twitterPosts[0].content}
            </p>
            
            <div class="text-xs flex gap-2 flex-wrap mb-4">
              {#each twitterPosts[0].hashtags.slice(0, 3) as tag}
                <span class="text-blue-400">#{tag}</span>
              {/each}
            </div>
          </div>
        </div>
      {/if}
  
      <!-- LinkedIn Post -->
      {#if linkedinPosts.length > 0}
        <div class="relative bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden group hover:border-purple-500/50 transition-all duration-200">
          <div class="absolute top-3 right-3 z-10">
            <span class="px-2 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-purple-400">
              LinkedIn
            </span>
          </div>
          
          <div class="p-4">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center text-lg">
                in
              </div>
              <div class="ml-3">
                <p class="text-white font-medium">{businessName}</p>
                <p class="text-xs text-zinc-500">{businessName}</p>
              </div>
            </div>
            
            <p class="text-sm text-zinc-300 mb-2 line-clamp-4">
              {linkedinPosts[0].content}
            </p>
            
            <div class="mb-4">
              <span class="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded text-xs">
                {linkedinPosts[0].type}
              </span>
            </div>
          </div>
        </div>
      {/if}
  
      <!-- Reddit Post -->
      {#if redditPosts.length > 0}
        <div class="relative bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden group hover:border-orange-500/50 transition-all duration-200">
          <div class="absolute top-3 right-3 z-10">
            <span class="px-2 py-1 rounded-full text-xs font-medium bg-orange-900/30 text-orange-400">
              Reddit
            </span>
          </div>
          
          <div class="p-4">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-full bg-orange-900/30 flex items-center justify-center text-lg">
                <span class="text-orange-400">r/</span>
              </div>
              <div class="ml-3">
                <p class="text-white font-medium">{redditPosts[0]?.subreddit || 'r/SaaS'}</p>
                <p class="text-xs text-zinc-500">u/yourbrand</p>
              </div>
            </div>
            
            <h3 class="font-bold text-white text-base mb-2 line-clamp-2">
              {redditPosts[0]?.title || 'Reddit Post Title'}
            </h3>
            
            <p class="text-sm text-zinc-300 mb-4 line-clamp-3">
              {redditPosts[0]?.content || redditPosts[0]?.content_summary || 'Reddit post content not available'}
            </p>
            
            <div class="mb-4">
              <span class="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded text-xs">
                {redditPosts[0]?.post_type || 'Discussion'}
              </span>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>