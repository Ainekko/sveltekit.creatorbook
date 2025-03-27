<script>
  import { get_user } from '$lib/check';
  import AreaChart from '$lib/components/AreaChart.svelte';
  import PolarChart from '$lib/components/PolarChart.svelte';
  import RadarChart from '$lib/components/RadarChart.svelte';
  import { onMount } from 'svelte';
  import { userStore } from '$lib/stores';
  import { writable } from 'svelte/store';
	import Chat from '$lib/components/Chat.svelte';
	import { fly } from 'svelte/transition';
	import IdeaForm from '$lib/components/IdeaForm.svelte';

  let ideaMetrics = writable(null);

  const placeholderAreaData = [
      { date: new Date(2024, 0, 1), value: 30 },
      { date: new Date(2024, 1, 1), value: 40 },
      { date: new Date(2024, 2, 1), value: 35 },
      { date: new Date(2024, 3, 1), value: 50 },
      { date: new Date(2024, 4, 1), value: 45 },
      { date: new Date(2024, 5, 1), value: 60 }
  ];

  let dataAvailable = false;
  ideaMetrics.subscribe(value => {
      dataAvailable = !!value;
  });

  onMount(async () => {
      try {
          const user_data = await get_user();
          if (user_data) {
              userStore.set({
                  username: user_data.username,
                  user_id: user_data.user_id,
                  user_email: user_data.email,
                  subscription_status: user_data.subscription_status
              });

              // Log the fetched user data
              console.log(user_data.email);
              console.log(user_data.subscription_status);
          } else {
              console.error('User data could not be fetched.');
          }
      } catch (error) {
          console.error('An error occurred while fetching user data:', error);
      }
  });

  // Reactive declarations
  $: $userStore;
</script>

<div class="min-h-[70vh] h-auto md:h-screen flex flex-col w-[350px] md:w-auto pl-5 pt-5">
  <div class="stats shadow  h- flex flex-col-reverse md:flex-row hidden">
      <div class="stat">
          <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
          </div>
          <div class="stat-title">Total Sign ups</div>
          <div class="stat-value text-primary text-zinc-200">_</div>
          <div class="stat-desc">_% more than last month</div>
      </div>

      <div class="stat">
          <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
          </div>
          <div class="stat-title">Page Views</div>
          <div class="stat-value text-secondary text-zinc-300">_</div>
          <div class="stat-desc">_% more than last month</div>
      </div>

      <div class="stat">
          <div class="stat-figure text-secondary">
              <div class="avatar w-2 h-2 bg-[#fffbbd] rounded-full bg-green-400 animate-pulse">
                  <div class="w-16 rounded-full"></div>
              </div>
          </div>
          <div class="px-4 py-2 w-48  h-8 flex  flex-row items-center gap-3 bg-zinc-950 rounded-full max-w-[200px]">
              <div class="w-2 h-2 bg-[#fdc4ff] rounded-full"></div>
              <p>
                  {$userStore.username}
                  <!-- {$userStore.subscription_status} -->
                  {#if $userStore.user_id === 2} 🍒 {/if}
              </p>
          </div>
          <div class="stat-value">_</div>
          <div class="stat-title">Tasks done</div>
          <div class="stat-desc text-secondary"></div>
      </div>
  </div>

  <div class="flex grid grid-cols-1 md:grid-cols-3  gap-2 justify-center items-center md:w-full  ">
      
    
    <div class="bg-zinc-950 col-span-3    w-full flex flex-col gap-5 justify-around items-center h-full rounded-xl p-5 ">
        
        <div class="min-w-full flex justify-center items-center mb-10">
            <!-- <AreaChart dataAvailable={dataAvailable} areaChartData={dataAvailable ? ideaMetrics : placeholderAreaData}  /> -->
            <div in:fly={{ y: 20, duration: 500 }} class="px-4 py-2 w-48  h-8 flex  flex-row items-center gap-3 bg-zinc-950 rounded-full max-w-[200px]">
                <div class="w-2 h-2 bg-[#fdc4ff] rounded-full"></div>
                <p>
                    {$userStore.username}
                    <!-- {$userStore.subscription_status} -->
                    {#if $userStore.user_id === 2} 🍒 {/if}
                </p>
            </div>
            <p class="text-5xl font-bold">
                5
            </p>
            <h1>
                Projects started
            </h1>
          
        </div>

        <div in:fly class="w-full h-full col-span- ">
            <div class="text-sm flex w-full h-full justify-center items-center flex gap-2">
                <a in:fly={{ y: 20, duration: 500 }} class="flex flex-row gap-2 w-auto h-26 border rounded-xl p-2 border-zinc-800" href="/generate">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="CurrentColor" viewBox="0 0 24 24"><path d="M11 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM14.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path fill-rule="evenodd" d="M12 1a1 1 0 0 1 1 1v.5h4a3 3 0 0 1 3 3V9a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V5.5a3 3 0 0 1 3-3h4V2a1 1 0 0 1 1-1ZM7 4.5h10a1 1 0 0 1 1 1V9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V5.5a1 1 0 0 1 1-1Z" clip-rule="evenodd"></path><path d="M6 21c0-.974.551-1.95 1.632-2.722C8.71 17.508 10.252 17 12 17c1.749 0 3.29.508 4.369 1.278C17.449 19.05 18 20.026 18 21a1 1 0 1 0 2 0c0-1.788-1.016-3.311-2.469-4.35-1.455-1.038-3.414-1.65-5.53-1.65-2.118 0-4.077.611-5.532 1.65C5.016 17.69 4 19.214 4 21a1 1 0 1 0 2 0Z"></path></svg>
                    <span class="hidde bg-gradient-to-r from-violet-600 via-pink-500 to-violet-500 fourth-text-element text-transparent bg-clip bg-clip-text">Find idea</span>
                </a>
    
                <button in:fly={{ y: 20, duration: 500 }} class="flex flex-row gap-2 w-auto h-26 border rounded-xl p-2 border-zinc-800" popovertarget="chat-popover">
                    Chat with your data
                </button>

                <button in:fly={{ y: 20, duration: 500 }} class="flex flex-row gap-2 w-auto h-26 border rounded-xl p-2 border-zinc-800" popovertarget="idea-popover">
                    Submit a project
                </button>
    
                
            </div>
    
        </div>

        <div in:fly={{ y: 20, duration: 500 }} class="min-w-full flex flex-row-reverse justify-between items-center p-2 ">

            <p class="text-2xl text-white font-semibold">
                38
            </p>
            <h1>
                Total sign ups
            </h1>   
    
        </div>
        
        <div in:fly={{ y: 20, duration: 500 }} class="bg-zinc-950 flex-row-reverse min-w-full flex justify-between items-center p-2">
    
            <p class="text-2xl font-bold">
                9
            </p>
            <h1>
                Pre-orders
            </h1> 
    
        </div>

        <div in:fly={{ y: 20, duration: 500 }} class="bg-zinc-950 flex-row-reverse min-w-full flex justify-between items-center p-2">
    
            <p class="text-2xl font-bold">
                23
            </p>
            <h1>
                Emails collected
            </h1> 
    
        </div>
    
        <!-- <div class="bg-zinc-950 min-w-full flex justify-between items-center">
    
            <p class="text-4xl font-bold">
                5
            </p>
            <h1>
                Landing page progress
            </h1> 
    
        </div> -->


    </div>

    <!-- <div in:fly class="w-full h-full col-span- mt-5 mb-5 ">
        <div class="flex w-full h-full justify-center items-center flex gap-2">
            <a in:fly={{ y: 20, duration: 500 }} class="flex flex-row gap-2 w-auto h-26 border rounded-xl p-5 border-zinc-800" href="/generate">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="CurrentColor" viewBox="0 0 24 24"><path d="M11 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM14.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path fill-rule="evenodd" d="M12 1a1 1 0 0 1 1 1v.5h4a3 3 0 0 1 3 3V9a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V5.5a3 3 0 0 1 3-3h4V2a1 1 0 0 1 1-1ZM7 4.5h10a1 1 0 0 1 1 1V9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V5.5a1 1 0 0 1 1-1Z" clip-rule="evenodd"></path><path d="M6 21c0-.974.551-1.95 1.632-2.722C8.71 17.508 10.252 17 12 17c1.749 0 3.29.508 4.369 1.278C17.449 19.05 18 20.026 18 21a1 1 0 1 0 2 0c0-1.788-1.016-3.311-2.469-4.35-1.455-1.038-3.414-1.65-5.53-1.65-2.118 0-4.077.611-5.532 1.65C5.016 17.69 4 19.214 4 21a1 1 0 1 0 2 0Z"></path></svg>
                <span class="hidde bg-gradient-to-r from-violet-600 via-pink-500 to-violet-500 fourth-text-element text-transparent bg-clip bg-clip-text">Find idea</span>
            </a>

            <button in:fly={{ y: 20, duration: 500 }} class="flex flex-row gap-2 w-auto h-26 border rounded-xl p-5 border-zinc-800" popovertarget="chat-popover">
                Chat with your data
            </button>

            
        </div>

    </div> -->
    
    

  
  
</div>

<h1 class="text-3xl font-bold p-5">
    Created content
</h1>

<div class="grid grid-cols-1 md:grid-cols-4">
    
    <div in:fly={{ y: 20, duration: 500 }} class="p-5 flex flex-col justify-around h-52 w-52 border border-zinc-700 rounded-xl">
        <div>
            How to make a great app 
        </div>

        <div class="w-full h-full p-10">

            

        </div>
        
        <div class="w-full flex flex-row justify-between">
            <div class="text-xs text-zinc-400 font-extralight rounded-xl bg-zinc-900 w-auto h-auto p-2">

                Lead magnet
    
            </div>
            <div class="logo p-2 w-10 h-10 rounded-full bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" alt="Indie Hackers logo glyph">
                    <path d="M0 0 H24 V24 H0 V6.8 H5.4 V17.2 H7.8 V6.8 H10.2 V17.2 H12.6 V13.2 H16.2 V17.2 H18.6 V6.8 H16.2 V10.9 H12.6 V6.8 H0z"></path>
                </svg>
            </div>
        </div>
    </div>
</div>





</div>

<div class="relative  " in:fly={{ y: 20, duration: 500 }} id="chat-popover" popover='manual'>

    <button class="absolute top-0 right-0 p-2 font-mono z-10" popovertarget="chat-popover" popovertargetaction="hide">
        X close
    </button>

    <Chat />

</div>

<div class="relative  " in:fly={{ y: 20, duration: 500 }} id="idea-popover" popover='manual'>

    <button class="absolute top-0 right-0 p-2 font-mono z-10" popovertarget="idea-popover" popovertargetaction="hide">
        X close
    </button>

    <IdeaForm />

</div>


