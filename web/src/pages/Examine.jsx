import { Layout, HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { SubNav, SubNavHeader, SubNavLink } from '@strapi/design-system/SubNav';

export default function Examinee() {
    return (
        <Layout
            sideNav={
                <SubNav>
                    <SubNavHeader label="Classes" />
                    <SubNavLink to="/blabla">XI TKJ 1</SubNavLink>
                    <SubNavLink to="/blabla">XI TKJ 3</SubNavLink>
                    <SubNavLink to="/blabla">XI TKJ 4</SubNavLink>
                </SubNav>
            }
        >
            <HeaderLayout title="XI TKJ 1's Students" />
            <ContentLayout>Hello World</ContentLayout>
        </Layout>
    );
}
