// src/lib/api/blog.ts
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/orion/blog';

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

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
    this.cache = new CacheManager(3000); // 60 second cache
  }

  /**
   * Get paginated list of published posts with caching
   */
  async getPosts(page = 1, limit = 10): Promise<PaginatedResponse> {
    const cacheKey = `posts_${page}_${limit}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const response = await fetch(
      `${this.baseUrl}/posts/list_posts/?page=${page}&limit=${limit}`,
      {
        // Add cache headers for browser caching
        headers: {
          'Cache-Control': 'public, max-age=3000, stale-while-revalidate=300'
        }
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
    const cacheKey = `post_${id}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const response = await fetch(`${this.baseUrl}/posts/${id}/`, {
      headers: {
        'Cache-Control': 'public, max-age=3000, stale-while-revalidate=300'
      }
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
    const cacheKey = `recent_${limit}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const response = await fetch(
      `${this.baseUrl}/posts/recent/?limit=${limit}`,
      {
        headers: {
          'Cache-Control': 'public, max-age=3000, stale-while-revalidate=300'
        }
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
    const response = await fetch(`${this.baseUrl}/posts/sitemap/`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Get RSS feed data
   */
  async getRSSData() {
    const response = await fetch(`${this.baseUrl}/posts/rss/`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Search posts by keyword
   */
  async searchPosts(keyword: string, page = 1, limit = 10): Promise<PaginatedResponse> {
    const response = await fetch(
      `${this.baseUrl}/posts/list_posts/?keyword=${encodeURIComponent(keyword)}&page=${page}&limit=${limit}`
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