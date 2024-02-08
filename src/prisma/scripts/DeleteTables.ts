import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    let sql: string = /*sql*/ `
      DROP SCHEMA public CASCADE;
    `;
    await prisma.$queryRaw`${Prisma.sql([sql])}`;

    sql = /*sql*/ `
      CREATE SCHEMA public;
    `;
    await prisma.$queryRaw`${Prisma.sql([sql])}`;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

void (async () => {
  await main();
})();
