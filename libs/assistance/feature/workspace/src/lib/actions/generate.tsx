import 'server-only';

import { createStreamableUI, getMutableAIState } from 'ai/rsc';
import { SpinnerMessage } from '@wrkspce/shared/ui';
import { runAsyncFnWithoutBlocking, sleep } from '@wrkspce/shared/util';
import { GeneratedScript } from '@wrkspce/assistance/ui/workspace';
import { AI, WorkspaceParameters } from '@wrkspce/assistance/domain';

/**
 * Confirms the workspace configuration.
 * @param config - The workspace configuration parameters.
 * @returns An object containing the configuration UI and a new system message.
 */
export async function confirmWorkspace(config: WorkspaceParameters) {
    'use server'

    const aiState = getMutableAIState<AI>();
    const ui = createStreamableUI(
        <SpinnerMessage>Adding Configuration to Workspace...</SpinnerMessage>,
    );

    runAsyncFnWithoutBlocking(async () => {

        const generatorScript = config.fields?.find(field => field.name === 'generatorScript')?.value;
        // Update the configuration UI with the diagram display.
        ui.done(<GeneratedScript script={generatorScript} />);

        aiState.done([
            ...aiState.get(),
            {
                role: 'system',
                content: `[User has generated a workspace generator script based on the provided configuration.]`,
            },
        ]);
    });

    return {
        id: Date.now(),
        display: ui.value,
    };
}