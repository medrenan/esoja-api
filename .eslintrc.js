module.exports = {
  root: true,
  env: { node: true, jest: true },
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports'],
  parserOptions: { project: 'tsconfig.json', sourceType: 'module' },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    // configs para imports
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
