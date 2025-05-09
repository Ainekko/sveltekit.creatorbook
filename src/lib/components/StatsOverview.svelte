<!-- src/lib/components/StatsOverview.svelte -->
<script lang="ts">
    export let stats = {
      totalContentItems: 0,
      publishedPosts: 0,
      draftPosts: 0,
      scheduledSocial: 0,
      keywordTargets: 0
    };
  </script>
  
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
    <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex flex-col items-center justify-center">
      <span class="text-3xl font-bold text-pink-400 mb-1">{stats.totalContentItems}</span>
      <span class="text-xs text-zinc-400">Total Content Items</span>
    </div>
    <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex flex-col items-center justify-center">
      <span class="text-3xl font-bold text-green-400 mb-1">{stats.publishedPosts}</span>
      <span class="text-xs text-zinc-400">Published Posts</span>
    </div>
    <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex flex-col items-center justify-center">
      <span class="text-3xl font-bold text-yellow-400 mb-1">{stats.draftPosts}</span>
      <span class="text-xs text-zinc-400">Draft Posts</span>
    </div>
    <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex flex-col items-center justify-center">
      <span class="text-3xl font-bold text-blue-400 mb-1">{stats.scheduledSocial}</span>
      <span class="text-xs text-zinc-400">Scheduled Social</span>
    </div>
    <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex flex-col items-center justify-center">
      <span class="text-3xl font-bold text-violet-400 mb-1">{stats.keywordTargets}</span>
      <span class="text-xs text-zinc-400">Keyword Targets</span>
    </div>
  </div>