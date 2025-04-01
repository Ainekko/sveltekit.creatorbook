<script lang="ts">
  import { get } from 'svelte/store';
  import { wipIdeasStore } from '$lib/stores';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { userStore } from '$lib/stores';
  import { get_user } from '$lib/check';
  // import { Plus } from 'lucide-svelte';

  function generateRandomGradient() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 100;
    const height = 100;

    canvas.width = width;
    canvas.height = height;

    // Generate random colors for gradient
    const color1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    const color2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Convert canvas to data URL
    return canvas.toDataURL();
  }

  function addNewIdea() {
    // Placeholder function - you'll want to implement the actual logic to add a new idea
    console.log('Add new idea clicked');
  }

  // Generate avatar gradient once for the user
  const userAvatarGradient = generateRandomGradient();

  onMount(async () => {
    try {
      const user_data = await get_user();
      if (user_data) {
        userStore.set({
          username: user_data.username,
          user_id: user_data.user_id,
          user_email: user_data.email,
          subscription_status: user_data.subscription_status
        });
      } else {
        console.error('User data could not be fetched.');
      }
    } catch (error) {
      console.error('An error occurred while fetching user data:', error);
    }
  });

  // Reactive declaration
  $: $userStore;
</script>

<div class="flex flex-col p-5 md:w-full max-w-[350px] md:max-w-[900px]">
  <!-- User welcome section -->
  <div class="px-4 py-4 flex items-center gap-3 bg-zinc- rounded-lg shadow-sm mb-6" 
       in:fly={{ y: 20, duration: 500 }}>
    <div class="avatar">
      <div class="mask rounded-full w-12 h-12">
        <img src={userAvatarGradient} alt="User Avatar" />
      </div>
    </div>
    <div class="flex flex-col">
      <span class="text-zinc-400 text-sm">Welcome back</span>
      <div class="font-medium text-zinc-100">
        {$userStore?.username || 'User'} 
        {#if $userStore?.subscription_status === 'premium'} 
          <span class="text-amber-400">★</span> 
        {/if}
      </div>
    </div>
  </div>
  
  <h1 class="text-2xl font-medium text-zinc-300 mb-5">
    Started Projects 
  </h1>
  <div class="grid w-full">
    {#each $wipIdeasStore as idea (idea.uuid)}
      <a href={`/ideas/${idea.uuid}`} class="md:w-full border border-zinc-900 rounded-sm p-4 hover:bg-zinc-800 transition"
         in:fly={{ y: 20, duration: 500 }}>
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <img src={generateRandomGradient()} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div class="flex flex-col md:flex-row gap-2 md:w-full">
            <div class="font-bold w-full">{idea.title}</div>
            <div class="text-sm opacity-50 w-full">{idea.category}</div>
          </div>
        </div>
      </a>
    {/each}
  </div>

  <!-- Add New Idea Button -->
  <div class="mt-4">
    <button 
      on:click={addNewIdea} 
      class="w-full bg-zinc-700 text-zinc-200 rounded-full p-3 hover:bg-zinc-600 transition shadow-lg"
    >
      +
    </button>
  </div>
</div>

<style>
  .grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
</style>