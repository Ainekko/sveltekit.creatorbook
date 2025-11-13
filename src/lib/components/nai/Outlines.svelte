<!-- Outlines.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { RefreshCw, FileText, ArrowRight, Calendar, Check, Loader2, List, Target } from 'lucide-svelte';
  import { contentStore } from '$lib/components/nai/stores';
  import {API_BASE_URL} from '$lib/config'
  import { fade, scale, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let projectId: string;

  $: outlines = $contentStore.outlines;
  $: isLoading = $contentStore.outlinesLoading;

  let selectedOutlineIds: string[] = [];
  let isGeneratingPosts = false;
  let showProgressDialog = false;
  let currentStep = 0;

  const authToken = localStorage.getItem('token');
  const apiBaseUrl = API_BASE_URL;

  const progressSteps = [
    { label: 'Processing Outlines', description: 'Preparing content structure' },
    { label: 'Writing Content', description: 'Creating engaging blog posts' },
    { label: 'Optimizing SEO', description: 'Adding keywords and meta data' },
    { label: 'Finalizing Posts', description: 'Polishing and formatting' }
  ];

  function generateRandomGradient(): string {
    const gradients = [
      'from-violet-500 to-purple-600',
      'from-blue-500 to-cyan-600',
      'from-emerald-500 to-teal-600',
      'from-orange-500 to-pink-600',
      'from-indigo-500 to-purple-600'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }

  function toggleOutlineSelection(outlineId: string) {
    if (selectedOutlineIds.includes(outlineId)) {
      selectedOutlineIds = selectedOutlineIds.filter(id => id !== outlineId);
    } else {
      selectedOutlineIds = [...selectedOutlineIds, outlineId];
    }
  }

  function toggleSelectAll() {
    if (selectedOutlineIds.length === outlines.length) {
      selectedOutlineIds = [];
    } else {
      selectedOutlineIds = outlines.map(o => o.id);
    }
  }

  async function refreshOutlines() {
    await contentStore.loadOutlines(projectId);
  }

  async function generatePosts(outlineIds: string[] | null = null) {
    const idsToGenerate = outlineIds || selectedOutlineIds;
    if (idsToGenerate.length === 0) return;
   
    isGeneratingPosts = true;
    showProgressDialog = true;
    currentStep = 0;

    // Simulate progress through steps
    const stepDuration = 20000; // 20 seconds per step
    const stepInterval = setInterval(() => {
      if (currentStep < progressSteps.length - 1) {
        currentStep++;
      }
    }, stepDuration);

    try {
      const response = await fetch(`${apiBaseUrl}/orion/api/generate_posts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: projectId,
          outline_ids: idsToGenerate
        })
      });

      clearInterval(stepInterval);

      if (response.ok) {
        currentStep = progressSteps.length - 1;
        await new Promise(resolve => setTimeout(resolve, 1000));
        await contentStore.loadBlogPosts(projectId);
        selectedOutlineIds = [];
        showProgressDialog = false;
        currentStep = 0;
      } else {
        console.error('Failed to generate posts');
        showProgressDialog = false;
        currentStep = 0;
      }
    } catch (error) {
      console.error('Error generating posts:', error);
      clearInterval(stepInterval);
      showProgressDialog = false;
      currentStep = 0;
    } finally {
      isGeneratingPosts = false;
    }
  }

  async function generateSinglePost(outlineId: string) {
    await generatePosts([outlineId]);
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function parseOutlineContent(content: string): string[] {
    if (typeof content !== 'string' || !content) return [];
    // Split by common outline patterns
    const lines = content.split('\n').filter(line => line.trim());
    return lines.slice(0, 8); // Show first 8 items
  }

  function getWordCount(content: string): number {
    if (typeof content !== 'string' || !content) return 0;
    return content.split(/\s+/).filter(word => word.length > 0).length;
  }

  $: isAllSelected = outlines.length > 0 && selectedOutlineIds.length === outlines.length;
  $: isSomeSelected = selectedOutlineIds.length > 0 && selectedOutlineIds.length < outlines.length;

  onMount(async () => {
    await refreshOutlines();
  });
</script>

<style>
  input[type="checkbox"]:indeterminate {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .shimmer {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
    }
    50% {
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
    }
  }

  .gradient-border {
    position: relative;
    background: white;
    border-radius: 0.75rem;
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 0.75rem;
    padding: 2px;
    background: linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;  /* Add this line */
}
  .gradient-border:hover::before {
    opacity: 1;
  }
</style>

<!-- Progress Dialog -->
{#if showProgressDialog}
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" transition:fade={{ duration: 200 }}>
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden pulse-glow"
      transition:scale={{ duration: 300, easing: cubicOut, start: 0.95 }}
    >
      <!-- Header with gradient -->
      <div class="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shimmer">
            <FileText size={20} class="text-white" />
          </div>
          <div>
            <h3 class="text-lg font-semibold">Generating Blog Posts</h3>
            <p class="text-sm text-white/80">Creating post{selectedOutlineIds.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <!-- Progress Steps -->
      <div class="p-6 space-y-4">
        {#each progressSteps as step, index}
          <div class="flex items-start gap-3" transition:fly={{ y: 20, delay: index * 100 }}>
            <div class="flex-shrink-0 mt-0.5">
              {#if index < currentStep}
                <div class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center" transition:scale={{ duration: 200 }}>
                  <Check size={14} class="text-white" />
                </div>
              {:else if index === currentStep}
                <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <Loader2 size={14} class="text-white animate-spin" />
                </div>
              {:else}
                <div class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
              {/if}
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 {index === currentStep ? 'text-blue-600' : index < currentStep ? 'text-emerald-600' : 'text-gray-400'}">
                {step.label}
              </p>
              <p class="text-xs text-gray-500 mt-0.5">
                {step.description}
              </p>
            </div>
          </div>
        {/each}

        <!-- Progress Bar -->
        <div class="mt-6">
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out shimmer"
              style="width: {((currentStep + 1) / progressSteps.length) * 100}%"
            ></div>
          </div>
          <p class="text-xs text-gray-500 text-center mt-2">
            Step {currentStep + 1} of {progressSteps.length}
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}

<div class="space-y-6 w-full">
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-2xl font-semibold text-zinc-900 tracking-tight">Content Outlines</h2>
      <p class="text-sm text-gray-500 mt-1">
        {outlines.length} outline{outlines.length !== 1 ? 's' : ''} ready
      </p>
    </div>
  </div>

  {#if outlines.length === 0 && !isLoading}
    <div class="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No Outlines Yet</h3>
      <p class="text-gray-500 mb-4">
        Generate outlines from your keywords to get started.
      </p>
    </div>
  {:else}
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isAllSelected}
              indeterminate={isSomeSelected}
              on:change={toggleSelectAll}
              class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="text-sm text-gray-600">
              {selectedOutlineIds.length} of {outlines.length} selected
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 space-y-4">
        {#each outlines as outline, index (outline.id)}
          {@const gradient = generateRandomGradient()}
          <div
            class="gradient-border overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
            on:click={() => toggleOutlineSelection(outline.id)}
            on:keydown={(e) => e.key === 'Enter' && toggleOutlineSelection(outline.id)}
            role="button"
            tabindex="0"
          >
            <!-- Header -->
            <div class="p-4 flex items-center gap-4 bg-white">
              <input
                type="checkbox"
                checked={selectedOutlineIds.includes(outline.id)}
                on:change={() => toggleOutlineSelection(outline.id)}
                on:click={(e) => e.stopPropagation()}
                class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
             
              <div class="flex-1 text-left">
                <h3 class="text-base font-semibold text-gray-900 mb-1">
                  {outline.title}
                </h3>
                <div class="flex items-center gap-4 text-xs text-gray-500">
                  <div class="flex items-center gap-1">
                    <Calendar class="w-3.5 h-3.5" />
                    {formatDate(outline.created_at)}
                  </div>
                  {#if outline.target_keywords && outline.target_keywords.length > 0}
                    <div class="flex items-center gap-1">
                      <Target class="w-3.5 h-3.5" />
                      {outline.target_keywords.length} keyword{outline.target_keywords.length !== 1 ? 's' : ''}
                    </div>
                  {/if}
                  {#if outline.outline_content}
                    <div class="flex items-center gap-1">
                      <List class="w-3.5 h-3.5" />
                      ~{getWordCount(outline.outline_content)} words
                    </div>
                  {/if}
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button
                  on:click={(e) => {
                    e.stopPropagation();
                    generateSinglePost(outline.id);
                  }}
                  disabled={isGeneratingPosts}
                  class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ArrowRight class="w-4 h-4" />
                  Generate Post
                </button>
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br {gradient} flex items-center justify-center">
                  <FileText size={16} class="text-white" />
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="border-t border-gray-200 bg-gray-50 p-4">
              {#if outline.meta_description}
                <div class="mb-4">
                  <p class="text-xs font-medium text-gray-500 mb-1">Meta Description</p>
                  <p class="text-sm text-gray-700 leading-relaxed">
                    {outline.meta_description}
                  </p>
                </div>
              {/if}

              {#if outline.target_keywords && outline.target_keywords.length > 0}
                <div class="mb-4">
                  <p class="text-xs font-medium text-gray-500 mb-2">Target Keywords</p>
                  <div class="flex flex-wrap gap-2">
                    {#each outline.target_keywords as keyword}
                      <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                        {keyword}
                      </span>
                    {/each}
                  </div>
                </div>
              {/if}

              {#if outline.outline_content}
                <div>
                  <p class="text-xs font-medium text-gray-500 mb-2">Outline Structure</p>
                  <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <div class="space-y-2 text-sm text-gray-700">
                      {#each parseOutlineContent(outline.outline_content) as line}
                        <div class="flex items-start gap-2">
                          <div class="w-1.5 h-1.5 rounded-full bg-gradient-to-br {gradient} mt-2 flex-shrink-0"></div>
                          <p class="flex-1">{line}</p>
                        </div>
                      {/each}
                    </div>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>