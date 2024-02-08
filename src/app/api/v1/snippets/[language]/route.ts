import { prisma } from '@/prisma/DatabaseClient';
import DatatypeParser from '@/utils/DataTypeParser';
import { snippet, language, prefix, prefix_name, Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export type SnippetResponseType = snippet &
  prefix & {
    languages: language[];
    prefix_names: prefix_name[];
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
                    'language_id', l.language_id,
                    'language_name', l.language_name,
                    'display_name', l.display_name
                )
            )
            FROM snippet_language sl
            JOIN language l ON sl.language_id = l.language_id
            WHERE sl.snippet_id = snippet.snippet_id
        ) AS languages,
        (
            SELECT json_agg(
                json_build_object(
                    'prefix_name_id', pn.prefix_name_id,
                    'prefix_name', pn.prefix_name,
                    'is_default', pn.is_default
                )
            )
            FROM prefix_name pn
            WHERE pn.prefix_id = prefix.prefix_id
        ) AS prefix_names
    FROM snippet
    JOIN prefix ON snippet.prefix_id = prefix.prefix_id
    JOIN snippet_language sl ON snippet.snippet_id = sl.snippet_id
    JOIN language l ON sl.language_id = l.language_id
    WHERE l.language_name = '${language}'
    GROUP BY snippet.snippet_id, prefix.prefix_id;
  `;
    const result: SnippetResponseType[] =
      await prisma.$queryRaw`${Prisma.sql([sql])}`;
    return NextResponse.json(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
