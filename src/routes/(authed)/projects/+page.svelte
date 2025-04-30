<script lang="ts">
    import { get } from 'svelte/store';
    import { wipIdeasStore } from '$lib/stores';
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { userStore } from '$lib/stores';
    import { get_user } from '$lib/check';
    import { page } from '$app/stores';
    import { ChevronDown, ChevronRight, Plus } from 'lucide-svelte';
  
    function generateRandomGradient() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = 100;
      const height = 100;
  
      canvas.width = width;
      canvas.height = height;
  
      const color1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
      const color2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
  
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
  
      return canvas.toDataURL();
    }
  
    function addNewIdea() {
      console.log('Add new idea clicked');
    }
    
    let expandedProjects = {};
    
    function toggleProject(projectId) {
      expandedProjects[projectId] = !expandedProjects[projectId];
      expandedProjects = {...expandedProjects};
    }
  
    $: activeProjectId = $page.params.id;
  
    const userAvatarGradient = generateRandomGradient();
  
    onMount(async () => {
      try {
        
  
        $wipIdeasStore.forEach(project => {
          expandedProjects[project.id] = true;
        });
        expandedProjects = {...expandedProjects};
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    });
  
    $: $userStore;
  </script>
  
  <div class="flex flex-col h-screen p-5 md:w-full max-w-[250px] md:max-w-[500px]">
    
  
    <h1 class="text-2xl font-medium text-zinc-300 mb-3">Projects</h1>
  
    <div class="flex-1 overflow-y-auto pr-1 mb-4" style="scrollbar-width: thin;">
      <div class="flex flex-row gap-2">
        {#each $wipIdeasStore as project (project.id)}
          <div class="border border-zinc-900 rounded-xl overflow-hidden">
            <div 
              class="flex items-center justify-between p-4 hover:bg-zinc-800 transition"
              class:bg-zinc-800={activeProjectId === project.id}
            >
              <!-- Project clickable link -->
              <a 
                href={`/projects/${project.id}`}
                class="flex items-center gap-3"
              >
                <div class="avatar">
                  <div class="mask mask-squircle w-10 h-10">
                    <img src={generateRandomGradient()} alt="Project Avatar" />
                  </div>
                </div>
                <div class="font-bold">{project.url}</div>
              </a>
  
              <!-- Toggle button -->
              <button 
                on:click|stopPropagation={() => toggleProject(project.id)}
                class="p-1"
              >
                {#if expandedProjects[project.id]}
                  <ChevronDown size={18} />
                {:else}
                  <ChevronRight size={18} />
                {/if}
              </button>
            </div>
  
            {#if expandedProjects[project.id]}
              <div class="pl-14 border-t border-zinc-800 relative" transition:fly={{ y: -20, duration: 200 }}>
                <div class="absolute left-7 top-0 bottom-0 w-px bg-zinc-700"></div>
                
                <div class="relative">
                  <div class="absolute left-0 top-1/2 w-3 h-px bg-zinc-700"></div>
                  <a 
                    href={`/projects/${project.id}/competitors`}
                    class="block py-2 px-4 text-sm hover:bg-zinc-800 transition border-b border-zinc-900 ml-3"
                    class:text-amber-400={$page.url.pathname.includes(`/project/${project.id}/competitors`)}
                  >
                    Competitors
                  </a>
                </div>
  
                <div class="relative">
                  <div class="absolute left-0 top-1/2 w-3 h-px bg-zinc-700"></div>
                  <a 
                    href={`/projects/${project.id}/seo`}
                    class="block py-2 px-4 text-sm hover:bg-zinc-800 transition border-b border-zinc-900 ml-3" 
                    class:text-amber-400={$page.url.pathname.includes(`/project/${project.id}/keywords`)}
                  >
                    Seo
                  </a>
                </div>
  
                <div class="relative">
                  <div class="absolute left-0 top-1/2 w-3 h-px bg-zinc-700"></div>
                  <a 
                    href={`/projects/${project.id}/reddit`}
                    class="block py-2 px-4 text-sm hover:bg-zinc-800 transition ml-3"
                    class:text-amber-400={$page.url.pathname.includes(`/project/${project.id}/content-plan`)}
                  >
                    Reddit
                  </a>
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  
    
  </div>
  
  <style>
    .overflow-y-auto::-webkit-scrollbar {
      width: 6px;
    }
    .overflow-y-auto::-webkit-scrollbar-track {
      background: rgba(39, 39, 42, 0.2);
      border-radius: 8px;
    }
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background: rgba(82, 82, 91, 0.6);
      border-radius: 8px;
    }
    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
      background: rgba(113, 113, 122, 0.8);
    }
    .overflow-y-auto {
      scrollbar-width: thin;
      scrollbar-color: rgba(82, 82, 91, 0.6) rgba(39, 39, 42, 0.2);
    }
  </style>
  