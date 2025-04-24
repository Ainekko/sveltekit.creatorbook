<script lang="ts">
  import { get } from 'svelte/store';
  import { wipIdeasStore } from '$lib/stores';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { userStore } from '$lib/stores';
  import { get_user } from '$lib/check';
  import { page } from '$app/stores'; // Import page store to determine active route
  import { ChevronDown, ChevronRight } from 'lucide-svelte'; // For expand/collapse icons

  function generateRandomGradient() {
    // Your existing gradient function
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
  
  // For tracking which project submenus are expanded
  let expandedProjects = {};
  
  function toggleProject(projectId) {
    expandedProjects[projectId] = !expandedProjects[projectId];
    expandedProjects = {...expandedProjects}; // Force reactivity
  }

  // Check if a project is the current active project
  $: activeProjectId = $page.params.id;

  // Generate avatar gradient once for the user
  const userAvatarGradient = generateRandomGradient();

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
      } else {
        console.error('User data could not be fetched.');
      }

      // Set all projects to expanded by default
      $wipIdeasStore.forEach(project => {
        expandedProjects[project.id] = true;
      });
      expandedProjects = {...expandedProjects}; // Force reactivity
    } catch (error) {
      console.error('An error occurred while fetching user data:', error);
    }
  });

  // Reactive declaration
  $: $userStore;
</script>

<div class="flex flex-col p-5 md:w-full max-w-[250px] md:max-w-[500px]">
  <!-- User welcome section -->
  <div class="px-4 py-4 flex items-center gap-3 bg-zinc- rounded-lg shadow-sm mb-6" 
       in:fly={{ y: 20, duration: 500 }}>
    <div class="avatar">
      <div class="mask rounded-full w-12 h-12">
        <img src={userAvatarGradient} alt="User Avatar" />
      </div>
    </div>
    <div class="flex flex-col">
      <span class="text-zinc-400 text-sm">Welcome back</span>
      <div class="font-medium text-zinc-100">
        {$userStore?.username || 'User'} 
        {#if $userStore?.subscription_status === 'premium'} 
          <span class="text-amber-400">★</span> 
        {/if}
      </div>
    </div>
  </div>
  
  <h1 class="text-2xl font-medium text-zinc-300 mb-5">
    Projects 
  </h1>
  
  <!-- Projects with nested navigation -->
  <div class="flex flex-col gap-2">
    {#each $wipIdeasStore as project (project.id)}
      <div class="border border-zinc-900 rounded-xl overflow-hidden">
        <!-- Project header -->
        <div 
          class="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800 transition"
          class:bg-zinc-800={activeProjectId === project.id}
          on:click={() => toggleProject(project.id)}
        >
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle w-10 h-10">
                <img src={generateRandomGradient()} alt="Project Avatar" />
              </div>
            </div>
            <div class="font-bold">{project.url}</div>
          </div>
          <div>
            {#if expandedProjects[project.id]}
              <ChevronDown size={18} />
            {:else}
              <ChevronRight size={18} />
            {/if}
          </div>
        </div>
        
        <!-- Project subnav - conditionally visible -->
        {#if expandedProjects[project.id]}
          <div class="pl-14 border-t border-zinc-800 relative" transition:fly={{ y: -20, duration: 200 }}>
            <!-- Vertical connector line for the entire submenu -->
            <div class="absolute left-7 top-0 bottom-0 w-px bg-zinc-700"></div>
            
            <!-- Competitors link with connector -->
            <div class="relative">
              <!-- Horizontal connector line -->
              <div class="absolute left-0 top-1/2 w-3 h-px bg-zinc-700"></div>
              <a 
                href={`/projects/${project.id}/competitors`}
                class="block py-2 px-4 text-sm hover:bg-zinc-800 transition border-b border-zinc-900 ml-3"
                class:text-amber-400={$page.url.pathname.includes(`/project/${project.id}/competitors`)}
              >
                Competitors
              </a>
            </div>
            
            <!-- SEO link with connector -->
            <div class="relative">
              <!-- Horizontal connector line -->
              <div class="absolute left-0 top-1/2 w-3 h-px bg-zinc-700"></div>
              <a 
                href={`/projects/${project.id}/seo`}
                class="block py-2 px-4 text-sm hover:bg-zinc-800 transition border-b border-zinc-900 ml-3" 
                class:text-amber-400={$page.url.pathname.includes(`/project/${project.id}/keywords`)}
              >
                Seo
              </a>
            </div>
            
            <!-- Reddit link with connector -->
            <div class="relative">
              <!-- Horizontal connector line -->
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

  <!-- Add New Project Button -->
  <div class="mt-4">
    <button 
      on:click={addNewIdea} 
      class="w-full bg-zinc-700 text-zinc-200 rounded-full p-3 hover:bg-zinc-600 transition shadow-lg"
    >
      +
    </button>
  </div>
</div>