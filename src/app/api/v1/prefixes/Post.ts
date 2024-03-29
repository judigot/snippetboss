import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/DatabaseClient';
import { prefix } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';

interface Body extends Omit<prefix, 'prefix_id'> {}

const PostHandler = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as Body;
    const result = await prisma.prefix.create({
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
