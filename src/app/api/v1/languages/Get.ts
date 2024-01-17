import {NextRequest, NextResponse} from 'next/server';

import {PrismaClient, language} from '@prisma/client';

import DatatypeParser from '@/utils/DataTypeParser';

interface Data extends language {
  customProperty?: string;
}

const GetHandler = async (req: NextRequest) => {
  const prisma = new PrismaClient();
  try {
    let result = await prisma.language.findMany();
    return NextResponse.json<Data[]>(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default GetHandler;
