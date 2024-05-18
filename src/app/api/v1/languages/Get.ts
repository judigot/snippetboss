import { NextRequest, NextResponse } from 'next/server';
import { language } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';
import { prisma } from '@/prisma/DatabaseClient';

interface Response extends language {}

const GetHandler = async (_req: NextRequest) => {
  try {
    const result: Response[] = await prisma.language.findMany();
    return NextResponse.json(DatatypeParser(result));
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export default GetHandler;
