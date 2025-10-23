<script lang="ts">
    import { goto } from '$app/navigation';
    import Googleauth from '$lib/components/Googleauth.svelte';
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import {API_BASE_URL} from '$lib/config'

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
            const response = await fetch(`${API_BASE_URL}/users/register/`, {
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
                const responseText = await response.text();
                
                try {
                    const errorData = JSON.parse(responseText);
                    formError = errorData.message || "Registration failed. Please try again.";
                } catch (parseError) {
                    formError = "Registration failed. Please try again.";
                }
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
                Start to <span class="font-['Pacifico']">Sign Up</span>
            </h1>
            <p class="text-base text-gray-500 mt-2">
                Create your account to get started with your projects.
            </p>
        </div>

        <div class="p-6 rounded-lg border border-gray-200 bg-white">
            <form on:submit|preventDefault={register} class="space-y-4">
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700">Username <span class="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        id="username"
                        placeholder="username" 
                        bind:value={username} 
                        on:focus={() => usernameFocused = true}
                        on:blur={() => usernameFocused = false}
                        class="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm
                               {!usernameValid && username ? 'border-red-500 ring-1 ring-red-500' : ''}"
                        required
                    />
                    {#if !usernameValid && username}
                        <p class="text-red-500 text-xs mt-1" transition:fly={{ y: -5, duration: 200 }}>Username must be at least 3 characters</p>
                    {/if}
                </div>

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
                    <label for="password" class="block text-sm font-medium text-gray-700">Password <span class="text-red-500">*</span></label>
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
                    {#if !passwordValid && password}
                        <p class="text-red-500 text-xs mt-1" transition:fly={{ y: -5, duration: 200 }}>Password must be at least 6 characters</p>
                    {/if}
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
                        {loading ? 'Creating account...' : 'Sign Up'}
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
                <Googleauth 
                    redirectUrl="/plans"
                    theme="outline" 
                    size="large"
                />
            </div>

            <div class="text-center mt-3">
                <span class="text-gray-500 text-sm">Already have an account? </span>
                <a href="/login" class="font-medium text-gray-500 hover:text-gray-900 transition-colors text-sm">Log in</a>
            </div>
        </div>
    </div>

    {#if loading}
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" transition:fade={{ duration: 200 }}>
            <div class="p-4 rounded-lg bg-white border border-gray-200 flex flex-col items-center">
                <div class="w-10 h-10 rounded-full border-4 border-t-gray-900 border-r-gray-900 border-b-gray-200 border-l-gray-200 animate-spin" aria-label="Loading"></div>
                <p class="mt-3 text-gray-900 text-sm">Creating your account...</p>
            </div>
        </div>
    {/if}
</section>