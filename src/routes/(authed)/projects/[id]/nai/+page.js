// src/routes/project/[id]/+page.js

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    // The 'id' from the URL is available in params.id
    return {
      projectId: params.id
    };
  }