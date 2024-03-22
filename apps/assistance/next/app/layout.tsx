import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Theme } from '@radix-ui/themes';
import { Toaster } from '../libs/assistance/react/ui/toaster';
import './global.css';

import { AI } from './action';
import { Header } from '../libs/assistance/react/chat/header';
import { Providers } from './providers';

const meta = {
  title: 'AI RSC Demo',
  description:
    'Demo of an interactive financial assistant built using Next.js and Vercel AI SDK.',
};
export const metadata: Metadata = {
  ...meta,
  title: {
    default: 'AI RSC Demo',
    template: `%s - AI RSC Demo`,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  twitter: {
    ...meta,
    card: 'summary_large_image',
    site: '@vercel',
  },
  openGraph: {
    ...meta,
    locale: 'en-US',
    type: 'website',
  },
};

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
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <Theme appearance="dark" accentColor="sky" grayColor="slate">
          <Toaster />
          <AI>
            <Providers
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex flex-col flex-1 bg-muted/50 dark:bg-background">
                  {children}
                </main>
              </div>
            </Providers>
          </AI>
        </Theme>

      </body>
    </html>
  );
}

export const runtime = 'edge';
