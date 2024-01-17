import {customFetch} from '@/helpers/customFetch';
import {language} from '@prisma/client';

interface Data extends language {}

export const readLanguage = async (): Promise<Data | undefined> => {
  const result: Data | undefined = await customFetch.get({
    url: `http://localhost:3000/api/v1/languages`,
  });
  return result;
};
