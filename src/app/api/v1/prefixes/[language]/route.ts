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
        SELECT DISTINCT p.prefix_name
        FROM prefix p
        JOIN snippet s ON p.prefix_id = s.prefix_id
        JOIN snippet_language sl ON s.snippet_id = sl.snippet_id
        JOIN language l ON sl.language_id = l.language_id
        WHERE l.language_name = '${language}';
    `;
  const result: PrefixLanguageIntersection = await prisma.$queryRawUnsafe(sql);
  // const result = await prisma.prefix.findMany({});
  return NextResponse.json<typeof result>(DatatypeParser(result));
}
