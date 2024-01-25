import { customFetch } from '@/api-calls/customFetch';
import { SnippetResponseType } from '@/app/api/v1/snippets/[language]/route';

export const readSnippet = async (
  language: string,
): Promise<SnippetResponseType[] | null> => {
  const result: SnippetResponseType[] | null = await customFetch.get({
    url: `/snippets/${language}`,
  });

  return result;
};
