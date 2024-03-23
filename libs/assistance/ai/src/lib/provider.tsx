import { createAI } from 'ai/rsc';
import React from 'react';
import { submitUserMessage } from './action';
import { AIProvider } from './domain';

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function';
  content: string;
  id?: string;
  name?: string;
}[] = [];

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI: AIProvider = createAI({
  actions: {
    submitUserMessage,
  },
  initialUIState,
  initialAIState,
});
