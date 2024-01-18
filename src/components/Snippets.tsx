// 'use client';

import {readSnippet} from '@/api-calls/snippet/read-snippet';
import {snippet} from '@prisma/client';
import {useEffect, useState} from 'react';

interface Props {
  language: string;
}

export default function Snippets({language}: Props) {
  const [snippets, setSnippets] = useState<snippet[]>([]);
  useEffect(() => {
    readSnippet(language)
      .then((result) => {
        if (result) {
          setSnippets(result);
        }
      })
      .catch(() => {});
  }, [language]);
  return <div>{JSON.stringify(snippets, null, 4)}</div>;
}
