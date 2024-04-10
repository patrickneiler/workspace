import { generateInstructions } from '@wrkspce/assistance/util';
import { snapshot } from './knowledge';
/**
 * Instructions for generating project parameters.
 */
export const instructions = generateInstructions({
  name: 'generate-order',
  condition: 'User wants to generate an order',
  goal: 'Generate an order',
  knowledge: `Here is a snapshot of a result from running utilizing this tool: ""} `,
  rules: ['User must have a cart with items', 'User must have an item'],
});
