
<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import GoogleAuth from '$lib/components/Googleauth.svelte';
    import { isLoggedIn } from '$lib/stores';
    import {API_BASE_URL} from '$lib/config'

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

    async function log_in(event: any) {
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
            const response = await fetch(`${API_BASE_URL}/users/login/`, {
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

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

    .gentle-float {
        animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
</style>

<section class="flex items-center justify-center min-h-screen bg-white font-[Poppins] text-gray-900 py-8 px-4" transition:fade>
    <div class="max-w-md mx-auto">
        <div class="text-center mb-6">
            <h1 class="text-3xl font-semibold text-gray-700 leading-tight">
                Start to <span class="font-['Pacifico']">Log In</span>
            </h1>
            <p class="text-base text-gray-500 mt-2">
                Access your account to manage your projects.
            </p>
        </div>

        <div class="p-6 rounded-lg border border-gray-200 bg-white">
            <form on:submit|preventDefault={log_in} class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email Address <span class="text-red-500">*</span></label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="email@example.com" 
                        bind:value={email} 
                        on:focus={() => emailFocused = true}
                        on:blur={() => emailFocused = false}
                        class="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm
                               {!emailValid && email ? 'border-red-500 ring-1 ring-red-500' : ''}"
                        required
                    />
                    {#if !emailValid && email}
                        <p class="text-red-500 text-xs mt-1" transition:fly={{ y: -5, duration: 200 }}>Please enter a valid email address</p>
                    {/if}
                </div>

                <div>
                    <div class="flex justify-between items-center mb-1">
                        <label for="password" class="block text-sm font-medium text-gray-700">Password <span class="text-red-500">*</span></label>
                        <a href="/forgot-password" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">Forgot password?</a>
                    </div>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="••••••••" 
                        bind:value={password} 
                        on:focus={() => passwordFocused = true}
                        on:blur={() => passwordFocused = false}
                        class="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm
                               {!passwordValid && password ? 'border-red-500 ring-1 ring-red-500' : ''}"
                        required
                    />
                </div>

                {#if formError}
                    <p class="text-red-500 text-xs" transition:fly={{ y: -5, duration: 200 }}>{formError}</p>
                {/if}

                <div class="text-center">
                    <button 
                        type="submit" 
                        class="bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-all relative"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                        {#if !loading}
                            <div class="absolute top-0 right-0 w-3 h-3 bg-orange-400 rounded-full gentle-float" style="animation-delay: -3s;"></div>
                        {/if}
                    </button>
                </div>
            </form>

            <div class="relative flex items-center mt-4 mb-3">
                <div class="flex-grow border-t border-gray-200"></div>
                <span class="flex-shrink mx-3 text-gray-500 text-sm">or</span>
                <div class="flex-grow border-t border-gray-200"></div>
            </div>

            <div class="flex justify-center mb-3">
                <GoogleAuth 
                    redirectUrl="/dashboard"
                    theme="outline" 
                    size="large"
                />
            </div>

            <div class="text-center mt-3">
                <span class="text-gray-500 text-sm">Don't have an account? </span>
                <a href="/signup" class="font-medium text-gray-500 hover:text-gray-900 transition-colors text-sm">Sign up</a>
            </div>
        </div>
    </div>

    {#if loading}
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" transition:fade={{ duration: 200 }}>
            <div class="p-4 rounded-lg bg-white border border-gray-200 flex flex-col items-center">
                <div class="w-10 h-10 rounded-full border-4 border-t-gray-900 border-r-gray-900 border-b-gray-200 border-l-gray-200 animate-spin" aria-label="Loading"></div>
                <p class="mt-3 text-gray-900 text-sm">Logging you in...</p>
            </div>
        </div>
    {/if}
</section>
