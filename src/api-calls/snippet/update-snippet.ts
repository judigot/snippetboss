import { customFetch } from '@/api-calls/customFetch';
import { snippet } from '@prisma/client';

export interface UpdateSnippetDataType
  extends Pick<snippet, 'snippet_content'> {}

export const updateSnippet = async (
  snippet_id: bigint,
  formData: UpdateSnippetDataType,
): Promise<unknown> => {
  const result: UpdateSnippetDataType | undefined = await customFetch.post({
    url: `/snippets/${snippet_id}`,
    body: JSON.stringify(formData),
  });
  return result;
};
