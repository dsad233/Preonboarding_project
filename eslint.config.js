import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    "env": {
    "node": true
  },
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
    },
    rules: {
      'constructor-super': 'error',
      'no-const-assign': 'error',
      'no-this-before-super': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': 'warn',
      'no-use-before-define': 'error',
      'semi': ['error', 'always'],
      'no-unused-vars': 'warn'
    },
  },
];
