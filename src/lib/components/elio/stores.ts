// src/lib/components/elio/stores.ts
import { writable, derived, get } from 'svelte/store';
import { API_BASE_URL } from '$lib/config';
import {
    fetchProjectData,
    fetchOpportunitiesFromBackend,
    fetchRedditPostsFromBackend,
    fetchProfile,
    scanOpportunities,
    expandContentToReddit
} from './api';

interface ElioState {
    project: any | null;
    config: any | null;
    redditAccount: any | null;
    opportunities: any[];
    posts: any[];
    profile: any | null;
    loading: {
        project: boolean;
        opportunities: boolean;
        posts: boolean;
        profile: boolean;
    };
    error: string | null;
}

const initialState: ElioState = {
    project: null,
    config: null,
    redditAccount: null,
    opportunities: [],
    posts: [],
    profile: null,
    loading: {
        project: false,
        opportunities: false,
        posts: false,
        profile: false
    },
    error: null
};

function createElioStore() {
    const { subscribe, set, update } = writable<ElioState>(initialState);

    const getAuthToken = (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    };

    return {
        subscribe,

        async loadProjectData(projectId: string) {
            update((s) => ({ ...s, loading: { ...s.loading, project: true } }));
            try {
                const token = getAuthToken();
                if (!token) throw new Error('No auth token');

                const data = await fetchProjectData(projectId, token, API_BASE_URL);
                update((s) => ({
                    ...s,
                    project: data.project,
                    config: data.config,
                    redditAccount: data.reddit_account,
                    loading: { ...s.loading, project: false }
                }));
            } catch (error: any) {
                console.error('Error loading Elio project data:', error);
                update((s) => ({
                    ...s,
                    error: error.message,
                    loading: { ...s.loading, project: false }
                }));
            }
        },

        async loadOpportunities(projectId: string) {
            update((s) => ({ ...s, loading: { ...s.loading, opportunities: true } }));
            try {
                const token = getAuthToken();
                if (!token) throw new Error('No auth token');

                const data = await fetchOpportunitiesFromBackend(projectId, token, API_BASE_URL);
                update((s) => ({
                    ...s,
                    opportunities: data.opportunities || [],
                    loading: { ...s.loading, opportunities: false }
                }));
            } catch (error: any) {
                console.error('Error loading Elio opportunities:', error);
                update((s) => ({
                    ...s,
                    error: error.message,
                    loading: { ...s.loading, opportunities: false }
                }));
            }
        },

        async loadPosts(projectId: string) {
            update((s) => ({ ...s, loading: { ...s.loading, posts: true } }));
            try {
                const token = getAuthToken();
                if (!token) throw new Error('No auth token');

                const data = await fetchRedditPostsFromBackend(projectId, token, API_BASE_URL);
                update((s) => ({
                    ...s,
                    posts: data.posts || [],
                    loading: { ...s.loading, posts: false }
                }));
            } catch (error: any) {
                console.error('Error loading Elio posts:', error);
                update((s) => ({
                    ...s,
                    error: error.message,
                    loading: { ...s.loading, posts: false }
                }));
            }
        },

        async loadProfile(projectId: string) {
            update((s) => ({ ...s, loading: { ...s.loading, profile: true } }));
            try {
                const token = getAuthToken();
                if (!token) throw new Error('No auth token');

                // Note: fetchProfile might fail if no reddit account is connected, handle gracefully
                const data = await fetchProfile(projectId, token, API_BASE_URL);
                update((s) => ({
                    ...s,
                    profile: data,
                    loading: { ...s.loading, profile: false }
                }));
            } catch (error: any) {
                console.warn('Error loading Elio profile (might not be connected):', error);
                update((s) => ({
                    ...s,
                    // Don't set global error for profile load failure as it's optional
                    loading: { ...s.loading, profile: false }
                }));
            }
        },

        async scanForOpportunities(projectId: string) {
            update((s) => ({ ...s, loading: { ...s.loading, opportunities: true } }));
            try {
                const token = getAuthToken();
                if (!token) throw new Error('No auth token');

                const data = await scanOpportunities(projectId, token, API_BASE_URL);
                // The scan returns opportunities, so we can update the store directly
                update((s) => ({
                    ...s,
                    opportunities: data.opportunities || [],
                    loading: { ...s.loading, opportunities: false }
                }));
            } catch (error: any) {
                console.error('Error scanning for opportunities:', error);
                update((s) => ({
                    ...s,
                    error: error.message,
                    loading: { ...s.loading, opportunities: false }
                }));
                throw error;
            }
        },

        async expandPost(projectId: string, postId: string) {
            // We don't necessarily have a loading state for this in the main store object yet,
            // but we can add one or just handle it in the component.
            // For now, let's just perform the action.
            try {
                const token = getAuthToken();
                if (!token) throw new Error('No auth token');

                const data = await expandContentToReddit(projectId, postId, token, API_BASE_URL);
                // Optionally update posts list if the response includes the new post
                if (data.success && data.post) {
                    update((s) => ({
                        ...s,
                        posts: [data.post, ...s.posts]
                    }));
                }
                return data;
            } catch (error: any) {
                console.error('Error expanding post:', error);
                throw error;
            }
        },

        async loadAll(projectId: string) {
            await Promise.all([
                this.loadProjectData(projectId),
                this.loadOpportunities(projectId),
                this.loadPosts(projectId),
                this.loadProfile(projectId)
            ]);
        },

        reset() {
            set(initialState);
        }
    };
}

export const elioStore = createElioStore();
