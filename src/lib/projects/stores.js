// $lib/projects/stores.js

import { writable, derived } from 'svelte/store';
import { createProject, getProjects, getProject } from './projects';

// Core project stores
export const projects = writable([]);
export const currentProject = writable(null);
export const isLoading = writable(false);
export const error = writable(null);

// Derived stores for computed values
export const projectsCount = derived(projects, $projects => $projects.length);

export const currentProjectAgents = derived(
    currentProject, 
    $currentProject => $currentProject?.agents || []
);

export const hasProjects = derived(
    projects, 
    $projects => $projects.length > 0
);

// Store actions/methods
export const projectStore = {
    // Initialize/Load all projects
    async loadProjects(token) {
        isLoading.set(true);
        error.set(null);
        
        try {
            const projectList = await getProjects(token);
            console.log(projectList)
            projects.set(projectList);
        } catch (err) {
            console.error('Failed to load projects:', err);
            error.set(err.message);
        } finally {
            isLoading.set(false);
        }
    },

    // Create a new project and add to store
    async createProject(token, projectData) {
        isLoading.set(true);
        error.set(null);
        
        try {
            const newProject = await createProject(token, projectData);
            
            // Add to projects list
            projects.update(current => [...current, newProject]);
            
            // Set as current project
            currentProject.set(newProject);
            
            return newProject;
        } catch (err) {
            console.error('Failed to create project:', err);
            error.set(err.message);
            throw err; // Re-throw so component can handle navigation
        } finally {
            isLoading.set(false);
        }
    },

    // Load a specific project and set as current
    async loadProject(token, projectId) {
        isLoading.set(true);
        error.set(null);
        
        try {
            // First check if we already have it in the store
            const current = projects.subscribe(list => {
                const existing = list.find(p => p.id === projectId);
                if (existing) {
                    currentProject.set(existing);
                    isLoading.set(false);
                    return;
                }
            });
            current(); // Call the unsubscribe function immediately

            // If not in store, fetch from API
            const project = await getProject(token, projectId);
            currentProject.set(project);
            
            // Also add to projects list if not already there
            projects.update(current => {
                const exists = current.find(p => p.id === projectId);
                if (!exists) {
                    return [...current, project];
                }
                return current.map(p => p.id === projectId ? project : p);
            });
            
        } catch (err) {
            console.error('Failed to load project:', err);
            error.set(err.message);
        } finally {
            isLoading.set(false);
        }
    },

    // Set current project (for switching between loaded projects)
    setCurrentProject(project) {
        currentProject.set(project);
    },

    // Update a project in the store
    updateProject(updatedProject) {
        projects.update(current => 
            current.map(p => p.id === updatedProject.id ? updatedProject : p)
        );
        
        // Update current project if it's the same
        currentProject.update(current => 
            current?.id === updatedProject.id ? updatedProject : current
        );
    },

    // Remove a project from store
    removeProject(projectId) {
        projects.update(current => current.filter(p => p.id !== projectId));
        
        // Clear current project if it was the deleted one
        currentProject.update(current => 
            current?.id === projectId ? null : current
        );
    },

    // Clear all stores (useful for logout)
    clear() {
        projects.set([]);
        currentProject.set(null);
        error.set(null);
        isLoading.set(false);
    },

    // Clear only error
    clearError() {
        error.set(null);
    }
};

// Export individual actions for convenience
export const { 
    loadProjects, 
    createProject: createProjectAction,
    loadProject,
    setCurrentProject,
    updateProject: updateProjectAction,
    deleteProject: deleteProjectAction,
    clear: clearProjectStore,
    clearError: clearProjectError
} = projectStore;