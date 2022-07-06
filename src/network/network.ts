import { ProjectInfo } from '../pages/project/project-info';
import { ProjectType } from '../pages/project/project-type';

export function getGetParams() {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPostParams(body?: any) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
}

const getBaseAPIURL = () => {
    return location.origin + '/api';
};

export async function getProjects() {
    return await fetch(`${getBaseAPIURL()}/projects`, getGetParams()).then(response => {
        if (response.status === 200)
            return response.json();
        return [];
    });
}

export function createProjects(title: string, subtitle: string, id: string, image: string): Promise<ProjectType> {
    return fetch(`${getBaseAPIURL()}/projects`, getPostParams(
        { title, subtitle, id, image }
    )).then(response => {
        if (response.status === 201)
            return response.json();
        return null;
    });
}


export async function getProject(id: string): Promise<ProjectInfo | null> {
    return await fetch(`${getBaseAPIURL()}/projects/${id}`, getGetParams()).then(response => {
        if (response.status === 200)
            return response.json();
        return null;
    });
}

export async function deleteProject(id: string) {
    return await fetch(`${getBaseAPIURL()}/projects/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.status === 200)
            return response.json();
        return {};
    });
}

export async function createEnvironment(projectId: string, id: string, name: string) {
    return await fetch(`${getBaseAPIURL()}/projects/${projectId}/environment`, getPostParams(
        { id, name }
    )).then(response => {
        if (response.status === 201)
            return response.json();
        return {};
    });
}

export async function getEnvironmentBuildBlocks(projId: string, envId: string): Promise<any | null> {
    return await fetch(`${getBaseAPIURL()}/projects/${projId}/environment/${envId}/blocks`, getGetParams()).then(response => {
        if (response.status === 200)
            return response.json();
        return null;
    });
}

export async function getProjectVersions(id: string, page: number) {
    return await fetch(`${getBaseAPIURL()}/projects/${id}/versions?page=${page}`, getGetParams()).then(response => {
        if (response.status === 200)
            return response.json();
        return [];
    });
}