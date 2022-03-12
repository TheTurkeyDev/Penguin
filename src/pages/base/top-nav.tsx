import { CenterContent, NavBar, NavLink, NavText, ToggleSwitch, useThemeContext } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';

const Logo = styled.img`
    width: 40px;
    height: 40px;
`;

const EndContent = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 8px;
    align-items: center;
`;

const NoLabel = styled.div`
    display: grid;
    grid-template-columns: auto auto;
`;

export const TopNav = () => {

    const { theme, setTheme } = useThemeContext();
    const isDarkTheme = theme === 'dark';
    return (
        <NavBar>
            <Logo src='/res/imgs/logo.png' />
            <CenterContent>
                <NavLink link='/'>Home</NavLink>
            </CenterContent>
            <EndContent>
                <NavText>
                    <i className={`fas fa-${isDarkTheme ? 'moon' : 'sun'}`} />
                </NavText>
                <NoLabel>
                    <ToggleSwitch label='' checked={isDarkTheme} onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')} />
                </NoLabel>
            </EndContent>
        </NavBar>
    );
};