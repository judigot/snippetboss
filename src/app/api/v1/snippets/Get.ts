import {NextRequest, NextResponse} from 'next/server';
import {snippet} from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';
import {prisma} from '@/prisma/DatabaseClient';

interface Data extends snippet {}

const GetHandler = async (req: NextRequest) => {
  try {
    // snippets?language=value
    const language = req.nextUrl.searchParams.get('language');
    if (language !== null) {
      return NextResponse.json({language});
    }

    // snippets?language=value
    const result = await prisma.snippet.findMany();
    return NextResponse.json<Data[]>(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default GetHandler;
