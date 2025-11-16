<!-- src/lib/components/elio/ConfigView.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
  
    export let config;
  
    const dispatch = createEventDispatcher();
  </script>
  
  {#if config}
    <div class="max-w-4xl space-y-4 sm:space-y-6">
      <!-- Subreddits -->
      <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
        <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Target Subreddits</h2>
        <div class="space-y-3">
          <div class="flex flex-wrap gap-2">
            {#each config.subreddits as sub, idx}
              <span class="inline-flex items-center gap-2 px-3 py-1 bg-zinc-200 text-zinc-800 rounded-lg text-sm">
                r/{sub}
                <button
                  on:click={() => {
                    config.subreddits = config.subreddits.filter((_, i) => i !== idx);
                    config = config;
                  }}
                  class="text-zinc-600 hover:text-zinc-900"
                >
                  ×
                </button>
              </span>
            {/each}
          </div>
  
          <div class="flex gap-2">
            <input
              type="text"
              placeholder="Add subreddit (e.g., entrepreneur)"
              class="flex-1 px-3 sm:px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
              on:keypress={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  config.subreddits = [...config.subreddits, e.target.value.replace('r/', '')];
                  config = config;
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>
  
      <!-- Keywords -->
      <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
        <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Target Keywords</h2>
        <p class="text-sm text-zinc-500 mb-3">Optional - Leave empty to let AI find relevant posts automatically</p>
        <div class="space-y-3">
          <div class="flex flex-wrap gap-2">
            {#each config.keywords as kw, idx}
              <span class="inline-flex items-center gap-2 px-3 py-1 bg-zinc-200 text-zinc-800 rounded-lg text-sm">
                {kw}
                <button
                  on:click={() => {
                    config.keywords = config.keywords.filter((_, i) => i !== idx);
                    config = config;
                  }}
                  class="text-zinc-600 hover:text-zinc-900"
                >
                  ×
                </button>
              </span>
            {/each}
          </div>
  
          <div class="flex gap-2">
            <input
              type="text"
              placeholder="Add keyword"
              class="flex-1 px-3 sm:px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
              on:keypress={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  config.keywords = [...config.keywords, e.target.value];
                  config = config;
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>
  
      <!-- Exclude Keywords -->
      <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
        <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Exclude Keywords</h2>
        <div class="space-y-3">
          <div class="flex flex-wrap gap-2">
            {#each config.exclude_keywords as kw, idx}
              <span class="inline-flex items-center gap-2 px-3 py-1 bg-zinc-700 text-white rounded-lg text-sm">
                {kw}
                <button
                  on:click={() => {
                    config.exclude_keywords = config.exclude_keywords.filter((_, i) => i !== idx);
                    config = config;
                  }}
                  class="text-zinc-300 hover:text-white"
                >
                  ×
                </button>
              </span>
            {/each}
          </div>
  
          <div class="flex gap-2">
            <input
              type="text"
              placeholder="Add exclude keyword"
              class="flex-1 px-3 sm:px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
              on:keypress={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  config.exclude_keywords = [...config.exclude_keywords, e.target.value];
                  config = config;
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>
  
      <!-- Relevance Threshold -->
      <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
        <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-4">Minimum Relevance</h2>
        <div class="flex items-center gap-4">
          <input
            type="range"
            bind:value={config.min_relevance}
            min="50"
            max="90"
            step="5"
            class="flex-1 accent-orange-500"
          />
          <span class="text-xl sm:text-2xl font-bold text-zinc-900 min-w-[50px] sm:min-w-[60px]">
            {config.min_relevance}%
          </span>
        </div>
      </div>
  
      <!-- Save Button -->
      <div class="flex justify-end">
        <button
          on:click={() => dispatch('saveConfig')}
          class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          Save Configuration
        </button>
      </div>
    </div>
  {/if}