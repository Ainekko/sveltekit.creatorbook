<script lang="ts">
    // src/lib/components/BlogCard.svelte
    import { format } from 'date-fns';
    import type { BlogPost } from '$lib/api/blog';
    
    export let post: BlogPost;
    export let showExcerpt = true;
    export let showKeywords = true;
    
    $: formattedDate = format(new Date(post.created_at), 'MMM dd, yyyy');
    $: readingTime = Math.ceil(post.word_count / 200);
  </script>
  
  <article class="blog-card">
    <a href="/blog/{post.id}" class="card-link">
      <div class="card-content">
        {#if post.content_type}
          <span class="content-type">{post.content_type}</span>
        {/if}
        
        <h3 class="card-title">{post.title}</h3>
        
        {#if showExcerpt && post.meta_description}
          <p class="card-excerpt">{post.meta_description}</p>
        {/if}
        
        <div class="card-meta">
          <time datetime={post.created_at}>{formattedDate}</time>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>
      </div>
      
      {#if showKeywords && post.secondary_keywords?.length > 0}
        <div class="card-tags">
          {#each post.secondary_keywords.slice(0, 3) as keyword}
            <span class="tag">{keyword}</span>
          {/each}
        </div>
      {/if}
    </a>
  </article>
  
  <style>
    .blog-card {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      overflow: hidden;
      transition: box-shadow 0.3s ease;
    }
    
    .blog-card:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .card-link {
      display: block;
      text-decoration: none;
      color: inherit;
    }
    
    .card-content {
      padding: 1.5rem;
    }
    
    .content-type {
      display: inline-block;
      font-size: 0.75rem;
      text-transform: uppercase;
      color: #3b82f6;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }
    
    .card-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.75rem 0;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      transition: color 0.2s;
    }
    
    .card-link:hover .card-title {
      color: #3b82f6;
    }
    
    .card-excerpt {
      color: #6b7280;
      margin: 0 0 1rem 0;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .card-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #9ca3af;
    }
    
    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding: 0 1.5rem 1.5rem 1.5rem;
    }
    
    .tag {
      font-size: 0.75rem;
      padding: 0.25rem 0.75rem;
      background-color: #f3f4f6;
      color: #4b5563;
      border-radius: 9999px;
    }
  </style>