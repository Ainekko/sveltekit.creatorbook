<script lang="ts">
	let shortToken = '';
	let result: any = null;
	let error: string | null = null;

	async function exchange() {
		error = null;
		result = null;
		try {
			const res = await fetch(`/api/facebook/exchange?token=${encodeURIComponent(shortToken)}`);
			const data = await res.json();
			if (res.ok) {
				result = data;
			} else {
				error = data.error || 'Failed to get token';
			}
		} catch (err) {
			error = 'Network error';
		}
	}
</script>

<h2>Exchange Facebook Token</h2>
<input bind:value={shortToken} placeholder="Paste short-lived token here" />
<button on:click={exchange}>Get Long-Lived Token</button>

{#if result}
	<p><strong>Long-Lived Token:</strong> {result.access_token}</p>
	<p><strong>Expires In:</strong> {result.expires_in} seconds</p>
{/if}

{#if error}
	<p style="color:red">{error}</p>
{/if}
