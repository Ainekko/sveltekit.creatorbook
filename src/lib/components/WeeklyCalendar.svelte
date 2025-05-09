<!-- lib/components/WeeklyCalendar.svelte -->
<script lang="ts">
    export let projectId = "";
    
    // Sample data for the calendar
    // In a real application, this would come from props or API
    const calendarEvents = [
      { day: 0, title: "Blog Post", time: "10:00 AM", type: "blog" },
      { day: 1, title: "Twitter Thread", time: "2:00 PM", type: "twitter" },
      { day: 2, title: "LinkedIn Post", time: "11:30 AM", type: "linkedin" },
      { day: 3, title: "Reddit AMA", time: "3:00 PM", type: "reddit" },
      { day: 4, title: "Newsletter", time: "9:00 AM", type: "email" },
      { day: 5, title: "YouTube Video", time: "1:00 PM", type: "video" },
      { day: 6, title: "Instagram Post", time: "5:00 PM", type: "instagram" }
    ];
    
    // Function to get date for a day
    function getDateForDay(day) {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const daysToAdd = getDayIndex(day) - (dayOfWeek - 1);
      const date = new Date();
      date.setDate(today.getDate() + daysToAdd);
      return date.getDate();
    }
    
    // Function to convert day name to index
    function getDayIndex(day) {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days.indexOf(day);
    }
    
    // Function to get posts for a specific day
    function getPostsForDay(dayIndex) {
      return calendarEvents.filter(event => event.day === dayIndex);
    }
    
    // Function to get color for different post types
    function getColorForType(type) {
      const colors = {
        blog: "border-green-500",
        twitter: "border-blue-500",
        linkedin: "border-purple-500",
        reddit: "border-orange-500",
        email: "border-yellow-500",
        video: "border-red-500",
        instagram: "border-pink-500"
      };
      
      return colors[type] || "border-gray-500";
    }
    
    function navigateToSection(section) {
      // Navigate to the calendar section
      window.location.href = `${projectId}/${section}`;
    }
  </script>
  
  <div class="mb-8">
    <div class="flex items-center mb-4">
      <h2 class="text-xl font-bold text-white">Weekly Schedule</h2>
      <button 
        on:click={() => navigateToSection('calendar')}
        class="text-sm text-pink-400 ml-auto hover:underline flex items-center"
      >
        View Full Calendar <span class="text-lg ml-1">→</span>
      </button>
    </div>
    
    <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4">
      <div class="grid grid-cols-7 gap-1">
        {#each ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as day, i}
          <div class="flex flex-col">
            <div class="text-center mb-2">
              <p class="text-xs text-zinc-400">{day}</p>
              <p class="text-sm font-medium text-white">{getDateForDay(day)}</p>
            </div>
            
            <div class="flex flex-col gap-1">
              {#each getPostsForDay(i) as post}
                <div class="border-l-2 {getColorForType(post.type)} bg-zinc-800 px-2 py-1 rounded-r text-xs">
                  <p class="font-medium text-white truncate">{post.title}</p>
                  <p class="text-zinc-500 text-xs">{post.time}</p>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>