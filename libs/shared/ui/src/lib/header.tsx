'use client'
import Link from 'next/link';
import { IconGitHub, IconSparkles } from './icons';
import { Button } from './button';
import Navigation from './navigation';
import { Code } from '@radix-ui/themes';
import Logo from './logo';

export function Header({ navItems, logo }: { navItems?: { title: string, href: string }[], logo?: JSX.Element }) {

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-14 shrink-0 bg-background backdrop-blur-xl">
      <span className="inline-flex items-center home-links whitespace-nowrap">

        <Link href="/" className='flex items-center'>
          {logo && logo}
          <span className="text-lg font-bold ml-4">
            <Code color="sky" variant="solid">@wkspce</Code>
          </span>
        </Link>
      </span>
      <div className="h-full inline-flex items-end">
        {navItems && <Navigation items={navItems} />}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" asChild>
          <a
            target="_blank"
            href="https://github.com/patrickneiler/workspace"
            rel="noopener noreferrer"
          >
            <IconGitHub />
            <span className="hidden ml-2 md:flex">GitHub</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
