import globals, { es2015 } from 'globals';
import js from '@eslint/js';

export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2015,
        ...globals.jest,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    env : {
      node: true,
      es2015 : true,
      jest: true,
    },
    plugins: {
      js,
      jest: {
        "rules": {
          "jest/no-disabled-tests": "warn",
          "jest/no-focused-tests": "error",
          "jest/no-identical-title": "error",
          "jest/prefer-to-have-length": "warn",
          "jest/valid-expect": "error"
        }
      }
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
