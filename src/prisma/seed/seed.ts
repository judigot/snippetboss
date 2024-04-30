import { PrismaClient, Prisma } from '@prisma/client';

type ModelNames = Prisma.ModelName;

const prisma = new PrismaClient();

const tableInfo: Record<
  ModelNames,
  Record<string, number | string | boolean>[]
> = {
  language: [
    {
      language_id: 1,
      language_name: 'typescript',
      display_name: 'TypeScript',
    },
    { language_id: 2, language_name: 'java', display_name: 'Java' },
    { language_id: 3, language_name: 'react', display_name: 'React' },
  ],
  prefix: [
    {
      prefix_id: 1,
      prefix_description: 'String Variable',
    },
    {
      prefix_id: 2,
      prefix_description: 'Integer Number Variable',
    },
    {
      prefix_id: 3,
      prefix_description: 'Float Number Variable',
    },
    {
      prefix_id: 4,
      prefix_description: 'Boolean Variable',
    },
    {
      prefix_id: 5,
      prefix_description: 'Object Variable',
    },
    {
      prefix_id: 6,
      prefix_description: 'Iterate React JSX',
    },
  ],
  prefix_name: [
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
    {
      prefix_name_id: 11,
      prefix_id: 6,
      prefix_name: 'iterateReactJSX',
      is_default: true,
    },
  ],
  prefix_language: [{ prefix_language_id: 1, prefix_id: 6, language_id: 3 }],
  snippet: [
    {
      snippet_id: 1,

      prefix_id: 1,
      snippet_content:
        'const ${1:stringVariable}: string = "${2:Hello, World!}";',
    },
    {
      snippet_id: 2,

      prefix_id: 2,
      snippet_content: 'int ${1:numberIntegerVariable} = ${2:100};',
    },
  ],
  snippet_language: [
    { snippet_language_id: 1, snippet_id: 1, language_id: 1 },
    { snippet_language_id: 2, snippet_id: 2, language_id: 2 },
  ],
};

function createInsertSQL(
  tableName: string,
  data: Record<string, unknown>[],
): string {
  if (data.length === 0) return '';

  const columns = Object.keys(data[0])
    .map((column) => `"${column}"`)
    .join(', ');

  const values = data
    .map((row) => {
      return `(${Object.values(row)
        .map((value) =>
          typeof value === 'string' ? `'${value.replace(/'/g, "''")}'` : value,
        )
        .join(', ')})`;
    })
    .join(',\n');

  return `INSERT INTO "${tableName}" (${columns}) VALUES ${values} ON CONFLICT DO NOTHING;`;
}

export default async function main() {
  for (const [tableName, rows] of Object.entries(tableInfo)) {
    const sql = createInsertSQL(tableName, rows);
    if (sql) {
      await prisma.$executeRawUnsafe(sql);
      await prisma.$executeRawUnsafe(
        `ALTER SEQUENCE ${tableName}_${Object.keys(rows[0])[0]}_seq RESTART WITH ${rows.length + 1};`,
      );
    }
  }
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
