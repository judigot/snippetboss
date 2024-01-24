// 'use client';

import "@/styles/global.css"

import Languages from '@/components/Languages';

export default function Home() {
  return <Languages />;
}

// import {PrismaClient} from '@prisma/client';
// import DatatypeParser from '@/utils/DataTypeParser';

// export default async function Home() {
//   const prisma = new PrismaClient();
//   const result = DatatypeParser(
//     await prisma.prefix.findMany({
//       include: {
//         snippet: {
//           include: {
//             snippet_language: true,
//           },
//         },
//       },
//     }),
//   );
//   return (
//     <div>
//       {result?.map(({prefix_id, prefix_name, snippet}, i) => (
//         <div key={prefix_id}>
//           <h1>{prefix_name}</h1>
//           {snippet[0].snippet_content !== null && (
//             <textarea
//               readOnly
//               style={{height: '250px', width: '500px'}}
//               value={removeDelimiters(snippet[0].snippet_content)}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
