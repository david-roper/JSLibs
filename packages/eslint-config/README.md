# @douglasneuroinformatics/eslint-config

This repository contains linting configurations for DNP projects written in TypeScript/JavaScript.

## Install

```
bun add --dev @douglasneuroinformatics/eslint-config eslint eslint-plugin-import @typescript-eslint/eslint-plugin @typescript-eslint/parser
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
