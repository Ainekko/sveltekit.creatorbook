// src/lib/nai/stores.ts
import { writable, derived, get } from 'svelte/store';

interface WorkflowState {
  taskId: string | null;
  taskType: string;
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

interface CompetitorRankingData {
  id: string;
  position: number;
  url: string;
  domain: string;
  title: string;
  snippet: string;
}

interface KeywordWithCompetitors {
  id: string;
  keyword: string;
  monthly_searches: number;
  competition: string;
  created_at: string;
  competitors?: CompetitorRankingData[];
}

interface ContentState {
  keywords: KeywordWithCompetitors[];
  outlines: any[];
  blogPosts: any[];
  keywordsLoading: boolean;
  outlinesLoading: boolean;
  postsLoading: boolean;
  topCompetitors: CompetitorRankingData[];
  competitorRankings: Map<string, CompetitorRankingData[]>;
  competitorsLoading: boolean;
  topCompetitorsLoading: boolean;
  competitorsByKeywordLoading?: boolean;
  competitorsByKeyword?: Map<string, CompetitorRankingData[]>;
}

const API_BASE = 'http://127.0.0.1:8000';

// Workflow state
function createWorkflowStore() {
  const initialState: WorkflowState = {
    taskId: null,
    taskType: 'keyword_research',
    status: 'idle',
    isActive: false,
    frequency: 'daily',
    progressMessage: '',
    completedSteps: [],
    lastRun: null,
    nextRun: null,
    result: null,
    selectedWorkflow: 'keyword_research',
    selectedFrequency: 'daily'
  };

  const { subscribe, set, update } = writable<WorkflowState>(initialState);
  let pollingInterval: NodeJS.Timeout | null = null;

  const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  const startPolling = (taskId: string): void => {
    if (pollingInterval) clearInterval(pollingInterval);
    pollingInterval = setInterval(() => pollStatus(taskId), 3000);
  };

  const stopPolling = (): void => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
  };

  const pollStatus = async (taskId: string): Promise<void> => {
    try {
      const response = await fetch(
        `${API_BASE}/orion/api/workflow_status/?task_id=${taskId}`,
        {
          headers: {
            'Authorization': `Token ${getAuthToken()}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        update(state => ({
          ...state,
          status: data.status,
          isActive: data.is_active,
          progressMessage: data.progress_message || '',
          completedSteps: data.completed_steps || [],
          lastRun: data.last_run,
          nextRun: data.next_run,
          result: data.result
        }));

        if (data.status === 'completed' || data.status === 'failed') {
          stopPolling();
        }
      }
    } catch (error) {
      console.error('Error polling status:', error);
    }
  };

  return {
    subscribe,
    
    // Load existing workflow for a project
    async loadWorkflow(projectId: string): Promise<void> {
      try {
        const response = await fetch(
          `${API_BASE}/orion/api/active_workflow/?project_id=${projectId}`,
          {
            headers: {
              'Authorization': `Token ${getAuthToken()}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.task_id) {
            const workflowType = data.task_type as WorkflowState['selectedWorkflow'];
            update(state => ({
              ...state,
              taskId: data.task_id,
              taskType: data.task_type,
              status: data.status,
              isActive: data.is_active,
              frequency: data.frequency,
              progressMessage: data.progress_message || '',
              completedSteps: data.completed_steps || [],
              lastRun: data.last_run,
              nextRun: data.next_run,
              selectedWorkflow: workflowType,
              selectedFrequency: data.frequency
            }));

            // Start polling if workflow is running or pending
            if (data.status === 'running' || data.status === 'pending') {
              startPolling(data.task_id);
            }
          }
        }
      } catch (error) {
        console.error('Error loading workflow:', error);
      }
    },

    // Update selected workflow nodes
    updateSelection(workflow: WorkflowState['selectedWorkflow'], frequency: string): void {
      update(state => ({
        ...state,
        selectedWorkflow: workflow,
        selectedFrequency: frequency
      }));
    },

    // Create and trigger workflow
    async runWorkflow(projectId: string): Promise<void> {
      const state = get({ subscribe });
      
      try {
        // Create workflow
        const createResponse = await fetch(`${API_BASE}/orion/api/create_workflow/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${getAuthToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            project_id: projectId,
            task_type: state.selectedWorkflow,
            frequency: state.selectedFrequency
          })
        });

        if (!createResponse.ok) {
          const error = await createResponse.json();
          throw new Error(error.detail || 'Failed to create workflow');
        }

        const createData = await createResponse.json();
        
        update(s => ({ ...s, taskId: createData.task_id }));

        // Trigger workflow
        const triggerResponse = await fetch(`${API_BASE}/orion/api/trigger_task/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${getAuthToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ task_id: createData.task_id })
        });

        if (triggerResponse.ok) {
          update(s => ({
            ...s,
            status: 'pending',
            isActive: true
          }));
          startPolling(createData.task_id);
          await pollStatus(createData.task_id);
        } else {
          throw new Error('Failed to trigger workflow');
        }
      } catch (error: any) {
        console.error('Error running workflow:', error);
        throw error;
      }
    },

    // Update workflow configuration
    async updateWorkflow(updates: {
      selectedWorkflow?: WorkflowState['selectedWorkflow'];
      selectedFrequency?: string;
      frequency?: string;
      isActive?: boolean;
    }): Promise<void> {
      const state = get({ subscribe });
      if (!state.taskId) return;

      try {
        const response = await fetch(`${API_BASE}/orion/api/update_workflow/`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Token ${getAuthToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            task_id: state.taskId,
            task_type: updates.selectedWorkflow || state.selectedWorkflow,
            frequency: updates.selectedFrequency || updates.frequency || state.selectedFrequency,
            is_active: updates.isActive !== undefined ? updates.isActive : state.isActive
          })
        });

        if (response.ok) {
          const data = await response.json();
          update(s => ({
            ...s,
            isActive: data.is_active,
            frequency: data.frequency,
            selectedFrequency: data.frequency,
            nextRun: data.next_run,
            selectedWorkflow: (data.task_type as WorkflowState['selectedWorkflow']) || s.selectedWorkflow
          }));

          if (!data.is_active) {
            stopPolling();
          }
        } else {
          throw new Error('Failed to update workflow');
        }
      } catch (error) {
        console.error('Error updating workflow:', error);
        throw error;
      }
    },

    // Stop workflow
    async stopWorkflow(): Promise<void> {
      await this.updateWorkflow({ isActive: false });
    },

    // Reset state
    reset(): void {
      stopPolling();
      set(initialState);
    },

    // Cleanup on destroy
    destroy(): void {
      stopPolling();
    }
  };
}

// Content state (keywords, outlines, posts)
function createContentStore() {
  const initialState: ContentState = {
    keywords: [],
    outlines: [],
    blogPosts: [],
    topCompetitors: [],
    keywordsLoading: false,
    outlinesLoading: false,
    postsLoading: false,
    topCompetitorsLoading: false,
    competitorRankings: new Map(),
    competitorsLoading: false
  };

  const { subscribe, set, update } = writable<ContentState>(initialState);
  
  const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  return {
    subscribe,

    async loadKeywords(projectId: string): Promise<void> {
      update(s => ({ ...s, keywordsLoading: true }));
      try {
        const response = await fetch(
          `${API_BASE}/orion/api/keywords/?project_id=${projectId}&limit=10`,
          {
            headers: {
              'Authorization': `Token ${getAuthToken()}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          update(s => ({ ...s, keywords: data.results || data, keywordsLoading: false }));
        }
      } catch (error) {
        console.error('Error loading keywords:', error);
        update(s => ({ ...s, keywordsLoading: false }));
      }
    },

    async loadOutlines(projectId: string): Promise<void> {
      update(s => ({ ...s, outlinesLoading: true }));
      try {
        const response = await fetch(
          `${API_BASE}/orion/api/outlines/?project_id=${projectId}&limit=10`,
          {
            headers: {
              'Authorization': `Token ${getAuthToken()}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          update(s => ({ ...s, outlines: data.results || data, outlinesLoading: false }));
        }
      } catch (error) {
        console.error('Error loading outlines:', error);
        update(s => ({ ...s, outlinesLoading: false }));
      }
    },

    async loadBlogPosts(projectId: string): Promise<void> {
      update(s => ({ ...s, postsLoading: true }));
      try {
        const response = await fetch(
          `${API_BASE}/orion/api/blog_posts/?project_id=${projectId}&limit=10`,
          {
            headers: {
              'Authorization': `Token ${getAuthToken()}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          update(s => ({ ...s, blogPosts: data.results || data, postsLoading: false }));
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
        update(s => ({ ...s, postsLoading: false }));
      }
    },

    async loadTopCompetitors(): Promise<void> {
      update(s => ({ ...s, topCompetitorsLoading: true }));
      try {
        const response = await fetch(
          `${API_BASE}/orion/api/top_comp/?limit=5`,
          {
            headers: {
              'Authorization': `Token ${getAuthToken()}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          
          // Store the flat list of top competitors
          update(s => ({
            ...s,
            topCompetitors: data.results || [],
            topCompetitorsLoading: false
          }));
        }
      } catch (error) {
        console.error('Error loading top competitors:', error);
        update(s => ({ ...s, topCompetitorsLoading: false }));
      }
    },

    // Load competitors for a SPECIFIC keyword
    async loadCompetitorRankings(keywordId: string): Promise<void> {
      update(s => ({ ...s, competitorsByKeywordLoading: true }));
      try {
        const response = await fetch(
          `${API_BASE}/orion/api/competitor_rankings/?keyword_id=${keywordId}`,
          {
            headers: {
              'Authorization': `Token ${getAuthToken()}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          
          // Store this keyword's competitors in the Map
          update(s => {
            const newMap = new Map(s.competitorRankings);
            newMap.set(keywordId, data.results || []);
            
            return {
              ...s,
              competitorRankings: newMap,
              competitorsByKeywordLoading: false
            };
          });
        }
      } catch (error) {
        console.error('Error loading competitor rankings:', error);
        update(s => ({ ...s, competitorsByKeywordLoading: false }));
      }
    },

    

    async loadAll(projectId: string): Promise<void> {
      await Promise.all([
        this.loadKeywords(projectId),
        this.loadOutlines(projectId),
        this.loadBlogPosts(projectId),
        this.loadTopCompetitors(),
      ]);
      
      // Fetch all competitors in parallel, not sequentially
      const state = get({ subscribe });
      // await Promise.all(
      //   state.keywords.map(k => this.loadCompetitorRankings(k.id))
      // );
    },

    reset(): void {
      set(initialState);
    }
  };
}

export const workflowStore = createWorkflowStore();
export const contentStore = createContentStore();

// Derived stores for computed values
export const activeSteps = derived(workflowStore, $workflow => {
  switch ($workflow.selectedWorkflow) {
    case 'keyword_research': return [0];
    case 'generate_outlines': return [0, 1];
    case 'generate_posts': return [0, 1, 2];
    case 'full_workflow': return [0, 1, 2, 3];
    default: return [];
  }
});

export const progressPercent = derived(workflowStore, $workflow => {
  const steps = $workflow.selectedWorkflow === 'keyword_research' ? 1 :
                $workflow.selectedWorkflow === 'generate_outlines' ? 2 :
                $workflow.selectedWorkflow === 'generate_posts' ? 3 : 4;
  return ($workflow.completedSteps.length / steps) * 100;
});