<!-- src/lib/components/elio/ViewTabs.svelte -->
<script>
    import { FileText, Target, Sparkles, User, Settings } from 'lucide-svelte';
  
    export let view;
    export let blogPosts;
    export let filteredOpportunities;
    export let pendingPosts;
    export let approvedPosts;
  </script>
  
  <div class="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
    <div class="flex gap-2 border-b border-zinc-200 min-w-max">
      <button
        on:click={() => view = 'content'}
        class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'content' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
      >
        <FileText class="w-4 h-4" />
        Content ({blogPosts.length})
      </button>
      <button
        on:click={() => view = 'opportunities'}
        class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'opportunities' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
      >
        <Target class="w-4 h-4" />
        Opportunities ({filteredOpportunities.length})
      </button>
      <button
        on:click={() => view = 'posts'}
        class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'posts' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
      >
        <Sparkles class="w-4 h-4" />
        Posts ({pendingPosts.length + approvedPosts.length})
      </button>
      <button
        on:click={() => view = 'profile'}
        class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'profile' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
      >
        <User class="w-4 h-4" />
        Profile
      </button>
      <button
        on:click={() => view = 'config'}
        class="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap {view === 'config' ? 'text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}"
      >
        <Settings class="w-4 h-4" />
        Config
      </button>
    </div>
  </div>