'use server';
import OpenAI from "openai";
import { AITool, AI } from "../domain";
import { getMutableAIState, render } from 'ai/rsc';
import { BotMessage } from "@wrkspce/ui/react";
import { mappedTools } from "../util";

// Create an instance of the OpenAI API.
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export function getAssistance(instructions?: string, tools?: AITool[]) {
    const aiState = getMutableAIState<AI>();
    // The `render()` creates a generated, streamable UI.
    /**
     * Renders the UI for the AI assistant.
     *
     * @param {object} options - The options for rendering the UI.
     * @param {string} options.model - The model to use for the AI assistant.
     * @param {object} options.provider - The provider for the AI assistant.
     * @param {Array<object>} options.messages - The messages exchanged between the system, user, and assistant.
     * @param {Function} options.text - The function to handle the text content of the assistant's messages.
     * @param {object} options.tools - The tools available for the assistant.
     * @param {ReactNode} options.initial - The initial UI to render.
     * @returns {ReactNode} The rendered UI.
     */
    return render({
        model: 'gpt-4-0125-preview',
        provider: openai,
        messages: [
            { role: 'system', content: instructions },
            ...aiState.get().map((info: any) => ({
                role: info.role,
                content: info.content,
                name: info.name,
            })),
        ],
        text: ({ content, done }) => {
            // If the AI is done, update the AI state with the new message.
            if (done) {
                aiState.done([...aiState.get(), { role: 'assistant', content }]);
            }
            // Return the bot message.
            return <BotMessage>{content}</BotMessage>
        },
        tools: tools && mappedTools(tools)
    });
}