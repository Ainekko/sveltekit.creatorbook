<script lang="ts">
    import { goto } from '$app/navigation';
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
  
    // Create a dispatcher function
    const dispatch = createEventDispatcher();
  
    /**
     * Handles the click event for the "Upgrade Now" button.
     * Navigates to the upgrade page and then dispatches the 'close' event.
     */
    function handleUpgradeClick() {
      goto('/plans'); // Navigate to the upgrade page
      dispatch('close'); // Dispatch the 'close' event to notify the parent
    }
  
    /**
     * Handles the click event for the "Maybe Later" button or the backdrop.
     * Dispatches the 'close' event.
     */
    function handleCloseClick() {
      dispatch('close'); // Dispatch the 'close' event
    }
  
    /**
     * Handles the 'keydown' event on the window to close the modal on 'Escape'.
     * @param {KeyboardEvent} event The keyboard event.
     */
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleCloseClick();
      }
    }
  
    // Add the keydown listener when the component mounts
    onMount(() => {
      window.addEventListener('keydown', handleKeydown);
  
      // Clean up the event listener when the component is destroyed
      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    });
  </script>
  
  <div
    class="fixed top-0 left-0 w-full h-full bg-zinc-950 bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm"
    on:click={handleCloseClick}
    role="dialog"
    aria-modal="true"
    aria-labelledby="upgrade-title"
  >
    <div
      class="bg-zinc-800 rounded-lg shadow-2xl p-8 max-w-md w-full border border-zinc-700"
      on:click|stopPropagation
    >
      <h2 id="upgrade-title" class="text-2xl font-semibold text-amber-400 mb-4">
        Upgrade Your Plan
      </h2>
      <p class="text-zinc-300 mb-6 leading-relaxed">
        To create more projects and unlock advanced features, please upgrade to our premium plan.
        Supercharge your workflow today!
      </p>
      <div class="flex justify-end gap-3">
        <button
          class="bg-zinc-700 hover:bg-zinc-600 text-zinc-200 py-2 px-5 rounded-md transition-colors duration-200"
          on:click={handleCloseClick}
        >
          Maybe Later
        </button>
        <button
          class="bg-amber-500 hover:bg-amber-600 text-zinc-900 py-2 px-5 rounded-md font-semibold transition-colors duration-200 shadow-sm hover:shadow-amber-500/30"
          on:click={handleUpgradeClick}
        >
          Upgrade Now
        </button>
      </div>
    </div>
  </div>
  
  <style>
    /* Optional: Add a subtle transition for modal appearance */
    .fixed {
      transition: opacity 0.2s ease-in-out;
    }
  </style>