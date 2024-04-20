'use client';

import { useState } from 'react';
import { sleep } from '@wrkspce/shared/util';
import StockPurchase from './stock-purchase';

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
    const handlePurchase = async () => {
        await sleep(1000);
        console.log(`Purchased ${value} shares of ${name} at $${price}`);
    };

    // Whenever the slider changes, we need to update the local value state and the history
    // so LLM also knows what's going on.
    function onSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = Number(e.target.value);
        setValue(newValue);
    }

    return (
        <div className="p-4 text-green-900 border rounded-xl bg-zinc-950">
            <div className="inline-block float-right px-2 py-1 text-xs rounded-full bg-green-400">
                +1.23% ↑
            </div>
            <div className="text-lg text-green-100">{name}</div>
            <div className="text-3xl text-green-100 font-bold">${price}</div>
            <StockPurchase value={value} name={name} price={price} onPurchase={handlePurchase} onSliderChange={onSliderChange} />
        </div>
    );
}
