import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutMain from './layouts/Main';

import PageHome from './pages/Home';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutMain />}>
                    <Route index element={<PageHome />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
