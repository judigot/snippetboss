import { prisma } from '@/prisma/DatabaseClient';
import DatatypeParser from '@/utils/DataTypeParser';
import { prefix, prefix_name } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type PrefixResponse = prefix & {
  prefix_names: prefix_name[];
};

export async function GET(
  _req: NextRequest,
  {
    params: { language },
  }: {
    params: { language: string };
  },
) {
  try {
    const sql: string = /*sql*/ `
        SELECT 
            p.*,
            json_agg(pn.*) AS prefix_names
        FROM prefix p
        JOIN prefix_name pn ON p.prefix_id = pn.prefix_id
        JOIN snippet s ON p.prefix_id = s.prefix_id
        JOIN snippet_language sl ON s.snippet_id = sl.snippet_id
        JOIN language l ON sl.language_id = l.language_id
        WHERE l.language_name = '${language}'
        GROUP BY p.prefix_id;
    `;
    const result: PrefixResponse = await prisma.$queryRawUnsafe(sql);
    return NextResponse.json<typeof result>(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
