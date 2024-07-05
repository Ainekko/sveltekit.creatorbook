<script>
  import { get_user } from '$lib/check';
  import AreaChart from '$lib/components/AreaChart.svelte';
  import PolarChart from '$lib/components/PolarChart.svelte';
  import RadarChart from '$lib/components/RadarChart.svelte';
  import { onMount } from 'svelte';
  import { userStore } from '$lib/stores';
  import { writable } from 'svelte/store';

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

<div class="min-h-[70vh] h-screen w-auto pl-5 pt-5">
  <div class="stats shadow">
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
          <div class="px-4 py-2 w-48 h-8 flex flex-row items-center gap-3 bg-zinc-950 rounded-full max-w-[200px]">
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

  <div class="flex flex-row gap-5 justify-center items-center w-full">
      <AreaChart dataAvailable={dataAvailable} areaChartData={dataAvailable ? ideaMetrics : placeholderAreaData} />
      <RadarChart />
  </div>
</div>
