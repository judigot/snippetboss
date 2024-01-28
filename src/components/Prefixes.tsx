// 'use client';

import { readSnippet } from '@/api-calls/snippet/read-snippet';
import { prefix } from '@prisma/client';
import { useEffect, useState } from 'react';

interface Props {
  language: string;
}

export default function Prefixes({ language }: Props) {
  const [prefixes, setPrefixes] = useState<prefix[] | null>([]);

  useEffect(() => {
    readSnippet(language)
      .then((result) => {
        if (result) {
          setPrefixes(result);
        }
      })
      .catch(() => {});
  }, [language]);

  return (
    <>
      <h1>Prefixes</h1>
      {prefixes}
    </>
  );
}
