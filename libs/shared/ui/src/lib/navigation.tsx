'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Box, Flex, IconButton, Separator } from '@radix-ui/themes';
import NextLink from 'next/link';

import { usePathname } from 'next/navigation';

export interface NavigationMenuItem {
    title: string;
    href: string;
    icon?: React.ReactNode;
}

export interface NavigationMenuProps {
    items: NavigationMenuItem[];
    color?: "gray" | "gold" | "bronze" | "brown" | "yellow" | "amber" | "orange" | "tomato" | "red" | "ruby" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "green" | "grass" | "lime" | "mint" | "sky";
}

export interface NavigationLinkProps {
    href: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    color?: "gray" | "gold" | "bronze" | "brown" | "yellow" | "amber" | "orange" | "tomato" | "red" | "ruby" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "green" | "grass" | "lime" | "mint" | "sky";
}


const Link = ({ href, children, color, icon }: NavigationLinkProps) => {
    const pathname = usePathname();
    const isActive = href === pathname;
    return (
        <NavigationMenu.Link asChild className={`px-8 relative outline-none select-none font-semibold`} active={isActive}>
            <>
                <NextLink className={`h-full flex items-center`} href={href} >
                    {icon ?
                        <Box >
                            <Separator orientation="vertical" size="4" />
                            <IconButton highContrast variant={isActive ? "outline" : "soft"} radius='full' className={`${isActive ? "border-sky-11" : "border-transparent"}`}>{icon}</IconButton>
                        </Box>
                        :
                        <span>{children}</span>}
                </NextLink>

                {
                    isActive && !icon &&
                    <div className="absolute bottom-0 w-full h-1">
                        <Separator color={color || 'gray'} size="4" className={`h-1 bg-${color}-11`} />
                    </div>
                }
            </>
        </NavigationMenu.Link>
    );
};

export const Navigation = ({ items, color }: NavigationMenuProps) => {
    return (
        <NavigationMenu.Root className="flex justify-center items-center h-full z-10">
            <NavigationMenu.List className="flex justify-center bg-white h-full px-4 rounded-6 list-none shadow-md m-0">
                {
                    items.map((item) => (
                        <NavigationMenu.Item className='h-14 flex items-center justify-center flex-col relative mx-4' key={item.href}>
                            <Link icon={item.icon} color={color} href={item.href}>{item.title}</Link>
                        </NavigationMenu.Item>
                    ))
                }

            </NavigationMenu.List>
        </NavigationMenu.Root>
    );
};

export default Navigation;
