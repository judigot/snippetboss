import { NextRequest, NextResponse } from 'next/server';
import { Prisma, prefix, prefix_name, snippet_type } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';
import { prisma } from '@/prisma/DatabaseClient';

export type PrefixResponse = prefix &
  snippet_type & {
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
        PrefixesNotUsedByLanguage AS (
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
        FROM PrefixesNotUsedByLanguage pnu
        WHERE EXISTS (SELECT 1 FROM LanguageCheck);

        -- WITH LanguageCheck AS (
        -- SELECT 1
        -- FROM "language"
        -- WHERE "language_name" = 'java'
        -- ),
        -- PrefixesNotUsedByLanguage AS (
        -- SELECT
        -- p.*,
        -- json_agg(pn.*) AS prefix_names
        -- FROM "prefix" p
        -- LEFT JOIN prefix_language pl ON p.prefix_id = pl.prefix_id
        -- LEFT JOIN prefix_name pn ON p.prefix_id = pn.prefix_id
        -- WHERE pl.prefix_id IS NULL -- Prefixes not in prefix_language
        -- OR EXISTS (
        -- SELECT 1
        -- FROM "language" l
        -- JOIN prefix_language pl2 ON l.language_id = pl2.language_id
        -- WHERE l.language_name = 'java' AND p.prefix_id = pl2.prefix_id
        -- )
        -- GROUP BY p.prefix_id
        -- )
        -- SELECT *
        -- FROM PrefixesNotUsedByLanguage
        -- WHERE EXISTS (
        -- SELECT 1
        -- FROM LanguageCheck);
      `;
      console.log(sql);
      const result: PrefixResponse =
        await prisma.$queryRaw`${Prisma.sql([sql])}`;
      return NextResponse.json(DatatypeParser(result));
    }

    const sql: string = /*sql*/ `
        SELECT
            p.*,
            st.snippet_type_name,
            json_agg(pn.*) AS prefix_names
        FROM prefix p
        JOIN snippet_type st ON p.snippet_type_id = st.snippet_type_id
        JOIN prefix_name pn ON p.prefix_id = pn.prefix_id
        GROUP BY p.prefix_id, st.snippet_type_id;
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
