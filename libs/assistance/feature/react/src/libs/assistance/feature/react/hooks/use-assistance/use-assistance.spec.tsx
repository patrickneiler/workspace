import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useAssistance from './use-assistance';

describe('useAssistance', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useAssistance());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
