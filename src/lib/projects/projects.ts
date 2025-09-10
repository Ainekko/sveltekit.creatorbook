// $lib/projects/projects.ts

import { API_BASE_URL } from '$lib/config';


export interface ProjectData {
    url: string;
    business_name: string;
    target_audience: string;
    description: string;
    tone: string;
    industry: string;
}

export interface Project extends ProjectData {
    id: string;
    created_at: string;
    updated_at: string;
    agents: any[];
}

export async function createProject(token: string, projectData: ProjectData): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/projects/create_projects/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(projectData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function getProjects(token: string): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/projects/get-projects/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function getProject(token: string, projectId: string): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}