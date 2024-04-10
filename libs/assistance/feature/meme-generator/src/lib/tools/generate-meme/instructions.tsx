import { generateInstructions } from '@wrkspce/assistance/util';
import { snapshot } from './knowledge';
/**
 * Instructions for generating project parameters.
 */
export const instructions = generateInstructions({
  name: 'generate-meme',
  condition: 'The user wants to generate a meme',
  goal: 'To create humorous or insightful memes',
  knowledge: `Here is a snapshot of a result from running utilizing this tool: ""} `,
  rules: [
    'The user must select an image or provide an image URL',
    'The user can add text to the top, bottom, or both parts of the image',
  ],
});
