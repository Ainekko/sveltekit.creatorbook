<script>
	import NavBar from '$lib/components/NavBar.svelte';

    /** @type {import('./$types').LayoutData} */
    export let data;
</script>

<div class="sticky top-0 z-50">
    <NavBar />
</div>

<slot />