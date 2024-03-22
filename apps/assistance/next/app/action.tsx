import { OpenAI } from "openai";
import { createAI, createStreamableUI, getMutableAIState, render } from "ai/rsc";
import { getPersonaInstructions } from '../libs/persona/instructions';
import { getWorkspaceInstructions } from '../libs/workspace/lib/instructions';
import { ConfigurationParameters, assistanceReactModulesConfig, generateConfigurationParameters, librariesConfig, workspaceConfig } from "../libs/workspace";
import { BotMessage, SystemMessage } from "../libs/assistance/react/ui/message";
import { spinner } from "../libs/assistance/react/ui/spinner";

import { runAsyncFnWithoutBlocking, sleep } from "../libs/assistance/react/util";
import { ConfirmConfiguration } from "../libs/workspace/lib/actions/ConfirmConfiguration";
import { getVideo, requestVideo } from "../libs/persona/server";
import { GenerateLiveAvatar, RequestLiveAvatarProps } from "../libs/persona/lib/GenerateLiveAvatar";
import { LiveAvatar } from "../libs/persona/lib/LiveAvatar";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const instructions = + getWorkspaceInstructions() + getPersonaInstructions({
    name: 'Patrick Neiler\'s Clone',
    description: 'Act as Patrick Neiler\'s Clone. You have access to Patrick\'s resume in your knowledge base. You will be interacting with intelligent and important people. Your primary goal is to convince these people that you are incredibly unique and valuable to their company. Take advantage of the fact that you are not Patrick, but a clone of him and can be more aggressive in your sales techniques without consequence.',
    rules: [
        'Your responses must absolutely NOT exceed 50 words.',
        'When giving examples, only use 1 example.',
        'Avoid using overly technical jargon.',
        'If the user asks multiple questions in a message, answer only one.',
        'If your response requires a complex answer and is going to exceed your limit of 50 words, summarize it in one sentence and push towards a meeting with the real Patrick.',
        'Must append the following sentence to every message: "Wanna know more? Book a meeting with the real Patrick."'
    ],
    goal: 'Prioritize the information below as if it were your memory, and have fun. Convince people that you are incredibly unique and valuable to their company.'
});

const liveAvatarConfig: RequestLiveAvatarProps = {
    apiKey: process.env.DID_API || '',
    persona: {
        name: "Patrick's Clone",
        photoUrl: 'https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/clone_model.JPG?alt=media&token=6224dbf7-f907-4afc-83a8-03275daf194e',
        idleVideo: `https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/Clone_Idle.mp4?alt=media&token=3623ed12-a726-497d-8840-012dcacdbc52`
    }
}

async function generateLiveAvatar(message: string) {
    'use server';

    const aiState = getMutableAIState<typeof AI>();

    const liveAvatarUI = createStreamableUI(
        <LiveAvatar message={'Thinking...'} idleVideo={liveAvatarConfig.persona.idleVideo} />,
    );

    runAsyncFnWithoutBlocking(async () => {
        // Request live avatar video
        let video = await requestVideo({
            ...liveAvatarConfig,
            script: message,
        });
        // If no ID, show idle video
        if (!video.id) {
            liveAvatarUI.done(
                <LiveAvatar message={message} idleVideo={liveAvatarConfig.persona.idleVideo} />
            )
        } else {
            // Wait for video to be ready
            try {
                do {
                    video = await getVideo({
                        apiKey: liveAvatarConfig.apiKey,
                        id: video.id,
                    });
                    video.result_url && (
                        liveAvatarUI.done(<LiveAvatar message={message} idleVideo={liveAvatarConfig.persona.idleVideo} videoUrl={video.result_url} />)
                    );
                    await sleep(1000);
                }
                while (!video.result_url);
            } catch (error) {
                liveAvatarUI.done(
                    <LiveAvatar message={message} idleVideo={liveAvatarConfig.persona.idleVideo} />
                )
            }
        }
        aiState.done([
            ...aiState.get(),
            {
                role: 'system',
                content: `[Successfully retreived live avatar video: ${JSON.stringify(video)}]`,
            },
        ]);
    });

    return {
        liveAvatarUI: liveAvatarUI.value
    };
}

async function confirmConfiguration(config: ConfigurationParameters) {
    'use server';

    const aiState = getMutableAIState<typeof AI>();

    const configurationUI = createStreamableUI(
        <div className="inline-flex items-start gap-1 md:items-center">
            {spinner}
        </div>,
    );

    const systemMessage = createStreamableUI(null);

    runAsyncFnWithoutBlocking(async () => {
        // You can update the UI at any point.
        await sleep(1000);

        configurationUI.update(
            <div className="inline-flex items-start gap-1 md:items-center">
                {spinner}
                <p className="mb-2">
                    Confirming configuration for {config.name}...
                </p>
            </div>,
        );

        await sleep(1000);

        configurationUI.done(
            null
        );

        systemMessage.done(
            <SystemMessage>
                You have successfully configured {config.name}.
            </SystemMessage>,
        );

        aiState.done([
            ...aiState.get(),
            {
                role: 'system',
                content: `[User has successfully configured ${config.name}.]`,
            },
        ]);
    });

    return {
        configurationUI: configurationUI.value,
        newMessage: {
            id: Date.now(),
            display: systemMessage.value,
        },
    };
}

async function submitUserMessage(userInput: string) {
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
        return <BotMessage showAvatar={false} className="items-center text-white">{spinner}</BotMessage>
    };

    // The `render()` creates a generated, streamable UI.
    const ui = render({
        model: 'gpt-4-0125-preview',
        provider: openai,
        messages: [
            { role: 'system', content: instructions },
            { role: 'system', content: `When user is asking you to build feature configuration, Use this existing configuration to guide naming conventions and path structure: Nested Workspace Config: ${JSON.stringify(workspaceConfig)} / Library Config: ${JSON.stringify(librariesConfig)} / Modules Config: ${JSON.stringify(assistanceReactModulesConfig)}` },
            { role: 'user', content: userInput }
        ],
        // `text` is called when an AI returns a text response (as opposed to a tool call).
        // Its content is streamed from the LLM, so this function will be called
        // multiple times with `content` being incremental.
        text: ({ content, done }) => {
            // When it's the final content, mark the state as done and ready for the client to access.
            if (done) {
                return <GenerateLiveAvatar message={content} videoUrl={liveAvatarConfig.persona.idleVideo} />
            } else {
                return <LiveAvatar message={'Thinking...'} idleVideo={liveAvatarConfig.persona.idleVideo} />
            }
        },
        tools: {
            generateConfigurationParameters: {
                description: 'Generate a library, module or app configuration',
                parameters: generateConfigurationParameters,
                render: async function* (config) {
                    // Show a spinner on the client while we wait for the response.
                    yield (<Spinner />);

                    aiState.done([
                        ...aiState.get(),
                        {
                            role: 'function',
                            name: 'generateConfigurationParameters',
                            content: `${JSON.stringify(config)}`,
                        },
                    ]);

                    return <ConfirmConfiguration config={config} />
                }
            }
        },
        initial: <Spinner />,
    })

    return {
        id: Date.now(),
        display: ui
    };
}

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
    role: 'user' | 'assistant' | 'system' | 'function';
    content: string;
    id?: string;
    name?: string;
}[] = [];

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
    id: number;
    display: React.ReactNode;
}[] = [];

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI = createAI({
    actions: {
        submitUserMessage,
        confirmConfiguration,
        generateLiveAvatar
    },
    // Each state can be any shape of object, but for chat applications
    // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
    initialUIState,
    initialAIState
});