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

<nav class="w-full font-[Poppins] sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100 shadow-sm transition-all duration-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16 sm:h-20">

      <!-- Exact Logo from Main Landing Page -->
      <a href="/v2" class="text-zinc-900 hover:text-zinc-700 transition flex items-center">
        <span class="text-xl font-semibold">
          flow<span class="font-[Pacifico]">j</span>oy
        </span>
      </a>

      <!-- Desktop Nav -->
      <div class="hidden lg:flex items-center gap-1">
        <button on:click={() => scrollToSection('capabilities')} class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50">
          Capabilities
        </button>
        <button on:click={() => scrollToSection('what-we-built')} class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50">
          What We've Built
        </button>
        <button on:click={() => scrollToSection('who-its-for')} class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50">
          Who It's For
        </button>
        <button on:click={() => scrollToSection('how-it-works')} class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50">
          How It Works
        </button>
        <button on:click={() => scrollToSection('pricing')} class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50">
          Pricing
        </button>
      </div>

      <!-- Desktop CTA Buttons -->
      <div class="hidden sm:flex items-center gap-3">
        <button
          on:click={() => scrollToSection('gtm-teardown')}
          class="text-zinc-700 hover:text-zinc-900 text-sm font-medium transition px-4 py-2 rounded-xl hover:bg-zinc-100"
        >
          Free Teardown
        </button>
        <button
          data-cal-link="hafid-ahlaqach-nigixz/15min"
          data-cal-namespace="15min"
          data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
          class="bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold transition-all duration-200 rounded-xl px-5 py-2.5 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          Book a call
        </button>
      </div>

      <!-- Mobile Hamburger -->
      <button
        on:click={() => isMenuOpen = !isMenuOpen}
        class="lg:hidden text-zinc-700 hover:text-zinc-900 p-2 rounded-xl hover:bg-zinc-100 transition"
        aria-label="Toggle menu"
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
      <button on:click={() => scrollToSection('capabilities')} class="text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 text-base font-medium transition rounded-xl px-4 py-3 text-left">
        Capabilities
      </button>
      <button on:click={() => scrollToSection('what-we-built')} class="text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 text-base font-medium transition rounded-xl px-4 py-3 text-left">
        What We've Built
      </button>
      <button on:click={() => scrollToSection('who-its-for')} class="text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 text-base font-medium transition rounded-xl px-4 py-3 text-left">
        Who It's For
      </button>
      <button on:click={() => scrollToSection('how-it-works')} class="text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 text-base font-medium transition rounded-xl px-4 py-3 text-left">
        How It Works
      </button>
      <button on:click={() => scrollToSection('pricing')} class="text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 text-base font-medium transition rounded-xl px-4 py-3 text-left">
        Pricing
      </button>
      <div class="border-t border-zinc-100 my-2 pt-2 flex flex-col gap-2">
        <button
          on:click={() => scrollToSection('gtm-teardown')}
          class="w-full text-zinc-800 bg-zinc-100 hover:bg-zinc-200 text-base font-medium transition py-3 rounded-xl text-center"
        >
          Free GTM Teardown
        </button>
        <button
          data-cal-link="hafid-ahlaqach-nigixz/15min"
          data-cal-namespace="15min"
          data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
          class="w-full text-white bg-zinc-900 hover:bg-zinc-800 text-base font-semibold transition flex items-center justify-center rounded-xl py-3 shadow-sm"
        >
          Book a call
        </button>
      </div>
    </div>
  </div>
{/if}
