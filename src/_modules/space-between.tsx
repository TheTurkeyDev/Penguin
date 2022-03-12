import { WithChildren } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';

const SpaceBetweenWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
`;

export const SpaceBetween = ({ children }: WithChildren) => (
    <SpaceBetweenWrapper>
        {children}
    </SpaceBetweenWrapper>
);