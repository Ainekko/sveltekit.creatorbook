<script lang="ts">
	import SideIdeas from "$lib/components/SideIdeas.svelte";
    
    
  import {checkAndDeleteToken} from '$lib/check';
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

  import { fetchWIPIdeas } from '$lib/db';
  import { isLoggedIn, wipIdeasStore } from '$lib/stores';




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

  // If token exists, proceed with further actions
  if (token) {
    onMount(async () => {
      try {
        checkAndDeleteToken(token);
        isLoggedIn.set(true)
        loadIdeas();
      } catch (error) {
        console.error('Token check failed:', error);
        goto('/login'); // Redirect to login on error
      }
    });
  }

</script>



<main class="flex flex-col-reverse  md:flex-row">

    
    <nav class="w-[400px]">
        <!-- <AuthedNav /> -->
        <SideIdeas />
    </nav>
    <div class="w-full">
      <slot />
    </div>
</main>