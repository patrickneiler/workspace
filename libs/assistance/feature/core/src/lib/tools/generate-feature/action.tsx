import 'server-only';

import { createStreamableUI, getMutableAIState } from 'ai/rsc';
import { SpinnerMessage } from '@wrkspce/shared/ui';
import { runAsyncFnWithoutBlocking } from '@wrkspce/shared/util';
import { ConfirmFeature } from '@wrkspce/assistance/ui/core';
import {
  AI,
  GenerateFeatureParameters,
} from '@wrkspce/assistance/domain';

export async function confirmFeature(
  params: GenerateFeatureParameters,
): Promise<{ id: number; display: JSX.Element }> {
  'use server';

  const aiState = getMutableAIState<AI>();
  const ui = createStreamableUI(<SpinnerMessage>...</SpinnerMessage>);

  runAsyncFnWithoutBlocking(async () => {
    ui.done(<ConfirmFeature params={params} />);

    aiState.done([
      ...aiState.get(),
      {
        role: 'system',
        content: `[User has generated ${params}.]`,
      },
    ]);
  });

  return {
    id: Date.now(),
    display: ui.value,
  };
}

export const Actions = {
  confirmFeature,
};
export default Actions;
