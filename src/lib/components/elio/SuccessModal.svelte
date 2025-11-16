<!-- src/lib/components/elio/SuccessModal.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { Check } from 'lucide-svelte';
  
    export let showSuccessModal;
    export let successMessage;
  
    const dispatch = createEventDispatcher();
  
    function closeSuccessModal() {
      dispatch('close');
    }
  
    function goToPostsView() {
      dispatch('goToPostsView');
    }
  </script>
  
  {#if showSuccessModal}
    <div
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      on:click={closeSuccessModal}
    >
      <div
        class="bg-white rounded-2xl p-8 border border-zinc-200 max-w-md relative flex flex-col text-center shadow-xl"
        on:click|stopPropagation
      >
        <button
          on:click={closeSuccessModal}
          class="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 text-2xl leading-none"
        >
          ×
        </button>
  
        <div class="space-y-6">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <Check class="w-8 h-8 text-white" />
          </div>
  
          <h2 class="text-2xl font-semibold text-zinc-900">
            {successMessage.includes('connected') ? 'Connected! 🎉' : 'Posts Generated! 🎉'}
          </h2>
  
          <p class="text-base text-zinc-600">
            {successMessage}
          </p>
  
          <div class="flex flex-col gap-3">
            {#if !successMessage.includes('connected')}
              <button
                on:click={goToPostsView}
                class="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                View & Approve Posts
              </button>
            {/if}
  
            <button
              on:click={closeSuccessModal}
              class="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              {successMessage.includes('connected') ? 'Continue' : 'Generate More'}
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}