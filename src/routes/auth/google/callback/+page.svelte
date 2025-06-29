<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
  
    let status = 'Processing authentication...';
    let error = '';
  
    // Copy the handleCallback function from your component
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
        
        // Exchange authorization code for tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: '144652246407-itelihabs7ns4brsead66aion8o5uo9d.apps.googleusercontent.com',
            code: code,
            code_verifier: codeVerifier,
            grant_type: 'authorization_code',
            redirect_uri: `${window.location.origin}/auth/google/callback`,
          }),
        });
  
        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.text();
          console.error('Token exchange error:', errorData);
          throw new Error(`Failed to exchange authorization code: ${tokenResponse.status} - ${errorData}`);
        }
  
        if (!tokenResponse.ok) {
          throw new Error('Failed to exchange authorization code');
        }
  
        const tokenData = await tokenResponse.json();
        const { id_token } = tokenData;
  
        status = 'Authenticating with backend...';
  
        // Send to your backend
        const backendResponse = await fetch('https://api.s-tierproject.online/users/gauth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ access_token: id_token })
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
          throw new Error('Backend authentication failed');
        }
  
      } catch (err) {
        console.error('Error during token exchange:', err);
        error = 'Authentication failed: ' + (err as Error).message;
      }
    }
  
    onMount(async () => {
      const urlParams = new URLSearchParams($page.url.search);
      await handleCallback(urlParams);
    });
  </script>
  
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
      {#if error}
        <div class="text-red-600 mb-4">
          <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <p class="text-lg font-semibold">Authentication Failed</p>
          <p class="text-sm text-gray-600 mt-2">{error}</p>
        </div>
        <button 
          on:click={() => goto('/')}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      {:else}
        <div class="text-blue-600 mb-4">
          <div class="w-16 h-16 mx-auto mb-4 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p class="text-lg font-semibold">{status}</p>
        </div>
      {/if}
    </div>
  </div>