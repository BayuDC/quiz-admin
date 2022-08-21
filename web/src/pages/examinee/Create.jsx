import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { NumberInput } from '@strapi/design-system/NumberInput';
import { TextInput } from '@strapi/design-system/TextInput';
import { Button } from '@strapi/design-system/Button';
import { Link } from '@strapi/design-system/Link';
import { Stack } from '@strapi/design-system/Stack';
import { Box } from '@strapi/design-system/Box';
import { ArrowLeft } from '@strapi/icons';
import axios from '../../lib/axios';

export default function ExamineeCreate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [kurasu, setClass] = useState();
    const [no, setNo] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('/classes/' + id).then(({ data }) => {
            setClass(data.class);
        });
    }, [id]);

    const handleSubmit = e => {
        e.preventDefault();
        setErrors({});

        axios
            .post('/classes/' + id + '/students', {
                no,
                fullname: e.target.fullname.value,
                username: e.target.username.value,
                password: e.target.password.value,
            })
            .then(() => {
                navigate('/examinee/' + id);
            })
            .catch(err => {
                setErrors(err.response.data.detail);
            });
    };

    return (
        <form action="/" onSubmit={handleSubmit}>
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
                        <NumberInput
                            label="No"
                            name="no"
                            required={true}
                            onValueChange={v => setNo(v)}
                            value={no}
                            error={errors.no}
                        />
                    </Stack>
                    <Stack paddingBottom={6}>
                        <TextInput label="Fullname" name="fullname" required error={errors.fullname} />
                    </Stack>
                    <Stack paddingBottom={6}>
                        <TextInput label="Username" name="username" required error={errors.username} />
                    </Stack>
                    <Stack paddingBottom={2}>
                        <TextInput label="Password" name="password" required error={errors.password} />
                    </Stack>
                </Box>
            </ContentLayout>
        </form>
    );
}
