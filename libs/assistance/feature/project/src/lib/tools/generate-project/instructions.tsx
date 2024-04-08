import { generateInstructions } from '@wrkspce/assistance/util';
import { current, generator } from './knowledge';
/**
 * Instructions for generating project parameters.
 */
export const instructions = generateInstructions({
  name: 'generate_project',
  condition:
    'You receive written descriptions of features and their requirements.',
  description:
    'Your goal is to interpret these descriptions and use the provided functions to generate the appropriate NX project configurations. By interpreting the descriptions and using the functions to generate configurations, you can help developers set up their NX projects to meet the specific requirements of the feature they are developing.',
  knowledge: `Here is a function that we use to generate a configuration object from the NX graph. Reference this stringified function to better understand the formatting: ${generator}. The result of that generator is: ${JSON.stringify(current)} `,
  rules: [
    'Review the existing configuration to understand the current system design and to follow the conventions already established.',
    'Upon receiving a message, parse the description to identify the feature and its requirements. This could involve identifying the libraries, scopes, and modules that are needed, as well as any specific configurations for these elements. Use the generateProjectParameters functions to validate and parse these parameters.',
  ],
});
