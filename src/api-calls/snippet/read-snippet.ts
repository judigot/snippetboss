import {customFetch} from '@/api-calls/customFetch';
import {snippet} from '@prisma/client';

interface Data extends snippet {}

export const readSnippet = async (language: string): Promise<Data[] | null> => {
  const result: Data[] | null = await customFetch.get({
    url: `/snippets?language=${language}`,
  });
  return result;
};
