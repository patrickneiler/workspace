'use server';

import { AI } from '../provider';
import { getMutableAIState, createStreamableUI } from 'ai/rsc';
import { runAsyncFnWithoutBlocking } from '@ranthology/util';
import { completion } from '../completion';

import { WorkspaceParameters } from './domain';
import { diagramInstructions } from './instructions';
import { generateDiagramParameters } from './parameters';
import { WorkspaceDiagram } from './components/WorkspaceDiagram';

import { BotMessage, spinner, SystemMessage } from '@ranthology/ui/react';

/**
 * Confirms the workspace configuration.
 * @param config - The workspace configuration parameters.
 * @returns An object containing the configuration UI and a new system message.
 */
export async function confirmWorkspace(config: WorkspaceParameters) {

  // Get the mutable AI state.
  const aiState = getMutableAIState<typeof AI>();

  // Create a streamable UI for the configuration.
  const configurationUI = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
    </div>,
  );

  // Create a streamable UI for the system message.
  const systemMessage = createStreamableUI(null);

  runAsyncFnWithoutBlocking(async () => {

    // Update the configuration UI with the confirmation message.
    configurationUI.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">Confirming configuration for {config.name}...</p>
      </div>,
    );

    // Generate the workspace diagram based on the configuration.
    const diagram = await generateWorkspaceDiagram(JSON.stringify(config));

    // Update the system message with the confirmation message.
    systemMessage.done(
      <SystemMessage>
        You have successfully configured {config.name}.
      </SystemMessage>,
    );

    // Update the configuration UI with the diagram display.
    configurationUI.done(diagram.display);

    // Update the AI state with the system message.
    aiState.done([
      ...aiState.get(),
      {
        role: 'system',
        content: `[User has successfully configured ${config.name}.]`,
      },
    ]);
  });

  return {
    configurationUI: configurationUI.value,
    newMessage: {
      id: Date.now(),
      display: systemMessage.value,
    },
  };
}

/**
 * Generates a workspace diagram based on the provided configuration.
 * @param config - The configuration string.
 * @returns An object containing the diagram ID and the display UI.
 */
export async function generateWorkspaceDiagram(config: string) {

  // Get the mutable AI state.
  const aiState = getMutableAIState<typeof AI>();

  // Call the AI completion function with the provided configuration.
  const ai = await completion(config, diagramInstructions, [{
    name: 'generateDiagramParameters',
    description: 'Generate a diagram based on the provided configuration.',
    parameters: generateDiagramParameters,
  }]);

  // Create a streamable UI for the bot message.
  const reply = createStreamableUI(
    <BotMessage className="items-center">{spinner}</BotMessage>,
  );

  // Listen for the completion of the AI function.
  ai.onFunctionCall(
    'generateDiagramParameters',
    ({ config, diagram }) => {
      // Update the UI with the generated diagram.
      reply.done(
        <WorkspaceDiagram diagram={diagram} />
      );
      // Update the AI state with the new message.
      aiState.done([
        ...aiState.get(),
        {
          role: 'function',
          name: 'generateDiagramParameters',
          content: `[UI for diagram generated from ${config}.]`,
        },
      ]);
    },
  );

  return {
    id: Date.now(),
    display: reply.value,
  };
}
