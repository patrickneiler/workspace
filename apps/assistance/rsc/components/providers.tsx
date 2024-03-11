'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';

import { TooltipProvider } from '@/components/ui/tooltip';
import { VideoProvider, Config } from '@ranthology/presenter/react';
export interface ProviderProps extends ThemeProviderProps {
  videoConfig: Config
}
export function Providers({ children, videoConfig, ...props }: ProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <VideoProvider config={videoConfig}>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </VideoProvider>
    </NextThemesProvider>
  );
}
