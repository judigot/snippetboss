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
                <TextArea
                  snippetID={snippet_id}
                  defaultContent={snippet_content}
                />
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
}

console.log(`%c${"Hello, World!"}`, "color: red")

const TextArea = ({
  snippetID,
  defaultContent,
}: {
  snippetID: bigint;
  defaultContent: string;
}) => {
  const OPTIONS = {
    DEFAULT: 'Default',
    VS_CODE: 'VS Code',
    RAW_CODE: 'Raw Code',
  } as const;

  const [transformType, setTransformType] = useState<
    (typeof OPTIONS)[keyof typeof OPTIONS]
  >(OPTIONS.RAW_CODE);

  const transformedContent: string = (() => {
    if (transformType === OPTIONS.RAW_CODE)
      return StringModifier(defaultContent).removeDelimiters().get();

    if (transformType === OPTIONS.VS_CODE)
      return StringModifier(defaultContent)
        .escapeQuotes()
        .convertToSnippetFormat()
        .get();

    return defaultContent;
  })();

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridColumnGap: '10px',
        }}
      >
        <div>
          <pre
            // contentEditable={true}
            style={{
              height: '200px',
              width: '100%',
              border: '1px solid black',
              margin: '0%',
            }}
          >
            <code>{transformedContent}</code>
          </pre>
        </div>
        <div>
          {Object.entries(OPTIONS).map(
            (
              [optionsKey, optionValue]: [
                string,
                (typeof OPTIONS)[keyof typeof OPTIONS],
              ],
              i: number,
            ) => (
              <div key={i}>
                <input
                  onChange={() => {
                    setTransformType(() => optionValue);
                  }}
                  defaultChecked={
                    optionValue === OPTIONS.RAW_CODE ? true : false
                  }
                  type="radio"
                  id={`transform-${snippetID}`}
                  name={`transform-${snippetID}`}
                />
                <label htmlFor={`${optionsKey}`}>{optionValue}</label>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
};
