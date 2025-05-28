<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { isLoggedIn } from '$lib/stores'; // Assuming this store exists and works
  import { logout } from '$lib/db'; // Assuming this function exists
  import Googleauth from './Googleauth.svelte'; // Assuming this component exists

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function handleLogout() {
    logout();
    // Optionally:
    isLoggedIn.set(false);
    goto('/'); 
  }

  function handleLoginRedirect() {
    goto('/login');
  }

  // Close menu when navigating (useful for SPAs)
  function navigateAndClose(path: string) {
      goto(path);
      isMenuOpen = false;
  }
  
  // Close menu when clicking on hash links too
  function navigateHashAndClose(path: string) {
      goto(path, { invalidateAll: false, noScroll: false }); // Adjust options as needed
      isMenuOpen = false;
  }

</script>

<nav class="w-full sticky top-0 z-40 flex justify-between items-center bg-zinc-950/70 backdrop-blur-lg px-4 sm:px-6 py-3 border-b border-zinc-800/60 shadow-sm">
  <div class="flex items-center gap-6"> 
    <a href="/" class="text-zinc-100 hover:text-white font-bold transition flex items-center group">
      <span class="text-xl group-hover:scale-105 transition-transform duration-200">S-</span>
      <span class="ml-1.5 text-xs border border-zinc-600 bg-zinc-800 text-zinc-300 font-medium px-2 py-0.5 rounded-md group-hover:border-zinc-500 group-hover:text-white transition">BETA</span>
    </a>
    
    <div class="hidden md:flex items-center gap-1"> 
      <a href="/dashboard" class="flex items-center gap-1 text-zinc-300 hover:text-white text-sm transition rounded-lg px-3 py-1.5 hover:bg-zinc-800/70">
        <span>Dashboard</span>
      </a>
      <a href="/#services" class="flex items-center gap-1 text-zinc-300 hover:text-white text-sm transition rounded-lg px-3 py-1.5 hover:bg-zinc-800/70">
        <span>Services</span>
      </a>
      <a href="/#pricing" class="flex items-center gap-1 text-zinc-300 hover:text-white text-sm transition rounded-lg px-3 py-1.5 hover:bg-zinc-800/70">
        <span>Pricing</span>
      </a>
      <a href="/blog" class="flex items-center gap-1 text-zinc-300 hover:text-white text-sm transition rounded-lg px-3 py-1.5 hover:bg-zinc-800/70">
        <span>Blog</span>
      </a>
    </div>
  </div>
  
  <div class="hidden w-full p-2 md:flex md:max-w-[800px] justify-end  items-center gap-2">
    <a href="/contact-us" class="text-zinc-300  w-1/3 hover:text-white text-sm transition flex items-center gap-2 border border-zinc-800 rounded-lg px-4 py-2 hover:bg-zinc-800/70 hover:border-pink-500/50 group">
        <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75 group-hover:bg-pink-300"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-pink-500 group-hover:bg-pink-400"></span>
        </span>
        <span>Build Custom Agent</span>
    </a>
    
    {#if $isLoggedIn}
      <button 
        on:click={handleLogout}
        class="text-zinc-300 bg-zinc-950 hover:text-white text-sm transition flex items-center gap-1 border border-zinc-700 rounded-lg px-4 py-1.5 hover:bg-zinc-700/60"
      >
        <span>Logout</span>
      </button>
    {:else}
       <div class="flex gap-2 ">

        <Googleauth size="medium" /> 
        <button 
         on:click={handleLoginRedirect}
         class="text-zinc-300 bg-transparet hover:bg-white hover:text-zinc-900 text-sm transition flex items-center gap-1 border border-zinc-600 rounded-lg px-4 py-1.5 font-medium hover:shadow-md hover:shadow-white/10"
       >
         <span>Login</span>
       </button>

       </div>
    {/if}
  </div>
  
  <button 
    on:click={toggleMenu}
    class="md:hidden text-zinc-300 hover:text-white focus:outline-none p-1 rounded-md hover:bg-zinc-800"
    aria-label="Toggle Menu"
    aria-expanded={isMenuOpen}
  >
    {#if isMenuOpen}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    {/if}
  </button>
</nav>

{#if isMenuOpen}
  <div class="md:hidden fixed top-[61px] left-0 right-0 z-30 bg-zinc-950/90 backdrop-blur-xl shadow-lg p-4 border-t border-zinc-800/60 max-h-[calc(100vh-61px)] overflow-y-auto">
    <div class="flex flex-col gap-2">
      <a href="/dashboard" on:click={() => navigateAndClose('/dashboard')} class="text-zinc-300 hover:text-white text-base transition rounded-lg px-3 py-3 hover:bg-zinc-800/70 flex items-center">Dashboard</a>
      <a href="/#services" on:click={() => navigateHashAndClose('/#services')} class="text-zinc-300 hover:text-white text-base transition rounded-lg px-3 py-3 hover:bg-zinc-800/70 flex items-center">Services</a>
      <a href="/#pricing" on:click={() => navigateHashAndClose('/#pricing')} class="text-zinc-300 hover:text-white text-base transition rounded-lg px-3 py-3 hover:bg-zinc-800/70 flex items-center">Pricing</a>
      <a href="/blog" on:click={() => navigateAndClose('/blog')} class="text-zinc-300 hover:text-white text-base transition rounded-lg px-3 py-3 hover:bg-zinc-800/70 flex items-center">Blog</a>
      
      <a href="/contact-us" on:click={() => navigateAndClose('/contact-us')} class="text-zinc-300 hover:text-white text-base transition rounded-lg px-3 py-3 hover:bg-zinc-800/70 flex items-center gap-2">
          <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Build Custom Agent</span>
      </a>

      <div class="border-t border-zinc-800 my-3"></div>

      {#if $isLoggedIn}
        <button 
          on:click={handleLogout}
          class="w-full text-zinc-300 hover:text-white text-base transition flex items-center justify-center gap-2 border border-zinc-700 bg-zinc-800/50 rounded-lg px-3 py-3 hover:bg-zinc-700/60 mt-2"
        >
          <span>Logout</span>
        </button>
      {:else}
         <Googleauth size="large" /> 
         <button 
          on:click={() => navigateAndClose('/login')}
          class="w-full text-zinc-900 bg-zinc-100 hover:bg-white text-base transition flex items-center justify-center gap-2 border border-zinc-200 rounded-lg px-3 py-3 font-medium mt-2"
        >
          <span>Login</span>
        </button>
      {/if}
    </div>
  </div>
{/if}