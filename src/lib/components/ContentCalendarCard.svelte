<script lang="ts">
  export let suggestion: string;
  
  // Parse calendar events if available, or use suggestion text
  function getCalendarItems(): Array<{date: string, event: string}> {
    // This is a placeholder - in a real implementation, you might parse the suggestion
    // for dates and events using regex or a parser
    return [
      { date: "Next Week", event: "Publish blog post on AI chatbots" },
      { date: "Two Weeks", event: "Content review & optimization" },
      { date: "End of Month", event: "Quarterly in-depth guide" }
    ];
  }
  
  const calendarItems = getCalendarItems();
</script>

<div class="bg-zinc-900 p-4 rounded-lg">
  <h3 class="text-pink-400 font-semibold mb-2">🗓️ Content Calendar</h3>
  
  <p class="text-sm text-gray-300 leading-relaxed mb-3">{suggestion}</p>
  
  <div class="mt-3">
    <div class="space-y-2">
      {#each calendarItems as item}
        <div class="flex items-center gap-2 text-sm border-l-2 border-pink-500 pl-2">
          <div class="w-24 text-zinc-400">{item.date}</div>
          <div class="flex-1 text-violet-300">{item.event}</div>
        </div>
      {/each}
    </div>
    
    <button class="mt-4 w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-300 rounded-md transition flex items-center justify-center gap-1">
      <span>+</span> Add to Calendar
    </button>
  </div>
</div>