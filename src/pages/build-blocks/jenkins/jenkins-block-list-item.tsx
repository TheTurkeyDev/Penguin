import { BaseTheme, Body1 } from '@theturkeydev/gobble-lib-react';
import styled, { ThemeProps } from 'styled-components';

const ItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 64px 1fr;
    grid-template-rows: 75px;
    justify-items: center;
    border-bottom: 1px solid ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.on};
    &:hover {
        cursor: pointer;
        background-color: #ffffff22;
    }
`;

const Image = styled.img`
    max-height: 64px;
    max-width: 64px;
    align-self: center;
`;

export const JenkinsBlockListItem = () => {
    return (
        <ItemWrapper>
            <Image height='64' src='/res/imgs/jenkins.svg' />
            <div>
                <Body1>Jenkins</Body1>
            </div>
        </ItemWrapper>
    );
};