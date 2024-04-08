'use client';
import dynamic from 'next/dynamic';

export const ConfirmProject = dynamic(
  () => import('./tools/generate-project/GenerateProject').then((mod) => mod.ConfirmProject),
  {
    ssr: false,
    loading: () => (
      <div className="bg-zinc-900 rounded-lg px-4 py-5 text-center text-xs">
        Loading stock info...
      </div>
    ),
  },
);
