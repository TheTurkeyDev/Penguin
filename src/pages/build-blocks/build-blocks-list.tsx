import { BaseTheme, ContainedButton } from '@theturkeydev/gobble-lib-react';
import { useEffect, useState } from 'react';
import styled, { ThemeProps } from 'styled-components';
import { getEnvironmentBuildBlocks } from '../../network/network';
import { JenkinsBlockListItem } from './jenkins/jenkins-block-list-item';

const BuildBlocksListWrapper = styled.div`
    background-color: ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.color};
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    border-right: 2px solid #616161;
    overflow: hidden;
`;

const List = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 75px;
    overflow-y: auto;

    /* width */
    &::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        box-shadow: 0;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #88888866;
        border-radius: 10px;
    }
`;

const NewBtnWrapper = styled.div`
    display: grid;
    justify-content: center;
    padding: 4px;
    border-top: 1px solid ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.on};
`;

type BuildBlocksListProps = {
    readonly projectId: string
    readonly envId: string
}
export const BuildBlocksList = ({ projectId, envId }: BuildBlocksListProps) => {

    const [buildBlock, setbuildBlocks] = useState([]);

    useEffect(() => {
        getEnvironmentBuildBlocks(projectId, envId).then(setbuildBlocks);
    }, [projectId, envId]);

    return (
        <BuildBlocksListWrapper>
            <List>
                <JenkinsBlockListItem />
                <JenkinsBlockListItem />
                <JenkinsBlockListItem />
                <JenkinsBlockListItem />
                <JenkinsBlockListItem />
            </List>
            <NewBtnWrapper>
                <ContainedButton>New Block</ContainedButton>
            </NewBtnWrapper>
        </BuildBlocksListWrapper>
    );
};