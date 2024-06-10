<script lang="ts">
  import { get } from 'svelte/store';
  import { wipIdeasStore } from '$lib/stores';

</script>

<div class="flex flex-col p-5 w-full max-w-[900]">
  <h1 class="text-2xl font-medium text-zinc-300 mb-5">
    Ideas in Progress
  </h1>
  <div class="grid">
    {#each $wipIdeasStore as idea}
      <a href={`/ideas/${idea.uuid}`} class="w-full border border-zinc-900 rounded-sm p-4 hover:bg-zinc-800 transition">
        <div class="flex  items-center gap-3">
          <div class="avatar ">
            <div class="mask mask-squircle w-12 h-12">
              <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div class="flex flex-row gap-2 w-full ">
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