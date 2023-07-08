# ESLintConfig

This repository contains linting configurations for DNP projects written in TypeScript/JavaScript.

## Install

```
yarn add -D @douglasneuroinformatics/eslint-config eslint eslint-plugin-import @typescript-eslint/eslint-plugin
```

## Usage

**.eslintrc.json**

```json
{
  "extends": ["@douglasneuroinformatics"],
  "parserOptions": {
    "project": ["./tsconfig.json"]
  }
}
```
