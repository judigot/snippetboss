import {customFetch} from '@/helpers/customFetch';
import {language} from '@prisma/client';

interface Data extends Omit<language, 'lang_id'> {}

export const createLanguage = async (
  formData: Data,
): Promise<typeof formData | undefined> => {
  const result: Data | undefined = await customFetch.post({
    url: `http://localhost:3000/api/v1/languages`,
    body: JSON.stringify(formData),
  });
  return result;
};
