<script lang="ts">
  import { page } from '$app/stores';
  import Tabs from '$lib/components/nai/Tabs.svelte';
  import Overview from '$lib/components/nai/Overview.svelte';
  import Keywords from '$lib/components/nai/Keywords.svelte';
  import Outlines from '$lib/components/nai/Outlines.svelte';
  import Content from '$lib/components/nai/Content.svelte';
  import Settings from '$lib/components/nai/Settings.svelte';

  export let data: any;

  let activeTab: string = 'overview';
  let isAutopilotEnabled: boolean = false;

  let projectId = data.projectId;

  function toggleAutopilot() {
    isAutopilotEnabled = !isAutopilotEnabled;
    console.log(`Autopilot ${isAutopilotEnabled ? 'enabled' : 'disabled'}`);
  }
</script>

<div class="min-h-screen bg-white text-gray-900">
  <Tabs {activeTab} on:tabChange={(e) => activeTab = e.detail} class="overflow-x-auto" />
  <div class="px-4 py-4 sm:px-8 sm:py-8">
    {#if activeTab === 'overview'}
      <Overview projectId={projectId} />
    {:else if activeTab === 'keywords'}
      <Keywords {projectId} />
    {:else if activeTab === 'outlines'}
      <Outlines {projectId} />
    {:else if activeTab === 'content'}
      <Content {projectId} />
    {:else if activeTab === 'settings'}
      <Settings {isAutopilotEnabled} {toggleAutopilot} />
    {/if}
  </div>
</div>

<style>
  /* Ensure tabs handle mobile scrolling smoothly */
  :global(.tabs-container) {
    @apply flex whitespace-nowrap overflow-x-auto scrollbar-hide;
  }

  /* Hide scrollbar for webkit browsers */
  :global(.scrollbar-hide) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  :global(.scrollbar-hide::-webkit-scrollbar) {
    display: none;
  }
</style>