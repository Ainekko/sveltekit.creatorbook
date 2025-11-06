<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import WpIntegration from '$lib/components/integrations/WpIntegration.svelte';

  export let data; // From +page.server.js
  let integrations = [];
  let isLoading = false;
  let error = '';
  let success = $page.url.searchParams.get('success');

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
      <h1 class="text-3xl md:text-4xl font-semibold text-gray-900">WordPress Integration</h1>
      <p class="text-base md:text-lg text-gray-500 mt-3 max-w-2xl mx-auto">
        Connect your WordPress site to enable automated content publishing.
      </p>
    </div>

    {#if success}
      <div class="mb-8 p-4 bg-green-100 text-green-700 rounded-lg text-center" transition:fade>
        Successfully connected WordPress!
      </div>
    {/if}
    {#if error}
      <div class="mb-8 p-4 bg-red-100 text-red-700 rounded-lg text-center" transition:fade>
        {error}
      </div>
    {/if}

    <div class="mb-8">
      <WpIntegration />
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