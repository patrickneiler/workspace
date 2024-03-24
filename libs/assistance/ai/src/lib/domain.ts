/**
 * Represents the props for an AIProvider component.
 * @template AIState - The type of the AI state.
 * @template UIState - The type of the UI state.
 * @template Actions - The type of the actions.
 */
export type AIProviderProps<AIState = any, UIState = any, Actions = any> = {
  children: React.ReactNode;
  initialAIState?: AIState;
  initialUIState?: UIState;
  $ActionTypes?: Actions;
};

/**
 * Represents an AIProvider component.
 * @template AIState - The type of the AI state.
 * @template UIState - The type of the UI state.
 * @template Actions - The type of the actions.
 * @param props - The props for the AIProvider component.
 * @returns A promise that resolves to a React element.
 */
export type AIProvider<AIState = any, UIState = any, Actions = any> = (
  props: AIProviderProps<AIState, UIState, Actions>,
) => Promise<React.ReactElement>;
