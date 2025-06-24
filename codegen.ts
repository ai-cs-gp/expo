import graphql from './graphql.config.json';

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: graphql.schema,
  documents: ['src/graphql/**/*.gql', '!src/graphql/__generated__', '!src/graphql/types.ts', '!src/graphql/index.tsx'],
  generates: {
    'src/graphql/index.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
  hooks: {
    afterAllFileWrite: [
      'prettier --write',
      'echo "$(echo \'/* eslint-disable @typescript-eslint/no-explicit-any */\n\'; cat src/graphql/index.tsx)" > ',
    ],
  },
};

export default config;
