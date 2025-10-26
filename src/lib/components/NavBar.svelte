<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { isLoggedIn } from '$lib/stores';
  import { logout } from '$lib/db';
	import Googleauth from './Googleauth.svelte';

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function handleGoogleSignUp() {
    // Implement Google OAuth here
    alert('🚀 Redirecting to Google Sign In...');
  }

  function handleLogout() {
    logout();
    isLoggedIn.set(false);
    goto('/');
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
        <!-- <button
          on:click={() => scrollToSection('dashboard')}
          class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50"
        >
          Dashboard
        </button> -->
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
        {#if $isLoggedIn}
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
          <!-- <Googleauth size=medium /> -->
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
        on:click={() => scrollToSection('dashboard')}
        class="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-base font-medium transition rounded-lg px-4 py-3 text-left"
      >
        Dashboard
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

      {#if $isLoggedIn}
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
          <!-- <button
            on:click={handleGoogleSignUp}
            class="w-full bg-white hover:bg-zinc-50 text-zinc-900 text-base font-medium transition flex items-center justify-center gap-2 border border-zinc-200 rounded-lg px-4 py-3 shadow-sm"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button> -->
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