import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@strapi/design-system/ThemeProvider';
import { darkTheme } from '@strapi/design-system/themes';

import LayoutMain from './layouts/Main';
import PageHome from './pages/Home';

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LayoutMain />}>
                        <Route index element={<PageHome />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
