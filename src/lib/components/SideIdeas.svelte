<script lang="ts">
  import { get } from 'svelte/store';
  import { wipIdeasStore, userStore } from '$lib/stores';
  import { fly, slide } from 'svelte/transition'; // Added slide transition
  import { onMount, tick } from 'svelte';
  import { get_user } from '$lib/check';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import {
    Plus,
    Key,
    Settings,
    LayoutGrid,
    FileText,
    UserSearch,
    BarChart3,
    Users,
    Share2,
    ChevronDown,
    ChevronUp
  } from 'lucide-svelte';
  import UpgradeModal from './UpgradeModule.svelte'; // Assuming this component exists

  /**
   * Generates a random linear gradient CSS string.
   * Creates a gradient with two random hexadecimal colors.
   * @returns {string} A CSS linear-gradient string.
   */
  function generateRandomGradient(): string {
    const randomColor = () => '#' + ('000000' + Math.floor(Math.random() * 16677215).toString(16)).slice(-6);
    return `linear-gradient(to top, ${randomColor()}, ${randomColor()})`;
  }

  let showUpgradeModal = false;

  /**
   * Handles starting a new project, showing upgrade modal if not premium.
   */
  function startNewProject() {
    if ($userStore?.subscription_status !== 'premium') {
      showUpgradeModal = true;
      return;
    }
    console.log('Starting a new project');
    // goto('/new-project'); // Uncomment to enable navigation
  }

  /**
   * Closes the upgrade modal.
   */
  function closeUpgradeModal() {
    showUpgradeModal = false;
  }

  $: activeProjectId = $page.params.id;
  $: currentPath = $page.url.pathname;

  const userAvatarGradient = generateRandomGradient();

  /**
   * Fetches user data on component mount and updates the store.
   */
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
    } catch (error) {
      console.error('An error occurred while fetching user data:', error);
    }
  });

  $: $userStore;

  let openProjects: { [key: string]: boolean } = {};

  /**
   * Toggles the visibility of a project's sub-navigation.
   * @param {string} projectId The ID of the project to toggle.
   */
  async function toggleProject(projectId: string) {
    openProjects[projectId] = !openProjects[projectId];
    await tick(); // Ensure DOM updates before any potential follow-up actions
  }
</script>

<div class="flex flex-col max-h-screen md:w-[350px] bg-   text-zinc-300">
  {#if showUpgradeModal}
    <UpgradeModal on:close={closeUpgradeModal} />
  {/if}

  <div class="flex-shrink-0 p-5" in:fly={{ y: -20, duration: 400 }}>
    <div class="px-4 py-4 flex items-center gap-3 rounded-lg shadow-sm">
      <div class="avatar">
        <div class="mask rounded-full w-12 h-12">
          <div class="w-full h-full" style="background-image: {userAvatarGradient};" />
        </div>
      </div>
      <div class="flex flex-col">
        <span class="text-zinc-400 text-sm">Welcome back</span>
        <div class="font-medium text-zinc-100">
          {$userStore?.username || 'User'}
          {#if $userStore?.subscription_status === 'premium'}
            <span class="text-amber-400 ml-1">★</span>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto px-5 py-2 projects-scroll-area">
    <h2 class="text-lg font-medium text-zinc-400 mb-3 px-2">Projects</h2>
    <nav class="flex flex-col gap-1">
      {#each $wipIdeasStore as project (project.id)}
        <div class="mb-1">
          <button
            class="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-zinc-300 font-medium"
            on:click={() => toggleProject(project.id)}
            aria-controls="project-nav-{project.id}"
            aria-expanded={openProjects[project.id] || false}
          >
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle w-7 h-7">
                   <div class="w-full h-full" style="background-image: {generateRandomGradient()};" />
                </div>
              </div>
              <span class="text-sm truncate" title={project.url}>{project.url}</span>
            </div>
            {#if openProjects[project.id]}
              <ChevronUp size={16} class="text-zinc-400 flex-shrink-0" />
            {:else}
              <ChevronDown size={16} class="text-zinc-400 flex-shrink-0" />
            {/if}
          </button>

          {#if openProjects[project.id]}
            <div
              id="project-nav-{project.id}"
              class="ml-4 pl-3 border-l border-zinc-700 mt-1 flex flex-col gap-1"
              transition:slide={{ duration: 200 }}
            >
              <a
                href={`/projects/${project.id}`}
                class="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-zinc-800 transition text-sm text-zinc-400"
                class:bg-zinc-800={currentPath === `/projects/${project.id}` && !currentPath.includes('/seo') && !currentPath.includes('/socials') && !currentPath.includes('/competitors') && !currentPath.includes('/reddit-leads')}
                class:text-amber-400={currentPath === `/projects/${project.id}` && !currentPath.includes('/seo') && !currentPath.includes('/socials') && !currentPath.includes('/competitors') && !currentPath.includes('/reddit-leads')}
              >
                <LayoutGrid size={16} />
                <span>Overview</span>
              </a>

              <div class="mt-1">
                  <div class="flex items-center gap-2 px-4 py-1 text-zinc-500 text-xs font-medium uppercase tracking-wider">
                      <FileText size={14} />
                      <span>Content Plan</span>
                  </div>
                  <div class="ml-4 flex flex-col gap-1 mt-1">
                      <a
                          href={`/projects/${project.id}/seo`}
                          class="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-zinc-800 transition text-sm text-zinc-400"
                          class:bg-zinc-800={currentPath.includes(`/projects/${project.id}/seo`)}
                          class:text-amber-400={currentPath.includes(`/projects/${project.id}/seo`)}
                      >
                          <BarChart3 size={16} />
                          <span>SEO Content</span>
                      </a>
                      <a
                          href={`/projects/${project.id}/socials`}
                          class="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-zinc-800 transition text-sm text-zinc-400"
                          class:bg-zinc-800={currentPath.includes(`/projects/${project.id}/socials`)}
                          class:text-amber-400={currentPath.includes(`/projects/${project.id}/socials`)}
                      >
                          <Share2 size={16} />
                          <span>Social Content</span>
                      </a>
                       <a
                          href={`/projects/${project.id}/competitors`}
                          class="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-zinc-800 transition text-sm text-zinc-400"
                          class:bg-zinc-800={currentPath.includes(`/projects/${project.id}/competitors`)}
                          class:text-amber-400={currentPath.includes(`/projects/${project.id}/competitors`)}
                      >
                          <Users size={16} />
                          <span>Competitors</span>
                      </a>
                  </div>
              </div>

               <a
                href={`/projects/${project.id}/reddit-leads`}
                class="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-zinc-800 transition text-sm mt-1 text-zinc-400"
                class:bg-zinc-800={currentPath.includes(`/projects/${project.id}/reddit-leads`)}
                class:text-amber-400={currentPath.includes(`/projects/${project.id}/reddit-leads`)}
              >
                <UserSearch size={16} />
                <span>Reddit Leads</span>
              </a>
            </div>
          {/if}
        </div>
      {/each}
    </nav>
  </div>

  <div class="flex-shrink-0 p-5 border-t border-zinc-800">
    <a href="/dashboard"
      on:click={startNewProject}
      class="flex items-center justify-center gap-2 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-300 rounded-xl p-3 transition shadow-md w-full mb-6 font-semibold"
    >
      <Plus size={18} />
      <span>New Project</span>
    </a>

    <h2 class="text-lg font-medium text-zinc-400 mb-3 px-2">Account</h2>
    <nav class="flex flex-col gap-1">
      
      <a
        href="/integrations"
        class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition text-zinc-400"
        class:bg-zinc-800={$page.url.pathname === '/integrations'}
        class:text-amber-400={$page.url.pathname === '/integrations'}
      >
        <Settings size={18} />
        <span>Integrations</span>
      </a>
    </nav>
  </div>
</div>

<style>
  /* Custom scrollbar styles for Webkit (Chrome, Safari) */
  .projects-scroll-area::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
  }
  .projects-scroll-area::-webkit-scrollbar-track {
    background: transparent; /* Transparent track */
    margin: 10px 0; /* Add some margin top/bottom */
  }
  .projects-scroll-area::-webkit-scrollbar-thumb {
    background: rgba(82, 82, 91, 0.5); /* Slightly darker thumb */
    border-radius: 10px; /* Fully rounded thumb */
  }
  .projects-scroll-area::-webkit-scrollbar-thumb:hover {
    background: rgba(113, 113, 122, 0.7); /* Darker on hover */
  }

  /* Custom scrollbar styles for Firefox */
  .projects-scroll-area {
    scrollbar-width: thin;
    scrollbar-color: rgba(82, 82, 91, 0.5) transparent;
  }

  /* Ensure text doesn't overlap chevron on project buttons */
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1; /* Allow text to take available space */
    margin-right: 8px; /* Add some space before the chevron */
  }

  /* Ensure avatar images cover the area without 'img' tag, using background */
  .mask > div {
      background-size: cover;
      background-position: center;
  }
</style>