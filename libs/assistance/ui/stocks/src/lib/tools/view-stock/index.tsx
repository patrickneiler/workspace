'use client';
import { StockSkeleton } from '@wrkspce/stocks/ui';
import dynamic from 'next/dynamic';

export * from './action/ShowPrice';

export const ViewStock = dynamic(
  () => import('./ViewStock').then((mod) => mod.ViewStock),
  {
    ssr: false,
    loading: () => (
      <StockSkeleton />
    ),
  },
);
