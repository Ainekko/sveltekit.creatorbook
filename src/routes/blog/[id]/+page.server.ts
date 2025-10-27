// src/routes/blog/[id]/+page.server.ts
// Optimized with Incremental Static Regeneration for Vercel

import { error } from '@sveltejs/kit';
import { blogApi } from '$lib/api/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const post = await blogApi.getPost(params.id);
    
    if (!post) {
      throw error(404, 'Post not found');
    }
    
    // Fetch related posts
    const relatedPosts = await blogApi.getRecentPosts(3);
    
    return {
      post,
      relatedPosts: relatedPosts.filter(p => p.id !== post.id)
    };
  } catch (e) {
    console.error('Failed to load post:', e);
    throw error(404, 'Post not found');
  }
};

// Vercel ISR Configuration
// This caches the page and regenerates it every 60 seconds
export const config = {
  isr: {
    expiration: false, // Cache for 60 seconds
    // Optional: Set to false to disable runtime regeneration
    // bypassToken: 'your-secret-token' // For on-demand revalidation
  }
};