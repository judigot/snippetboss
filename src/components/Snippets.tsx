// 'use client';

import { SnippetDataType, readSnippet } from '@/api-calls/snippet/read-snippet';
import { updateSnippet } from '@/api-calls/snippet/update-snippet';
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

const TextArea = ({
  snippetID,
  defaultContent,
}: {
  snippetID: bigint;
  defaultContent: string;
}) => {
  const TRANSFORM_OPTIONS = {
    DEFAULT: 'Default',
    VS_CODE: 'VS Code Snippet',
    RAW_CODE: 'Code',
  } as const;

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [transformType, setTransformType] = useState<
    (typeof TRANSFORM_OPTIONS)[keyof typeof TRANSFORM_OPTIONS]
  >(TRANSFORM_OPTIONS.RAW_CODE);

  const transformedContent: string = (() => {
    if (transformType === TRANSFORM_OPTIONS.RAW_CODE)
      return StringModifier(defaultContent).removeDelimiters().get();

    if (transformType === TRANSFORM_OPTIONS.VS_CODE)
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
            contentEditable={isEditable}
            onDoubleClick={() => {
              setTransformType(() => TRANSFORM_OPTIONS.DEFAULT);
              setIsEditable(() => true);
            }}
            onBlur={(e) => {
              const updatedValue: string | null = e.target.textContent;
              if (updatedValue !== defaultContent) {
                const body = {
                  snippet_id: snippetID,
                  snippet_content: updatedValue,
                };
                updateSnippet(body)
                  // .then((result) => {
                  //   if (result) {
                  //   }
                  // })
                  .catch(() => {});
              }
              setIsEditable(() => false);
            }}
            style={{
              height: '200px',
              width: '100%',
              border: '1px solid black',
              margin: '0%',
              padding: '5px',
              cursor: isEditable ? 'text' : 'pointer',
            }}
          >
            <code>{transformedContent}</code>
          </pre>
        </div>
        <div>
          {Object.entries(TRANSFORM_OPTIONS).map(
            (
              [transformOptionKey, transformOptionValue]: [
                string,
                (typeof TRANSFORM_OPTIONS)[keyof typeof TRANSFORM_OPTIONS],
              ],
              i: number,
            ) => (
              <div key={i}>
                <input
                  checked={transformType === transformOptionValue}
                  onChange={() => {
                    setTransformType(() => transformOptionValue);
                  }}
                  type="radio"
                  id={`transform-${snippetID}`}
                  name={`transform-${snippetID}`}
                />
                <label htmlFor={`${transformOptionKey}`}>
                  {transformOptionValue}
                </label>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
};
