import { NextRequest, NextResponse } from 'next/server';
import { snippet_type } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';
import { prisma } from '@/prisma/DatabaseClient';

interface Response extends snippet_type {}

const GetHandler = async (_req: NextRequest) => {
  try {
    const result: Response[] = await prisma.snippet_type.findMany();
    return NextResponse.json(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default GetHandler;
