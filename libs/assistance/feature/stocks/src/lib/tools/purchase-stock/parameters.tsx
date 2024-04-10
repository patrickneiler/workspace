import { z } from 'zod';

export const parameters = z
  .object(
    {
      symbol: z
        .object({
          value: z.string().describe('The value of the symbol property'),
          type: z.string().describe('The type of the symbol property'),
        })
        .describe('The symbol of the stock'),
    },
    {
      quantity: z
        .object({
          value: z.string().describe('The value of the quantity property'),
          type: z.string().describe('The type of the quantity property'),
        })
        .describe('The quantity of shares to purchase'),
    },
    {
      price: z
        .object({
          value: z.string().describe('The value of the price property'),
          type: z.string().describe('The type of the price property'),
        })
        .describe('The latest price of the stock'),
    },
  )
  .required()
  .describe('The Purchase Stock parameters');
