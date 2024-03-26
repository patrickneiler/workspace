'use server';

// Import the OpenAI API and the AI state.
import { OpenAI } from 'openai';
import { getMutableAIState, render } from 'ai/rsc';
import { AI } from './provider';

// Import the instructions and parameters for the workspace and persona tools.
import { workspaceInstructions } from './workspace/instructions';
import { generateWorkspaceParameters } from './workspace/parameters';
import { renderWorkspace } from './workspace/render';
import { personaInstructions } from './persona/instructions';
import { generateLiveAvatarParameters } from './persona/parameters';
import { renderPersona } from './persona/render';
import { RequestLiveAvatarProps } from './persona/domain';

// Import the UI components from the shared library.
import { BotMessage, SpinnerMessage } from '@wrkspce/ui/react';

// Create an instance of the OpenAI API.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// TODO: Parameterize the persona configuration.

// Combine the instructions for the persona and workspace tools.
const instructions = personaInstructions + '\n\n' + workspaceInstructions;

// Define the configuration for the live avatar tool.
const liveAvatarConfig: RequestLiveAvatarProps = {
  apiKey: process.env.DID_API || '',
  persona: {
    name: "Patrick Neiler",
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/clone_model.JPG?alt=media&token=6224dbf7-f907-4afc-83a8-03275daf194e',
    idleVideo: `https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/Clone_Idle.mp4?alt=media&token=3623ed12-a726-497d-8840-012dcacdbc52`,
  },
};
/**
 * Submits the user's message and generates a response from the AI.
 * @param userInput The user's input message.
 * @returns An object containing the ID and display UI of the generated response.
 */
export async function submitUserMessage(userInput: string) {

  // Get the mutable AI state.
  const aiState = getMutableAIState<typeof AI>();

  // Update the AI state with the user's message.
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content: userInput,
    },
  ]);

  // The `render()` creates a generated, streamable UI.
  /**
   * Renders the UI for the AI assistant.
   *
   * @param {object} options - The options for rendering the UI.
   * @param {string} options.model - The model to use for the AI assistant.
   * @param {object} options.provider - The provider for the AI assistant.
   * @param {Array<object>} options.messages - The messages exchanged between the system, user, and assistant.
   * @param {Function} options.text - The function to handle the text content of the assistant's messages.
   * @param {object} options.tools - The tools available for the assistant.
   * @param {ReactNode} options.initial - The initial UI to render.
   * @returns {ReactNode} The rendered UI.
   */
  const ui = render({
    model: 'gpt-4-0125-preview',
    provider: openai,
    messages: [
      { role: 'system', content: instructions },
      { role: 'user', content: userInput },
    ],
    text: ({ content, done }) => {
      // If the AI is done, update the AI state with the new message.
      if (done) {
        aiState.done([...aiState.get(), { role: 'assistant', content }]);
      }
      // Return the bot message.
      return <BotMessage>{content}</BotMessage>
    },
    tools: {
      generateWorkspaceParameters: {
        description: 'You will also receive written descriptions of features and their requirements. Your goal is to interpret these descriptions and use the provided functions to generate the appropriate NX workspace configurations.',
        parameters: generateWorkspaceParameters,
        render: renderWorkspace,
      },
      generateLiveAvatarParameters: {
        description: `You will be asked personal questions. Your goal is to answer them as if you were ${liveAvatarConfig.persona.name}. You will also be asked to generate a live avatar video of yourself.`,
        parameters: generateLiveAvatarParameters,
        render: renderPersona,
      },
    },
    initial: <SpinnerMessage>Thinking...</SpinnerMessage>,
  });

  return {
    id: Date.now(),
    display: ui,
  };
}