import { blogApi } from '$lib/api/blog';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const postsData = await blogApi.getPosts(1, 3);
        if (postsData.posts && postsData.posts.length > 0) {
            return {
                posts: postsData.posts
            };
        }
        throw new Error('No posts found');
    } catch (error) {
        console.error('Failed to fetch blog posts for landing page:', error);
        // Return mock data as fallback
        return {
            posts: [
                {
                    title: 'The Ultimate Guide to SEO Automation',
                    slug: 'seo-automation-guide',
                    meta_description: 'Learn how to automate your content creation workflow and boost your search rankings with AI-driven SEO tools.',
                    word_count: 1250,
                    created_at: new Date().toISOString(),
                    seo: {
                        keywords: ['SEO', 'Automation', 'AI']
                    }
                }
            ]
        };
    }
};
