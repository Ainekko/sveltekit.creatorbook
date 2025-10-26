// src/routes/sitemap.xml/+server.ts
// SvelteKit should handle this - the folder name becomes the route

import { blogApi } from '$lib/api/blog';
import type { RequestHandler } from './$types';

const SITE_URL = 'https://yourblog.com';

export const GET: RequestHandler = async () => {
  try {
    const sitemapData = await blogApi.getSitemapData();
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${sitemapData.posts.map((post: any) => `
  <url>
    <loc>${SITE_URL}/blog/${post.id}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${post.priority}</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'max-age=3600'
      }
    });
  } catch (e) {
    console.error('Failed to generate sitemap:', e);
    return new Response('Error', { status: 500 });
  }
};

// If the above doesn't work with sitemap.xml folder, use this alternative:
// Move file to: src/routes/api/sitemap/+server.ts
// Then access it at: /api/sitemap
// And redirect /sitemap.xml to /api/sitemap using hooks or vercel.json