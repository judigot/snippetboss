import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/DatabaseClient';
import { snippet } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';

interface BodyInterface
  extends Pick<snippet, 'snippet_id' | 'snippet_content'> {}

interface ResponseInterface extends snippet {}

const PatchHandler = async (req: NextRequest) => {
  const { snippet_id, snippet_content } = (await req.json()) as BodyInterface;

  const result: ResponseInterface = await prisma.snippet.update({
    where: {
      snippet_id,
    },
    data: {
      snippet_content,
    },
  });

  return NextResponse.json<ResponseInterface>(DatatypeParser(result), {
    status: 200,
  });
};

export default PatchHandler;
