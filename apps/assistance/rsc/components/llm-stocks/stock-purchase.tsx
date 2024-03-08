'use client';

import { useId, useState } from 'react';
import { useActions, useAIState, useUIState } from 'ai/rsc';
import { formatNumber } from '@/lib/utils';

import type { AI } from '../../app/action';

export function Purchase({
  defaultAmount,
  name,
  price,
}: {
  defaultAmount?: number;
  name: string;
  price: number;
}) {
  const [value, setValue] = useState(defaultAmount || 100);
  const [purchasingUI, setPurchasingUI] = useState<null | React.ReactNode>(
    null,
  );
  const [history, setHistory] = useAIState<typeof AI>();
  const [, setMessages] = useUIState<typeof AI>();
  const { confirmPurchase } = useActions();

  // Unique identifier for this UI component.
  const id = useId();

  // Whenever the slider changes, we need to update the local value state and the history
  // so LLM also knows what's going on.
  function onSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = Number(e.target.value);
    setValue(newValue);

    // Insert a hidden history info to the list.
    const info = {
      role: 'system' as const,
      content: `[User has changed to purchase ${newValue} shares of ${name}. Total cost: $${(
        newValue * price
      ).toFixed(2)}]`,

      // Identifier of this UI component, so we don't insert it many times.
      id,
    };

    // If last history state is already this info, update it. This is to avoid
    // adding every slider change to the history.
    if (history[history.length - 1]?.id === id) {
      setHistory([...history.slice(0, -1), info]);
      return;
    }

    // If it doesn't exist, append it to history.
    setHistory([...history, info]);
  }

  return (
    <div className="rounded-xl bg-zinc-950 p-4 text-green-400 border">

      {purchasingUI ? (
        <div className="mt-4 text-zinc-200">{purchasingUI}</div>
      ) : (
        <>
          <div className="relative mt-6 pb-6">
            <p>Shares to purchase</p>
            <input
              id="labels-range-input"
              type="range"
              value={value}
              onChange={onSliderChange}
              min="10"
              max="1000"
              className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-zinc-600 accent-green-500 dark:bg-zinc-700"
            />
          </div>

          <div className="mt-6">
            <p>Total cost</p>
            <div className="flex items-center sm:items-end sm:gap-2 text-xl sm:text-3xl font-bold flex-wrap">
              <div className="flex flex-col basis-1/3 sm:basis-auto sm:flex-row sm:items-center sm:gap-2 tabular-nums">
                {value}
              </div>
            </div>
          </div>

          <button
            className="mt-6 w-full rounded-lg bg-green-500 dark:bg-green-500 px-4 py-2 text-zinc-900"
            onClick={async () => {
              const response = await confirmPurchase(name, price, value);
              setPurchasingUI(response.purchasingUI);

              // Insert a new system message to the UI.
              setMessages((currentMessages: any) => [
                ...currentMessages,
                response.newMessage,
              ]);
            }}
          >
            Confirm
          </button>
        </>
      )}
    </div>
  );
}
