import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    let sql: string = /*sql*/ `
      DROP SCHEMA public CASCADE;
    `;
    await prisma.$queryRawUnsafe(sql);

    sql = /*sql*/ `
      CREATE SCHEMA public;
    `;
    await prisma.$queryRawUnsafe(sql);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

await main();
