import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table';
import { LinkButton } from '@strapi/design-system/LinkButton';
import { Plus, Pencil, Trash } from '@strapi/icons';
import { Typography } from '@strapi/design-system/Typography';
import { IconButton } from '@strapi/design-system/IconButton';
import { Flex } from '@strapi/design-system/Flex';
import axios from '../../lib/axios';

export default function Examinee() {
    const { id } = useParams();
    const [kurasu, setClass] = useState();
    const [students, setStudents] = useState();
    useEffect(() => {
        axios.get('/classes/' + id).then(({ data }) => {
            setClass(data.class);
        });
        axios.get('/classes/' + id + '/students').then(({ data }) => {
            setStudents(data.students);
        });
    }, [id]);

    return (
        <>
            {kurasu && (
                <>
                    <HeaderLayout
                        title={kurasu.name + "'s Students"}
                        primaryAction={
                            <LinkButton to={`/examinee/${id}/create`} startIcon={<Plus />}>
                                Add new student
                            </LinkButton>
                        }
                    />
                    <ContentLayout>
                        {students && (
                            <>
                                <Table colCount={5}>
                                    <Thead>
                                        <Tr>
                                            <Th>
                                                <Typography variant="sigma">No</Typography>
                                            </Th>
                                            <Th>
                                                <Typography variant="sigma">Fullname</Typography>
                                            </Th>
                                            <Th>
                                                <Typography variant="sigma">Username</Typography>
                                            </Th>
                                            <Th>
                                                <Typography variant="sigma">Password</Typography>
                                            </Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {students.map(student => (
                                            <Tr key={student.id}>
                                                <Td>
                                                    <Typography textColor="neutral800">{student.no}</Typography>
                                                </Td>
                                                <Td>
                                                    <Typography textColor="neutral800">{student.fullname}</Typography>
                                                </Td>
                                                <Td>
                                                    <Typography textColor="neutral800">{student.username}</Typography>
                                                </Td>
                                                <Td>
                                                    <Typography textColor="neutral800">{student.password}</Typography>
                                                </Td>
                                                <Td>
                                                    <Flex>
                                                        <IconButton
                                                            onClick={() => console.log('edit')}
                                                            label="Edit"
                                                            noBorder
                                                            icon={<Pencil />}
                                                        />
                                                        <IconButton
                                                            onClick={() => console.log('delete')}
                                                            label="Delete"
                                                            noBorder
                                                            icon={<Trash />}
                                                        />
                                                    </Flex>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </>
                        )}
                    </ContentLayout>
                </>
            )}
        </>
    );
}
