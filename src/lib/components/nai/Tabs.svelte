<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let activeTab: string;
  const dispatch = createEventDispatcher();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'keywords', label: 'Keywords' },
    { id: 'outlines', label: 'Outlines' },
    { id: 'content', label: 'Content' },
    { id: 'settings', label: 'Settings' }
  ];
</script>

<div class="border-b border-gray-200 px-8">
  <nav class="flex space-x-8">
    {#each tabs as tab}
      <button
        on:click={() => dispatch('tabChange', tab.id)}
        class={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
      >
        <span>{tab.label}</span>
      </button>
    {/each}
  </nav>
</div>
