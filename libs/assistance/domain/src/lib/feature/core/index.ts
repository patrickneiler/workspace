import { ReactNode } from 'react';
import { z } from 'zod';
import { DynamicFormField } from '@wrkspce/shared/feature/form'

/**
 * Represents the AI action function type.
 * @template T - The type of arguments passed to the action function.
 * @template R - The type of the result returned by the action function.
 */
export type AIAction<T = any, R = any> = (...args: T[]) => Promise<R>;

/**
 * Represents a generic action function type.
 * @param args - The arguments passed to the action function.
 * @returns A promise that resolves to an object with key-value pairs.
 */
export type Action = (...args: any) => Promise<{[key: string]: any}>;

/**
 * Represents the props for the AIProvider component.
 * @template AIState - The type of the initial AI state.
 * @template UIState - The type of the initial UI state.
 */
export type AIProviderProps<AIState = any, UIState = any> = {
  children: React.ReactNode;
  initialAIState?: AIState;
  initialUIState?: UIState;
};

/**
 * Represents the AI component type.
 * @template AIState - The type of the AI state.
 * @template UIState - The type of the UI state.
 * @template Actions - The type of the actions.
 */
export type AI<AIState = any, UIState = any, Actions = any> = (props: AIProviderProps<AIState, UIState>) => Promise<React.ReactElement>;

/**
 * Represents the AI state.
 */
export type AIState = {
    role: 'user' | 'assistant' | 'system' | 'function';
    content: string;
    id?: string;
    name?: string;
};

/**
 * Represents the UI state.
 */
export type UIState = {
    id: number;
    display: React.ReactNode;
};

/**
 * Represents a streamable value.
 */
type Streamable = ReactNode | Promise<ReactNode>;

/**
 * Represents a renderer function.
 * @template T - The type of the props passed to the renderer function.
 */
type Renderer<T> = (props: T) => Streamable | Generator<Streamable, Streamable, void> | AsyncGenerator<Streamable, Streamable, void>;

/**
 * Represents an AI tool.
 * @template T - The type of the parameters for the tool.
 */
export type AITool<T = any> = {
    name: string;
    description: string;
    parameters: z.Schema;
    render?: Renderer<T>;
};

/**
 * Represents an assistance tool.
 * @template T - The type of the parameters for the tool.
 */
export interface AssistanceTool<T = any> {
  name: string,
  type: 'static' | 'async' | 'action',
  instructions: string,
  parameters: z.AnyZodObject,
  endpoint?: string,
  ui: {
    update?: () => JSX.Element,
    done: (params: T) => JSX.Element
  }
}

/**
 * Represents an assistance feature.
 */
export interface AssistanceFeature {
    instructions: string;
    tool: AITool;
    actions: Action[];
}

/**
 * Represents the parameters for generating a feature.
 */
export interface GenerateFeatureParameters {
  name: string;
  tool: {
   
      name: string;
      type: string;
      instructions: string;
      parameters: string;
      rules: string;
      goal: string;
      condition: string,
      action?: string;
  };
  appPath?: string;
  fields?: DynamicFormField[];
}

/**
 * Represents the parameters for generating a feature with a name.
 */
export type GenerateFeatureParametersWithName = GenerateFeatureParameters & {
  name: string;
};