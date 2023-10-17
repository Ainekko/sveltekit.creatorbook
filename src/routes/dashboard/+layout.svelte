<script lang="ts">
    import type { LayoutData } from './$types';
    import NavBar from "$lib/components/NavBar.svelte";

    import { onMount } from 'svelte';

    
    export let data: LayoutData;

  // Function to get the token from the backend
  const getToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Token not in local storage, fetch it from the backend
        const response = await fetch('https://api.creatorbook.tech/users/get_token/', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          const fetchedToken = data.token;
          localStorage.setItem('token', fetchedToken);
        } else {
          // Handle error if the token couldn't be fetched
          console.error('Failed to fetch token:', response.status);
        }
      }
    } catch (error) {
      console.error('Error while fetching token:', error);
    }
  };

  onMount(getToken);

</script>


<style>
    /* Container styles */
    .container {
      max-width: 1200px; /* Adjust the maximum width as needed */
      margin: 0 auto; /* Center the container horizontally */
      padding: 0 20px; /* Optional padding to create spacing from the edges */
    }
    .main {
      max-width: 1550px; /* Adjust the maximum width as needed */
      margin: 0 auto; /* Center the container horizontally */
      padding: 0 ; /* Optional padding to create spacing from the edges */
    }
  </style>
  
  
  
<div class="main">
    
    <div class="container">
      <NavBar />
      <slot />
    </div>
</div> 