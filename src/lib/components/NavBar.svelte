<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { isAuthenticated, userStore } from '$lib/users/stores';
  import Googleauth from './Googleauth.svelte';

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function handleGoogleSignUp() {
    // Implement Google OAuth here
    alert('🚀 Redirecting to Google Sign In...');
  }

  async function handleLogout() {
    await userStore.logout();
    isMenuOpen = false;
  }

  function navigateAndClose(path) {
    goto(path);
    isMenuOpen = false;
  }

  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    isMenuOpen = false;
  }
</script>

<nav class="w-full font-[Poppins] sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100 shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      
      <!-- Logo -->
      <div class="flex items-center">
        <a href="/" class="text-zinc-900 hover:text-zinc-700 transition flex items-center group">
          <span class="text-xl font-semibold">
            flow<span class="font-[Pacifico] ">j</span>oy
          </span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center gap-1">
        <button
          on:click={() => scrollToSection('agents')}
          class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50"
        >
          Agents
        </button>
        <button
          on:click={() => scrollToSection('how-it-works')}
          class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50"
        >
          How It Works
        </button>
        <button
          on:click={() => scrollToSection('pricing')}
          class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2  hover:bg-zinc-50"
        >
          Pricing
        </button>
        <button
          on:click={() => navigateAndClose('/blog')}
          class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50"
        >
          Blog
        </button>
      </div>

      <!-- Desktop CTA Buttons -->
      <div class="hidden lg:flex items-center gap-3">
        {#if $isAuthenticated}
          <button
            on:click={() => navigateAndClose('/dashboard')}
            class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50"
          >
            Dashboard
          </button>
          <button
            on:click={handleLogout}
            class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition flex items-center gap-2 border border-zinc-200 rounded-lg px-4 py-2 hover:bg-zinc-50"
          >
            Logout
          </button>
        {:else}
          <button
            on:click={() => navigateAndClose('/login')}
            class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50"
          >
            Log in
          </button>
          <button
            on:click={() => navigateAndClose('/signup')}
            class="bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium transition rounded-lg px-5 py-2 shadow-sm"
          >
            Get started free
          </button>
        {/if}
      </div>

      <!-- Mobile Menu Button -->
      <button
        on:click={toggleMenu}
        class="lg:hidden text-zinc-600 hover:text-zinc-900 p-2 rounded-lg hover:bg-zinc-50 transition"
        aria-label="Toggle menu"
      >
        {#if isMenuOpen}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        {/if}
      </button>
    </div>
  </div>
</nav>

<!-- Mobile Menu -->
{#if isMenuOpen}
  <div class="lg:hidden fixed inset-x-0 top-16 z-40 bg-white/95 backdrop-blur-xl shadow-lg border-b border-zinc-100 max-h-[calc(100vh-4rem)] overflow-y-auto">
    <div class="flex flex-col p-4 space-y-1">
      <button
        on:click={() => scrollToSection('agents')}
        class="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-base font-medium transition rounded-lg px-4 py-3 text-left"
      >
        Agents
      </button>
      <button
        on:click={() => scrollToSection('how-it-works')}
        class="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-base font-medium transition rounded-lg px-4 py-3 text-left"
      >
        How It Works
      </button>
      <button
        on:click={() => navigateAndClose('/blog')}
        class="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-base font-medium transition rounded-lg px-4 py-3 text-left"
      >
        Blog
      </button>

      <div class="border-t border-zinc-100 my-4"></div>

      {#if $isAuthenticated}
        <button
          on:click={() => navigateAndClose('/dashboard')}
          class="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-base font-medium transition rounded-lg px-4 py-3 text-left"
        >
          Dashboard
        </button>
        <button
          on:click={handleLogout}
          class="w-full text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-base font-medium transition flex items-center justify-center border border-zinc-200 rounded-lg px-4 py-3"
        >
          Logout
        </button>
      {:else}
        <div class="space-y-3">
          <button
            on:click={() => navigateAndClose('/login')}
            class="w-full text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-base font-medium transition flex items-center justify-center rounded-lg px-4 py-3"
          >
            Log in
          </button>
          <Googleauth />
          <button
            on:click={() => navigateAndClose('/signup')}
            class="w-full text-white bg-zinc-900 hover:bg-zinc-800 text-base font-medium transition flex items-center justify-center rounded-lg px-4 py-3 shadow-sm"
          >
            Get started free
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}