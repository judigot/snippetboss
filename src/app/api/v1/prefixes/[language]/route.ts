import { prisma } from '@/prisma/DatabaseClient';
import DatatypeParser from '@/utils/DataTypeParser';
import { prefix, language } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type PrefixLanguageIntersection = prefix & language;

export async function GET(
  _req: NextRequest,
  {
    params: { language },
  }: {
    params: { language: string };
  },
) {
  // prefixes?prefix=value
  const sql: string = /*sql*/ `
        -- SELECT p.*, l.*, p.*
        -- FROM prefix s
        -- JOIN prefix_language sl ON p.prefix_id = sl.prefix_id
        -- JOIN language l ON sl.language_id = l.language_id
        -- JOIN prefix p ON p.prefix_id = p.prefix_id
        -- WHERE l.language_name = '${language}';

        SELECT
          p.*,
          json_agg(l) AS languages
        FROM
          prefix p
          JOIN language l ON p.language_id = l.language_id
        WHERE
          p.prefix_id = 1
        GROUP BY
          p.prefix_id;
    `;
  const result: PrefixLanguageIntersection = await prisma.$queryRawUnsafe(sql);
  // const result = await prisma.prefix.findMany({});
  return NextResponse.json<typeof result>(DatatypeParser(result));
}
