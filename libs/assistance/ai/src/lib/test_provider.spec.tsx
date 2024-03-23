import { AIProviderProps } from './provider';

describe('AIProviderProps', () => {
  it('should have the correct type signature', () => {
    // Define the expected type signature
    type ExpectedType = {
      children: React.ReactNode;
      initialAIState?: any;
      initialUIState?: any;
      $ActionTypes?: any;
    };

    // Assert that the actual type matches the expected type
    const actualType: AIProviderProps = {} as AIProviderProps;
    const expectedType: ExpectedType = {} as ExpectedType;
    expect(actualType).toEqual(expectedType);
  });
});
