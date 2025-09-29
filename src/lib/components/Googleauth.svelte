<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let buttonText = 'Continue with Google';
	export let redirectUrl = '/plans';
	export let onSuccess: ((response: any) => void) | null = null;
	export let onError: ((error: any) => void) | null = null;

	let isLoading = false;

	// Google OAuth2 configuration
	const GOOGLE_CLIENT_ID = '144652246407-itelihabs7ns4brsead66aion8o5uo9d.apps.googleusercontent.com';
	const REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/auth/google/callback` : '';
	const SCOPE = 'openid email profile';

	function generateRandomString(length: number): string {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}

	async function generateCodeChallenge(codeVerifier: string): Promise<string> {
		const encoder = new TextEncoder();
		const data = encoder.encode(codeVerifier);
		const digest = await crypto.subtle.digest('SHA-256', data);
		const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)));
		return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
	}

	async function handleGoogleLogin() {
		if (!browser) return;
		
		isLoading = true;
		
		try {
			// Generate PKCE parameters
			const codeVerifier = generateRandomString(128);
			const codeChallenge = await generateCodeChallenge(codeVerifier);
			const state = generateRandomString(32);

			// Store PKCE parameters in sessionStorage
			sessionStorage.setItem('google_code_verifier', codeVerifier);
			sessionStorage.setItem('google_state', state);

			// Build authorization URL
			// const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth?client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/adwords&access_type=offline&prompt=consent');

			const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
			authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
			authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
			authUrl.searchParams.set('response_type', 'code');
			authUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/adwords'); // <-- important
			authUrl.searchParams.set('access_type', 'offline'); // <-- forces refresh token
			authUrl.searchParams.set('prompt', 'consent'); // <-- forces consent
			authUrl.searchParams.set('code_challenge', codeChallenge);
			authUrl.searchParams.set('code_challenge_method', 'S256');
			authUrl.searchParams.set('state', state);


			// Redirect to Google OAuth
			window.location.href = authUrl.toString();
			
		} catch (error) {
			console.error('Error initiating Google login:', error);
			if (onError) {
				onError(error);
			}
			isLoading = false;
		}
	}

	// Function to handle the callback (call this from your callback page)
	export async function handleCallback(urlParams: URLSearchParams) {
		const code = urlParams.get('code');
		const state = urlParams.get('state');
		const error = urlParams.get('error');

		if (error) {
			console.error('OAuth error:', error);
			if (onError) {
				onError(new Error(error));
			}
			return;
		}

		if (!code || !state) {
			console.error('Missing code or state parameter');
			if (onError) {
				onError(new Error('Missing authorization code'));
			}
			return;
		}

		// Verify state parameter
		const storedState = sessionStorage.getItem('google_state');
		if (state !== storedState) {
			console.error('State parameter mismatch');
			if (onError) {
				onError(new Error('State parameter mismatch'));
			}
			return;
		}

		// Get code verifier
		const codeVerifier = sessionStorage.getItem('google_code_verifier');
		if (!codeVerifier) {
			console.error('Missing code verifier');
			if (onError) {
				onError(new Error('Missing code verifier'));
			}
			return;
		}

		try {
			// Send code and verifier to backend for token exchange
			const backendResponse = await fetch('https://api.s-tierproject.online/auth/google/callback', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ 
					code: code,
					code_verifier: codeVerifier,
					redirect_uri: REDIRECT_URI
				})
			});

			if (backendResponse.status === 200) {
				const responseData = await backendResponse.json();
				const token = responseData.token;
				localStorage.setItem('token', token);

				// Clean up session storage
				sessionStorage.removeItem('google_code_verifier');
				sessionStorage.removeItem('google_state');

				if (onSuccess) {
					onSuccess(responseData);
				} else {
					goto(redirectUrl);
				}
			} else {
				const errorData = await backendResponse.json();
				throw new Error(errorData.error || 'Backend authentication failed');
			}

		} catch (error) {
			console.error('Error during authentication:', error);
			if (onError) {
				onError(error);
			}
		}
	}
</script>

<button
	on:click={handleGoogleLogin}
	disabled={isLoading}
	class="flex w-full max-w-sm items-center justify-center gap-3 rounded-xl bg-zinc-200 px-4 py-2 font-medium text-zinc-950 transition-colors hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-70"
>
	{#if isLoading}
		<div class="h-5 w-5 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
		<span>Redirecting...</span>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 48 48">
			<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
			<path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
			<path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
			<path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.138,44,30.025,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
		</svg>
		<span>{buttonText}</span>
	{/if}
</button>