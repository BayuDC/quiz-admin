const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.class.create({
        data: {
            name: 'Kelas Uji Coba',
            students: {
                createMany: {
                    data: [...Array(5)].map((_, i) => ({
                        no: 11 + i,
                        fullname: 'Student' + i,
                        username: 'student' + i,
                        password: 'student' + i,
                    })),
                },
            },
        },
    });
}

main()
    .catch(e => console.log(e))
    .finally(() => prisma.$disconnect());
