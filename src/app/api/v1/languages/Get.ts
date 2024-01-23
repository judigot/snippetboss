import { NextRequest, NextResponse } from 'next/server';
import { language } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';
import { prisma } from '@/prisma/DatabaseClient';

interface Data extends language {}

const GetHandler = async (_req: NextRequest) => {
  try {
    const result = await prisma.language.findMany();
    return NextResponse.json<Data[]>(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default GetHandler;
