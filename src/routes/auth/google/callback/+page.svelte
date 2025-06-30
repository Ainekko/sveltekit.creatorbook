<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let status = 'Processing authentication...';
  let error = '';

  async function handleCallback(urlParams: URLSearchParams) {
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const errorParam = urlParams.get('error');

    if (errorParam) {
      console.error('OAuth error:', errorParam);
      error = 'Authentication failed: ' + errorParam;
      return;
    }

    if (!code || !state) {
      console.error('Missing code or state parameter');
      error = 'Missing authorization code';
      return;
    }

    // Verify state parameter
    const storedState = sessionStorage.getItem('google_state');
    if (state !== storedState) {
      console.error('State parameter mismatch');
      error = 'State parameter mismatch';
      return;
    }

    // Get code verifier
    const codeVerifier = sessionStorage.getItem('google_code_verifier');
    if (!codeVerifier) {
      console.error('Missing code verifier');
      error = 'Missing code verifier';
      return;
    }

    try {
      status = 'Exchanging authorization code...';
      
      // Send code and verifier to backend for token exchange
      const backendResponse = await fetch('https://api.s-tierproject.online/users/gauth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          code: code,
          code_verifier: codeVerifier,
          redirect_uri: `${window.location.origin}/auth/google/callback`
        })
      });

      if (backendResponse.status === 200) {
        const responseData = await backendResponse.json();
        const token = responseData.token;
        localStorage.setItem('token', token);

        // Clean up session storage
        sessionStorage.removeItem('google_code_verifier');
        sessionStorage.removeItem('google_state');

        status = 'Authentication successful! Redirecting...';
        
        // Redirect to plans page
        setTimeout(() => {
          goto('/plans');
        }, 1000);
      } else {
        const errorData = await backendResponse.json();
        throw new Error(errorData.error || 'Backend authentication failed');
      }

    } catch (err) {
      console.error('Error during authentication:', err);
      error = 'Authentication failed: ' + (err as Error).message;
    }
  }

  onMount(async () => {
    const urlParams = new URLSearchParams($page.url.search);
    await handleCallback(urlParams);
  });
</script>

<div class="min-h-screen flex items-center justify-center bg-black">
  {#if !error}
    <div class="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  {/if}
</div>