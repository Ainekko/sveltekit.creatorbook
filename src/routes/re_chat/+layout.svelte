<script lang="ts">
    import type { LayoutData } from './$types';
    import LightNav from "$lib/components/LightNav.svelte";

    export let data: LayoutData;
</script>

<main data-theme="cupcake" class=" w-screen h-screen flex flex-col justify-center items-center ">
    
    <div class="max-w-[1200px] w-full h-full ">
        <LightNav />
        <slot /> 
    </div>
    
</main>