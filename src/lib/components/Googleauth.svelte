<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    export let buttonText = 'Continue with Google';
    export let theme = 'filled_black'; // Not used directly in custom button but kept for API compatibility
    export let shape = 'pill'; // Not used directly in custom button but kept for API compatibility
    export let size = 'large'; // Not used directly in custom button but kept for API compatibility
    export let width = 280; // button width in pixels
    export let redirectUrl = '/plans'; // where to redirect after successful login
    export let onSuccess = null; // optional callback function
    export let onError = null; // optional callback function
    export let logoAlignment = 'left'; // Used in custom button styling
    
    let isLoading = false;
    let googleInitialized = false;

    onMount(() => {
        // Load the Google Identity Services script
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        
        script.onload = () => {
            initializeGoogle();
        };
        
        return () => {
            // Cleanup on component destruction
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    });
    
    function initializeGoogle() {
        // Make sure Google API is loaded
        if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
            console.error('Google Identity Services not loaded');
            return;
        }
        
        google.accounts.id.initialize({
            client_id: '144652246407-itelihabs7ns4brsead66aion8o5uo9d.apps.googleusercontent.com',
            callback: handleCredentialResponse
        });
        
        googleInitialized = true;
    }
    
    function initiateLogin() {
        if (googleInitialized) {
            google.accounts.id.prompt();
        } else {
            console.error('Google Identity Services not initialized');
        }
    }
    
    function handleCredentialResponse(response: any) {
        isLoading = true;
        const id_token = response.credential;
        
        // Call the backend with the Google ID token
        fetch('https://api.s-tierproject.online/users/gauth/', {
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
                throw new Error("Google login failed with status: " + res.status);
            }
        })
        .then(res_data => {
            if (res_data) {
                // Store token in localStorage
                const token = res_data.token;
                localStorage.setItem('token', token);
                
                // Call success callback if provided
                if (onSuccess && typeof onSuccess === 'function') {
                    onSuccess(res_data);
                } else {
                    // Redirect to specified URL
                    goto(redirectUrl);
                }
            }
        })
        .catch(error => {
            console.error("Error with Google login:", error);
            // Call error callback if provided
            if (onError && typeof onError === 'function') {
                onError(error);
            }
        })
        .finally(() => {
            isLoading = false;
        });
    }
</script>

<div class="google-auth-container" style="width: {width}px">
    <button 
        class="custom-google-button" 
        on:click={initiateLogin}
        disabled={isLoading || !googleInitialized}
    >
        {#if logoAlignment === 'left'}
            <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
            </svg>
        {/if}
        <span>{buttonText}</span>
        {#if logoAlignment === 'center'}
            <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
            </svg>
        {/if}
    </button>
    
    {#if isLoading}
        <div class="loading-indicator">
            <div class="loading-spinner"></div>
        </div>
    {/if}
</div>

<style>
    .google-auth-container {
        position: relative;
        display: flex;
        justify-content: center;
        max-width: 100%;
    }
    
    .custom-google-button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: 50px;
        border: 1px solid #dadce0;
        background-color: white;
        color: #3c4043;
        font-family: 'Roboto', sans-serif, system-ui;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
    }
    
    .custom-google-button:hover {
        background-color: #f8f9fa;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .custom-google-button:active {
        background-color: #f1f3f4;
    }
    
    .custom-google-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .google-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
    }
    
    .loading-indicator {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50px;
    }
    
    .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #8b5cf6; /* violet-500 */
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>