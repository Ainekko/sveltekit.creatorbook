import type { UUID } from 'crypto';



export interface AgentData {
  id: string;
  name: string;
  status: string;
  lastScan: string;
  nextAction: string;
  autopilot: {
    enabled: boolean;
    frequency: string;
    nextRun: string;
  };
}

export interface Keyword {
  id: UUID;
  agent: UUID;
  keyword: string;
  monthly_searches: number;
  competition: 'Low' | 'Medium' | 'High';
  keyword_difficulty: number;
  cpc: number;
  trend: 'Rising' | 'Stable' | 'Declining' | 'New';
  created_at: string;
}

export interface BlogOutline {
  id: UUID;
  agent: UUID;
  llm_run: UUID | null;
  title: string;
  meta_description: string;
  target_keywords: string[];
  outline_content: string[];
  created_at: string;
}

export interface BlogPost {
  id: UUID;
  outline: UUID | null;
  content: string;
  title_formatted: string;
  meta_description: string;
  word_count: number;
  primary_keyword: string;
  secondary_keywords: string[];
  content_type: string;
  sections: string[];
  status: 'draft' | 'published' | 'scheduled';
  scheduled_time: string | null;
  created_at: string;
  updated_at: string;
  title: string; // Computed property
  agent: UUID | null; // Computed property
}

export interface CompetitorRanking {
  id: UUID;
  keyword: UUID;
  position: number;
  url: string | null;
  domain: string | null;
  title: string | null;
  snippet: string;
  last_updated: string;
}

// ============ API Response Types ============

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface WorkflowStatusResponse {
  task_id: string;
  task_type: 'keyword_research' | 'generate_outlines' | 'generate_posts' | 'full_workflow';
  status: 'idle' | 'pending' | 'running' | 'completed' | 'failed';
  is_active: boolean;
  frequency: string;
  progress_message: string;
  completed_steps: string[];
  last_run: string | null;
  next_run: string | null;
  result: any;
}

// ============ Store State Types ============

export interface WorkflowState {
  taskId: string | null;
  taskType: 'keyword_research' | 'generate_outlines' | 'generate_posts' | 'full_workflow';
  status: 'idle' | 'pending' | 'running' | 'completed' | 'failed';
  isActive: boolean;
  frequency: string;
  progressMessage: string;
  completedSteps: string[];
  lastRun: string | null;
  nextRun: string | null;
  result: any;
  selectedWorkflow: 'keyword_research' | 'generate_outlines' | 'generate_posts' | 'full_workflow';
  selectedFrequency: string;
}

export interface ContentState {
  keywords: Keyword[];
  outlines: BlogOutline[];
  blogPosts: BlogPost[];
  keywordsLoading: boolean;
  outlinesLoading: boolean;
  postsLoading: boolean;
  topCompetitors: CompetitorRanking[];
  competitorRankings: Map<UUID, CompetitorRanking[]>;
  competitorsLoading: boolean;
  topCompetitorsLoading: boolean;
}

// ============ Component Props Types ============

export interface KeywordsComponentProps {
  projectId: UUID;
}

export interface ContentComponentProps {
  projectId: UUID;
}

// ============ UI Helper Types ============

export type CompetitionLevel = 'Low' | 'Medium' | 'High';
export type TrendType = 'Rising' | 'Stable' | 'Declining' | 'New';
export type PostStatus = 'draft' | 'published' | 'scheduled';
export type WorkflowType = 'keyword_research' | 'generate_outlines' | 'generate_posts' | 'full_workflow';

export interface Task {
  id: number;
  type: string;
  status: string;
  progress: number;
  message: string;
}
