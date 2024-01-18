import { customFetch } from '@/api-calls/customFetch';
import { language } from '@prisma/client';

interface Data extends language {}

export const readLanguage = async (): Promise<Data[] | null> => {
  const result: Data[] | null = await customFetch.get({
    url: `/languages`,
  });
  return result;
};
