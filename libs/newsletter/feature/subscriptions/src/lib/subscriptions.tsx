import { NewsletterSubscriptionAPIRequest, NewsletterSubscriptionAPIResponse } from '@wrkspce/newsletter/domain';
import { get, create } from '@wrkspce/newsletter/feature/core/server';
/**
 * Handles the GET request for retrieving a newsletter subscription.
 * 
 * @param request - The request object containing the user ID.
 * @returns A JSON response containing the subscription if found, or an error response otherwise.
 */
export function getSubscription(userId: string): NewsletterSubscriptionAPIResponse {
  // Use a mock DB for demonstration purposes
  return get(userId)
}

/**
 * Handles the POST request for creating a newsletter subscription.
 * 
 * @param request - The request` object containing the user ID and newsletter information.
 * @returns A JSON response containing the created subscription if successful, or an error response otherwise.
 */
export function createSubscription({ userId, newsletter }: NewsletterSubscriptionAPIRequest): NewsletterSubscriptionAPIResponse {
  // Use a mock DB for demonstration purposes
  return create({ userId, newsletter })
}