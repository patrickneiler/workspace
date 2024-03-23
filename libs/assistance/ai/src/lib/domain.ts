export type AIProviderProps<AIState = any, UIState = any, Actions = any> = {
  children: React.ReactNode;
  initialAIState?: AIState;
  initialUIState?: UIState;
  /** $ActionTypes is only added for type inference and is never used at runtime **/
  $ActionTypes?: Actions;
};
export type AIProvider<AIState = any, UIState = any, Actions = any> = (
  props: AIProviderProps<AIState, UIState, Actions>,
) => Promise<React.ReactElement>;
