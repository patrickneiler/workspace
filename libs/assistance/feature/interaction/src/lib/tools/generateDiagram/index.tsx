import { generateInstructions } from '@wrkspce/assistance/util';
import { z } from 'zod';
import { getMutableAIState } from 'ai/rsc';
import { AI, AITool, Action } from '../../../domain';
import { SpinnerMessage } from '@wrkspce/ui/react';
import { current } from './current';
import { WorkspaceDiagram } from './action/client';
import { generateWorkspaceDiagram } from './action/server';


/**
 * Instructions for generating workspace parameters.
 */
export const instructions = generateInstructions({
    name: 'generate_diagram',
    condition: 'You receive a stringified JSON object representing a workspace configuration.',
    description: 'Your goal is to interpret the JSON object and generate a visual representation of the workspace configuration. By creating a visual diagram of the workspace configuration, you can help developers understand the structure of their workspace and the relationships between different elements.',
    knowledge: `Example Mermaid syntax illustrating the desired diagram structure: ${JSON.stringify(current)}`,
    rules: [
        "Parse the stringified configuration object into a JSON object.",
        "Initialize an empty string for the Mermaid syntax.",
        'Add the initial graph TD and monorepo{{"Monorepo Workspace"}} lines to the Mermaid syntax string.',
        "Iterate over each scope in the configuration object.",
        "For each scope, add a subgraph line to the Mermaid syntax string, using the scope name.",
        "Iterate over each library in the current scope.",
        "For each library, add a lib line to the Mermaid syntax string, using the library name.",
        "If the library has modules, iterate over each module.",
        "For each module, add a module line to the Mermaid syntax string, using the module name.",
        "Close the subgraph with an end line.",
        "Add connections between the monorepo, scopes, libraries, and modules as per the template.",
        "Add the classDef and class lines as per the template.",
        "Return the completed Mermaid syntax string."
    ]
});

export const parameters = z
    .object({
        /**
         * The stringified JSON object representing a workspace configuration.
         */
        config: z.string().describe('The stringified JSON object representing a workspace configuration.'),
        /**
         * The Mermaid syntax illustrating the desired diagram structure.
         */
        diagram: z.string().describe('The Mermaid syntax illustrating the desired diagram structure.'),
    });



export const render = async function* ({ config, diagram }: { config: string, diagram: string }) {
    // Get the mutable AI state.
    const aiState = getMutableAIState<AI>();

    // Show a spinner on the client while we wait for the response.
    yield <SpinnerMessage>Generating Diagram...</SpinnerMessage>;

    aiState.done([
        ...aiState.get(),
        {
            role: 'function',
            name: 'generate_diagram',
            content: `${diagram}`,
        },
    ]);

    return <WorkspaceDiagram diagram={config} />;
};

export const generateDiagram: { instructions: string, tool: AITool, actions: Action[] } = {
    instructions,
    tool: {
        name: 'generate_diagram',
        parameters,
        render,
    },
    actions: [
        generateWorkspaceDiagram
    ]
}