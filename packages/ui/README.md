# @douglasneuroinformatics/ui

This repository houses generic, reusable React components for DNP projects.

## Install

```shell
bun add @douglasneuroinformatics/ui
```

## Usage

**tailwind.config.js**

```javascript
import { createConfig } from '@douglasneuroinformatics/ui/tailwind.utils.cjs';

export default createConfig({
  content: ['./src/**/*.{ts,tsx}']
});

```

**i18n.ts**
```typescript
import { i18n as i18nLib } from '@douglasneuroinformatics/ui';
import i18n from 'i18next';

i18n.init();

i18n.on('languageChanged', (lang) => {
  i18nLib.changeLanguage(lang).catch(console.error);
});

export default i18n;

```
