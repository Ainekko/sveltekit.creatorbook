<script lang='ts'>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    // Props
    export let businessName = '';
    export let businessDescription = '';
    
    // State
    let subreddits = ['entrepreneur', 'startups'];
    let keywords = ['competitor analysis', 'market research'];
    let excludeKeywords = ['spam', 'promo'];
    let minRelevance = 65;
    let saving = false;
    let saved = false;
    
    // Input fields
    let newSubreddit = '';
    let newKeyword = '';
    let newExcludeKeyword = '';
    
    // Popular subreddits suggestions
    const popularSubreddits = [
      'entrepreneur', 'startups', 'SaaS', 'smallbusiness', 'marketing',
      'socialmedia', 'content_marketing', 'SEO', 'webdev', 'technology'
    ];
    
    function addSubreddit() {
      if (newSubreddit && !subreddits.includes(newSubreddit)) {
        subreddits = [...subreddits, newSubreddit.replace('r/', '').trim()];
        newSubreddit = '';
      }
    }
    
    function removeSubreddit(sub) {
      subreddits = subreddits.filter(s => s !== sub);
    }
    
    function addKeyword() {
      if (newKeyword && !keywords.includes(newKeyword)) {
        keywords = [...keywords, newKeyword.trim()];
        newKeyword = '';
      }
    }
    
    function removeKeyword(kw) {
      keywords = keywords.filter(k => k !== kw);
    }
    
    function addExcludeKeyword() {
      if (newExcludeKeyword && !excludeKeywords.includes(newExcludeKeyword)) {
        excludeKeywords = [...excludeKeywords, newExcludeKeyword.trim()];
        newExcludeKeyword = '';
      }
    }
    
    function removeExcludeKeyword(kw) {
      excludeKeywords = excludeKeywords.filter(k => k !== kw);
    }
    
    function addSuggestedSubreddit(sub) {
      if (!subreddits.includes(sub)) {
        subreddits = [...subreddits, sub];
      }
    }
    
    async function saveConfig() {
      if (subreddits.length === 0 || keywords.length === 0) {
        alert('Please add at least one subreddit and one keyword');
        return;
      }
      
      saving = true;
      saved = false;
      
      try {
        const response = await fetch('/api/reddit/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subreddits,
            keywords,
            exclude_keywords: excludeKeywords,
            min_relevance: minRelevance
          })
        });
        
        if (response.ok) {
          saved = true;
          dispatch('saved', { subreddits, keywords, excludeKeywords, minRelevance });
          
          // Reset saved message after 3 seconds
          setTimeout(() => { saved = false; }, 3000);
        } else {
          alert('Failed to save configuration');
        }
      } catch (error) {
        console.error('Error saving config:', error);
        alert('Error saving configuration');
      } finally {
        saving = false;
      }
    }
    
    function handleKeyPress(event, action) {
      if (event.key === 'Enter') {
        event.preventDefault();
        action();
      }
    }
  </script>
  
  <div class="max-w-4xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Configure Reddit Monitoring</h1>
      <p class="text-gray-600">
        Set up which subreddits and keywords to monitor for opportunities where {businessName || 'your business'} can add value
      </p>
    </div>
    
    <div class="space-y-6">
      <!-- Business Info (optional display) -->
      {#if businessName && businessDescription}
        <div class="bg-orange-50 rounded-xl p-5 border border-orange-200">
          <h3 class="font-semibold text-gray-900 mb-2">Monitoring for: {businessName}</h3>
          <p class="text-sm text-gray-600">{businessDescription}</p>
        </div>
      {/if}
      
      <!-- Subreddits Section -->
      <div class="bg-white rounded-xl p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Target Subreddits</h2>
        
        <!-- Current Subreddits -->
        <div class="flex flex-wrap gap-2 mb-4">
          {#each subreddits as sub}
            <span class="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm">
              r/{sub}
              <button 
                on:click={() => removeSubreddit(sub)}
                class="text-orange-500 hover:text-orange-700"
              >
                ×
              </button>
            </span>
          {/each}
        </div>
        
        <!-- Add Subreddit -->
        <div class="flex gap-2 mb-4">
          <input
            type="text"
            bind:value={newSubreddit}
            on:keypress={(e) => handleKeyPress(e, addSubreddit)}
            placeholder="e.g., entrepreneur"
            class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          />
          <button
            on:click={addSubreddit}
            class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
          >
            Add
          </button>
        </div>
        
        <!-- Popular Suggestions -->
        <div>
          <p class="text-xs text-gray-500 mb-2">Popular subreddits:</p>
          <div class="flex flex-wrap gap-2">
            {#each popularSubreddits.filter(s => !subreddits.includes(s)).slice(0, 6) as sub}
              <button
                on:click={() => addSuggestedSubreddit(sub)}
                class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs transition-colors"
              >
                + r/{sub}
              </button>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Keywords Section -->
      <div class="bg-white rounded-xl p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Target Keywords</h2>
        <p class="text-sm text-gray-600 mb-4">
          Keywords to look for in posts (discussions containing these terms)
        </p>
        
        <!-- Current Keywords -->
        <div class="flex flex-wrap gap-2 mb-4">
          {#each keywords as kw}
            <span class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm">
              {kw}
              <button 
                on:click={() => removeKeyword(kw)}
                class="text-emerald-500 hover:text-emerald-700"
              >
                ×
              </button>
            </span>
          {/each}
        </div>
        
        <!-- Add Keyword -->
        <div class="flex gap-2">
          <input
            type="text"
            bind:value={newKeyword}
            on:keypress={(e) => handleKeyPress(e, addKeyword)}
            placeholder="e.g., competitor analysis"
            class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          />
          <button
            on:click={addKeyword}
            class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
          >
            Add
          </button>
        </div>
      </div>
      
      <!-- Exclude Keywords Section -->
      <div class="bg-white rounded-xl p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Exclude Keywords (Optional)</h2>
        <p class="text-sm text-gray-600 mb-4">
          Skip posts containing these terms (e.g., spam, promotional content)
        </p>
        
        <!-- Current Exclude Keywords -->
        <div class="flex flex-wrap gap-2 mb-4">
          {#each excludeKeywords as kw}
            <span class="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm">
              {kw}
              <button 
                on:click={() => removeExcludeKeyword(kw)}
                class="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </span>
          {/each}
        </div>
        
        <!-- Add Exclude Keyword -->
        <div class="flex gap-2">
          <input
            type="text"
            bind:value={newExcludeKeyword}
            on:keypress={(e) => handleKeyPress(e, addExcludeKeyword)}
            placeholder="e.g., spam"
            class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          />
          <button
            on:click={addExcludeKeyword}
            class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
          >
            Add
          </button>
        </div>
      </div>
      
      <!-- Relevance Threshold -->
      <div class="bg-white rounded-xl p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Minimum Relevance</h2>
        <p class="text-sm text-gray-600 mb-4">
          Only show opportunities with at least this relevance score
        </p>
        
        <div class="flex items-center gap-4">
          <input
            type="range"
            bind:value={minRelevance}
            min="50"
            max="90"
            step="5"
            class="flex-1"
          />
          <span class="text-2xl font-bold text-orange-600 min-w-[60px]">
            {minRelevance}%
          </span>
        </div>
        
        <div class="mt-2 text-xs text-gray-500">
          {#if minRelevance < 60}
            Lower threshold = more opportunities, but less relevant
          {:else if minRelevance < 75}
            Balanced - good mix of quantity and quality
          {:else}
            Higher threshold = fewer but highly relevant opportunities
          {/if}
        </div>
      </div>
      
      <!-- Save Button -->
      <div class="flex items-center justify-between pt-4">
        <div>
          {#if saved}
            <span class="text-emerald-600 text-sm font-medium">
              ✓ Configuration saved successfully!
            </span>
          {/if}
        </div>
        
        <button
          on:click={saveConfig}
          disabled={saving || subreddits.length === 0 || keywords.length === 0}
          class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if saving}
            Saving...
          {:else}
            Save Configuration
          {/if}
        </button>
      </div>
    </div>
  </div>