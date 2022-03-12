import { BaseTheme } from '@theturkeydev/gobble-lib-react';
import { createGlobalStyle, ThemeProps } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    html, body, #root {
        height: 100vh;
        margin: 0;
    }

    #root {
        overflow: hidden;
    }

    body {
        background-color: ${({ theme }: ThemeProps<BaseTheme>) => theme.background.color};
        color: ${({ theme }: ThemeProps<BaseTheme>) => theme.background.on};
        transition: background-color 0.2s, color 0.2s;
    }
`;