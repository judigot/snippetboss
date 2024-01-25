import { prisma } from '@/prisma/DatabaseClient';
import DatatypeParser from '@/utils/DataTypeParser';
import { snippet, language, prefix } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export type SnippetResponseType = snippet &
  prefix & {
    languages: language[];
  };

export async function GET(
  _req: NextRequest,
  { params: { language } }: { params: { language: string } },
) {
  try {
    const sql: string = /*sql*/ `
    SELECT 
        snippet.*,
        prefix.*,
        (
            SELECT json_agg(
                json_build_object(
                    'language_id', language.language_id,
                    'language_name', language.language_name,
                    'display_name', language.display_name
                )
            )
            FROM snippet_language
            JOIN language ON snippet_language.language_id = language.language_id
            WHERE snippet_language.snippet_id = snippet.snippet_id
        ) AS languages
    FROM snippet
    JOIN prefix ON snippet.prefix_id = prefix.prefix_id
    LEFT JOIN snippet_language ON snippet.snippet_id = snippet_language.snippet_id
    LEFT JOIN language ON snippet_language.language_id = language.language_id AND language.language_name = '${language}'
    GROUP BY snippet.snippet_id, prefix.prefix_id;
  `;
    const result: SnippetResponseType[] = await prisma.$queryRawUnsafe(sql);
    return NextResponse.json<SnippetResponseType[]>(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
