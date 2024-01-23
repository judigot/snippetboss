// 'use client';

import { SnippetDataType, readSnippet } from '@/api-calls/snippet/read-snippet';
import { StringModifier } from '@/utils/StringModifier';
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
    <>
      {snippets && (
        <>
          {snippets?.map(({ snippet_id, snippet_content, prefix_name }) => (
            <div key={snippet_id}>
              <h1>{prefix_name}</h1>
              {snippet_content !== null && (
                <TextArea rawContent={snippet_content} />
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
}

const TextArea = ({ rawContent }: { rawContent: string }) => {
  const transformedContent: string = (() => {
    return StringModifier(rawContent).removeDelimiters().get();
  })();

  const [isRaw, setIsRaw] = useState<boolean>(true);

  return (
    <>
      <textarea
        style={{ height: '200px', width: '500px' }}
        readOnly
        value={isRaw ? rawContent : transformedContent ?? ''}
      />
      <input
        onChange={() => {
          setIsRaw(() => {
            return !isRaw;
          });
        }}
        type="checkbox"
        id="isRaw"
        name="isRaw"
        value="snippet"
      />
    </>
  );
};
