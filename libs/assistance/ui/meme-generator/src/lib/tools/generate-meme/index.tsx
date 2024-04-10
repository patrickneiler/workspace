'use client';
import dynamic from 'next/dynamic';

export * from './action/GenerateMeme';

export const GenerateMeme = dynamic(
  () => import('./GenerateMeme').then((mod) => mod.GenerateMeme),
  {
    ssr: false,
    loading: () => (
      <div className="bg-zinc-900 rounded-lg px-4 py-5 text-center text-xs">
        Loading...
      </div>
    ),
  },
);
