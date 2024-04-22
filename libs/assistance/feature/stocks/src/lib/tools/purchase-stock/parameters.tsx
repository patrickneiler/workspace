import { z } from 'zod';

export const parameters = z
  .object({
    name: z.string().describe('The ticker of the stock'),
    price: z.number().describe('The price of the stock in USD. Provide the price to the best of your knowledge. If you are unsure, you can provide an estimate. i.e. 100.50 for $100.50'),
    amount: z.number().describe('Amount of stock to purchase'),
  })
  .required()
  .describe('Purchasing a stock tool');
