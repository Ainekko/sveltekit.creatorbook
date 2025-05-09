import { writable, derived } from 'svelte/store';

export const wipIdeasStore = writable([]);

export const userStore = writable({
    username: '',
    user_id: 0,
    user_email: '',
    subscription_status: ''
});



export const isLoggedIn = writable(false);


// src/lib/stores/projectStore.js

// Create the main project store
function createProjectStore() {
    // Initialize with null project data and error status
    const { subscribe, set, update } = writable({
        project: null,
        error: null,
        loading: false
    });

    return {
        subscribe,
        
        // Set the entire project data
        setProject: (projectData) => {
            set({
                project: projectData,
                error: null,
                loading: false
            });
        },
        
        // Set an error state
        setError: (errorMessage) => {
            set({
                project: null,
                error: errorMessage,
                loading: false
            });
        },
        
        // Set loading state
        setLoading: (isLoading) => {
            update(state => ({
                ...state,
                loading: isLoading
            }));
        },
        
        // Update specific project fields
        updateProject: (updatedFields) => {
            update(state => {
                if (!state.project) return state;
                
                return {
                    ...state,
                    project: {
                        ...state.project,
                        ...updatedFields
                    }
                };
            });
        },
        
        // Update a specific blog post
        updateBlogPost: (postId, updatedFields) => {
            update(state => {
                if (!state.project || !state.project[0] || !state.project[0].latest_run || !state.project[0].latest_run.blog_posts) {
                    return state;
                }
                
                const updatedBlogPosts = state.project[0].latest_run.blog_posts.map(post => 
                    post.id === postId ? { ...post, ...updatedFields } : post
                );
                
                const updatedProject = {
                    ...state.project[0],
                    latest_run: {
                        ...state.project[0].latest_run,
                        blog_posts: updatedBlogPosts
                    }
                };
                
                return {
                    ...state,
                    project: [updatedProject]
                };
            });
        },
        
        // Clear the store
        reset: () => {
            set({
                project: null,
                error: null,
                loading: false
            });
        }
    };
}

// Create the main store instance
export const projectStore = createProjectStore();

// Derived stores for convenient access to specific data
export const projectData = derived(
    projectStore, 
    $projectStore => $projectStore.project?.[0] || null
);

export const blogPosts = derived(
    projectStore,
    $projectStore => $projectStore.project?.[0]?.latest_run?.blog_posts || []
);

export const projectStatus = derived(
    projectStore,
    $projectStore => $projectStore.project?.[0]?.status || null
);

export const projectUrl = derived(
    projectStore, 
    $projectStore => $projectStore.project?.[0]?.url || null
);

export const latestRun = derived(
    projectStore,
    $projectStore => $projectStore.project?.[0]?.latest_run || null
);

export const isLoading = derived(
    projectStore,
    $projectStore => $projectStore.loading
);

export const error = derived(
    projectStore,
    $projectStore => $projectStore.error
);

// Find a specific blog post by slug
export const findBlogPostBySlug = (slug) => {
    return derived(
        blogPosts,
        $blogPosts => $blogPosts.find(post => post.slug === slug) || null
    );
};