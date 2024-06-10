<script lang="ts">
    // @ts-check
      
        
        import { useChat } from 'ai/svelte';
        import {checkAndDeleteToken} from '$lib/check';
        import { onMount } from 'svelte';
  
       
    
        /** @type {import('./$types').PageData} */
        
            //   export let data;
            //   const auth_token = data.authtoken
    
         
     
     
   
    // let token = 12342345;
    let token = localStorage.getItem('token') 
    // console.log(token) 
    // console.log('runnign check')

    // async (token) => {
    //   let res = await checkAndDeleteToken(token) 
    //   console.log(res)

    // }
     
    //  onMount(() => {
    //   const modal = document.getElementById('my_modal_3');
    //   if (!token){
    //     modal.showModal();
    //   }
      
    // });
  
        
        const { input, handleSubmit, messages, } = useChat(
          {
            body : {
            //   auth_token: auth_token,
            }
          }
        );
    
    
        
  
        
      
  
        
  
        if (!token){
          console.log('the button will be not usable')
          
        }else{
          console.log('go ahead!')
        }
        
        let isLoggedIn = !!token;
        
    
        let freeDownloads = [
        {
          title: 'Sample Item 1',
          link: 'https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/64b4190130ae58c2d4e7a68a_LastBF.jpg',
          imageSrc: 'https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/64b4190130ae58c2d4e7a68a_LastBF.jpg',
        },
        {
          title: 'Sample Item 2',
          link: 'https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/64b4190130ae58c2d4e7a68a_LastBF.jpg',
          imageSrc: 'https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/64b4190130ae58c2d4e7a68a_LastBF.jpg',
        },
        
        
        
        // Add more objects as needed
      ];
      </script>


<div class="p-3 flex flex-col grow pt-20 min-h-svh ">
          
    <div class="flex-none flex flex-row w-full justify- items-center sticky top-0 inset-x-0  ">
      <p class="font-light text-base text-left rounded-xl   shadow shadow-xl shadow-zinc-600/40 p-2">How did we do this month?</p>

      <div class="flex flex-col gap-2">
        {#each $messages as message}
          <div class="flex">
            <div class="{message.role === 'assistant' ? 'font-light text-base text-left rounded-xl border border-zinc-800 p-2' : 'font-light text-base text-left rounded-xl shadow shadow-xl shadow-zinc-600/40 p-2'} rounded-xl p-2 px-3">
              <span class="font-light text-base text-left rounded-xl   shadow shadow-xl shadow-zinc-600/40 p-2">{message.role}:</span> {message.content}
            </div>
          </div>
        {/each}
      </div>
    
    </div>
    <div class="grow overflow-y-auto flex md:px-40">
      <div>
         
      </div>
        
    </div>
      
    <div class="p-3 w-full">
      <form on:submit={handleSubmit} class="flex justify-center items-center">
        <div class="w-full md:max-w-[600px] rounded-full flex bg-zinc-950 items-center shadow-xl shadow-indigo-500/35">
          <textarea class="w-full min-h-full px-6 py-4 bg-zinc-950 rounded-full focus:outline-none text-white" bind:value={$input} placeholder="Ask anything..." />
          <button type="submit" class="right-0 m-2 min-w-6 min-h-6 px-6 py-3 text-slate-950 hover:text-slate-300 rounded-full bg-zinc-600 " disabled={!isLoggedIn}  >
            <!-- Replace with your SVG button icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" stroke="red">
              <!-- SVG path for your button icon -->
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 3V2.25H15V3V10C15 10.5523 14.5522 11 14 11H3.56062L5.53029 12.9697L6.06062 13.5L4.99996 14.5607L4.46963 14.0303L1.39641 10.9571C1.00588 10.5666 1.00588 9.93342 1.39641 9.54289L4.46963 6.46967L4.99996 5.93934L6.06062 7L5.53029 7.53033L3.56062 9.5H13.5V3Z" stroke="#141414" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        
              <defs>
                <clipPath id="clip0_113_1433">
                  <rect width="24" height="24" fill="CurrentColor" transform="translate(0.5)" />
                </clipPath>
              </defs>
        
            </svg>
          </button>
        </div>
      </form>
    </div>
    
</div>