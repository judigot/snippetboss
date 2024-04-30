import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function CreateDatabase() {
  const sql = /*sql*/ `

CREATE TABLE "prefix" (
  "prefix_id" BIGSERIAL NOT NULL,
  "prefix_description" TEXT,
  PRIMARY KEY ("prefix_id")
);

CREATE TABLE "snippet" (
  "snippet_id" BIGSERIAL NOT NULL,
  "prefix_id" BIGINT NOT NULL,
  "snippet_content" TEXT NULL,
  PRIMARY KEY ("snippet_id"),
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

CREATE TABLE "prefix_language" (
  "prefix_language_id" BIGSERIAL NOT NULL,
  "prefix_id" BIGINT NOT NULL,
  "language_id" BIGINT NOT NULL, UNIQUE ("language_id", "prefix_id"),
  PRIMARY KEY ("prefix_language_id"),
  CONSTRAINT "FK_prefix_language.language_id"
    FOREIGN KEY ("language_id")
      REFERENCES "language"("language_id"),
  CONSTRAINT "FK_prefix_language.prefix_id"
    FOREIGN KEY ("prefix_id")
      REFERENCES "prefix"("prefix_id")
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
    console.log('Successfully created tables.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export default async function main(): Promise<void> {
  if (require.main === module) {
    await CreateDatabase();
  }
}

main();
