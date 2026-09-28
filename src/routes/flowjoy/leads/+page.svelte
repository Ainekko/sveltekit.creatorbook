<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchFlowjoyLeads, updateFlowjoyLeadStatus, type FlowjoyLeadResponse } from '$lib/api/flowjoy';

  let password = '';
  let isAuthenticated = false;
  let leads: FlowjoyLeadResponse[] = [];
  let loading = false;
  let authError = '';
  let searchQuery = '';
  let selectedStatusFilter = 'all';
  let updatingId: string | null = null;
  let copiedEmail: string | null = null;

  const STATUSES = ['new', 'reviewed', 'contacted', 'qualified', 'converted', 'archived'];

  onMount(() => {
    const saved = localStorage.getItem('flowjoy_dash_pwd');
    if (saved) {
      password = saved;
      loadLeads();
    }
  });

  async function handleLogin(e?: Event) {
    if (e) e.preventDefault();
    if (!password.trim()) return;

    loading = true;
    authError = '';
    const res = await fetchFlowjoyLeads(password);
    loading = false;

    if (res.success && res.data) {
      isAuthenticated = true;
      leads = res.data;
      localStorage.setItem('flowjoy_dash_pwd', password.trim());
    } else {
      authError = res.error || 'Authentication failed. Please verify your password.';
      isAuthenticated = false;
    }
  }

  async function loadLeads() {
    loading = true;
    const res = await fetchFlowjoyLeads(password);
    loading = false;

    if (res.success && res.data) {
      isAuthenticated = true;
      leads = res.data;
    } else if (res.error?.includes('password')) {
      isAuthenticated = false;
      authError = res.error;
    }
  }

  async function handleStatusChange(leadId: string, newStatus: string) {
    updatingId = leadId;
    const res = await updateFlowjoyLeadStatus(leadId, newStatus, password);
    updatingId = null;

    if (res.success && res.data) {
      leads = leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l));
    }
  }

  function handleLogout() {
    localStorage.removeItem('flowjoy_dash_pwd');
    password = '';
    isAuthenticated = false;
    leads = [];
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedEmail = text;
    setTimeout(() => {
      if (copiedEmail === text) copiedEmail = null;
    }, 2000);
  }

  function formatDate(iso: string) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return iso;
    }
  }

  // Reactive filters
  $: filteredLeads = leads.filter((l) => {
    const matchesSearch =
      !searchQuery.trim() ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company_url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.bottleneck && l.bottleneck.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      selectedStatusFilter === 'all' || l.status.toLowerCase() === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // KPI counts
  $: totalCount = leads.length;
  $: newCount = leads.filter((l) => l.status === 'new').length;
  $: reviewedCount = leads.filter((l) => l.status === 'reviewed').length;
  $: contactedCount = leads.filter((l) => l.status === 'contacted').length;
  $: convertedCount = leads.filter((l) => l.status === 'converted').length;
</script>

<svelte:head>
  <title>Flowjoy • Teardown Submissions Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-[#09090B] font-[Poppins] text-white p-4 sm:p-8">
  <div class="max-w-7xl mx-auto">
    <!-- Unauthenticated Login Screen -->
    {#if !isAuthenticated}
      <div class="min-h-[70vh] flex items-center justify-center">
        <div class="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#141417] border border-zinc-800 shadow-2xl text-center">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-6">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2 class="text-2xl font-bold text-white mb-2">Flowjoy Submissions</h2>
          <p class="text-xs text-zinc-400 mb-6">Enter your dashboard password to view teardown leads</p>

          <form on:submit={handleLogin} class="space-y-4">
            <input
              type="password"
              bind:value={password}
              placeholder="Dashboard password..."
              required
              class="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/80 focus:border-amber-400 text-white text-sm outline-none transition"
            />

            {#if authError}
              <p class="text-xs text-rose-400 text-left bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/80">
                {authError}
              </p>
            {/if}

            <button
              type="submit"
              disabled={loading}
              class="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold uppercase tracking-wider transition cursor-pointer disabled:opacity-50"
            >
              {#if loading}
                Unlocking...
              {:else}
                Unlock Dashboard &rarr;
              {/if}
            </button>
          </form>
        </div>
      </div>
    {:else}
      <!-- Dashboard Top Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-zinc-800/80 mb-8">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Live Submissions Feed
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Flowjoy Leads Dashboard</h1>
        </div>

        <div class="flex items-center gap-3">
          <button
            on:click={loadLeads}
            disabled={loading}
            class="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-semibold text-zinc-300 transition flex items-center gap-2 cursor-pointer"
          >
            <svg class="w-3.5 h-3.5 {loading ? 'animate-spin' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>

          <button
            on:click={handleLogout}
            class="px-4 py-2.5 rounded-xl bg-zinc-900/60 hover:bg-rose-950/40 hover:text-rose-400 border border-zinc-800 text-xs font-medium text-zinc-400 transition cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-4 mb-8">
        <div class="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-zinc-800/80">
          <span class="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">Total Requests</span>
          <span class="text-2xl sm:text-3xl font-bold text-white">{totalCount}</span>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-amber-900/40">
          <span class="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block mb-1">New</span>
          <span class="text-2xl sm:text-3xl font-bold text-amber-400">{newCount}</span>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-blue-900/40">
          <span class="text-[11px] uppercase tracking-wider text-blue-400 font-semibold block mb-1">Reviewed</span>
          <span class="text-2xl sm:text-3xl font-bold text-blue-400">{reviewedCount}</span>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-purple-900/40">
          <span class="text-[11px] uppercase tracking-wider text-purple-400 font-semibold block mb-1">Contacted</span>
          <span class="text-2xl sm:text-3xl font-bold text-purple-400">{contactedCount}</span>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-emerald-900/40">
          <span class="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block mb-1">Converted</span>
          <span class="text-2xl sm:text-3xl font-bold text-emerald-400">{convertedCount}</span>
        </div>
      </div>

      <!-- Search & Status Filter Controls -->
      <div class="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-6">
        <!-- Status Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {#each ['all', 'new', 'reviewed', 'contacted', 'converted', 'archived'] as st}
            <button
              on:click={() => (selectedStatusFilter = st)}
              class="px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition whitespace-nowrap cursor-pointer {selectedStatusFilter === st
                ? 'bg-white text-zinc-950 shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'}"
            >
              {st}
            </button>
          {/each}
        </div>

        <!-- Search Bar -->
        <div class="relative w-full sm:w-80">
          <svg class="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search company, email, problem..."
            class="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 focus:border-zinc-600 text-xs text-white placeholder-zinc-500 outline-none transition"
          />
        </div>
      </div>

      <!-- Leads List / Table -->
      {#if filteredLeads.length === 0}
        <div class="p-12 text-center rounded-3xl bg-[#141417] border border-zinc-800/80">
          <p class="text-zinc-400 text-sm">No submissions found matching your filters.</p>
        </div>
      {:else}
        <div class="space-y-3.5">
          {#each filteredLeads as lead (lead.id)}
            <div class="p-5 sm:p-6 rounded-2xl bg-[#141417] border border-zinc-800/80 hover:border-zinc-700 transition flex flex-col md:flex-row md:items-start justify-between gap-5">
              <!-- Lead Core Info -->
              <div class="space-y-2.5 flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2.5">
                  <!-- Company URL -->
                  <a
                    href={lead.company_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-base font-bold text-white hover:text-amber-400 transition inline-flex items-center gap-1.5"
                  >
                    <span>{lead.company_url.replace(/^https?:\/\//, '')}</span>
                    <svg class="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  <!-- Source Badge -->
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800/90 border border-zinc-700 text-zinc-300 font-mono">
                    {lead.source}
                  </span>

                  <!-- Timestamp -->
                  <span class="text-[11px] text-zinc-500 ml-auto md:ml-0">
                    {formatDate(lead.created_at)}
                  </span>
                </div>

                <!-- Email & Copy Button -->
                <div class="flex items-center gap-2">
                  <a
                    href="mailto:{lead.email}"
                    class="text-xs text-zinc-300 hover:text-white transition font-medium underline underline-offset-2"
                  >
                    {lead.email}
                  </a>
                  <button
                    on:click={() => copyToClipboard(lead.email)}
                    title="Copy email"
                    class="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
                  >
                    {copiedEmail === lead.email ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                <!-- Bottleneck / Notes -->
                {#if lead.bottleneck}
                  <div class="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed font-light">
                    <span class="font-medium text-zinc-400 block mb-0.5 text-[10px] uppercase tracking-wider">Funnel Bottleneck:</span>
                    {lead.bottleneck}
                  </div>
                {/if}
              </div>

              <!-- Status Action Selector -->
              <div class="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800">
                <span class="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Status</span>
                <select
                  value={lead.status}
                  disabled={updatingId === lead.id}
                  on:change={(e) => handleStatusChange(lead.id, e.currentTarget.value)}
                  class="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700 text-white outline-none cursor-pointer focus:border-amber-400 transition"
                >
                  {#each STATUSES as st}
                    <option value={st}>{st}</option>
                  {/each}
                </select>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    {/if}
  </div>
</div>
