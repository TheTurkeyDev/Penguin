import { ContainedButton } from '@theturkeydev/gobble-lib-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getProjects } from '../../network/network';
import { NewProjectModal } from './modals/new-project-modal';
import { Project } from '../project/project';
import { ProjectType } from '../project/project-type';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
`;

const ToolBar = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    padding: 8px;
`;

const ProjectsWrapper = styled.div`
    margin: 32px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 32px;
`;

export const Dashboard = () => {
    const [projects, setProjects] = useState<readonly ProjectType[]>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getProjects().then(setProjects);
    }, []);

    return (
        <ContentWrapper>
            <ToolBar>
                <div />
                <ContainedButton onClick={() => setVisible(true)}>
                    New Project
                </ContainedButton>
            </ToolBar>
            <NewProjectModal show={visible} requestClose={() => setVisible(false)} addNewProject={proj => setProjects(old => [...old, proj])} />
            <ProjectsWrapper>
                {
                    projects.map(p => (
                        <Project key={p.id} project={p} />
                    ))
                }
            </ProjectsWrapper>
        </ContentWrapper>
    );
};