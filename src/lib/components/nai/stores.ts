// src/lib/nai/stores.ts
import { writable, derived, get } from 'svelte/store';
import { API_BASE_URL } from '$lib/config';

interface WorkflowState {
  taskId: string | null;
  taskType: string;
  status: 'idle' | 'pending' | 'running' | 'completed' | 'failed';
  isActive: boolean;
  frequency: string;
  config: {
    auto_publish: {
      enabled: boolean,
      integrations: string[]
    }
  },
  integrations: any[];
  progressMessage: string;
  completedSteps: string[];
  lastRun: string | null;
  nextRun: string | null;
  result: any;
  selectedWorkflow: 'keyword_research' | 'generate_outlines' | 'generate_posts' | 'full_workflow'; 
  selectedFrequency: string;
  isEditing: boolean;
  scheduledNotification: { message: string; time: string } | null;
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

const API_BASE = API_BASE_URL;

function createWorkflowStore() {
  const initialState: WorkflowState = {
    taskId: null,
    taskType: 'keyword_research',
    status: 'idle',
    isActive: false,
    frequency: 'daily',
    config: {
      auto_publish: {
        enabled: false,
        integrations: []
      }
    },
    integrations: [],
    progressMessage: '',
    completedSteps: [],
    lastRun: null,
    nextRun: null,
    result: null,
    selectedWorkflow: 'keyword_research',
    selectedFrequency: 'daily',
    isEditing: false,
    scheduledNotification: null
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
          config: data.config || state.config,
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

  const loadIntegrations = async (projectId: string): Promise<void> => {
    try {
      const response = await fetch(
        `${API_BASE}/integrations/?project_id=${projectId}`,
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
          integrations: data.results || []
        }));
      }
    } catch (error) {
      console.error('Error loading integrations:', error);
    }
  };

  const updateAutoPublish = (enabled: boolean, integrations: string[]): void => {
    update(state => ({
      ...state,
      config: {
        ...state.config,
        auto_publish: {
          enabled,
          integrations
        }
      }
    }));
  };

  return {
    subscribe,

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
              config: data.config || { auto_publish: { enabled: false, integrations: [] } },
              progressMessage: data.progress_message || '',
              completedSteps: data.completed_steps || [],
              lastRun: data.last_run,
              nextRun: data.next_run,
              selectedWorkflow: workflowType,
              selectedFrequency: data.frequency,
              isEditing: false
            }));

            if (data.status === 'running' || data.status === 'pending') {
              startPolling(data.task_id);
            }
          } else {
            update(state => ({
              ...state,
              taskId: null,
              isActive: false,
              status: 'idle',
              nextRun: null,
              lastRun: null,
              progressMessage: '',
              completedSteps: [],
              result: null,
              isEditing: false,
              scheduledNotification: null,
              config: { auto_publish: { enabled: false, integrations: [] } }
            }));
          }
        }
      } catch (error) {
        console.error('Error loading workflow:', error);
      }
    },

    loadIntegrations,
    updateAutoPublish,

    updateSelection(workflow: WorkflowState['selectedWorkflow'], frequency: string): void {
      update(state => ({
        ...state,
        selectedWorkflow: workflow,
        selectedFrequency: frequency
      }));
    },

    async createWorkflow(projectId: string): Promise<void> {
      const state = get({ subscribe });
      
      try {
        const response = await fetch(`${API_BASE}/orion/api/create_workflow/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${getAuthToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            project_id: projectId,
            task_type: state.selectedWorkflow,
            frequency: state.selectedFrequency,
            config: state.config
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail || 'Failed to create workflow');
        }

        const data = await response.json();
        update(s => ({
          ...s,
          taskId: data.task_id,
          status: 'idle',
          isActive: true,
          config: data.config || s.config
        }));
      } catch (error: any) {
        console.error('Error creating workflow:', error);
        throw error;
      }
    },

    async triggerWorkflow(projectId: string): Promise<void> {
      const state = get({ subscribe });

      if (!state.taskId) {
        throw new Error('No workflow created yet. Call createWorkflow first.');
      }

      try {
        const response = await fetch(`${API_BASE}/orion/api/trigger_task/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${getAuthToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ task_id: state.taskId })
        });

        if (response.ok) {
          update(s => ({
            ...s,
            status: 'pending',
            isActive: true
          }));
          startPolling(state.taskId);
          await pollStatus(state.taskId);
        } else if (response.status === 409) {
          const conflictData = await response.json();
          const nextRunTime = conflictData.details || 'soon';
          update(s => ({
            ...s,
            scheduledNotification: {
              message: 'Workflow is already scheduled',
              time: nextRunTime
            }
          }));
          await this.loadWorkflow(projectId);
        } else {
          throw new Error('Failed to trigger workflow');
        }
      } catch (error: any) {
        console.error('Error triggering workflow:', error);
        throw error;
      }
    },

    async createAndRunWorkflow(projectId: string): Promise<void> {
      await this.createWorkflow(projectId);
      await this.triggerWorkflow(projectId);
    },

    async updateWorkflow(updates: {
      selectedWorkflow?: WorkflowState['selectedWorkflow'];
      selectedFrequency?: string;
      frequency?: string;
      isActive?: boolean;
      config?: any;
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
            is_active: updates.isActive !== undefined ? updates.isActive : state.isActive,
            config: updates.config || state.config
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
            taskType: data.task_type || s.taskType,
            selectedWorkflow: (data.task_type as WorkflowState['selectedWorkflow']) || s.selectedWorkflow,
            config: data.config || s.config,
            isEditing: false,
            scheduledNotification: null
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

    async pauseWorkflow(): Promise<void> {
      await this.updateWorkflow({ isActive: false });
    },

    async resumeWorkflow(): Promise<void> {
      await this.updateWorkflow({ isActive: true });
    },

    setEditing(editing: boolean): void {
      update(s => ({ ...s, isEditing: editing }));
    },

    clearNotification(): void {
      update(s => ({ ...s, scheduledNotification: null }));
    },

    reset(): void {
      stopPolling();
      set(initialState);
    },

    destroy(): void {
      stopPolling();
    }
  };
}

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

    async loadTopCompetitors(projectId : string): Promise<void> {
      update(s => ({ ...s, topCompetitorsLoading: true }));
      try {
        const response = await fetch(
          `${API_BASE}/orion/api/top_comp/?project_id=${projectId}&limit=5`,
          {
            headers: {
              'Authorization': `Token ${getAuthToken()}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
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
        this.loadTopCompetitors(projectId),
      ]);
    },

    reset(): void {
      set(initialState);
    }
  };
}

export const workflowStore = createWorkflowStore();
export const contentStore = createContentStore();

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