import { ThemeContextProvider } from '@theturkeydev/gobble-lib-react';
import ReactDOM from 'react-dom';
import { SiteRouter } from './router';

const router = (
    <ThemeContextProvider>
        <SiteRouter />
    </ThemeContextProvider>
);

ReactDOM.render(router, document.getElementById('app'));