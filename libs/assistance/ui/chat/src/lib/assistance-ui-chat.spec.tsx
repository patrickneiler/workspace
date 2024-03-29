import { render } from '@testing-library/react';

import AssistanceUiChat from './assistance-ui-chat';

describe('AssistanceUiChat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AssistanceUiChat />);
    expect(baseElement).toBeTruthy();
  });
});
