<script lang="ts">
    import { page } from '$app/stores';
    import { integrationStore } from '$lib/components/integrations/stores';
    import type { WordPressConfig } from '$lib/components/integrations/stores';
  
    let siteUrl = '';
    let username = '';
    let appPassword = '';
    let showPassword = false;
    let showGuide = true;
  
    $: projectId = $page.params.id;
    $: isLoading = $integrationStore.isLoading;
    $: error = $integrationStore.error;
    $: success = $integrationStore.success;
  
    function validateForm(): boolean {
      if (!siteUrl.trim()) {
        integrationStore.error = 'Site URL is required';
        return false;
      }
      if (!username.trim()) {
        integrationStore.error = 'Username is required';
        return false;
      }
      if (!appPassword.trim()) {
        integrationStore.error = 'App Password is required';
        return false;
      }
      if (!siteUrl.includes('http')) {
        integrationStore.error = 'Site URL must start with http:// or https://';
        return false;
      }
      return true;
    }
  
    async function handleVerifyAndSave() {
      if (!validateForm()) return;
  
      const config: WordPressConfig = {
        site_url: siteUrl.trim(),
        username: username.trim(),
        app_password: appPassword.trim(),
      };
  
      // First verify the connection
      const verified = await integrationStore.verifyWordPressConnection(projectId, config);
      
      if (verified) {
        // Then save if verification passes
        await integrationStore.saveWordPressIntegration(projectId, config);
        // Clear form on success
        siteUrl = '';
        username = '';
        appPassword = '';
        setTimeout(() => integrationStore.clearMessages(), 5000);
      }
    }
  
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter' && !isLoading) {
        handleVerifyAndSave();
      }
    }
  </script>
  
  <div class="space-y-8">
    <div
      class="bg-blue-50 border border-blue-200 rounded-lg p-6"
      class:hidden={!showGuide}
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900">How to Generate a WordPress App Password</h2>
        <button
          on:click={() => (showGuide = !showGuide)}
          class="text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Toggle guide"
        >
          ×
        </button>
      </div>
  
      <ol class="space-y-3 text-sm text-gray-700">
        <li class="flex gap-3">
          <span class="font-semibold text-blue-600 min-w-fit">1.</span>
          <span>Go to your WordPress admin dashboard and navigate to <strong>Users → Your Profile</strong></span>
        </li>
        <li class="flex gap-3">
          <span class="font-semibold text-blue-600 min-w-fit">2.</span>
          <span>Scroll down to find the <strong>Application Passwords</strong> section</span>
        </li>
        <li class="flex gap-3">
          <span class="font-semibold text-blue-600 min-w-fit">3.</span>
          <span>Enter an app name (e.g., "Orion AI") and click <strong>Create Application Password</strong></span>
        </li>
        <li class="flex gap-3">
          <span class="font-semibold text-blue-600 min-w-fit">4.</span>
          <span>Copy the generated password and paste it into the <strong>App Password</strong> field below</span>
        </li>
        <li class="flex gap-3">
          <span class="font-semibold text-blue-600 min-w-fit">5.</span>
          <span>Your site URL is your WordPress domain (e.g., <code class="bg-white px-2 py-1 rounded text-xs">https://yoursite.com</code>)</span>
        </li>
      </ol>
    </div>
  
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-gray-900 mb-6">Connect Your WordPress Site</h2>
  
      {#if error}
        <div class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm flex items-start gap-2">
          <span class="text-lg">⚠️</span>
          <span>{error}</span>
        </div>
      {/if}
  
      {#if success}
        <div class="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm flex items-start gap-2">
          <span class="text-lg">✓</span>
          <span>{success}</span>
        </div>
      {/if}
  
      <form on:submit|preventDefault={handleVerifyAndSave} class="space-y-5">
        <div>
          <label for="siteUrl" class="block text-sm font-medium text-gray-700 mb-2">
            WordPress Site URL
          </label>
          <input
            id="siteUrl"
            type="url"
            placeholder="https://yoursite.com"
            bind:value={siteUrl}
            on:keydown={handleKeyDown}
            disabled={isLoading}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          />
          <p class="text-xs text-gray-500 mt-1">Include the full URL with http:// or https://</p>
        </div>
  
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
            WordPress Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="admin"
            bind:value={username}
            on:keydown={handleKeyDown}
            disabled={isLoading}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          />
          <p class="text-xs text-gray-500 mt-1">Your WordPress login username</p>
        </div>
  
        <div>
          <label for="appPassword" class="block text-sm font-medium text-gray-700 mb-2">
            Application Password
          </label>
          <div class="relative">
            <input
              id="appPassword"
              type='password'
              placeholder="••••••••••••••••••••"
              bind:value={appPassword}
              on:keydown={handleKeyDown}
              disabled={isLoading}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
            <button
              type="button"
              on:click={() => (showPassword = !showPassword)}
              disabled={isLoading}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">Generated from WordPress User Profile</p>
        </div>
  
        <div class="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition-colors"
          >
            {isLoading ? 'Connecting...' : 'Connect & Verify'}
          </button>
          <button
            type="button"
            on:click={() => integrationStore.clearMessages()}
            disabled={isLoading}
            class="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  </div>
  
  <style>
    input:disabled {
      opacity: 0.6;
    }
  </style>