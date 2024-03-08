import 'server-only';

import { createAI, createStreamableUI, getMutableAIState } from 'ai/rsc';
import { SYSTEM_MESSAGE } from './system-message';
import { ASSISTANT_FUNCTIONS } from './assistant-functions';
import OpenAI from 'openai';

import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
  Stock,
  Purchase,
  Stocks,
  Events,
  Workspace
} from '@/components/llm-stocks';



import {
  runAsyncFnWithoutBlocking,
  sleep,
  formatNumber,
  runOpenAICompletion,
} from '@/lib/utils';
import { z } from 'zod';
import { StockSkeleton } from '@/components/llm-stocks/stock-skeleton';
import { EventsSkeleton } from '@/components/llm-stocks/events-skeleton';
import { StocksSkeleton } from '@/components/llm-stocks/stocks-skeleton';
import { WorkspaceConfig, WorkspaceConfigProps, getFunctionDisplayName } from '@/components/llm-workspace/WorkspaceConfig';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

async function confirmConfig(props: WorkspaceConfigProps) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();

  const confirming = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Confirming the configuration for {props.args.name}...
      </p>
    </div>,
  );

  const systemMessage = createStreamableUI(null);

  runAsyncFnWithoutBlocking(async () => {
    // You can update the UI at any point.
    await sleep(1000);

    confirming.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">
          Confirming the configuration for {props.args.name}... working on it...
        </p>
      </div>,
    );

    await sleep(1000);

    confirming.done(
      <div>
        <p className="mb-2">
          Here is your NX Workspace generator script for {props.args.name}:
          <pre className="pre">
            <code>
              {props.args.generator}
            </code>
          </pre>
        </p>
      </div>,
    );

    systemMessage.done(
      <SystemMessage>
        You have successfully generated a new {getFunctionDisplayName(props.fn)}
      </SystemMessage>,
    );

    aiState.done([
      ...aiState.get(),
      {
        role: 'system',
        content: `[User has successfully generated a new ${getFunctionDisplayName(props.fn)}]`,
      },
    ]);
  });

  return {
    purchasingUI: confirming.value,
    newMessage: {
      id: Date.now(),
      display: systemMessage.value,
    },
  };
}

async function submitUserMessage(content: string) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content
    },
  ]);

  const reply = createStreamableUI(
    <BotMessage className="items-center">{spinner}</BotMessage>,
  );

  const completion = runOpenAICompletion(openai, {
    model: "gpt-4-turbo-preview",
    stream: true,
    messages: [
      SYSTEM_MESSAGE,
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],
    functions: ASSISTANT_FUNCTIONS,
    temperature: 0,
  });

  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(<BotMessage>{content}</BotMessage>);
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: 'assistant', content }]);
    }
  });

  ASSISTANT_FUNCTIONS.forEach((fn) => {
    completion.onFunctionCall(fn.name, (args: any) => {
      reply.done(
        <BotCard>
          <WorkspaceConfig args={args} fn={fn.name} />
        </BotCard>,
      );
      aiState.done([
        ...aiState.get(),
        {
          role: 'function',
          name: fn.name,
          content: JSON.stringify(args),
        },
      ]);
    });
  });

  return {
    id: Date.now(),
    display: reply.value,
  };
}

// Define necessary types and create the AI.

const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function';
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitUserMessage,
    confirmConfig,
  },
  initialUIState,
  initialAIState,
});



export function getFunctionSkeleton(name: string) {
  switch (name) {
    case 'createScopeConfig': {
      return <StocksSkeleton />
    }
    default: {
      return <StocksSkeleton />;
    }
  }
}
