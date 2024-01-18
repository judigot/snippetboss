import { customFetch } from '@/api-calls/customFetch';
import { language, prefix, snippet } from '@prisma/client';

// interface Data extends snippet {}

export type SnippetDataType = snippet & language & prefix;

export const readSnippet = async (
  language: string,
): Promise<SnippetDataType[] | null> => {
  const result: SnippetDataType[] | null = await customFetch.get({
    url: `/snippets/${language}`,
  });
  return result;
};
