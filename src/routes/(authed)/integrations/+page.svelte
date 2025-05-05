<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { Copy, Key, Plus, Trash, EyeOff, Eye, Check, RefreshCw } from 'lucide-svelte';

    // ✅ Base URL variable — change this when you deploy
    const baseUrl = 'https://api.s-tierproject.online'; // <--- replace with deployed URL


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

  
  <div class="p-6 max-w-5xl mx-auto">
    <div class="flex items-center justify-between mb-6" in:fly={{ y: 20, duration: 500 }}>
      <h1 class="text-3xl font-bold text-zinc-100">API Keys</h1>
    </div>
  
    <div class="mb-8 bg-zinc-800/30 p-5 rounded-xl border border-zinc-700" in:fly={{ y: 20, duration: 500, delay: 100 }}>
      <div class="flex items-center gap-3 mb-4">
        <Key size={24} class="text-amber-400" />
        <h2 class="text-xl font-semibold text-zinc-100">API Keys</h2>
      </div>
      <p class="text-zinc-400 mb-6">
        API keys allow external applications to access your blog posts. Use these keys to integrate your content with your website or other applications.
      </p>
  
      {#if error}
        <div class="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-lg mb-4" in:fly={{ y: 10, duration: 300 }}>
          {error}
        </div>
      {/if}
  
      <!-- New API Key Button -->
      {#if !showNewKeyForm && !createdKey}
        <button 
          on:click={() => showNewKeyForm = true}
          class="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-lg p-3 transition mb-6"
          in:fly={{ y: 10, duration: 300 }}
        >
          <Plus size={18} />
          <span>New API Key</span>
        </button>
      {/if}
  
      <!-- New API Key Form -->
      {#if showNewKeyForm}
        <div class="bg-zinc-800 border border-zinc-700 rounded-lg p-4 mb-6" in:fly={{ y: 10, duration: 300 }}>
          <h3 class="text-lg font-medium text-zinc-200 mb-4">Create New API Key</h3>
          <div class="mb-4">
            <label for="key-name" class="block text-sm font-medium text-zinc-400 mb-2">Key Name</label>
            <input 
              type="text" 
              id="key-name" 
              bind:value={newKeyName}
              placeholder="e.g. My Website" 
              class="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
            />
          </div>
          <div class="flex gap-3">
            <button 
              on:click={createApiKey}
              disabled={!newKeyName.trim() || isCreatingKey}
              class="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white rounded-lg px-4 py-2 transition"
            >
              {#if isCreatingKey}
                <RefreshCw size={18} class="animate-spin" />
                Creating...
              {:else}
                Create
              {/if}
            </button>
            <button 
              on:click={() => showNewKeyForm = false}
              class="flex items-center justify-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-lg px-4 py-2 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      {/if}
  
      <!-- Newly Created Key Display -->
      {#if createdKey}
        <div class="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-6" in:fly={{ y: 10, duration: 300 }}>
          <div class="flex items-center gap-2 mb-2">
            <Key size={20} class="text-amber-400" />
            <h3 class="text-lg font-medium text-amber-200">New API Key Created</h3>
          </div>
          <p class="text-amber-200/70 mb-3 text-sm">
            This key will only be displayed once. Copy it now and store it securely.
          </p>
          <div class="flex items-center gap-2 bg-zinc-900/50 p-3 rounded-lg mb-4 font-mono text-sm">
            <code class="text-amber-300 flex-1 break-all">{createdKey.key}</code>
            <button 
              on:click={() => copyToClipboard(createdKey.key, createdKey.id)}
              class="p-2 hover:bg-zinc-800 rounded-lg transition"
              title="Copy to clipboard"
            >
              {#if copiedStates[createdKey.id]}
                <Check size={18} class="text-green-400" />
              {:else}
                <Copy size={18} class="text-zinc-400" />
              {/if}
            </button>
          </div>
          <button 
            on:click={() => createdKey = null}
            class="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg px-4 py-2 transition"
          >
            Done
          </button>
        </div>
      {/if}
  
      <!-- API Keys List -->
      <div>
        {#if isLoading}
          <div class="flex justify-center py-8">
            <RefreshCw size={32} class="animate-spin text-zinc-500" />
          </div>
        {:else if apiKeys.length === 0}
          <div class="text-center py-8 text-zinc-500">
            <p>No API keys found. Generate an API key to access your blog posts from external applications.</p>
          </div>
        {:else}
          <div class="mb-4 flex justify-end">
            <button 
              on:click={refreshApiKeys}
              class="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg p-2 transition text-sm"
              title="Refresh API keys"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>
          
          <div class="border border-zinc-700 rounded-lg overflow-hidden">
            <table class="w-full">
              <thead>
                <tr class="bg-zinc-800">
                  <th class="text-left p-4 text-zinc-400 font-medium">Name</th>
                  <th class="text-left p-4 text-zinc-400 font-medium">Key</th>
                  <th class="text-left p-4 text-zinc-400 font-medium">Created</th>
                  <th class="text-left p-4 text-zinc-400 font-medium">Last Used</th>
                  <th class="text-right p-4 text-zinc-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-700">
                {#each apiKeys as apiKey (apiKey.id)}
                  <tr class="bg-zinc-800/20 hover:bg-zinc-800/40 transition">
                    <td class="p-4">
                      <div class="font-medium text-zinc-200">{apiKey.name}</div>
                    </td>
                    <td class="p-4">
                      <div class="flex items-center gap-2">
                        <code class="font-mono text-sm text-zinc-300">
                          {visibleKeys[apiKey.id] ? apiKey.masked_key : '••••••••••••••••'}
                        </code>
                        <button 
                          on:click={() => toggleKeyVisibility(apiKey.id)}
                          class="p-1 hover:bg-zinc-700 rounded transition"
                          title={visibleKeys[apiKey.id] ? "Hide key" : "Show key"}
                        >
                          {#if visibleKeys[apiKey.id]}
                            <EyeOff size={16} class="text-zinc-400" />
                          {:else}
                            <Eye size={16} class="text-zinc-400" />
                          {/if}
                        </button>
                      </div>
                    </td>
                    <td class="p-4 text-zinc-400 text-sm">
                      {formatDate(apiKey.created_at)}
                    </td>
                    <td class="p-4 text-zinc-400 text-sm">
                      {formatDate(apiKey.last_used)}
                    </td>
                    <td class="p-4 text-right">
                      <button 
                        on:click={() => deleteApiKey(apiKey.id)}
                        class="p-2 text-red-400 hover:bg-red-900/30 rounded transition"
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
        {/if}
      </div>
    </div>
  
    <div class="bg-zinc-800/30 p-5 rounded-xl border border-zinc-700" in:fly={{ y: 20, duration: 500, delay: 200 }}>
      <h2 class="text-xl font-semibold text-zinc-100 mb-4">API Documentation</h2>
      
      <div class="mb-6">
        <h3 class="text-lg font-medium text-zinc-300 mb-2">Authentication</h3>
        <p class="text-zinc-400 mb-3">
          Include your API key in the request headers:
        </p>
        <div class="bg-zinc-900 p-4 rounded-lg mb-4">
          <code class="text-amber-300 font-mono text-sm">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>
      </div>
      
      <div class="mb-6">
        <h3 class="text-lg font-medium text-zinc-300 mb-2">Endpoints</h3>
        
        <div class="mb-4">
          <div class="flex items-center gap-2 text-zinc-300 mb-2">
            <span class="bg-green-800 text-green-200 px-2 py-1 rounded text-xs font-medium">GET</span>
            <code class="font-mono">/api/external/posts/</code>
          </div>
          <p class="text-zinc-400 text-sm pl-14">
            Returns a list of all your published blog posts
          </p>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-medium text-zinc-300 mb-2">Security Tips</h3>
        <ul class="list-disc pl-5 text-zinc-400 space-y-2">
          <li>Store your API keys securely and never expose them in client-side code</li>
          <li>Rotate your API keys periodically for enhanced security</li>
          <li>Use environment variables to store your API keys in your applications</li>
        </ul>
      </div>
    </div>
  </div>