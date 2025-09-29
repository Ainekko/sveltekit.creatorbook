
```svelte
<script lang="ts">
  export let isAutopilotEnabled: boolean;
  export let toggleAutopilot: () => void;
</script>

<div class="space-y-8">
  <h2 class="text-2xl font-bold text-gray-900">Agent Settings</h2>

  <div class="bg-white rounded-xl p-8 border border-gray-200">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Autopilot Configuration</h3>

    <div class="space-y-6">
      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 class="font-medium text-gray-900">Enable Autopilot</h4>
          <p class="text-sm text-gray-600">Automatically generate keywords and content on schedule</p>
        </div>
        <button on:click={toggleAutopilot} class={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAutopilotEnabled ? 'bg-emerald-600' : 'bg-gray-300'}`}>
          <span class={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAutopilotEnabled ? 'translate-x-6' : 'translate-x-1'}`}></span>
        </button>
      </div>

      {#if isAutopilotEnabled}
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input type="time" value="09:00" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>

        <div>
          <h4 class="font-medium text-gray-900 mb-3">Automation Tasks</h4>
          <div class="space-y-3">
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" checked />
              <span class="ml-2 text-sm text-gray-700">Generate new keywords</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" checked />
              <span class="ml-2 text-sm text-gray-700">Create content outlines</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
              <span class="ml-2 text-sm text-gray-700">Generate full blog posts</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
              <span class="ml-2 text-sm text-gray-700">Auto-publish content</span>
            </label>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div class="bg-white rounded-xl p-8 border border-gray-200">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Content Preferences</h3>
    <div class="grid grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Target Word Count</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <option value="1500">1,500 words</option>
          <option value="2000">2,000 words</option>
          <option value="2500" selected>2,500 words</option>
          <option value="3000">3,000 words</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Content Tone</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <option value="professional">Professional</option>
          <option value="conversational" selected>Conversational</option>
          <option value="authoritative">Authoritative</option>
          <option value="friendly">Friendly</option>
        </select>
      </div>
    </div>

    <div class="mt-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
      <textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Describe your target audience...">Business owners and entrepreneurs looking to automate their workflows with AI tools</textarea>
    </div>
  </div>

  <div class="bg-white rounded-xl p-8 border border-red-200">
    <h3 class="text-lg font-semibold text-red-900 mb-6">Danger Zone</h3>
    <div class="space-y-4">
      <div class="flex justify-between items-center p-4 bg-red-50 rounded-lg">
        <div>
          <h4 class="font-medium text-red-900">Reset Agent Data</h4>
          <p class="text-sm text-red-600">Clear all keywords, outlines, and generated content</p>
        </div>
        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Reset</button>
      </div>

      <div class="flex justify-between items-center p-4 bg-red-50 rounded-lg">
        <div>
          <h4 class="font-medium text-red-900">Delete Agent</h4>
          <p class="text-sm text-red-600">Permanently delete this SEO agent and all its data</p>
        </div>
        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Delete Agent</button>
      </div>
    </div>
  </div>
</div>
```