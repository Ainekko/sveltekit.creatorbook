<script>
    import { page } from '$app/stores';
  </script>
  
  {#key $page.url.pathname}
    <slot />
  {/key}
  