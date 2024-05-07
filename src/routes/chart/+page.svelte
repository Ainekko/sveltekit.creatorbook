<script lang="ts">
  import AreaChart from '$lib/components/AreaChart.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
  import PolarChart from '$lib/components/PolarChart.svelte';
	import RadarChart from '$lib/components/RadarChart.svelte';

</script>

<!-- <NavBar /> -->

<div class="min-h-screen min-w- ">
  <div class="min-h-screen flex flex-col-reverse justify-center items-center ">
    <div class="px-5 py-2 pb-10 w-[950px] border border-zinc-700 rounded-md   h-auto pt-  flex flex-col justify-center items-start text-zinc-300 gap-10 max-w- ">
      <h1 class="text-2xl  font-bold text-violet-200  border border-transparent border-r-zinc-600 pr-10">Summary</h1>
  
     <div class="flex flex-col gap-10">
  
             
      <p class="text-zinc-400 font-light max-w-[500px]">
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
      <div class="min- w-auto flex flex-col gap-5 justify-start items-c bg-whit ">
    
        <div class="stats shadow">
  
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <div class="stat-title">Total Likes</div>
            <div class="stat-value text-primary text-zinc-200">25.6K</div>
            <div class="stat-desc">21% more than last month</div>
          </div>
          
          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div class="stat-title">Page Views</div>
            <div class="stat-value text-secondary text-zinc-300">2.6M</div>
            <div class="stat-desc">21% more than last month</div>
          </div>
          
          <div class="stat">
            <div class="stat-figure text-secondary">
              <div class="avatar w-2 h-2 bg-[#fffbbd] rounded-full bg-green-400 animate-pulse">
                <div class="w-16 rounded-full">
                  <!-- <img class="h-2" src="./src/lib/images/favicon.png" /> -->
                </div>
              </div>
            </div>
            <div class="stat-value">86%</div>
            <div class="stat-title">Tasks done</div>
            <div class="stat-desc text-secondary">31 tasks remaining</div>
          </div>
          
        </div>
        
        <div class="flex flex-row-reverse justify-around items-center gap-20">
          
          <RadarChart/>
          <AreaChart/>
      
        </div>
        
      
        <!-- <PolarChart />
        <PolarChart /> -->
      
        
      </div>
    </aside>
  </div>
</div>