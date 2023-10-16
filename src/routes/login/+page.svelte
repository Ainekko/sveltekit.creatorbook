<script>
    import { json } from "@sveltejs/kit";
    import { redirect } from '@sveltejs/kit';
    import { goto } from '$app/navigation';
  
  
    
    let email = '';
    let password = '';
    let token = localStorage.getItem('token') ||'';
    // 
    if (token){
      goto('/dashboard');
    }

    async function handleTwitterLogin() {
    try {
      // Make a request to your Django endpoint responsible for Twitter authentication
      const response = await fetch('https://api.creatorbook.tech/o/login/twitter', {
        method: 'POST', // Adjust the method as needed
      });

      if (response.ok) {
        // Parse the JSON response data
        const data = await response.json();
        
        if (data.status === 'success') {
          // User is successfully authenticated
          // Update the UI or show a success message
          console.log('Login successful:', data.message);
        } else {
          // Handle authentication failure
          // Display an error message
          console.error('Authentication failed:', data.message);
        }
      } else {
        // Handle unexpected response status codes
        // Display an error message
        console.error('Unexpected response:', response.statusText);
      }
    } catch (error) {
      // Handle any errors that might occur during the authentication process
      console.error('Error:', error);
    }
  }

    async function log_in() {
      const user_data = {
        email: email,
        password: password,
      };
  
      try {
        const response = await fetch('https://api.creatorbook.tech/users/login/', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(user_data),
        });
  
        if (response.status === 200) {
          const res_data = await response.json();
          token = res_data.token;
          console.log("Token:", res_data.token);
          document.cookie = `auth_token=${token}; path=/`;
          localStorage.setItem('token', token);
         
         goto('/dashboard');
        } else {
          console.error("Login failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
   
    console.log(localStorage.getItem('token'))
   
  </script>
  
  <div class="bg-inherit h-screen w-max[1440px] flex justify-center items-center">
    
    <button on:click={handleTwitterLogin}>Login with Twitter</button>
    <div class="h-screen w-screen max-w-[1200px] flex justify-center items-center overflow-hidden">
      <div class="card bg-dark border flex justify-center items-center border-stone-900 w-80 rounded-[13px] font-mono">
        <p>Log in:</p>
        <form class="card-body " on:submit={log_in}>
          <input type="email" placeholder="email" bind:value={email} class="input input-bordered border rounded-[5px]" />
          <input type="password" placeholder="password" bind:value={password} class="input input-bordered border rounded-[5px]" />
          
          <div class="label cursor-pointer">
            Not a user?
            <a href="/signup" type="checkbox" class="link" >Sign up</a>
          </div>
  
          <div class="label cursor-pointer">
            <a href="/" type="checkbox" class="link" >Reset password</a>
          </div>
          
          <input type="submit" value="Log in" class="btn btn-neutral rounded-[5px]" />
        </form>
      </div>
    </div>
  </div>
  