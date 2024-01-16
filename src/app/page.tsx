'use client';

import {useEffect, useState} from 'react';
import {snippet} from '@prisma/client';

export default function Home() {
  const [snippets, setSnippets] = useState<snippet[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/snippet`, {
      // *GET, POST, PATCH, PUT, DELETE
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // For POST, PATCH, and PUT requests
      // body: JSON.stringify({ key: "value" }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Success
        setSnippets(result);
      })
      .catch((error) => {
        // Failure
        throw new Error(error);
      });
  }, []);

  return snippets && <p>{JSON.stringify(snippets, null, 4)}</p>;
}

// import {PrismaClient, snippet} from '@prisma/client';
// import DatatypeParser from '@/utils/DataTypeParser';

// export default async function Home() {
//   const prisma = new PrismaClient();
//   let result = DatatypeParser(await prisma.snippet.findMany());
//   return <p>{JSON.stringify(result, null, 4)}</p>;
// }
