import { prisma } from '@/prisma/DatabaseClient';
import DatatypeParser from '@/utils/DataTypeParser';
import { prefix, language } from '@prisma/client';
import { NextResponse } from 'next/server';

type prefixLanguage = prefix & language;

export async function GET({
  params: { language },
}: {
  params: { language: string };
}) {
  // prefixes?prefix=value
  const sql: string = /*sql*/ `
        -- SELECT s.*, l.*, p.*
        -- FROM prefix s
        -- JOIN prefix_language sl ON s.prefix_id = sl.prefix_id
        -- JOIN language l ON sl.language_id = l.lang_id
        -- JOIN prefix p ON s.prefix_id = p.prefix_id
        -- WHERE l.lang_name = '${language}';

        SELECT
          p.*,
          json_agg(l) AS languages
        FROM
          prefix s
          JOIN prefix_language sl ON s.prefix_id = sl.prefix_id
          JOIN language l ON sl.language_id = l.lang_id
          JOIN prefix p ON s.prefix_id = p.prefix_id
        WHERE
          p.prefix_id = 1
        GROUP BY
          p.prefix_id;
    `;
  const result: prefixLanguage = await prisma.$queryRawUnsafe(sql);
  // const result = await prisma.prefix.findMany({});
  return NextResponse.json<typeof result>(DatatypeParser(result));
}
