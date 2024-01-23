import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/DatabaseClient';
import { snippet } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';

interface Data extends Omit<snippet, 'snippet_id'> {}

const PatchHandler = async (req: NextRequest) => {
  const body = (await req.json()) as Data;

  const result = await prisma.snippet.create({
    data: body,
  });

  return NextResponse.json(DatatypeParser(result), { status: 200 });
};

export default PatchHandler;
