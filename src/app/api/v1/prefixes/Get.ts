import { NextRequest, NextResponse } from 'next/server';
import { prefix, prefix_name } from '@prisma/client';
import DatatypeParser from '@/utils/DataTypeParser';
import { prisma } from '@/prisma/DatabaseClient';

type PrefixResponse = prefix & {
  prefix_names: prefix_name[];
};

const GetHandler = async (req: NextRequest) => {
  try {
    // prefixes?language=value
    const language = req.nextUrl.searchParams.get('language');
    if (language !== null) {
      return NextResponse.json({ language });
    }

    const sql: string = /*sql*/ `
        SELECT
            p.*,
            json_agg(pn.*) AS prefix_names
        FROM prefix p
        JOIN prefix_name pn ON p.prefix_id = pn.prefix_id
        GROUP BY p.prefix_id;
    `;
    const result: PrefixResponse = await prisma.$queryRawUnsafe(sql);

    return NextResponse.json(DatatypeParser(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default GetHandler;
