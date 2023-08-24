# @douglasneuroinformatics/ui

This repository houses generic, reusable React components for DNP projects.

## Install

```shell
npm install @douglasneuroinformatics/ui
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
npm run build
```