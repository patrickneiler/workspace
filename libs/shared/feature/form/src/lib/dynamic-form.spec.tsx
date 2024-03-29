import { render } from '@testing-library/react';

import { DynamicForm } from './dynamic-form';

const handleSubmit = () => {
  console.log('submit');
};

describe('DynamicForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DynamicForm
        onSubmit={handleSubmit}
        fields={[
          {
            name: 'name',
            type: 'input',
            options: ['option1', 'option2'],
            required: true,
            placeholder: 'placeholder',
            label: 'label',
            value: 'value',
          },
        ]}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
