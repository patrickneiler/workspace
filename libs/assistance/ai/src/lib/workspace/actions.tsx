import { runAsyncFnWithoutBlocking } from '@ranthology/util';
import { spinner, SystemMessage } from '@ranthology/ui/react';
import { getMutableAIState, createStreamableUI } from 'ai/rsc/dist';
import { sleep } from 'openai/core';
import { AI } from '../provider';
import { WorkspaceParameters } from './domain';

export async function confirmWorkspace(config: WorkspaceParameters) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();

  const configurationUI = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
    </div>,
  );

  const systemMessage = createStreamableUI(null);

  runAsyncFnWithoutBlocking(async () => {
    // You can update the UI at any point.
    await sleep(1000);

    configurationUI.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">Confirming configuration for {config.name}...</p>
      </div>,
    );

    await sleep(1000);

    configurationUI.done(null);

    systemMessage.done(
      <SystemMessage>
        You have successfully configured {config.name}.
      </SystemMessage>,
    );

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
