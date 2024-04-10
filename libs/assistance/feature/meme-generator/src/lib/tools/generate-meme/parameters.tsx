import { z } from 'zod';

export const parameters = z
  .object(
    {
      image: z
        .object({
          value: z.string().describe('The value of the image property'),
          type: z.string().describe('The type of the image property'),
        })
        .describe('The URL of the image to use'),
    },
    {
      topText: z
        .object({
          value: z.string().describe('The value of the topText property'),
          type: z.string().describe('The type of the topText property'),
        })
        .describe('The text to display at the top of the meme'),
    },
    {
      bottomText: z
        .object({
          value: z.string().describe('The value of the bottomText property'),
          type: z.string().describe('The type of the bottomText property'),
        })
        .describe('The text to display at the bottom of the meme'),
    },
  )
  .required()
  .describe('The Generate Meme parameters');
