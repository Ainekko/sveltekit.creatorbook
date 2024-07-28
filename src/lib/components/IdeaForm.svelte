<script lang="ts">
    import { writable } from 'svelte/store';
    import { v4 as uuidv4 } from 'uuid';
    import { submitWIPIdea } from '$lib/db';
  
    // Form fields for a new WIP idea
    let title = writable('');
    let category = writable('');
    let description = writable('');
  
    // Alert state
    let alertState = writable({ show: false, message: '', type: 'success' });
  
    const token = localStorage.getItem('token');
  
    // Function to handle form submission
    async function handleFormSubmit(event: Event) {
      event.preventDefault();
  
      const idea = {
        title: $title,
        category: $category,
        description: $description,
        uuid: uuidv4()
      };
  
      try {
        await submitWIPIdea(token, idea);
        showAlert('WIP idea submitted successfully', 'success');
        // Clear form after submission
        title.set('');
        category.set('');
        description.set('');
      } catch (error) {
        console.error('Failed to submit WIP idea', error);
        showAlert('Failed to submit WIP idea', 'error');
      }
    }
  
    // Function to show alerts
    function showAlert(message: string, type: string) {
      alertState.set({ show: true, message, type });
      // Hide the alert after 3 seconds
      setTimeout(() => {
        alertState.set({ show: false, message: '', type: 'success' });
      }, 3000);
    }
  </script>
  
  <style>
    .alert {
      position: fixed;
      top: 4rem;
      left: 50%;
      transform: translateX(-50%);
      padding: 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    }
    .alert-success {
      background-color: #38a169;
      color: white;
    }
    .alert-error {
      background-color: #e53e3e;
      color: white;
    }
  </style>
  
  <div class="min-h-[500px] w-full flex flex-col justify-center items-center gap-5 text-white p-10 bg-zinc-950 rounded-md">
    {#if $alertState.show}
      <div class={`alert ${$alertState.type === 'success' ? 'alert-success' : 'alert-error'}`}>
        <span>{$alertState.message}</span>
      </div>
    {/if}
  
    <form on:submit={handleFormSubmit} class="w-full max-w-md">
      <div class="mb-4">
        <label class="block text-zinc-500 text-sm font-normal mb-2" for="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          bind:value={$title}
          class="shadow text-sm appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
  
      <div class="mb-4">
        <label class="block text-zinc-500 text-sm font-normal mb-22" for="category">
          Category
        </label>
        <input
          id="category"
          type="text"
          bind:value={$category}
          class="shadow text-sm appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
  
      <div class="mb-4">
        <label class="block text-zinc-500 text-sm font-normal mb-2" for="description">
          Description
        </label>
        <textarea
          id="description"
          bind:value={$description}
          class="shadow text-sm appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          required
        ></textarea>
      </div>
  
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-violet-300 hover:bg-white text-black  text-sm font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Idea
        </button>
      </div>
    </form>
  </div>
  