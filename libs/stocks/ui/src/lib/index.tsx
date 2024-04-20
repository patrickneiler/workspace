'use client';

import dynamic from 'next/dynamic';
import { StockSkeleton } from './stock-skeleton';

export { spinner } from './spinner';

const Stock = dynamic(() => import('./stock').then(mod => mod.Stock), {
  ssr: false,
  loading: () => <StockSkeleton />,
});

const Purchase = dynamic(
  () => import('./stock-purchase').then(mod => mod.StockPurchase),
  {
    ssr: false,
    loading: () => (
      <div className="bg-zinc-900 rounded-lg px-4 py-5 text-center text-xs">
        Loading stock info...
      </div>
    ),
  },
);

export { Stock, Purchase };
