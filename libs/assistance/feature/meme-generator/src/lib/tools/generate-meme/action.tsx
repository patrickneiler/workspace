import 'server-only';

import { createStreamableUI, getMutableAIState } from 'ai/rsc';
import { SpinnerMessage } from '@wrkspce/shared/ui';
import { runAsyncFnWithoutBlocking } from '@wrkspce/shared/util';
import { GenerateMeme } from '@wrkspce/assistance/ui/meme-generator';
import {
  AI,
  AIAction,
  GenerateMemeParameters,
} from '@wrkspce/assistance/domain';

export async function generateMeme(
  params: GenerateMemeParameters,
): Promise<{ id: number; display: JSX.Element }> {
  'use server';

  const aiState = getMutableAIState<AI>();
  const ui = createStreamableUI(<SpinnerMessage>...</SpinnerMessage>);

  runAsyncFnWithoutBlocking(async () => {
    ui.done(<GenerateMeme params={params} />);

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
  generateMeme,
};
export default Actions;
