# newsletter-feature-core
@wrkspce/newsletter/feature/core
This library was generated with [Nx](https://nx.dev).

## Goal

- Design an API system that supports a Subscription-based feature.
- The API will be used to support a UI where users will be able to configure and create a subscription for a newsletter that would be emailed to them on a weekly cadence. 

## Configuration

Options are as follows:
- Industry / sector (e.g. Consumer Health, Beauty, Tech, etc)
- Source (e.g. Social Media, News, etc)
- Subcategory (e.g. New Product Releases, Mergers and Acquisitions, etc)

## Considerations

- Only one subscription can be active per user
- A separate process will handle the actual processing and sending of the newsletters.

## Assumptions

- The project workspace contains the core library for the newsletter feature, which includes the data model for the newsletter as well as the API for managing data.
- The project workspace contains the core library for user management, which includes the data model for the user as well as the API for managing user data.
- The project workspace contains the UI library for the newsletter feature, which includes the UI components for creating and configuring subscriptions.

## Objective

Create new libraries for the newsletter feature that will handle the creation and management of subscriptions. 

## Architecture

- @wrkspce/newsletter/domain
    - newsletter.ts
    - subscription.ts
- @wrkspce/newsletter/feature/core
    - api.ts
- @wrkspce/newsletter/feature/subscriptions
    - get-subscription.ts
    - create-subscription.ts

## Steps

Step 1: Create the newsletter libraries
- newsletter-feature-core (@wrkspce/newsletter/feature/core)
- newsletter-feature-subscriptions (@wrkspce/newsletter/feature/subscriptions)
- newsletter-ui (@wrkspce/newsletter/ui)
- newsletter-domain (@wrkspce/newsletter/domain)

NX Workspace Library Generator Commands:
- nx g @nx/next:library --name=newsletter-feature-core --directory=libs/newsletter/feature/core --component=false --importPath=@wrkspce/newsletter/feature/core --projectNameAndRootFormat=as-provided --tags="scope: newsletter. type: feature" --unitTestRunner=jest
- nx g @nx/next:library --name=newsletter-feature-subscriptions --directory=libs/newsletter/feature/subscriptions --component=false --importPath=@wrkspce/newsletter/feature/subscriptions --projectNameAndRootFormat=as-provided --tags="scope: newsletter. type: feature" --unitTestRunner=jest
- nx g @nx/next:library --name=newsletter-ui --directory=libs/newsletter/feature/ui --component=false --importPath=@wrkspce/newsletter/ui --projectNameAndRootFormat=as-provided --tags="scope: newsletter. type: ui" --unitTestRunner=jest
- nx g @nx/next:library --name=newsletter-domain --directory=libs/newsletter/domain --component=false --importPath=@wrkspce/newsletter/domain --projectNameAndRootFormat=as-provided --tags="scope: newsletter. type: domain" --unitTestRunner=jest

Step 2: Create the data model for the newsletter and subscription

Import Path: @wrkspce/newsletter/domain
Filename: newsletter.ts
Interface: Newsletter
- industry: string
- source: string
- subcategory: string

Import Path: @wrkspce/newsletter/domain
Filename: subscription.ts
Interface: Subscription
- id: string
- userId: string
- newsletter: Newsletter
- createdAt: Date
- updatedAt: Date

Step 3: Create the Next.js server components
Library: newsletter-feature-subscriptions
Create new files called get-subscription.ts and create-subscription.ts. Define the following functions in the files:
- getSuscription(userId: string): Promise<Subscription>
- createSubscription(userId: string, newsletter: Newsletter): Promise<Subscription>;

Step 4: Create the API endpoints
Library: newsletter-feature-subscriptions
Create a new file called api.ts. Define the following API endpoints using Next.js API routes:
- POST(request) => createSubscription(request.body)
- GET(request) => getSubscription(request.query.userId)