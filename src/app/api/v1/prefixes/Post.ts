import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/DatabaseClient';
import { PrefixResponse } from '@/app/api/v1/prefixes/Get';
import { Prisma } from '@prisma/client';

interface Body extends Omit<PrefixResponse, 'prefix_id'> {}
interface FormBody extends Omit<PrefixResponse, 'prefix_id'> {
  prefix_language: string[];
}

const PostHandler = async (req: NextRequest) => {
  const body = (await req.json()) as FormBody;
  try {
    // Start transaction
    await prisma.$executeRaw`BEGIN`;

    // Insert into prefix and get the id
    const prefixInsertionQuery = Prisma.sql`INSERT INTO prefix (prefix_description) VALUES (${body.prefix_description}) RETURNING prefix_id`;
    const prefixResult: { prefix_id: number }[] =
      await prisma.$queryRaw(prefixInsertionQuery);

    const prefixId = prefixResult[0].prefix_id; // Assuming the query returns the id

    // For each prefix_name in the request, insert into prefix_name using the obtained prefix_id
    for (const prefixName of body.prefix_names) {
      await prisma.$executeRaw(
        Prisma.sql`INSERT INTO prefix_name (prefix_id, prefix_name, is_default) VALUES (${prefixId}, ${prefixName.prefix_name}, ${prefixName.is_default})`,
      );
    }

    // Insert into prefix_language
    const prefixLanguageInsertionQuery = Prisma.sql`
    WITH SelectedLanguageIDs AS (
        SELECT language_id
        FROM language
        WHERE language_name = ANY(ARRAY[${body.prefix_language.join(', ')}])
    )
    INSERT INTO prefix_language (prefix_id, language_id)
    SELECT ${prefixId}, language_id
    FROM SelectedLanguageIDs
    ON CONFLICT (language_id, prefix_id) DO NOTHING;
    `;
    await prisma.$queryRaw(prefixLanguageInsertionQuery);

    // Commit transaction
    await prisma.$executeRaw`COMMIT`;

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default PostHandler;
