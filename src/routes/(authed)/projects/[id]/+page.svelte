<!-- routes/(authed)/projects/[id]/+page.svelte -->

<script>
  import { onMount } from 'svelte';
  import NewDashboard from "$lib/components/NewDashboard.svelte";
  import { projects, setCurrentProject } from '$lib/projects/stores'; // Import projects and setCurrentProject
  import { page } from '$app/stores'; // Import page store to access params

  export let data; // May be unused if no load function

  onMount(() => {
    console.log('Project detail page mounted. Page params:', $page.params);
    const projectId = $page.params.id;
    if (projectId) {
      // Find the project from the store
      let selectedProject;
      projects.subscribe(list => {
        selectedProject = list.find(p => p.id === projectId);
      })(); // Unsubscribe immediately
      if (selectedProject) {
        setCurrentProject(selectedProject);
        console.log('Found and set currentProject from store:', selectedProject);
      } else {
        console.warn('Project not found in store for ID:', projectId);
      }
    } else {
      console.warn('No project ID in params.');
    }
  });
</script>

<div>
  <NewDashboard {data} />
</div>