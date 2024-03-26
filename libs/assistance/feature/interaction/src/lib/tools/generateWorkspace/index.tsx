import { generateInstructions } from '@wrkspce/assistance/util';
import { z } from 'zod';
import { current } from './current';
import { WorkspaceParameters } from './domain';
import { getMutableAIState } from 'ai/rsc';
import { AI, AITool, Action } from '../../../domain';
import { SpinnerMessage } from '@wrkspce/ui/react';
import { ConfirmWorkspace } from './action/client';
import { confirmWorkspace } from './action/server';


/**
 * Instructions for generating workspace parameters.
 */
export const instructions = generateInstructions({
    name: 'generate_workspace',
    condition: 'You receive written descriptions of features and their requirements.',
    description: 'Your goal is to interpret these descriptions and use the provided functions to generate the appropriate NX workspace configurations. By interpreting the descriptions and using the functions to generate configurations, you can help developers set up their NX workspaces to meet the specific requirements of the feature they are developing.',
    knowledge: `Current workspace configuration: ${JSON.stringify(current)}`,
    rules: [
        "Review the existing configuration to understand the current system design and to follow the conventions already established.",
        "Upon receiving a message, parse the description to identify the feature and its requirements. This could involve identifying the libraries, scopes, and modules that are needed, as well as any specific configurations for these elements. Use the generateWorkspaceParameters functions to validate and parse these parameters."
    ]
});

export const parameters = z
    .object({
        /**
         * The name of the library, module or app. Should follow pattern of [scope]/[name].
         */
        name: z.string().describe('The name of the library, module or app. Should follow pattern of [scope]/[name].'),
        /**
         * The type of configuration, can be either library, module, or app.
         */
        configType: z.enum(['library', 'module', 'app']).describe('The type of configuration, can be either library, module, or app.'),
        /**
         * The description of the library, module or app.
         */
        description: z.string().describe('The description of the library, module or app.'),
        /**
         * The array of field objects.
         */
        fields: z
            .array(
                z
                    .object({
                        /**
                         * The name of the field.
                         */
                        name: z.string().describe('The name of the field.'),
                        /**
                         * The type of the field.
                         */
                        type: z.enum(['input', 'select', 'multi', 'checkbox', 'radio', 'file']).describe('The type of the field.'),
                        /**
                         * The options for the field, if applicable.
                         */
                        options: z.array(z.string()).optional().describe('The options for the field, if applicable.'),
                        /**
                         * The value of the field.
                         */
                        value: z.string().describe('The value of the field'),
                        /**
                         * Whether the field is required or not.
                         */
                        required: z.boolean().optional().describe('Whether the field is required or not.'),
                        /**
                         * The placeholder for the field, if any.
                         */
                        placeholder: z.string().optional().describe('The placeholder for the field, if any.'),
                        /**
                         * The label for the field.
                         */
                        label: z.string().describe('The label for the field'),
                    })
                    .describe('The field object, containing details about the field.'),
            )
            .optional()
            .describe('The array of field objects.'),
        /**
         * The children of the configuration, if any.
         */
        children: z.any().optional().describe('The children of the configuration, if any.'),
    })
    .required()
    .describe('The library configuration object.')


export const render = async function* (config: WorkspaceParameters) {
    // Get the mutable AI state.
    const aiState = getMutableAIState<AI>();

    // Show a spinner on the client while we wait for the response.
    yield <SpinnerMessage>Generating Workspace...</SpinnerMessage>;

    aiState.done([
        ...aiState.get(),
        {
            role: 'function',
            name: 'generate_workspace',
            content: `${JSON.stringify(config)}`,
        },
    ]);

    return <ConfirmWorkspace config={config} />;
};

export const generateWorkspace: { instructions: string, tool: AITool, actions: Action[] } = {
    instructions,
    tool: {
        name: 'generate_workspace',
        parameters,
        render,
    },
    actions: [
        confirmWorkspace
    ]
}