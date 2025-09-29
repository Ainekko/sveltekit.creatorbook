
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" on:click={() => dispatch('close')}>
  <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4" on:click|stopPropagation>
    <h3 class="text-xl font-semibold text-gray-900 mb-6">Schedule Tasks</h3>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <option>Generate Keywords</option>
          <option>Create Outlines</option>
          <option>Generate Blog Posts</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <option>Daily</option>
          <option>Every 2 days</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
        <input type="datetime-local" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>
    </div>

    <div class="flex justify-end space-x-3 mt-6">
      <button on:click={() => dispatch('close')} class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
      <button on:click={() => dispatch('close')} class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">Schedule</button>
    </div>
  </div>
</div>