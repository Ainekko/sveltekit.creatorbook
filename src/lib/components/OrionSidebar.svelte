<!-- $lib/components/OrionSidebar.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
  
    export let selectedAgent = null;
    export let agents = [];
  
    const dispatch = createEventDispatcher();
  </script>
  
  <div class="col-span-1 lg:col-span-1 space-y-6">
    {#if selectedAgent}
      {@const agent = agents.find(a => a.id === selectedAgent)}
      
      <!-- Agent Activity Feed -->
      <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-sm font-medium text-zinc-400 uppercase tracking-wider">Recent Activity</h2>
          <span class="text-xs text-zinc-500 px-3 py-1 bg-zinc-800 rounded-full">{agent.shortName}</span>
        </div>
        <div class="space-y-4">
          {#each agent.recentActivity as activity}
            <div class="flex items-start space-x-4 group">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-r {agent.gradient} flex items-center justify-center text-white text-xs font-bold mt-1">
                {activity.type === 'keyword' ? 'K' : activity.type === 'competitor' ? 'C' : activity.type === 'content' ? 'P' : 'O'}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <p class="text-white font-medium text-sm flex-1 min-w-0 truncate">{activity.action}</p>
                  <span class="text-zinc-500 text-xs">{activity.time}</span>
                </div>
                <p class="text-zinc-400 text-sm mt-1 line-clamp-2">{activity.detail}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
  
      <!-- AI Insights -->
      <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
        <h2 class="text-sm font-medium text-zinc-400 mb-6 uppercase tracking-wider">AI Insights</h2>
        <div class="space-y-4">
          {#each agent.insights as insight}
            <div class="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-white font-medium text-sm flex-1 min-w-0 truncate">{insight.title}</h3>
                <span class="text-xs px-2 py-1 rounded-full {insight.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}">
                  {insight.priority}
                </span>
              </div>
              <p class="text-zinc-400 text-xs line-clamp-3">{insight.description}</p>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <!-- No Agent Selected -->
      <div class="bg-zinc-950 rounded-xl p-8 border border-zinc-800 text-center">
        <div class="w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-3">Select SEO Agent</h3>
        <p class="text-zinc-400 mb-6">Choose the SEO agent to see detailed analytics and content</p>
        <button 
          on:click={() => dispatch('selectAgent', { agentId: 'seo' })}
          class="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:scale-105 transition-transform"
        >
          SEO
        </button>
      </div>
    {/if}
  </div>