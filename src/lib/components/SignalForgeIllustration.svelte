<script>
  import StartupScrapeShowcase from '$lib/components/StartupScrapeShowcase.svelte';
  export let activeTab = 0;
</script>

<div class="sf-illustration-container w-full h-full flex items-center justify-center p-2 sm:p-4">
  <StartupScrapeShowcase {activeTab} />
</div>

<style>
  .sf-illustration-container {
    box-sizing: border-box;
    width: 100%;
    min-height: 380px;
  }
</style>
