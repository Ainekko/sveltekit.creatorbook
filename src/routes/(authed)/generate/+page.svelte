<script lang="ts">
  import NavBar from "$lib/components/NavBar.svelte";
  import { onMount } from 'svelte';
  import { writable, get } from 'svelte/store';
  import { submitWIPIdea, submitFavedIdea, fetchWIPIdeas } from '$lib/db';
  import { wipIdeasStore } from '$lib/stores';

  import { useChat } from 'ai/svelte';
  import { v4 as uuidv4 } from 'uuid';

  /** @type {import('./$types').PageData} */

  const { input, handleSubmit, messages } = useChat();

  export let data;

  let isLoggedIn = true;
  let message = writable("Loading message...");

  let idea = '';

  let startupIdea = writable({
  title: '',
  category: '',
  description: '',
  uuid: '' // Generate UUID when initializing the idea
});

  async function generateIdea() {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const newIdea = await response.json();
      newIdea.uuid = uuidv4(); // Assign a UUID to the new idea
      console.log(newIdea)
      startupIdea.set(newIdea);
    } else {
      console.error('Failed to fetch idea');
      alert('Failed to fetch idea');
    }
  }

  const token = localStorage.getItem('token');

  onMount(() => {
    const savedIdea = localStorage.getItem('startupIdea');
    if (savedIdea) {
      startupIdea.set(JSON.parse(savedIdea));
    } else {
      generateIdea();
    }
  });

  async function loadIdeas() {
    try {
      const ideas = await fetchWIPIdeas(token);
      wipIdeasStore.set(ideas);
    } catch (error) {
      console.error('Failed to load ideas:', error);
    }
  }

  function handleWIPIdea() {
    const idea = get(startupIdea);
    console.log(idea.uuid)
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

<div class="h-screen w-full flex flex-col justify-center items-center gap-5 text-white p-10 bg-zinc-950 rounded-md">
  <div class="w-full h-full flex flex-row justify-between items-start"> 
    <div>
      <h1 class="text-2xl text-white font-medium border border-transparent  border-b-zinc-600 rounded-full pb-2">
        {$startupIdea.title}
      </h1>
      <div class="max-w-[700px]">
        <p class="">
          <span class="loading loading-ring loading-md"></span>
          {$startupIdea.description}
        </p>
      </div>
    </div>
    <div class="flex flex-row justify-center items-center gap-2">
      <div class="h-1 w-1 bg-pink-400 p-1 rounded-full shadow shadow-md shadow-pink-600"></div>
      <h2>
        {$startupIdea.category}
      </h2>
    </div>
  </div>

  <div class="h-auto w-full flex flex-col justify-between rounded-md p-5 bg- text-white">
    <div>
      <div class="p-3 flex flex-col grow pt-">
        <div class="p-3 w-full text-white flex flex-row-reverse justify-center">
          <button on:click={handleWIPIdea} class="btn bg-transparent  border border-zinc-700 ml-5 shadow-xl shadow-black/40 rounded-full">
            Build a landing page                    
          </button>
          <button on:click={handleFavedIdea} class="btn bg-transparent  border border-zinc-700 ml-5 shadow-xl shadow-black/40 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="none">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Save for later
          </button>
          <button on:click={generateIdea} class="btn bg-yellow-400 text-black border-transparent ml-5 shadow-xl shadow-black/40 rounded-full">
            <span class="loading loading-ring loading-md"></span>
            Generate                    
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
