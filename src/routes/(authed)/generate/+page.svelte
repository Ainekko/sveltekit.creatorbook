<script lang="ts">
  import { writable, get } from 'svelte/store';
  import { v4 as uuidv4 } from 'uuid';
  import { submitWIPIdea, submitFavedIdea, fetchWIPIdeas } from '$lib/db';
  import { wipIdeasStore } from '$lib/stores';
  import { marked } from 'marked';

  // Store to track if an idea has been generated
  let ideaGenerated = writable(false);

  // Store for the startup idea details
  let startupIdea = writable({
    title: '',
    category: '',
    description: '',
    uuid: '' // Generate UUID when initializing the idea
  });

  // Store to track the loading state
  let isLoading = writable(false);

  // Function to generate a new startup idea
  async function generateIdea() {
    isLoading.set(true); // Set loading to true when function starts
    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const newIdea = await response.json();
        newIdea.uuid = uuidv4(); // Assign a UUID to the new idea
        console.log(newIdea);
        startupIdea.set(newIdea);
        ideaGenerated.set(true); // Update state to indicate idea has been generated
      } else {
        console.error('Failed to fetch idea');
        alert('Failed to fetch idea');
      }
    } catch (error) {
      console.error('Error generating idea:', error);
    } finally {
      isLoading.set(false); // Set loading to false when function completes
    }
  }

  const token = localStorage.getItem('token');

  // Function to load existing ideas
  async function loadIdeas() {
    try {
      const ideas = await fetchWIPIdeas(token);
      wipIdeasStore.set(ideas);
    } catch (error) {
      console.error('Failed to load ideas:', error);
    }
  }

  // Function to handle submission of a work-in-progress idea
  function handleWIPIdea() {
    const idea = get(startupIdea);
    submitWIPIdea(token, idea)
      .then(() => {
        console.log('WIP idea submitted successfully');
        alert('WIP idea submitted successfully');
        loadIdeas();
      })
      .catch(error => {
        console.error('Failed to submit WIP idea', error);
        alert('Failed to submit WIP idea');
      });
  }

  // Function to handle submission of a favorite idea
  function handleFavedIdea() {
    const idea = get(startupIdea);
    submitFavedIdea(token, idea)
      .then(() => {
        console.log('Faved idea submitted successfully');
        alert('Faved idea submitted successfully');
      })
      .catch(error => {
        console.error('Failed to submit Faved idea', error);
        alert('Failed to submit Faved idea');
      });
  }
</script>

<style>
  /* Optional: Additional styling for better visuals */
  .loading-text {
    @apply text-xl rounded-full font-normal text-zinc-500;
  }
</style>

<div class="min-h-screen w-full flex flex-col justify-center items-center gap-5 text-white p-10 bg-zinc-950 rounded-md">
  <div class="w-full h-full flex flex-row justify-between items-start"> 
    <div>
      <h1 class="text-2xl text-white font-medium border border-transparent border-b-zinc-600 rounded-full pb-2">
        <!-- Conditionally show the title if idea is generated -->
        {#if $ideaGenerated}
          {$startupIdea.title}
        {/if}
      </h1>
      <div class="max-w-[700px] text-zinc-400 pt-3">
        <p>
          
          <!-- Conditionally show the description or loading message -->
          {#if $ideaGenerated}
            {@html marked($startupIdea.description)}
          {:else}
            <div class="flex justify-center items-center gap-2 mt-20">
              <span class="loading loading-ring loading-md"></span> 
              {#if !$isLoading}
                <span class="loading-text">Click <span class=" ">Generate</span>  to Start</span>
              {/if}
            </div>
          {/if}
        </p>
      </div>
    </div>
    <div class="flex flex-row justify-center items-center gap-2">
      <div class="h-1 w-1 bg-pink-400 p-1 rounded-full shadow shadow-md shadow-pink-600 text-zinc-500"></div>
      <!-- Conditionally show the category if idea is generated -->
      {#if $ideaGenerated}
        <h2 class="text-zinc-500">{$startupIdea.category}</h2>
      {/if}
    </div>
  </div>

  <div class="h-auto w-full flex flex-col justify-between rounded-md p-5 bg- text-white">
    <div>
      <div class="p-3 flex flex-col grow pt-">
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
            <!-- Conditionally show the loading spinner based on isLoading state -->
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
