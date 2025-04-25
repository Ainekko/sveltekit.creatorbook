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
            callback: handleCredentialResponse,
            // Add the following configuration options to address FedCM issues
            use_fedcm_for_prompt: true, // Enable FedCM
            cancel_on_tap_outside: true, // Allow dismissing the prompt by clicking outside
            prompt_parent_id: 'google-auth-prompt-container', // Optional: specify a container for the prompt
        });
        
        googleInitialized = true;
    }
    
    function initiateLogin() {
        if (googleInitialized) {
            try {
                google.accounts.id.prompt((notification) => {
                    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                        // Handle when the prompt is not displayed or skipped
                        console.log('Prompt not displayed or skipped:', notification.getNotDisplayedReason() || notification.getSkippedReason());
                        
                        // If the reason is due to a recently dismissed prompt, we can try again later
                        if (notification.getNotDisplayedReason() === 'prompt_suppressed_by_user') {
                            // Maybe inform the user to try again later
                        }
                    }
                });
            } catch (error) {
                console.error("Error prompting Google Sign-In:", error);
                if (onError && typeof onError === 'function') {
                    onError(error);
                }
            }
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
        <svg class="google-icon" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>
        {/if}
        <span>{buttonText}</span>
        {#if logoAlignment === 'center'}
        <svg class="google-icon" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>
        {/if}
    </button>
    
    {#if isLoading}
        <div class="loading-indicator">
            <div class="loading-spinner"></div>
        </div>
    {/if}
</div>

<!-- Container for Google Sign-In prompt -->
<div id="google-auth-prompt-container"></div>

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