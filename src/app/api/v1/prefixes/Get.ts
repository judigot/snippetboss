import { NextRequest, NextResponse } from 'next/server';
import { prefix } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';
import { prisma } from '@/prisma/DatabaseClient';

interface Data extends prefix {}

const GetHandler = async (req: NextRequest) => {
  try {
    // prefixes?language=value
    const language = req.nextUrl.searchParams.get('language');
    if (language !== null) {
      return NextResponse.json({ language });
    }

    // prefixes?language=value
    const result = await prisma.prefix.findMany();
    return NextResponse.json<Data[]>(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default GetHandler;
