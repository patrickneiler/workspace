import { Newsletter } from "./newsletter";

/**
 * Represents a newsletter subscription.
 */
export interface NewsletterSubscription {
    /**
     * The unique identifier of the subscription.
     */
    id: string;

    /**
     * The user ID associated with the subscription.
     */
    userId: string;

    /**
     * The newsletter object associated with the subscription.
     */
    newsletter: Newsletter;

    /**
     * The date and time when the subscription was created.
     */
    createdAt: Date;

    /**
     * The date and time when the subscription was last updated.
     */
    updatedAt: Date;
}

/**
 * Represents the request payload for creating a newsletter subscription via API.
 */
export interface NewsletterSubscriptionAPIRequest {
    /**
     * The user ID associated with the subscription.
     */
    userId: string;

    /**
     * The newsletter object associated with the subscription.
     */
    newsletter: Newsletter;
}

/**
 * Represents the response payload for creating a newsletter subscription via API.
 * It is a Promise that resolves to a NewsletterSubscription object or null.
 */
export type NewsletterSubscriptionAPIResponse = Promise<NewsletterSubscription | null>;