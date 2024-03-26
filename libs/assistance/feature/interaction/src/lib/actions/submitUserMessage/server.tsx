'use server';

// Import the OpenAI API and the AI state.
import { OpenAI } from 'openai';
import { getMutableAIState, render } from 'ai/rsc';
import { AI, AITool, Action } from '../../../domain';

// Import the instructions and parameters for the workspace and persona tools.
import { workspaceInstructions } from './workspace/instructions';
import { generateWorkspaceParameters } from './workspace/parameters';
import { renderWorkspace } from './workspace/render';
import { personaInstructions } from './persona/instructions';
import { generateLiveAvatarParameters } from './persona/parameters';
import { renderPersona } from './persona/render';
import { RequestLiveAvatarProps } from './persona/domain';

import { getAssistance } from '../../render';
/**
 * Submits the user's message and generates a response from the AI.
 * @param userInput The user's input message.
 * @returns An object containing the ID and display UI of the generated response.
 */
export async function submitUserMessage(userInput: string, instructions?: string, tools?: AITool[]) {

  // Get the mutable AI state.
  const aiState = getMutableAIState<AI>();

  // Update the AI state with the user's message.
  aiState.done([
    ...aiState.get(),
    {
      role: 'user',
      content: userInput,
    },
  ]);

  const ui = getAssistance(instructions, tools);

  return {
    id: Date.now(),
    display: ui,
  };
}