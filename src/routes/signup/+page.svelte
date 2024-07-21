<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
  
    let username = '';
    let email = '';
    let password = '';
    let loading = false;
  
    let token = localStorage.getItem('token') || '';
    if (token) {
      goto('/dashboard');
    }
  
    async function register(event: any) {
      event.preventDefault();
      loading = true;
  
      const user_data = {
        username: username,
        email: email,
        password: password,
      };
  
      try {
        const response = await fetch('https://api.creatorbook.tech/users/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user_data),
        });
  
        if (response.status === 201) {
          const res_data = await response.json();
          token = res_data.token;
          localStorage.setItem('token', token);
          goto('/plans');
        } else {
          console.error("Registering failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        loading = false;
      }
    }
  
    function handleCredentialResponse(response: any) {
      const id_token = response.credential;
  
      fetch('https://api.creatorbook.tech/users/gauth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: id_token }),  // Pass the ID token as access_token
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.error("Google login failed with status:", res.status);
        }
      })
      .then(res_data => {
        if (res_data) {
          token = res_data.token;
          localStorage.setItem('token', token);
          goto('/plans');
        }
      })
      .catch(error => {
        console.error("Error with Google login:", error);
      });
    }
  
    onMount(() => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
  
      script.onload = () => {
        google.accounts.id.initialize({
          client_id: '144652246407-itelihabs7ns4brsead66aion8o5uo9d.apps.googleusercontent.com',
          callback: handleCredentialResponse
        });
  
        google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          { theme: 'outline', size: 'large' }
        );
      };
    });
  </script>
  
  <div class="bg- h-screen w-max[1440px] flex justify-center items-center">
    <div class="h-screen w-screen  md:max-w-[1050px] flex justify-center items-center overflow-hidden text-">
      <div class="card bg-dark flex justify-center items-center md:w-1/2 shadow-xl p-5 rounded-md">
        <p class="font-normal text-lg text-zinc-200">Sign Up:</p>
        <form class="card-body w-full" on:submit={register}>
          <input type="text" placeholder="username" bind:value={username} class="input input-bordered bg-zinc-900 border border-zinc-950 rounded-xl text-white py-7 mb-2" />
          <input type="email" placeholder="email" bind:value={email} class="input input-bordered bg-zinc-900 border border-zinc-950 rounded-xl text-white py-7 mb-2" />
          <input type="password" placeholder="password" bind:value={password} class="input input-bordered bg-zinc-900 border border-zinc-950 rounded-xl text-white py-7 mb-2" />
          
          <input type="submit" value="Sign Up" class="btn btn-neutral flex flex-row text-center justify-center items-center rounded-xl bg-white text-black p-0 h-14 text-base shadow-xl shadow-violet-300/40 mt-4" />
  
          <div class="label cursor-pointer mt-5">
            Already a user?
            <a href="/login" class="link bg-gradient-to-r from-violet-600 via-pink-500 to-violet-500 text-transparent bg-clip bg-clip-text text-xl underline mb-2 link">Log in</a>
          </div>
          
          {#if loading}
            <span class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <span class="loading loading-ring loading-md"></span> 
            </span>
          {/if}
        </form>
  
        <!-- Google OAuth Button -->
        <div id="google-signin-button"></div>
      </div>
    </div>
  </div>
  