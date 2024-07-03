<script lang="ts">
  import { writable, get } from 'svelte/store';
  import { v4 as uuidv4 } from 'uuid';
  import { submitWIPIdea, submitFavedIdea, fetchWIPIdeas } from '$lib/db';
  import { wipIdeasStore } from '$lib/stores';
  import { marked } from 'marked';

  // Stores to manage state
  let ideaGenerated = writable(false);
  let isLoading = writable(false);
  let alertState = writable({ show: false, message: '', type: 'success' });

  let startupIdea = writable({
    title: '',
    category: '',
    description: '',
    uuid: ''
  });

  async function fetchResult(taskId) {
    let result;
    while (!result) {
      const response = await fetch(`/generate/?taskId=${taskId}`);
      const data = await response.json();
      if (data.status === 'completed') {
        result = data.result;
      } else if (data.status === 'failed' || data.status === 'error') {
        console.error('Task failed or encountered an error:', data.result);
        showAlert('Task failed or encountered an error', 'error');
        break;
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before polling again
      }
    }
    return result;
  }

  async function generateIdea() {
    isLoading.set(true);
    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        const taskId = data.taskId;
        const newIdea = await fetchResult(taskId);
        if (newIdea) {
          newIdea.uuid = uuidv4();
          console.log(newIdea);
          startupIdea.set(newIdea);
          ideaGenerated.set(true);
        }
      } else {
        console.error('Failed to start idea generation');
        showAlert('Failed to start idea generation', 'error');
      }
    } catch (error) {
      console.error('Error generating idea:', error);
      showAlert('Error generating idea', 'error');
    } finally {
      isLoading.set(false);
    }
  }

  const token = localStorage.getItem('token');

  async function loadIdeas() {
    try {
      const ideas = await fetchWIPIdeas(token);
      wipIdeasStore.set(ideas);
    } catch (error) {
      console.error('Failed to load ideas:', error);
      showAlert('Failed to load ideas', 'error');
    }
  }

  function handleWIPIdea() {
    const idea = get(startupIdea);
    submitWIPIdea(token, idea)
      .then(() => {
        console.log('WIP idea submitted successfully');
        showAlert('WIP idea submitted successfully', 'success');
        loadIdeas();
      })
      .catch(error => {
        console.error('Failed to submit WIP idea', error);
        showAlert('Failed to submit WIP idea', 'error');
      });
  }

  function handleFavedIdea() {
    const idea = get(startupIdea);
    submitFavedIdea(token, idea)
      .then(() => {
        console.log('Faved idea submitted successfully');
        showAlert('Faved idea submitted successfully', 'success');
      })
      .catch(error => {
        console.error('Failed to submit Faved idea', error);
        showAlert('Failed to submit Faved idea', 'error');
      });
  }

  // Function to show the alert
  function showAlert(message: string, type: any) {
    alertState.set({ show: true, message, type });
    // Hide the alert after 3 seconds
    setTimeout(() => {
      alertState.set({ show: false, message: '', type: 'success' });
    }, 3000);
  }
</script>


<style>
  .alert {
    @apply fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md;
  }
  .alert-success {
    @apply bg-green-500 text-white;
  }
  .alert-error {
    @apply bg-red-500 text-white;
  }
</style>

<!-- Main UI -->
<div class="min-h-screen w-full flex flex-col justify-center items-center gap-5 text-white p-10 bg-zinc-950 rounded-md">
  <!-- Conditionally render the alert -->
  {#if $alertState.show}
    <div class={`alert ${$alertState.type === 'success' ? 'alert-success' : 'alert-error'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{$alertState.message}</span>
    </div>
  {/if}

  <div class="w-full h-full flex flex-row justify-between items-start"> 
    <div>
      <h1 class="text-2xl text-white font-medium border border-transparent border-b-zinc-600 rounded-full pb-2">
        {#if $ideaGenerated}
          {$startupIdea.title}
        {/if}
      </h1>
      <div class="max-w-[700px] text-zinc-400 pt-3">
        <p>
          {#if $ideaGenerated}
            {@html marked($startupIdea.description)}
          {:else}
            <div class="flex justify-center items-center gap-2 mt-20">
              <span class="loading loading-ring loading-md"></span> 
              {#if !$isLoading}
                <span class="loading-text">Click <span>Generate</span> to Start</span>
              {/if}
            </div>
          {/if}
        </p>
      </div>
    </div>
    <div class="flex flex-row justify-center items-center gap-2">
      <div class="h-1 w-1 bg-pink-400 p-1 rounded-full shadow shadow-md shadow-pink-600 text-zinc-500"></div>
      {#if $ideaGenerated}
        <h2 class="text-zinc-500">{$startupIdea.category}</h2>
      {/if}
    </div>
  </div>

  <div class="h-auto w-full flex flex-col justify-between rounded-md p-5 text-white">
    <div>
      <div class="p-3 flex flex-col grow">
        <div class="p-3 w-full text-white flex flex-row-reverse justify-center">
          <button on:click={handleWIPIdea} class="btn bg-transparent border border-zinc-700 ml-5 shadow-xl shadow-black/40 rounded-full">
            Build a landing page                    
          </button>
          <button on:click={handleFavedIdea} class="btn bg-transparent border border-zinc-700 ml-5 shadow-xl shadow-black/40 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="none">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Save for later
          </button>
          <button on:click={generateIdea} class="btn bg-yellow-400 text-black border-transparent ml-5 shadow-xl shadow-black/40 rounded-full">
            {#if $isLoading}
              <span class="loading loading-ring loading-md"></span>
            {/if}
            Generate                    
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
