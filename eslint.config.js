import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    "env": {
    "browser": true,
    "es2021": true,
    "node": true
    },
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      js,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      "standard", "prettier"
    ],
    rules: {
      'constructor-super': 'error',
      'no-const-assign': 'error',
      'no-this-before-super': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': 'warn',
      'no-use-before-define': 'error',
      "semi": [2, "always"],
      "no-unused-vars": "warn"
    },
  },
];
