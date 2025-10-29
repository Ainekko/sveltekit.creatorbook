<script lang="ts">
  import SideIdeas from "$lib/components/SideIdeas.svelte";
  import {checkAndDeleteToken} from '$lib/users/users';
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { isAuthenticated } from '$lib/users/stores';
  
  import { projectStore, isLoading as projectsLoading, error as projectsError } from '$lib/projects/stores';

  // Mobile sidebar state
  let isMobileSidebarOpen = false;
  let isMobile = false;

  function checkToken() : any {
    let token = localStorage.getItem('token');
    if (!token) {
      goto('/login');
    } else {
      checkAndDeleteToken(token);
      return token
    }
  }

  let token = checkToken();

  // async function loadIdeas() {
  //   try {
  //     const ideas = await fetchWIPIdeas(token);
  //     console.log(ideas)
  //     wipIdeasStore.set(ideas);
  //   } catch (error) {
  //     console.error('Failed to load ideas:', error);
  //   }
  // }

  async function loadUserProjects() {
    try {
      await projectStore.loadProjects(token);
      console.log('Projects loaded successfully');
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  }

  if (token) {
    onMount(async () => {
      try {
        checkAndDeleteToken(token);
        let isAuthenticated = 'true';
        
        await Promise.all([
          // loadIdeas(),
          loadUserProjects()
        ]);

        // Check if mobile on mount
        checkIfMobile();
        
        // Add resize listener
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
          window.removeEventListener('resize', checkIfMobile);
        };
        
      } catch (error) {
        console.error('Initial data loading failed:', error);
        goto('/login');
      }
    });
  }

  function checkIfMobile() {
    isMobile = window.innerWidth < 768; // md breakpoint
  }

  function toggleMobileSidebar() {
    isMobileSidebarOpen = !isMobileSidebarOpen;
    // Force expand sidebar when opening on mobile
    if (isMobileSidebarOpen && isMobile) {
      window.dispatchEvent(new CustomEvent('force-expand-sidebar'));
    }
  }

  function closeMobileSidebar() {
    isMobileSidebarOpen = false;
  }

  import { onDestroy } from 'svelte';
  
  onDestroy(() => {
    // Cleanup logic here
  });
</script>

<main class="flex flex-row h-screen relative">
  <!-- Hamburger Menu Button (Mobile Only) -->
  {#if isMobile}
    <button
      on:click={toggleMobileSidebar}
      class="fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-50 transition-colors md:hidden"
      aria-label="Toggle menu"
    >
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {#if isMobileSidebarOpen}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        {:else}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        {/if}
      </svg>
    </button>
  {/if}

  <!-- Overlay (Mobile Only) -->
  {#if isMobile && isMobileSidebarOpen}
    <div
      class="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
      on:click={closeMobileSidebar}
      on:keydown={(e) => e.key === 'Escape' && closeMobileSidebar()}
      role="button"
      tabindex="0"
      aria-label="Close menu"
    ></div>
  {/if}

  <!-- Sidebar Navigation -->
  <nav
    class="
      {isMobile ? 'fixed' : 'relative'}
      {isMobile && !isMobileSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
      md:translate-x-0
      h-full
      flex-shrink-0
      z-40
      transition-transform duration-300 ease-in-out
      {isMobile ? 'w-64' : 'w-auto'}
    "
  >
    <SideIdeas onNavigate={closeMobileSidebar} />
  </nav>

  <!-- Main Content Area -->
  <div class="flex-1 min-w-0 overflow-y-auto">
    <slot />
  </div>
</main>

<style>
  @media (max-width: 767px) {
    main {
      height: 100vh;
      height: 100dvh;
    }
  }
</style>