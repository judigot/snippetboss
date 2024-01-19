import { NextResponse } from 'next/server';
import { snippet_type } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';
import { prisma } from '@/prisma/DatabaseClient';

interface Data extends snippet_type {}

const GetHandler = async () =>
  // req: NextRequest
  {
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
