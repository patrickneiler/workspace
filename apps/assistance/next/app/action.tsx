import { OpenAI } from "openai";
import { createAI, createStreamableUI, getMutableAIState, render } from "ai/rsc";
import { getPersonaInstructions } from '../libs/persona/instructions';
import { getWorkspaceInstructions } from '../libs/workspace/instructions';
import { generateLibraryParameters, generateModuleParameters, generateWorkspaceParameters } from "../libs/workspace/functions";
import { BotMessage, SystemMessage } from "../libs/ai/ui/message";
import { spinner } from "../libs/ai/ui/spinner";

import { runAsyncFnWithoutBlocking, sleep } from "../libs/ai/util";
import { ConfigurationCard } from "./card";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const instructions = getPersonaInstructions({
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
}) + getWorkspaceInstructions();



// An example of a spinner component. You can also import your own components,
// or 3rd party component libraries.
function Spinner() {
    console.log('spinner')
    return <BotMessage showAvatar={true} className="items-center text-white">{spinner}</BotMessage>
}

// An example of a function that fetches flight information from an external API.
async function confirmConfiguration(params: any) {
    'use server';

    const aiState = getMutableAIState<typeof AI>();

    const configurationUI = createStreamableUI(
        <div className="inline-flex items-start gap-1 md:items-center">
            {spinner}
            <p className="mb-2">
                Confirming configuration for {params.name}...
            </p>
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
                    Confirming configuration for {params.name}... working on it...
                </p>
            </div>,
        );

        await sleep(1000);

        configurationUI.done(
            null
        );

        systemMessage.done(
            <SystemMessage>
                You have successfully purchased configured {params.name}.
            </SystemMessage>,
        );

        aiState.done([
            ...aiState.get(),
            {
                role: 'system',
                content: `[User has successfully purchased configured ${params.name}.]`,
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

async function createAssistantMessage(content: string) {
    'use server';
    return {
        newMessage: {
            id: Date.now(),
            display: content,
            role: 'assistant'
        },
    };
}

async function submitUserMessage(userInput: string) {
    'use server';
    let role = 'function';

    const aiState = getMutableAIState<typeof AI>();

    // Update the AI state with the new user message.
    aiState.update([
        ...aiState.get(),
        {
            role: 'user',
            content: userInput,
        },
    ]);

    const reply = createStreamableUI(
        <BotMessage className="items-center text-white">{spinner}</BotMessage>,
    );

    // The `render()` creates a generated, streamable UI.
    const ui = render({
        model: 'gpt-4-0125-preview',
        provider: openai,
        messages: [
            { role: 'system', content: instructions },
            { role: 'user', content: userInput }
        ],
        // `text` is called when an AI returns a text response (as opposed to a tool call).
        // Its content is streamed from the LLM, so this function will be called
        // multiple times with `content` being incremental.
        text: ({ content, done }) => {
            // When it's the final content, mark the state as done and ready for the client to access.
            reply.update(<BotMessage className="items-center text-white">{content}</BotMessage>)
            if (done) {
                role = 'assistant';
                aiState.done([
                    ...aiState.get(),
                    {
                        role: "assistant",
                        content
                    }
                ]);
                reply.done()
                // Additional logic on completion can be added here. For example, making call to D-ID service.
            }
            return reply.value;
        },
        tools: {
            createWorkspaceConfig: {
                description: 'Create a workspace configuration',
                parameters: generateWorkspaceParameters,
                render: async function* (params) {
                    // Show a spinner on the client while we wait for the response.
                    yield <Spinner />

                    // Fetch the flight information from an external API.
                    //    const configuration = await confirmConfiguration(params);

                    aiState.done([
                        ...aiState.get(),
                        {
                            role: 'function',
                            name: 'createWorkspaceConfig',
                            content: `${JSON.stringify(params)}`,
                        },
                    ]);

                    // Return the flight card to the client.
                    return <ConfigurationCard params={params} />
                }
            },
            createLibraryConfig: {
                description: 'Create a library configuration',
                parameters: generateLibraryParameters,
                render: async function* (params) {
                    // Show a spinner on the client while we wait for the response.

                    // Fetch the flight information from an external API.
                    //    const configuration = await confirmConfiguration(params);

                    reply.update(
                        <BotMessage className="items-center text-white">{spinner}</BotMessage>
                    )

                    reply.done(
                        <ConfigurationCard params={params} />
                    )

                    aiState.done([
                        ...aiState.get(),
                        {
                            role: 'function',
                            name: 'createLibraryConfig',
                            content: `[UI for for confirming the configuration for ${JSON.stringify(params)} and confirm if it's correct.]`,
                        },
                    ]);

                    // Return the flight card to the client.
                    return reply.value;
                }
            },
            createModuleConfig: {
                description: 'Create a module configuration',
                parameters: generateModuleParameters,
                render: async function* (params) {
                    // Show a spinner on the client while we wait for the response.
                    yield <Spinner />

                    // Fetch the flight information from an external API.
                    //    const configuration = await confirmConfiguration(params);

                    aiState.done([
                        ...aiState.get(),
                        {
                            role: 'function',
                            name: 'createModuleConfig',
                            content: `[UI for for confirming the configuration for ${JSON.stringify(params)} and confirm if it's correct.]`,
                        },
                    ]);

                    // Return the flight card to the client.
                    return <ConfigurationCard params={params} />
                }
            }
        },
        initial: reply.value,
    })

    return {
        id: Date.now(),
        display: ui,
        role
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
    role?: 'user' | 'assistant' | 'system' | 'function';
}[] = [];

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI = createAI({
    actions: {
        submitUserMessage,
        confirmConfiguration,
        createAssistantMessage
    },
    // Each state can be any shape of object, but for chat applications
    // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
    initialUIState,
    initialAIState
});