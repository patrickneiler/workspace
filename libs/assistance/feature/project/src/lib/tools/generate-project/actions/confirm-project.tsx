import 'server-only';

import { createStreamableUI, getMutableAIState } from 'ai/rsc';
import { SpinnerMessage } from '@wrkspce/shared/ui';
import { runAsyncFnWithoutBlocking } from '@wrkspce/shared/util';
import { GeneratedScript } from '@wrkspce/assistance/ui/project';
import { AI, AIAction, GenerateProjectParameters } from '@wrkspce/assistance/domain';

/**
 * Confirms the project configuration.
 * @param config - The project configuration parameters.
 * @returns An object containing the configuration UI and a new system message.
 */
export async function confirmProject(config: GenerateProjectParameters): Promise<{ id: number, display: JSX.Element }> {
  'use server';

  const aiState = getMutableAIState<AI>();
  const ui = createStreamableUI(
    <SpinnerMessage>Confirming project configuration...</SpinnerMessage>,
  );

  runAsyncFnWithoutBlocking(async () => {
    const generatorScript = config.fields?.find(
      (field) => field.name === 'generatorScript',
    )?.value;

    // Update the configuration UI with the diagram display.
    ui.done(<GeneratedScript script={generatorScript || 'Error printing generator script.'} />);

    aiState.done([
      ...aiState.get(),
      {
        role: 'system',
        content: `[User has generated a project the configuration ${config}.]`,
      },
    ]);
  });

  return {
    id: Date.now(),
    display: ui.value,
  };
}

export const ConfirmProject: AIAction<GenerateProjectParameters, { id: number, display: JSX.Element }> = confirmProject;

