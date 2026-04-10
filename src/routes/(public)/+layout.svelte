<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import AgencyFooter from '$lib/components/agency/AgencyFooter.svelte';
</script>

<div class="sticky top-0 z-50">
	<NavBar />
</div>

<slot />

<AgencyFooter />
