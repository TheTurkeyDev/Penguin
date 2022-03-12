import { NavBar, NavLink } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';

const Logo = styled.img`
    width: 48px;
    height: 48px;
    margin: 4px 16px;
`;

export const TopNav = () => {
    return (
        <NavBar>
            <Logo src='/res/imgs/logo.png' />
            <NavLink link='/'>Home</NavLink>
        </NavBar>
    );
};