// lib/types.ts
export interface User {
    username: string;
    user_id: string;
    user_email: string;
    subscription_status: string;
  }
  
  export interface AnalysisResult {
    website_analysis?: {
      business_name?: string;
      // Add other properties from the analysis result as needed
    };
    // Add other top-level properties from the analysis result
  }
  
  export interface Project {
    id: string;
    user_id?: string;
    name: string;
    url: string;
    business_type: string;
    goals: string;
    data: AnalysisResult;
    created_at: string;
    updated_at?: string;
  }



  /**
 * Interface representing a blog post outline
 */
export interface BlogPostOutline {
  title: string;
  target_keyword: string;
  secondary_keywords: string[];
  meta_description: string;
  estimated_ranking_potential: number;
  outline?: string; // Optional outline structure
}

/**
 * Interface for a full blog post
 */
export interface BlogPost extends BlogPostOutline {
  content: string;
  created_at?: string;
  updated_at?: string;
  id?: string;
  author?: string;
  published?: boolean;
}

/**
 * Status of a task
 */
export type TaskStatus = 'processing' | 'completed' | 'failed' | 'error';

/**
 * Interface for task response
 */
export interface TaskResponse {
  taskId: string;
  status: TaskStatus;
  result?: any;
}


export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  is_published: boolean;
  created_at: string;
  target_keyword: string;
  secondary_keywords: string[];
  meta_description: string;
  estimated_ranking_potential: number;
}
