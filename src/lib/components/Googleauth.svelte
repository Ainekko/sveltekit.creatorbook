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
            use_fedcm_for_prompt: false, // Disable FedCM to prevent browser compatibility issues
            cancel_on_tap_outside: true
        });
        
        googleInitialized = true;
    }
    
    function initiateLogin() {
        if (!googleInitialized) {
            console.error('Google Identity Services not initialized');
            return;
        }
        
        try {
            google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    console.warn('Google prompt was not displayed or was skipped. Reason:', 
                        notification.getNotDisplayedReason() || notification.getSkippedReason());
                }
            });
        } catch (error) {
            console.error('Error initiating Google login:', error);
            if (onError && typeof onError === 'function') {
                onError(error);
            }
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
            <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="-3 0 262 262" preserveAspectRatio="xMidYMid">
                <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
                <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
                <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
                <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
            </svg>
        {/if}
        <span>{buttonText}</span>
        {#if logoAlignment === 'center'}
            <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="-3 0 262 262" preserveAspectRatio="xMidYMid">
                <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
                <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
                <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
                <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
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