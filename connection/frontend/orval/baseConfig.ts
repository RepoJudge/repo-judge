import { defineConfig } from 'orval';

export const getConfig = (version: string) =>
  defineConfig({
    connection: {
      input: `../../../schema/${version}.yaml`,
      output: {
        mode: 'tags-split',
        workspace: `../../src/client/${version}`,
        target: 'api.ts',
        client: 'react-query',
        httpClient: 'fetch',
        override: {
          mutator: `../../../orval/${version}/mutator.ts`,
          fetch: {
            includeHttpResponseReturnType: false,
          },
        },
      },
      hooks: {
        afterAllFilesWrite: 'prettier --write',
      },
    },
  });
