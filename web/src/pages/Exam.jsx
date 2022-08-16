import { Layout, HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { SubNav, SubNavHeader, SubNavLink } from '@strapi/design-system/SubNav';

export default function Exam() {
    return (
        <Layout
            sideNav={
                <SubNav>
                    <SubNavHeader label="Tasks" />
                    <SubNavLink to="/blabla">Ulangan BAB 1</SubNavLink>
                    <SubNavLink to="/blabla">Ulangan BAB 2</SubNavLink>
                    <SubNavLink to="/blabla">Ulangan BAB 3</SubNavLink>
                    <SubNavLink to="/blabla">Ulangan BAB 4</SubNavLink>
                </SubNav>
            }
        >
            <HeaderLayout title="Ulangan BAB 1's Questions" />
            <ContentLayout>Hello World</ContentLayout>
        </Layout>
    );
}
