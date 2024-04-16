import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sql = /*sql*/ `
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
  `;

  // Split the SQL on semicolons and filter out empty statements
  const statements = sql
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  try {
    for (const statement of statements) {
      await prisma.$executeRaw`${Prisma.sql([statement])}`;
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

void (async () => {
  await main();
})();
