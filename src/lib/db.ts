// src/lib/db.ts
import type { Project, AnalysisResult } from './types';

let basePraw = "https://praw-hell-cry.vercel.app"
// let basePraw = "http://127.0.0.1:8000"


/**
 * Saves a new project to the database
 * @param userId The ID of the user creating the project
 * @param clientUrl The URL of the website being analyzed
 * @param businessType The type of business
 * @param marketingGoals The marketing goals
 * @param analysisData The analysis result data
 * @returns The saved project data
 * 
 */


import { goto } from "$app/navigation";
import { isLoggedIn } from './stores';





    export function logout() {
            let token = localStorage.getItem('token');

            console.log(`fetching with ${token}`)
            fetch('https://api.s-tierproject.online/users/logout/', {

                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}` // Replace token with actual token value
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log('Logged out successfully');
                    localStorage.removeItem('token');
                    isLoggedIn.set(false);
                    console.log('token')
                    goto('/');

                    // Redirect the user to the login page or perform any other action
                } else {
                    console.error('Failed to logout:', response.status);
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
            }




export async function submitWIPIdea(token: string | null, idea: any) {

    function show(){
        let sidea= JSON.stringify(idea)
        console.log(`sibmiting ${sidea}`)
    }

    show()
    
    const response = await fetch('https://api.s-tierproject.online/ideas/submit-wip-idea/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(idea)
    });

    if (!response.ok) {
        throw new Error('Failed to submit WIP idea');
    }

    return response.json();
}

export async function submitFavedIdea(token: string | null, idea: any) {
    const response = await fetch('https://api.s-tierproject.online/ideas/submit-faved-idea/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(idea)
    });

    if (!response.ok) {
        throw new Error('Failed to submit Faved idea');
    }

    return response.json();
}


export async function fetchWIPIdeas(token: string | null) {
    const response = await fetch('https://api.s-tierproject.online/projects/projects/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch WIP ideas');
    }

    return response.json();
}


export async function saveProject(
  token: string | null,
  clientUrl: string,
  businessType: string,
  marketingGoals: string,
  analysisData: AnalysisResult
): Promise<Project> {
  try {
    const projectData = {
      url: clientUrl,
      business_type: businessType,
      marketing_goals: marketingGoals,  // Changed from 'goals'
      result: analysisData,            // Changed from 'data'
      // Remove 'name' as it doesn't exist in your model
      // Remove 'created_at' as it's read-only
    };
    
    const response = await fetch('https://api.s-tierproject.online/projects/create_projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(projectData)
    });
    
    if (!response.ok) throw new Error('Failed to save project');
    
    return await response.json();
    
  } catch (e) {
    throw new Error('Failed to save project: ' + (e instanceof Error ? e.message : String(e)));
  }
}
  
  /**
   * Fetches a website analysis from the backend
   * @param url The URL to analyze
   * @returns The analysis result
   */
  export async function analyzeWebsite(url: string): Promise<{ task_id: string }> {
    if (!url) {
      throw new Error("Please enter a website URL");
    }

    console.log(`[${new Date().toISOString()}] Starting analysis for URL: ${url}`);
  
    const response = await fetch(`${basePraw}/cry_praw/analyze/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url })
    });
  
    if (!response.ok) {
      console.error(`[${new Date().toISOString()}] Analysis API error:`, response.status, await response.text());
      throw new Error(`API error: ${response.status}`);
    }
  
    const data = await response.json();
    console.log(`[${new Date().toISOString()}] Received task ID: ${data.task_id}`);
    return { task_id: data.task_id };
  }

  

  export async function pollTaskResult(
    task_id: string,
    options: {
      initialDelay?: number;
      interval?: number;
      timeout?: number;
      onProgress?: (status: string, elapsed: number) => void;
    } = {}
  ): Promise<AnalysisResult> {
    const {
      initialDelay = 2 * 60 * 1000,  // Wait 2 minutes before first poll
      interval = 30 * 1000,          // Poll every 30 seconds
      timeout = 6 * 60 * 1000,       // Timeout after 6 minutes
      onProgress
    } = options;

    const startTime = Date.now();
    let pollCount = 0;

    console.log(`[${new Date().toISOString()}] Starting poll process for task ${task_id}`);
    console.log(`Initial delay: ${initialDelay/1000}s, Poll interval: ${interval/1000}s, Timeout: ${timeout/1000}s`);

    // Initial delay to give GitHub Actions time to process
    console.log(`[${new Date().toISOString()}] Waiting ${initialDelay/1000} seconds before first poll...`);
    await new Promise(resolve => setTimeout(resolve, initialDelay));

    async function poll(): Promise<AnalysisResult> {
      const elapsed = Date.now() - startTime;
      pollCount++;

      // Check for timeout
      if (elapsed >= timeout) {
        const errorMsg = `Analysis timed out after ${elapsed/1000} seconds (${pollCount} attempts)`;
        console.error(`[${new Date().toISOString()}] ${errorMsg}`);
        throw new Error(errorMsg);
      }

      try {
        console.log(`[${new Date().toISOString()}] Poll #${pollCount}: Checking status for task ${task_id}`);
        
        const res = await fetch(`${basePraw}/cry_praw/task-status/${task_id}/`);
        
        if (!res.ok) {
          console.error(`[${new Date().toISOString()}] Status API error:`, res.status, await res.text());
          throw new Error(`Status check failed: ${res.status}`);
        }

        const data = await res.json();
        console.log(`[${new Date().toISOString()}] Poll #${pollCount} status:`, data.status);

        // Call progress callback if provided
        if (onProgress) {
          onProgress(data.status, elapsed);
        }

        if (data.status === 'complete') {
          console.log(`[${new Date().toISOString()}] Analysis complete after ${elapsed/1000} seconds (${pollCount} attempts)`);
          
          // The results are already parsed by the Django view
          if (!data.results) {
            throw new Error("Complete status but no results found");
          }
          
          // Log a preview of the results
          console.log(`[${new Date().toISOString()}] Results preview:`, {
            analysis_data: Object.keys(data.results.analysis_data || {}),
            timestamp: data.results.timestamp
          });
          
          return data.results;
        }

        if (data.status === 'failed') {
          const errorMsg = `Analysis failed: ${data.error || 'Unknown error'}`;
          console.error(`[${new Date().toISOString()}] ${errorMsg}`);
          throw new Error(errorMsg);
        }

        // Wait and retry
        console.log(`[${new Date().toISOString()}] Waiting ${interval/1000} seconds before next poll...`);
        await new Promise(resolve => setTimeout(resolve, interval));
        return poll();
      } catch (error) {
        console.error(`[${new Date().toISOString()}] Poll #${pollCount} error:`, error);
        throw error;
      }
    }

    return poll();
  }
  
  
  export async function analyzeWebsiteAndWait(
    url: string,
    onProgress?: (status: string, elapsed: number) => void
  ): Promise<AnalysisResult> {
    console.log(`[${new Date().toISOString()}] Starting analysis workflow for: ${url}`);
    
    try {
      const { task_id } = await analyzeWebsite(url);
      console.log(`[${new Date().toISOString()}] Task ID received: ${task_id}`);
      
      const result = await pollTaskResult(task_id, { onProgress });
      
      console.log(`[${new Date().toISOString()}] Analysis workflow completed successfully`);
      return result;
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Analysis workflow failed:`, error);
      throw error;
    }
  }
  
  
  /**
   * Type definitions to support the database functions
   */
  export interface TypeDefinitions {
    // This is a placeholder - you should define your actual types in a separate file
  }




/**
 * Updates an existing project with new LLM analysis results
 * @param token The user's authentication token
 * @param projectId The UUID of the project to update
 * @param url The URL to analyze again
 * @param runType Optional category for this analysis run (e.g., 'follow-up', 'refined', etc.)
 * @param onProgress Optional callback for tracking analysis progress
 * @returns The updated project with the new LLM run
 */
export async function updateProjectWithNewAnalysis(
  token: string | null,
  projectId: string,
  url: string,
  runType: string = 'follow-up',
  onProgress?: (status: string, elapsed: number) => void
): Promise<any> {
  console.log(`[${new Date().toISOString()}] Starting new analysis for existing project ${projectId}`);
  
  try {
    // Step 1: Run the analysis through the LangGraph service
    const analysisResult = await analyzeWebsiteAndWait(url, onProgress);
    console.log(`[${new Date().toISOString()}] Analysis completed for project update`);
    
    // Step 2: Update the project with the new results
    const updateData = {
      // Include any fields you want to update in the project itself
      // For example, you might want to update the URL if it changed
      url: url,
      
      // Include the analysis result and run type for the new LLMRun
      result: analysisResult,
      run_type: runType
    };
    
    const response = await fetch(`https://api.s-tierproject.online/projects/projects/${projectId}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(updateData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update project: ${response.status} - ${errorText}`);
    }
    
    const updatedProject = await response.json();
    console.log(`[${new Date().toISOString()}] Project ${projectId} updated with new analysis run`);
    
    return updatedProject;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Failed to update project with new analysis:`, error);
    throw new Error('Failed to update project with new analysis: ' + 
      (error instanceof Error ? error.message : String(error)));
  }
}

/**
 * Gets all LLM runs for a specific project
 * @param token The user's authentication token
 * @param projectId The UUID of the project
 * @returns Array of LLM runs for the project
 */
export async function getProjectLLMRuns(token: string | null, projectId: string): Promise<any[]> {
  try {
    const response = await fetch(`https://api.s-tierproject.online/projects/llm_runs/${projectId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch LLM runs: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Failed to fetch LLM runs:`, error);
    throw new Error('Failed to fetch LLM runs: ' + 
      (error instanceof Error ? error.message : String(error)));
  }
}

/**
 * Gets the latest LLM run for a project
 * @param token The user's authentication token
 * @param projectId The UUID of the project
 * @returns The latest LLM run data
 */
export async function getLatestLLMRun(token: string | null, projectId: string): Promise<any> {
  try {
    const response = await fetch(`https://api.s-tierproject.online/projects/latest_llm_run/${projectId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null; // No runs found
      }
      throw new Error(`Failed to fetch latest LLM run: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Failed to fetch latest LLM run:`, error);
    throw new Error('Failed to fetch latest LLM run: ' + 
      (error instanceof Error ? error.message : String(error)));
  }
}