# @douglasneuroinformatics/eslint-config

This repository contains linting configurations for DNP projects written in TypeScript/JavaScript. It is based on my [personal linting config](https://github.com/joshunrau/eslint-config), which can be extended/modified in this package as needed.

## Install

```
pnpm add -D @douglasneuroinformatics/eslint-config eslint
```

## Usage

**eslint.config.js**

```js
import { createConfig } from '@douglasneuroinformatics/eslint-config';

export default createConfig();
```
