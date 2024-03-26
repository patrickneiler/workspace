import { createStreamableUI, getMutableAIState } from "ai/rsc";
import { AI, AITool } from "../../../../domain";
import { SpinnerMessage } from "@wrkspce/ui/react";
import { runAsyncFnWithoutBlocking } from "@wrkspce/util";
import { getAssistance } from "../../../render";


/**
* Generates a workspace diagram based on the provided configuration.
* @param config - The configuration string.
* @returns An object containing the diagram ID and the display UI.
*/
export async function generateWorkspaceDiagram({ instructions, tools, config }: { instructions: string, tools: AITool[], config: string }) {

  // Get the mutable AI state.
  const aiState = getMutableAIState<AI>();

  aiState.done([
    ...aiState.get(),
    {
      role: 'user',
      content: `${JSON.stringify(config)}`,
    },
  ]);

  // Create a streamable UI for the configuration.
  const ui = createStreamableUI(
    <SpinnerMessage>Generating Diagram...</SpinnerMessage>
  );

  runAsyncFnWithoutBlocking(async () => {

    // Call the AI completion function with the provided configuration.
    const diagram = await getAssistance(instructions, tools);

    // Update the configuration UI with the diagram display.
    ui.done(diagram);
  });

  return {
    id: Date.now(),
    display: ui.value,
  };
}