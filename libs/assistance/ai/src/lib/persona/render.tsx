import { getMutableAIState } from 'ai/rsc';
import { AI } from '../provider';

import GenerateLiveAvatar from './components/GenerateLiveAvatar';
import { LiveAvatarProps } from '@wrkspce/dynamic-avatar';

import { SpinnerMessage } from '@wrkspce/ui/react';

/**
 * Renders the persona.
 * @returns An async generator function that yields a spinner message while waiting for the response.
 */
export const renderPersona = async function* (persona: LiveAvatarProps) {

  // Get the message from the persona.
  const { message } = persona;

  // Get the mutable AI state.
  const aiState = getMutableAIState<typeof AI>();

  // Show a spinner on the client while we wait for the response.
  yield <SpinnerMessage>Thinking...</SpinnerMessage>;

  aiState.done([
    ...aiState.get(),
    {
      role: 'function',
      name: 'generateWorkspaceParameters',
      content: `${JSON.stringify(persona)}`,
    },
  ]);

  return <GenerateLiveAvatar message={message} />;
};

