/**
 * @file FILEPATH: /Users/simplist/Repositories/ranthology/libs/assistance/ai/src/lib/provider.tsx
 * @description This file contains the implementation of the AI provider.
 */

import React from 'react';
import { createAI } from 'ai/rsc';
import { AIProvider } from './domain';

import { submitUserMessage } from './action';
import { confirmWorkspace, generateWorkspaceDiagram } from './workspace/actions';
import { generateLiveAvatar } from './persona/actions';

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

/**
 * The AI provider that creates an instance of the AI with the specified actions, initial UI state, and initial AI state.
 */
export const AI: AIProvider = createAI({
  actions: {
    submitUserMessage,
    confirmWorkspace,
    generateWorkspaceDiagram,
    generateLiveAvatar
  },
  initialUIState,
  initialAIState,
});
