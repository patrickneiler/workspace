import { generateInstructions } from '@wrkspce/assistance/util';
import { snapshot } from './knowledge';
/**
 * Instructions for generating project parameters.
 */
export const instructions = generateInstructions({
  name: 'view-stock',
  condition: 'The user asks to view a stock price',
  goal: 'To view the price of a stock',
  knowledge: `Here is a snapshot of a result from running utilizing this tool: ""} `,
  rules: ['The user must provide the name of the stock to view its price'],
});
