import { prisma } from '@/prisma/DatabaseClient';
import DatatypeParser from '@/utils/DataTypeParser';
import { snippet, language, prefix } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type SnippetLanguage = snippet & language & prefix;

export async function GET(
  req: NextRequest,
  { params: { language } }: { params: { language: string } },
) {
  // snippets?snippet=value
  const sql: string = /*sql*/ `
    SELECT s.*, l.*, p.*
    FROM snippet s
    JOIN snippet_language sl ON s.snippet_id = sl.snippet_id
    JOIN language l ON sl.language_id = l.lang_id
    JOIN prefix p ON s.prefix_id = p.prefix_id
    WHERE l.lang_name = '${language}';
  `;
  const result: SnippetLanguage = await prisma.$queryRawUnsafe(sql);
  return NextResponse.json<typeof result>(DatatypeParser(result));
}
