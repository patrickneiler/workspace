import { Newsletter } from "./newsletter";

export interface NewsletterSubscription {
    id: string;
    userId: string;
    newsletter: Newsletter;
    createdAt: Date;
    updatedAt: Date;
}