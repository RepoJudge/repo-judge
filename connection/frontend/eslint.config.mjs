import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import fsdConfig from '@uvarovag/eslint-config-feature-sliced-flat';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import typedEmptyMapRule from './eslint/rules/typed-empty-map.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  { ignores: ['src/styled/**', 'src/client/**'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...fsdConfig,
  eslintPluginUnicorn.configs.unopinionated,
  {
    plugins: {
      internal: {
        rules: {
          'typed-empty-map': typedEmptyMapRule,
        },
      },
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message: "import { settings } from '@/shared'",
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'styled-jsx/css',
              message: "Используйте '@/styled/css'.",
            },
            {
              name: 'rbush',
              message: "Используйте '@/features/annotation/lib/rtree'.",
            },
            {
              name: 'antd',
              importNames: ['InputNumber'],
              message: "Используйте '@/shared/ui/common/InputNumber'.",
            },
          ],
        },
      ],
      'import/no-internal-modules': 'off',
      'no-debugger': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'MemberExpression[object.name="ability"][property.name="can"]',
          message:
            "Не используйте ability.can напрямую. Используйте хук useCan из '@/shared/authz'",
        },
        {
          selector:
            "VariableDeclarator[init.type='ArrayExpression'][init.elements.length=0]:not([id.typeAnnotation])",
          message:
            'При объявлении пустого массива обязательно указывайте тип (например, const x: string[] = []).',
        },
      ],
      'internal/typed-empty-map': 'error',
    },
  },
  {
    files: ['src/shared/authz/hooks.ts'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
  ...compat.extends('plugin:prettier/recommended'),
];
