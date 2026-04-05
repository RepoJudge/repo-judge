/* eslint-disable no-restricted-properties */

import { z } from 'zod';

type Unknownify<T> = {
  [P in keyof T]: T[P] extends object ? Unknownify<T[P]> : unknown;
};

const jwtSchema = z.object({
  COOKIE_NAME: z.string().default('access_token'),
});

const rootSchema = z.object({
  API_URL: z.url(),
  SERVER_API_URL: z.url().optional(),
  NEXT_RUNTIME: z.enum(['nodejs', 'edge', '']).optional(),
  jwt: jwtSchema,
});

type RawConfig = Unknownify<z.infer<typeof rootSchema>>;

const rawConfig: RawConfig = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  SERVER_API_URL: process.env.NEXT_SERVER_API_URL,
  jwt: {
    COOKIE_NAME: process.env.NEXT_PUBLIC_JWT__COOKIE_NAME,
  },
};

const settings = rootSchema.parse(rawConfig);

export default settings;
