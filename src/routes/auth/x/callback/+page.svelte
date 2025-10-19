<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
  
    console.log('[Callback] Script loaded immediately (pre-onMount).');
  
    const BACKEND_URL = 'http://127.0.0.1:8000';
    const CALLBACK_API_ENDPOINT = `${BACKEND_URL}/rio/api/oauth/callback/`;
  
    let statusMessage = 'Authenticating, please wait...';
    let isClosing = false;
  
    onMount(async () => {
      console.log('[Callback] onMount fired - page mounted.');
      console.log('[Callback] Full $page.url:', $page.url.toString());
  
      const urlParams = new URLSearchParams($page.url.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const error = urlParams.get('error');
  
      console.log('[Callback] Extracted from URL:', { code, state, error });
  
      if (error) {
        console.error('[Callback] Twitter auth denied:', error);
        statusMessage = `Auth denied: ${error}. Closing...`;
        if (window.opener) {
          window.opener.postMessage({ type: 'x-oauth-error', error: `Auth denied: ${error}` }, window.location.origin);
        }
        setTimeout(() => window.close(), 1000);
        return;
      }
  
      if (!code || !state) {
        console.error('[Callback] CRITICAL: Missing code or state!');
        statusMessage = 'Missing auth details. Closing...';
        if (window.opener) {
          window.opener.postMessage({ type: 'x-oauth-error', error: 'Missing auth code/state' }, window.location.origin);
        }
        setTimeout(() => window.close(), 1000);
        return;
      }
  
      try {
        statusMessage = 'Exchanging code for tokens...';
        const body = JSON.stringify({ code, state });
        console.log(`[Callback] Sending POST to backend: ${CALLBACK_API_ENDPOINT}`);
  
        const res = await fetch(CALLBACK_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
        });
  
        console.log('[Callback] Backend response status:', res.status);
        const data = await res.json();
        console.log('[Callback] Backend response data:', data);
  
        if (!res.ok) {
          throw new Error(data.error || `Backend failed: ${res.status}`);
        }
  
        statusMessage = 'Connected! Closing window...';
        if (data.success && window.opener) {
          const message = { type: 'x-oauth-success', account: data.account };
          console.log('[Callback] Success! Posting message to opener.');
          window.opener.postMessage(message, window.location.origin);
        } else {
          throw new Error(data.error || 'Backend reported failure');
        }
  
        // Immediate close after success message
        console.log('[Callback] Attempting immediate close after postMessage.');
        isClosing = true;
        window.close();
  
      } catch (error) {
        console.error('[Callback] Full error:', error);
        statusMessage = `Error: ${error.message}. Closing...`;
        if (window.opener) {
          window.opener.postMessage({ type: 'x-oauth-error', error: error.message }, window.location.origin);
        }
        setTimeout(() => window.close(), 1000);
      }
  
      // Fallback: Listen for blur (focus loss) to close if immediate fails
      const handleBlur = () => {
        console.log('[Callback] Window blurred - forcing close.');
        window.removeEventListener('blur', handleBlur);
        window.close();
      };
      window.addEventListener('blur', handleBlur);
    });
  </script>
  
  <div style="padding: 2rem; text-align: center; min-height: 200px; display: flex; flex-direction: column; justify-content: center;">
    <p id="status">{statusMessage}</p>
    {#if isClosing}
      <p style="font-size: 0.875rem; color: #6b7280; margin-top: 1rem;">(You can close this tab manually if needed)</p>
    {/if}
  </div>
  
  <style>
    #status {
      font-weight: 500;
      color: #374151;
    }
  </style>