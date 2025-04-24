<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  let username = '';
  let email = '';
  let password = '';
  let loading = false;
  let formError = '';

  // Form validation state
  let usernameValid = true;
  let emailValid = true;
  let passwordValid = true;
  
  // Focus states for inputs
  let usernameFocused = false;
  let emailFocused = false;
  let passwordFocused = false;

  // Check token and redirect if already logged in
  onMount(() => {
      const token = localStorage.getItem('token');
      if (token) {
          goto('/dashboard');
      }

      // Set up Google OAuth
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
              { theme: 'filled_black', size: 'large', shape: 'pill', text: 'continue_with', width: 280 }
          );
      };
  });
  
  // Validate form inputs
  function validateForm(): boolean {
      usernameValid = username.length >= 3;
      emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      passwordValid = password.length >= 6;
      
      return usernameValid && emailValid && passwordValid;
  }

  async function register(event: any) {
      event.preventDefault();
      
      if (!validateForm()) {
          formError = 'Please check the form for errors';
          return;
      }
      
      loading = true;
      formError = '';
  
      const user_data = {
          username,
          email,
          password,
      };
  
      try {
          const response = await fetch('https://api.s-tierproject.online/users/register/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(user_data),
          });
  
          if (response.status === 201) {
              const res_data = await response.json();
              const token = res_data.token;
              localStorage.setItem('token', token);
              goto('/plans');
          } else {
              const errorData = await response.json();
              formError = errorData.message || "Registration failed. Please try again.";
          }
      } catch (error) {
          formError = "Network error. Please check your connection.";
          console.error("Error submitting form:", error);
      } finally {
          loading = false;
      }
  }

  function handleCredentialResponse(response: any) {
      loading = true;
      const id_token = response.credential;
  
      fetch('https://api.s-tierproject.online/users/gauth/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token: id_token }),
      })
      .then(res => {
          if (res.status === 200) {
              return res.json();
          } else {
              throw new Error("Google login failed with status: " + res.status);
          }
      })
      .then(res_data => {
          if (res_data) {
              const token = res_data.token;
              localStorage.setItem('token', token);
              goto('/plans');
          }
      })
      .catch(error => {
          formError = "Google login failed. Please try again.";
          console.error("Error with Google login:", error);
      })
      .finally(() => {
          loading = false;
      });
  }
</script>

<div class="min-h-screen w-full flex flex-col justify-center items-center  relative overflow-hidden">
  <!-- Abstract shapes background -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
      
      <!-- Noise overlay for texture -->
      <div class="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
  </div>

  <div class="w-full max-w-md px-4 z-10">
      <div in:fade={{ duration: 300, delay: 150 }} class="flex flex-col bg-zinc-900/80 backdrop-blur-md border border-zinc-800 shadow-2xl shadow-violet-900/20 rounded-2xl p-8">
          <div class="mb-6 text-center">
              <h1 class="text-2xl font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 text-transparent bg-clip-text">Create Account</h1>
              <p class="text-zinc-400 text-sm mt-1">Join our community and start creating</p>
          </div>

          {#if formError}
              <div class="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm" transition:fly={{ y: -10, duration: 300 }}>
                  {formError}
              </div>
          {/if}

          <form class="space-y-4" on:submit={register}>
              <!-- Username input -->
              <div class="relative">
                  <label for="username" class="text-xs font-medium text-zinc-400 mb-1 block">Username</label>
                  <input 
                      type="text" 
                      id="username"
                      placeholder="username" 
                      bind:value={username} 
                      on:focus={() => usernameFocused = true}
                      on:blur={() => usernameFocused = false}
                      class="w-full bg-zinc-800/70 text-white py-3 px-4 rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-violet-500/50
                             transition-all duration-200 ease-in-out
                             {!usernameValid && username ? 'border-red-500/50 ring-1 ring-red-500/50' : 'border-transparent'}"
                  />
                  {#if !usernameValid && username}
                      <p class="text-red-400 text-xs mt-1" transition:fly={{ y: -5, duration: 200 }}>Username must be at least 3 characters</p>
                  {/if}
              </div>

              <!-- Email input -->
              <div class="relative">
                  <label for="email" class="text-xs font-medium text-zinc-400 mb-1 block">Email</label>
                  <input 
                      type="email" 
                      id="email"
                      placeholder="email@example.com" 
                      bind:value={email} 
                      on:focus={() => emailFocused = true}
                      on:blur={() => emailFocused = false}
                      class="w-full bg-zinc-800/70 text-white py-3 px-4 rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-violet-500/50
                             transition-all duration-200 ease-in-out
                             {!emailValid && email ? 'border-red-500/50 ring-1 ring-red-500/50' : 'border-transparent'}"
                  />
                  {#if !emailValid && email}
                      <p class="text-red-400 text-xs mt-1" transition:fly={{ y: -5, duration: 200 }}>Please enter a valid email address</p>
                  {/if}
              </div>

              <!-- Password input -->
              <div class="relative">
                  <label for="password" class="text-xs font-medium text-zinc-400 mb-1 block">Password</label>
                  <input 
                      type="password" 
                      id="password"
                      placeholder="••••••••" 
                      bind:value={password} 
                      on:focus={() => passwordFocused = true}
                      on:blur={() => passwordFocused = false}
                      class="w-full bg-zinc-800/70 text-white py-3 px-4 rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-violet-500/50
                             transition-all duration-200 ease-in-out
                             {!passwordValid && password ? 'border-red-500/50 ring-1 ring-red-500/50' : 'border-transparent'}"
                  />
                  {#if !passwordValid && password}
                      <p class="text-red-400 text-xs mt-1" transition:fly={{ y: -5, duration: 200 }}>Password must be at least 6 characters</p>
                  {/if}
              </div>
              
              <!-- Sign up button -->
              <button 
                  type="submit" 
                  class="w-full py-3 px-4 border border-zinc-800 rounded-xl
                         text-white font-medium rounded-xl hover:shadow-lg hover:shadow-violet-600/30 
                         transition-all duration-300 transform hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-violet-500"
                  disabled={loading}
              >
                  {loading ? 'Creating account...' : 'Sign Up'}
              </button>
          </form>

          <div class="relative flex items-center mt-6 mb-4">
              <div class="flex-grow border-t border-zinc-800"></div>
              <span class="flex-shrink mx-3 text-zinc-500 text-sm">or</span>
              <div class="flex-grow border-t border-zinc-800"></div>
          </div>

          <!-- Google OAuth Button -->
          <div class="flex justify-center my-2">
              <div id="google-signin-button" class="w-full"></div>
          </div>

          <div class="text-center mt-6 text-zinc-400">
              Already have an account?
              <a href="/login" class="font-medium text-violet-400 hover:text-violet-300 transition-colors">Log in</a>
          </div>
      </div>
  </div>

  {#if loading}
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" transition:fade={{ duration: 200 }}>
          <div class="p-4 rounded-lg bg-zinc-900/90 shadow-xl border border-zinc-800 flex flex-col items-center">
              <div class="w-12 h-12 rounded-full border-4 border-t-violet-500 border-r-violet-500 border-b-zinc-700 border-l-zinc-700 animate-spin"></div>
              <p class="mt-4 text-zinc-300">Setting up your account...</p>
          </div>
      </div>
  {/if}
</div>