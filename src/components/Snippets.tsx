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
                  snippet_content: updatedValue,
                };
                updateSnippet(snippetID, body)
                  .then((result) => {
                    if (result) {
                      /* prettier-ignore */ (() => { const QuickLog = result; const parentDiv = document.getElementById('quicklogContainer') || (() => {const div = document.createElement('div');div.id = 'quicklogContainer';div.style.cssText = 'position: fixed; top: 10px; left: 10px; z-index: 1000;';document.body.appendChild(div);return div; })(); const createChildDiv = (text) => {const newDiv = Object.assign(document.createElement('div'), { textContent: text, style: 'font: bold 25px "Comic Sans MS"; width: max-content; max-width: 500px; word-wrap: break-word; background-color: rgb(255, 240, 0); box-shadow: white 0px 0px 5px 1px; padding: 5px; border: 3px solid black; border-radius: 10px; color: black !important; cursor: pointer;',});const handleMouseDown = (event) => { event.preventDefault(); const clickedDiv = event.target instanceof Element && event.target.closest('div');if (clickedDiv && event.button === 0 && clickedDiv === newDiv) { const textArea = document.createElement('textarea'); textArea.value = clickedDiv.textContent || ''; document.body.appendChild(textArea); textArea.select(); document.execCommand('copy'); document.body.removeChild(textArea);clickedDiv.style.backgroundColor = 'green'; setTimeout(() => { clickedDiv.style.backgroundColor = 'rgb(255, 240, 0)'; }, 1000); }};const handleDoubleClick = () => { if (parentDiv.contains(newDiv)) { parentDiv.removeChild(newDiv); }};newDiv.addEventListener('mousedown', handleMouseDown);newDiv.addEventListener('dblclick', handleDoubleClick);return newDiv; };parentDiv.prepend(createChildDiv(QuickLog)); })()
                    }
                  })
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
