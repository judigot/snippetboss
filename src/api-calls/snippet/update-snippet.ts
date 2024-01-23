import { customFetch } from '@/api-calls/customFetch';
import { snippet } from '@prisma/client';

interface Data extends Pick<snippet, 'snippet_id' | 'snippet_content'> {}

export const updateSnippet = async (
  formData: Data,
): Promise<typeof formData | undefined> => {
  const result: snippet = await customFetch.patch({
    url: `/snippets`,
    body: JSON.stringify(formData),
  });
  return result;
};
