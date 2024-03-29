import type { Meta, StoryObj } from '@storybook/react';
import { DynamicForm } from './dynamic-form';
import { Card, Theme } from '@radix-ui/themes';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof DynamicForm> = {
  component: DynamicForm,
  title: 'DynamicForm',
};
export default meta;
type Story = StoryObj<typeof DynamicForm>;

export const Primary: Story = {
  args: {
    fields: [
      {
        name: 'name',
        type: 'input',
        options: ['option1', 'option2'],
        required: true,
        placeholder: 'placeholder',
        label: 'label',
        value: 'value',
      },
    ],
    onSubmit: () => {
      console.log('submit');
    },
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DynamicForm!/gi)).toBeTruthy();
  },
};
