import {NextRequest, NextResponse} from 'next/server';

import {PrismaClient, snippet_type} from '@prisma/client';

import DatatypeParser from '@/utils/DataTypeParser';

interface Data extends snippet_type {
  customProperty?: string;
}

const GetHandler = async (req: NextRequest) => {
  const prisma = new PrismaClient();
  try {
    const result = await prisma.snippet_type.findMany();
    return NextResponse.json<Data[]>(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default GetHandler;
