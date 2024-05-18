import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/DatabaseClient';
import { snippet } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';

interface Body extends Pick<snippet, 'snippet_id' | 'snippet_content'> {}

interface Response extends snippet {}

const PatchHandler = async (req: NextRequest) => {
  try {
    const { snippet_id, snippet_content } = (await req.json()) as Body;
    const result: Response = await prisma.snippet.update({
      where: {
        snippet_id,
      },
      data: {
        snippet_content,
      },
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

export default PatchHandler;
