import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sql = /*sql*/ `
    CREATE TABLE "snippet_type" (
      "snippet_type_id" BIGSERIAL NOT NULL,
      "snippet_type_name" TEXT UNIQUE NOT NULL,
      PRIMARY KEY ("snippet_type_id")
    );

    CREATE TABLE "prefix" (
      "prefix_id" BIGSERIAL NOT NULL,
      "prefix_description" TEXT,
      "snippet_type_id" BIGINT NOT NULL,
      PRIMARY KEY ("prefix_id"),
      CONSTRAINT "FK_prefix.snippet_type_id"
        FOREIGN KEY ("snippet_type_id")
          REFERENCES "snippet_type"("snippet_type_id")
    );

    CREATE TABLE "snippet" (
      "snippet_id" BIGSERIAL NOT NULL,
      "snippet_type_id" BIGINT NOT NULL,
      "prefix_id" BIGINT NOT NULL,
      "snippet_content" TEXT NULL,
      PRIMARY KEY ("snippet_id"),
      CONSTRAINT "FK_snippet.snippet_type_id"
        FOREIGN KEY ("snippet_type_id")
          REFERENCES "snippet_type"("snippet_type_id"),
      CONSTRAINT "FK_snippet.prefix_id"
        FOREIGN KEY ("prefix_id")
          REFERENCES "prefix"("prefix_id")
    );

    CREATE TABLE "language" (
      "language_id" BIGSERIAL NOT NULL,
      "language_name" TEXT UNIQUE NOT NULL,
      "display_name" TEXT UNIQUE NOT NULL,
      PRIMARY KEY ("language_id")
    );

    CREATE TABLE "snippet_language" (
      "snippet_language_id" BIGSERIAL NOT NULL,
      "snippet_id" BIGINT NOT NULL,
      "language_id" BIGINT NOT NULL, UNIQUE ("language_id", "snippet_id"),
      PRIMARY KEY ("snippet_language_id"),
      CONSTRAINT "FK_snippet_language.language_id"
        FOREIGN KEY ("language_id")
          REFERENCES "language"("language_id"),
      CONSTRAINT "FK_snippet_language.snippet_id"
        FOREIGN KEY ("snippet_id")
          REFERENCES "snippet"("snippet_id")
    );

    CREATE TABLE "prefix_name" (
      "prefix_name_id" BIGSERIAL NOT NULL,
      "prefix_id" BIGINT NOT NULL,
      "prefix_name" TEXT UNIQUE NOT NULL,
      "is_default" BOOLEAN NULL,
      PRIMARY KEY ("prefix_name_id"),
      CONSTRAINT "FK_prefix_name.prefix_id"
        FOREIGN KEY ("prefix_id")
          REFERENCES "prefix"("prefix_id")
    );
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

void main();
