import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/DatabaseClient';
import { snippet } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';

interface Body extends Omit<snippet, 'snippet_id'> {}

interface Response extends snippet {}

const PostHandler = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as Body;
    const result: Response = await prisma.snippet.create({
      data: body,
    });
    return NextResponse.json(DatatypeParser(result), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default PostHandler;
