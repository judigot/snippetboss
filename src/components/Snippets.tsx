// 'use client';

import { SnippetDataType, readSnippet } from '@/api-calls/snippet/read-snippet';
import { useEffect, useState } from 'react';

interface Props {
  language: string;
}

export default function Snippets({ language }: Props) {
  const [snippets, setSnippets] = useState<SnippetDataType[] | null>([]);

  useEffect(() => {
    readSnippet(language)
      .then((result) => {
        if (result) {
          setSnippets(result);
        }
      })
      .catch(() => {});
  }, [language]);

  return (
    <div>
      {snippets && (
        <>
          {snippets?.map(({ snippet_id, snippet_content, prefix_name }) => (
            <div key={snippet_id}>
              <h1>{prefix_name}</h1>
              <textarea style={{height: "200px", width: "500px"}} readOnly value={snippet_content ?? ''} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
