// src/routes/blog/[id]/+page.server.ts
import { error } from '@sveltejs/kit';
import { blogApi } from '$lib/api/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const { params, isDataRequest } = event;  // Access full event for isDataRequest

  const postPromise = blogApi.getPost(params.id)
    .then(post => {
      if (!post) {
        throw error(404, 'Post not found');
      }
      return post;
    })
    .catch(e => {
      console.error('Failed to load post:', e);
      throw error(404, 'Post not found');
    });

  const relatedPostsPromise = blogApi.getRecentPosts(3);

  if (!isDataRequest) {
    // For initial SSR (crawlers/users' first load): Await everything for full HTML
    const post = await postPromise;
    const relatedPosts = await relatedPostsPromise;
    return {
      post,
      relatedPosts: relatedPosts.filter(p => p.id !== post.id)
    };
  } else {
    // For client-side navigation: Stream for better UX
    return {
      streamed: {
        post: postPromise,
        relatedPosts: relatedPostsPromise
      }
    };
  }
};

// Keep your Vercel ISR config as-is
// Vercel ISR Configuration
// This caches the page and regenerates it every 60 seconds
export const config = {
  isr: {
    expiration: false, // Cache for 60 seconds
    // Optional: Set to false to disable runtime regeneration
    // bypassToken: 'your-secret-token' // For on-demand revalidation
  }
};