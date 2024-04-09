import { NextRequest, NextResponse } from 'next/server';
import { Prisma, prefix, prefix_name } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';
import { prisma } from '@/prisma/DatabaseClient';

export type PrefixResponse = prefix & {
  prefix_names: prefix_name[];
};

const GetHandler = async (req: NextRequest) => {
  try {
    // prefixes?language=value
    const unusedByLanguage = req.nextUrl.searchParams.get('unused-by-language');
    if (unusedByLanguage !== null) {
      const sql: string = /*sql*/ `
        WITH LanguageCheck AS (
          SELECT 1
          FROM "language"
          WHERE "language_name" = '${unusedByLanguage}'
        ),
        PrefixesNotUsedByJava AS (
          SELECT
            p.*,
            json_agg(pn.*) AS prefix_names
          FROM "prefix" p
          JOIN prefix_name pn ON p.prefix_id = pn.prefix_id
          WHERE NOT EXISTS (
            SELECT 1
            FROM "snippet" s
            JOIN "snippet_language" sl ON s."snippet_id" = sl."snippet_id"
            JOIN "language" l ON sl."language_id" = l."language_id"
            WHERE l."language_name" = '${unusedByLanguage}'
            AND s."prefix_id" = p."prefix_id"
          )
          GROUP BY p.prefix_id
        )
        SELECT pnu.*
        FROM PrefixesNotUsedByJava pnu
        WHERE EXISTS (SELECT 1 FROM LanguageCheck);
    `;
      const result: PrefixResponse =
        await prisma.$queryRaw`${Prisma.sql([sql])}`;

      return NextResponse.json(DatatypeParser(result));
    }

    const sql: string = /*sql*/ `
        SELECT
            p.*,
            json_agg(pn.*) AS prefix_names
        FROM prefix p
        JOIN prefix_name pn ON p.prefix_id = pn.prefix_id
        GROUP BY p.prefix_id;
    `;
    const result: PrefixResponse = await prisma.$queryRaw`${Prisma.sql([sql])}`;

    return NextResponse.json(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default GetHandler;
