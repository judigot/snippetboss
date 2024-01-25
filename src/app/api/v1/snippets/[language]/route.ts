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
    SELECT 
        snippet.*,
        (
            SELECT json_agg(
                json_build_object(
                    'lang_id', language.lang_id,
                    'lang_name', language.lang_name,
                    'display_name', language.display_name
                )
            )
            FROM snippet_language
            JOIN language ON snippet_language.language_id = language.lang_id
            WHERE snippet_language.snippet_id = snippet.snippet_id
        ) AS languages,
        prefix.*
    FROM snippet
    JOIN prefix ON snippet.prefix_id = prefix.prefix_id
    LEFT JOIN snippet_language ON snippet.snippet_id = snippet_language.snippet_id
    LEFT JOIN language ON snippet_language.language_id = language.lang_id AND language.lang_name = '${language}'
    GROUP BY snippet.snippet_id, prefix.prefix_id;
  `;
    const result: Response = await prisma.$queryRawUnsafe(sql);
    return NextResponse.json<Response>(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
