// src/lib/api.ts - API Client
import type { BlogPost } from '$lib/types';

const API_URL = 'http://127.0.0.1:8000/';

export async function fetchPublishedPosts(): Promise<BlogPost[]> {
  const response = await fetch(`${API_URL}/blog_api/posts/`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  return await response.json();
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost> {
  const response = await fetch(`${API_URL}/blog_api/posts/${slug}/`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Blog post not found');
    }
    throw new Error('Failed to fetch blog post');
  }
  return await response.json();
}

export async function fetchRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
  const response = await fetch(`${API_URL}/blog_api/posts/?limit=${limit}&exclude=${postId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch related posts');
  }
  return await response.json();
}

