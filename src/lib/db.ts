// src/lib/db.ts
import type { Project, AnalysisResult } from './types';




/**
 * Saves a new project to the database
 * @param userId The ID of the user creating the project
 * @param clientUrl The URL of the website being analyzed
 * @param businessType The type of business
 * @param marketingGoals The marketing goals
 * @param analysisData The analysis result data
 * @returns The saved project data
 */

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
    userId: number,
    clientUrl: string,
    businessType: string,
    marketingGoals: string,
    analysisData: AnalysisResult
  ): Promise<Project> {
    try {
      // Extract business name from analysis or use URL as fallback
      const projectName = analysisData.website_analysis?.business_name || 
                          new URL(clientUrl).hostname.replace('www.', '');
      
      const projectData = {
        user_id: userId,
        name: projectName,
        url: clientUrl,
        business_type: businessType,
        goals: marketingGoals,
        data: analysisData,
        created_at: new Date().toISOString()
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
  export async function analyzeWebsite(url: string): Promise<AnalysisResult> {
    if (!url) {
      throw new Error("Please enter a website URL");
    }
  
    try {
      // Make API request to Django backend
      const response = await fetch(`http://127.0.0.1:8000/cry_praw/analyze/?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      return await response.json();
    } catch (err) {
      throw new Error(`Error analyzing website: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  
  /**
   * Type definitions to support the database functions
   */
  export interface TypeDefinitions {
    // This is a placeholder - you should define your actual types in a separate file
  }
