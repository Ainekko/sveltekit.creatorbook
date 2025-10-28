import { blogApi } from '$lib/api/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 12; // Posts per page
  
  return {
    streamed: {
      blogData: blogApi.getPosts(page, limit).catch((e) => {
        console.error('Failed to load posts:', e);
        return { posts: [], pagination: { page, limit, pages: 0, has_prev: false, has_next: false } }; // Fallback data
      })
    }
  };
};

export const ssr = true;
export const prerender = false;