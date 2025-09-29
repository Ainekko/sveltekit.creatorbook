<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { fade } from 'svelte/transition';
  
    export let data; // From +page.server.js
    let integrations = [];
    let isLoading = false;
    let error = '';
    let success = $page.url.searchParams.get('success');
  
    const platforms = [
      {
        id: 'wordpress',
        name: 'WordPress',
        icon: `<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.09 4.23c1.73.01 2.94.96 2.94 2.73 0 .93-.44 1.73-1.06 2.24l-1.43 2.02c-.24.34-.5.68-.5 1.14 0 .47.38.85.85.85h.01c.47 0 .85-.38.85-.85 0-.3-.15-.56-.38-.74l1.13-1.6c.94-.94 1.5-2.2 1.5-3.52 0-2.76-2.24-5-5-5h-.01c-2.76 0-5 2.24-5 5 0 .47.38.85.85.85h.01c.47 0 .85-.38.85-.85 0-1.38 1.12-2.5 2.5-2.5h.01c1.38 0 2.5 1.12 2.5 2.5zm-3.09 11.52c-1.73 0-3.14-1.41-3.14-3.14 0-.47-.38-.85-.85-.85h-.01c-.47 0-.85.38-.85.85 0 2.76 2.24 5 5 5h.01c2.76 0 5-2.24 5-5 0-.47-.38-.85-.85-.85h-.01c-.47 0-.85.38-.85.85 0 1.73-1.41 3.14-3.14 3.14zm0-9.43c-1.38 0-2.5-1.12-2.5-2.5h-.01c0-.47-.38-.85-.85-.85h-.01c-.47 0-.85.38-.85.85 0 2.76 2.24 5 5 5h.01c2.76 0 5-2.24 5-5 0-.47-.38-.85-.85-.85h-.01c-.47 0-.85.38-.85.85h-.01c0 1.38-1.12 2.5-2.5 2.5zm0 2.5c-.47 0-.85.38-.85.85v.01c0 .47.38.85.85.85h.01c.47 0 .85-.38.85-.85v-.01c0-.47-.38-.85-.85-.85h-.01z"/></svg>`,
        gradient: 'from-blue-500 to-blue-600',
        description: 'Connect your WordPress site for SEO and content tasks.'
      },
      {
        id: 'twitter',
        name: 'Twitter/X',
        icon: `<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
        gradient: 'from-sky-500 to-blue-500',
        description: 'Link Twitter/X for automated tweets and growth.'
      },
      {
        id: 'reddit',
        name: 'Reddit',
        icon: `<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 00.029.463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/></svg>`,
        gradient: 'from-orange-500 to-red-500',
        description: 'Integrate Reddit for community building and engagement.'
      }
    ];
  
    async function connectIntegration(type) {
      if (isLoading) return;
      isLoading = true;
      error = '';
  
      try {
        const response = await fetch('/api/integrations/oauth/start/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ project_id: $page.params.id, type })
        });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.detail || 'Failed to start OAuth');
        }
        const { redirect_url } = await response.json();
        window.location.href = redirect_url; // Full redirect for OAuth
      } catch (err) {
        error = err.message || 'Failed to connect integration';
        isLoading = false;
      }
    }
  
    async function disconnectIntegration(integrationId) {
      if (isLoading) return;
      isLoading = true;
      error = '';
  
      try {
        const response = await fetch(`/api/integrations/${integrationId}/disconnect`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.detail || 'Failed to disconnect');
        }
        integrations = integrations.filter(i => i.id !== integrationId);
      } catch (err) {
        error = err.message || 'Failed to disconnect integration';
      } finally {
        isLoading = false;
      }
    }
  
    function handleKeyPress(event, action, param) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        action(param);
      }
    }
  
    onMount(async () => {
      integrations = data.integrations || [];
      if (success) {
        setTimeout(() => (success = ''), 5000); // Clear success message after 5s
      }
    });
  </script>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
    .notion-card {
      background: white;
      border: 1px solid #e5e7eb;
      transition: all 0.2s ease;
    }
    .notion-card:hover {
      border-color: #d1d5db;
      box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
    }
  </style>
  
  <section class="min-h-screen bg-white font-[Poppins] text-gray-900 py-16 px-4 sm:px-6 lg:px-8" transition:fade>
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-semibold text-gray-900">Connect Integrations</h1>
        <p class="text-base md:text-lg text-gray-500 mt-3 max-w-2xl mx-auto">
          Connect your platforms to enable AI agents for your project.
        </p>
      </div>
  
      {#if success}
        <div class="mb-8 p-4 bg-green-100 text-green-700 rounded-lg text-center" transition:fade>
          Successfully connected {success.charAt(0).toUpperCase() + success.slice(1)}!
        </div>
      {/if}
      {#if error}
        <div class="mb-8 p-4 bg-red-100 text-red-700 rounded-lg text-center" transition:fade>
          {error}
        </div>
      {/if}
  
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each platforms as platform}
          {@const integration = integrations.find(i => i.type === platform.id)}
          <div class="notion-card p-6 rounded-lg border border-gray-200 bg-white">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-r {platform.gradient} rounded-lg flex items-center justify-center">
                {@html platform.icon}
              </div>
              <h3 class="text-lg font-medium text-gray-900">{platform.name}</h3>
            </div>
            <p class="text-sm text-gray-500 mb-4">{platform.description}</p>
            {#if integration?.is_active}
              <button
                on:click={() => disconnectIntegration(integration.id)}
                on:keydown={(e) => handleKeyPress(e, disconnectIntegration, integration.id)}
                disabled={isLoading}
                aria-label={`Disconnect ${platform.name} integration`}
                class="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-all"
              >
                Disconnect
              </button>
            {:else}
              <button
                on:click={() => connectIntegration(platform.id)}
                on:keydown={(e) => handleKeyPress(e, connectIntegration, platform.id)}
                disabled={isLoading}
                aria-label={`Connect ${platform.name} integration`}
                class="w-full bg-gradient-to-r {platform.gradient} disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-all"
              >
                Connect
              </button>
            {/if}
          </div>
        {/each}
      </div>
  
      <div class="text-center mt-10">
        <button
          on:click={() => goto(`/projects/${$page.params.id}`)}
          on:keydown={(e) => handleKeyPress(e, () => goto(`/projects/${$page.params.id}`))}
          aria-label="Finish integration setup and go to project dashboard"
          class="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all"
        >
          Finish Setup
        </button>
      </div>
    </div>
  </section>