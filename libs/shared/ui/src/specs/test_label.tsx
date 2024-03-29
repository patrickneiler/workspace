import * as React from 'react';
import { render } from '@testing-library/react';
import { Label } from '../lib/label';
import '@testing-library/jest-dom';

describe('Label', () => {
  it('renders without errors', () => {
    render(<Label />);
  });

  it('renders with custom className', () => {
    const { container } = render(<Label className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with additional props', () => {
    const { container } = render(<Label data-testid="label" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'label');
  });

  it('renders children successfully', () => {
    const { getByText } = render(<Label>Test Label</Label>);
    expect(getByText('Test Label')).toBeInTheDocument();
  });
});
