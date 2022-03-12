import { Headline3, Loading } from '@theturkeydev/gobble-lib-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { createEnvironment, getProject } from '../../network/network';
import { ProjectInfo } from './project-info';

const ContentWrapper = styled.div`
    margin: 0px 16px;
`;

const TabDisplay = styled.div`
    display: grid;
    grid-template-columns: 1fr;
`;

const TabDisplayContent = styled.div`
    border: 3px solid #616161;
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
    background: ${({ selected }) => selected ? '#616161' : '#3e3e3e'};
    padding: 4px 8px;
    display: grid;
    gap: 8px;
    grid-auto-flow: column;
`;

export const ProjectEdit = () => {
    const { projectId } = useParams();

    const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
    const [newEnvName, setNewEnvName] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState('');

    useEffect(() => {
        if (projectId) {
            getProject(projectId).then(setProjectInfo);
        }
    }, [projectId]);

    const addNewEnv = () => {
        setNewEnvName('');
    };

    const confirmAddNewEnv = () => {
        if (!newEnvName || !projectInfo || !projectId)
            return;
        const id = newEnvName.toLowerCase().replaceAll(' ', '-');
        if (id === '' || projectInfo.environments.some(e => e.id === id))
            return;
        createEnvironment(projectId, id, newEnvName).then(() => {
            setProjectInfo({ ...projectInfo, environments: [...(projectInfo?.environments ?? []), { id: id, name: newEnvName }] });
            setNewEnvName(null);
        });
    };

    if (!projectInfo)
        return <Loading />;

    return (
        <ContentWrapper>
            <Headline3>{projectInfo.title}</Headline3>
            <TabDisplay>
                <TabDisplayTabs>
                    {
                        projectInfo.environments && projectInfo.environments.map(e => <Tab key={e.id} selected={selectedTab === e.id} onClick={() => setSelectedTab(e.id)}>{e.name}</Tab>)
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
                    {selectedTab === '0' &&
                        <div>
                            Testing
                        </div>
                    }
                </TabDisplayContent>
            </TabDisplay>
        </ContentWrapper>
    );
};