import { generateInstructions } from '@wrkspce/assistance/util';
import { snapshot } from './knowledge';
/**
 * Instructions for generating project parameters.
 */
export const instructions = generateInstructions({
  name: 'generate-feature',
  condition: 'User wants to generate an feature',
  goal: 'Generate a feature',
  knowledge: `Here is a snapshot of a result from running utilizing this tool: ${JSON.stringify(snapshot)}} `,
  rules: ['Utilize your knowledge to help infer parameter values from the information you receive from the user', 'Tool parameters must not contain parenthesis or other special characters', 'Tool parameter properties must be unique', 'Tool parameter types must be valid', 'Tool parameter descriptions must be valid', 'The feature name should be one word', 'The tool name and action name should not excede two works and should indicate user action', 'The tool name and action name should be unique'],
});
