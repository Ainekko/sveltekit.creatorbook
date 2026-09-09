<script lang="ts">
  let isMenuOpen = false;

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    isMenuOpen = false;
  }
</script>

<nav class="w-full font-[Poppins] sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16 sm:h-20">

      <!-- Brand Logo -->
      <a href="/v4" class="text-zinc-900 hover:text-zinc-700 transition flex items-center">
        <span class="text-xl font-semibold tracking-tight">
          flow<span class="font-[Pacifico]">j</span>oy
        </span>
        
      </a>

      <!-- Desktop Navigation Links -->
      <div class="hidden lg:flex items-center gap-1">
        <button on:click={() => scrollToSection('problem')} class="text-zinc-600 hover:text-zinc-950 text-sm font-medium transition rounded-xl px-4 py-2 hover:bg-zinc-50 cursor-pointer">
          Problem
        </button>
        <button on:click={() => scrollToSection('what-we-built')} class="text-zinc-600 hover:text-zinc-950 text-sm font-medium transition rounded-xl px-4 py-2 hover:bg-zinc-50 cursor-pointer">
          What We Build
        </button>
        <button on:click={() => scrollToSection('who-its-for')} class="text-zinc-600 hover:text-zinc-950 text-sm font-medium transition rounded-xl px-4 py-2 hover:bg-zinc-50 cursor-pointer">
          Who It's For
        </button>
        <button on:click={() => scrollToSection('how-it-works')} class="text-zinc-600 hover:text-zinc-950 text-sm font-medium transition rounded-xl px-4 py-2 hover:bg-zinc-50 cursor-pointer">
          How It Works
        </button>
        <button on:click={() => scrollToSection('pricing')} class="text-zinc-600 hover:text-zinc-950 text-sm font-medium transition rounded-xl px-4 py-2 hover:bg-zinc-50 cursor-pointer">
          Pricing
        </button>
      </div>

      <!-- Desktop CTAs -->
      <div class="hidden sm:flex items-center gap-3">
        <button
          on:click={() => scrollToSection('gtm-teardown')}
          class="text-zinc-700 hover:text-zinc-950 text-sm font-medium transition px-4 py-2.5 rounded-xl hover:bg-zinc-100 cursor-pointer"
        >
          Free Teardown
        </button>
        <button
          data-cal-link="hafid-ahlaqach-nigixz/15min"
          data-cal-namespace="15min"
          data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
          class="bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold transition-all duration-200 rounded-xl px-5 py-2.5 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          Book 15 Min
        </button>
      </div>

      <!-- Mobile Hamburger Button -->
      <button
        on:click={() => isMenuOpen = !isMenuOpen}
        class="lg:hidden text-zinc-700 hover:text-zinc-900 p-2 rounded-xl hover:bg-zinc-100 transition cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        {#if isMenuOpen}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        {/if}
      </button>
    </div>
  </div>
</nav>

{#if isMenuOpen}
  <div class="lg:hidden fixed inset-x-0 top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-xl shadow-xl border-b border-zinc-200/80 animate-in slide-in-from-top-2 duration-200 font-[Poppins]">
    <div class="flex flex-col p-5 space-y-2">
      <button on:click={() => scrollToSection('problem')} class="text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 text-base font-medium transition rounded-xl px-4 py-3 text-left cursor-pointer">
        Problem
      </button>
      <button on:click={() => scrollToSection('what-we-built')} class="text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 text-base font-medium transition rounded-xl px-4 py-3 text-left cursor-pointer">
        What We Build
      </button>
      <button on:click={() => scrollToSection('who-its-for')} class="text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 text-base font-medium transition rounded-xl px-4 py-3 text-left cursor-pointer">
        Who It's For
      </button>
      <button on:click={() => scrollToSection('how-it-works')} class="text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 text-base font-medium transition rounded-xl px-4 py-3 text-left cursor-pointer">
        How It Works
      </button>
      <button on:click={() => scrollToSection('pricing')} class="text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 text-base font-medium transition rounded-xl px-4 py-3 text-left cursor-pointer">
        Pricing
      </button>
      <div class="border-t border-zinc-100 my-2 pt-3 flex flex-col gap-2.5">
        <button
          on:click={() => scrollToSection('gtm-teardown')}
          class="text-zinc-700 bg-zinc-100 hover:bg-zinc-200 text-sm font-semibold py-3 px-4 rounded-xl text-center cursor-pointer"
        >
          Free GTM Teardown
        </button>
        <button
          data-cal-link="hafid-ahlaqach-nigixz/15min"
          data-cal-namespace="15min"
          data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
          class="bg-zinc-950 text-white text-sm font-semibold py-3 px-4 rounded-xl text-center shadow cursor-pointer"
        >
          Book 15 Min Call
        </button>
      </div>
    </div>
  </div>
{/if}
