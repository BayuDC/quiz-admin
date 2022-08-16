import { Outlet } from 'react-router-dom';
import { Box } from '@strapi/design-system/Box';
import { Layout } from '@strapi/design-system/Layout';

import NavBar from '../components/NavBar';

export default function Main({ title }) {
    return (
        <Box background="neutral100" color="neutral1000">
            <Layout sideNav={<NavBar />}>
                <Outlet />
            </Layout>
        </Box>
    );
}
