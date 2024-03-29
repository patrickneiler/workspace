'server only'

// Import the OpenAI API and the AI state.
import { OpenAI } from 'openai';
import { createStreamableUI, getMutableAIState } from 'ai/rsc';
import { runOpenAICompletion } from '@wrkspce/assistance/util';
import { BotMessage, spinner } from '@wrkspce/shared/ui';
import { AI, AssistanceTool } from '@wrkspce/assistance/domain';

// Create an instance of the OpenAI API.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

/**
 * Performs a completion using the OpenAI API.
 * @param message - The user's message.
 * @param instructions - The system's instructions.
 * @param functions - An array of functions with their names, descriptions, and parameters.
 * @returns A Promise that resolves to the completion result.
 */
export async function getAssistance(tools: AssistanceTool[]) {
  'use server';
  const aiState = getMutableAIState<AI>();
  console.log('getAssistance', aiState.get());
  const instructions = tools.map((tool) => tool.instructions).join(' ');
  const reply = createStreamableUI(
    <BotMessage className="items-center">{spinner}</BotMessage>,
  );
  const completion = runOpenAICompletion(openai, {
    model: 'gpt-4-0125-preview',
    stream: true,
    messages: [
      {
        role: 'system',
        content: instructions,
      },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],
    functions: tools.map((tool) => ({
      name: tool.name,
      parameters: tool.parameters,
    })),
    temperature: 0,
  });
  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(<BotMessage>{content}</BotMessage>);
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: 'assistant', content }]);
    }
  });
  tools.forEach((tool) => {
    completion.onFunctionCall(tool.name, async (params) => {
      switch (tool.type) {
        case 'static': {
          reply.done(tool.ui.done(params));
          break;
        }
        case 'async': {
          reply.update(
            tool.ui.update ? (
              tool.ui.update()
            ) : (
              <BotMessage className="items-center">{`Executing ${tool.name}(${Object.keys(tool.parameters)})`}</BotMessage>
            ),
          );
          const response = await fetch(tool.endpoint || '', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((res) => res.json());
          reply.done(tool.ui.done(response));
          break;
        }
        case 'action': {
          tool.ui.update && reply.update(tool.ui.update());
          reply.done(tool.ui.done(params));
          break;
        }
      }
      aiState.done([
        ...aiState.get(),
        {
          role: 'function',
          name: tool.name,
          content: `[UI for ${tool.name} with value: ${JSON.stringify(params)}]`,
        },
      ]);
    });
  });
  return {
    id: Date.now(),
    display: reply.value,
  };
}
