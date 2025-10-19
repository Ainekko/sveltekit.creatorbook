// src/lib/db.ts

// massy module that has everything to interface with the backend

import type { Project, AnalysisResult, BlogPostOutline } from './types';

import { API_BASE_URL } from './config';




let basePraw = "https://praw-hell-cry.vercel.app"
// let basePraw = "http://127.0.0.1:8000"

const baseS = "https://api.s-tierproject.online"


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
            fetch(`${API_BASE_URL}/users/logout/`, {

                
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
// export async function analyzeWebsite(url: string): Promise<{ task_id: string }> {
//     if (!url) {
//       throw new Error("Please enter a website URL");
//     }

//     console.log(`[${new Date().toISOString()}] Starting analysis for URL: ${url}`);
  
//     const response = await fetch(`${basePraw}/cry_praw/analyze/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ url })
//     });
  
//     if (!response.ok) {
//       console.error(`[${new Date().toISOString()}] Analysis API error:`, response.status, await response.text());
//       throw new Error(`API error: ${response.status}`);
//     }
  
//     const data = await response.json();
//     console.log(`[${new Date().toISOString()}] Received task ID: ${data.task_id}`);
//     return { task_id: data.task_id };
//   }

  

//   export async function pollTaskResult(
//     task_id: string,
//     options: {
//       initialDelay?: number;
//       interval?: number;
//       timeout?: number;
//       onProgress?: (status: string, elapsed: number) => void;
//     } = {}
//   ): Promise<AnalysisResult> {
//     const {
//       initialDelay = 2 * 60 * 1000,  // Wait 2 minutes before first poll
//       interval = 30 * 1000,          // Poll every 30 seconds
//       timeout = 6 * 60 * 1000,       // Timeout after 6 minutes
//       onProgress
//     } = options;

//     const startTime = Date.now();
//     let pollCount = 0;

//     console.log(`[${new Date().toISOString()}] Starting poll process for task ${task_id}`);
//     console.log(`Initial delay: ${initialDelay/1000}s, Poll interval: ${interval/1000}s, Timeout: ${timeout/1000}s`);

//     // Initial delay to give GitHub Actions time to process
//     console.log(`[${new Date().toISOString()}] Waiting ${initialDelay/1000} seconds before first poll...`);
//     await new Promise(resolve => setTimeout(resolve, initialDelay));

//     async function poll(): Promise<AnalysisResult> {
//       const elapsed = Date.now() - startTime;
//       pollCount++;

//       // Check for timeout
//       if (elapsed >= timeout) {
//         const errorMsg = `Analysis timed out after ${elapsed/1000} seconds (${pollCount} attempts)`;
//         console.error(`[${new Date().toISOString()}] ${errorMsg}`);
//         throw new Error(errorMsg);
//       }

//       try {
//         console.log(`[${new Date().toISOString()}] Poll #${pollCount}: Checking status for task ${task_id}`);
        
//         const res = await fetch(`${basePraw}/cry_praw/task-status/${task_id}/`);
        
//         if (!res.ok) {
//           console.error(`[${new Date().toISOString()}] Status API error:`, res.status, await res.text());
//           throw new Error(`Status check failed: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(`[${new Date().toISOString()}] Poll #${pollCount} status:`, data.status);

//         // Call progress callback if provided
//         if (onProgress) {
//           onProgress(data.status, elapsed);
//         }

//         if (data.status === 'complete') {
//           console.log(`[${new Date().toISOString()}] Analysis complete after ${elapsed/1000} seconds (${pollCount} attempts)`);
          
//           // The results are already parsed by the Django view
//           if (!data.results) {
//             throw new Error("Complete status but no results found");
//           }
          
//           // Log a preview of the results
//           console.log(`[${new Date().toISOString()}] Results preview:`, {
//             analysis_data: Object.keys(data.results.analysis_data || {}),
//             timestamp: data.results.timestamp
//           });
          
//           return data.results;
//         }

//         if (data.status === 'failed') {
//           const errorMsg = `Analysis failed: ${data.error || 'Unknown error'}`;
//           console.error(`[${new Date().toISOString()}] ${errorMsg}`);
//           throw new Error(errorMsg);
//         }

//         // Wait and retry
//         console.log(`[${new Date().toISOString()}] Waiting ${interval/1000} seconds before next poll...`);
//         await new Promise(resolve => setTimeout(resolve, interval));
//         return poll();
//       } catch (error) {
//         console.error(`[${new Date().toISOString()}] Poll #${pollCount} error:`, error);
//         throw error;
//       }
//     }

//     return poll();
//   }
  
  
//   export async function analyzeWebsiteAndWait(
//     url: string,
//     onProgress?: (status: string, elapsed: number) => void
//   ): Promise<AnalysisResult> {
//     console.log(`[${new Date().toISOString()}] Starting analysis workflow for: ${url}`);
    
//     try {
//       const { task_id } = await analyzeWebsite(url);
//       console.log(`[${new Date().toISOString()}] Task ID received: ${task_id}`);
      
//       const result = await pollTaskResult(task_id, { onProgress });
      
//       console.log(`[${new Date().toISOString()}] Analysis workflow completed successfully`);
//       return result;
//     } catch (error) {
//       console.error(`[${new Date().toISOString()}] Analysis workflow failed:`, error);
//       throw error;
//     }
//   }
  
  
 // Define a clear interface for the analysis result for type safety
export interface AnalysisResult {
  analysis_data: {
      website_analysis?: any;
      marketing_strategy?: any;
      competitors?: any[];
      competitors_analysis?: any[];
      keyword_research?: any[];
      content_plan?: any;
      completed_agents?: string[];
      status?: string;
      agent_errors?: Record<string, string>;
  };
  task_type: string;
  url: string;
  timestamp: string;
}

// Interface for previous analysis data that can be reused
export interface PreviousAnalysisData {
  website_analysis?: any;
  marketing_strategy?: any;
  competitors?: any[];
  competitors_analysis?: any[];
  keyword_research?: any[];
  task_type?: string;
  url?: string;
  timestamp?: string;
}

// Assume basePraw is defined elsewhere, e.g., in your environment variables

/**
* Starts a new analysis task on the backend.
* This is the primary function for initiating any workflow.
*
* @param url The URL to analyze.
* @param task_type The type of task to run (e.g., 'full', 'analysis-only', 'content-refresh', 'competitor-refresh', 'keyword-refresh').
* @param previous_data Optional previous analysis data for tasks that require it.
* @returns The task_id for the newly started workflow.
*/
export async function startAnalysisTask(
  url: string,
  task_type: string,
  previous_data?: PreviousAnalysisData
): Promise<{ task_id: string }> {
  if (!url) {
      throw new Error("Please enter a website URL");
  }

  // Define task types that require previous data
  const tasksRequiringPreviousData = ["content-only"];
  
  // Validate that previous_data is provided for tasks that require it
  if (tasksRequiringPreviousData.includes(task_type) && !previous_data) {
      throw new Error(`Task type '${task_type}' requires previous analysis data`);
  }

  console.log(`[${new Date().toISOString()}] Starting analysis for URL: ${url} with task type: ${task_type}`);
  
  if (previous_data) {
      console.log(`[${new Date().toISOString()}] Using previous data from: ${previous_data.timestamp || 'unknown time'}`);
  }

  const payload: { 
      url: string; 
      task_type: string; 
      previous_data?: PreviousAnalysisData;
  } = {
      url,
      task_type,
  };

  if (previous_data) {
      payload.previous_data = previous_data;
  }

  const response = await fetch(`${basePraw}/cry_praw/analyze/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
  });

  if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${new Date().toISOString()}] Analysis API error:`, response.status, errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log(`[${new Date().toISOString()}] Received task ID: ${data.task_id}`);
  return { task_id: data.task_id };
}

/**
* Polls the backend for the result of a given task_id.
* This function remains unchanged as its logic is sound.
*
* @param task_id The ID of the task to poll.
* @param options Polling configuration (delay, interval, timeout).
* @returns The final analysis result.
*/
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
      initialDelay = 30 * 1000, // Wait 30 seconds before first poll
      interval = 5 * 1000,         // Poll every 5 seconds
      timeout = 6 * 60 * 1000,      // Timeout after 6 minutes
      onProgress
  } = options;

  const startTime = Date.now();
  let pollCount = 0;

  console.log(`[${new Date().toISOString()}] Starting poll process for task ${task_id}`);
  await new Promise(resolve => setTimeout(resolve, initialDelay));

  async function poll(): Promise<AnalysisResult> {
      const elapsed = Date.now() - startTime;
      pollCount++;

      if (elapsed >= timeout) {
          const errorMsg = `Analysis timed out after ${elapsed/1000} seconds.`;
          console.error(`[${new Date().toISOString()}] ${errorMsg}`);
          throw new Error(errorMsg);
      }

      try {
          console.log(`[${new Date().toISOString()}] Poll #${pollCount}: Checking status for task ${task_id}`);
          const res = await fetch(`${basePraw}/cry_praw/task-status/${task_id}/`);

          if (!res.ok) {
              throw new Error(`Status check failed: ${res.status}`);
          }

          const data = await res.json();
          console.log(`[${new Date().toISOString()}] Poll #${pollCount} status:`, data.status);

          if (onProgress) {
              onProgress(data.status, elapsed);
          }

          if (data.status === 'complete') {
              console.log(`[${new Date().toISOString()}] Analysis complete.`);
              if (!data.results) {
                  throw new Error("Complete status but no results found");
              }
              return data.results as AnalysisResult;
          }

          if (data.status === 'failed') {
              const errorMsg = `Analysis failed: ${data.error || 'Unknown error'}`;
              throw new Error(errorMsg);
          }

          await new Promise(resolve => setTimeout(resolve, interval));
          return poll();
      } catch (error) {
          console.error(`[${new Date().toISOString()}] Poll #${pollCount} error:`, error);
          throw error;
      }
  }

  return poll();
}

/**
* Enhanced workflow function that handles both fresh analysis and refresh operations.
* Automatically determines if previous data is needed based on task type.
*
* @param url The website URL.
* @param task_type The type of analysis to perform.
* @param previous_data Optional previous analysis data (required for refresh operations).
* @param onProgress Optional progress callback.
* @returns The final analysis result.
*/
export async function createProjectWorkflow(
  url: string,
  task_type: string,
  previous_data?: PreviousAnalysisData,
  onProgress?: (status: string, elapsed: number) => void
): Promise<AnalysisResult> {
  console.log(`[${new Date().toISOString()}] Starting project workflow for: ${url} with task type: ${task_type}`);

  try {
      const { task_id } = await startAnalysisTask(url, task_type, previous_data);
      console.log(`[${new Date().toISOString()}] Task ID received: ${task_id}`);

      const result = await pollTaskResult(task_id, { onProgress });

      console.log(`[${new Date().toISOString()}] Project workflow completed successfully`);
      return result;
  } catch (error) {
      console.error(`[${new Date().toISOString()}] Project workflow failed:`, error);
      throw error;
  }
}

/**
* Convenience function to run a fresh full analysis (no previous data needed).
*
* @param url The website URL.
* @param onProgress Optional progress callback.
* @returns The final analysis result.
*/
export async function runFreshAnalysis(
  url: string,
  onProgress?: (status: string, elapsed: number) => void
): Promise<AnalysisResult> {
  return createProjectWorkflow(url, 'full', undefined, onProgress);
}

/**
* Convenience function to run analysis-only (no previous data needed).
*
* @param url The website URL.
* @param onProgress Optional progress callback.
* @returns The final analysis result.
*/
export async function runAnalysisOnly(
  url: string,
  onProgress?: (status: string, elapsed: number) => void
): Promise<AnalysisResult> {
  return createProjectWorkflow(url, 'analysis-only', undefined, onProgress);
}

/**
* Convenience function to refresh content using previous analysis data.
*
* @param url The website URL.
* @param previous_data The previous analysis data to build upon.
* @param onProgress Optional progress callback.
* @returns The final analysis result.
*/
export async function refreshContent(
  url: string,
  previous_data: PreviousAnalysisData,
  onProgress?: (status: string, elapsed: number) => void
): Promise<AnalysisResult> {
  return createProjectWorkflow(url, 'full', previous_data, onProgress);
}

/**
* Convenience function to refresh competitor analysis using previous data.
*
* @param url The website URL.
* @param previous_data The previous analysis data to build upon.
* @param onProgress Optional progress callback.
* @returns The final analysis result.
*/
export async function refreshCompetitors(
  url: string,
  previous_data: PreviousAnalysisData,
  onProgress?: (status: string, elapsed: number) => void
): Promise<AnalysisResult> {
  return createProjectWorkflow(url, 'competitor-refresh', previous_data, onProgress);
}

/**
* Convenience function to refresh keyword research using previous data.
*
* @param url The website URL.
* @param previous_data The previous analysis data to build upon.
* @param onProgress Optional progress callback.
* @returns The final analysis result.
*/
export async function refreshKeywords(
  url: string,
  previous_data: PreviousAnalysisData,
  onProgress?: (status: string, elapsed: number) => void
): Promise<AnalysisResult> {
  return createProjectWorkflow(url, 'keyword-refresh', previous_data, onProgress);
}

// /**
// * Utility function to extract reusable data from a completed analysis result.
// * This helps prepare previous_data for refresh operations.
// *
// * @param analysisResult The completed analysis result.
// * @returns Extracted data suitable for use as previous_data.
// */
// export function extractPreviousData(analysisResult: AnalysisResult): PreviousAnalysisData {
//   return {
//       website_analysis: analysisResult.analysis_data.website_analysis,
//       marketing_strategy: analysisResult.analysis_data.marketing_strategy,
//       competitors: analysisResult.analysis_data.competitors,
//       competitors_analysis: analysisResult.analysis_data.competitors_analysis,
//       keyword_research: analysisResult.analysis_data.keyword_research,
//       task_type: analysisResult.task_type,
//       url: analysisResult.url,
//       timestamp: analysisResult.timestamp
//   };
// }




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
  task_type = 'full',
  token: string | null,
  projectId: string,
  url: string,
  runType: string = 'follow-up',
  onProgress?: (status: string, elapsed: number) => void
): Promise<any> {
  console.log(`[${new Date().toISOString()}] Starting new analysis for existing project ${projectId}`);
  
  try {
    // Step 1: Run the analysis through the LangGraph service
    const analysisResult = await createProjectWorkflow(url, 'full' );
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




/**
 * Creates a full blog post from an outline using the backend API
 * @param llmRunId The ID of the LLM run that generated the outline
 * @param outlineIndex The index of the outline in the LLM run results
 * @param outlineData The outline data
 * @returns The created blog post
 */
export async function createBlogPostFromOutline(
  llmRunId: string,
  outlineIndex: number,
  outlineData: any
): Promise<{ taskId: string; message: string }> {
  try {
    const response = await fetch('/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        llm_run_id: llmRunId,
        outline_index: outlineIndex,
        outline_data: outlineData
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create blog post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in createBlogPostFromOutline:', error);
    throw error;
  }
}

/**
 * Saves a generated blog post to the Django backend
 * @param blogPost The blog post data to save
 * @param token The authentication token
 * @returns The saved blog post
 */


export async function saveBlogPostToDjango(blogPost: any, token: string): Promise<any> {
  const response = await fetch('https://api.s-tierproject.online/blog_api/posts/create_from_outline/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({
      llm_run_id: blogPost.llm_run_id,
      outline_index: blogPost.outline_index,
      content: blogPost.content
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to save blog post');
  }

  return await response.json();
}

/**
 * Polls the blog generation task status until completed
 * @param taskId The ID of the task to poll
 * @param onProgress Optional callback for progress updates
 * @returns The generated blog post content
 */
export async function pollBlogGenerationTask(
  taskId: string,
  onProgress?: (status: string) => void
): Promise<string> {
  const maxAttempts = 60; // 5 minutes with 5-second intervals
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`/projects?taskId=${taskId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to check task status');
      }

      const data = await response.json();
      
      if (data.status === 'completed') {
        return data.result;
      } else if (data.status === 'error' || data.status === 'failed') {
        throw new Error(data.result || 'Task failed');
      }
      
      // If still processing, update progress
      if (onProgress) {
        onProgress(data.status);
      }
      
      // Wait 5 seconds before checking again
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    } catch (error) {
      console.error('Error polling task status:', error);
      throw error;
    }
  }
  
  throw new Error('Task timed out after 5 minutes');
}