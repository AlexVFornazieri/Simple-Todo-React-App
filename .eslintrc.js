module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'next/core-web-vitals',
    'standard-with-typescript',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/order': ['error', {
      pathGroups: [
        {
          pattern: '@@/**',
          group: 'external',
        },
        {
          pattern: '@/**',
          group: 'external',
        },
      ],
    }],
  },

}
