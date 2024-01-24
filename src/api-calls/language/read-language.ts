import { customFetch } from '@/api-calls/customFetch';
import { language } from '@prisma/client';

interface Body extends language {}

export const readLanguage = async (): Promise<Body[] | null> => {
  const result: Body[] | null = await customFetch.get({
    url: `/languages`,
  });
  return result;
};
