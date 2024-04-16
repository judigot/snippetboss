import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.snippet_type.createMany({
      data: [
        { snippet_type_id: 1, snippet_type_name: 'global' },
        { snippet_type_id: 2, snippet_type_name: 'specific' },
      ],
    });

    await prisma.language.createMany({
      data: [
        {
          language_id: 1,
          language_name: 'typescript',
          display_name: 'TypeScript',
        },
        { language_id: 2, language_name: 'java', display_name: 'Java' },
      ],
    });

    await prisma.prefix.createMany({
      data: [
        {
          prefix_id: 1,
          prefix_description: 'String Variable',
          snippet_type_id: 1,
        },
        {
          prefix_id: 2,
          prefix_description: 'Integer Number Variable',
          snippet_type_id: 1,
        },
        {
          prefix_id: 3,
          prefix_description: 'Description',
          snippet_type_id: 1,
        },
        {
          prefix_id: 4,
          prefix_description: 'Description',
          snippet_type_id: 1,
        },
        {
          prefix_id: 5,
          prefix_description: 'Description',
          snippet_type_id: 1,
        },
      ],
    });

    await prisma.prefix_name.createMany({
      data: [
        {
          prefix_name_id: 1,
          prefix_id: 1,
          prefix_name: 'varText',
          is_default: true,
        },
        {
          prefix_name_id: 2,
          prefix_id: 1,
          prefix_name: 'stringVariable',
          is_default: false,
        },
        {
          prefix_name_id: 3,
          prefix_id: 2,
          prefix_name: 'varNumber',
          is_default: true,
        },
        {
          prefix_name_id: 4,
          prefix_id: 2,
          prefix_name: 'numberIntegerVariable',
          is_default: false,
        },
        {
          prefix_name_id: 5,
          prefix_id: 3,
          prefix_name: 'varDecimal',
          is_default: true,
        },
        {
          prefix_name_id: 6,
          prefix_id: 3,
          prefix_name: 'numberFloatVariable',
          is_default: false,
        },
        {
          prefix_name_id: 7,
          prefix_id: 4,
          prefix_name: 'varBoolean',
          is_default: true,
        },
        {
          prefix_name_id: 8,
          prefix_id: 4,
          prefix_name: 'booleanVariable',
          is_default: false,
        },
        {
          prefix_name_id: 9,
          prefix_id: 5,
          prefix_name: 'varObject',
          is_default: true,
        },
        {
          prefix_name_id: 10,
          prefix_id: 5,
          prefix_name: 'objectVariable',
          is_default: false,
        },
      ],
    });

    await prisma.snippet.createMany({
      data: [
        {
          snippet_id: 1,
          snippet_type_id: 1,
          prefix_id: 1,
          snippet_content:
            'const ${1:stringVariable}: string = "${2:Hello, World!}";',
        },
        {
          snippet_id: 2,
          snippet_type_id: 1,
          prefix_id: 2,
          snippet_content: 'int ${1:numberIntegerVariable} = ${2:100};',
        },
      ],
    });

    await prisma.snippet_language.createMany({
      data: [
        { snippet_language_id: 1, snippet_id: 1, language_id: 1 },
        { snippet_language_id: 2, snippet_id: 2, language_id: 2 },
      ],
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {})
  .catch(() => {});
