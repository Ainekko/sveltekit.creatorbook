export async function fetchProjectSEO(projectId, token) {
    const response = await fetch(`/api/projects/${projectId}/seo`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed to fetch SEO data');
    return response.json();
  }
  
  export async function fetchKeywords(projectId, token) {
    const response = await fetch(`/api/projects/${projectId}/seo/keywords`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed to fetch keywords');
    return response.json();
  }
  
  export async function generateSEOContent(projectId, token, params = {}) {
    const response = await fetch(`/api/projects/${projectId}/seo/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    if (!response.ok) throw new Error('Failed to start SEO generation');
    return response.json();  // Returns {task_id: '...'}
  }
  
  export async function pollTaskStatus(taskId, token) {
    const response = await fetch(`/api/tasks/${taskId}/status`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed to poll task');
    return response.json();
  }