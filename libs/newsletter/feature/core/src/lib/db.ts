import { NewsletterSubscription, NewsletterSubscriptionAPIRequest } from "@wrkspce/newsletter/domain"

/**
 * An array of newsletter subscriptions.
 */
export const newsletter_subscriptions: NewsletterSubscription[] = [
    {
        id: "1",
        userId: "1",
        newsletter: {
            industry: "Tech",
            source: "Web",
            subcategory: "Web Development"
        },
        createdAt: new Date(),
        updatedAt: new Date()
    },
    // ... (other subscriptions)
]

/**
 * Retrieves a newsletter subscription by user ID.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to the found newsletter subscription, or null if not found.
 */
export const get = async (userId: string): Promise<NewsletterSubscription | null> => {
    return newsletter_subscriptions.find(subscription => subscription.userId === userId) || null
}

/**
 * Creates a new newsletter subscription.
 * @param request - The request object containing the user ID and newsletter details.
 * @returns A promise that resolves to the newly created newsletter subscription.
 */
export const create = async ({ userId, newsletter }: NewsletterSubscriptionAPIRequest): Promise<NewsletterSubscription> => {
    const newSubscription: NewsletterSubscription = {
        id: (newsletter_subscriptions.length + 1).toString(),
        userId,
        newsletter,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    newsletter_subscriptions.push(newSubscription)
    return newSubscription
}