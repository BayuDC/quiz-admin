import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from '@strapi/design-system/Layout';
import { SubNav, SubNavHeader, SubNavLink } from '@strapi/design-system/SubNav';
import axios from '../lib/axios';

export default function Examinee() {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        axios.get('/classes').then(response => {
            setClasses(response.data.classes);
        });
    }, []);

    return (
        <Layout
            sideNav={
                <SubNav>
                    <SubNavHeader label="Classes" />
                    {classes.map(({ id, name }) => (
                        <SubNavLink to={'/examinee/' + id}>{name}</SubNavLink>
                    ))}
                </SubNav>
            }
        >
            <Outlet />
        </Layout>
    );
}
