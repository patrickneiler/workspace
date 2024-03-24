'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';

import { TooltipProvider } from '@ranthology/ui/react';

/**
 * Renders the providers for the application.
 * 
 * @param {ThemeProviderProps} props - The props for the ThemeProvider.
 * @returns {JSX.Element} The rendered providers.
 */
export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </NextThemesProvider>
  );
}
