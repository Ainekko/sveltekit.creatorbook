<script lang="ts">
  import SideIdeas from "$lib/components/SideIdeas.svelte";
  import {checkAndDeleteToken} from '$lib/users/users';
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { fetchWIPIdeas } from '$lib/db';
  import { isLoggedIn, wipIdeasStore } from '$lib/stores';
  
  // Import your project store
  import { projectStore, isLoading as projectsLoading, error as projectsError } from '$lib/projects/stores';

  // Immediately check token and redirect if missing
  function checkToken() : any {
    let token = localStorage.getItem('token');
    if (!token) {
      goto('/login');
    } else {
      checkAndDeleteToken(token);
      return token
    }
  }

  let token = checkToken(); // Check token immediately

  async function loadIdeas() {
    try {
      const ideas = await fetchWIPIdeas(token);
      console.log(ideas)
      wipIdeasStore.set(ideas);
    } catch (error) {
      console.error('Failed to load ideas:', error);
    }
  }

  async function loadUserProjects() {
    try {
      await projectStore.loadProjects(token);
      console.log('Projects loaded successfully');
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  }

  // If token exists, proceed with further actions
  if (token) {
    onMount(async () => {
      try {
        checkAndDeleteToken(token);
        isLoggedIn.set(true);
        
        // Load both ideas and projects in parallel for better performance
        await Promise.all([
          loadIdeas(),
          loadUserProjects()
        ]);
        
      } catch (error) {
        console.error('Initial data loading failed:', error);
        goto('/login'); // Redirect to login on error
      }
    });
  }

  // Clean up stores on component destroy (when user logs out)
  import { onDestroy } from 'svelte';
  
  onDestroy(() => {
    // Only clear if we're actually logging out, not just navigating
    // You might want to add additional logic here based on your logout flow
  });
</script>

<main class="flex flex-col-reverse md:flex-row h-screen ">
  <nav class="w-full md:w-auto flex-shrink-0">
    <SideIdeas />
  </nav>

  <div class="flex-1 min-w-0 overflow-y-auto">
    <!-- Optional: Show loading state while projects are loading -->
    {#if $projectsLoading}
      <div class="flex items-center justify-center p-4">
        <div class="text-gray-500">Loading projects...</div>
      </div>
    {/if}
    
    <!-- Optional: Show error state if projects fail to load -->
    {#if $projectsError}
      <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded m-4">
        Error loading projects: {$projectsError}
        <button 
          class="ml-2 underline" 
          on:click={() => loadUserProjects()}
        >
          Retry
        </button>
      </div>
    {/if}
    
    <slot />
  </div>
</main>

<style>
  /* This media query is still useful for mobile browsers that have dynamic toolbars */
  @media (max-width: 767px) {
    main {
      height: 100vh;
      height: 100dvh; /* Dynamic viewport height */
    }
  }
</style>