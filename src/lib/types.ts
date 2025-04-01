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