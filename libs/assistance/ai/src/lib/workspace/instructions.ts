import { generateInstructions } from "@wrkspce/assistance/util";
import { workspaceConfig } from "./configuration";
import { diagram } from "./diagram";

/**
 * Instructions for generating workspace parameters.
 */
export const workspaceInstructions = generateInstructions({
  name: 'generateWorkspaceParameters',
  condition: 'You receive written descriptions of features and their requirements.',
  description: 'Your goal is to interpret these descriptions and use the provided functions to generate the appropriate NX workspace configurations. By interpreting the descriptions and using the functions to generate configurations, you can help developers set up their NX workspaces to meet the specific requirements of the feature they are developing.',
  knowledge: `Current workspace configuration: ${JSON.stringify(workspaceConfig)}`,
  rules: [
    "Review the existing configuration to understand the current system design and to follow the conventions already established.",
    "Upon receiving a message, parse the description to identify the feature and its requirements. This could involve identifying the libraries, scopes, and modules that are needed, as well as any specific configurations for these elements. Use the generateWorkspaceParameters functions to validate and parse these parameters."
  ]
});

/**
 * Instructions for generating diagram parameters.
 */
export const diagramInstructions = generateInstructions({
  name: 'generateDiagramParameters',
  condition: 'You receive a stringified JSON object representing a workspace configuration.',
  description: 'Your goal is to interpret the JSON object and generate a visual representation of the workspace configuration. By creating a visual diagram of the workspace configuration, you can help developers understand the structure of their workspace and the relationships between different elements.',
  knowledge: `Example Mermaid syntax illustrating the desired diagram structure: ${JSON.stringify(diagram)}`,
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
