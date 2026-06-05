<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let isOpen = false;
  let selectedDay: { dayName: string; dayNum: number; dateString: string } | null = null;
  let upcomingDays: Array<{ dayName: string; dayNum: number; dateString: string }> = [];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  onMount(() => {
    let list = [];
    let today = new Date();
    
    // Generate next 5 business days, skipping Sundays
    let added = 0;
    let dayOffset = 1;
    while (added < 5) {
      let nextDate = new Date();
      nextDate.setDate(today.getDate() + dayOffset);
      let dayIndex = nextDate.getDay();
      
      // Skip Sundays
      if (dayIndex !== 0) {
        list.push({
          dayName: daysOfWeek[dayIndex],
          dayNum: nextDate.getDate(),
          dateString: nextDate.toISOString().split('T')[0]
        });
        added++;
      }
      dayOffset++;
    }
    upcomingDays = list;
    selectedDay = list[0];
  });

  function selectDay(day: any) {
    selectedDay = day;
  }

  function handleClose(e: MouseEvent) {
    e.stopPropagation();
    isOpen = false;
  }
</script>

<!-- Collapsed Trigger Bubble -->
{#if !isOpen}
  <button 
    transition:fly={{ y: 20, duration: 400 }}
    on:click={() => isOpen = true}
    class="fixed bottom-6 left-6 z-[9999] flex items-center gap-3.5 px-5 py-3 rounded-full bg-white text-zinc-900 border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 transition-all duration-300 group"
  >
    <div class="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-200 shrink-0">
      <img 
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" 
        alt="Hafid" 
        class="w-full h-full object-cover"
      />
      <span class="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white animate-pulse"></span>
    </div>
    <div class="text-left">
      <p class="text-[12px] font-bold text-zinc-800 leading-tight">Click Me!</p>
      <p class="text-[10px] text-zinc-500 font-light leading-tight mt-0.5">Free AI operations scoping plan</p>
    </div>
  </button>
{/if}

<!-- Expanded Calendar Widget -->
{#if isOpen}
  <div 
    transition:fly={{ y: 24, duration: 450 }}
    class="fixed bottom-6 left-6 z-[9999] w-[350px] max-w-[calc(100vw-48px)] bg-white rounded-3xl border border-zinc-150 shadow-[0_24px_64px_rgba(0,0,0,0.16)] overflow-hidden text-zinc-900"
    style="font-family: 'Poppins', sans-serif;"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-5 border-b border-zinc-100">
      <div class="flex items-center gap-3">
        <div class="relative w-11 h-11 rounded-full overflow-hidden border border-zinc-100 shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" 
            alt="Hafid" 
            class="w-full h-full object-cover"
          />
          <span class="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white animate-pulse"></span>
        </div>
        <div>
          <h4 class="text-[13px] font-bold text-zinc-900 leading-tight">Hafid</h4>
          <p class="text-[10px] text-zinc-500 font-light leading-tight mt-0.5">Founder @ Flowjoy</p>
        </div>
      </div>
      <button 
        on:click={handleClose}
        class="w-8 h-8 rounded-full bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Description -->
    <div class="p-5 space-y-4">
      <div class="space-y-1">
        <h3 class="text-sm font-bold text-zinc-900 leading-tight">Free AI Operations Scoping Plan</h3>
        <p class="text-xs text-zinc-500 font-light leading-relaxed">
          Let's review your business workflows together. Get a clear scoping map to automate your front desk calls and scheduling.
        </p>
      </div>

      <!-- Date selector buttons -->
      <div class="grid grid-cols-5 gap-2">
        {#each upcomingDays as day (day.dateString)}
          {@const isSelected = selectedDay?.dateString === day.dateString}
          <button 
            on:click={() => selectDay(day)}
            class="flex flex-col items-center justify-center py-2.5 rounded-xl border transition-all duration-300
              {isSelected 
                ? 'bg-zinc-900 border-zinc-900 text-white font-semibold shadow-md scale-102' 
                : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'}"
          >
            <span class="text-[10px] uppercase tracking-wider font-medium opacity-80">{day.dayName}</span>
            <span class="text-sm font-bold mt-1 font-mono">{day.dayNum}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Action buttons -->
    <div class="px-5 pb-5 pt-1 space-y-2">
      {#if selectedDay}
        <button 
          data-cal-link="hafid-ahlaqach-nigixz/15min?date={selectedDay.dateString}"
          data-cal-namespace="15min"
          class="w-full py-3.5 rounded-2xl bg-zinc-950 hover:bg-zinc-800 active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-zinc-950/10 transition-all text-center block"
        >
          Book a Scoping Call
        </button>
      {/if}
      <a 
        href="/#pricing"
        on:click={() => isOpen = false}
        class="w-full py-3.5 rounded-2xl bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-bold uppercase tracking-wider border border-zinc-200 hover:border-zinc-300 active:scale-[0.99] transition-all text-center block"
      >
        View Pricing Options &rarr;
      </a>
    </div>
  </div>
{/if}
