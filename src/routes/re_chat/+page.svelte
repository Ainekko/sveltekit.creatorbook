<script lang="ts">
  // @ts-check
    
      
      import { useChat } from 'ai/svelte';
      //import {checkAndDeleteToken} from '$lib/check'
     
  
      /** @type {import('./$types').PageData} */
      
              export let data;
            const auth_token = data.authtoken
      //checkAndDeleteToken()
      const { input, handleSubmit, messages, } = useChat(
        {
          body : {
            auth_token: auth_token,
          }
        }
      );
  
  
      let token = localStorage.getItem('token')
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
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  
    
    
    <div class="drawer-content w-full">
      <!-- <h1>{data.authtoken}</h1> -->
      <!-- Page content here -->
      
      <div class="flex flex-col justify-between md:flex-row min-w-full min-h-[90vh] md:h-[90vh] relative">
        <label for="my-drawer" class=" absolute flex flex-row justify-center items-center gap-2 shadow shadow-xl p-4 rounded-full text-slate-950 ">
          
         <img src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/6501e7915d557f01f3be447c_system-solid-9-inbox.gif" alt="" class="max-w-[15%] max-h-5"> 
  
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
                <input class="flex-grow mr-2 p-4 rounded-xl overflow-scroll max-w-[600px]" bind:value={$input} placeholder="Ask anything ..." />
                <button type="submit" class="btn rounded-xl  bg-white shadow shadow-lg text-slate-950 hover:bg-slate-900 hover:text-slate-300"   >send
                  <!-- disabled={!isLoggedIn} -->
                </button>
               
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
  
    
  