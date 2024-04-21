import 'server-only';

import { createStreamableUI, getMutableAIState } from 'ai/rsc';
import { SpinnerMessage } from '@wrkspce/shared/ui';
import { runAsyncFnWithoutBlocking } from '@wrkspce/shared/util';
import { ConfirmPurchase } from '@wrkspce/assistance/ui/stocks';
import { AI, PurchaseStockParameters } from '@wrkspce/assistance/domain';

export async function confirmPurchase(
  params: PurchaseStockParameters,
): Promise<{ id: number; display: JSX.Element }> {
  'use server';

  const aiState = getMutableAIState<AI>();
  const ui = createStreamableUI(<SpinnerMessage>...</SpinnerMessage>);

  runAsyncFnWithoutBlocking(async () => {
    ui.done(<ConfirmPurchase params={params} />);

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
  confirmPurchase,
};
export default Actions;
