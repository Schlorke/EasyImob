module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended'],
  root: true,
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ['dist', 'node_modules', '*.js', '*.d.ts'],
  rules: {
    // Basic ESLint rules
    'prefer-const': 'error',
    'no-console': 'off', // Allow console logs in backend
    'no-unused-vars': 'off', // Disable base rule as it can report incorrect errors
    
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off', // Too strict for this project
  },
};
