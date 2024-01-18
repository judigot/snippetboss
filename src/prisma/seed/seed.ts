import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.snippet_type.createMany({
    data: [{ snippet_type_name: 'global' }, { snippet_type_name: 'specific' }],
  });

  await prisma.language.createMany({
    data: [
      { lang_name: 'typescript', display_name: 'TypeScript' },
      { lang_name: 'java', display_name: 'Java' },
    ],
  });

  await prisma.prefix.createMany({
    data: [{ prefix_name: 'log' }, { prefix_name: 'logRed' }],
  });

  await prisma.snippet.createMany({
    data: [
      {
        snippet_type_id: 1,
        prefix_id: 1,
        snippet_content: 'console.log(${1:"${2:Hello, World!}"});',
      },
      {
        snippet_type_id: 1,
        prefix_id: 2,
        snippet_content:
          'console.log(`%c\\${${1:"${2:Hello, World!}"}}`, "color: red")',
      },
    ],
  });

  await prisma.snippet_language.createMany({
    data: [
      { snippet_id: 1, language_id: 1 },
      { snippet_id: 2, language_id: 2 },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
