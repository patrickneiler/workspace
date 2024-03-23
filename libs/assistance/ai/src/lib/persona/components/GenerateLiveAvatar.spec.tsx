import { render } from '@testing-library/react';

import GenerateLiveAvatar from './GenerateLiveAvatar';

describe('GenerateLiveAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenerateLiveAvatar message="Test" />);
    expect(baseElement).toBeTruthy();
  });
});
