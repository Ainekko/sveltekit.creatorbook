
// routes/projects/[id]/+page.js
export const ssr = false;



export async function load({ params, fetch }) {
    try {
      const projectId = params.id;
      const response = await fetch(`https://api.s-tierproject.online/projects/projects/${projectId}`);
      
      if (!response.ok) {
        return {
          project: null,
          error: `Failed to load project: ${response.status}`
        };
      }
      
      const project = await response.json();
      
      return {
        project,
        error: null
      };
    } catch (error) {
      console.error('Error loading project:', error);
      return {
        project: null,
        // @ts-ignore
        error: error.message || 'Failed to load project'
      };
    }
  }