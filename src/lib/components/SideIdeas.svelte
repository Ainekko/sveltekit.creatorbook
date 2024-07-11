<script lang="ts">
  import { get } from 'svelte/store';
  import { wipIdeasStore } from '$lib/stores';
  import { fly } from 'svelte/transition';

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
</script>

<div class="flex flex-col p-5  md:w-full max-w-[350px] md:max-w-[900px]">
  <h1 class="text-2xl font-medium text-zinc-300 mb-5">
    Projects in Progress
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
          <div class="flex flex-col md:flex-row gap-2  md:w-full">
            <div class="font-bold w-full">{idea.title}</div>
            <div class="text-sm opacity-50 w-full">{idea.category}</div>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
</style>
