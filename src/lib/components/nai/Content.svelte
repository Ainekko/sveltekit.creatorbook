<!-- src/lib/components/nai/content.svelte -->

<script lang="ts">
  import { RefreshCw, FileText, Calendar, Clock, Save, X, ChevronRight } from 'lucide-svelte';
  import { marked } from 'marked';
  import { contentStore } from '$lib/components/nai/stores';
  import type { BlogPost, PostStatus } from '$lib/components/nai/types';
  import type { UUID } from 'crypto';
  import {API_BASE_URL} from '$lib/config'


  export let projectId: UUID;

  $: posts = $contentStore.blogPosts as BlogPost[];
  $: isLoading = $contentStore.postsLoading;

  const authToken = localStorage.getItem('token');
  const apiBaseUrl = API_BASE_URL;

  let selectedStatus: PostStatus | 'all' = 'all';
  let selectedPost: BlogPost | null = null;
  let editContent: string = '';
  let isSaving: boolean = false;
  let isEditing: boolean = false;

  interface StatusOption {
    value: PostStatus | 'all';
    label: string;
  }

  const statusOptions: StatusOption[] = [
    { value: 'all', label: 'All' },
    { value: 'draft', label: 'Drafts' },
    { value: 'published', label: 'Published' },
    { value: 'scheduled', label: 'Scheduled' }
  ];

  $: filteredPosts = selectedStatus === 'all' 
    ? posts 
    : posts.filter(p => p.status === selectedStatus as PostStatus);

  async function refreshPosts(): Promise<void> {
    await contentStore.loadBlogPosts(projectId);
  }

  async function publishPost(): Promise<void> {
    if (!selectedPost) return;
    try {
      const response = await fetch(`${apiBaseUrl}/orion/api/blog-posts/${selectedPost.id}/publish/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        await refreshPosts();
        closeDrawer();
      }
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  }

  let isPublishing: boolean = false;

  async function publishToWordPress(): Promise<void> {
    if (!selectedPost) return;
    
    isPublishing = true;
    try {
      const response = await fetch(
        `${apiBaseUrl}/orion/api/blog-posts/${selectedPost.id}/publish_to_wordpress/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        alert(`✓ Published! View it here: ${data.wp_url}`);
        await refreshPosts();
        closeDrawer();
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail || 'Failed to publish'}`);
      }
    } catch (error) {
      console.error('Error publishing to WordPress:', error);
      alert('Error publishing to WordPress');
    } finally {
      isPublishing = false;
    }
  }

  async function saveContent(): Promise<void> {
    if (!editContent.trim()) {
      alert('Content cannot be empty');
      return;
    }
    if (!selectedPost) return;

    isSaving = true;
    try {
      const response = await fetch(`${apiBaseUrl}/orion/api/blog_posts/${selectedPost.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: editContent })
      });
      if (response.ok) {
        await refreshPosts();
        closeDrawer();
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail || 'Failed to save'}`);
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving post');
    } finally {
      isSaving = false;
    }
  }

  function openPost(post: BlogPost): void {
    selectedPost = post;
    editContent = post.content || '';
    isEditing = false;
  }

  function closeDrawer(): void {
    selectedPost = null;
    editContent = '';
    isEditing = false;
  }

  function getStatusColor(status: PostStatus): string {
    const colors: Record<PostStatus, string> = {
      draft: 'bg-yellow-100 text-yellow-800',
      published: 'bg-emerald-100 text-emerald-700',
      scheduled: 'bg-sky-100 text-sky-700'
    };
    return colors[status] || colors.draft;
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function getSnippet(text: string, length: number = 90): string {
    return text.substring(0, length) + (text.length > length ? '...' : '');
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-2xl font-bold text-zinc-900 tracking-tight">Blog Posts</h2>
      <p class="text-sm text-gray-500 mt-1">
        {filteredPosts.length} {selectedStatus !== 'all' ? selectedStatus : ''} {filteredPosts.length === 1 ? 'post' : 'posts'}
      </p>
    </div>

    <div class="flex items-center gap-3">
      <select 
        bind:value={selectedStatus}
        class="px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
      >
        {#each statusOptions as opt}
          <option value={opt.value}>{opt.label}</option>
        {/each}
      </select>

      <button 
        on:click={refreshPosts}
        disabled={isLoading}
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zince-700 text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw class={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        <span>{isLoading ? 'Loading' : 'Refresh'}</span>
      </button>
    </div>
  </div>

  <!-- Posts Grid -->
  {#if filteredPosts.length === 0}
    <div class="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No Posts Yet</h3>
      <p class="text-gray-500">Generate blog posts to get started</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each filteredPosts as post (post.id)}
        <button
          on:click={() => openPost(post)}
          class="text-left bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
        >
          <div class="flex items-start justify-between mb-4">
            <span class={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
              {post.status}
            </span>
            <ChevronRight class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>

          <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>

          <p class="text-sm text-gray-600 mb-4 line-clamp-2">
            {getSnippet(post.content)}
          </p>

          <div class="flex items-center gap-4 text-xs text-gray-500">
            <div class="flex items-center gap-1">
              <Calendar class="w-3.5 h-3.5" />
              {formatDate(post.created_at)}
            </div>
            {#if post.scheduled_time}
              <div class="flex items-center gap-1 text-sky-600">
                <Clock class="w-3.5 h-3.5" />
                {formatDate(post.scheduled_time)}
              </div>
            {/if}
          </div>
        </button>
      {/each}
    </div>
  {/if}
</div>

<!-- Drawer Modal -->
{#if selectedPost}
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" on:click={closeDrawer}>
    <div 
      class="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right"
      on:click|stopPropagation
    >
      <!-- Header -->
      <div class="flex items-start justify-between p-6 border-b border-gray-200">
        <div>
          <span class={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mb-3 ${getStatusColor(selectedPost.status)}`}>
            {selectedPost.status}
          </span>
          <h2 class="text-2xl font-semibold text-gray-900">
            {selectedPost.title}
          </h2>
        </div>
        <button
          on:click={closeDrawer}
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X class="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6">
        {#if isEditing}
          <textarea
            bind:value={editContent}
            class="w-full h-full p-4 border border-gray-200 rounded-lg font-mono text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            placeholder="Enter content..."
          />
        {:else}
          <div class="prose prose-sm max-w-none">
            {@html marked(selectedPost.content || '')}
          </div>
        {/if}
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-200 p-6 bg-gray-50 flex items-center gap-3">
        {#if selectedPost.status === 'draft'}
          <button
            on:click={publishPost}
            class="px-4 py-2 rounded-lg bg-orange-400 hover:bg-orange-300 text-black text-sm font-medium transition-all active:scale-95"
          >
            Publish Locally
          </button>
          <button
            on:click={publishToWordPress}
            disabled={isPublishing}
            class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium transition-all active:scale-95 disabled:cursor-not-allowed"
          >
            {#if isPublishing}
              Publishing to WordPress...
            {:else}
              Publish to WordPress
            {/if}
          </button>
        {:else if selectedPost.published_to_wp}
          <a
            href={selectedPost.wp_url}
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-all"
          >
            View on WordPress →
          </a>
        {/if}
        
        {#if isEditing}
          <button
            on:click={saveContent}
            disabled={isSaving}
            class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-medium transition-all disabled:opacity-50 active:scale-95"
          >
            <Save class="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
          <button
            on:click={closeDrawer}
            class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium transition-all active:scale-95"
          >
            Cancel
          </button>
        {:else}
          <button
            on:click={() => isEditing = true}
            class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-all active:scale-95"
          >
            <span>Edit</span>
          </button>
          <button
            on:click={closeDrawer}
            class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium transition-all active:scale-95"
          >
            Close
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  :global(.animate-in.slide-in-from-right) {
    animation: slideInRight 0.3s ease-out;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  :global(.prose p) {
    margin: 0.75em 0;
    color: #475569;
    font-weight: 400;
  }

  :global(.prose h1),
  :global(.prose h2),
  :global(.prose h3),
  :global(.prose h4),
  :global(.prose h5),
  :global(.prose h6) {
    font-weight: 500;
    margin: 1em 0 0.5em 0;
    line-height: 1.3;
    color: #1e293b;
  }

  :global(.prose h1) { font-size: 1.5em; }
  :global(.prose h2) { font-size: 1.25em; }
  :global(.prose h3) { font-size: 1.1em; }

  :global(.prose code) {
    background: #f1f5f9;
    padding: 0.2em 0.4em;
    border-radius: 0.25em;
    font-size: 0.9em;
    color: #1e293b;
  }

  :global(.prose pre) {
    background: #1e293b;
    color: #f1f5f9;
    padding: 1em;
    border-radius: 0.5em;
    overflow-x: auto;
    margin: 1em 0;
  }

  :global(.prose ul),
  :global(.prose ol) {
    margin: 1em 0;
    padding-left: 2em;
  }

  :global(.prose li) {
    margin: 0.5em 0;
  }

  :global(.prose blockquote) {
    border-left: 4px solid #3b82f6;
    padding-left: 1em;
    margin: 1em 0;
    color: #64748b;
    font-style: italic;
  }

  :global(.prose a) {
    color: #3b82f6;
    text-decoration: underline;
  }

  :global(.prose a:hover) {
    color: #1e40af;
  }
</style>