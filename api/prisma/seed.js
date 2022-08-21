const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    for (const [i, className] of ['XI TKJ 1', 'XI TKJ 2', 'XI TKJ 3', 'XI TKJ 4'].entries()) {
        await prisma.class.create({
            data: {
                name: className,
                students: {
                    createMany: {
                        data: [...Array(10)].map((_, j) => ({
                            no: j + 1,
                            username: `${j + 1}@tkj${i + 1}`,
                            fullname: 'Student ' + (j + 1),
                            password: `${j + 1}`,
                        })),
                    },
                },
            },
        });
    }
}

main()
    .catch(e => console.log(e))
    .finally(() => prisma.$disconnect());
