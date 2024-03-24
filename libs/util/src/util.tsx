import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string using clsx and tailwind-merge.
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as a currency string.
 * @param value - The number to be formatted.
 * @returns The formatted currency string.
 */
export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

/**
 * Runs an asynchronous function without blocking the event loop.
 * @param fn - The asynchronous function to be executed.
 */
export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>,
) => {
  fn();
};

/**
 * Pauses the execution for a specified amount of time.
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified time has elapsed.
 */
export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
