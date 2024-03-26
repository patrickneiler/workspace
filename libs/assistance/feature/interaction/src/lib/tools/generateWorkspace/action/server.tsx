import { createStreamableUI, getMutableAIState } from "ai/rsc";
import { WorkspaceParameters } from "../domain";
import { AI } from "../../../../domain";
import { SpinnerMessage } from "@wrkspce/ui/react";
import { runAsyncFnWithoutBlocking } from "@wrkspce/util";
import { generateWorkspaceDiagram } from "../../generateDiagram/action/server";
import { generateDiagram } from "../../generateDiagram";

/**
 * Confirms the workspace configuration.
 * @param config - The workspace configuration parameters.
 * @returns An object containing the configuration UI and a new system message.
 */
export async function confirmWorkspace(config: WorkspaceParameters) {

    // Get the mutable AI state.
    const aiState = getMutableAIState<AI>();

    aiState.done([
        ...aiState.get(),
        {
            role: 'function',
            name: 'generate_workspace',
            content: `${JSON.stringify(config)}`,
        },
    ]);

    // Create a streamable UI for the configuration.
    const ui = createStreamableUI(
        <SpinnerMessage>Generating Diagram...</SpinnerMessage>
    );

    runAsyncFnWithoutBlocking(async () => {

        // Generate the workspace diagram based on the configuration.
        const diagram = await generateWorkspaceDiagram({ instructions: generateDiagram.instructions, tools: [generateDiagram.tool], config: JSON.stringify(config) });

        // Update the configuration UI with the diagram display.
        ui.done(diagram.display);
    });

    return {
        id: Date.now(),
        display: ui.value,
    };
}
