<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let buttonText = 'Continue with Google';
	export let redirectUrl = '/plans'; // where to redirect after successful login
	export let onSuccess: ((response: any) => void) | null = null; // optional callback function
	export let onError: ((error: any) => void) | null = null; // optional callback function

	let isLoading = false;
	let isGoogleReady = false;

	onMount(() => {
		// Load the Google Identity Services script
		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);

		script.onload = () => {
			initializeGoogleSignIn();
		};

		return () => {
			// Cleanup on component destruction
			if (document.body.contains(script)) {
				document.body.removeChild(script);
			}
		};
	});

	function initializeGoogleSignIn() {
		if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
			console.error('Google Identity Services not loaded');
			return;
		}

		google.accounts.id.initialize({
			client_id: '144652246407-itelihabs7ns4brsead66aion8o5uo9d.apps.googleusercontent.com',
			callback: handleCredentialResponse
		});
		
		isGoogleReady = true;
        google.accounts.id.disableAutoSelect();
	}

	function handleGoogleClick() {
        if (!isGoogleReady) {
            console.error("Google Sign-In is not ready yet.");
            return;
        }
		// When our custom button is clicked, trigger the Google Sign-In prompt
		google.accounts.id.prompt();
	}

	function handleCredentialResponse(response: any) {
		isLoading = true;
		const id_token = response.credential;

		// THIS ENTIRE SECTION IS IDENTICAL TO YOUR ORIGINAL CODE
		fetch('https://api.s-tierproject.online/users/gauth/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ access_token: id_token })
		})
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				} else {
					throw new Error('Google login failed with status: ' + res.status);
				}
			})
			.then((res_data) => {
				if (res_data) {
					const token = res_data.token;
					localStorage.setItem('token', token);

					if (onSuccess && typeof onSuccess === 'function') {
						onSuccess(res_data);
					} else {
						goto(redirectUrl);
					}
				}
			})
			.catch((error) => {
				console.error('Error with Google login:', error);
				if (onError && typeof onError === 'function') {
					onError(error);
				}
			})
			.finally(() => {
				isLoading = false;
			});
	}
</script>

<button
	on:click={handleGoogleClick}
	disabled={isLoading || !isGoogleReady}
	class="flex w-full max-w-sm items-center justify-center gap-3 rounded-xl bg-zinc-200 px-4 py-2 font-medium text-zinc-950 transition-colors hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-70"
>
	{#if isLoading}
		<div class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
		<span>Processing...</span>
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