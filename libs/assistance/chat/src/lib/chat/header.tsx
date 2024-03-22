import { IconAI, IconGitHub, IconSeparator, IconSparkles } from '../ui/icons';
import { Button } from '../ui/button';
import Link from 'next/link';

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 h-14 shrink-0 bg-background backdrop-blur-xl">
      <span className="inline-flex items-center home-links whitespace-nowrap">
        <Link href="/">
          <span className="text-lg font-bold">
            <IconSparkles className="inline mr-0 w-4 sm:w-5 mb-0.5" />
            <span>Assistym</span>
          </span>
        </Link>
      </span>
      <div className="flex items-end justify-center">
        <div className="mt-20"></div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" asChild>
          <a
            target="_blank"
            href="https://github.com/patrickneiler/ranthology"
            rel="noopener noreferrer"
          >
            <IconGitHub />
            <span className="hidden ml-2 md:flex">GitHub</span>
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href="https://www.notion.so/Project-Assistym-dbde03652ad64f8a968f02a820013f28?pvs=4"
            target="_blank"
          >
            <IconAI className="mr-2" />
            <span className="hidden sm:block">About</span>
            <span className="sm:hidden">About</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
