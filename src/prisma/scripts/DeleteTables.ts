import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const sql: string = /*sql*/ `
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
    `;

    await prisma.$queryRawUnsafe(sql);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {})
  .catch(() => {});
