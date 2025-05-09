<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { projectData, blogPosts, isLoading, error } from '$lib/stores';
    
    let blogPost;
    let isEditing = true;
    let isSaving = false;
    let originalContent = '';
    let editedContent = '';
    let editedTitle = '';
    
    // Track if changes have been made
    $: hasChanges = editedContent !== originalContent || editedTitle !== blogPost?.title;
    
    // Extract the blogPost based on the slug from the params
    $: {
      const slug = $page.params.slug;
      
      if ($blogPosts && $blogPosts.length > 0) {
        blogPost = $blogPosts.find(post => post.slug === slug);
        
        if (blogPost && !originalContent) {
          // Initialize the form when we first find the blog post
          originalContent = blogPost.content || '';
          editedContent = blogPost.content || '';
          editedTitle = blogPost.title || '';
        }
      }
    }
    
    // Save changes to the blog post
    async function saveChanges() {
      if (!hasChanges || !blogPost) return;
      
      isSaving = true;
      const token = localStorage.getItem('token');
      
      try {
        const response = await fetch(`https://api.s-tierproject.online/projects/blogposts/${blogPost.id}/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            content: editedContent,
            title: editedTitle
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to save changes');
        }
        
        const updatedPost = await response.json();
        
        // Update the specific blog post in the blog posts array
        if ($blogPosts) {
          const updatedBlogPosts = $blogPosts.map(post => 
            post.id === blogPost.id ? updatedPost : post
          );
          
          // Update the project store with the updated blog posts
          // This assumes that latest_run.blog_posts is the path to update
          if ($projectData && $projectData.latest_run) {
            const updatedProject = {
              ...$projectData,
              latest_run: {
                ...$projectData.latest_run,
                blog_posts: updatedBlogPosts
              }
            };
            
            // Update the project store with our single project
            const updatedProjectArray = [updatedProject];
            projectStore.setProject(updatedProjectArray);
          }
        }
        
        blogPost = updatedPost;
        originalContent = editedContent;
        
        alert('Changes saved successfully!');
      } catch (error) {
        console.error('Error saving changes:', error);
        alert(`Failed to save changes: ${error.message}`);
      } finally {
        isSaving = false;
      }
    }
    
    // Publish the blog post
    async function publishPost() {
      if (!blogPost) return;
      const token = localStorage.getItem('token');
      
      try {
        // Save any pending changes first
        if (hasChanges) {
          await saveChanges();
        }
        
        const response = await fetch(`https://api.s-tierproject.online/projects/blogposts/${blogPost.id}/publish`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to publish post');
        }
        
        const updatedPost = await response.json();
        
        // Update the local blogPost object and the store
        blogPost = { ...blogPost, is_published: true };
        
        // Update the specific blog post in the blog posts array
        if ($blogPosts) {
          const updatedBlogPosts = $blogPosts.map(post => 
            post.id === blogPost.id ? { ...post, is_published: true } : post
          );
          
          // Update the project store with the updated blog posts
          if ($projectData && $projectData.latest_run) {
            const updatedProject = {
              ...$projectData,
              latest_run: {
                ...$projectData.latest_run,
                blog_posts: updatedBlogPosts
              }
            };
            
            // Update the project store with our single project
            const updatedProjectArray = [updatedProject];
            projectStore.setProject(updatedProjectArray);
          }
        }
        
        alert('Post published successfully!');
      } catch (error) {
        console.error('Error publishing post:', error);
        alert(`Failed to publish post: ${error.message}`);
      }
    }
    
    // Unpublish the blog post
    async function unpublishPost() {
      if (!blogPost) return;
      const token = localStorage.getItem('token');
      
      try {
        const response = await fetch(`https://api.s-tierproject.online/projects/blogposts/${blogPost.id}/unpublish`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to unpublish post');
        }
        
        const updatedPost = await response.json();
        
        // Update the local blogPost object and the store
        blogPost = { ...blogPost, is_published: false };
        
        // Update the specific blog post in the blog posts array
        if ($blogPosts) {
          const updatedBlogPosts = $blogPosts.map(post => 
            post.id === blogPost.id ? { ...post, is_published: false } : post
          );
          
          // Update the project store with the updated blog posts
          if ($projectData && $projectData.latest_run) {
            const updatedProject = {
              ...$projectData,
              latest_run: {
                ...$projectData.latest_run,
                blog_posts: updatedBlogPosts
              }
            };
            
            // Update the project store with our single project
            const updatedProjectArray = [updatedProject];
            projectStore.setProject(updatedProjectArray);
          }
        }
        
        alert('Post unpublished successfully!');
      } catch (error) {
        console.error('Error unpublishing post:', error);
        alert(`Failed to unpublish post: ${error.message}`);
      }
    }
    
    // Return to project page
    function goBack() {
      goto(`/projects/${$page.params.id}`);
    }
    
    // Toggle between edit and preview modes
    function toggleEditMode() {
      isEditing = !isEditing;
    }
    
    onMount(() => {
      // Any initialization logic
      // If we need to fetch fresh data, we could do it here
    });
  </script>
  
  {#if $isLoading}
    <div class="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
      <div class="text-xl">Loading blog post data...</div>
    </div>
  {:else if $error}
    <div class="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
      <div class="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
        <h2 class="text-xl font-medium mb-2">Error loading project data</h2>
        <p class="text-zinc-400 mb-4">{$error}</p>
        <button 
          on:click={() => window.location.reload()}
          class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-sm"
        >
          Retry
        </button>
      </div>
    </div>
  {:else if !blogPost}
    <div class="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
      <div class="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
        <h2 class="text-xl font-medium mb-2">Blog post not found</h2>
        <p class="text-zinc-400 mb-4">The blog post with slug "{$page.params.slug}" could not be found.</p>
        <button 
          on:click={goBack}
          class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-sm"
        >
          Return to Project
        </button>
      </div>
    </div>
  {:else}
    <div class="min-h-screen flex flex-col bg-zinc-950 text-white">
      <!-- Header Bar -->
      <header class="py-4 px-6 z-10 border-b border-zinc-800 bg-zinc-950 sticky top-0">
        <div class="flex items-center justify-between max-w-7xl mx-auto">
          <div class="flex items-center gap-4">
            <button 
              on:click={goBack}
              class="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-md flex items-center justify-center"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <div>
              <h1 class="text-2xl font-bold text-white">Edit Blog Post</h1>
              <p class="text-sm text-zinc-400">{blogPost.slug}</p>
            </div>
          </div>
          
          <div class="flex gap-3">
            <div class="bg-zinc-900 px-4 py-2 rounded-md text-sm flex items-center">
              <span class="{blogPost.is_published ? 'text-green-400' : 'text-yellow-400'} font-medium">
                {blogPost.is_published ? 'Published' : 'Draft'}
              </span>
            </div>
            
            <button 
              on:click={toggleEditMode}
              class="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md text-sm"
            >
              {isEditing ? 'Preview' : 'Edit'}
            </button>
            
            {#if hasChanges}
              <button 
                on:click={saveChanges}
                class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2 {isSaving ? 'opacity-75 cursor-not-allowed' : ''}"
                disabled={isSaving}
              >
                {#if isSaving}
                  <span class="animate-spin">⟳</span>
                  Saving...
                {:else}
                  <span class="text-sm">💾</span>
                  Save Changes
                {/if}
              </button>
            {/if}
            
            {#if blogPost.is_published}
              <button 
                on:click={unpublishPost}
                class="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-md text-sm"
              >
                Unpublish
              </button>
            {:else}
              <button 
                on:click={publishPost}
                class="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 px-4 py-2 rounded-md text-sm"
              >
                Publish
              </button>
            {/if}
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="flex-grow">
        <div class="max-w-5xl mx-auto px-6 py-6">
          {#if isEditing}
            <!-- Edit Mode -->
            <div class="mb-6">
              <label for="blog-title" class="block text-sm font-medium text-zinc-400 mb-2">Blog Title</label>
              <input 
                type="text" 
                id="blog-title" 
                bind:value={editedTitle} 
                class="w-full py-3 px-4 rounded-md bg-zinc-900 border border-zinc-700 text-white text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label for="blog-content" class="block text-sm font-medium text-zinc-400 mb-2">Content (Markdown)</label>
              <textarea 
                id="blog-content" 
                bind:value={editedContent}
                class="w-full h-[60vh] py-3 px-4 rounded-md bg-zinc-900 border border-zinc-700 text-white font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>
          {:else}
            <!-- Preview Mode -->
            <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-6 mb-6">
              <h2 class="text-3xl font-bold mb-6">{editedTitle}</h2>
              <div class="prose prose-invert max-w-none">
                <!-- Render markdown as HTML -->
                <!-- This would ideally use a markdown renderer library -->
                <div class="whitespace-pre-wrap">
                  {editedContent}
                </div>
              </div>
            </div>
          {/if}
          
          <!-- Blog metadata display -->
          <div class="mt-8 bg-zinc-900 rounded-lg border border-zinc-800 p-4">
            <h3 class="text-lg font-medium mb-3">Post Metadata</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-zinc-400">Created At</p>
                <p class="text-zinc-200">{blogPost.created_at ? new Date(blogPost.created_at).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <p class="text-sm text-zinc-400">Last Updated</p>
                <p class="text-zinc-200">{blogPost.updated_at ? new Date(blogPost.updated_at).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <p class="text-sm text-zinc-400">Slug</p>
                <p class="text-zinc-200">{blogPost.slug}</p>
              </div>
              <div>
                <p class="text-sm text-zinc-400">Status</p>
                <p class="{blogPost.is_published ? 'text-green-400' : 'text-yellow-400'}">{blogPost.is_published ? 'Published' : 'Draft'}</p>
              </div>
              <div>
                <p class="text-sm text-zinc-400">ID</p>
                <p class="text-zinc-200 font-mono text-xs">{blogPost.id}</p>
              </div>
              <div>
                <p class="text-sm text-zinc-400">Project URL</p>
                <p class="text-zinc-200">{$projectData?.url || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Footer -->
      <footer class="py-4 px-6 border-t border-zinc-800 bg-zinc-950">
        <div class="max-w-7xl mx-auto">
          <div class="flex justify-between items-center">
            <div class="text-sm text-zinc-500">
              Blog Post Editor
            </div>
            <div class="text-sm text-zinc-500">
              {hasChanges ? 'Unsaved changes' : 'All changes saved'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  {/if}
  
  <style>
    /* Custom scrollbar for textareas */
    textarea::-webkit-scrollbar {
      width: 8px;
    }
    
    textarea::-webkit-scrollbar-track {
      background: #27272a;
      border-radius: 4px;
    }
    
    textarea::-webkit-scrollbar-thumb {
      background: #3f3f46;
      border-radius: 4px;
    }
    
    textarea::-webkit-scrollbar-thumb:hover {
      background: #52525b;
    }
  </style>