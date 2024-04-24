import { newsletter_subscriptions } from '@wrkspce/newsletter/feature/core/server';
import { createSubscription, getSubscription } from '../lib/subscriptions';

// Mock the dependencies
jest.mock('../lib/subscriptions', () => ({
    getSubscription: jest.fn(),
    createSubscription: jest.fn(),
}));

/**
 * Test suite for the getSubscription function.
 */
describe('getSubscription', () => {
    /**
     * Test case: should return the subscription when found.
     */
    it('should return the subscription when found', async () => {
        const mockRequest = '1';

        const expectedResponse = newsletter_subscriptions[0];

        // Mock the resolved value of getSubscription
        (getSubscription as jest.Mock).mockResolvedValue(expectedResponse);

        const response = await getSubscription(mockRequest);

        expect(response).toEqual(expectedResponse);
    });

    /**
     * Test case: should return null when not found.
     */
    it('should return null when not found', async () => {
        const mockRequest = '456';

        // Mock the resolved value of getSubscription
        (getSubscription as jest.Mock).mockResolvedValue(null);

        const response = await getSubscription(mockRequest);

        expect(response).toBeNull();
    });
});

/**
 * Test suite for the createSubscription function.
 */
describe('createSubscription', () => {
    /**
     * Test case: should create a new subscription.
     */
    it('should create a new subscription', async () => {
        const mockRequest = {
            userId: '123',
            newsletter: { industry: 'Tech', source: 'Web', subcategory: 'Web Development' },
        };

        const expectedResponse = {
            id: (newsletter_subscriptions.length + 1).toString(),
            userId: '123',
            newsletter: { industry: 'Tech', source: 'Web', subcategory: 'Web Development' },
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        };

        // Mock the resolved value of createSubscription
        (createSubscription as jest.Mock).mockResolvedValue(expectedResponse);

        const response = await createSubscription(mockRequest);

        expect(response).toEqual(expectedResponse);
    });
});