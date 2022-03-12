import { WithChildren } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { TopNav } from './top-nav';

const Page = styled.div`
    display: grid;
    grid-template-rows: auto minmax(0,1fr);
    height: 100vh;
`;

export const PageWrapper = ({ children }: WithChildren) => (
    <Page>
        <TopNav />
        {children}
    </Page>
);