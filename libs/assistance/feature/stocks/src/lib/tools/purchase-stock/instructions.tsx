import { generateInstructions } from '@wrkspce/assistance/util';
import { snapshot } from './knowledge';
/**
 * Instructions for generating project parameters.
 */
export const instructions = generateInstructions({
  name: 'purchase-stock',
  condition: 'The user asks to purchase a stock',
  goal: 'To generate the parameters needed to purchase a stock',
  knowledge: `Here is a snapshot of a result from running utilizing this tool: ""} `,
  rules: ['The user must provide the name of the stock as well as the quantity to purchase.', 'If the user does not provide a quantity, the default quantity is 10.'],
});
