```svelte
<script lang="ts">
  import { Calendar, Eye, FileText } from 'lucide-svelte';
  import type { BlogPost } from './types';

  export let blogPosts: BlogPost[];

  function getStatusColor(status: string) {
    switch (status) {
      case 'published': return 'text-emerald-600 bg-emerald-100';
      case 'draft': return 'text-blue-600 bg-blue-100';
      case 'ready': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-bold text-gray-900">Generated Content</h2>
    <div class="text-sm text-gray-600">{blogPosts.length} posts total</div>
  </div>

  <div class="grid gap-6">
    {#each blogPosts as post (post.id)}
      <div class="bg-white rounded-xl p-8 border border-gray-200">
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>

            <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              {#if post.status === 'published'}
                <span class="flex items-center"><Calendar class="w-4 h-4 mr-1" /> Published {post.publishedAt}</span>
                <span class="flex items-center"><Eye class="w-4 h-4 mr-1" /> {post.views} views</span>
                <span class="flex items-center">📊 {post.engagement} engagement</span>
              {:else}
                <span class="flex items-center"><FileText class="w-4 h-4 mr-1" /> {post.wordCount} words</span>
                <span class="flex items-center"><Calendar class="w-4 h-4 mr-1" /> Created {post.createdAt}</span>
              {/if}
              <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>{post.status}</span>
            </div>

            <div class="flex flex-wrap gap-2">
              {#each post.keywords as keyword}
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{keyword}</span>
              {/each}
            </div>
          </div>

          <div class="ml-6 flex space-x-2">
            {#if post.status === 'draft'}
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Publish</button>
            {/if}
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">View</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
```