import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// prettier-ignore
async function main() {
  // await prisma.snippet_type.createMany({
  //   data: [
  //     { snippet_type_name: "global" },
  //     { snippet_type_name: "specific" },
  //   ],
  // });

  // await prisma.language.createMany({
  //   data: [
  //     { lang_name: "typescript" },
  //     { lang_name: "java" },
  //   ],
  // });

  // await prisma.snippet.createMany({
  //   data: [
  //     {
  //       lang_id: 1,
  //       snippet_type_id: 1,
  //       snippet_name: "log",
  //       snippet_content: "console.log(${1:\"${2:Hello, World!}\"});",
  //     },
  //     {
  //       lang_id: 1,
  //       snippet_type_id: 1,
  //       snippet_name: "logRed",
  //       snippet_content: "console.log(`%c\\${${1:\"${2:Hello, World!}\"}}`, \"color: red\")",
  //     }
  //   ],
  // });
  
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
