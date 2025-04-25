<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    export let buttonText = 'Continue with Google';
    export let theme = 'filled_black'; // 'outline' | 'filled_blue' | 'filled_black'
    export let shape = 'pill'; // 'rectangular' | 'pill' | 'circle' | 'square'
    export let size = 'large'; // 'small' | 'medium' | 'large'
    export let width = 280; // button width in pixels
    export let redirectUrl = '/plans'; // where to redirect after successful login
    export let onSuccess = null; // optional callback function
    export let onError = null; // optional callback function
    export let logoAlignment = 'left'; // 'left' | 'center'
    
    let buttonContainer: HTMLElement;
    let isLoading = false;

    onMount(() => {
        // Load the Google Identity Services script
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        
        script.onload = () => {
            initializeGoogleButton();
        };
        
        return () => {
            // Cleanup on component destruction
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    });
    
    function initializeGoogleButton() {
        // Make sure Google API is loaded
        if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
            console.error('Google Identity Services not loaded');
            return;
        }
        
        google.accounts.id.initialize({
            client_id: '144652246407-itelihabs7ns4brsead66aion8o5uo9d.apps.googleusercontent.com',
            callback: handleCredentialResponse
        });
        
        // Render the button
        google.accounts.id.renderButton(
            buttonContainer,
            { 
                theme,
                size,
                shape,
                text: 'continue_with',
                width,
                logo_alignment: logoAlignment
            }
        );
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

<div class="google-auth-container">
    <div bind:this={buttonContainer}></div>
    
    {#if isLoading}
        <div class="loading-indicator">
            <!-- You can customize the loading indicator as needed -->
            <div class="loading-spinner"></div>
        </div>
    {/if}
</div>

<style>
    .google-auth-container {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
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
        border-radius: 4px;
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