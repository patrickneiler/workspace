'use client';
import dynamic from 'next/dynamic';

export * from './action/ConfirmFeature';

export const GenerateFeature = dynamic(
  () => import('./GenerateFeature').then((mod) => mod.GenerateFeature),
  {
    ssr: false,
    loading: () => (
      <div className="bg-zinc-900 rounded-lg px-4 py-5 text-center text-xs">
        Loading...
      </div>
    ),
  },
);
