import { generateInstructions } from '@wrkspce/assistance/util';
import { snapshot } from './knowledge';
/**
 * Instructions for generating project parameters.
 */
export const instructions = generateInstructions({
  name: 'purchase-stock',
  condition: 'User wants to purchase a stock',
  goal: 'Purchase a stock',
  knowledge: `Here is a snapshot of a result from running utilizing this tool: ""} `,
  rules: [
    'User will supply quantity',
    'Determine the symbol based on the user message',
    'Assistant should provide current price',
  ],
});
