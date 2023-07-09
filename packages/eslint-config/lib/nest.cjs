/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@douglasneuroinformatics/eslint-config/lib/base.cjs'],
  env: {
    node: true
  },
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc'
        },
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: '@nestjs/**',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['@nestjs']
      }
    ]
  }
};
