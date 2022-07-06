import { BaseTheme, Body2, Headline3, Loading, OutlinedButton, SpaceBetween } from '@theturkeydev/gobble-lib-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { ThemedStyledProps, ThemeProps } from 'styled-components';
import { createEnvironment, getEnvironmentBuildBlocks, getProject } from '../../network/network';
import { BuildBlocksList } from '../build-blocks/build-blocks-list';
import { BuildBlock } from '../build-blocks/building-block';
import { ProjectInfo } from './project-info';

const ContentWrapper = styled.div`
    margin: 0px 16px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
`;

const TabDisplay = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    overflow-y: hidden;
`;

const TabDisplayContent = styled.div`
    border: 2px solid #616161;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr);
    overflow: hidden;
`;

const TabDisplayTabs = styled.div`
    display: flex;
    gap: 2px;
    &:hover {
        cursor: pointer;
    }
`;

type TabProps = {
    readonly selected?: boolean
}
const Tab = styled.div<TabProps>`
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    background: ${({ theme, selected }: ThemedStyledProps<TabProps, BaseTheme>) => `${theme.surface.color}${selected ? 'ff' : 'aa'}`};
    padding: 4px 8px;
    display: grid;
    gap: 8px;
    grid-auto-flow: column;
`;

export const ProjectEdit = () => {
    const { projectId } = useParams();

    const navigate = useNavigate();

    const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
    const [newEnvName, setNewEnvName] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState('');
    const [buildBlocks, setbuildBlocks] = useState<readonly BuildBlock[]>([]);

    useEffect(() => {
        if (projectId) {
            getProject(projectId).then(setProjectInfo);
        }
    }, [projectId]);

    useEffect(() => {
        if (!projectId || !selectedTab)
            return;
        getEnvironmentBuildBlocks(projectId, selectedTab).then(blocks => setbuildBlocks(blocks ?? []));
    }, [projectId, selectedTab]);

    const addNewEnv = () => {
        setNewEnvName('');
    };

    const confirmAddNewEnv = () => {
        if (!projectInfo || !projectId)
            return;
        const id = newEnvName.toLowerCase().replaceAll(' ', '-');
        if (id === '' || projectInfo.environments.some(e => e.id === id))
            return;
        createEnvironment(projectId, id, newEnvName).then(() => {
            setProjectInfo({ ...projectInfo, environments: [...(projectInfo?.environments ?? []), { id: id, name: newEnvName }] });
            setNewEnvName('');
        });
    };

    if (!projectInfo)
        return <Loading />;

    return (
        <ContentWrapper>
            <SpaceBetween>
                <Headline3>{projectInfo.title}</Headline3>
                <OutlinedButton onClick={() => navigate(`/project/${projectId}`)}>Back</OutlinedButton>
            </SpaceBetween>
            <TabDisplay>
                <TabDisplayTabs>
                    {
                        projectInfo.environments && projectInfo.environments.map(e => (
                            <Tab key={e.id} selected={selectedTab === e.id} onClick={() => setSelectedTab(e.id)}>
                                <Body2>{e.name}</Body2>
                            </Tab>
                        ))
                    }
                    {
                        newEnvName !== null && (
                            <Tab>
                                <input type='text' value={newEnvName} onChange={e => setNewEnvName(e.target.value)} />
                                <i className='fas fa-plus' onClick={() => confirmAddNewEnv()} />
                            </Tab>
                        )
                    }
                    {
                        (!newEnvName && newEnvName !== '') && <Tab onClick={() => addNewEnv()}><i className='fas fa-plus' /></Tab>
                    }

                </TabDisplayTabs>
                <TabDisplayContent>
                    {
                        buildBlocks.map(b => {
                            switch (b.type) {
                                case 'jenkins':
                                    return <div>
                                        Jenkins
                                    </div>;
                            }
                        })
                    }
                </TabDisplayContent>
            </TabDisplay>
        </ContentWrapper>
    );
};