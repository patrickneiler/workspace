import 'server-only';

import { getMutableAIState } from 'ai/rsc';
import { getAssistance } from '@wrkspce/assistance/feature/core';
import { AI } from '@wrkspce/assistance/domain';
import { Tools } from '../tools';

export async function submitUserMessage(message: string) {
  'use server';
  const tools = Tools.map((tool) => tool.tool);
  const aiState = getMutableAIState<AI>();
  aiState.done([
    ...aiState.get(),
    {
      role: 'user',
      content: message,
    },
  ]);

  return await getAssistance(tools);
}
