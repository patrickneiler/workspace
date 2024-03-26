import { ReactNode } from "react";
import { z } from "zod";

export type Action = (...args: any) => Promise<{[key: string]: any}>;
export type AIProviderProps<AIState = any, UIState = any> = {
  children: React.ReactNode;
  initialAIState?: AIState;
  initialUIState?: UIState;
};
export type AI<AIState = any, UIState = any, Actions = any> = (props: AIProviderProps<AIState, UIState>) => Promise<React.ReactElement>;
export type AIState = {
    role: 'user' | 'assistant' | 'system' | 'function';
    content: string;
    id?: string;
    name?: string;
};
export type UIState = {
    id: number;
    display: React.ReactNode;
};

type Streamable = ReactNode | Promise<ReactNode>;

type Renderer<T> = (props: T) => Streamable | Generator<Streamable, Streamable, void> | AsyncGenerator<Streamable, Streamable, void>;

export type AITool<T = any> = {
    name: string;
    description?: string;
    parameters: z.Schema;
    render: Renderer<T>;
};

export type AssistanceInteractionProps = {
    instructions: string;
    tools?: AITool[];
    actions: Action[];
}