<script>
  import { page } from '$app/stores';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
  import ProjectNavigation from '$lib/components/ProjectNavigation.svelte';
</script>

<div class="project-container relative min-h-screen pb-16">
  <!-- Main Content -->
  <div class="px-4">
    {#key $page.url.pathname}
      <slot />
    {/key}
  </div>
  
  <!-- Fixed bottom navigation -->
  <div class="fixed bottom-0 left-0 right-0 flex justify-center items-center h-auto z-20 ">
    <ProjectNavigation />
  </div>
</div>