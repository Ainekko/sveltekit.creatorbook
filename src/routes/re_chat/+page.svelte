<script lang="ts">
  // @ts-check
    
      
      import { useChat } from 'ai/svelte';
      import {checkAndDeleteToken} from '$lib/check';
      import { onMount } from 'svelte';

     
  
      /** @type {import('./$types').PageData} */
      
            export let data;
            const auth_token = data.authtoken
  
       
   
   onMount(() => {
    const modal = document.getElementById('my_modal_3');
    modal.showModal();
  });
 
   let token = localStorage.getItem('token')  
   
   checkAndDeleteToken()

      
      const { input, handleSubmit, messages, } = useChat(
        {
          body : {
            auth_token: auth_token,
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
  
  <div class="drawer w-full ">

    <!-- You can open the modal using ID.showModal() method -->


<dialog id="my_modal_3" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 class="font-bold text-lg font-mono">Hello!</h3>
    <p class="mb-5 text-base font-mono">please log in to use the assistant!</p>
    
    <a class="btn rounded-full bg-zinc-950 shadow-lg shadow-indigo-900 text-white border-none px-8 mb-4" href="/login">login</a>
    <p class="py-1 text-xs ">Press ESC key or click on ✕ button to close</p>
  </div>
</dialog>

    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  
    
    
    <div class="drawer-content w-full">
      <!-- <h1>{data.authtoken}</h1> -->
      <!-- Page content here -->
      
      <div class="flex flex-col justify-between md:flex-row min-w-full min-h-[90vh] md:h-[90vh] relative">
        <label for="my-drawer" class=" absolute flex flex-row justify-center items-center gap-2 shadow shadow-xl p-4 rounded-full text-slate-100 bg-zinc-950 cursor-pointer ">
          
         <!-- <img src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/6501e7915d557f01f3be447c_system-solid-9-inbox.gif" alt="" class="max-w-[15%] max-h-5">  -->
         <div class="w-2 h-2 bg-[#fdc4ff] rounded-full border border-stone-900"></div>

          Free downloads!</label>
        <!-- <div class="basis-1/4 p-3 max-h-screen overflow-scroll ">
          <div class="flex flex-col justify-center items-center">
            <p>Free Downloads</p>
             Render free downloads from the array -->
            <!-- <div class="w-full flex flex-row gap-3 flex-wrap justify-center card ">
              {#each freeDownloads as item (item.title)}
              <div class="mb-4 w-[100px] border card-body rounded-xl p-4">
                <a href={item.link} target="_blank">
                  <img src={item.imageSrc} alt={item.title} class="max-w-full" />
                  <p class="mt-2 text-xs font-mono">{item.title}</p>
                </a>
              </div>
            {/each}
            </div>
            
          </div> -->
        <!-- </div> -->
        
        <div class="p-3 flex flex-col grow pt-20">
          
            <div class="flex-none flex flex-row w-full justify-center items-center sticky top-0 inset-x-0 p- ">
              <p class=""></p>
            
            </div>
            <div class="grow overflow-y-auto flex md:px-40 ">
              <div>
                
              </div>
                <div class="flex flex-col gap-2">
                  {#each $messages as message}
                    <div class="flex">
                      <div class="{message.role === 'assistant' ? '' : ''} rounded-xl shadow shadow-xl p-2 px-3">
                        <span class="font-mono px-1">{message.role}:</span> {message.content}
                      </div>
                    </div>
                  {/each}
                </div>
            </div>
              
            <div class="p-3 w-full">
              <form on:submit={handleSubmit} class="flex justify-center items-center">
                <div class="w-full md:max-w-[600px] rounded-full flex bg-zinc-900 items-center shadow-lg shadow-indigo-950">
                  <input class="w-full min-h-full px-6 py-4 bg-zinc-900 rounded-full focus:outline-none text-white" bind:value={$input} placeholder="Ask anything..." />
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
        
        
        <!-- <div class="border-x-1 card border-red-100">
          <form method="post" enctype="multipart/form-data " class="card-body">
            <input class="md:card-body 
  
            file:mr-4 file:px-4 file:py-2 file:text-sm file:border-0
            
            hover:file:bg-slate-300 hover:file:cursor-pointer" type="file" name="file" />
            <button class="btn">Upload</button>
          </form>
        </div> -->
  <!--     
        <div class="p-3 border basis-1/6">
          <div class="flex justify-center items-center">
            This Resources
          </div>
        </div> -->
        
    </div>
    </div> 
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4  w-60 md:w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <div class="flex flex-row gap-3 flex-wrap justify-center card ">
          {#each freeDownloads as item (item.title)}
          <div class="mb-4 w-[100px] border-stone-600 shadow-slate-600 shadow-md card-body rounded-xl p-4">
            <a href={item.link} target="_blank">
              <img src={item.imageSrc} alt={item.title} class="max-w-full" />
              <p class="mt-2 text-xs font-mono">{item.title}</p>
            </a>
          </div>
        {/each}
        </div>
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
        
      </ul>
    </div>
  </div>
  
    
  