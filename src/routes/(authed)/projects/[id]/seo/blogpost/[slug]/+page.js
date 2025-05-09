// src/routes/projects/[id]/seo/blogpost/[slug]/+page.js
export const ssr = false;

export function load({ params }) {
  // We don't need to do anything here because the layout has already loaded the data
  // Just pass through the slug for convenience
  return {
    slug: params.slug
  };
}