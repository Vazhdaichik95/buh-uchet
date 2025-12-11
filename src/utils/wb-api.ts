import { TDocumentCategory } from './types';

const api_url = process.env.API_URL;
const api_token = process.env.API_TOKEN;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

type TDocumentsCategoriesResponse = TServerResponse<{
  data: TDocumentCategory[];
}>;

const DELAY_MS = 6000; // интервал между запросами

export const getDocumentsCategoriesApi = async (): Promise<
  TDocumentCategory[]
> => {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  const response = await fetch(`${api_url}/categories`, {
    method: 'GET',
    headers: {
      Authorization: api_token ?? ''
    }
  });

  // Проверяем rate limit заголовки
  const retryAfter = response.headers.get('X-Ratelimit-Retry');
  if (response.status === 429 && retryAfter) {
    const delay = parseInt(retryAfter) * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return getDocumentsCategoriesApi(); // повторяем
  }

  return checkResponse<TDocumentsCategoriesResponse>(response).then((data) => {
    if (data?.success) return data.data;
    return Promise.reject(data);
  });
};
