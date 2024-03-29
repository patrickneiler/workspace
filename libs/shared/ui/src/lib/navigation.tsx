'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import NextLink from 'next/link';

import { usePathname } from 'next/navigation';

export interface NavigationMenuItem {
    title: string;
    href: string;
}

export interface NavigationMenuProps {
    items: NavigationMenuItem[];
}

export interface NavigationLinkProps {
    href: string;
    children: React.ReactNode;
}


const Link = ({ href, children }: NavigationLinkProps) => {
    const pathname = usePathname();
    const isActive = href === pathname;

    return (
        <NavigationMenu.Link asChild className={`px-8 outline-none select-none font-semibold ${isActive && "border-b border-sky-9 text-sky-9"}`} active={isActive}>
            <NextLink className={`h-full flex items-center`} href={href} >
                <span className={`${isActive && "-mb-1"}`}>{children}</span>
            </NextLink>
        </NavigationMenu.Link>
    );
};

export const Navigation = ({ items }: NavigationMenuProps) => {
    return (
        <NavigationMenu.Root className="flex justify-center items-center h-full z-10">
            <NavigationMenu.List className="flex justify-center bg-white h-full px-4 rounded-6 list-none shadow-md m-0">
                {
                    items.map((item) => (
                        <NavigationMenu.Item className='h-14' key={item.href}>
                            <Link href={item.href}>{item.title}</Link>
                        </NavigationMenu.Item>
                    ))
                }
                <NavigationMenu.Indicator className="flex items-end justify-center h-10 top-full overflow-hidden z-1 transition-width transform" data-state="visible">
                    <div className="relative top-70 bg-white w-10 h-10 transform rotate-45 rounded-tl-2" />
                </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className="absolute flex justify-center w-full top-full left-0 perspective-2000">
                <NavigationMenu.Viewport className="relative transform-origin-top-center mt-10 w-full bg-white rounded-6 overflow-hidden shadow-md" data-state="open" />
            </div>
        </NavigationMenu.Root>
    );
};

export default Navigation;
