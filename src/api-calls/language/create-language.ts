import { customFetch } from '@/api-calls/customFetch';
import { language } from '@prisma/client';

interface Body extends Omit<language, 'language_id'> {}

export const createLanguage = async (
  formData: Body,
): Promise<Body | undefined> => {
  const result: Body | undefined = await customFetch.post({
    url: `/languages`,
    body: JSON.stringify(formData),
  });
  return result;
};
