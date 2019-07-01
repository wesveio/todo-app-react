module.exports = {
    env: {
      browser: true,
      es6: true
    },
    extends: [
      'react-app',
      'airbnb',
      'prettier/@typescript-eslint',
      'plugin:@typescript-eslint/recommended'
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['react', 'import', 'jsx-a11y'],
    rules: {
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.tsx'],
        },
      ],
      'import/prefer-default-export': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off'
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {},
      },
    },
  };