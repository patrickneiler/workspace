'use server';

// Import the OpenAI API and the AI state.
import { OpenAI } from "openai";
import { AI } from "./provider";
import { getMutableAIState } from "ai/rsc";
import { runOpenAICompletion } from "@ranthology/assistance/util";

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
export async function completion(message: string, instructions: string, functions: { name: string, description: string, parameters: any }[]) {
    const aiState = getMutableAIState<typeof AI>();
    aiState.update([
        ...aiState.get(),
        {
            role: 'user',
            message,
        },
    ]);
    return await runOpenAICompletion(openai, {
        model: 'gpt-3.5-turbo',
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
        functions: functions,
        temperature: 0,
    });
}