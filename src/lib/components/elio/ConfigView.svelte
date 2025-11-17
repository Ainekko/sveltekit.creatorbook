<!-- src/lib/components/elio/ConfigView.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  import { Save, CheckCircle, AlertCircle, Lightbulb } from 'lucide-svelte';

  export let config;
  export let saving = false;
  export let saveSuccess = false;
  export let saveError = null;

  const dispatch = createEventDispatcher();

  // Initialize empty arrays if not set
  $: if (config) {
    config.subreddits = config.subreddits || [];
    config.keywords = config.keywords || [];
    config.exclude_keywords = config.exclude_keywords || [];
    config.min_relevance = config.min_relevance || 65;
  }

  // Track if config has been modified
  let hasUnsavedChanges = false;
  $: if (config && !saving) {
    hasUnsavedChanges = true;
    saveSuccess = false;
  }
</script>

{#if config}
  <div class="max-w-4xl space-y-4 sm:space-y-6">
    
    <!-- Save Success Banner -->
    {#if saveSuccess}
      <div class="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
        <CheckCircle class="w-5 h-5 text-green-600" />
        <p class="text-sm text-green-800 font-medium">Configuration saved successfully!</p>
      </div>
    {/if}

    <!-- Save Error Banner -->
    {#if saveError}
      <div class="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
        <AlertCircle class="w-5 h-5 text-red-600" />
        <p class="text-sm text-red-800 font-medium">{saveError}</p>
      </div>
    {/if}

    <!-- Unsaved Changes Warning -->
    {#if hasUnsavedChanges && !saving && !saveSuccess}
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
        <AlertCircle class="w-5 h-5 text-amber-600" />
        <p class="text-sm text-amber-800 font-medium">You have unsaved changes. Click "Save Configuration" to persist them.</p>
      </div>
    {/if}
    
    <!-- AI Optimization Notice -->
    <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
          <Lightbulb class="w-4 h-4 text-white" />
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-purple-900 mb-1">AI-Powered Optimization</h3>
          <p class="text-sm text-purple-800">
            Leave fields empty and our AI will automatically find the best subreddits and keywords for your business. 
            Or customize to target specific communities.
          </p>
          <p class="text-xs text-purple-700 mt-2 font-medium">
            💡 Remember to click "Save Configuration" to persist your changes
          </p>
        </div>
      </div>
    </div>

    <!-- Subreddits -->
    <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
      <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-2">Target Subreddits</h2>
      <p class="text-sm text-zinc-500 mb-4">
        {#if config.subreddits.length === 0}
          <span class="text-purple-600 font-medium">AI will find relevant subreddits for you</span>
        {:else}
          Monitoring {config.subreddits.length} subreddit{config.subreddits.length !== 1 ? 's' : ''}
        {/if}
      </p>
      
      <div class="space-y-3">
        {#if config.subreddits.length > 0}
          <div class="flex flex-wrap gap-2">
            {#each config.subreddits as sub, idx}
              <span class="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium">
                r/{sub}
                <button
                  on:click={() => {
                    config.subreddits = config.subreddits.filter((_, i) => i !== idx);
                  }}
                  class="text-orange-600 hover:text-orange-900 font-bold"
                >
                  ×
                </button>
              </span>
            {/each}
          </div>
        {/if}

        <div class="flex gap-2">
          <input
            type="text"
            placeholder="Add subreddit (e.g., entrepreneur) - Optional"
            class="flex-1 px-3 sm:px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            on:keypress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                const sub = e.target.value.trim().replace(/^r\//, '');
                if (!config.subreddits.includes(sub)) {
                  config.subreddits = [...config.subreddits, sub];
                }
                e.target.value = '';
              }
            }}
          />
        </div>
      </div>
    </div>

    <!-- Keywords -->
    <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
      <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-2">Target Keywords</h2>
      <p class="text-sm text-zinc-500 mb-4">
        {#if config.keywords.length === 0}
          <span class="text-purple-600 font-medium">AI will identify relevant keywords automatically</span>
        {:else}
          Tracking {config.keywords.length} keyword{config.keywords.length !== 1 ? 's' : ''}
        {/if}
      </p>
      
      <div class="space-y-3">
        {#if config.keywords.length > 0}
          <div class="flex flex-wrap gap-2">
            {#each config.keywords as kw, idx}
              <span class="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                {kw}
                <button
                  on:click={() => {
                    config.keywords = config.keywords.filter((_, i) => i !== idx);
                  }}
                  class="text-blue-600 hover:text-blue-900 font-bold"
                >
                  ×
                </button>
              </span>
            {/each}
          </div>
        {/if}

        <div class="flex gap-2">
          <input
            type="text"
            placeholder="Add keyword - Optional"
            class="flex-1 px-3 sm:px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            on:keypress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                const kw = e.target.value.trim();
                if (!config.keywords.includes(kw)) {
                  config.keywords = [...config.keywords, kw];
                }
                e.target.value = '';
              }
            }}
          />
        </div>
      </div>
    </div>

    <!-- Exclude Keywords -->
    <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
      <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-2">Exclude Keywords</h2>
      <p class="text-sm text-zinc-500 mb-4">
        {#if config.exclude_keywords.length === 0}
          No exclusions set - AI will filter spam automatically
        {:else}
          Excluding {config.exclude_keywords.length} keyword{config.exclude_keywords.length !== 1 ? 's' : ''}
        {/if}
      </p>
      
      <div class="space-y-3">
        {#if config.exclude_keywords.length > 0}
          <div class="flex flex-wrap gap-2">
            {#each config.exclude_keywords as kw, idx}
              <span class="inline-flex items-center gap-2 px-3 py-1 bg-zinc-700 text-white rounded-lg text-sm font-medium">
                {kw}
                <button
                  on:click={() => {
                    config.exclude_keywords = config.exclude_keywords.filter((_, i) => i !== idx);
                  }}
                  class="text-zinc-300 hover:text-white font-bold"
                >
                  ×
                </button>
              </span>
            {/each}
          </div>
        {/if}

        <div class="flex gap-2">
          <input
            type="text"
            placeholder="Add keyword to exclude - Optional"
            class="flex-1 px-3 sm:px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            on:keypress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                const kw = e.target.value.trim();
                if (!config.exclude_keywords.includes(kw)) {
                  config.exclude_keywords = [...config.exclude_keywords, kw];
                }
                e.target.value = '';
              }
            }}
          />
        </div>
      </div>
    </div>

    <!-- Relevance Threshold -->
    <div class="bg-white rounded-xl p-4 sm:p-6 border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
      <h2 class="text-base sm:text-lg font-semibold text-zinc-900 mb-2">Minimum Relevance Score</h2>
      <p class="text-sm text-zinc-500 mb-4">Only show opportunities with at least this relevance score</p>
      
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <input
            type="range"
            bind:value={config.min_relevance}
            min="50"
            max="95"
            step="5"
            class="flex-1 accent-orange-500"
          />
          <span class="text-xl sm:text-2xl font-bold text-orange-600 min-w-[60px] text-right">
            {config.min_relevance}%
          </span>
        </div>
        
        <div class="text-sm text-zinc-600">
          {#if config.min_relevance >= 85}
            Very high - Only the most relevant opportunities
          {:else if config.min_relevance >= 70}
            Recommended - Good balance of quality and quantity
          {:else}
            Lower threshold - More opportunities, may need filtering
          {/if}
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="sticky bottom-4 flex justify-end">
      <button
        on:click={() => {
          hasUnsavedChanges = false;
          dispatch('saveConfig');
        }}
        disabled={saving}
        class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {#if saving}
          <div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          Saving...
        {:else if saveSuccess}
          <CheckCircle class="w-4 h-4" />
          Saved!
        {:else}
          <Save class="w-4 h-4" />
          Save Configuration
        {/if}
      </button>
    </div>
  </div>
{/if}

<style>
  /* Custom range slider styling */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 8px;
    border-radius: 4px;
    background: linear-gradient(to right, #ea580c 0%, #f59e0b 100%);
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 3px solid #ea580c;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 3px solid #ea580c;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>