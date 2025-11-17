<!-- src/lib/components/elio/ViewTabs.svelte -->
<script>
  import { FileText, Target, User, Settings } from 'lucide-svelte';
  
  export let view;
  export let blogPosts = [];
  export let filteredOpportunities = [];
  export let pendingPosts = [];
  export let approvedPosts = [];

  const tabs = [
    {
      id: 'content-posts',
      label: 'Content & Posts',
      icon: FileText,
      count: blogPosts.length + pendingPosts.length + approvedPosts.length
    },
    {
      id: 'opportunities',
      label: 'Opportunities',
      icon: Target,
      count: filteredOpportunities.length
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      count: null
    },
    {
      id: 'config',
      label: 'Configuration',
      icon: Settings,
      count: null
    }
  ];
</script>

<div class="mb-6 border-b border-zinc-200">
  <div class="flex gap-2 overflow-x-auto scrollbar-hide">
    {#each tabs as tab}
      <button
        on:click={() => view = tab.id}
        class="flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap {
          view === tab.id
            ? 'border-orange-600 text-orange-600 font-semibold'
            : 'border-transparent text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
        }"
      >
        <svelte:component this={tab.icon} class="w-4 h-4" />
        <span>{tab.label}</span>
        {#if tab.count !== null}
          <span class="px-2 py-0.5 rounded-full text-xs font-medium {
            view === tab.id
              ? 'bg-orange-100 text-orange-700'
              : 'bg-zinc-100 text-zinc-600'
          }">
            {tab.count}
          </span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>