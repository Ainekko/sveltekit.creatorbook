<script lang="ts">
	import AuthedNav from "$lib/components/AuthedNav.svelte";
	import SideIdeas from "$lib/components/SideIdeas.svelte";
    
    
  import {checkAndDeleteToken} from '$lib/check';
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

  import { fetchWIPIdeas } from '$lib/db';
  import { wipIdeasStore } from '$lib/stores';




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
      wipIdeasStore.set(ideas);
    } catch (error) {
      console.error('Failed to load ideas:', error);
    }
  }

  // If token exists, proceed with further actions
  if (token) {
    onMount(async () => {
      try {
        checkAndDeleteToken(token);
        loadIdeas();
      } catch (error) {
        console.error('Token check failed:', error);
        goto('/login'); // Redirect to login on error
      }
    });
  }

</script>

<div class="w-full flex justify-start px-5 items-center">
    <AuthedNav />
</div>

<main class="flex flex-row">

    
    <nav class="w-[700px] max-w-[500px]">
        <!-- <AuthedNav /> -->
        <SideIdeas />
    </nav>
    <slot />
</main>