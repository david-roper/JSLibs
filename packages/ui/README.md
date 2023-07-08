# @douglasneuroinformatics/ui

This repository houses generic, reusable React components for DNP projects.

## Install

```shell
yarn add @douglasneuroinformatics/ui
```

## Usage

**tailwind.config.js**

```javascript
import { createConfig } from '@douglasneuroinformatics/ui/tailwind.utils.cjs';

export default createConfig({
  content: ['./src/**/*.{ts,tsx}']
});

```

## Development

### Compile Library

```shell
yarn build
```