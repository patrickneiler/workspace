import { z } from 'zod';

export const parameters = z
  .object({
    cartId: z
      .object({
        value: z.string()
          .describe('The value of the cartId property'),
        type: z.string()
          .describe('The type of the cartId property')
      })
  })
  .required()
  .describe('The Generate Order parameters');
