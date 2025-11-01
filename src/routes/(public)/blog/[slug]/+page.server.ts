// src/routes/blog/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import { blogApi } from '$lib/api/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const { params, isDataRequest } = event;

  const postPromise = blogApi.getPost(params.slug)
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
      relatedPosts: relatedPosts.filter(p => p.slug !== post.slug)
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

// Vercel ISR Configuration
export const config = {
  isr: {
    expiration: false,
  }
};