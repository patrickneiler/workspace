import { z } from 'zod';

export const parameters = z
  .object({
    name: z.string().describe('The name of the feature'),
    tool: z.object({
      name: z.string().describe('The name of the tool'),
      type: z.enum(['static', 'async', 'action']).describe('The type of the tool'),
      instructions: z.string().describe('The instructions for the tool. Do not include parenthesis or special characters. i.e. "Generate an order by providing the name of the order and the items in the cart"'),
      parameters: z.string().describe('The parameters for the tool. i.e. [{property: "name", type: "string", description: "The name of the order"}]. Do not include parenthesis or special characters.'),
      rules: z.string().describe('The rules for the tool. i.e. ["There must be items in the cart before generating an order", "The user must be logged in"]. Do not include parenthesis or special characters.'),
      goal: z.string().describe('The goal of the tool, do not include parenthesis or special characters. i.e. "Generate an order"'),
      condition: z.string().describe('The condition for the tool to be used. Do not include parenthesis or special characters.'),
      action: z.string().describe("The name of the action, if the type is action").optional()
    }),
    appPath: z.string().optional().describe('The path to the app where the feature will be generated. i.e. "apps/assistance/app/src/app"')
  })
  .required()
  .describe('The Generate Order parameters');

