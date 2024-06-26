import type { Metadata } from 'next';
import { Theme } from '@radix-ui/themes';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { fira_code, itim } from './font';
import './global.css';
import { Providers } from './providers';
import { Header } from '@wrkspce/shared/ui';
import { navItems } from './navigation';
import Logo from './logo';

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
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable} ${itim} ${fira_code}`}
      >
        <Theme appearance="dark" accentColor="sky" grayColor="slate">
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header accent="sky" navItems={navItems} logo={<Logo />} />
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
