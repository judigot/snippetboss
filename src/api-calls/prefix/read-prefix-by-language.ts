import { customFetch } from '@/api-calls/customFetch';
import { SnippetResponseType } from '@/app/api/v1/snippets/[language]/route';

export const readPrefixByLanguage = async (
  language?: string,
): Promise<SnippetResponseType[] | null> => {
  const result: SnippetResponseType[] | null = await customFetch.get({
    url: `/prefixes/${language}`,
  });

  return result;
};
