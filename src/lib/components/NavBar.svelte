<script lang="ts">
  // You may need to import your auth store/function to handle logout
  // import { userStore } from '$lib/stores';
  import {logout} from '$lib/db'

  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { isLoggedIn } from '$lib/stores';
  import Googleauth from './Googleauth.svelte';




  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function handleLogout() {
    logout();
    
  }

  function handleLoginRedirect() {
    goto('/login');
  }

 

  onMount(() => {
    console.log(isLoggedIn)
  });
</script>

<div class="flex justify-center w-full px-4 py-2">
  <nav class="w-full max-w-5xl flex justify-between items-center rounded-xl border border-zinc-900/30 bg-zinc-900/80 backdrop-blur-md px-4 py-2">
    <div class="flex items-center gap-4">
      <a href="/" class="text-zinc-100 hover:text-zinc-300 font-medium transition flex items-center">
        <!-- Replace with your logo or site name -->
        <span class="text-lg">S-</span>
        <!-- Beta indicator -->
        <span class="ml-1 text-xs border border-zinc-500  text-zinc-300 font-medium px-1.5 py-0.5 rounded-md">BETA</span>
      </a>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-2">
        <a href="/dashboard" class="flex items-center gap-1 text-zinc-300 hover:text-white text-sm transition rounded-xl px-2 py-1 hover:bg-zinc-800/60">
          <span>Dashboard</span>
        </a>
        
        
        
        <a href="/#services" class="flex items-center gap-1 text-zinc-300 hover:text-white text-sm transition rounded-xl px-2 py-1 hover:bg-zinc-800/60">
          <span>Services</span>
        </a>
        
        <a href="/#pricing" class="flex items-center gap-1 text-zinc-300 hover:text-white text-sm transition rounded-xl px-2 py-1 hover:bg-zinc-800/60">
          <span>Pricing</span>
        </a>
        
        <a href="/#" class="flex items-center gap-1 text-zinc-300 hover:text-white text-sm transition rounded-xl px-2 py-1 hover:bg-zinc-800/60">
          <span>Blog</span>
        </a>
      </div>
    </div>
    
    <div class="hidden md:flex">
      <a href="/contact-us" class="text-zinc-300 hover:text-white text-sm transition flex items-center gap-1 border border-zinc-800 rounded-xl px-3 py-1 hover:bg-zinc-800/60 mr-2">
        <span>Contact-us</span>
      </a>
      
      {#if $isLoggedIn}

      

        <button 
          on:click={handleLogout}
          class="text-zinc-300 hover:text-white text-sm transition flex items-center gap-1 border border-zinc-800 rounded-xl px-3 py-1 hover:bg-zinc-800/60"
        >
          <span>Logout</span>
        </button>
      {:else}
         
        <div class="md:flex gap-2">
         
          <Googleauth
          size="medium"
        />
        
        <button 
          on:click={handleLoginRedirect}
          class="text-zinc-300 hover:text-white text-sm transition flex items-center gap-1 border border-zinc-800 rounded-xl px-3 py-1 hover:bg-zinc-800/60"
        >
          <span>Login</span>
        </button>

        </div>

      {/if}
       
      
    </div>
    
    <!-- Mobile menu button -->
    <button 
      on:click={toggleMenu}
      class="md:hidden text-zinc-300 hover:text-white focus:outline-none"
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
</div>

<!-- Mobile Navigation Menu -->
{#if isMenuOpen}
  <div class="md:hidden fixed top-16 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-md shadow-lg p-4 border-t border-zinc-800 max-h-screen overflow-y-auto">
    <div class="flex flex-col gap-2">
      <a href="/dashboard" class="text-zinc-300 hover:text-white text-sm transition rounded-xl px-2 py-3 hover:bg-zinc-800/60 flex items-center gap-2">
        <span>Dashboard</span>
      </a>
      
      
      
      <a href="/#services" class="text-zinc-300 hover:text-white text-sm transition rounded-xl px-2 py-3 hover:bg-zinc-800/60 flex items-center gap-2">
        <span>Services</span>
      </a>
      
      <a href="/#pricing" class="text-zinc-300 hover:text-white text-sm transition rounded-xl px-2 py-3 hover:bg-zinc-800/60 flex items-center gap-2">
        <span>Pricing</span>
      </a>
      
      <a href="/#" class="text-zinc-300 hover:text-white text-sm transition rounded-xl px-2 py-3 hover:bg-zinc-800/60 flex items-center gap-2">
        <span>Blog</span>
      </a>
      
      <a href="/contact-us" class="text-zinc-300 hover:text-white text-sm transition rounded-xl px-2 py-3 hover:bg-zinc-800/60 flex items-center gap-2">
        <span>Contact-us</span>
      </a>
      
      {#if $isLoggedIn}
        <button 
          on:click={handleLogout}
          class="text-zinc-300 hover:text-white text-sm transition flex items-center gap-2 border border-zinc-800 rounded-xl px-3 py-3 hover:bg-zinc-800/60 mt-2"
        >
          <span>Logout</span>
        </button>
      {:else}
        <button 
          on:click={handleLoginRedirect}
          class="text-zinc-300 hover:text-white text-sm transition flex items-center gap-2 border border-zinc-800 rounded-xl px-3 py-3 hover:bg-zinc-800/60 mt-2"
        >
          <span>Login</span>
        </button>
      {/if}
      
    </div>
  </div>
  
{/if}