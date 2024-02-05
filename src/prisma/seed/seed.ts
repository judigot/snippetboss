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
        },
        {
          prefix_id: 2,
          prefix_description: 'Integer Number Variable',
        },
        {
          prefix_id: 3,
          prefix_description: 'Description',
        },
        {
          prefix_id: 4,
          prefix_description: 'Description',
        },
        {
          prefix_id: 5,
          prefix_description: 'Description',
        },
        // {
        //   prefix_name:
        //     'varEnum; objectLiteralVariable; constant; objectConstant',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'varArrayOfText; arrayOfStringsVariable',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'varArrayOfNumbers; arrayOfNumbersVariable',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'varArrayOfObjects; arrayOfObjectsVariable',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'class',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'function',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'ifStatement',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'ifStatements',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'ifElseStatement',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'switchCase',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'tryCatchFinallyBlock',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'forLoop; loop',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'whileLoop; loop',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'fetch',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'iterateArray',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'iterateArrayAndReturnNewArray',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'iterateObjects',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'iterateObjectProperties',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'compareStrings',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'compareNumbers',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'compareBooleans',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'compareArrays',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'compareObjects',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'log',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'logRed',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'logYellow',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'logGreen',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'logArray; logObject',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'logObjectProperty',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'combineStrings; concatenateStrings; stringCombination',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'stringer',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'stringerInterpolation; templateLiteral',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'debug',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name:
        //     'lambda; anonymous function; lambda expression; arrow function body',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name:
        //     'IIFE; self-invoking expression; self-calling expression; self-invoking function; self-calling function;',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'findObjectIndex',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'mutateObject',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'existsInArray; valueExistsInArray;',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'recursion',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'getObjectKeys',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'getObjectValues',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'appendToArray',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'prependToArray',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'removeFirstElementInArray',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'removeLastElementInArray',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'getArrayLength',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'getObjectLength',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'appendToObject',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'prependToObject',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'arrayToCSV',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'multilineString',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'builderPattern; methodChaining',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'import',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'export',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'convertStringsToArray',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'convertLinesToArray',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'functionCall',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'getType',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'namespace',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'negate',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'ternary',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'isEqualTo',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'isGreaterThan',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'isLessThan',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'isGreaterOrEqualTo',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'isLessOrEqualTo',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'replaceString',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'convertToString',
        //   prefix_description: 'Description',
        // },
        // {
        //   prefix_name: 'convertToNum',
        //   prefix_description: 'Description',
        // },
      ],
    });

    await prisma.prefix_name.createMany({
      data: [
        {
          prefix_id: 1,
          prefix_name: 'varText',
          is_default: true,
        },
        {
          prefix_id: 1,
          prefix_name: 'stringVariable',
          is_default: false,
        },
        {
          prefix_id: 2,
          prefix_name: 'varNumber',
          is_default: true,
        },
        {
          prefix_id: 2,
          prefix_name: 'numberIntegerVariable',
          is_default: false,
        },
        {
          prefix_id: 3,
          prefix_name: 'varDecimal',
          is_default: true,
        },
        {
          prefix_id: 3,
          prefix_name: 'numberFloatVariable',
          is_default: false,
        },
        {
          prefix_id: 4,
          prefix_name: 'varBoolean',
          is_default: true,
        },
        {
          prefix_id: 4,
          prefix_name: 'booleanVariable',
          is_default: false,
        },
        {
          prefix_id: 5,
          prefix_name: 'varObject',
          is_default: true,
        },
        {
          prefix_id: 5,
          prefix_name: 'objectVariable',
          is_default: false,
        },
      ],
    });

    await prisma.snippet.createMany({
      data: [
        {
          snippet_type_id: 1,
          prefix_id: 1,
          snippet_content:
            'const ${1:stringVariable}: string = "${2:Hello, World!}";',
        },
        {
          snippet_type_id: 1,
          prefix_id: 2,
          snippet_content: 'int ${1:numberIntegerVariable} = ${2:100};',
        },
      ],
    });

    await prisma.snippet_language.createMany({
      data: [
        { snippet_id: 1, language_id: 1 },
        { snippet_id: 2, language_id: 2 },
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
