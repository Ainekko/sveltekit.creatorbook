<script>
    import {get_user} from '$lib/check'
	import { onMount } from 'svelte';


let user_email = ''; 
let user_name = '';
let user_id = 4;   

onMount(async () => {
    const user_data = await get_user();

    if (user_data) {
      // Use the user data as needed, e.g., set it in component state
      const username = user_data.username;
      const user_id = user_data.user_id;
      user_email = user_data.email;


      console.log(user_email);
      console.log(user_id);
      console.log(user_email);
      
      // Add other user data fields as needed
    } else {
      // Handle the case when user data cannot be fetched
    }
  });



    async function handlePaidPlan() {
      try {
        // Make a POST request to your backend to create a checkout
        const response = await fetch('/plans/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userEmail: user_email,  userID: user_id })
        });
  
        if (response.ok) {
          const { url } = await response.json();
          console.log('Received checkout URL:', url);
  
          // Redirect to the checkout URL
          window.location.href = url;
        } else {
          const error = await response.json();
          console.error('Error:', error);
        }
      } catch (error) {
        console.error('Exception while creating checkout:', error);
      }
    }
  </script>
  
  <!-- Your Svelte component UI -->
  <button on:click={handlePaidPlan}>
    Subscribe to Paid Plan
  </button>
  