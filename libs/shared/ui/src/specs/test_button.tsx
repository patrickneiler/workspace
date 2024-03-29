import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Button } from '../lib/button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders with default variant and size', () => {
    const { getByText } = render(<Button>Hello</Button>);
    const button = getByText('Hello');
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('text-primary-foreground');
    expect(button).toHaveClass('h-8');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
  });

  it('renders with destructive variant', () => {
    const { getByText } = render(<Button variant="destructive">Delete</Button>);
    const button = getByText('Delete');
    expect(button).toHaveClass('bg-destructive');
    expect(button).toHaveClass('text-destructive-foreground');
    expect(button).toHaveClass('h-8');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
  });

  // Add more test cases for other variants and sizes...
});
