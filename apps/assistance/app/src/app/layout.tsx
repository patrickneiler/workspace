import type { Metadata } from 'next';
import { Theme } from '@radix-ui/themes';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
<<<<<<< Updated upstream:apps/assistance/rsc/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

import { AI } from './action';
import { Header } from '@/components/header';
import { Providers } from '@/components/providers';
=======
import './global.css';
import { Providers } from './providers';
import { Header } from '@wrkspce/shared/ui';
import { navItems } from './navigation';
import Logo from './logo';
>>>>>>> Stashed changes:apps/assistance/app/src/app/layout.tsx

const meta = {
  title: 'Assistance',
  description:
    'The primary objective of Assistance is to leverage the power of Artificial Intelligence to drastically improve the efficiency of software development teams.',
};

/**
 * The complete metadata object for the site.
 */
export const metadata: Metadata = {
  ...meta,
  title: {
    default: 'Assistance',
    template: `%s - Assistance`,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  twitter: {
    ...meta,
    card: 'summary_large_image',
    site: '@wrkspce',
  },
  openGraph: {
    ...meta,
    locale: 'en-US',
    type: 'website',
  },
};

// The viewport settings for the site.
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [{ title: 'Stocks', href: '/stocks' }, { title: 'Project', href: "/project" }, { title: 'Persona', href: '/persona' }];
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <Theme appearance="dark" accentColor="sky" grayColor="slate">
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
<<<<<<< Updated upstream:apps/assistance/rsc/app/layout.tsx
              <Header />
              <main className="flex flex-col flex-1 bg-muted/50 dark:bg-background">
                {children}
              </main>
=======
              <Header navItems={navItems} logo={<Logo />} />
              {children}
>>>>>>> Stashed changes:apps/assistance/app/src/app/layout.tsx
            </div >
          </Providers >
        </Theme >
      </body >
    </html >
  );
}

/**
 * The runtime version used for the application.
 */
export const runtime = 'edge';
