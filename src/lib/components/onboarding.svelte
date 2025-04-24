<script>
    import { onMount } from 'svelte';
    
    let platforms = [
      { name: 'Reddit', enabled: false, icon: 'reddit', color: 'text-red-500' },
      { name: 'LinkedIn', enabled: false, icon: 'linkedin', color: 'text-blue-600' },
      { name: 'Twitter', enabled: false, icon: 'twitter', color: 'text-blue-400' },
      { name: 'WordPress', enabled: false, icon: 'wordpress', color: 'text-blue-800' }
    ];
    
    let apiCredentials = {
      reddit: { clientId: '', clientSecret: '', refreshToken: '' },
      linkedin: { clientId: '', clientSecret: '', accessToken: '' },
      twitter: { apiKey: '', apiSecret: '', accessToken: '', accessSecret: '' },
      wordpress: { url: '', username: '', password: '' }
    };
    
    let currentStep = 1;
    let totalSteps = 3;
    let loading = false;
    
    const nextStep = () => {
      if (currentStep < totalSteps) {
        currentStep++;
      }
    };
    
    const prevStep = () => {
      if (currentStep > 1) {
        currentStep--;
      }
    };
    
    const handleSubmit = () => {
      loading = true;
      // Simulate API call
      setTimeout(() => {
        loading = false;
        currentStep = 4; // Success step
      }, 1500);
    };
  </script>
  
  <div class="w-full max-w-3xl mx-auto rounded-3xl border border-zinc-200 bg-white overflow-hidden">
    <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
      <h2 class="text-2xl font-semibold text-white text-center">Set Up Once & Forget About It</h2>
      <p class="text-white/80 text-center mt-2">Connect your accounts and let our AI do the rest</p>
      
      <!-- Progress bar -->
      <div class="mt-6 flex items-center w-full">
        {#each Array(totalSteps) as _, i}
          <div class="flex-1 relative">
            <div class="h-2 rounded-full {i < currentStep ? 'bg-white' : 'bg-white/30'}"></div>
            {#if i < totalSteps - 1}
              <div class="absolute top-0 right-0 w-4 h-2 bg-gradient-to-r {i < currentStep - 1 ? 'from-white to-white' : 'from-white/30 to-white/30'}"></div>
            {/if}
          </div>
        {/each}
      </div>
      <div class="flex justify-between text-xs text-white/70 mt-1 px-1">
        <span>Select Platforms</span>
        <span>API Credentials</span>
        <span>Preferences</span>
      </div>
    </div>
    
    <div class="p-6">
      {#if currentStep === 1}
        <!-- Step 1: Platform Selection -->
        <h3 class="font-medium text-xl text-zinc-950 mb-4">1. Select your platforms</h3>
        <p class="text-sm text-zinc-500 mb-6">Choose the platforms where you want to publish content</p>
        
        <div class="grid grid-cols-2 gap-4">
          {#each platforms as platform}
            <button 
              class="p-4 rounded-xl border border-zinc-200 flex items-center justify-between cursor-pointer hover:border-zinc-300 transition-all duration-200"
              on:click={() => platform.enabled = !platform.enabled}
            >
              <div class="flex items-center">
                <div class="p-2 bg-zinc-100 rounded-full mr-3">
                  {#if platform.icon === 'reddit'}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {platform.color}" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                      <path d="M15 10.5C15 12.433 13.433 14 11.5 14S8 12.433 8 10.5 9.567 7 11.5 7 15 8.567 15 10.5z" fill="white"/>
                    </svg>
                  {:else if platform.icon === 'linkedin'}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {platform.color}" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H6.5v-7H9v7zm-1.25-8a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM18 17h-2.5v-4c0-1.5-1-2-1.5-2s-1.5.5-1.5 2v4h-2.5v-7h2.5v1.5c.5-.5 1.5-1.5 2.5-1.5s2.5 1 2.5 3v4z"/>
                    </svg>
                  {:else if platform.icon === 'twitter'}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {platform.color}" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {platform.color}" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 19.5c-5.244 0-9.5-4.256-9.5-9.5S6.756 2.5 12 2.5s9.5 4.256 9.5 9.5-4.256 9.5-9.5 9.5z"/>
                      <path d="M12.5 7v1h-1V7h1zm0 2v8h-1V9h1z"/>
                    </svg>
                  {/if}
                </div>
                <span class="font-medium text-zinc-900">{platform.name}</span>
              </div>
              <div class="relative">
                <div class="w-10 h-6 rounded-full {platform.enabled ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-zinc-200'} transition-all duration-300"></div>
                <div class="absolute top-1 {platform.enabled ? 'left-5' : 'left-1'} w-4 h-4 bg-white rounded-full transition-all duration-300"></div>
              </div>
            </button>
          {/each}
        </div>
      {:else if currentStep === 2}
        <!-- Step 2: API Credentials -->
        <h3 class="font-medium text-xl text-zinc-950 mb-4">2. Add your API credentials</h3>
        <p class="text-sm text-zinc-500 mb-6">Provide the necessary API keys for each selected platform</p>
        
        <div class="space-y-6">
            {#each platforms as platform, i}
              {#if platform.enabled}
                <div class="p-5 rounded-xl border border-zinc-200">
                  <div class="flex items-center mb-4">
                    <div class="p-2 bg-zinc-100 rounded-full mr-3">
                      {#if platform.icon === 'reddit'}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {platform.color}" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                          <path d="M15 10.5C15 12.433 13.433 14 11.5 14S8 12.433 8 10.5 9.567 7 11.5 7 15 8.567 15 10.5z" fill="white"/>
                        </svg>
                      {:else if platform.icon === 'linkedin'}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {platform.color}" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H6.5v-7H9v7zm-1.25-8a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM18 17h-2.5v-4c0-1.5-1-2-1.5-2s-1.5.5-1.5 2v4h-2.5v-7h2.5v1.5c.5-.5 1.5-1.5 2.5-1.5s2.5 1 2.5 3v4z"/>
                        </svg>
                      {:else if platform.icon === 'twitter'}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {platform.color}" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                        </svg>
                      {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {platform.color}" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 19.5c-5.244 0-9.5-4.256-9.5-9.5S6.756 2.5 12 2.5s9.5 4.256 9.5 9.5-4.256 9.5-9.5 9.5z"/>
                          <path d="M12.5 7v1h-1V7h1zm0 2v8h-1V9h1z"/>
                        </svg>
                      {/if}
                    </div>
                    <span class="font-medium text-zinc-900">{platform.name}</span>
                  </div>
                  
                  <!-- Platform specific inputs -->
                  {#if platform.name === 'Reddit'}
                    <div class="space-y-3">
                      <div>
                        <label for="reddit-clientID" class="block text-sm font-medium text-zinc-700 mb-1">Client ID</label>
                        <input id="reddit-clientID" bind:value={apiCredentials.reddit.clientId} type="text" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your Reddit Client ID" />
                      </div>
                      <div>
                        <label for="reddit-clientSecret" class="block text-sm font-medium text-zinc-700 mb-1">Client Secret</label>
                        <input id="reddit-clientSecret" bind:value={apiCredentials.reddit.clientSecret} type="password" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your Reddit Client Secret" />
                      </div>
                      <div>
                        <label for="reddit-refreshToken" class="block text-sm font-medium text-zinc-700 mb-1">Refresh Token</label>
                        <input id="reddit-refreshToken" bind:value={apiCredentials.reddit.refreshToken} type="password" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your Reddit Refresh Token" />
                      </div>
                    </div>
                  {:else if platform.name === 'LinkedIn'}
                    <div class="space-y-3">
                      <div>
                        <label for="linkedin-clientID" class="block text-sm font-medium text-zinc-700 mb-1">Client ID</label>
                        <input id="linkedin-clientID" bind:value={apiCredentials.linkedin.clientId} type="text" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your LinkedIn Client ID" />
                      </div>
                      <div>
                        <label for="linkedin-clientSecret" class="block text-sm font-medium text-zinc-700 mb-1">Client Secret</label>
                        <input id="linkedin-clientSecret" bind:value={apiCredentials.linkedin.clientSecret} type="password" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your LinkedIn Client Secret" />
                      </div>
                      <div>
                        <label for="linkedin-accessToken" class="block text-sm font-medium text-zinc-700 mb-1">Access Token</label>
                        <input id="linkedin-accessToken" bind:value={apiCredentials.linkedin.accessToken} type="password" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your LinkedIn Access Token" />
                      </div>
                    </div>
                  {:else if platform.name === 'Twitter'}
                    <div class="space-y-3">
                      <div>
                        <label for="twitter-apiKey" class="block text-sm font-medium text-zinc-700 mb-1">API Key</label>
                        <input id="twitter-apiKey" bind:value={apiCredentials.twitter.apiKey} type="text" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your Twitter API Key" />
                      </div>
                      <div>
                        <label for="twitter-apiSecret" class="block text-sm font-medium text-zinc-700 mb-1">API Secret</label>
                        <input id="twitter-apiSecret" bind:value={apiCredentials.twitter.apiSecret} type="password" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your Twitter API Secret" />
                      </div>
                      <div>
                        <label for="twitter-accessToken" class="block text-sm font-medium text-zinc-700 mb-1">Access Token</label>
                        <input id="twitter-accessToken" bind:value={apiCredentials.twitter.accessToken} type="password" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your Twitter Access Token" />
                      </div>
                      <div>
                        <label for="twitter-accessSecret" class="block text-sm font-medium text-zinc-700 mb-1">Access Token Secret</label>
                        <input id="twitter-accessSecret" bind:value={apiCredentials.twitter.accessSecret} type="password" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your Twitter Access Token Secret" />
                      </div>
                    </div>
                  {:else}
                    <div class="space-y-3">
                      <div>
                        <label for="wordpress-url" class="block text-sm font-medium text-zinc-700 mb-1">WordPress URL</label>
                        <input id="wordpress-url" bind:value={apiCredentials.wordpress.url} type="text" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="https://yourdomain.com" />
                      </div>
                      <div>
                        <label for="wordpress-username" class="block text-sm font-medium text-zinc-700 mb-1">Username</label>
                        <input id="wordpress-username" bind:value={apiCredentials.wordpress.username} type="text" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your WordPress username" />
                      </div>
                      <div>
                        <label for="wordpress-password" class="block text-sm font-medium text-zinc-700 mb-1">Password or API Key</label>
                        <input id="wordpress-password" bind:value={apiCredentials.wordpress.password} type="password" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your WordPress password or API key" />
                      </div>
                    </div>
                  {/if}
                </div>
              {/if}
            {/each}
          </div>
          
      {:else if currentStep === 3}
        <!-- Step 3: Preferences -->
        <h3 class="font-medium text-xl text-zinc-950 mb-4">3. Set up your preferences</h3>
        <p class="text-sm text-zinc-500 mb-6">Configure how the AI agent should handle your content</p>
        
        <div class="space-y-6">
          <div class="p-5 rounded-xl border border-zinc-200">
            <h4 class="font-medium text-zinc-900 mb-2">Content Schedule</h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-1">Posting Frequency</label>
                <select class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Daily</option>
                  <option>Every other day</option>
                  <option>Twice a week</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-1">Best Time to Post</label>
                <select class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Morning (8-10 AM)</option>
                  <option>Noon (12-2 PM)</option>
                  <option>Afternoon (3-5 PM)</option>
                  <option>Evening (6-8 PM)</option>
                  <option>Let AI decide</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="p-5 rounded-xl border border-zinc-200">
            <h4 class="font-medium text-zinc-900 mb-2">Content Approval</h4>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-zinc-900 font-medium">Require approval before posting</p>
                <p class="text-sm text-zinc-500">AI will send content for your review before publishing</p>
              </div>
              <div class="relative">
                <div class="w-10 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"></div>
                <div class="absolute top-1 left-5 w-4 h-4 bg-white rounded-full transition-all duration-300"></div>
              </div>
            </div>
          </div>
          
          <div class="p-5 rounded-xl border border-zinc-200">
            <h4 class="font-medium text-zinc-900 mb-2">Content Style</h4>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-1">Tone of Voice</label>
                <select class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Friendly</option>
                  <option>Authoritative</option>
                  <option>Humorous</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-zinc-700 mb-1">Content Length</label>
                <select class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Short (under 200 characters)</option>
                  <option>Medium (200-500 characters)</option>
                  <option>Long (500+ characters)</option>
                  <option>Platform optimized</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      {:else if currentStep === 4}
        <!-- Success step -->
        <div class="flex flex-col items-center justify-center py-6">
          <div class="p-4 rounded-full bg-green-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="font-semibold text-xl text-zinc-950 mb-2">Setup Complete!</h3>
          <p class="text-zinc-500 text-center mb-6">Your AI agent is now configured and ready to grow your online presence</p>
          
          <div class="text-center p-4 bg-zinc-50 rounded-xl w-full">
            <h4 class="font-medium text-zinc-900 mb-2">Next steps</h4>
            <p class="text-sm text-zinc-500">Your first content suggestions will be ready within 24 hours</p>
          </div>
          
          <button class="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-medium text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
            Go to dashboard
          </button>
        </div>
      {/if}
    </div>
    
    <div class="p-6 border-t border-zinc-100 flex justify-between">
      {#if currentStep > 1 && currentStep < 4}
        <button on:click={prevStep} class="px-5 py-2 border border-zinc-300 rounded-lg font-medium text-zinc-700 hover:bg-zinc-50 transition-all duration-200">
          Back
        </button>
      {:else}
        <div></div>
      {/if}
      
      {#if currentStep < 3}
        <button on:click={nextStep} class="px-5 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
          Continue
        </button>
      {:else if currentStep === 3}
        <button 
          on:click={handleSubmit} 
          class="px-5 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center"
          disabled={loading}
        >
          {#if loading}
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Setting up...
          {:else}
            Complete Setup
          {/if}
        </button>
      {/if}
    </div>
  </div>