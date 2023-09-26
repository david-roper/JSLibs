# @douglasneuroinformatics/ui

This repository houses generic, reusable React components for DNP projects.

## Install

```shell
bun add @douglasneuroinformatics/ui
```

## Usage

**tailwind.config.js**

```javascript
import config from '@douglasneuroinformatics/ui/tailwind.config';


/** @type {import('tailwindcss').Config} */
export default {
  content: [...config.content, './src/**/*.{js,ts,jsx,tsx}'],
  presets: [config]
};

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
