'use client';
import dynamic from 'next/dynamic';

export * from './action/ConfirmPurchase';

export const ViewStock = dynamic(
  () => import('./PurchaseStock').then((mod) => mod.PurchaseStock),
  {
    ssr: false,
    loading: () => (
      <div className="bg-zinc-900 rounded-lg px-4 py-5 text-center text-xs">
        Loading...
      </div>
    ),
  },
);
