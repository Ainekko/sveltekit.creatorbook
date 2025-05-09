// src/routes/projects/[id]/seo/blogpost/[slug]/+layout.js
import { projectStore } from '$lib/stores';

export const ssr = false;

export async function load({ params, fetch, parent }) {
  const projectId = params.id;
  
  // Set loading state to true
  projectStore.setLoading(true);
  
  try {
    // Check if we already have the project data in the store
    const parentData = await parent();
    
    // If we already have the project data from the parent layout, use it
    if (parentData.project) {
      projectStore.setProject(parentData.project);
      return {
        slug: params.slug,
        error: null
      };
    }
    
    // If not, fetch it
    const response = await fetch(`https://api.s-tierproject.online/projects/projects/${projectId}`);
    
    if (!response.ok) {
      const errorMessage = `Failed to load project: ${response.status}`;
      projectStore.setError(errorMessage);
      
      return {
        project: null,
        slug: params.slug,
        error: errorMessage
      };
    }
    
    const project = await response.json();
    
    // Update the store with the fetched project data
    projectStore.setProject(project);
    
    return {
      project,
      slug: params.slug,
      error: null
    };
  } catch (error) {
    console.error('Error loading project:', error);
    const errorMessage = error.message || 'Failed to load project';
    
    // Update the store with the error
    projectStore.setError(errorMessage);
    
    return {
      project: null,
      slug: params.slug,
      error: errorMessage
    };
  }
}