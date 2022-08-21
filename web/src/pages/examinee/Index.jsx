import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import axios from '../../lib/axios';

export default function Examinee() {
    const { id } = useParams();
    const [kurasu, setClass] = useState();
    useEffect(() => {
        axios.get('/classes/' + id).then(({ data }) => {
            setClass(data.class);
        });
    }, [id]);

    return (
        <>
            {kurasu && (
                <>
                    <HeaderLayout title={kurasu.name + "'s Students"} />
                    <ContentLayout></ContentLayout>
                </>
            )}
        </>
    );
}
