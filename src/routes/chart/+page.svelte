<script lang="ts">
  import AreaChart from '$lib/components/AreaChart.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
  import PolarChart from '$lib/components/PolarChart.svelte';
	import RadarChart from '$lib/components/RadarChart.svelte';

</script>

<NavBar />

<div class="w-screen h-screen flex flex-row justify-center ">
  <div class="p h-screen pt- pr-10 flex flex-col justify-center items-start text-zinc-300 gap-20 max-w-[1000px]">
    <h1 class="text-3xl  font-bold text-violet-200  border border-transparent border-r-zinc-600 pr-10">Summary</h1>

   <div class="flex flex-col gap-10">

           
    <p class="text-violet-100 font-thin max-w-[800px]">
      This is a test to see how the summary text will show like if the summary HTML element stops showing for nowhere it's annoying af!
      This is a test to see how the summary text will show like if the summary HTML element stops showing for nowhere it's annoying af!
    </p>

    <button class="third-text-element border  w-52 h-10 md:h-20 border-zinc-900 rounded-full p-4 text-sm   flex flex-row justify-evenly items-center  shadow-  shadow-2xl shadow-yellow-200/20 bg-yellow-   hover:bg-slate-300 hover:text-black z-50 ">
        <div class="w-2 h-2 bg-[#fffbbd] rounded-full bg-yellow-400 animate-pulse"></div>
        Get Started
    </button>

   </div>




  </div>
  
  <aside class="pr-10 ">
    <div class="min- w-auto flex flex-col gap-10 justify-start items-c bg-whit">
  
      <div class="stats shadow">
      
        <div class="stat place-items-center">
          <div class="stat-title">Downloads</div>
          <div class="stat-value">31K</div>
          <div class="stat-desc">From January 1st to February 1st</div>
        </div>
        
        <div class="stat place-items-center">
          <div class="stat-title">Users</div>
          <div class="stat-value text-indigo-500">4,200</div>
          <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
        </div>
        
        <div class="stat place-items-center">
          <div class="stat-title">New Registers</div>
          <div class="stat-value">1,200</div>
          <div class="stat-desc">↘︎ 90 (14%)</div>
        </div>
        
      </div>
      
      <div class="flex flex-col-reverse justify-around items-center gap-5">
        
        <RadarChart/>
        <AreaChart/>
    
      </div>
      
    
      <!-- <PolarChart />
      <PolarChart /> -->
    
      
    </div>
  </aside>
</div>