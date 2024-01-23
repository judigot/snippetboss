import { customFetch } from '@/api-calls/customFetch';
import { snippet } from '@prisma/client';

interface BodyInterface
  extends Pick<snippet, 'snippet_id' | 'snippet_content'> {}

interface ResponseInterface extends snippet {}

export const updateSnippet = async (
  formData: BodyInterface,
): Promise<ResponseInterface> => {
  const result: ResponseInterface = await customFetch.patch({
    url: `/snippets`,
    body: JSON.stringify(formData),
  });
  return result;
};
