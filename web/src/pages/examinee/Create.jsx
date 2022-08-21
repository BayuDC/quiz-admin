import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { TextInput } from '@strapi/design-system/TextInput';
import { Button } from '@strapi/design-system/Button';
import { Link } from '@strapi/design-system/Link';
import { Stack } from '@strapi/design-system/Stack';
import { Box } from '@strapi/design-system/Box';
import { ArrowLeft } from '@strapi/icons';
import axios from '../../lib/axios';

export default function ExamineeCreate() {
    const { id } = useParams();
    const [kurasu, setClass] = useState();

    useEffect(() => {
        axios.get('/classes/' + id).then(({ data }) => {
            setClass(data.class);
        });
    }, [id]);

    return (
        <form action="/">
            <HeaderLayout
                title="Add new student"
                subtitle={kurasu?.name}
                navigationAction={
                    <Link startIcon={<ArrowLeft />} to="#">
                        Back
                    </Link>
                }
                primaryAction={<Button type="submit">Save</Button>}
            />
            <ContentLayout>
                <Box padding={6} background="neutral0">
                    <Stack paddingBottom={6}>
                        <TextInput label="Fullname" name="fullname" required />
                    </Stack>
                    <Stack paddingBottom={6}>
                        <TextInput label="Username" name="username" required />
                    </Stack>
                    <Stack paddingBottom={2}>
                        <TextInput label="Password" name="password" required />
                    </Stack>
                </Box>
            </ContentLayout>
        </form>
    );
}
