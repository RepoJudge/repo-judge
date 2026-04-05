// https://github.com/orval-labs/orval/blob/master/samples/next-app-with-fetch/custom-fetch.ts

import { settings } from '../src/shared';

const isServer = () => globalThis.window === undefined;

const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return c.json() as Promise<T>;
  }

  return c.text() as Promise<T>;
};

const getUrl = (contextUrl: string): string => {
  const url = new URL(`http://localhost${contextUrl}`);
  const pathname = url.pathname;
  const search = url.search;
  const baseUrl = isServer() ? settings.SERVER_API_URL : settings.API_URL;

  const requestUrl = new URL(`${baseUrl}${pathname}${search}`);
  return requestUrl.toString();
};

const getHeaders = async (headers?: HeadersInit): Promise<HeadersInit> => {
  const newHeaders = new Headers(headers);

  if (settings.NEXT_RUNTIME && isServer()) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const cookie = cookieStore.get(settings.jwt.COOKIE_NAME);

    if (cookie) {
      newHeaders.set('Cookie', `${cookie.name}=${cookie.value}`);
    }
  }

  return newHeaders;
};

export const baseFetch = async <T>(url: string, options: RequestInit): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = await getHeaders(options.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
    credentials: 'include',
  };

  const response = await fetch(requestUrl, requestInit);
  const data = await getBody<T>(response);

  if (!response.ok) {
    throw data;
  }

  return data as T;
};
