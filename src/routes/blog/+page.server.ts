// src/routes/blog/+page.server.ts
import { error } from '@sveltejs/kit';
import { blogApi } from '$lib/api/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 12; // Posts per page
  
  try {
    const data = await blogApi.getPosts(page, limit);
    
    return {
      posts: data.posts,
      pagination: data.pagination
    };
  } catch (e) {
    console.error('Failed to load posts:', e);
    throw error(500, 'Failed to load blog posts');
  }
};

export const ssr = true;
export const prerender = false;