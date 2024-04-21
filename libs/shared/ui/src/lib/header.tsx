'use client'
import Link from 'next/link';
import { IconGitHub } from './icons';
import { Button } from './button';
import Navigation from './navigation';
import { Code, Text } from '@radix-ui/themes';

export function Header({ navItems, cta, logo, name, accent }: { navItems?: { title: string, href: string }[], cta?: JSX.Element, logo?: JSX.Element, name?: string, accent?: "gray" | "gold" | "bronze" | "brown" | "yellow" | "amber" | "orange" | "tomato" | "red" | "ruby" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "green" | "grass" | "lime" | "mint" | "sky" | undefined }) {

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-14 shrink-0 bg-background backdrop-blur-xl">
      <span className="inline-flex items-center home-links whitespace-nowrap">

        <Link href="/" className='flex items-center'>
          {logo && logo}
          {
            name ? <Text className="font-saira ml-1 font-bold" size="5" color={accent ? accent : 'sky'}>{name}</Text> : <Code color={accent ? accent : 'sky'} variant="solid">{name ? name : '@wkspce'}</Code>
          }
        </Link>
      </span>
      <div className="h-full inline-flex items-end">
        {navItems && <Navigation color={accent} items={navItems} />}
      </div>
      <div className="flex items-center justify-end space-x-2">
        {
          cta ? cta : <Button variant="outline" asChild>
            <a
              target="_blank"
              href="https://github.com/patrickneiler/workspace"
              rel="noopener noreferrer"
            >
              <IconGitHub />
              <span className="hidden ml-2 md:flex">GitHub</span>
            </a>
          </Button>
        }

      </div>
    </header>
  );
}
