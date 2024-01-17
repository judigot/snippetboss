import {NextRequest, NextResponse} from 'next/server';

import {PrismaClient, snippet} from '@prisma/client';

import DatatypeParser from '@/utils/DataTypeParser';

interface Data extends snippet {
  customProperty?: string;
}

const GetHandler = async (req: NextRequest) => {
  const prisma = new PrismaClient();
  try {
    const result = await prisma.snippet.findMany();
    return NextResponse.json<Data[]>(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default GetHandler;
