import type { Metadata } from 'next';
import { TextField, Theme } from '@radix-ui/themes';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { saira } from './font';
import Logo from './logo';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import './global.css';

import { Providers } from './providers';
import { Header } from '@wrkspce/shared/ui';
import { navItems } from './navigation';


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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable} ${saira} bg-background text-foreground`}
      >
        <Theme appearance="dark" accentColor="jade" grayColor="slate">
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header name="Grabstock" accent="jade" navItems={navItems} logo={<Logo />} cta={<TextField.Root placeholder="Search for stock…">
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>} />
              {children}
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
