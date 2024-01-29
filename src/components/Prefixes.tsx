// 'use client';

import { readPrefix } from '@/api-calls/prefix/read-prefix';
import { prefix } from '@prisma/client';
import { useEffect, useState } from 'react';

interface Props {
  language?: string;
}

export default function Prefixes({ language }: Props) {
  const [prefixes, setPrefixes] = useState<prefix[] | null>([]);

  useEffect(() => {
    if (language !== undefined) {
      readPrefix(language)
        .then((result) => {
          if (result) {
            setPrefixes(result);
          }
        })
        .catch(() => {});
    }
  }, [language]);

  return (
    <>
      <h1>Prefixes</h1>
      {JSON.stringify(prefixes, null, 4)}
    </>
  );
}
