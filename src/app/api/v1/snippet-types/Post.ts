import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/DatabaseClient';
import { snippet_type } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';

interface Body extends Omit<snippet_type, 'snippet_type_id'> {}

const PostHandler = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as Body;
    const result = await prisma.snippet_type.create({
      data: body,
    });
    return NextResponse.json(DatatypeParser(result), { status: 200 });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default PostHandler;
