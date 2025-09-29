
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
  id: number;
  keyword: string;
  volume: number;
  difficulty: number;
  selected: boolean;
  trend: string;
}

export interface Outline {
  id: number;
  title: string;
  metaDescription: string;
  targetKeywords: string[];
  wordCount: number;
  status: string;
  estimatedTime: string;
}


export interface BlogPost {
  id: number;
  title: string;
  status: string;
  publishedAt?: string;
  createdAt?: string;
  views?: number;
  engagement?: string;
  wordCount?: number;
  keywords: string[];
}

export interface Task {
  id: number;
  type: string;
  status: string;
  progress: number;
  message: string;
}
