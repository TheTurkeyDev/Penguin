import { Body1, ConfirmationModal, ContainedButton, Headline3, Headline5, Loading, OutlinedButton, SpaceBetween, Subtitle1 } from '@theturkeydev/gobble-lib-react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteProject, getProject, getProjectVersions } from '../../network/network';
import { ButtonDropdown, DropDownItem } from '../../_modules/button-dropdown';
import { IconButton } from '../../_modules/icon-button';
import { ProjectInfo } from './project-info';
import { Version } from './version';

const Wrapper = styled.div`
    display: grid;
    padding: 16px 24px 0 24px;
    overflow-y: auto;
    grid-template-rows: auto auto auto 1fr;
    gap: 16px;
`;

const TableWrapper = styled.table`
    border: 1px solid white;
    border-collapse: collapse;
`;

const TableHeaderRow = styled.tr`
    height: 64px;
`;

const TableRow = styled.tr`
    height: 48px;
    &:nth-child(odd) {
        background: #292d31;
    }
`;

const THLWarpper = styled.th`
    text-align: left;
    padding-left: 8px;
`;

const TDLWarpper = styled.td`
    text-align: left;
    padding-left: 8px;
`;

const TDWarpper = styled.td`
    text-align: center;
`;

export const ProjectOverview = () => {
    const { projectId } = useParams();

    const navigate = useNavigate();

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
    const [versions, setVersions] = useState<readonly Version[]>([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (projectId) {
            getProject(projectId).then(setProjectInfo);
        }
    }, [projectId]);

    useEffect(() => {
        if (projectId) {
            getProjectVersions(projectId, page).then(json => setVersions(curr => [...curr, ...json.builds]));
        }
    }, [projectId, page]);

    const loadMore = () => {
        setPage(old => old + 1);
    };

    if (!projectInfo || !projectId)
        return <Loading />;

    return (
        <Wrapper>
            <SpaceBetween>
                <Headline3>{projectInfo.title}</Headline3>
                <ButtonDropdown>
                    <IconButton icon='fas fa-ellipsis-v' />
                    <DropDownItem onClick={() => navigate(`/project/${projectId}/edit`)}>
                        <Body1>Edit</Body1>
                    </DropDownItem>
                    <DropDownItem onClick={() => setShowDeleteConfirm(true)}>
                        <Body1>Delete</Body1>
                    </DropDownItem>
                </ButtonDropdown>
            </SpaceBetween>
            {
                projectInfo.environments?.length > 0 &&
                <>
                    <TableWrapper>
                        <thead>
                            <TableHeaderRow>
                                <THLWarpper>
                                    <Headline5>Version</Headline5>
                                </THLWarpper>
                                {
                                    projectInfo.environments.map(e => <th key={e.id}><Headline5>{e.name}</Headline5></th>)
                                }
                            </TableHeaderRow>
                        </thead>
                        <tbody>
                            {
                                versions.map(v => (
                                    <TableRow key={v.number}>
                                        <TDLWarpper>{v.number}</TDLWarpper>
                                        {
                                            projectInfo.environments.map(e => (
                                                <TDWarpper key={e.id}>
                                                    <OutlinedButton onClick={() => {
                                                        // fetch(`http://127.0.0.1:8082/api/projects/${projectId}/deploy?build=${v.number}`, {
                                                        //     method: 'POST'
                                                        // });
                                                    }}>Deploy</OutlinedButton>
                                                </TDWarpper>
                                            ))
                                        }
                                    </TableRow>
                                ))}
                        </tbody>
                    </TableWrapper>
                    <ContainedButton onClick={loadMore}>Load More</ContainedButton>
                </>
            }
            <ConfirmationModal
                show={showDeleteConfirm}
                requestClose={() => setShowDeleteConfirm(false)}
                text='Are you sure you want to delete this porject?'
                yesText='Yes'
                onYesClick={() => {
                    deleteProject(projectId).then(() => {
                        location.href = '/';
                    });
                }}
                noText='No'
                onNoClick={() => setShowDeleteConfirm(false)}
            />
        </Wrapper >
    );
};