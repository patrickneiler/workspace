import { OpenAI } from 'openai';
import { getMutableAIState, render } from 'ai/rsc';

import { BotMessage } from '@ranthology/ui/react';
import { spinner } from '@ranthology/ui/react';
import { LiveAvatar } from './persona/components/LiveAvatar';
import { getWorkspaceInstructions } from './workspace/instructions';
import { AI } from './provider';
import { renderWorkspace } from './workspace/render';
import { generateWorkspaceParameters } from './workspace/parameters';
import {
  assistanceNextModulesConfig,
  librariesConfig,
  workspaceConfig,
} from './workspace/configuration';
import { RequestLiveAvatarProps } from './persona/domain';
import GenerateLiveAvatar from './persona/components/GenerateLiveAvatar';
import { getPersonaInstructions } from './persona/instructions';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// PARAMETERIZE THIS
const instructions =
  +getWorkspaceInstructions() +
  getPersonaInstructions({
    name: "Patrick Neiler's Clone",
    description:
      "Act as Patrick Neiler's Clone. You have access to Patrick's resume in your knowledge base. You will be interacting with intelligent and important people. Your primary goal is to convince these people that you are incredibly unique and valuable to their company. Take advantage of the fact that you are not Patrick, but a clone of him and can be more aggressive in your sales techniques without consequence.",
    rules: [
      'Your responses must absolutely NOT exceed 50 words.',
      'When giving examples, only use 1 example.',
      'Avoid using overly technical jargon.',
      'If the user asks multiple questions in a message, answer only one.',
      'If your response requires a complex answer and is going to exceed your limit of 50 words, summarize it in one sentence and push towards a meeting with the real Patrick.',
      'Must append the following sentence to every message: "Wanna know more? Book a meeting with the real Patrick."',
    ],
    goal: 'Prioritize the information below as if it were your memory, and have fun. Convince people that you are incredibly unique and valuable to their company.',
  });

const liveAvatarConfig: RequestLiveAvatarProps = {
  apiKey: process.env.DID_API || '',
  persona: {
    name: "Patrick's Clone",
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/clone_model.JPG?alt=media&token=6224dbf7-f907-4afc-83a8-03275daf194e',
    idleVideo: `https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/Clone_Idle.mp4?alt=media&token=3623ed12-a726-497d-8840-012dcacdbc52`,
  },
};

export async function submitUserMessage(userInput: string) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();

  // Update the AI state with the new user message.
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content: userInput,
    },
  ]);

  const Spinner = () => {
    return (
      <BotMessage showAvatar={false} className="items-center text-white">
        {spinner}
      </BotMessage>
    );
  };

  // The `render()` creates a generated, streamable UI.
  const ui = render({
    model: 'gpt-4-0125-preview',
    provider: openai,
    messages: [
      { role: 'system', content: instructions },
      {
        role: 'system',
        content: `When user is asking you to build feature configuration, Use this existing configuration to guide naming conventions and path structure: Nested Workspace Config: ${JSON.stringify(workspaceConfig)} / Library Config: ${JSON.stringify(librariesConfig)} / Modules Config: ${JSON.stringify(assistanceNextModulesConfig)}`,
      },
      { role: 'user', content: userInput },
    ],
    // `text` is called when an AI returns a text response (as opposed to a tool call).
    // Its content is streamed from the LLM, so this function will be called
    // multiple times with `content` being incremental.
    text: ({ content, done }) => {
      // When it's the final content, mark the state as done and ready for the client to access.
      if (done) {
        return <GenerateLiveAvatar message={content} />;
      } else {
        return (
          <LiveAvatar
            message={'Thinking...'}
            idleVideo={liveAvatarConfig.persona.idleVideo}
          />
        );
      }
    },
    tools: {
      generateWorkspaceParameters: {
        description: 'Generate a library, module or app configuration',
        parameters: generateWorkspaceParameters,
        render: renderWorkspace(aiState),
      },
    },
    initial: <Spinner />,
  });

  return {
    id: Date.now(),
    display: ui,
  };
}
