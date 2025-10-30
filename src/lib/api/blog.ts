// src/lib/api/blog.ts

import { API_BASE_URL } from "$lib/config";
const API_BASE = `${API_BASE_URL}/orion/blog`;
const API_KEY = '9hPUh4pRJkmtii-50bJPMwT4M-SiUc_HDoPjoc-D1BZ9CK-X-OwBoV2KroH4vkT_';
const PROJECT_ID = '6f5ece70-df13-4b70-b9f6-8de6e2a644ca';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  meta_description: string;
  word_count: number;
  primary_keyword: string;
  secondary_keywords: string[];
  content_type: string;
  created_at: string;
  updated_at: string;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    published_date: string;
    modified_date: string;
  };
}

export interface PaginatedResponse {
  posts: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// Simple in-memory cache with TTL
class CacheManager {
  private cache = new Map<string, { data: any; expires: number }>();
  private ttl: number;

  constructor(ttlSeconds = 60) {
    this.ttl = ttlSeconds * 1000;
  }

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      expires: Date.now() + this.ttl
    });
  }

  get(key: string) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  clear() {
    this.cache.clear();
  }
}

class BlogAPI {
  private baseUrl: string;
  private cache: CacheManager;
  private headers: Record<string, string>;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
    this.cache = new CacheManager(300); // 5 minute cache (adjusted from 3000 seconds which was likely a typo)
    this.headers = {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=300'
    };
  }

  private getQueryParams(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }
    return searchParams.toString();
  }

  /**
   * Get paginated list of published posts with caching
   */
  async getPosts(page = 1, limit = 10): Promise<PaginatedResponse> {
    const params = { page, limit, project_id: PROJECT_ID };
    const queryString = this.getQueryParams(params);
    const cacheKey = `posts_${queryString}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const response = await fetch(
      `${this.baseUrl}/posts/list_posts/?${queryString}`,
      {
        headers: this.headers
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    
    const data = await response.json();
    this.cache.set(cacheKey, data);
    
    return data;
  }

  /**
   * Get a single post by ID with caching and prefetching support
   */
  async getPost(id: string): Promise<BlogPost> {
    const params = { project_id: PROJECT_ID };
    const queryString = this.getQueryParams(params);
    const url = `${this.baseUrl}/posts/${id}/` + (queryString ? `?${queryString}` : '');
    const cacheKey = `post_${id}_${PROJECT_ID}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const response = await fetch(url, {
      headers: this.headers
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    
    const data = await response.json();
    this.cache.set(cacheKey, data);
    
    return data;
  }

  /**
   * Prefetch a post (for hover/mouseover)
   */
  prefetchPost(id: string): void {
    // Fire and forget - don't await
    this.getPost(id).catch(() => {
      // Silently fail prefetches
    });
  }

  /**
   * Get recent posts with caching
   */
  async getRecentPosts(limit = 5): Promise<BlogPost[]> {
    const params = { limit, project_id: PROJECT_ID };
    const queryString = this.getQueryParams(params);
    const cacheKey = `recent_${queryString}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const response = await fetch(
      `${this.baseUrl}/posts/recent/?${queryString}`,
      {
        headers: this.headers
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch recent posts: ${response.statusText}`);
    }
    
    const data = await response.json();
    const posts = data.posts;
    this.cache.set(cacheKey, posts);
    
    return posts;
  }

  /**
   * Get sitemap data
   */
  async getSitemapData() {
    const params = { project_id: PROJECT_ID };
    const queryString = this.getQueryParams(params);
    const response = await fetch(`${this.baseUrl}/posts/sitemap/?${queryString}`, {
      headers: this.headers
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Get RSS feed data
   */
  async getRSSData() {
    const params = { project_id: PROJECT_ID };
    const queryString = this.getQueryParams(params);
    const response = await fetch(`${this.baseUrl}/posts/rss/?${queryString}`, {
      headers: this.headers
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Search posts by keyword
   */
  async searchPosts(keyword: string, page = 1, limit = 10): Promise<PaginatedResponse> {
    const params = { keyword, page, limit, project_id: PROJECT_ID };
    const queryString = this.getQueryParams(params);
    const response = await fetch(
      `${this.baseUrl}/posts/list_posts/?${queryString}`,
      {
        headers: this.headers
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to search posts: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Clear cache manually if needed
   */
  clearCache() {
    this.cache.clear();
  }
}

export const blogApi = new BlogAPI();