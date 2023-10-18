
<script>
import {get_user} from '$lib/check'
import { onMount } from 'svelte';

let username = '' ;
let user_id = 0;



onMount(async () => {
    const user_data = await get_user();

    if (user_data) {
      // Use the user data as needed, e.g., set it in component state
      username = user_data.username;
      user_id = user_data.user_id
      
      // Add other user data fields as needed
    } else {
      // Handle the case when user data cannot be fetched
    }
  });
    

</script>





<div class="min-w-32 min-h-32 bg-zinc-900 p-4 rounded-xl">
  
  <div class="px-4 py-2 flex flex-row  items-center gap-3 bg-zinc-950 rounded-full max-w-[200px]">
    <div class="w-2 h-2 bg-[#fdc4ff] rounded-full "></div>
    <p> 
     {username} 
     {#if user_id === 2}
     🍒 🌸 <!-- Render the heart emoji if user_id is 2 -->
      {/if}
    </p>
  </div>

  <p class="font-mono text-xs mb-4 mt-3">
    your dashboard is coming soon
    in the mean time chekout:
  </p>
  <div class="text-xs flex gap-5 font-thin">
    <a class="rounded-r-full  hover:bg-zinc-900 p-4" href="/">home</a>
    <a class="rounded-r-full border border-zinc-800 hover:bg-zinc-800 p-4" href="/re_chat">re_chat</a>
  </div>
    <!-- <div class="w-4 h-4 bg-stone-200 rounded-full border"></div> -->
</div>
  
  


<!-- <label class="swap swap-rotate"> -->
  
    <!-- this hidden checkbox controls the state -->
    <!-- <input type="checkbox" /> -->
    
    <!-- sun icon -->
    <!-- <svg class="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg> -->
    
    <!-- moon icon -->
    <!-- <svg class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg> -->
    
  <!-- </label>
   -->