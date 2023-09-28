import type { Meta, StoryObj } from '@storybook/react';

import { Form } from './Form';

const meta: Meta<typeof Form> = {
  component: Form,
  decorators: [
    (Story) => (
      <div className="container">
        <h1 className="mb-3 text-center text-3xl">Example Form</h1>
        <Story />
      </div>
    )
  ]
};

export default meta;

type BasicFormValues = {
  textShort: string;
  textLong: string;
  textPassword: string;
  numericDefault: number;
  numericSlider: number;
  options: 'a' | 'b' | 'c';
  date: string;
  binaryCheck: boolean;
  binaryRadio: boolean;
};

export const BasicForm: StoryObj<typeof Form<BasicFormValues>> = {
  args: {
    content: {
      textShort: {
        kind: 'text',
        label: 'Short Text',
        variant: 'short',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae natus eaque dolor sequi qui dolore aut at amet fugit, porro, est et maiores, id esse! Esse doloribus laudantium laborum aperiam.'
      },
      textLong: {
        kind: 'text',
        label: 'Long Text',
        variant: 'long'
      },
      textPassword: {
        kind: 'text',
        label: 'Password',
        variant: 'password'
      },
      numericDefault: {
        description: 'This is a numeric field',
        kind: 'numeric',
        label: 'Numeric (Default)',
        min: 0,
        max: 10,
        variant: 'default'
      },
      numericSlider: {
        description: 'This is a numeric field',
        kind: 'numeric',
        label: 'Numeric (Slider)',
        min: 0,
        max: 10,
        variant: 'slider'
      },
      options: {
        kind: 'options',
        label: 'Options',
        options: {
          a: 'Option A',
          b: 'Option B',
          c: 'Option C'
        }
      },
      binaryCheck: {
        kind: 'binary',
        label: 'Binary',
        variant: 'checkbox'
      },
      binaryRadio: {
        kind: 'binary',
        label: 'Binary',
        variant: 'radio'
      },
      date: {
        kind: 'date',
        label: 'Date'
      }
    },
    validationSchema: {
      type: 'object',
      required: []
    },
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    }
  }
};

type ArrayFormValues = {
  doctorName: string;
  array: {
    patientName: string;
    isDead: boolean;
    dateOfDeath?: string;
  }[];
};

export const ArrayForm: StoryObj<typeof Form<ArrayFormValues>> = {
  args: {
    content: {
      doctorName: {
        kind: 'text',
        label: 'Doctor Name',
        variant: 'short'
      },
      array: {
        kind: 'array',
        label: 'Patient',
        fieldset: {
          patientName: {
            kind: 'text',
            label: 'Patient Name',
            variant: 'short'
          },
          isDead: {
            kind: 'binary',
            label: 'Is Dead?',
            variant: 'radio',
            options: {
              t: 'Unfortunately',
              f: 'Not yet'
            }
          },
          dateOfDeath: (fieldset) => {
            if (!fieldset.isDead) {
              return null;
            }
            return {
              kind: 'date',
              label: 'Date of Death'
            };
          }
        }
      }
    },
    errorMessages: 'F0 is a required field',
    validationSchema: {
      type: 'object',
      required: []
    },
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    }
  }
};

type GroupedFormValues = {
  f1: string;
  f2: string;
  f3: string;
  f4: string;
};

export const GroupedForm: StoryObj<typeof Form<GroupedFormValues>> = {
  args: {
    content: [
      {
        title: 'Group 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam et ut aut. Assumenda facilis numquam cupiditate aut in magni quisquam et natus obcaecati dicta eum nulla ducimus, earum alias rerum.',
        fields: {
          f1: {
            kind: 'text',
            label: 'Field 1',
            variant: 'short'
          },
          f2: {
            kind: 'text',
            label: 'Field 2',
            variant: 'short'
          }
        }
      },
      {
        title: 'Group 2',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae natus eaque dolor sequi qui dolore aut at amet fugit, porro, est et maiores, id esse! Esse doloribus laudantium laborum aperiam.',
        fields: {
          f3: {
            kind: 'text',
            label: 'Field 3',
            variant: 'short'
          },
          f4: {
            kind: 'text',
            label: 'Field 4',
            variant: 'short'
          }
        }
      }
    ],
    validationSchema: {
      type: 'object',
      properties: {
        f1: {
          type: 'string',
          minLength: 1
        },
        f2: {
          type: 'string',
          minLength: 1
        },
        f3: {
          type: 'string',
          minLength: 1
        },
        f4: {
          type: 'string',
          minLength: 1
        }
      },
      required: ['f1', 'f2', 'f3', 'f4']
    },
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    }
  }
};

type DynamicFormValues = {
  a: boolean;
  b: string;
};

export const DynamicForm: StoryObj<typeof Form<DynamicFormValues>> = {
  args: {
    content: {
      a: {
        kind: 'binary',
        label: 'Should Show B?',
        variant: 'radio'
      },
      b: ({ a }) => {
        if (a) {
          return {
            kind: 'text',
            label: 'Example',
            variant: 'short'
          };
        }
        return null;
      }
    },
    onSubmit: (data) => alert(JSON.stringify(data))
  }
};
