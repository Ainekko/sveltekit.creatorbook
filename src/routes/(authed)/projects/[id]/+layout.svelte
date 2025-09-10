<script>
  import { page } from '$app/stores';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
  import ProjectNavigation from '$lib/components/ProjectNavigation.svelte';
</script>





<div class="project-container relative min-h-screen">
  <!-- Top Navigation -->
  
  
  <!-- Main Content -->
  <div class="px-4">
    {#key $page.url.pathname}
      <slot />
    {/key}
  </div>
  <div class="sticky  px-4 pt-2000 z-20 border flex justify-center">
    
    <ProjectNavigation />
  </div>
</div>

<style>
  /* .project-container { */
    /* background-color: rgb(9, 9, 11); bg-zinc-950 equivalent */
  /* } */
</style>