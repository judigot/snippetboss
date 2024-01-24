import { prisma } from '@/prisma/DatabaseClient';
import DatatypeParser from '@/utils/DataTypeParser';
import { snippet, language, prefix } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type Response = snippet & language & prefix;

export async function GET(
  _req: NextRequest,
  { params: { language } }: { params: { language: string } },
) {
  try {
    const sql: string = /*sql*/ `
    SELECT s.*, l.*, p.*
    FROM snippet s
    JOIN snippet_language sl ON s.snippet_id = sl.snippet_id
    JOIN language l ON sl.language_id = l.lang_id
    JOIN prefix p ON s.prefix_id = p.prefix_id
    WHERE l.lang_name = '${language}';
  `;
    const result: Response = await prisma.$queryRawUnsafe(sql);
    return NextResponse.json<Response>(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
