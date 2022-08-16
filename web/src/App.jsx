import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@strapi/design-system/ThemeProvider';
import { darkTheme } from '@strapi/design-system/themes';

import LayoutMain from './layouts/Main';
import PageHome from './pages/Home';
import PageExam from './pages/Exam';
import PageExaminee from './pages/Examine';

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LayoutMain />}>
                        <Route index element={<PageHome />} />
                        <Route path="/exam" element={<PageExam />} />
                        <Route path="/examinee" element={<PageExaminee />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
