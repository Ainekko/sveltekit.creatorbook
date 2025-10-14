// src/lib/components/integrations/stores.ts
import { writable } from 'svelte/store';
import {API_BASE_URL} from '$lib/config'

const BASEAPI = API_BASE_URL

const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };


export interface WordPressConfig {
  site_url: string;
  username: string;
  app_password: string;
}

export interface Integration {
  id: string;
  project_id: string;
  type: string;
  name: string;
  config: WordPressConfig | Record<string, unknown>;
  is_active: boolean;
  last_verified: string | null;
  created_at: string;
  updated_at: string;
}

interface IntegrationState {
  integrations: Integration[];
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: IntegrationState = {
  integrations: [],
  isLoading: false,
  error: null,
  success: null,
};

function createIntegrationStore() {
  const { subscribe, set, update } = writable<IntegrationState>(initialState);

  return {
    subscribe,
    
    // Fetch all integrations for a project
    async fetchIntegrations(projectId: string) {
      update(state => ({ ...state, isLoading: true, error: null }));
      try {
        const res = await fetch(`${BASEAPI}/integrations/?project_id=${projectId}`,
            {
                headers :{
                    'authorization' : `Token ${getAuthToken()}`,
                    'content-type' : 'application/json'
                }
            }
        );
        if (!res.ok) throw new Error('Failed to fetch integrations');
        const data = await res.json();
        update(state => ({
          ...state,
          integrations: data.results || [],
          isLoading: false,
        }));
      } catch (err) {
        update(state => ({
          ...state,
          error: err instanceof Error ? err.message : 'Unknown error',
          isLoading: false,
        }));
      }
    },

    // Create or update WordPress integration
    async saveWordPressIntegration(projectId: string, config: WordPressConfig) {
      update(state => ({ ...state, isLoading: true, error: null }));
      try {
        const res = await fetch(`${BASEAPI}/integrations/${projectId}/wordpress/`, {
          method: 'POST',
          headers: { 
            'authorization' : `Token ${getAuthToken()}`,
            'Content-Type': 'application/json'
           },
          body: JSON.stringify(config),
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.detail || 'Failed to save integration');
        }
        const newIntegration = await res.json();
        update(state => ({
          ...state,
          integrations: [
            ...state.integrations.filter(i => i.type !== 'wordpress'),
            newIntegration,
          ],
          success: 'WordPress integration saved successfully',
          isLoading: false,
        }));
        return newIntegration;
      } catch (err) {
        update(state => ({
          ...state,
          error: err instanceof Error ? err.message : 'Unknown error',
          isLoading: false,
        }));
        throw err;
      }
    },

    // Delete an integration
    async deleteIntegration(integrationId: string) {
      update(state => ({ ...state, isLoading: true, error: null }));
      try {
        const res = await fetch(`${BASEAPI}/integrations/${integrationId}/`, {
          headers : {
            'authorization' : `Token ${getAuthToken()}`,
            'content-type' : 'application/json'
          },
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete integration');
        update(state => ({
          ...state,
          integrations: state.integrations.filter(i => i.id !== integrationId),
          success: 'Integration removed',
          isLoading: false,
        }));
      } catch (err) {
        update(state => ({
          ...state,
          error: err instanceof Error ? err.message : 'Unknown error',
          isLoading: false,
        }));
      }
    },

    // Verify WordPress connection
    async verifyWordPressConnection(projectId: string, config: WordPressConfig) {
      update(state => ({ ...state, isLoading: true, error: null }));
      try {
        const res = await fetch(`${BASEAPI}/integrations/${projectId}/wordpress/verify/`, {
          method: 'POST',
          headers: { 
            'authorization' : `Token ${getAuthToken()}`,
            'Content-Type': 'application/json' },
          body: JSON.stringify(config),
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.detail || 'Connection failed');
        }
        update(state => ({
          ...state,
          success: 'WordPress connection verified',
          isLoading: false,
        }));
        return true;
      } catch (err) {
        update(state => ({
          ...state,
          error: err instanceof Error ? err.message : 'Unknown error',
          isLoading: false,
        }));
        return false;
      }
    },

    // Clear error/success messages
    clearMessages() {
      update(state => ({
        ...state,
        error: null,
        success: null,
      }));
    },

    reset() {
      set(initialState);
    },
  };
}

export const integrationStore = createIntegrationStore();