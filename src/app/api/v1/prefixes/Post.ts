import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/DatabaseClient';
import { prefix } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';

interface Data extends Omit<prefix, 'prefix_id'> {}

const PostHandler = async (req: NextRequest) => {
  const body = (await req.json()) as Data;

  const result = await prisma.prefix.create({
    data: body,
  });

  return NextResponse.json(DatatypeParser(result), { status: 200 });
};

export default PostHandler;
