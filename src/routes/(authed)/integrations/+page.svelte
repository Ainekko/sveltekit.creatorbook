<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Copy, Key, Plus, Trash, EyeOff, Eye, Check, RefreshCw } from 'lucide-svelte';
  import {API_BASE_URL} from '$lib/config'

  const baseUrl = API_BASE_URL;
  const token = localStorage.getItem('token')

  type ApiKey = {
      id: string;
      key: string;
      masked_key: string;
      name: string;
      created_at: string;
      last_used: string | null;
      is_active: boolean;
  };

  let apiKeys: ApiKey[] = [];
  let isLoading = true;
  let error: string | null = null;
  let showNewKeyForm = false;
  let newKeyName = '';
  let createdKey: { key: string; id: string } | null = null;

  let visibleKeys: Record<string, boolean> = {};
  const toggleKeyVisibility = (keyId: string) => {
      visibleKeys[keyId] = !visibleKeys[keyId];
      visibleKeys = { ...visibleKeys };
  };

  const copyToClipboard = async (text: string, keyId: string) => {
      try {
          await navigator.clipboard.writeText(text);
          copiedStates[keyId] = true;
          setTimeout(() => {
              copiedStates[keyId] = false;
              copiedStates = { ...copiedStates };
          }, 2000);
      } catch (err) {
          console.error('Failed to copy text: ', err);
      }
  };

  let copiedStates: Record<string, boolean> = {};
  let isCreatingKey = false;
  let deletingKeys: Record<string, boolean> = {};

  const createApiKey = async () => {
      if (!newKeyName.trim()) return;

      try {
          isCreatingKey = true;

          const response = await fetch(`${baseUrl}/api/api_keys/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${token}`
              },
              body: JSON.stringify({ name: newKeyName })
          });

          if (!response.ok) {
              throw new Error('Failed to create API key');
          }

          const newKey = await response.json();
          createdKey = { key: newKey.key, id: newKey.id };
          await loadApiKeys();

          newKeyName = '';
          showNewKeyForm = false;

      } catch (err) {
          console.error('Failed to create API key: ', err);
          error = 'Failed to create API key. Please try again.';
      } finally {
          isCreatingKey = false;
      }
  };

  const deleteApiKey = async (keyId: string) => {
      try {
          deletingKeys[keyId] = true;
          deletingKeys = { ...deletingKeys };

          const response = await fetch(`${baseUrl}/api/api_keys/${keyId}/`, {
              method: 'DELETE',
              headers: {
                  'Authorization': `Token ${token}`
              },
          });

          if (!response.ok) {
              throw new Error('Failed to delete API key');
          }

          await loadApiKeys();

      } catch (err) {
          console.error('Failed to delete API key: ', err);
          error = 'Failed to delete API key. Please try again.';
      } finally {
          delete deletingKeys[keyId];
          deletingKeys = { ...deletingKeys };
      }
  };

  const formatDate = (dateString: string | null) => {
      if (!dateString) return 'Never';
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const loadApiKeys = async () => {
      try {
          isLoading = true;
          error = null;

          const response = await fetch(`${baseUrl}/api/api_keys/`,{
              headers: {
                  'Authorization': `Token ${token}`
              },
          });

          if (!response.ok) {
              throw new Error('Failed to load API keys');
          }

          apiKeys = await response.json();

      } catch (err) {
          console.error('Failed to load API keys: ', err);
          error = 'Failed to load API keys. Please refresh the page.';
      } finally {
          isLoading = false;
      }
  };

  const refreshApiKeys = () => {
      createdKey = null;
      loadApiKeys();
  };

  onMount(() => {
      loadApiKeys();
  });
</script>

<style>
  .accent-dot {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 12px;
      height: 12px;
      background: #fb923c;
      border-radius: 50%;
      animation: gentle-float 6s ease-in-out infinite;
  }

  @keyframes gentle-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
  }

  .card-hover {
      transition: all 0.3s ease;
  }

  .card-hover:hover {
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
  }
</style>

<div class="min-h-screen bg-white">
<!-- Header -->
<div class="max-w-5xl mx-auto px-6 pt-16 pb-8">
  <div class="text-center mb-12" in:fly={{ y: 20, duration: 500 }}>
    <div class="inline-block relative mb-4">
      <h1 class="text-4xl font-semibold text-zinc-900">API Integration</h1>
      <div class="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full" style="animation: gentle-float 6s ease-in-out infinite;"></div>
    </div>
    <p class="text-lg text-zinc-500 max-w-2xl mx-auto">
      Connect your applications with secure API keys. Simple, powerful, and built for developers.
    </p>
  </div>
</div>

<!-- Main Content -->
<div class="max-w-5xl mx-auto px-6 pb-16">
  
  <!-- API Keys Section -->
  <div class="mb-12 bg-white border border-zinc-200 rounded-2xl p-8 relative card-hover" in:fly={{ y: 20, duration: 500, delay: 100 }}>
    <div class="absolute top-8 right-8">
      <div class="w-3 h-3 bg-blue-400 rounded-square" style="animation: gentle-float 6s ease-in-out infinite; animation-delay: -2s;"></div>
    </div>
    
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-orange-50 rounded-lg">
        <Key size={24} class="text-orange-500" />
      </div>
      <div>
        <h2 class="text-2xl font-semibold text-zinc-900">Your API Keys</h2>
        <p class="text-sm text-zinc-500">Manage access to your blog content</p>
      </div>
    </div>

    {#if error}
      <div class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6" in:fly={{ y: 10, duration: 300 }}>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>{error}</span>
        </div>
      </div>
    {/if}

    <!-- New API Key Button -->
    {#if !showNewKeyForm && !createdKey}
      <button 
        on:click={() => showNewKeyForm = true}
        class="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg px-4 py-3 transition-all duration-200 mb-8"
        in:fly={{ y: 10, duration: 300 }}
      >
        <Plus size={18} />
        <span class="font-medium">Create New Key</span>
      </button>
    {/if}

    <!-- New API Key Form -->
    {#if showNewKeyForm}
      <div class="bg-zinc-50 border border-zinc-200 rounded-xl p-6 mb-8" in:fly={{ y: 10, duration: 300 }}>
        <h3 class="text-lg font-semibold text-zinc-900 mb-4">Create New API Key</h3>
        <div class="mb-4">
          <label for="key-name" class="block text-sm font-medium text-zinc-700 mb-2">Key Name</label>
          <input 
            type="text" 
            id="key-name" 
            bind:value={newKeyName}
            placeholder="e.g. Production Website" 
            class="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div class="flex gap-3">
          <button 
            on:click={createApiKey}
            disabled={!newKeyName.trim() || isCreatingKey}
            class="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400 text-white rounded-lg px-6 py-3 font-medium transition-all"
          >
            {#if isCreatingKey}
              <RefreshCw size={18} class="animate-spin" />
              Creating...
            {:else}
              Create Key
            {/if}
          </button>
          <button 
            on:click={() => showNewKeyForm = false}
            class="flex items-center justify-center gap-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-lg px-6 py-3 font-medium transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    {/if}

    <!-- Newly Created Key Display -->
    {#if createdKey}
      <div class="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-8" in:fly={{ y: 10, duration: 300 }}>
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-orange-100 rounded-lg">
            <Key size={20} class="text-orange-600" />
          </div>
          <h3 class="text-lg font-semibold text-orange-900">Key Created Successfully</h3>
        </div>
        <p class="text-orange-700 mb-4 text-sm">
          This key will only be displayed once. Copy it now and store it securely.
        </p>
        <div class="flex items-center gap-2 bg-white border border-orange-200 p-4 rounded-lg mb-4">
          <code class="text-orange-600 font-mono text-sm flex-1 break-all">{createdKey.key}</code>
          <button 
            on:click={() => copyToClipboard(createdKey.key, createdKey.id)}
            class="p-2 hover:bg-orange-50 rounded-lg transition-all"
            title="Copy to clipboard"
          >
            {#if copiedStates[createdKey.id]}
              <Check size={18} class="text-green-600" />
            {:else}
              <Copy size={18} class="text-zinc-500" />
            {/if}
          </button>
        </div>
        <button 
          on:click={() => createdKey = null}
          class="bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-lg px-6 py-2 font-medium transition-all"
        >
          Done
        </button>
      </div>
    {/if}

    <!-- API Keys List -->
    <div>
      {#if isLoading}
        <div class="flex justify-center py-12">
          <RefreshCw size={32} class="animate-spin text-zinc-400" />
        </div>
      {:else if apiKeys.length === 0}
        <div class="text-center py-16 bg-zinc-50 rounded-xl">
          <div class="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Key size={28} class="text-zinc-400" />
          </div>
          <p class="text-zinc-500 text-lg">No API keys yet</p>
          <p class="text-zinc-400 text-sm mt-2">Create your first key to get started</p>
        </div>
      {:else}
        <div class="mb-4 flex justify-between items-center">
          <p class="text-sm text-zinc-500">{apiKeys.length} {apiKeys.length === 1 ? 'key' : 'keys'} active</p>
          <button 
            on:click={refreshApiKeys}
            class="flex items-center gap-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 rounded-lg px-3 py-2 transition-all text-sm font-medium"
            title="Refresh API keys"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
        
        <div class="border border-zinc-200 rounded-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-zinc-50 border-b border-zinc-200">
                  <th class="text-left p-4 text-zinc-600 font-semibold text-sm">Name</th>
                  <th class="text-left p-4 text-zinc-600 font-semibold text-sm">Key</th>
                  <th class="text-left p-4 text-zinc-600 font-semibold text-sm">Created</th>
                  <th class="text-left p-4 text-zinc-600 font-semibold text-sm">Last Used</th>
                  <th class="text-right p-4 text-zinc-600 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-200">
                {#each apiKeys as apiKey (apiKey.id)}
                  <tr class="bg-white hover:bg-zinc-50 transition-colors">
                    <td class="p-4">
                      <div class="font-medium text-zinc-900">{apiKey.name}</div>
                    </td>
                    <td class="p-4">
                      <div class="flex items-center gap-2">
                        <code class="font-mono text-sm text-zinc-600 bg-zinc-50 px-2 py-1 rounded">
                          {visibleKeys[apiKey.id] ? apiKey.masked_key : '••••••••••••••••'}
                        </code>
                        <button 
                          on:click={() => toggleKeyVisibility(apiKey.id)}
                          class="p-1.5 hover:bg-zinc-100 rounded-lg transition-all"
                          title={visibleKeys[apiKey.id] ? "Hide key" : "Show key"}
                        >
                          {#if visibleKeys[apiKey.id]}
                            <EyeOff size={16} class="text-zinc-500" />
                          {:else}
                            <Eye size={16} class="text-zinc-500" />
                          {/if}
                        </button>
                      </div>
                    </td>
                    <td class="p-4 text-zinc-600 text-sm">
                      {formatDate(apiKey.created_at)}
                    </td>
                    <td class="p-4 text-zinc-600 text-sm">
                      {formatDate(apiKey.last_used)}
                    </td>
                    <td class="p-4 text-right">
                      <button 
                        on:click={() => deleteApiKey(apiKey.id)}
                        class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete API key"
                        disabled={deletingKeys[apiKey.id]}
                      >
                        {#if deletingKeys[apiKey.id]}
                          <RefreshCw size={18} class="animate-spin" />
                        {:else}
                          <Trash size={18} />
                        {/if}
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- Documentation Section -->
  <div class="bg-white border border-zinc-200 rounded-2xl p-8 relative card-hover" in:fly={{ y: 20, duration: 500, delay: 200 }}>
    <div class="absolute top-8 right-8">
      <div class="w-3 h-3 bg-orange-400 rounded-full" style="animation: gentle-float 6s ease-in-out infinite; animation-delay: -4s;"></div>
    </div>
    
    <h2 class="text-2xl font-semibold text-zinc-900 mb-6">Quick Start Guide</h2>
    
    <div class="space-y-8">
      <!-- Authentication -->
      <div>
        <h3 class="text-lg font-semibold text-zinc-900 mb-3 flex items-center gap-2">
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          Authentication
        </h3>
        <p class="text-zinc-600 mb-3">
          Include your API key in the request headers. All endpoints require a project_id query parameter specific to your project.
        </p>
        <div class="bg-zinc-900 p-4 rounded-xl">
          <code class="text-orange-300 font-mono text-sm">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>
      </div>
      
      <!-- Endpoints -->
      <div>
        <h3 class="text-lg font-semibold text-zinc-900 mb-3 flex items-center gap-2">
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          Available Endpoints
        </h3>
        
        <div class="space-y-4">
          <div class="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <span class="bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-semibold uppercase">GET</span>
              <div class="flex-1">
                <code class="font-mono text-sm text-zinc-900">/orion/blog/posts/list_posts/</code>
                <p class="text-zinc-600 text-sm mt-1">
                  Paginated list of published posts. Query params: page (default: 1), limit (default: 10, max: 50), project_id (required), domain, keyword.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <span class="bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-semibold uppercase">GET</span>
              <div class="flex-1">
                <code class="font-mono text-sm text-zinc-900">/orion/blog/posts/{id}/</code>
                <p class="text-zinc-600 text-sm mt-1">
                  Retrieve a single published blog post with SEO metadata. Query params: project_id (required).
                </p>
              </div>
            </div>
          </div>

          <div class="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <span class="bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-semibold uppercase">GET</span>
              <div class="flex-1">
                <code class="font-mono text-sm text-zinc-900">/orion/blog/posts/recent/</code>
                <p class="text-zinc-600 text-sm mt-1">
                  Get recent published posts (e.g., for homepage/sidebar). Query params: limit (default: 5, max: 20), project_id (required).
                </p>
              </div>
            </div>
          </div>

          <div class="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <span class="bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-semibold uppercase">GET</span>
              <div class="flex-1">
                <code class="font-mono text-sm text-zinc-900">/orion/blog/posts/sitemap/</code>
                <p class="text-zinc-600 text-sm mt-1">
                  Generate sitemap data for all published posts (minimal data for XML generation). Query params: project_id (required).
                </p>
              </div>
            </div>
          </div>

          <div class="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <span class="bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-semibold uppercase">GET</span>
              <div class="flex-1">
                <code class="font-mono text-sm text-zinc-900">/orion/blog/posts/rss/</code>
                <p class="text-zinc-600 text-sm mt-1">
                  RSS feed data for published posts (last 20 posts). Query params: project_id (required).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Security Tips -->
      <div>
        <h3 class="text-lg font-semibold text-zinc-900 mb-3 flex items-center gap-2">
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          Security Best Practices
        </h3>
        <div class="space-y-3">
          {#each [
            'Store API keys securely and never expose them in client-side code',
            'Rotate your API keys periodically for enhanced security',
            'Use environment variables to store keys in your applications',
            'Monitor key usage and revoke any compromised keys immediately'
          ] as tip}
            <div class="flex items-start gap-3 text-zinc-600">
              <svg class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-sm">{tip}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Stats Footer -->
  <div class="grid grid-cols-3 gap-6 mt-12">
    {#each [
      { value: '99.9%', label: 'Uptime' },
      { value: '<100ms', label: 'Response time' },
      { value: '256-bit', label: 'Encryption' }
    ] as stat}
      <div class="text-center bg-white border border-zinc-200 rounded-xl p-6 relative card-hover">
        <div class="accent-dot"></div>
        <div class="text-2xl font-semibold text-zinc-900">{stat.value}</div>
        <div class="text-sm text-zinc-500 mt-1">{stat.label}</div>
      </div>
    {/each}
  </div>
</div>
</div>