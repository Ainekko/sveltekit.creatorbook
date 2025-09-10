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

  function handleSignUpRedirect() {
    goto('/signup');
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

<nav class="w-full font-[Poppins] sticky top-0 z-40 flex justify-between items-center bg-white backdrop-blur-lg px-4 sm:px-6 py-4 border-b border-gray-200/60 shadow-sm">
  <div class="flex items-center gap-4 lg:gap-8"> 
    <a href="/" class="text-gray-900 hover:text-gray-700 font-bold transition flex items-center group">
      
      <span class="text-xl font-semibold">flow<span class="font-[Pacifico]">j</span>oy</span>
    </a>
    
    <!-- Navigation Links - Hidden on mobile and small tablets, visible on large tablets and desktop -->
    <div class="hidden lg:flex items-center gap-1"> 
      <a href="/dashboard" class="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium transition rounded-lg px-3 py-2 hover:bg-gray-100">
        <span>Dashboard</span>
      </a>
      <a href="/#features" class="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium transition rounded-lg px-3 py-2 hover:bg-gray-100">
        <span>Features</span>
      </a>
      <a href="/#pricing" class="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium transition rounded-lg px-3 py-2 hover:bg-gray-100">
        <span>Pricing</span>
      </a>
      <a href="/blog" class="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium transition rounded-lg px-3 py-2 hover:bg-gray-100">
        <span>Blog</span>
      </a>
    </div>
  </div>
  
  <!-- Desktop/Tablet Actions - Hidden on mobile -->
  <div class="hidden lg:flex items-center gap-3">
    {#if $isLoggedIn}
      <button 
        on:click={handleLogout}
        class="text-gray-600 hover:text-gray-900 text-sm font-medium transition flex items-center gap-1 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
      >
        <span>Logout</span>
      </button>
    {:else}
       <div class="flex items-center gap-3">
        <button 
         on:click={handleLoginRedirect}
         class="text-gray-600 hover:text-gray-900 text-sm font-medium transition flex items-center gap-1 rounded-lg px-4 py-2 hover:bg-gray-100"
       >
         <span>Sign in</span>
       </button>
       <button 
         on:click={handleSignUpRedirect}
         class="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition flex items-center gap-1 rounded-lg px-4 py-2 shadow-sm"
       >
         <span>Start free trial</span>
       </button>
       </div>
    {/if}
  </div>

  <!-- Tablet-only Actions (medium screens) - Shows minimal version -->
  <div class="hidden md:flex lg:hidden items-center gap-2">
    {#if $isLoggedIn}
      <button 
        on:click={handleLogout}
        class="text-gray-600 hover:text-gray-900 text-sm font-medium transition flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
      >
        <span>Logout</span>
      </button>
    {:else}
       <div class="flex gap-2">
        <button 
         on:click={handleLoginRedirect}
         class="text-gray-600 hover:text-gray-900 text-sm font-medium transition flex items-center gap-1 rounded-lg px-3 py-2 hover:bg-gray-100"
       >
         <span>Sign in</span>
       </button>
       <button 
         on:click={handleSignUpRedirect}
         class="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition flex items-center gap-1 rounded-lg px-3 py-2"
       >
         <span>Try free</span>
       </button>
       </div>
    {/if}
  </div>
  
  <!-- Mobile menu button -->
  <button 
    on:click={toggleMenu}
    class="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100"
    aria-label="Toggle Menu"
    aria-expanded={isMenuOpen}
  >
    {#if isMenuOpen}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    {/if}
  </button>

  <!-- Tablet menu button (for medium screens without full nav) -->
  <button 
    on:click={toggleMenu}
    class="hidden md:block lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100 ml-2"
    aria-label="Toggle Menu"
    aria-expanded={isMenuOpen}
  >
    {#if isMenuOpen}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    {/if}
  </button>
</nav>

<!-- Mobile/Tablet Menu -->
{#if isMenuOpen}
  <div class="lg:hidden fixed top-[73px] left-0 right-0 z-30 bg-white/95 backdrop-blur-xl shadow-lg border-t border-gray-200/60 max-h-[calc(100vh-73px)] overflow-y-auto">
    <div class="flex flex-col p-4 space-y-1">
      <a href="/dashboard" on:click={() => navigateAndClose('/dashboard')} class="text-gray-700 hover:text-gray-900 hover:bg-gray-100 text-base font-medium transition rounded-lg px-3 py-3 flex items-center">Dashboard</a>
      <a href="/#features" on:click={() => navigateHashAndClose('/#features')} class="text-gray-700 hover:text-gray-900 hover:bg-gray-100 text-base font-medium transition rounded-lg px-3 py-3 flex items-center">Features</a>
      <a href="/#pricing" on:click={() => navigateHashAndClose('/#pricing')} class="text-gray-700 hover:text-gray-900 hover:bg-gray-100 text-base font-medium transition rounded-lg px-3 py-3 flex items-center">Pricing</a>
      <a href="/blog" on:click={() => navigateAndClose('/blog')} class="text-gray-700 hover:text-gray-900 hover:bg-gray-100 text-base font-medium transition rounded-lg px-3 py-3 flex items-center">Blog</a>
      
      <div class="border-t border-gray-200 my-4"></div>

      {#if $isLoggedIn}
        <button 
          on:click={handleLogout}
          class="w-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 text-base font-medium transition flex items-center justify-center border border-gray-300 rounded-lg px-3 py-3"
        >
          <span>Logout</span>
        </button>
      {:else}
         <div class="space-y-3">
           <button 
            on:click={() => navigateAndClose('/login')}
            class="w-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 text-base font-medium transition flex items-center justify-center rounded-lg px-3 py-3"
          >
            <span>Sign in</span>
          </button>
          <button 
            on:click={() => navigateAndClose('/signup')}
            class="w-full text-white bg-gray-900 hover:bg-gray-800 text-base font-medium transition flex items-center justify-center rounded-lg px-3 py-3 shadow-sm"
          >
            <span>Start free trial</span>
          </button>
         </div>
      {/if}
    </div>
  </div>
{/if}