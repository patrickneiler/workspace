'use client';
import dynamic from 'next/dynamic';

export * from './action/ConfirmOrder';

export const GenerateOrder = dynamic(
  () => import('./GenerateOrder').then((mod) => mod.GenerateOrder),
  {
    ssr: false,
    loading: () => (
      <div className="bg-zinc-900 rounded-lg px-4 py-5 text-center text-xs">
        Loading...
      </div>
    ),
  },
);
