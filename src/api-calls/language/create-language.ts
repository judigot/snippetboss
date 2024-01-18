import {customFetch} from '@/api-calls/customFetch';
import {language} from '@prisma/client';

interface Data extends Omit<language, 'lang_id'> {}

export const createLanguage = async (
  formData: Data,
): Promise<typeof formData | undefined> => {
  const result: Data | undefined = await customFetch.post({
    url: `/languages`,
    body: JSON.stringify(formData),
  });
  return result;
};
