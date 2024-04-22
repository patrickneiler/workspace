import { z } from 'zod';

export const parameters = z
  .object({
    symbol: z.string().describe('The ticker of the stock'),
    price: z.number().describe('The latest known price in USD of the stock. Provide the price to the best of your knowledge. If you are unsure, you can provide an estimate. i.e. 100.50 for $100.50'),
    delta: z.number().describe('The change in price relative to the previous close. Positive for increase, negative for decrease. i.e 0.5 for 0.5% increase, -0.5 for 0.5% decrease.'),
  })
  .required()
  .describe('The View Stock parameters');
