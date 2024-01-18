import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/DatabaseClient';
import { language } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';

interface Data extends Omit<language, 'lang_id'> {}

const PostHandler = async (req: NextRequest) => {
  const body = (await req.json()) as Data;

  const result = await prisma.language.create({
    data: body,
  });

  return NextResponse.json(DatatypeParser(result), { status: 200 });
};

export default PostHandler;
