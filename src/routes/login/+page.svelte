<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
  
    import GoogleAuth from '$lib/components/Googleauth.svelte';
      import { isLoggedIn } from '$lib/stores';
  
  
    let email = '';
    let password = '';
    let loading = false;
    let formError = '';
    
    // Focus states for inputs
    let emailFocused = false;
    let passwordFocused = false;
    
    // Form validation state
    let emailValid = true;
    let passwordValid = true;
  
    onMount(() => {
        const token = localStorage.getItem('token');
        if (token) {
            goto('/dashboard');
        }
    });
    
    const twitter_auth_url = 'https://api.s-tierproject.online/o/login/twitter';
  
    const handle_twitter_login = () => {
        window.location.href = twitter_auth_url; 
    };
    
    // Validate form inputs
    function validateForm(): boolean {
        emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        passwordValid = password.length > 0;
        
        return emailValid && passwordValid;
    }
  
    async function log_in(event : any) {
        event.preventDefault();
        
        if (!validateForm()) {
            formError = 'Please check the form for errors';
            return;
        }
        
        loading = true;
        formError = '';
  
        const user_data = {
            email: email,
            password: password,
        };
  
        try {
            const response = await fetch('https://api.s-tierproject.online/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user_data),
            });
  
            if (response.status === 200) {
                const res_data = await response.json();
                const token = res_data.token;
                document.cookie = `auth_token=${token}; path=/`;
                localStorage.setItem('token', token);
                isLoggedIn.set(true);
                goto('/dashboard');
            } else {
                formError = "Invalid email or password. Please try again.";
                console.error("Login failed with status:", response.status);
            }
        } catch (error) {
            formError = "Network error. Please check your connection.";
            console.error("Error submitting form:", error);
        } finally {
            loading = false;
        }
    }
  </script>
  
  <div class="min-h-screen w-full flex flex-col justify-center items-center   relative overflow-hidden">
    <!-- Abstract shapes background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- Noise overlay for texture -->
        <div class="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
    </div>
  
    <div class="w-full max-w-md px-4 z-10">
        <div in:fade={{ duration: 300, delay: 150 }} class="flex flex-col bg-gradient-to-r from-zinc-950 to-zinc-800 rounded-xl border border-zinc-800 overflow-hidden p-8">
            <div class="flex items-center mb-6">
                <div class="mr-4 bg-violet-200/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div>
                    <h1 class="text-lg font-bold text-white">Welcome Back</h1>
                    <p class="text-xs text-pink-300/80">Log in to your account</p>
                </div>
            </div>
  
            {#if formError}
                <div class="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm" transition:fly={{ y: -10, duration: 300 }}>
                    {formError}
                </div>
            {/if}
  
            <form class="space-y-4" on:submit={log_in}>
                <!-- Email input -->
                <div class="relative">
                    <label for="email" class="text-xs font-medium text-zinc-300 mb-2 block">Email Address</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="email@example.com" 
                        bind:value={email} 
                        on:focus={() => emailFocused = true}
                        on:blur={() => emailFocused = false}
                        class="w-full bg-zinc-900/60 border border-zinc-700 text-zinc-300 py-3 px-4 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-zinc-600
                               transition-all duration-200 ease-in-out placeholder:text-zinc-500
                               {!emailValid && email ? 'border-red-500/50 ring-1 ring-red-500/50' : ''}"
                        required
                    />
                    {#if !emailValid && email}
                        <p class="text-red-400 text-xs mt-1" transition:fly={{ y: -5, duration: 200 }}>Please enter a valid email address</p>
                    {/if}
                </div>
  
                <!-- Password input -->
                <div class="relative">
                    <div class="flex justify-between items-center mb-2">
                        <label for="password" class="text-xs font-medium text-zinc-300">Password</label>
                        <a href="/" class="text-xs text-pink-300/80 hover:text-pink-300 transition-colors">Forgot password?</a>
                    </div>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="••••••••" 
                        bind:value={password} 
                        on:focus={() => passwordFocused = true}
                        on:blur={() => passwordFocused = false}
                        class="w-full bg-zinc-900/60 border border-zinc-700 text-zinc-300 py-3 px-4 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-zinc-600
                               transition-all duration-200 ease-in-out placeholder:text-zinc-500
                               {!passwordValid && password ? 'border-red-500/50 ring-1 ring-red-500/50' : ''}"
                        required
                    />
                </div>
                
                <!-- Login button -->
                <button 
                    type="submit" 
                    class="w-full py-3 px-4 bg-gradient-to-r from-zinc-800 to-zinc-700 border border-zinc-700
                           text-white font-medium rounded-lg hover:from-zinc-700 hover:to-zinc-600
                           transition-all duration-300 transform hover:-translate-y-[1px] focus:outline-none 
                           focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
  
            <div class="relative flex items-center mt-6 mb-4">
                <div class="flex-grow border-t border-zinc-700"></div>
                <span class="flex-shrink mx-3 text-zinc-400 text-sm">or</span>
                <div class="flex-grow border-t border-zinc-700"></div>
            </div>
  
            <!-- Twitter Login Button -->
            <!-- <button 
                on:click={handle_twitter_login}
                class="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl
                       flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" fill="currentColor"></path>
                </svg>
                Continue with Twitter
            </button> -->
  
            <!-- Google OAuth Button with custom settings -->
            <div class="flex justify-center my-2">
              <GoogleAuth 
                  redirectUrl="/dashboard"
                  theme="outline" 
                  size="large"
              />
            </div>
  
            <div class="text-center mt-6">
                <span class="text-zinc-300">Don't have an account? </span>
                <a href="/signup" class="font-medium text-pink-300/80 hover:text-pink-300 transition-colors">Sign up</a>
            </div>
        </div>
    </div>
  
    {#if loading}
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" transition:fade={{ duration: 200 }}>
            <div class="p-5 rounded-xl bg-gradient-to-r from-zinc-950 to-zinc-800 border border-zinc-800 flex flex-col items-center">
                <div class="w-12 h-12 rounded-full border-4 border-t-violet-500 border-r-violet-500 border-b-zinc-700 border-l-zinc-700 animate-spin"></div>
                <p class="mt-4 text-zinc-300">Logging you in...</p>
            </div>
        </div>
    {/if}
  </div>