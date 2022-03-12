import { ThemeContextProvider } from '@theturkeydev/gobble-lib-react';
import ReactDOM from 'react-dom';
import { SiteRouter } from './router';
import { GlobalStyles } from './styles/global-styles';

const router = (
    <ThemeContextProvider>
        <GlobalStyles />
        <SiteRouter />
    </ThemeContextProvider>
);

ReactDOM.render(router, document.getElementById('app'));