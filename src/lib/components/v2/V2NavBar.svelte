<script>
  let isMenuOpen = false;

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
      <a href="/" class="text-zinc-900 hover:text-zinc-700 transition flex items-center gap-2.5">
        <img src="/logo-green.png" alt="Flowjoy" class="w-7 h-7 object-contain" />
        <span class="text-xl font-semibold">
          flow<span class="font-[Pacifico]">j</span>oy
        </span>
      </a>

      <!-- Desktop Nav -->
      <div class="hidden lg:flex items-center gap-1">
        <button on:click={() => scrollToSection('case-studies')} class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50">
          Work
        </button>
        <button on:click={() => scrollToSection('how-it-works')} class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50">
          How it works
        </button>
        <button on:click={() => scrollToSection('pricing')} class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50">
          Pricing
        </button>
        <button on:click={() => scrollToSection('why-us')} class="text-zinc-600 hover:text-zinc-900 text-sm font-medium transition rounded-lg px-4 py-2 hover:bg-zinc-50">
          Why us
        </button>
      </div>

      <!-- Desktop CTA -->
      <div class="hidden lg:flex items-center gap-3">
        <button
          data-cal-link="hafid-ahlaqach-nigixz/15min"
          data-cal-namespace="15min"
          data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
          class="bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold transition rounded-lg px-5 py-2 shadow-sm"
        >
          Book a call
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button on:click={() => isMenuOpen = !isMenuOpen} class="lg:hidden text-zinc-600 hover:text-zinc-900 p-2 rounded-lg hover:bg-zinc-50 transition" aria-label="Toggle menu">
        {#if isMenuOpen}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        {:else}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        {/if}
      </button>
    </div>
  </div>
</nav>

{#if isMenuOpen}
  <div class="lg:hidden fixed inset-x-0 top-16 z-40 bg-white/95 backdrop-blur-xl shadow-lg border-b border-zinc-100">
    <div class="flex flex-col p-4 space-y-1">
      <button on:click={() => scrollToSection('case-studies')} class="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-base font-medium transition rounded-lg px-4 py-3 text-left">Work</button>
      <button on:click={() => scrollToSection('how-it-works')} class="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-base font-medium transition rounded-lg px-4 py-3 text-left">How it works</button>
      <button on:click={() => scrollToSection('pricing')} class="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-base font-medium transition rounded-lg px-4 py-3 text-left">Pricing</button>
      <button on:click={() => scrollToSection('why-us')} class="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-base font-medium transition rounded-lg px-4 py-3 text-left">Why us</button>
      <div class="border-t border-zinc-100 my-3"></div>
      <button
        data-cal-link="hafid-ahlaqach-nigixz/15min"
        data-cal-namespace="15min"
        data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
        class="w-full text-white bg-zinc-900 hover:bg-zinc-800 text-base font-semibold transition flex items-center justify-center rounded-lg px-4 py-3 shadow-sm"
      >
        Book a call
      </button>
    </div>
  </div>
{/if}
