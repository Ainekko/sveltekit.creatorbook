<script lang="ts">
  let companyUrl = '';
  let email = '';
  let bottleneck = '';
  let submitted = false;
  let loading = false;

  async function handleTeardownSubmit(e: Event) {
    e.preventDefault();
    if (!companyUrl || !email) return;

    loading = true;
    setTimeout(() => {
      loading = false;
      submitted = true;
    }, 800);
  }
</script>

<section id="gtm-teardown" class="py-24 bg-[#09090A] font-[Poppins] text-white border-t border-[#2C2420] relative overflow-hidden">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

    <div class="p-8 sm:p-14 rounded-3xl bg-[#1C1714] border border-[#2C2420] shadow-2xl backdrop-blur-xl text-center">

      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-zinc-400 mb-6">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        Free teardown &amp; prototype
      </div>

      <h2 class="text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
        Give us one broken workflow.<br class="hidden md:block" />
        <span class="font-['Instrument_Serif'] italic font-normal text-zinc-500">We'll prototype the automation.</span>
      </h2>

      <p class="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed font-light mb-10">
        Tell us where your growth process is costing you time. We will inspect your stack and deliver a proposed architecture and working prototype walkthrough.
      </p>

      {#if submitted}
        <div class="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 text-center animate-in zoom-in-95 duration-200">
          <div class="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Teardown request received!</h3>
          <p class="text-sm text-zinc-300 max-w-md mx-auto mb-6 font-light">
            We will review <strong>{companyUrl}</strong> and send your custom GTM architecture breakdown to <strong>{email}</strong>.
          </p>
          <button
            data-cal-link="hafid-ahlaqach-nigixz/15min"
            data-cal-namespace="15min"
            data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
            class="inline-flex items-center gap-2 bg-white text-zinc-950 font-semibold px-6 py-3.5 rounded-xl text-sm hover:bg-zinc-100 transition shadow-md"
          >
            Want to discuss live? Book 15 min on Cal
          </button>
        </div>
      {:else}
        <form on:submit={handleTeardownSubmit} class="space-y-4 max-w-xl mx-auto text-left">
          <div>
            <label for="company-url" class="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
              Company website / domain
            </label>
            <input
              id="company-url"
              type="text"
              required
              bind:value={companyUrl}
              placeholder="e.g. acme.com"
              class="w-full px-4 py-3.5 rounded-xl bg-[#09090A] border border-[#2C2420] focus:border-zinc-600 text-white placeholder-zinc-600 text-sm outline-none transition"
            />
          </div>

          <div>
            <label for="work-email" class="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
              Work email
            </label>
            <input
              id="work-email"
              type="email"
              required
              bind:value={email}
              placeholder="founder@acme.com"
              class="w-full px-4 py-3.5 rounded-xl bg-[#09090A] border border-[#2C2420] focus:border-zinc-600 text-white placeholder-zinc-600 text-sm outline-none transition"
            />
          </div>

          <div>
            <label for="bottleneck-desc" class="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
              What is your biggest GTM bottleneck? (Optional)
            </label>
            <textarea
              id="bottleneck-desc"
              rows="3"
              bind:value={bottleneck}
              placeholder="e.g. We spend 10 hours a week manually researching and qualifying leads from Apollo before drafting cold emails."
              class="w-full px-4 py-3.5 rounded-xl bg-[#09090A] border border-[#2C2420] focus:border-zinc-600 text-white placeholder-zinc-600 text-sm outline-none transition"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            class="w-full py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-base transition shadow-lg flex items-center justify-center gap-2 mt-4"
          >
            {#if loading}
              <svg class="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Analyzing stack...
            {:else}
              <span>Get your free GTM teardown</span>
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            {/if}
          </button>

          <p class="text-center text-xs text-zinc-500 mt-3 font-light">
            Zero marketing spam. 100% technical teardown crafted by an engineer.
          </p>
        </form>
      {/if}

    </div>

  </div>
</section>
