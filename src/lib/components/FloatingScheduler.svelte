<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  import { submitFlowjoyLead } from '$lib/api/flowjoy';

  // Controls floating drawer open/close visibility state
  let isOpen = false;
  let activeTab: 'teardown' | 'book' = 'teardown';

  // Teardown form state
  let companyUrl = '';
  let email = '';
  let bottleneck = '';
  let websiteHp = ''; // Honeypot field
  let errorMessage = '';
  let submitted = false;
  let loading = false;

  // Calendar booking state
  let selectedDay: { dayName: string; dayNum: number; dateString: string } | null = null;
  let upcomingDays: Array<{ dayName: string; dayNum: number; dateString: string }> = [];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  onMount(() => {
    // Generate next 5 business days, skipping Sundays
    let list = [];
    let today = new Date();
    let added = 0;
    let dayOffset = 1;
    while (added < 5) {
      let nextDate = new Date();
      nextDate.setDate(today.getDate() + dayOffset);
      let dayIndex = nextDate.getDay();
      
      if (dayIndex !== 0) {
        list.push({
          dayName: daysOfWeek[dayIndex],
          dayNum: nextDate.getDate(),
          dateString: nextDate.toISOString().split('T')[0]
        });
        added++;
      }
      dayOffset++;
    }
    upcomingDays = list;
    selectedDay = list[0];

    // Ensure Cal.com embed is ready
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (!win.Cal) {
        (function (C: any, A: string, L: string) {
          let p = (a: any, ar: any) => a.q.push(ar);
          let d = C.document;
          C.Cal =
            C.Cal ||
            function () {
              let cal = C.Cal;
              let ar = arguments;
              if (!cal.loaded) {
                cal.ns = {};
                cal.q = cal.q || [];
                d.head.appendChild(d.createElement('script')).src = A;
                cal.loaded = true;
              }
              if (ar[0] === L) {
                const api = function () {
                  p(api, arguments);
                };
                const ns = ar[1];
                api.q = api.q || [];
                if (typeof ns === 'string') {
                  cal.ns[ns] = cal.ns[ns] || api;
                  p(cal.ns[ns], ar);
                  p(cal, ['initNamespace', ns]);
                } else p(cal, ar);
                return;
              }
              p(cal, ar);
            };
        })(win, 'https://app.cal.com/embed/embed.js', 'init');
        win.Cal('init', '15min', { origin: 'https://app.cal.com' });
        win.Cal.ns?.['15min']?.('ui', {
          theme: 'light',
          hideEventTypeDetails: false,
          layout: 'month_view'
        });
      }
    }
  });

  function selectDay(day: { dayName: string; dayNum: number; dateString: string }) {
    selectedDay = day;
  }

  function handleClose(e: MouseEvent) {
    e.stopPropagation();
    isOpen = false;
  }

  async function handleTeardownSubmit(e: Event) {
    e.preventDefault();
    if (!companyUrl || !email) return;

    loading = true;
    errorMessage = '';

    const res = await submitFlowjoyLead({
      company_url: companyUrl,
      email,
      bottleneck,
      source: 'floating_scheduler',
      website_hp: websiteHp
    });

    loading = false;
    if (res.success) {
      submitted = true;
    } else {
      errorMessage = res.error || 'Failed to submit request. Please try again.';
    }
  }
</script>

<!-- Collapsed Trigger Bubble -->
{#if !isOpen}
  <button 
    transition:fly={{ y: 20, duration: 400 }}
    on:click={() => isOpen = true}
    aria-label="Get a free GTM teardown or book a call"
    class="fixed bottom-6 left-6 z-[9999] flex items-center gap-3.5 px-4 py-2.5 rounded-full bg-white text-zinc-900 border border-zinc-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.18)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer"
    style="font-family: 'Poppins', sans-serif;"
  >
    <div class="relative w-9 h-9 rounded-full bg-zinc-950 p-1.5 overflow-hidden border border-zinc-200/80 shadow-sm shrink-0 flex items-center justify-center">
      <img 
        src="/flowjoy/flowjoy-brand/LOGO/New logo 500 500 SVG.svg" 
        alt="Flowjoy" 
        class="w-full h-full object-contain"
      />
      <span class="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
    </div>
    <div class="text-left">
      <div class="flex items-center gap-1.5">
        <p class="text-[12px] font-bold text-zinc-900 leading-tight">Get Free GTM Teardown</p>
        <span class="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase tracking-wider border border-emerald-200/60">Free</span>
      </div>
      <p class="text-[10px] text-zinc-500 font-normal leading-tight mt-0.5">Audit your stack • or book a 15-min call</p>
    </div>
    <div class="w-6 h-6 rounded-full bg-zinc-100 group-hover:bg-zinc-950 group-hover:text-white flex items-center justify-center text-zinc-500 transition-colors ml-0.5">
      <svg class="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
      </svg>
    </div>
  </button>
{/if}

<!-- Expanded Floating Widget -->
{#if isOpen}
  <div 
    transition:fly={{ y: 24, duration: 450 }}
    class="fixed bottom-6 left-6 z-[9999] w-[370px] max-w-[calc(100vw-32px)] bg-white rounded-3xl border border-zinc-200/90 shadow-[0_24px_64px_rgba(0,0,0,0.18)] overflow-hidden text-zinc-900"
    style="font-family: 'Poppins', sans-serif;"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-100 bg-zinc-50/50">
      <div class="flex items-center gap-3">
        <div class="relative w-10 h-10 rounded-full bg-zinc-950 p-1.5 overflow-hidden border border-zinc-200/80 shadow-sm shrink-0 flex items-center justify-center">
          <img 
            src="/flowjoy/flowjoy-brand/LOGO/New logo 500 500 SVG.svg" 
            alt="Flowjoy" 
            class="w-full h-full object-contain"
          />
          <span class="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <h4 class="text-[13px] font-bold text-zinc-900 leading-tight">Flowjoy</h4>
            <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 font-semibold border border-emerald-200">GTM Engineering</span>
          </div>
        </div>
      </div>
      <button 
        on:click={handleClose}
        aria-label="Close"
        class="w-8 h-8 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Segmented Tab switcher (Teardown vs Book a Call) -->
    <div class="px-4 pt-4 sm:px-5">
      <div class="p-1 rounded-2xl bg-zinc-100 flex items-center gap-1">
        <button
          type="button"
          on:click={() => activeTab = 'teardown'}
          class="flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer
            {activeTab === 'teardown'
              ? 'bg-white text-zinc-950 shadow-sm font-bold'
              : 'text-zinc-600 hover:text-zinc-900'}"
        >
          <span>Free Teardown</span>
        </button>
        <button
          type="button"
          on:click={() => activeTab = 'book'}
          class="flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer
            {activeTab === 'book'
              ? 'bg-white text-zinc-950 shadow-sm font-bold'
              : 'text-zinc-600 hover:text-zinc-900'}"
        >
          <span>Book a Call</span>
        </button>
      </div>
    </div>

    <!-- TAB 1: Free GTM Teardown -->
    {#if activeTab === 'teardown'}
      <div class="p-4 sm:p-5 space-y-3.5">
        <div class="space-y-1">
          <h3 class="text-sm font-bold text-zinc-900 leading-tight">Request a Free GTM Teardown</h3>
          <p class="text-xs text-zinc-500 font-normal leading-relaxed">
            Give us one broken workflow. We'll inspect your stack and send a custom technical architecture & prototype breakdown.
          </p>
        </div>

        {#if submitted}
          <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 class="text-xs font-bold text-emerald-950">Teardown Request Received!</h4>
            <p class="text-[11px] text-emerald-800 leading-normal">
              We'll review <strong>{companyUrl}</strong> and email your architecture to <strong>{email}</strong>.
            </p>
            <div class="pt-2">
              <button
                type="button"
                on:click={() => activeTab = 'book'}
                class="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition cursor-pointer"
              >
                Want to discuss live? Book 15 min &rarr;
              </button>
            </div>
          </div>
        {:else}
          <form on:submit={handleTeardownSubmit} class="space-y-2.5">
            <!-- Honeypot for bot protection -->
            <input
              type="text"
              name="website_hp"
              bind:value={websiteHp}
              tabindex="-1"
              autocomplete="off"
              style="display:none !important;"
              aria-hidden="true"
            />

            {#if errorMessage}
              <div class="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[11px] leading-tight">
                {errorMessage}
              </div>
            {/if}
            <div>
              <label for="floating-company-url" class="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Company Website / Domain
              </label>
              <input
                id="floating-company-url"
                type="text"
                required
                bind:value={companyUrl}
                placeholder="acme.com"
                class="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-zinc-900 text-zinc-900 placeholder-zinc-400 text-xs outline-none transition"
              />
            </div>

            <div>
              <label for="floating-work-email" class="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Work Email
              </label>
              <input
                id="floating-work-email"
                type="email"
                required
                bind:value={email}
                placeholder="founder@acme.com"
                class="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-zinc-900 text-zinc-900 placeholder-zinc-400 text-xs outline-none transition"
              />
            </div>

            <div>
              <label for="floating-bottleneck" class="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Current Bottleneck <span class="text-zinc-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="floating-bottleneck"
                type="text"
                bind:value={bottleneck}
                placeholder="e.g. Lead enrichment, cold outreach, CRM sync..."
                class="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-zinc-900 text-zinc-900 placeholder-zinc-400 text-xs outline-none transition"
              />
            </div>

            <!-- Action Button -->
            <button
              type="submit"
              disabled={loading}
              class="w-full py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-zinc-950/15 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer mt-1"
            >
              {#if loading}
                <span>Submitting...</span>
              {:else}
                <span>Get a Free GTM Teardown</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              {/if}
            </button>
          </form>

          <!-- Alternative Call Switcher -->
          <div class="pt-1 text-center">
            <button
              type="button"
              on:click={() => activeTab = 'book'}
              class="text-[11px] text-zinc-500 hover:text-zinc-900 transition font-medium cursor-pointer inline-flex items-center gap-1"
            >
              <span>Prefer to talk live?</span>
              <span class="text-zinc-900 font-semibold underline underline-offset-2">Book a 15-min call &rarr;</span>
            </button>
          </div>
        {/if}
      </div>
    {/if}

    <!-- TAB 2: Book a 15-min Call -->
    {#if activeTab === 'book'}
      <div class="p-4 sm:p-5 space-y-3.5">
        <div class="space-y-1">
          <div class="flex items-center gap-1.5 text-emerald-700 text-[10px] font-semibold tracking-wide uppercase">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            15-Min Live Scoping
          </div>
          <h3 class="text-sm font-bold text-zinc-900 leading-tight">Book a 15-Min Discovery Call</h3>
          <p class="text-xs text-zinc-500 font-normal leading-relaxed">
            Pick a day to talk live. Walk us through your repetitive sales & lead workflows — we'll map how to automate them.
          </p>
        </div>

        <!-- Date selector buttons -->
        <div class="space-y-1.5">
          <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Select preferred day</p>
          <div class="grid grid-cols-5 gap-1.5">
            {#each upcomingDays as day (day.dateString)}
              {@const isSelected = selectedDay?.dateString === day.dateString}
              <button 
                type="button"
                on:click={() => selectDay(day)}
                class="flex flex-col items-center justify-center py-2.5 rounded-xl border transition-all duration-200 cursor-pointer
                  {isSelected 
                    ? 'bg-zinc-950 border-zinc-950 text-white font-semibold shadow-sm' 
                    : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-white hover:border-zinc-300'}"
              >
                <span class="text-[10px] uppercase tracking-wider font-medium opacity-80">{day.dayName}</span>
                <span class="text-xs font-bold mt-0.5 font-mono">{day.dayNum}</span>
              </button>
            {/each}
          </div>
        </div>

        <!-- Book Action Button -->
        <div class="space-y-2 pt-1">
          {#if selectedDay}
            <button 
              data-cal-link="hafid-ahlaqach-nigixz/15min?date={selectedDay.dateString}"
              data-cal-namespace="15min"
              data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
              class="w-full py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-zinc-950/15 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Confirm 15-Min Call</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          {/if}

          <!-- Back to Teardown link -->
          <div class="text-center pt-0.5">
            <button
              type="button"
              on:click={() => activeTab = 'teardown'}
              class="text-[11px] text-zinc-500 hover:text-zinc-900 transition font-medium cursor-pointer inline-flex items-center gap-1"
            >
              <span>Prefer an async review?</span>
              <span class="text-zinc-900 font-semibold underline underline-offset-2">Get a Free Teardown &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    {/if}

    <!-- Footer link -->
    <div class="px-4 py-3 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
      <span>100% Code Ownership</span>
      <a 
        href="/#pricing"
        on:click={() => isOpen = false}
        class="text-zinc-700 hover:text-zinc-950 font-semibold hover:underline"
      >
        View Pricing &rarr;
      </a>
    </div>
  </div>
{/if}
