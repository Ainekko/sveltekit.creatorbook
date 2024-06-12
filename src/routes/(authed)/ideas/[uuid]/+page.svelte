<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { writable, derived } from 'svelte/store';
  import { get } from 'svelte/store';
  import RadarChart from '$lib/components/RadarChart.svelte';
  import AreaChart from '$lib/components/AreaChart.svelte';

  import { marked } from 'marked';


  // Svelte stores to manage state
  let idea = writable({ title: '' });
  let ideaMetrics = writable(null);

  // Derived store to get UUID from the URL
  const uuid = derived(page, $page => $page.params.uuid);

  // Function to fetch idea from the server
  async function fetchIdea(uuid: string) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://127.0.0.1:8000/ideas/${uuid}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      idea.set(data);
      ideaMetrics.set(data.metrics || null);
      // Cache the idea data
      localStorage.setItem(`idea-${uuid}`, JSON.stringify(data));
    } else {
      console.error('Failed to fetch idea');
      ideaMetrics.set(null);
    }
  }

  // Function to load idea (from cache or fetch from server)
  function loadIdea(uuid: string) {
    // Check if the idea is already cached
    const cachedIdea = localStorage.getItem(`idea-${uuid}`);
    if (cachedIdea) {
      // Parse and set the cached idea data
      const data = JSON.parse(cachedIdea);
      idea.set(data);
      ideaMetrics.set(data.metrics || null);
      console.log('Loaded idea from cache');
    } else {
      // Fetch from server if not cached
      fetchIdea(uuid);
    }
  }

  // Watch for changes in the derived UUID and load idea
  $: $uuid, loadIdea($uuid);

  // Initial fetch/load when the component mounts
  onMount(() => {
    loadIdea(get(uuid));
  });

  // Monitor the availability of data
  let dataAvailable = false;
  ideaMetrics.subscribe(value => {
    dataAvailable = !!value;
  });

  // Default metrics and placeholder data for testing or in case of null
  const defaultMetrics = [
    { axis: "Pre-Orders", value: 120 },
    { axis: "Emails Collected", value: 80 },
    { axis: "CAC", value: 30 }
  ];

  const defaultNewMetrics = [
    { axis: "Quality", value: 50 },
    { axis: "Speed", value: 60 },
    { axis: "Reliability", value: 70 }
  ];

  const placeholderAreaData = [
    { date: new Date(2024, 0, 1), value: 30 },
    { date: new Date(2024, 1, 1), value: 40 },
    { date: new Date(2024, 2, 1), value: 35 },
    { date: new Date(2024, 3, 1), value: 50 },
    { date: new Date(2024, 4, 1), value: 45 },
    { date: new Date(2024, 5, 1), value: 60 }
  ];
</script>

<div class="min-h-screen min-w-">
  <div class="min-h-screen flex flex-col-reverse justify-center items-center">
    <div class="px-5 py-2 pb-10 w-[950px] border border-zinc-700 rounded-md h-auto flex flex-col justify-center items-start text-zinc-300 gap-10">
      <h1 class="text-2xl font-bold text-violet-200 border-r border-zinc-600 pr-10">Summary</h1>

      <div class="flex flex-col gap-10">
        <p class="text-zinc-400 font-light max-w-[500px]">
          {@html marked($idea.description)}
        </p>

        <button class="third-text-element border w-52 h-10 md:h-20 border-zinc-900 rounded-full p-4 text-sm flex flex-row justify-evenly items-center shadow- shadow-2xl shadow-yellow-200/20 bg-yellow- hover:bg-slate-300 hover:text-black z-50">
          <div class="w-2 h-2 bg-[#fffbbd] rounded-full bg-yellow-400 animate-pulse"></div>
          Visit landing page
        </button>
      </div>
    </div>

    <aside class="pr-10">
      <div class="flex flex-col gap-5 justify-start items-center">
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <div class="stat-title">Total Sign ups</div>
            <div class="stat-value text-primary text-zinc-200">_</div>
            <div class="stat-desc">_% more than last month</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
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
            <div class="w-full text-base font-light text-white">
              <h1>{$idea.title}</h1>
            </div>
            <div class="stat-value">_</div>
            <div class="stat-title">Tasks done</div>
            <div class="stat-desc text-secondary">{$idea.title}</div>
          </div>
        </div>

        <div class="flex flex-row-reverse justify-around items-center gap-20">
          <RadarChart 
            metrics={dataAvailable ? ideaMetrics : defaultMetrics} 
            newMetrics={dataAvailable ? ideaMetrics : defaultNewMetrics} 
            dataAvailable={dataAvailable} 
          />
          <AreaChart 
            dataAvailable={dataAvailable} 
            areaChartData={dataAvailable ? ideaMetrics : placeholderAreaData} 
          />
        </div>
      </div>
    </aside>
  </div>
</div>
