import { render } from '@testing-library/react';

import LivingAvatar from './living-avatar';

describe('LivingAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LivingAvatar />);
    expect(baseElement).toBeTruthy();
  });
});
