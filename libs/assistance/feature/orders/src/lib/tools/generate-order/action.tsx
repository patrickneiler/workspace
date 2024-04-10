import 'server-only';

import { createStreamableUI, getMutableAIState } from 'ai/rsc';
import { SpinnerMessage } from '@wrkspce/shared/ui';
import { runAsyncFnWithoutBlocking } from '@wrkspce/shared/util';
import { ConfirmOrder } from '@wrkspce/assistance/ui/orders';
import {
  AI,
  AIAction,
  GenerateOrderParameters,
} from '@wrkspce/assistance/domain';

export async function confirmOrder(
  params: GenerateOrderParameters,
): Promise<{ id: number; display: JSX.Element }> {
  'use server';

  const aiState = getMutableAIState<AI>();
  const ui = createStreamableUI(<SpinnerMessage>...</SpinnerMessage>);

  runAsyncFnWithoutBlocking(async () => {
    ui.done(<ConfirmOrder params={params} />);

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
  confirmOrder,
};
export default Actions;
