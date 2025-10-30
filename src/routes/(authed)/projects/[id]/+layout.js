// routes/projects/[id]/+page.js
export const ssr = false;

import { API_BASE_URL } from '$lib/config.js';
import { projectStore } from '$lib/stores';

export async function load({ params, fetch }) {
  // Set loading state to true
  projectStore.setLoading(true);
  
  try {
    const projectId = params.id;
    const response = await fetch(`${API_BASE_URL}/projects/projects/${projectId}`);
    
    if (!response.ok) {
      const errorMessage = `Failed to load project: ${response.status}`;
      projectStore.setError(errorMessage);
      
      return {
        project: null,
        error: errorMessage
      };
    }
    
    const project = await response.json();
    
    // Update the store with the fetched project data
    projectStore.setProject(project);
    
    return {
      project,
      error: null
    };
  } catch (error) {
    console.error('Error loading project:', error);
    const errorMessage = error.message || 'Failed to load project';
    
    // Update the store with the error
    projectStore.setError(errorMessage);
    
    return {
      project: null,
      error: errorMessage
    };
  }
}