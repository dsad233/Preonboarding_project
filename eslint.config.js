import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es6,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      js,
      react,
    },
    rules: {
      'constructor-super': 'error',
      'no-const-assign': 'error',
      'no-this-before-super': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': 'warn',
      'no-use-before-define': 'error',
      'semi': [2, 'always'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.jsx'],
    extends: ['plugin:react/recommended'],
  },
  {
    files: ['**/*.js'],
    extends: ['standard', 'prettier'],
  },
];
