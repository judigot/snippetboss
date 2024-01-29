// 'use client';

import { readPrefix } from '@/api-calls/prefix/read-prefix';
import { readPrefixByLanguage } from '@/api-calls/prefix/read-prefix-by-language';
import { prefix } from '@prisma/client';
import { useEffect, useState } from 'react';

interface Props {
  language?: string;
}

export default function Prefixes({ language }: Props) {
  const [prefixes, setPrefixes] = useState<prefix[] | null | undefined>(
    undefined,
  );

  useEffect(() => {
    (async () => {
      const result = !language
        ? await readPrefix()
        : await readPrefixByLanguage(language);
      if (result) {
        setPrefixes(result);
      }
    })().catch(() => {});
  }, [language]);

  return (
    <>
      <h1>Prefixes</h1>
      {JSON.stringify(prefixes, null, 4)}
    </>
  );
}
