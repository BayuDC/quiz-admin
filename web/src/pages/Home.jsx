import { ContentLayout, HeaderLayout } from '@strapi/design-system/Layout';

export default function Home() {
    return (
        <>
            <HeaderLayout title="Welcome to Quiz Dashboard" />
            <ContentLayout>
                <h1>Hello World</h1>
            </ContentLayout>
        </>
    );
}
