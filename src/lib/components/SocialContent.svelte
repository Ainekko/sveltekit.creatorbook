<script>
    // Import types if you're using TypeScript
    // import type { SocialContentData } from '../types';
  
    // Props for the component
    export let socialData = {};
    
    // Destructure the important data from the socialData object
    // Use fallbacks for missing data
     let twitterPosts = socialData?.twitter_posts || [];
     let linkedinPosts = socialData?.linkedin_posts || [];
     let redditPosts = socialData?.reddit_posts || [];
    
    // State for platform filter
    let activeFilter = 'all';
    
    // Helper function to filter posts based on selected platform
    $: filteredPosts = () => {
      if (activeFilter === 'all') {
        return { twitter: twitterPosts, linkedin: linkedinPosts, reddit: redditPosts };
      } else if (activeFilter === 'twitter') {
        return { twitter: twitterPosts, linkedin: [], reddit: [] };
      } else if (activeFilter === 'linkedin') {
        return { twitter: [], linkedin: linkedinPosts, reddit: [] };
      } else if (activeFilter === 'reddit') {
        return { twitter: [], linkedin: [], reddit: redditPosts };
      }
      return { twitter: [], linkedin: [], reddit: [] };
    };
    
    // Helper functions for the calendar view
    function getDateForDay(day) {
      const days = {
        'Mon': '05/05',
        'Tue': '05/06',
        'Wed': '05/07',
        'Thu': '05/08',
        'Fri': '05/09',
        'Sat': '05/10',
        'Sun': '05/11'
      };
      return days[day];
    }
    
    function getPostsForDay(dayIndex) {
      const allPosts = [
        {day: 0, title: 'Twitter Post', time: '10:00 AM', type: 'Twitter'},
        {day: 0, title: 'LinkedIn Article', time: '2:00 PM', type: 'LinkedIn'},
        {day: 1, title: 'Reddit Q&A', time: '11:00 AM', type: 'Reddit'},
        {day: 2, title: 'Case Study', time: '9:00 AM', type: 'LinkedIn'},
        {day: 2, title: 'Product Update', time: '3:00 PM', type: 'Twitter'},
        {day: 3, title: 'Industry News', time: '1:00 PM', type: 'Twitter'},
        {day: 4, title: 'Feature Demo', time: '10:00 AM', type: 'LinkedIn'},
        {day: 5, title: 'Weekend Tips', time: '11:00 AM', type: 'Reddit'},
        {day: 6, title: 'Weekly Recap', time: '4:00 PM', type: 'Twitter'}
      ];
      
      return allPosts.filter(post => post.day === dayIndex);
    }
    
    function getColorForType(type) {
      const colors = {
        'Twitter': 'border-blue-500',
        'LinkedIn': 'border-purple-500',
        'Reddit': 'border-orange-500'
      };
      return colors[type] || 'border-zinc-500';
    }
  </script>
  
  <div class="flex items-center mb-6">
    <h2 class="text-xl font-bold text-white">Social Media Content</h2>
    <div class="ml-auto">
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
    </div>
  </div>
  
  <!-- Platform Tabs -->
  <div class="border-b border-zinc-800 mb-6">
    <div class="flex -mb-px">
      <button 
        class="py-3 px-6 text-sm font-medium {activeFilter === 'all' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-zinc-400 hover:text-zinc-200'}"
        on:click={() => activeFilter = 'all'}
      >
        All Platforms
      </button>
      <button 
        class="py-3 px-6 text-sm font-medium {activeFilter === 'twitter' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-zinc-400 hover:text-zinc-200'}"
        on:click={() => activeFilter = 'twitter'}
      >
        Twitter
      </button>
      <button 
        class="py-3 px-6 text-sm font-medium {activeFilter === 'linkedin' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-zinc-400 hover:text-zinc-200'}"
        on:click={() => activeFilter = 'linkedin'}
      >
        LinkedIn
      </button>
      <button 
        class="py-3 px-6 text-sm font-medium {activeFilter === 'reddit' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-zinc-400 hover:text-zinc-200'}"
        on:click={() => activeFilter = 'reddit'}
      >
        Reddit
      </button>
    </div>
  </div>
  
  <!-- Social Content Grid - Square layout -->
  <div class="grid md:grid-cols-3 gap-5 mb-10">
    <!-- Twitter Posts -->
    {#if filteredPosts().twitter.length > 0}
      {#each filteredPosts().twitter as post, index}
        <div class="relative bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden group hover:border-blue-500/50 transition-all duration-200">
          <!-- Status Indicator -->
          <div class="absolute top-3 right-3 z-10">
            <span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400">
              Twitter
            </span>
          </div>
          
          <!-- Content -->
          <div class="p-4">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-full  flex items-center justify-center text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-white font-medium">Your Brand</p>
                <p class="text-xs text-zinc-500">@yourbrand</p>
              </div>
            </div>
            
            <p class="text-sm text-zinc-300 mb-4 line-clamp-4">
              {post.content || 'Content not available'}
            </p>
            
            <!-- Tags -->
            {#if post.hashtags && post.hashtags.length > 0}
              <div class="text-xs flex gap-2 flex-wrap mb-4">
                {#each post.hashtags.slice(0, 3) as tag}
                  <span class="text-blue-400">{tag}</span>
                {/each}
              </div>
            {/if}
            
            <!-- Engagement Stats (using fallback values) -->
            <div class="flex items-center text-xs text-zinc-500 space-x-4 mb-3">
              <span class="flex items-center gap-1">
                <span class="i-mdi-heart text-lg"></span> {post.likes || '0'}
              </span>
              <span class="flex items-center gap-1">
                <span class="i-mdi-repeat text-lg"></span> {post.retweets || '0'}
              </span>
              <span class="flex items-center gap-1">
                <span class="i-mdi-comment text-lg"></span> {post.comments || '0'}
              </span>
            </div>
            
            <!-- Action Buttons -->
            <div class="mt-auto pt-3 border-t border-zinc-800">
              <div class="flex gap-2">
                <button class="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-medium">
                  Edit
                </button>
                <button class="flex-1 py-2 bg-blue-900/50 hover:bg-blue-800/50 rounded text-xs font-medium text-blue-400">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  
    <!-- LinkedIn Posts -->
    {#if filteredPosts().linkedin.length > 0}
      {#each filteredPosts().linkedin as post, index}
        <div class="relative bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden group hover:border-purple-500/50 transition-all duration-200">
          <!-- Status Indicator -->
          <div class="absolute top-3 right-3 z-10">
            <span class="px-2 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-purple-400">
              LinkedIn
            </span>
          </div>
          
          <!-- Content -->
          <div class="p-4">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center text-lg">
                in
              </div>
              <div class="ml-3">
                <p class="text-white font-medium">Your Brand</p>
                <p class="text-xs text-zinc-500">SaaS Company</p>
              </div>
            </div>
            
            {#if post.title}
              <h3 class="font-bold text-white text-base mb-2 line-clamp-2">
                {post.title}
              </h3>
            {/if}
            
            <p class="text-sm text-zinc-300 mb-2 line-clamp-4">
              {post.content || 'Content not available'}
            </p>
            
            <!-- Content Type -->
            <div class="mb-4">
              <span class="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded text-xs">
                {post.type || 'Article'}
              </span>
            </div>
            
            <!-- Tags -->
            {#if post.hashtags && post.hashtags.length > 0}
              <div class="text-xs flex gap-2 flex-wrap mb-4">
                {#each post.hashtags.slice(0, 3) as tag}
                  <span class="text-purple-400">{tag}</span>
                {/each}
              </div>
            {/if}
            
            <!-- Engagement Stats (using fallback values) -->
            <div class="flex items-center text-xs text-zinc-500 space-x-4 mb-3">
              <span class="flex items-center gap-1">
                <span class="i-mdi-thumbs-up text-lg"></span> {post.likes || '0'}
              </span>
              <span class="flex items-center gap-1">
                <span class="i-mdi-comment text-lg"></span> {post.comments || '0'}
              </span>
              <span class="flex items-center gap-1">
                <span class="i-mdi-share text-lg"></span> {post.shares || '0'}
              </span>
            </div>
            
            <!-- Action Buttons -->
            <div class="mt-auto pt-3 border-t border-zinc-800">
              <div class="flex gap-2">
                <button class="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-medium">
                  Edit
                </button>
                <button class="flex-1 py-2 bg-purple-900/50 hover:bg-purple-800/50 rounded text-xs font-medium text-purple-400">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  
    <!-- Reddit Posts -->
    {#if filteredPosts().reddit.length > 0}
      {#each filteredPosts().reddit as post, index}
        <div class="relative bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden group hover:border-orange-500/50 transition-all duration-200">
          <!-- Status Indicator -->
          <div class="absolute top-3 right-3 z-10">
            <span class="px-2 py-1 rounded-full text-xs font-medium bg-orange-900/30 text-orange-400">
              Reddit
            </span>
          </div>
          
          <!-- Content -->
          <div class="p-4">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 rounded-full bg-orange-900/30 flex items-center justify-center text-lg">
                <span class="text-orange-400">r/</span>
              </div>
              <div class="ml-3">
                <p class="text-white font-medium">{post.target_subreddit || 'r/SaaS'}</p>
                <p class="text-xs text-zinc-500">u/yourbrand</p>
              </div>
            </div>
            
            <h3 class="font-bold text-white text-base mb-2 line-clamp-2">
              {post.title || 'Reddit Post Title'}
            </h3>
            
            <p class="text-sm text-zinc-300 mb-4 line-clamp-3">
              {post.content || 'Content not available'}
            </p>
            
            <!-- Post Type -->
            <div class="mb-4">
              <span class="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded text-xs">
                {post.post_type || 'Discussion'}
              </span>
            </div>
            
            <!-- Action Buttons -->
            <div class="mt-auto pt-3 border-t border-zinc-800">
              <div class="flex gap-2">
                <button class="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-medium">
                  Edit
                </button>
                <button class="flex-1 py-2 bg-orange-900/50 hover:bg-orange-800/50 rounded text-xs font-medium text-orange-400">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
  
  <!-- Weekly Content Calendar -->
  <div class="flex items-center mt-10 mb-6">
    <h2 class="text-xl font-bold text-white">Weekly Content Calendar</h2>
    <div class="ml-auto">
      <button class="bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded text-sm">
        This Week
      </button>
    </div>
  </div>
  
  <div class="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden mb-10">
    <div class="grid grid-cols-7 border-b border-zinc-800">
      {#each ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as day}
        <div class="p-3 text-center border-r border-zinc-800 last:border-r-0">
          <p class="font-medium text-zinc-300">{day}</p>
          <p class="text-xs text-zinc-500">{getDateForDay(day)}</p>
        </div>
      {/each}
    </div>
    
    <div class="grid grid-cols-7 p-3 gap-3">
      {#each Array(7) as _, dayIndex}
        <div class="min-h-32 border border-dashed border-zinc-800 rounded p-2">
          {#if getPostsForDay(dayIndex).length > 0}
            {#each getPostsForDay(dayIndex) as post}
              <div class="mb-2 p-2 rounded bg-zinc-800/50 border-l-2 {getColorForType(post.type)} text-xs">
                <p class="font-medium text-zinc-300">{post.title}</p>
                <p class="text-zinc-500">{post.time} - {post.type}</p>
              </div>
            {/each}
          {/if}
        </div>
      {/each}
    </div>
  </div>