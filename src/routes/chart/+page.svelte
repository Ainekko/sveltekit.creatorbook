<script lang="ts">
  import AreaChart from '$lib/components/AreaChart.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
import PolarChart from '$lib/components/PolarChart.svelte';
	import RadarChart from '$lib/components/RadarChart.svelte';

</script>

<NavBar />

<div class="min-h-screen w-screen flex flex-col gap-10 justify-center items-center bg-whit">

  <div class="stats shadow">
  
    <div class="stat place-items-center">
      <div class="stat-title">Downloads</div>
      <div class="stat-value">31K</div>
      <div class="stat-desc">From January 1st to February 1st</div>
    </div>
    
    <div class="stat place-items-center">
      <div class="stat-title">Users</div>
      <div class="stat-value text-secondary">4,200</div>
      <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
    </div>
    
    <div class="stat place-items-center">
      <div class="stat-title">New Registers</div>
      <div class="stat-value">1,200</div>
      <div class="stat-desc">↘︎ 90 (14%)</div>
    </div>
    
  </div>
  
  <div class="flex flex-row justify-around items-center gap-5">
    
    <RadarChart/>
    <AreaChart/>

  </div>
  

  <!-- <PolarChart />
  <PolarChart /> -->

  
</div>