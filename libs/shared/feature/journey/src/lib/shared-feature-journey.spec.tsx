import { render } from '@testing-library/react';

import SharedFeatureJourney from './shared-feature-journey';

describe('SharedFeatureJourney', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedFeatureJourney />);
    expect(baseElement).toBeTruthy();
  });
});
