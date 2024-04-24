import { NewsletterSubscriptionAPIRequest } from '@wrkspce/newsletter/domain';
import { createSubscription, getSubscription } from "./subscriptions";
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles the GET request for retrieving a newsletter subscription.
 * 
 * @param request - The request object containing the user ID.
 * @returns A JSON response containing the subscription if found, or an error response otherwise.
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId');
    if (!userId) {
        return NextResponse.error();
    }
    const subscription = await getSubscription(userId);
    subscription ? NextResponse.json(subscription) : NextResponse.error();
    return subscription;
}

/**
 * Handles the POST request for creating a newsletter subscription.
 * 
 * @param request - The request object containing the user ID and newsletter information.
 * @returns A JSON response containing the created subscription if successful, or an error response otherwise.
 */
export async function POST(request: NextRequest) {
    const { userId, newsletter } = await request.json() as NewsletterSubscriptionAPIRequest;
    if (!userId || await getSubscription(userId)) {
        return NextResponse.error();
    }
    const subscription = await createSubscription({ userId, newsletter });
    return subscription ? NextResponse.json(subscription) : NextResponse.error();
}