// 'use client';

import { SnippetDataType, readSnippet } from '@/api-calls/snippet/read-snippet';
import { updateSnippet } from '@/api-calls/snippet/update-snippet';
import { StringModifier } from '@/utils/StringModifier';
import { snippet } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';

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

  const [defaultValue, setDefaultValue] = useState<string>(defaultContent);

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [transformType, setTransformType] = useState<
    (typeof TRANSFORM_OPTIONS)[keyof typeof TRANSFORM_OPTIONS]
  >(TRANSFORM_OPTIONS.RAW_CODE);

  const transformedContent: string = (() => {
    if (transformType === TRANSFORM_OPTIONS.RAW_CODE)
      return StringModifier(defaultValue).removeDelimiters().get();

    if (transformType === TRANSFORM_OPTIONS.VS_CODE)
      return StringModifier(defaultValue)
        .escapeQuotes()
        .convertToSnippetFormat()
        .get();

    return defaultValue;
  })();

  const handleUpdate = (newValue: string) => {
    if (newValue !== defaultValue) {
      const body = {
        snippet_id: snippetID,
        snippet_content: newValue,
      };
      updateSnippet(body)
        .then(
          ({
            snippet_content,
          }: {
            snippet_content: snippet['snippet_content'];
          }) => {
            if (snippet_content) {
              setDefaultValue(snippet_content);
            }
          },
        )
        .catch(() => {});
    }
    setIsEditable(() => false);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
          {isEditable && (
            <textarea
              ref={textAreaRef}
              onBlur={(e) => {
                const updatedValue: string = e.currentTarget.value;
                handleUpdate(updatedValue);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                  const updatedValue: string = event.currentTarget.value;
                  handleUpdate(updatedValue);
                }
              }}
              style={{
                height: '200px',
                width: '100%',
                border: '1px solid black',
                margin: '0%',
                padding: '5px',
                cursor: isEditable ? 'text' : 'pointer',
                resize: 'none',
              }}
              defaultValue={defaultValue}
            />
          )}

          {!isEditable && (
            <pre
              onDoubleClick={() => {
                setTransformType(() => TRANSFORM_OPTIONS.DEFAULT);
                setIsEditable(() => true);
                setTimeout(() => {
                  textAreaRef.current?.focus();
                  const length = textAreaRef.current?.value.length;
                  if (length) {
                    textAreaRef.current?.setSelectionRange(length, length);
                  }
                });
              }}
              style={{
                height: '200px',
                width: '100%',
                border: '1px solid black',
                margin: '0%',
                padding: '5px',
                cursor: isEditable ? 'text' : 'pointer',
              }}
              contentEditable={isEditable}
            >
              <code>{transformedContent}</code>
            </pre>
          )}
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
