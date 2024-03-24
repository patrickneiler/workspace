import { getMutableAIState } from 'ai/rsc';
import { AI } from '../provider';

import { ConfirmWorkspace } from './components/ConfirmWorkspace';
import { WorkspaceParameters } from './domain';

import { SpinnerMessage } from '@ranthology/ui/react';


export function renderWorkspace() {
  return async function* (config: WorkspaceParameters) {
    // Get the mutable AI state.
    const aiState = getMutableAIState<typeof AI>();

    // Show a spinner on the client while we wait for the response.
    yield <SpinnerMessage>Thinking...</SpinnerMessage>;

    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'generateWorkspaceParameters',
        content: `${JSON.stringify(config)}`,
      },
    ]);

    return <ConfirmWorkspace config={config} />;
  };
}
