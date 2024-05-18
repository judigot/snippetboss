import { prisma } from '@/prisma/DatabaseClient';
import DatatypeParser from '@/utils/DataTypeParser';
import { Prisma, prefix, prefix_name } from '@prisma/client';
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
            pl.*,
            json_agg(pn.*) AS prefix_names
        FROM prefix p
        JOIN prefix_name pn ON p.prefix_id = pn.prefix_id
        JOIN prefix_language pl ON p.prefix_id = pl.prefix_id  /* Ensure we are considering only prefixes with languages */
        JOIN language l ON pl.language_id = l.language_id
        WHERE l.language_name = '${language}' AND p.prefix_id = pl.prefix_id
        GROUP BY p.prefix_id, pl.prefix_language_id;
    `;
    const result: PrefixResponse = await prisma.$queryRaw`${Prisma.sql([sql])}`;
    return NextResponse.json(DatatypeParser(result));
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error,
    });
  } finally {
    await prisma.$disconnect();
  }
}
