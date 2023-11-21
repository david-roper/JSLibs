import type { FormFields } from '@douglasneuroinformatics/form-types';

type Data = {
  a?: string;
  b?: {
    c: number;
    d?: number;
  }[];
  e?: string;
};

export const fields: FormFields<Data> = {
  a: {
    kind: 'text',
    label: 'Text',
    variant: 'short'
  },
  b: {
    fieldset: {
      c: {
        kind: 'numeric',
        label: 'Number',
        variant: 'default'
      },
      d: {
        kind: 'dynamic-fieldset',
        render: (data) => {
          if (data.c) {
            return {
              kind: 'numeric',
              label: 'Number',
              variant: 'default'
            };
          }
          return null;
        }
      }
    },
    kind: 'array',
    label: 'Array Field'
  },
  e: {
    deps: ['a'],
    kind: 'dynamic',
    render: (data) => {
      if (data?.a) {
        return {
          kind: 'options',
          label: 'Options',
          options: {
            foo: 'Foo'
          }
        };
      }
      return null;
    }
  }
};
