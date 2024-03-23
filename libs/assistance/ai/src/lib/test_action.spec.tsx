import { submitUserMessage } from './action';

describe('submitUserMessage', () => {
  it('should render the UI and return the expected result', async () => {
    const userInput = 'Hello, AI!';
    const expectedId = Date.now();

    // Mock the render function and its return value
    const mockRender = jest.fn().mockReturnValue({
      id: expectedId,
      display: 'Mock UI',
    });

    // Mock the getMutableAIState function
    const mockGetMutableAIState = jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue([]),
      update: jest.fn(),
    });

    // Mock the renderWorkspace function
    const mockRenderWorkspace = jest.fn();

    // Mock the BotMessage component
    jest.mock('./BotMessage', () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue('Mock BotMessage'),
    }));

    // Mock the GenerateLiveAvatar component
    jest.mock('./GenerateLiveAvatar', () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue('Mock GenerateLiveAvatar'),
    }));

    // Mock the LiveAvatar component
    jest.mock('./LiveAvatar', () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue('Mock LiveAvatar'),
    }));

    // Mock the openai provider
    const openai = jest.fn();

    // Call the submitUserMessage function
    const result = await submitUserMessage(userInput);

    // Assert that the render function was called with the correct arguments
    expect(mockRender).toHaveBeenCalledWith({
      model: 'gpt-4-0125-preview',
      provider: openai,
      messages: [
        { role: 'system', content: 'instructions' },
        {
          role: 'system',
          content: `When user is asking you to build feature configuration, Use this existing configuration to guide naming conventions and path structure: Nested Workspace Config: {} / Library Config: {} / Modules Config: {}`,
        },
        { role: 'user', content: userInput },
      ],
      text: expect.any(Function),
      tools: {
        generateWorkspaceParameters: {
          description: 'Generate a library, module or app configuration',
          parameters: 'generateWorkspaceParameters',
          render: mockRenderWorkspace,
        },
      },
      initial: expect.any(Function),
    });

    // Assert that the getMutableAIState function was called
    expect(mockGetMutableAIState).toHaveBeenCalled();

    // Assert that the update function was called with the correct arguments
    expect(mockGetMutableAIState().update).toHaveBeenCalledWith([
      {
        role: 'user',
        content: userInput,
      },
    ]);

    // Assert that the expected result is returned
    expect(result).toEqual({
      id: expectedId,
      display: 'Mock UI',
    });
  });
});
