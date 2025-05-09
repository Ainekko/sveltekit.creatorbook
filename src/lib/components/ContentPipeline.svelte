<!-- src/lib/components/ContentPipeline.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import BlogPostCard from './BlogPostCard.svelte';
  
    export let outlines = [];
    export let blogPosts = [];
    export let projectId = "";
    export let isGeneratingPost = false;
    export let currentGeneratingPostIndex = -1;
  
    const dispatch = createEventDispatcher();
  
    // Create a map connecting outlines with their generated posts
    $: outlinePostMap = createOutlinePostMap(outlines, blogPosts);
    
    function createOutlinePostMap(outlines, posts) {
      const map = new Map();
      
      outlines.forEach((outline, index) => {
        const matchingPost = posts.find(post => 
          post.title?.toLowerCase().includes(outline.title?.toLowerCase()) || 
          (post.outline_index !== undefined && post.outline_index === index)
        );
        
        map.set(index, {
          outline,
          post: matchingPost || null,
          index
        });
      });
      
      return map;
    }
  
    function handleGeneratePost(index, outline) {
      dispatch('generatePost', { index, outline });
    }
    
    function navigateToSection(section) {
      window.location.href = `${projectId}/${section}`;
    }
  </script>
  
  <div class="mb-8">
    <div class="flex items-center mb-4">
      <h2 class="text-xl font-bold text-white">Content Pipeline</h2>
      <div class="ml-auto">
        <div class="flex gap-2 items-center">
          <div class="flex gap-2">
            <span class="flex items-center gap-1 text-xs text-zinc-500">
              <span class="w-3 h-3 inline-block rounded-full bg-violet-400"></span> Outline
            </span>
            <span class="flex items-center gap-1 text-xs text-zinc-500">
              <span class="w-3 h-3 inline-block rounded-full bg-yellow-400"></span> Draft
            </span>
            <span class="flex items-center gap-1 text-xs text-zinc-500">
              <span class="w-3 h-3 inline-block rounded-full bg-green-400"></span> Published
            </span>
          </div>
          <button 
            on:click={() => navigateToSection('seo')}
            class="text-sm text-pink-400 ml-4 hover:underline flex items-center"
          >
            View All Content <span class="text-lg ml-1">→</span>
          </button>
        </div>
      </div>
    </div>
  
    <!-- Content Pipeline Grid - Limited to 3 items -->
    <div class="grid md:grid-cols-3 gap-5">
      {#each [...outlinePostMap.values()].slice(0, 3) as item}
        <BlogPostCard 
          item={item}
          isGenerating={isGeneratingPost && currentGeneratingPostIndex === item.index}
          on:generatePost={() => handleGeneratePost(item.index, item.outline)}
          projectId={projectId}
        />
      {/each}
    </div>
  </div>