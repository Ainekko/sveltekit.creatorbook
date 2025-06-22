<script>
  import { page } from '$app/stores';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
  import ProjectNavigation from '$lib/components/ProjectNavigation.svelte';
</script>





<div class="project-container relative min-h-screen">
  <!-- Top Navigation -->
  <div class="sticky top-0 px-4 pt-4 z-20">
    
    <ProjectNavigation />
  </div>
  
  <!-- Main Content -->
  <div class="px-4">
    {#key $page.url.pathname}
      <slot />
    {/key}
  </div>
</div>

<style>
  .project-container {
    background-color: rgb(9, 9, 11); /* bg-zinc-950 equivalent */
  }
</style>