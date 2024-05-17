import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/DatabaseClient';
import { language, snippet } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';

interface Body {
  snippet: Omit<snippet, 'snippet_id'>;
  language: language[];
}

interface Response extends snippet {}

const PostHandler = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as Body;

    const result: Response = await prisma.$transaction(async (transaction) => {
      // Insert the snippet
      const newSnippetResult: Response = DatatypeParser(
        await transaction.snippet.create({
          data: body.snippet,
        }),
      );

      const newSnippetID = newSnippetResult.snippet_id;

      const languageIDs = body.language.map((language) => language.language_id);

      // Insert snippet language to junction table
      await transaction.snippet_language.createMany({
        data: languageIDs.map((language_id) => ({
          snippet_id: newSnippetID,
          language_id,
        })),
      });

      return newSnippetResult;
    });

    return NextResponse.json(DatatypeParser(result), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export default PostHandler;
