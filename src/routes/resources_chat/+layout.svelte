<script lang="ts">
    import type { LayoutData } from './$types';
    import NavBar from "$lib/components/NavBar.svelte";

    export let data: LayoutData;
</script>

<main data-theme="cupcake" class=" w-screen h-screen flex flex-col justify-center items-center ">
    
    <div class="max-w-[1200px] w-full h-full ">
        <NavBar />
        <slot /> 
    </div>
    
</main>